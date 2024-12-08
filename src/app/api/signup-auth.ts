import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";

interface signupInfo {
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const SignupAuth = ({
  emailAddress,
  password,
  firstName,
  lastName,
}: signupInfo) => {
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailAddress,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      await sendEmailVerification(userCredential.user);

      setVerifying(true); // Display the verification form
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;

      if (user) {
        await user.reload();
        if (user.emailVerified) {
          router.push("/users/home");
        } else {
          setError("Email not verified. Please check your inbox.");
        }
      } else {
        setError("No user is signed in.");
      }
    } catch (err: any) {
      console.error("Error:", JSON.stringify(err, null, 2));
      setError("An unexpected error occurred.");
    }
  };
};
