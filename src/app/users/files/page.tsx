"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";

interface File {
  id: string;
  fileName: string;
  status: string;
  date: Timestamp; // Store as Timestamp
  time: Timestamp; // Store as Timestamp
}

const Files = () => {
  const { userId: clerkUserId, isLoaded } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(clerkUserId ?? null);
      } else {
        setUserId(null);
      }
      setAuthInitialized(true);
    });

    return () => unsubscribe();
  }, [clerkUserId]);

  // Fetch files once userId is set
  useEffect(() => {
    const fetchFiles = async () => {
      if (!userId) {
        setFiles([]);
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "processing"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const fileData: File[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            fileName: data.fileName,
            status: data.status,
            date: data.date, // Should be a Timestamp
            time: data.time, // Should be a Timestamp
          };
        });

        setFiles(fileData);
      } catch (error) {
        console.error("Error fetching files: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (authInitialized) {
      setLoading(true);
      fetchFiles();
    }
  }, [userId, authInitialized]);

  return (
    <div className="m-12">
      <Link href="/users/home">
        <Image 
          alt="back"
          src="/images/Home_bg.png"
          width={40}
          height={40}
          className="cursor-pointer"
          />
      </Link>
      <h1 className="text-[36px] font-bold mb-8">📁 Your Files</h1>
      {loading ? (
        <p>Loading...</p>
      ) : userId ? (
        files.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border-4 border-red-50 rounded-lg overflow-hidden ">
              <thead className="text-[16px]">
                <tr className="bg-gray-100">
                  <th className="border border-westTrackGray bg-homeLightBlueBG px-4 py-2 text-left text-westTrackWhite text-[16px]">🗂️ Document ID</th>
                  <th className="border border-westTrackGray bg-homeLightBlueBG px-4 py-2 text-left text-westTrackWhite">📝 Filename</th>
                  <th className="border border-westTrackGray bg-homeLightBlueBG px-4 py-2 text-left text-westTrackWhite">📅 Date</th>
                  <th className="border border-westTrackGray bg-homeLightBlueBG px-4 py-2 text-left text-westTrackWhite">🕒 Time</th>
                  <th className="border border-westTrackGray bg-homeLightBlueBG px-4 py-2 text-left text-westTrackWhite">⚪ Status</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id} className="border-b border-black text-[16px]">
                    <td className="border-l-4 border-l-black border-gray-300  px-4 py-2">{file.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{file.fileName}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {file.date ? file.date.toDate().toLocaleDateString() : "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {file.time ? file.time.toDate().toLocaleTimeString() : "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{file.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No files found.</p>
        )
      ) : (
        <p>Please log in to view your files.</p>
      )}
    </div>
  );
};

export default Files;