import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { initializeApp } from "firebase/app";
import {
  getAnalytics,
  initializeAnalytics,
  logEvent,
} from "firebase/analytics";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAddress } from "@thirdweb-dev/react";
import { FirebaseContextProps, IUser, Props } from "./types";

export const FirebaseContext = createContext<FirebaseContextProps | undefined>(
  undefined
);

const FirebaseProvider: React.FC<Props> = ({ children, ...rest }) => {
  const app = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDR_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  });
  const db = getFirestore(app);
  const analytics = getAnalytics(app);
  initializeAnalytics(app);
  logEvent(analytics, "user", {
    parameterName: "parameterUser",
  });

  const [user, setUser] = useState<IUser>();
  const address = useAddress();
  const [users, setUsers] = useState<IUser[]>([]);
  const [referralCode, setReferralCode] = useState<string>();
  const [refered, setRefered] = useState(false);
  const [referrals, setReferrals] = useState<{
    refs: [{ time: number; address: string }];
  }>();

  const getUsers = useCallback(async () => {
    const usersCollectionRef = collection(db, "users");

    const unsubscribe = onSnapshot(usersCollectionRef, (userss) => {
      let usersList: any = [];
      userss.docs.map((item) => usersList.push(item.data()));

      usersList && setUsers(usersList);
    });

    return unsubscribe;
  }, [db]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getReferralsList = useCallback(async () => {
    const refCollectionRef = collection(db, "referrals");

    const unsubscribe = onSnapshot(refCollectionRef, (refs) => {
      let refsList: any = [];
      refs.docs.map((item) => refsList.push(item.data()));

      let yourRefs = refsList.find((item: any) => item.uid === address);

      yourRefs && setReferrals(yourRefs);

      refsList.map((item: any) =>
        item.refs.map(
          (item: any) => item.address === address && setRefered(true)
        )
      );
    });

    return unsubscribe;
  }, [address, db]);

  const verifyReferral = useCallback(async () => {
    const referralsRef = collection(db, "referrals");
    const q = query(
      collection(db, "referrals"),
      where("uid", "==", referralCode)
    );
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      try {
        const newReferralEntry = {
          refs: [{ address: address, time: new Date().getTime() }],
          uid: referralCode,
        };

        await setDoc(doc(referralsRef, referralCode), newReferralEntry);
        console.log("Entrada de referência adicionada com sucesso.");
      } catch (error) {
        console.error("Erro ao adicionar a entrada de referência:", error);
      }
    } else {
      try {
        const existingReferralDoc = docs.docs[0];
        const existingData = existingReferralDoc.data();

        const verifyMyAddress = existingData?.refs.find(
          (item: any) => item.address === address
        );

        if (verifyMyAddress) {
          console.log("Error: Address registred in the past!");
          return;
        }

        const newReferralEntry = {
          address: address,
          time: new Date().getTime(),
        };

        await updateDoc(doc(referralsRef, existingReferralDoc.id), {
          refs: [...existingData.refs, newReferralEntry],
        });

        console.log("New element added to the referral array.");

        // return navigate("/");
      } catch (error) {
        console.error(
          "Erro ao adicionar o novo elemento à matriz de referência:",
          error
        );
      }
    }
  }, [address, db, referralCode]);

  const verifyUserDatabase = useCallback(async () => {
    if (!address) {
      setUser(undefined);

      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(collection(db, "users"), where("uid", "==", address));
      const docs = await getDocs(q);

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

        if (referralCode && !refered) {
          const verifyUser = users.find(
            (item) => item.publicAddress === referralCode
          );
          verifyUser && verifyReferral();
        }
      } else {
        const docs = await getDocs(q);

        docs.forEach((doc) => {
          setUser(doc.data() as IUser);
        });

        if (referralCode && !refered) {
          const verifyUser = users.find(
            (item) => item.publicAddress === referralCode
          );
          verifyUser && verifyReferral();
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, db, refered, referralCode, users]);

  useEffect(() => {
    getUsers();
    // getReferralsList();
    verifyUserDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

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

  const updateUser = useCallback(
    async (editedUser: IUser) => {
      if (!user) return;
      try {
        const usersRef = doc(db, "users", user.uid);
        await updateDoc(usersRef, editedUser as any);
      } catch (error) {
        console.error("Error updating Firestore collection:", error);
        alert("Failed to update user data. Please try again later.");
        return;
      }
    },
    [db, user]
  );

  const value = useMemo(() => {
    return {
      app,
      db,
      analytics,
      user,
      users,
      referrals,
      signWaitlist,
      signToOpenDeck,
      updateUser,
      setReferralCode,
    };
  }, [
    app,
    db,
    analytics,
    user,
    users,
    referrals,
    signWaitlist,
    signToOpenDeck,
    updateUser,
    setReferralCode,
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
