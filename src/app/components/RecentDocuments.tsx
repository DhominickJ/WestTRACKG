"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";
import { Document, Page, pdfjs } from "react-pdf";

// Import required styles for annotation and text layers
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure the worker file
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;

interface FileData {
  id: string;
  fileName: string;
  fileContent: string; // Base64 encoded string
}

export default function PdfViewer() {
  const { userId: clerkUserId, isLoaded } = useAuth();
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!clerkUserId || !isLoaded) {
        setFiles([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const q = query(
          collection(db, "processing"),
          where("userId", "==", clerkUserId)
        );
        const querySnapshot = await getDocs(q);

        const fetchedFiles: FileData[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            fileName: data.fileName,
            fileContent: data.fileContent, // Base64 string from Firestore
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
  }, [clerkUserId, isLoaded]);

  return (
    <div className="container">
      {loading ? (
        <p>Loading files...</p>
      ) : files.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="border p-4 text-justify truncate"
              style={{ maxWidth: "320px" }}
            >
              <div
                style={{
                  overflow: "hidden",
                  width: "320px",
                  height: "400px",
                  // margin: "0 auto",
                  scale: "0.5",
                  border: "1px solid black",
                }}
              >
                  <Document
                    file={`data:application/pdf;base64,${file.fileContent}`}
                    className="w-full overflow-hidden"
                  >
                    <Page
                      pageNumber={1}
                      scale={1.2} // Adjust scaling for proper fit
                      width={250} // Fix the width to 300px
                    />
                  </Document>
              </div>
              <p className="mt-1 ">{file.fileName}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
}
