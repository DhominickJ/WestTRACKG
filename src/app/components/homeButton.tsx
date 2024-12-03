"use client";

import { useRouter } from "next/router";

interface RedirectButtonProps {
  text: string;
  isActive: boolean;
  redirectTo: string; // The URL to navigate to
}

export default function RedirectButton({ text, isActive, redirectTo }: RedirectButtonProps) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(redirectTo); // Navigate to the specified page
  };

  return (
    <button
      onClick={handleRedirect}
      className={`px-4 py-2 rounded-[50px] transition-colors duration-300 border-[1px] text-[12px] ${
        isActive
          ? "bg-homeLightBlueBG text-white border-transparent" // Active: No visible border
          : "bg-westTrackGray text-black border-black border-opacity-[0.5]" // Inactive: Black border
      }`}
    >
      {text}
    </button>
  );
}


