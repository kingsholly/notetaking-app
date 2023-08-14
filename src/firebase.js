// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyZkNOWdWKi3NhulQE574DAychI9G3iK4",
  authDomain: "noteapp-1095a.firebaseapp.com",
  projectId: "noteapp-1095a",
  storageBucket: "noteapp-1095a.appspot.com",
  messagingSenderId: "484257514133",
  appId: "1:484257514133:web:c149755a87309d5a0a919c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
export const db = getFirestore(app);
