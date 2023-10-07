// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWIQtw9LR7yrM02IUUQVFU5VmYCn_Stt8",
  authDomain: "untitled-bc23c.firebaseapp.com",
  projectId: "untitled-bc23c",
  storageBucket: "untitled-bc23c.appspot.com",
  messagingSenderId: "199258056417",
  appId: "1:199258056417:web:dfcc3ad1d1d2cbf3e9b9a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
