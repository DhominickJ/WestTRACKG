"use client";

import { signInWithEmail, signInWithGoogle } from "@/app/api/auth";
import { NextApiRequest, NextApiResponse } from "next";
import Image from "next/image";
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
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      {/* Parent Container */}
      <div className="flex w-[90%] max-w-[1200px] h-[450px] justify-center">
        {/* Left Div */}
        <div className="flex flex-col w-4/12 items-center justify-center bg-yellow-400 p-6">
          <Image
            src="/Graphics/icon.svg"
            alt="WestTRACK Logo"
            width={100}
            height={100}
          />
          <h1 className="text-xl font-bold mt-4">Login</h1>
        </div>

        {/* Right Div */}
        <div className="flex flex-col w-4/12 items-center justify-center bg-blue-700 p-6">
          <button
            onClick={handleGoogleSignIn}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Sign in with Google
          </button>

          <div className="flex flex-col space-y-4 w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 border rounded-lg w-full"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 border rounded-lg w-full"
            />

            <button
              onClick={handleEmailSignIn}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Sign in with Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
