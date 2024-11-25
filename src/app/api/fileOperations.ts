"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface File {
  id: string;
  fileName: string;
  fileContent: string;
  status: string;
  userId: string;
}

export const useFetchFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setAuthInitialized(true);
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
            fileContent: data.fileContent,
            status: data.status,
            userId: data.userId,
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

  return { files, loading, userId };
};

export const showFileStatus = (status: string) => {
  alert(`Current Status: ${status}`);
};

// export const downloadFile = (file: File) => {
//   try {
//     if (!isValidBase64(file.fileContent)) {
//       throw new Error("Invalid base64 string");
//     }
//     const base64Content = file.fileContent.replace(
//       /^data:application\/pdf;base64,/,
//       ""
//     );
//     const decodedContent = decodeBase64(base64Content);
//     const blob = new Blob([decodedContent], { type: "application/pdf" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = file.fileName;
//     link.click();
//     URL.revokeObjectURL(link.href);
//   } catch (error) {
//     console.error("Failed to decode file content: ", error);
//   }
// };

export const downloadFile = ({ fileName, fileContent }: File) => {
  try {
    // Ensure Base64 padding
    const paddedBase64 = fileContent.padEnd(
      fileContent.length + ((4 - (fileContent.length % 4)) % 4),
      "="
    );

    console.log("Base64 start:", paddedBase64.substring(0, 20)); // First 20 characters
    console.log("Base64 end:", paddedBase64.slice(-20)); // Last 20 characters

    // Decode Base64
    const binary = atob(paddedBase64);

    // Create Uint8Array for binary data
    const binaryArray = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      binaryArray[i] = binary.charCodeAt(i);
    }

    // Create Blob from binary data
    const blob = new Blob([binaryArray], { type: "application/pdf" });

    // Download Blob
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    // Revoke Object URL
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error decoding Base64 or downloading file:", error.message);
  }
};

// const isValidBase64 = (str: string) => {
//   const base64Regex =
//     /^(?:[A-Za-z0-9+\/]{4})*?(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
//   return base64Regex.test(str);
// };

// const decodeBase64 = (str: string) => {
//   try {
//     return atob(str);
//   } catch (error) {
//     // Handle padding issues
//     const paddedStr = str.padEnd(
//       str.length + ((4 - (str.length % 4)) % 4),
//       "="
//     );
//     return atob(paddedStr);
//   }
// };
