"use client";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function UploadPage() {
  const [fileName, setfileName] = useState<string | null>(null);
  const [filePreview, setfilePreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  interface Base64Data {
    base64Data: string;
    fileName: string;
  }

  // File Selection Handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setMessage("Please select a file!");
      return;
    }

    // Preparing for Storage by converting the file to base64
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string; // Converting to String
      const base64Data = base64.split(",")[1];
      localStorage.setItem("uploadedFile", base64.split(",")[1]);
      localStorage.setItem("uploadedFileName", file.name);
      setfileName(file.name);
      setfilePreview(base64);
      setMessage(`File '${file.name}' saved to localStorage`);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = async ({ base64Data, fileName }: Base64Data) => {
    setUploading(true);

    try {
      await addDoc(collection(db, "processing"), {
        userId: auth.currentUser?.uid || "annoymous",
        fileName: fileName,
        fileType: "application/pdf",
        fileContent: base64Data,
        status: "processed",
        createdAt: new Date(),
      });

      alert("File Uploaded Successfully!");
    } catch (error) {
      console.error("Error uploading file: ", error);
      alert("File Upload Failed!");
    } finally {
      setUploading(false);
    }
  };

  // Clearing the LocalStorage of the fileSystem
  const clearStorage = () => {
    localStorage.removeItem("uploadedFile");
    localStorage.removeItem("uploadedFileName");
    setfileName(null);
    setfilePreview(null);
    setMessage("Cleared PDF!");
  };

  return (
    <div className="container">
      <h1>Upload a File!</h1>
      <label htmlFor="fileUpload">Upload File:</label>
      <input
        id="fileUpload"
        type="file"
        onChange={handleFileChange}
        title="Choose a file"
      />
      {fileName && (
        <>
          <p>Stored File: {fileName}</p>
          {filePreview && (
            <div>
              <strong>Preview:</strong>
              <embed
                src={filePreview}
                type="application/pdf"
                width="600"
                height="400"
              />
            </div>
          )}
          <button
            onClick={() =>
              handleUploadClick({
                base64Data: localStorage.getItem("uploadedFile") || "",
                fileName: localStorage.getItem("uploadedFileName") || "",
              })
            }
          >
            Upload PDF
          </button>
        </>
      )}
      <button onClick={clearStorage} style={{ marginTop: "10px" }}>
        Clear Storage
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
