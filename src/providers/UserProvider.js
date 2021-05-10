import React, { createContext, useContext, useEffect, useState } from "react";

import { auth, firestore } from "../lib/firebase";
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
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("geo-locate-user")) || null
  );
  const [loading, setLoading] = useState(true);
  console.log(user);
  const handleUser = async (rawUser) => {
    if (rawUser) {
      console.log(rawUser);
      setLoading(false);
    } else {
      setUser(false);
      setLoading(false);
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
        }).then((user) => {
          console.log(user);
          localStorage.setItem("geo-locate-user", JSON.stringify(user));
          setUser(user);
        });

        console.log("Successfully created new user:", userRecord);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error creating new user:", error);
        setLoading(false);
      });
  };

  const signInWithEmail = (email, password) => {
    setLoading(true);
    auth.signInWithEmailAndPassword(email, password).then((response) => {
      firestore
        .collection("users")
        .doc(response.user.uid)
        .get()
        .then((user) => {
          const data = user.data();
          const signinUser = {
            uid: response.user.uid,
            email: data.email,
            name: data.name,
          };
          console.log(signinUser);
          localStorage.setItem("geo-locate-user", JSON.stringify(signinUser));
          setUser(signinUser);
        });
    });
  };

  const signOut = () => {
    return auth.signOut().then(() => {
      handleUser(false);
      localStorage.removeItem("geo-locate-user");
    });
  };

  return {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };
}
