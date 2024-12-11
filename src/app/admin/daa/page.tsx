"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import Header from "@/app/components/homeHeader";
import Image from "next/image";
import { onAuthStateChanged } from "firebase/auth";
import InteractiveButton from "@/app/components/homeButton";
import ViewProcessingFilesPage from "@/app/components/RecentDocuments";
import ViewFinishedFilesPage from "@/app/components/CheckedDocuments";
import AnnouncementComponent from "@/app/components/announcement";
import AnnouncementList from "@/app/components/announcement";

function RecentDocuments() {
  return (
    <div>
      <h1 className="font-bold opacity-[0.70] text-[12px]">Processing</h1>

      {/* get user files from processing in db */}
      <ViewProcessingFilesPage searchQuery={""} />

      <h1 className="font-bold opacity-[0.70] text-[12px] mt-2">Finished</h1>
      {/* get user files from finished in db */}
      <ViewFinishedFilesPage searchQuery={""} />
    </div>
  );
}

function Announcements() {
  return (
    <>
      <AnnouncementList />
    </>
  );
}

interface File {
  id: string;
  fileName: string;
  status: string;
  date: Date; // Converted from Firestore Timestamp
  time: Date; // Converted from Firestore Timestamp
  officeConcerned: string;
  fileContent?: string; // Add this line
  transactionInfo?: {
    claimedBy: string;
    claimedAt: string;
  };
}

const Files = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState<string>("Recent Documents");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
          where("officeConcerned", "==", "daa"),
          where("officeConcerned", "!=", "")
        );
        const querySnapshot = await getDocs(q);
        const fileData: File[] = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              fileName: data.fileName || "Unknown File",
              status: data.status || "Unknown Status",
              date: data.date?.toDate() || new Date(),
              time: data.time?.toDate() || new Date(),
              officeConcerned: data.officeConcerned,
            };
          })
          .filter((file) => file.officeConcerned === "daa");
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

  const updateFileStatus = async (fileId: string, newStatus: string) => {
    try {
      const fileRef = doc(db, "processing", fileId);
      const updatedData: Partial<File> = { status: newStatus };

      // If the status is "claimed," remove the PDF content
      if (newStatus === "claimed") {
        updatedData.fileContent = ""; // Remove the Base64 content
        updatedData.transactionInfo = {
          claimedBy: auth.currentUser?.email || "Admin",
          claimedAt: new Date().toISOString(),
        };
        await updateDoc(fileRef, updatedData);
        await addDoc(collection(db, "finished"), {
          // Add to the finished transaction collection
          fileId: fileId,
          claimedBy: auth.currentUser?.email || "Admin",
          claimedAt: new Date().toISOString(),
        });
      }
      // Create another update on the file itself to reflect on the database

      // Update the state to reflect the changes
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === fileId ? { ...file, ...updatedData } : file
        )
      );

      alert(`File status updated to: ${newStatus}`);
    } catch (error) {
      console.error("Error updating file status:", error);
      alert("Failed to update file status. Please try again.");
    }
  };

  return (
    <>
      <Header
        onSearch={async (searchQuery: string) => {
          setLoading(true);
          try {
            const q = query(
              collection(db, "processing"),
              where("fileName", ">=", searchQuery),
              where("fileName", "<=", searchQuery + "\uf8ff"),
              where("officeConcerned", "==", "daa")
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
                officeConcerned: data.officeConcerned || "Unknown Office",
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
      <div className="justify-start h-[325px] w-full bg-homeLightBlueBG p-16 pl-[112px] pt-16 pb-0">
        {/* Other elements */}
        <h1 className="text-[24px] font-normal text-westTrackWhite text-opacity-50">
          Welcome,
        </h1>
        <h1
          className="text-[72px] font-bold text-westTrackWhite"
          style={{ opacity: 1 }}
        >
          Department Academic Agency
        </h1>
      </div>
      <div className="m-12">
        <h1 className="text-[42px] font-bold mb-8">📁 Review Files</h1>
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
                        <a href={`/admin/document?fileId=${file.id}`}>
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
                        <select
                          title="File Selector"
                          onChange={(e) =>
                            updateFileStatus(file.id, e.target.value)
                          }
                          defaultValue="Select Status"
                          name="fileUpdater"
                        >
                          <option value="" disabled>
                            Change Status
                          </option>
                          <option value="processing">Processing</option>
                          <option value="finished">Finished</option>
                          <option value="conflict">Conflict</option>
                          <option value="claimed">Claimed</option>
                        </select>
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
