"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

interface File {
  id: string;
  fileName: string;
  status: string;
}

const Files = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false); // Track when auth state is determined

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setAuthInitialized(true); // Auth state is now determined
    });

    return () => unsubscribe();
  }, []);

  // Fetch files once userId is set
  useEffect(() => {
    const fetchFiles = async () => {
      if (!userId) {
        setFiles([]); // Clear files if no user is logged in
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "processing"),
          where("userId", "==", userId)
        );
        // console.log(userId);
        const querySnapshot = await getDocs(q);
        const fileData: File[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, fileName: data.fileName, status: data.status };
        });

        setFiles(fileData);
      } catch (error) {
        console.error("Error fetching files: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (authInitialized) {
      setLoading(true); // Set loading before fetching files
      fetchFiles();
    }
  }, [userId, authInitialized]);

  return (
    <div>
      <h1>Your Files</h1>
      {loading ? (
        <p>Loading...</p>
      ) : userId ? (
        files.length > 0 ? (
          <ul>
            {files.map((file) => (
              <li key={file.id}>
                <strong>{file.fileName}</strong> (Status: {file.status})
              </li>
            ))}
          </ul>
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
