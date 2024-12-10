import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

interface userCredential {
  uid: string;
}
interface emailCredentials {
  email: string;
  password: string;
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google User Signed IN: ", result.user);
    return {
      accessToken: await result.user.getIdToken(),
      photoUrl: result.user.photoURL,
      userName: result.user.displayName,
    };
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
    return {
      uid: result.user.uid,
      accessToken: await result.user.getIdToken(),
    };
  } catch (error) {
    console.error(error);
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
    console.log("User signed out!");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
