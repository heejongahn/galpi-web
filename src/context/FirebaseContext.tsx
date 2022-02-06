import { addDays } from 'date-fns';
import firebase from 'firebase/app';
import 'firebase/auth';
import getConfig from 'next/config';
import { createContext, ReactNode, useState, useCallback } from 'react';
import Cookies from 'universal-cookie';

import {
  COOKIE_KEY_ACCESS_TOKEN,
  COOKIE_KEY_REFRESH_TOKEN,
} from '../constants';
import { useMe } from '../queries/me';
import { login } from '../remotes';
import { getAxiosInstance } from '../utils/axios';

const { HOST, FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_PROJECT_ID } =
  getConfig().publicRuntimeConfig;

interface FirebaseContextProps {
  app?: firebase.app.App | undefined;
  sendLoginEmail: (email: string) => void;
  loginWithEmailPassword: (email: string, password: string) => void;
  loginWithEmailOnly: (email: string) => void;
  logout: VoidFunction;
}

const noop = () => {};

export const FirebaseContext = createContext<FirebaseContextProps>({
  sendLoginEmail: noop,
  loginWithEmailPassword: noop,
  loginWithEmailOnly: noop,
  logout: noop,
});

const LOCAL_STORAGE_KEY_LOGIN_EMAIL = 'galpi.auth.login_email';

export function FirebaseContextProvider({ children }: { children: ReactNode }) {
  const [app] = useState<firebase.app.App | undefined>(() => {
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: FIREBASE_API_KEY,
        appId: FIREBASE_APP_ID,
        projectID: FIREBASE_PROJECT_ID,
      };

      const initializedApp = firebase.initializeApp(firebaseConfig);

      return initializedApp;
    }

    return firebase.apps[0];
  });
  const axiosInstance = getAxiosInstance();
  const { refetch } = useMe({ enabled: false });

  const sendLoginEmail = useCallback(
    async (email: string) => {
      if (app == null) {
        return;
      }

      localStorage.setItem(LOCAL_STORAGE_KEY_LOGIN_EMAIL, email);
      await app.auth().sendSignInLinkToEmail(email, {
        url: `${HOST}/login-redirect`,
        handleCodeInApp: true,
      });
    },
    [app]
  );

  const loginUser = useCallback(
    async (user: firebase.User | null) => {
      const token = await user?.getIdToken();

      if (token) {
        const data = await login(axiosInstance)({ token });
        const cookies = new Cookies();
        const now = new Date();

        cookies.set(COOKIE_KEY_ACCESS_TOKEN, data.token, {
          expires: addDays(now, 7),
        });
        cookies.set(COOKIE_KEY_REFRESH_TOKEN, data.refreshToken, {
          expires: addDays(now, 28),
        });
        refetch();
      }
    },
    [axiosInstance, refetch]
  );

  const loginWithEmailPassword = useCallback(
    async (email: string, password: string) => {
      if (app == null) {
        return;
      }

      const { user } = await app
        .auth()
        .signInWithEmailAndPassword(email, password);

      await loginUser(user);
    },
    [app, loginUser]
  );

  const loginWithEmailOnly = useCallback(async () => {
    const email = localStorage.getItem(LOCAL_STORAGE_KEY_LOGIN_EMAIL);

    if (app == null) {
      return;
    }

    const auth = app.auth();

    if (!auth.isSignInWithEmailLink(window.location.href) || email == null) {
      alert('올바르지 않은 접근입니다.');
      return;
    }

    const { user } = await auth.signInWithEmailLink(
      email,
      window.location.href
    );

    await loginUser(user);
  }, [app, loginUser]);

  const logout = useCallback(async () => {
    if (app == null) {
      return;
    }

    await app.auth().signOut();
    const cookies = new Cookies();
    cookies.remove(COOKIE_KEY_ACCESS_TOKEN);
    cookies.remove(COOKIE_KEY_REFRESH_TOKEN);

    window.location.replace('/');
  }, [app]);

  return (
    <FirebaseContext.Provider
      value={{
        app,
        sendLoginEmail,
        loginWithEmailPassword,
        loginWithEmailOnly,
        logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
