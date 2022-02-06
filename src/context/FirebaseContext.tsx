import { addDays } from 'date-fns';
import firebase from 'firebase/app';
import 'firebase/auth';
import getConfig from 'next/config';
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
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
  app?: firebase.app.App;
  sendLoginEmail: (email: string) => void;
  loginWithEmailPassword: (email: string, password: string) => void;
  logout: VoidFunction;
}

export const FirebaseContext = createContext<FirebaseContextProps>({
  sendLoginEmail: () => {},
  loginWithEmailPassword: () => {},
  logout: () => {},
});

export function FirebaseContextProvider({ children }: { children: ReactNode }) {
  const [app, setApp] = useState<firebase.app.App | undefined>(undefined);
  const axiosInstance = getAxiosInstance();
  const { refetch } = useMe({ enabled: false });

  useEffect(() => {
    if (app != null) {
      return;
    }

    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: FIREBASE_API_KEY,
        appId: FIREBASE_APP_ID,
        projectID: FIREBASE_PROJECT_ID,
      };

      const initializedApp = firebase.initializeApp(firebaseConfig);

      setApp(initializedApp);
    }
  }, [app]);

  const sendLoginEmail = useCallback(
    (email: string) => {
      if (app == null) {
        return;
      }

      app.auth().sendSignInLinkToEmail(email, {
        url: `${HOST}/login-redirect`,
        handleCodeInApp: true,
      });
    },
    [app]
  );

  const loginWithEmailPassword = useCallback(
    async (email: string, password: string) => {
      if (app == null) {
        return;
      }

      const { user } = await app
        .auth()
        .signInWithEmailAndPassword(email, password);

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
    [app]
  );

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
      value={{ app, sendLoginEmail, loginWithEmailPassword, logout }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
