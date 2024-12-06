"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface File {
  id: string;
  fileName: string;
  status: string;
  base64?: string;
  fileContent?: string | null;
  transactionInfo?: {
    claimedBy: string;
    claimedAt: string;
  };
}

export const Admin = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setIsAdmin(false);
      }
    });

    useEffect(() => {
      const checkAdminStatus = async () => {
        if (!userId) {
          setIsAdmin(false);
          return;
        }

        try {
          const adminCollection = collection(db, "admin");
          const adminSnapshot = await getDocs(adminCollection);
          const isAdminUser = adminSnapshot.docs.some(
            (doc) => doc.id === userId
          );
          setIsAdmin(isAdminUser);
        } catch (error) {
          console.error("Error checking admin status: ", error);
          setIsAdmin(false);
        }
      };

      checkAdminStatus();
    }, [userId]);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!isAdmin) return;
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "files"));
        const fetchedFiles = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            fileName: data.fileName || "",
            status: data.status || "",
            base64: data.base64 || "",
            fileContent: data.fileContent || null,
            transactionInfo: data.transactionInfo || {
              claimedBy: "",
              claimedAt: "",
            },
          };
        });
        setFiles(fetchedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [isAdmin]);

  const showFileStatus = (file: File) => {
    alert(`Current Status: ${file.status}`);
  };

  const downloadFile = ({
    fileName,
    base64,
  }: {
    fileName: string;
    base64: string;
  }) => {
    const blob = new Blob([atob(base64)], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const updateFileStatus = async (fileId: string, newStatus: string) => {
    try {
      const fileRef = doc(db, "files", fileId);
      const updatedData: Partial<File> = { status: newStatus };

      // If the status is "claimed," remove the PDF content
      if (newStatus === "claimed") {
        updatedData.fileContent = null; // Remove the Base64 content
        updatedData.transactionInfo = {
          claimedBy: auth.currentUser?.email || "Admin",
          claimedAt: new Date().toISOString(),
        };
      }

      await updateDoc(fileRef, updatedData);

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
    <div>
      <h1>Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              <strong>{file.fileName}</strong> (Status: {file.status})
              <button onClick={() => downloadFile(file)}>Download</button>
              <button onClick={() => showFileStatus(file)}>Show Status</button>
              <select
                onChange={(e) => updateFileStatus(file.id, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Change Status
                </option>
                <option value="processing">Processing</option>
                <option value="finished">Finished</option>
                <option value="conflict">Conflict</option>
                <option value="claimed">Claimed</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// export default Admin;
