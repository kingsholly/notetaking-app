import { getFirestore, collection, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
getFirestore;
function Allnotes() {
  const { user, logout } = UserAuth();
  return <div>Allnotes</div>;
}

export default Allnotes;
