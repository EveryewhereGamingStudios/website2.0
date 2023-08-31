import { createContext, useCallback, useMemo, useState } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  Firestore,
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";

interface FirebaseContextProps {
  app: FirebaseApp;
  db: Firestore;
  analytics: Analytics;
  auth: Partial<Auth>;
  provider: Partial<GoogleAuthProvider>;
  authenticate: any;
  loadingPost: boolean;
  postBlog: (data: IBlogPost) => Promise<void>;
}

interface IBlogPost {
  uuid: string;
  createdAt: string;
  title: string;
  timeToRead: string;
  image: string;
  content: IContentOne[];
}

interface IContentOne {
  uuid: string;
  title: string;
  desctiption: string;
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
  const db = getFirestore(app);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const googleAuthProvider = useMemo(() => {
    return new GoogleAuthProvider();
  }, []);
  const [loadingPost, setLoadingPost] = useState(false);

  const authenticate = useCallback(async () => {
    googleAuthProvider.addScope("profile");

    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (e) {
      console.error(e);
    }
  }, [auth, googleAuthProvider]);

  const postBlog = useCallback(
    async (data: IBlogPost) => {
      try {
        setLoadingPost(true);
        addDoc(collection(db, "blog"), data);
      } catch (e) {
        console.log(e, "Error in blog post!");
      } finally {
        setLoadingPost(false);
      }
    },
    [db]
  );

  const data = useMemo(() => {
    return {
      app,
      db,
      analytics,
      auth,
      provider: googleAuthProvider,
      authenticate,
      postBlog,
      loadingPost,
    };
  }, [
    app,
    db,
    analytics,
    auth,
    googleAuthProvider,
    authenticate,
    postBlog,
    loadingPost,
  ]);

  return (
    <FirebaseContext.Provider value={data}>{children}</FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
