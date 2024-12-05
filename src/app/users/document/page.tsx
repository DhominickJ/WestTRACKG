//this page will be used to view the document to be signed by the student

"use client";

import { File } from "@/app/api/fileOperations";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getFileById } from "@/app/api/fileOperations";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  FaRegFileAlt,
  FaRegIdCard,
  FaRegCalendarAlt,
  FaRegClock,
  FaUserGraduate,
} from "react-icons/fa";

function DocView() {
  const searchParams = useSearchParams();
  const fileId = searchParams.get("fileId");
  const [file, setFile] = useState<File | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (fileId) {
      getFileById(fileId as string)
        .then(setFile)
        .catch(console.error);
    }
  }, [fileId]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email);
      } else {
        setUserName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="w-full h-20 bg-[#d9d9d9] flex items-center justify-around ">
        <div className="w-[198px] h-[30px] bg-[#0b5ca6] rounded-lg"></div>
        <div className="w-[837px] h-[50px] bg-neutral-100 rounded-lg"></div>
        <div className="w-[115px] h-[30px] bg-[#0b5ca6] rounded-lg"></div>
        <div className="w-[94px] h-[30px] bg-[#d61212] rounded-lg"></div>
      </div>
      <div className="flex w-full h-screen items-center justify-center">
        <div className="w-[15rem] h-[90vh] bg-[#d9d9d9] rounded-lg">
          <div className="document flex flex-col pt-5">
            <div className="DocumentInfo w-72 h-6 pb-10 pl-2 text-black text-2xl font-bold font-['Inter']">
              <p>Document Info</p>
              <div className="flex items-center ">
                <FaRegFileAlt className="ml-2" />
                <p className="PermitToUseFacilities pl-5 text-black text-base font-bold font-['Inter']">
                  Permit to Use Facilities
                </p>
              </div>
            </div>
            <div className="pl-10 pt-5 text-ms">
              <div className="flex items-center">
                <FaRegIdCard className="mr-5" />
                <p className="text-black font-normal font-['Inter'] underline">
                  Requested by:{" "}
                </p>
              </div>
              <p className="text-black font-bold font-['Inter'] underline ml-5">
                {userName}
              </p>
              <div className="flex items-center">
                <FaRegCalendarAlt className="mr-5" />
                <p className="text-black font-normal font-['Inter'] underline">
                  Date:{" "}
                </p>
              </div>
              <p className="text-black font-bold font-['Inter'] underline ml-5">
                November 14, 2024
              </p>
              <div className="flex items-center">
                <FaRegClock className="mr-5" />
                <p className="text-black font-normal font-['Inter'] underline">
                  Time:{" "}
                </p>
              </div>
              <p className="text-black font-bold font-['Inter'] underline ml-5">
                12:51 PM
              </p>
              <div className="flex items-center">
                <FaUserGraduate className="mr-5" />
                <p className="text-black font-normal font-['Inter'] underline">
                  Program:{" "}
                </p>
              </div>
              <p className="text-black font-bold font-['Inter'] underline ml-5">
                BSCS 3-A AI
              </p>
            </div>
          </div>
          <div className="document flex flex-col pt-5">
            <div className="DocumentInfo w-72 h-6 pb-10 pl-2 text-black text-2xl font-bold font-['Inter']">
              <p>Downloadables</p>
              <div className="flex items-center ">
                <FaRegFileAlt className="ml-2" />
                <p className="PermitToUseFacilities pl-5 text-black text-base font-bold font-['Inter']">
                  Permit Templates
                </p>
              </div>
              <div className="flex items-center w-40">
                <FaRegFileAlt className="ml-5 w-9" />
                <p className="LetterDean pl-5 text-black font-normal text-sm font-['Inter']">
                  Letter of the Dean Template
                </p>
              </div>
            </div>
          </div>
        </div>
        {file ? (
          <div className="flex-grow flex-col w-full mt-[-5]">
            {/* <h1>{file.fileName}</h1> */}
            <iframe
              title="Document Viewer"
              src={`data:application/pdf;base64,${file.fileContent}`}
              width="100%"
              height="600px"
            />
          </div>
        ) : (
          <p>Loading Document</p>
        )}
        <div>
          <div className="w-[15rem] h-[90vh] bg-[#d9d9d9] rounded-lg"></div>
        </div>
      </div>
    </>
  );
}

export default DocView;
