"use client";
import React, { useEffect, useState } from "react";
import {
  useFetchFiles,
  showFileStatus,
  downloadFile,
} from "@/app/api/fileOperations";

interface File {
  id: string;
  fileName: string;
  fileContent: string;
  status: string;
  userId: string;
}

const FetchFiles = () => {
  const { files, loading, userId } = useFetchFiles();
  const [fileStatus, setFileStatus] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (files) {
      const status = files.reduce((acc, file) => {
        acc[file.id] = showFileStatus(file.status);
        return acc;
      }, {} as { [key: string]: string });
      setFileStatus(status);
    }
  }, [files]);

  const handleDownload = (file: File) => {
    downloadFile(file);
  };

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
                <strong>{file.fileName}</strong> (Status: {fileStatus[file.id]})
                <button onClick={() => handleDownload(file)}>Download</button>
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

export default FetchFiles;
