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
} from "firebase/firestore";

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  // useEffect(() => {
  //   const getNotes = async () => {
  //     if (!user || !user.uid) {
  //       // Handle the case where user or user.uid is undefined
  //       console.log(user.uid);
  //       return;
  //     }

  //     const querySnapshot = await getDocs(
  //       collection(db, "notes", "mLqOysV86KT8oJsibfi8c3tklCo2", "notes")
  //     );
  //     const allNotes = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //       createdAt: doc.data().time.toDate().toDateString(),
  //       //time: formatDate(doc.)
  //     }));

  //     setUserNotes(allNotes);
  //     console.log(userNotes);
  //   };

  //   getNotes();
  // }, []);

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
