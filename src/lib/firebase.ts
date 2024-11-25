// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_WESTTRACK_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_WESTTRACK_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_WESTTRACK_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_WESTTRACK_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_WESTTRACK_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_WESTTRACK_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_WESTTRACK_FIREBASE_MEASUREMENT_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBVDNMXTRV-BQZfUQRpqmep6cnlZMG1XJg",
//   authDomain: "westtrack-d1190.firebaseapp.com",
//   projectId: "westtrack-d1190",
//   storageBucket: "westtrack-d1190.firebasestorage.app",
//   messagingSenderId: "232535608399",
//   appId: "1:232535608399:web:c20199f35020092dc56e3a",
//   measurementId: "G-FKBGM191ZM",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const checking = () => {
  console.log("test", process.env.WESTTRACK_FIREBASE_API_KEY);
};
