import React from "react";
import Image from "next/image";

const LandingSection = () => {
  return (
    <header
      style={{
        position: "relative",
        height: "700px", // Adjust height as needed
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Image
        src="/images/Home_bg.png" // Ensure this image exists in the /public/images directory
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />

      {/* Logo and Tagline */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          zIndex: 2,
        }}
      >
        {/* Logo */}
        <div>
          <Image
            src="/images/logo.png"
            alt="WestTrack Logo"
            width={350}
            height={250}
          />
        </div>
        
        {/* Tagline */}
        <p
          style={{
            margin: "25px 10%",
            fontSize: "18px",
            fontStyle: "italic",
            color: "#000000",
            textAlign: "center",
          }}
        >
          Transact like never before
        </p>
      </div>
    </header>
  );
};

export default LandingSection;
