"use client";

import { signInWithEmail, signInWithGoogle } from "@/app/api/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleUser, setGoogleUser] = useState<any>(null);

  // const fetchData = async (accessToken: string) => {
  //   if (!accessToken) {
  //     console.error("Access token is required");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch user information");
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching user information:", error);
  //   }
  // };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      console.log("Google user signed in", result);
      setGoogleUser(result);
      alert(`User ${result?.userName} Logged In!`);
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
        <button onClick={handleEmailSignIn}>Sign In with Email</button>
        {googleUser?.photoUrl && (
          <div>
            <img src={googleUser.photoUrl} alt="User Photo" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
