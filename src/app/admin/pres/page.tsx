"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import Header from "@/app/components/homeHeader";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";

interface File {
  id: string;
  fileName: string;
  status: string;
  date: Date; // Converted from Firestore Timestamp
  time: Date; // Converted from Firestore Timestamp
}

const Files = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!userId) {
        setFiles([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const q = query(
          collection(db, "processing"),
          where("userId", "==", userId) // Only files owned by the user are accessed
        );
        const querySnapshot = await getDocs(q);
        const fileData: File[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            fileName: data.fileName || "Unknown File",
            status: data.status || "Unknown Status",
            date: data.date?.toDate() || new Date(),
            time: data.time?.toDate() || new Date(),
          };
        });
        setFiles(fileData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching files: ", error.message);
        } else {
          console.error("Error fetching files: ", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [userId]);

  return (
    <>
      <Header
        onSearch={async (searchQuery: string) => {
          setLoading(true);
          try {
            const q = query(
              collection(db, "processing"),
              where("userId", "==", userId),
              where("fileName", ">=", searchQuery),
              where("fileName", "<=", searchQuery + "\uf8ff")
            );
            const querySnapshot = await getDocs(q);
            const fileData: File[] = querySnapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                fileName: data.fileName || "Unknown File",
                status: data.status || "Unknown Status",
                date: data.date?.toDate() || new Date(),
                time: data.time?.toDate() || new Date(),
              };
            });
            setFiles(fileData);
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.error("Error searching files: ", error.message);
            } else {
              console.error("Error searching files: ", error);
            }
          } finally {
            setLoading(false);
          }
        }}
      />
      <div className="m-12">
        <Link href="/users/home">
          <Image
            alt="back"
            src="/images/back.svg"
            width={200}
            height={200}
            className="cursor-pointer mb-5"
          />
        </Link>
        <h1 className="text-[42px] font-bold mb-8">📁 Your Files</h1>
        {loading ? (
          <p>Loading...</p>
        ) : userId ? (
          files.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border-4 border-red-50 rounded-lg overflow-hidden">
                <thead className="text-[16px]">
                  <tr className="bg-gray-100">
                    <th className="border border-westTrackGray bg-homeLightBlueBG px-4 py-2 text-left text-westTrackWhite">
                      📝 Filename
                    </th>
                    <th className="border border-westTrackGray bg-homeLightBlueBG px-4 py-2 text-left text-westTrackWhite">
                      📅 Date
                    </th>
                    <th className="border border-westTrackGray bg-homeLightBlueBG px-4 py-2 text-left text-westTrackWhite">
                      🕒 Time
                    </th>
                    <th className="border border-westTrackGray bg-homeLightBlueBG px-4 py-2 text-left text-westTrackWhite">
                      ⚪ Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr
                      key={file.id}
                      className="border-b border-gray-300 text-[16px]"
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        <a href={`/users/document?fileId=${file.id}`}>
                          {file.fileName}
                        </a>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {file.date.toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {file.time.toLocaleTimeString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {file.status}
                      </td>
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
    </>
  );
};

export default Files;
