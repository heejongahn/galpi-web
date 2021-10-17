import firebase from 'firebase/app';

import 'firebase/auth';
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import getConfig from 'next/config';
import { login } from '../remotes';

const {
  HOST,
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_PROJECT_ID,
} = getConfig().publicRuntimeConfig;

interface FirebaseContextProps {
  app?: firebase.app.App;
  sendLoginEmail: (email: string) => void;
  loginWithEmailPassword: (email: string, password: string) => void;
}

export const FirebaseContext = createContext<FirebaseContextProps>({
  sendLoginEmail: () => {},
  loginWithEmailPassword: () => {},
});

export function FirebaseContextProvider({ children }: { children: ReactNode }) {
  const [app, setApp] = useState<firebase.app.App | undefined>(undefined);

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
        const data = await login({ token });
        console.log(data);
      }
    },
    [app]
  );

  return (
    <FirebaseContext.Provider
      value={{ app, sendLoginEmail, loginWithEmailPassword }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
