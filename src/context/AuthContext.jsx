import { createContext, useContext, useEffect, useState } from "react";
const UserContext = createContext();
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

import { auth, provider, db } from "../firebase";
import {
  doc,
  onSnapshot,
  collection,
  setDoc,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
} from "firebase/firestore";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userNotes, setUserNotes] = useState([]);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  const Googlesignin = () => {
    return signInWithPopup(auth, provider);
  };
  const addUser = (fullname, uid) => {
    const documentRef = doc(db, "users", uid);
    const updatedDocData = {
      fullname: fullname,
      uid: uid,
    };

    return setDoc(documentRef, updatedDocData);
  };

  const addNote = (title, text, uid) => {
    const notesref = collection(doc(db, "notes", uid), "notes");
    const newNote = {
      title: title,
      text: text,
      time: serverTimestamp(), // Current time
      updatedAt: serverTimestamp(), // Initial value
    };

    return addDoc(notesref, newNote);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        //  console.log(doc.data(), "bollocks");
        setUser(doc.data());
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   onSnapshot(doc(db, "users", "vv9SZjLcPccaORBegeAqRhv1kDQ2"), (doc) => {
  //     console.log(doc.data(), "bollocks");
  //   });
  // }, []);  \

  //  {
  //   onSnapshot(doc(db, "users", "vv9SZjLcPccaORBegeAqRhv1kDQ2"), (doc) => {
  //     console.log(doc.data(), "bollocks");
  //   });
  // }

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        loginUser,
        Googlesignin,
        addUser,
        addNote,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
