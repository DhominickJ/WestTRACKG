"use client";

import { signInWithEmail, signInWithGoogle } from "@/app/api/auth";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      console.log("Google user signed in", result);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      if (!email || !password) {
        alert("Please enter both email and password!");
        return;
      }
      const userCredential = await signInWithEmail({ email, password });
      console.log("Email user signed in:", userCredential);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Email sign-in error:", error.message);
      } else {
        console.error("Email sign-in error:", error);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleEmailSignIn}>Sign in with Email</button>
      </div>
    </div>
  );
};

export default Login;
