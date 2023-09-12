import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import firebase, { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAddress } from "@thirdweb-dev/react";

interface FirebaseContextProps {
  app: FirebaseApp;
  db: Firestore;
  analytics: Analytics;
  auth: Partial<Auth>;
  provider: Partial<GoogleAuthProvider>;
  authenticate: any;
  signedUp: boolean;
  error: string;
  loadingSignUp: boolean;
  user: IUser | undefined;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signWaitlist: (email: string) => Promise<boolean>;
  signToOpenDeck: (email: string) => Promise<boolean>;
}

interface Props {
  children: JSX.Element;
}

interface IUser {
  email: string;
  name: string;
  publicAddress: string;
  uid: string;
}

export const FirebaseContext = createContext<FirebaseContextProps | undefined>(
  undefined
);

const FirebaseProvider: React.FC<Props> = ({ children, ...rest }) => {
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
  const db = getFirestore(app);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const [signedUp, setSignedUp] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [error, setError] = useState("");
  const address = useAddress();
  const googleAuthProvider = useMemo(() => {
    return new GoogleAuthProvider();
  }, []);

  const verifyUserDatabase = useCallback(async () => {
    if (!address) return;
    console.log(address);
    try {
      const usersRef = collection(db, "users");
      const q = query(collection(db, "users"), where("uid", "==", address));
      const docs = await getDocs(q);
      console.log("VERIFICOUUU");
      if (docs.docs.length === 0) {
        await setDoc(doc(usersRef, `${address}`), {
          uid: address,
          name: "",
          email: "",
          publicAddress: address,
        });

        const q = query(collection(db, "users"), where("uid", "==", address));
        const docs = await getDocs(q);

        docs.forEach((doc) => {
          setUser(doc.data() as IUser);
        });
      } else {
        const docs = await getDocs(q);

        docs.forEach((doc) => {
          setUser(doc.data() as IUser);
        });
      }
    } catch {}
  }, [address, db]);

  useEffect(() => {
    verifyUserDatabase();
  }, [address, verifyUserDatabase]);

  const authenticate = useCallback(async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (e) {
      console.error(e);
    }
  }, [auth, googleAuthProvider]);

  const signUpWithEmail = useCallback(
    async (email: string, password: string) => {
      try {
        setLoadingSignUp(true);

        await createUserWithEmailAndPassword(auth, email, password)
          .then((res) => {
            setSignedUp(true);
          })
          .catch((err) => {
            setError(err.message);
          });
      } finally {
        setLoadingSignUp(false);
      }
    },
    [auth]
  );

  const signWaitlist = useCallback(
    async (email: string) => {
      const waitlistRef = collection(db, "waitlist");
      try {
        // Add a user to the waitlist
        addDoc(waitlistRef, {
          email: email,
          timestamp: serverTimestamp(),
        });

        return true;
      } catch {
        return false;
      }
    },
    [db]
  );

  const signToOpenDeck = useCallback(
    async (email: string) => {
      const waitlistRef = collection(db, "deck");
      try {
        // Add a user to the open deck lisk
        addDoc(waitlistRef, {
          email: email,
          timestamp: serverTimestamp(),
        });

        return true;
      } catch {
        return false;
      }
    },
    [db]
  );

  const value = useMemo(() => {
    return {
      app,
      db,
      analytics,
      auth,
      provider: googleAuthProvider,
      signedUp,
      error,
      loadingSignUp,
      user,
      authenticate,
      signUpWithEmail,
      signWaitlist,
      signToOpenDeck,
    };
  }, [
    app,
    db,
    analytics,
    auth,
    googleAuthProvider,
    signedUp,
    error,
    loadingSignUp,
    user,
    authenticate,
    signUpWithEmail,
    signWaitlist,
    signToOpenDeck,
  ]);

  return (
    <FirebaseContext.Provider value={value} {...rest}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseContextProps => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error("useFirebase must be used within an FirebaseProvider");
  }

  return context;
};

export default FirebaseProvider;
