import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

interface emailCredentials {
  email: string;
  password: string;
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google User Signed IN: ", result.user);
  } catch (error) {
    console.error(error);
  }
};

export const signInWithEmail = async ({
  email,
  password,
}: emailCredentials) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log("Email user signed in!: ", result.user);
  } catch (error) {
    console.error(error);
  }
};
