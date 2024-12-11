"use client";

import { useEffect } from "react";
import Image from "next/image";
import Header from "./components/header";
import RequestBtn from "./components/request";
import ContentLoader from "./components/content-loader";
import TeamSection from "./components/teamSection";
import LandingSection from "./components/landingSection";
import Footer from "./components/footer";
import {
  GraduationCap,
  BookA,
  Globe,
  GavelIcon,
  User2Icon,
} from "lucide-react";

export default function Home() {
  return (
    <div>
      <Header />
      <RequestBtn
        text="Request a Document"
        isActive={true}
        redirectTo="/sign-in" // The URL to navigate to
      />
      <LandingSection />

      {/* Features Section */}
      <ContentLoader
        header="Fast and Reliable"
        content="Every request goes through a seamless process, giving you updates in real-time – no more endless waiting."
        imgSrc="/icons/paper_fast.png"
        imgPos="right"
        bgColor="white"
      />
      <ContentLoader
        header="Effortless Experience"
        content="Our system guides your requests from start to finish with clarity and ease – making the process straightforward and stress-free."
        imgSrc="/icons/easy.svg"
        imgPos="left"
        bgColor="[#0b5ca6]"
      />
      <ContentLoader
        header="Protected at Every Step"
        content="We prioritize your privacy with comprehensive encryption and strict data handling standards."
        imgSrc="/icons/secure.png"
        imgPos="right"
        bgColor="white"
      />

      {/* Trusted Offices Section */}
      <div
        style={{
          // maxHeight: "700px",
          backgroundColor: "#133683",
          color: "#ffffff",
          padding: "10rem",
          height: "700px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          Trusted by Administrative Offices
        </h2>
        <p style={{ textAlign: "center", marginBottom: "2rem" }}>
          Our platform is trusted by administrative offices for its reliability,
          security, and efficiency in handling document requests.
        </p>
        <div
          style={{
            height: "700px",
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div
            style={{ textAlign: "center" }}
            className="flex items-center justify-center flex-col"
          >
            {/* <Image
              src="/icons/gso.png"
              alt="General Services Office"
              width={80}
              height={80}
            /> */}
            <Globe width={80} height={80} />
            <p className="w-48 text-center">General Services Office (GSO)</p>
          </div>
          <div
            style={{ textAlign: "center" }}
            className="flex items-center justify-center flex-col"
          >
            {/* <Image
              src="/icons/osa.png"
              alt="Office of Student Affairs"
              width={80}
              height={80}
            /> */}
            <GraduationCap width={80} height={80} />
            <p className="w-48 text-center">Office of Student Affairs (OSA)</p>
          </div>
          <div
            style={{ textAlign: "center" }}
            className="flex items-center justify-center flex-col"
          >
            {/* <Image
              src="/icons/op.png"
              alt="Office of the President"
              width={80}
              height={80}
            /> */}
            <GavelIcon width={80} height={80} />
            <p className="w-48 text-center">Office of the President (OP)</p>
          </div>
          <div
            style={{ textAlign: "center" }}
            className="flex items-center justify-center flex-col"
          >
            {/* <Image
              src="/icons/oniclub.png"
              alt="Mommy Oni Club PH"
              width={80}
              height={80}
            /> */}
            <BookA width={80} height={80} />
            <p className="w-48 text-center">Office of Mommy Oni (OMO)</p>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div
        style={{
          height: "700px",
          backgroundColor: "#f9f9f9",
          padding: "2rem 1rem",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#133683",
            marginBottom: "1rem",
            fontSize: "2rem",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          What Users Think
        </h2>
        <p style={{ marginBottom: "2rem" }}>
          Explore honest reviews and ratings from users who’ve experienced our
          seamless process firsthand.
        </p>
        <div
          className="flex flex-col items-center justify-center"
          style={{
            maxWidth: "900px",
            height: "500px",
            margin: "0 auto",
            padding: "1.5rem",

            gap: "0.5rem",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
            position: "relative",
          }}
        >
          {/* <Image
            src="/images/member.png.jpg"
            alt="User Profile"
            width={60}
            height={60}
            style={{
              borderRadius: "50%",
              margin: "0 auto",
              display: "block",
            }}
          /> */}
          <User2Icon width={60} height={60} className="rounded-50" />
          <p style={{ fontWeight: "bold", marginTop: "1rem" }}>
            Tanya T., Administrative Officer
          </p>
          <div
            style={{
              color: "#FFC107",
              fontSize: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            ★★★★★
          </div>
          <p style={{ fontSize: "1rem", lineHeight: "2" }}>
            I've never been a fan of paperwork, but with WestTrack, it's like a
            breath of fresh air! The whole process is faster than my morning
            coffee, and the real-time updates keep me in the loop. No more
            waiting around for ages to get things done. I can finally enjoy my
            lunch without stressing over documents. Highly recommend – this is
            the future of paperwork, folks!
          </p>
        </div>
      </div>

      {/* About Section
      <div
        style={{
          height: "700px",
          padding: "2rem 1rem",
          backgroundColor: "#FFD700",
          textAlign: "center",
        }}
      >
        <h2 className="text-2xl font-bold mb-4">About WESTTRACK</h2>
        <p className="text-black text-base leading-relaxed max-w-3xl mx-auto">
          WestTrack is a Transaction Processing System developed for West Visayas State University. 
          Many students experience long wait times, sometimes taking hours or even days, to have 
          their documents signed by specific departments. 

          WestTrack is designed to tackle the common challenges students face when accessing 
          official documents. It significantly reduces processing times and enhances transaction 
          speeds while providing real-time status updates, transparency, and ease of access.</p>
      </div> */}

      {/* Team Section */}
      {/* <TeamSection /> */}

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
