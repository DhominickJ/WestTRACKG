// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.WESTTRACK_FIREBASE_API_KEY,
  authDomain: process.env.WESTTRACK_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.WESTTRACK_FIREBASE_PROJECT_ID,
  storageBucket: process.env.WESTTRACK_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.WESTTRACK_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.WESTTRACK_FIREBASE_APP_ID,
  measurementId: process.env.WESTTRACK_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = () => {
  initializeApp(firebaseConfig);
};
