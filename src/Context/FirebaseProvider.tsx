import { createContext, useEffect, useState } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import firebaseConfig from '../Config/firebase.json';

interface FirebaseContextProps {
    app: FirebaseApp;
    db: Firestore;
    analytics: Analytics;
    auth: Partial<Auth>;
    provider: Partial<GoogleAuthProvider>;
    authenticate: any
}

export const FirebaseContext = createContext<FirebaseContextProps>({} as FirebaseContextProps);

const FirebaseProvider = ({ children }: any) => {
    const [app, setApp] = useState(initializeApp(firebaseConfig));
    const [db, setDb] = useState(getFirestore(app));
    const [analytics, setAnalytics] = useState(getAnalytics(app));
    const [auth, setAuth] = useState(getAuth(app));
    const [googleAuthProvider, setGoogleAuthProvider] = useState(new GoogleAuthProvider());

    const authenticate = async () => {
        googleAuthProvider.addScope('profile');

        try {

            await signInWithPopup(auth, googleAuthProvider);
            
        
        } catch(e) {
            console.error(e);
        }
    }
    return <FirebaseContext.Provider value={{
        app,
        db,
        analytics,
        auth,
        provider: googleAuthProvider,
        authenticate
    }}>
        {children}
    </FirebaseContext.Provider>
}

export default FirebaseProvider;