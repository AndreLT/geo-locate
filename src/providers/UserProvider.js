import React, { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../lib/firebase";
import { createUser } from "../lib/db";

const authContext = createContext();

export function UserProvider({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      console.log(rawUser);
    }
  };

  const signUpWithEmail = (email, password, name) => {
    setLoading(true);
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userRecord) => {
        createUser({
          uid: userRecord.user.uid,
          email: userRecord.user.email,
          name: name,
        });
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord);
      })
      .catch((error) => {
        console.log("Error creating new user:", error);
      });
  };

  const signInWithEmail = (email, password) => {
    setLoading(true);
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        handleUser(response.user);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      setUser(userAuth);
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
  };
}
