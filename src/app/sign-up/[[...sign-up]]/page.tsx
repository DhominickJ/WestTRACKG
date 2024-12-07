"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import {
  NotificationPopup,
  LoginNotificationPop,
} from "@/app/components/notificationPopup";

function SignUpPage() {
  const router = useRouter();

  const { signUp } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (signUp) {
        await signUp.create({
          firstName,
          lastName,
          emailAddress: email,
          password,
        });
        LoginNotificationPop;
      } else {
        console.error("signUp is undefined");
      }
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden max-w-[900px] w-full">
        {/* Left Section */}
        <div className="w-1/2 bg-[#0b5ca6] flex flex-col justify-center items-center text-white p-8">
          <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
          <h2 className="text-3xl font-bold mt-4">Sign Up</h2>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-white p-8 relative">
          {/* Back Button */}
          <button
            className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-black"
            onClick={() => router.back()}
          >
            <span className="mr-2 text-lg">&larr;</span>
            Back
          </button>

          {/* Form */}
          <h3 className="text-2xl font-bold mb-6 mt-10 text-gray-700">
            Create a new account
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="flex w-1/2 p-3 mr-2 border border-gray-300 rounded text-black"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 p-3 border border-gray-300 rounded text-black"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border border-gray-300 rounded text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-semibold py-3 rounded shadow-lg transition duration-300 hover:bg-yellow-600"
              onClick={() => {
                handleSubmit;
              }}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
