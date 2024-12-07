"use client";
import React from "react";
import Image from "next/image";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignInPage() {
  const router = useRouter();

  const { signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (signIn) {
        await signIn.create({
          identifier: email,
          password,
        });
        alert("Successful Sign In");
        router.push("/users/files");
      } else {
        alert("Error Sign In");
      }
    } catch (error) {
      console.log(error);
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
          <form>
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

            {/* <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-semibold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Re-enter your password"
                className="w-full p-2 rounded border border-gray-300 text-black"

              />
            </div> */}

            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-semibold py-2 rounded mt-4 shadow-lg transition duration-300 hover:bg-yellow-600"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </form>

          <p className="text-sm mt-6">
            Already have an account?{" "}
            <a href="/sign-in" className="text-yellow-300 underline">
              Sign In here
            </a>
          </p>

          <p className="text-xs mt-4 text-gray-300">
            By signing up, you agree to WESTTRACK's{" "}
            <a href="/terms" className="text-yellow-300 underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-yellow-300 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;