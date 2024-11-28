"use client";

import { useState } from "react";
import Header from "@/app/components/homeHeader";
import InteractiveButton from "@/app/components/homeButton";

function RecentDocuments() {
  return <div>Here are your recent documents...</div>;
}

function Announcements() {
  return <div>Here are the latest announcements...</div>;
}

export default function Home() {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  return (
    <>
      <Header />

      <div className="flex justify-start h-80 w-full bg-homeLightBlueBG bg-opacity-[0.2] p-16 pl-[112px] pt-8">
        <h1 className="font-bold opacity-[0.70] text-[12px]">
          Request a New Document
        </h1>
      </div>

      <div className="flex space-x-4 pl-12 pt-8">
        {/* Button 1: Recent Documents */}
        <InteractiveButton
          text="Recent Documents"
          isActive={activeButton === "Recent Documents"}
          onClick={() => setActiveButton("Recent Documents")}
        />

        {/* Button 2: Announcements */}
        <InteractiveButton
          text="Announcements"
          isActive={activeButton === "Announcements"}
          onClick={() => setActiveButton("Announcements")}
        />
      </div>

      <div className="p-8 ml-5">
        {/* Render different components based on the active button */}
        {activeButton === "Recent Documents" && <RecentDocuments />}
        {activeButton === "Announcements" && <Announcements />}
      </div>
    </>
  );
}
