"use client";

import { useEffect } from "react";
import Image from "next/image";
import Header from "./components/header";
import RequestBtn from "./components/request";
import ContentLoader from "./components/content-loader";
import { checking } from "@/lib/firebase";
import Head from "next/head";

export default function LandingPage() {
  // If `checking` is asynchronous, handle it appropriately (e.g., with useEffect).
  // const renderChecking = () => {
  //   try {
  //     const result = checking(); // Ensure it returns a valid React element.
  //     return result || null;
  //   } catch (error) {
  //     console.error("Error in checking:", error);
  //     return null;
  //   }
  // };

  return (
    <div>
      <Header />

      <div className="fixed bottom-0 right-0 bg-red-50 z-50">
        <RequestBtn />
      </div>

      <div>
        <Image
          src="/images/Home_bg.png"
          alt="background"
          layout="responsive"
          width={1000}
          height={100}
        />
      </div>
      <ContentLoader
        header="Fast and Reliable"
        content="Every request goes through a seamless process, giving you updates in real-time – no more endless waiting."
        imgSrc="/icons/paper_fast.png"
        imgPos="right"
      />
      <ContentLoader
        header="Effortless Experience"
        content="Our system guides your requests from start to finish with clarity and ease – making the process straightforward and stress-free."
        imgSrc="/icons/paper_fast.png"
        imgPos="left"
      />
      {/* {renderChecking()} */}
    </div>
  );
}
