import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "files"),
          where("userId", "==", auth.currentUser?.uid || "anonymous")
        );
        const querySnapshot = await getDocs(q);
        const fileData = [];
        querySnapshot.forEach((doc) => {
          fileData.push({ id: doc.id, ...doc.data() });
        });
        setFiles(fileData);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h1>Your Files</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              <strong>{file.fileName}</strong> (Status: {file.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Files;
