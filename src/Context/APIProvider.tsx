import { createContext, useCallback, useContext, useState } from "react";
import { FirebaseContext } from "./FirebaseProvider";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";

interface APIContextProps {
  signWaitlist: (email: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
}

export const APIContext = createContext<APIContextProps>({} as APIContextProps);

const APIProvider = ({ children }: any) => {
  const [uri] = useState(
    "https://us-central1-cosmosexodus.cloudfunctions.net/api/v1"
  );

  const post = async (endpoint: string, data: any) => {
    try {
      await fetch(`${uri}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200) {
          return true;
        }

        return false;
      });
    } catch (e: any) {
      return false;
    }

    return true;
  };

  const signWaitlist = async (email: string) => {
    return post("signWaitlist", {
      email,
    });
  };
  const signup = async (name: string, email: string, password: string) => {
    return post("signup", {
      name,
      email,
      password,
      gdpr: true,
    });
  };

  return (
    <APIContext.Provider
      value={{
        signWaitlist,
        signup,
      }}
    >
      {" "}
      {children}{" "}
    </APIContext.Provider>
  );
};

export default APIProvider;
