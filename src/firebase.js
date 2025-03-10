import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB-k05hgcDnuz3dklX0QFjEJu14L86govA",
  authDomain: "chatting-application-8f492.firebaseapp.com",
  projectId: "chatting-application-8f492",
  storageBucket: "chatting-application-8f492.firebasestorage.app",
  messagingSenderId: "320943601725",
  appId: "1:320943601725:web:c1c9d4f405d52b1df09254",
  measurementId: "G-FT6N7142MF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();



