"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { CustomGoogleOneTap } from "@/app/components/CustomGoogleOneTap";
import { auth } from "@/lib/firebase";
import { signInWithGoogle } from "@/app/api/signin-auth";
import { signInWithEmail } from "@/app/api/signin-auth";
import { FaGoogle } from "react-icons/fa";

function SignInPage() {
  // const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // // Handle form submission
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!isLoaded) return;

  //   try {
  //     const signInAttempt = await signIn.create({
  //       identifier: email,
  //       password,
  //     });

  //     if (signInAttempt.status === "complete") {
  //       await setActive({ session: signInAttempt.createdSessionId });
  //       router.push("/users/home"); // Redirect to the home page or dashboard
  //     } else {
  //       console.error("Additional steps required:", signInAttempt);
  //     }
  //   } catch (err: any) {
  //     setError(err?.errors?.[0]?.message || "An unexpected error occurred.");
  //   }
  // };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      try {
        if (user != null) {
          console.log(user);
          router.push("/users/home");
        }
      } catch (error) {
        setError("Invalid Credentials");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmail({ email, password });
      if (userCredential) {
        router.push("/users/home");
      } else {
        setError("Authentication failed. Please check your credentials.");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center sign-in-background">
      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden max-w-[900px] w-full">
        {/* Left Section */}
        <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-8">
          <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
          <h2 className="text-2xl font-bold text-gray-700 mt-4">Sign In</h2>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-[#0b5ca6] text-white p-8">
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded border border-gray-300 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-2 rounded border border-gray-300 text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-semibold py-2 rounded mt-4 shadow-lg transition duration-300 hover:bg-yellow-600"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm mt-6">
            Don't have an account?{" "}
            <a href="/sign-up" className="text-yellow-300 underline">
              Sign up here
            </a>
          </p>

          {/* Google Login Button */}
          <div className="mt-6">
            <button
              onClick={signInWithGoogle}
              className="w-full bg-yellow-500 text-white font-semibold py-2 rounded shadow-lg transition duration-300 hover:bg-yellow-600 flex items-center justify-center"
            >
              <FaGoogle width={20} height={20} className="mr-2" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
