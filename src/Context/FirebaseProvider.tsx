import { createContext, useState } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

interface FirebaseContextProps {
  app: FirebaseApp;
  db: Firestore;
  analytics: Analytics;
  auth: Partial<Auth>;
  provider: Partial<GoogleAuthProvider>;
  authenticate: any;
}

export const FirebaseContext = createContext<FirebaseContextProps>(
  {} as FirebaseContextProps
);

const FirebaseProvider = ({ children }: any) => {
  const [app] = useState(
    initializeApp({
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDR_ID,
      appId: process.env.REACT_APP_APP_ID,
      measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    })
  );
  const [db] = useState(getFirestore(app));
  const [analytics] = useState(getAnalytics(app));
  const [auth] = useState(getAuth(app));
  const [googleAuthProvider] = useState(new GoogleAuthProvider());

  const authenticate = async () => {
    googleAuthProvider.addScope("profile");

    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        app,
        db,
        analytics,
        auth,
        provider: googleAuthProvider,
        authenticate,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
