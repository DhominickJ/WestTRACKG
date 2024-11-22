"use client";
import { useState } from "react";

export default function UploadPage() {
  const [fileName, setfileName] = useState<string | null>(null);
  const [filePreview, setfilePreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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
      localStorage.setItem("uploadedFile", base64.split(",")[1]);
      localStorage.setItem("uploadedFileName", file.name);
      setfileName(file.name);
      setfilePreview(base64);
      setMessage(`File '${file.name}' saved to localStorage`);
    };
    reader.readAsDataURL(file);
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
        </>
      )}
      <button onClick={clearStorage} style={{ marginTop: "10px" }}>
        Clear Storage
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
