"use client";

interface InteractiveButtonProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

export default function InteractiveButton({ text, isActive, onClick }: InteractiveButtonProps) {
  return (
    <button
      onClick={onClick}
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
