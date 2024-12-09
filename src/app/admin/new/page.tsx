"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";
import { db } from "@/lib/firebase";

const NewAdminPage = () => {
  const [office, setOffice] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "admin", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          router.push(`/admin/${userData.office}`);
        }
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, db, router]);

  interface OfficeChangeEvent extends React.ChangeEvent<HTMLSelectElement> {}

  const handleOfficeChange = (event: OfficeChangeEvent) => {
    setOffice(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      await setDoc(doc(db, "admins", user.uid), { office });
      router.push(`/admin/${office}`);
    }
  };

  return (
    <div>
      <h1>Choose Your Office</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Office:
          <select value={office} onChange={handleOfficeChange}>
            <option value="">Select Office</option>
            <option value="osa">OSA</option>
            <option value="vpaa">VPAA</option>
            <option value="pres">PRES</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewAdminPage;
