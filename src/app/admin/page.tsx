"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { User } from "firebase/auth";

// // Extend the User type to include the office property
// declare module "firebase/auth" {
//   interface User {
//     office?: string;
//   }
// }

const AdminPage = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const checkAdmin = async () => {
      if (auth) {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          return setUser(user);
        });

        return () => unsubscribe();
      }

      try {
        if (!user) {
          console.log(user);
          return;
        }

        const db = getFirestore();
        const adminCollection = collection(db, "admin");
        const adminSnapshot = await getDocs(adminCollection);
        const adminList = adminSnapshot.docs.map((doc) => doc.data());
        const isAdmin = adminList.some((admin) => admin.userId === user.uid);

        if (!isAdmin) {
          router.push("/not-authorized");
          return;
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };

    checkAdmin();
    // console.log(user);
    const getUserOffice = async () => {
      try {
        if (!user) {
          return;
        }

        const db = getFirestore();
        const userDoc = await getDocs(collection(db, "admin"));
        const userData = userDoc.docs
          .find((doc) => doc.id === user.uid)
          ?.data();

        if (userData && userData.office) {
          switch (userData.office) {
            case "vpaa":
              router.push("/admin/vpaa");
              break;
            case "osa":
              router.push("/admin/osa");
              break;
            case "pres":
              router.push("/admin/pres");
              break;
            default:
              router.push("/");
              break;
          }
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error getting user office:", error);
      }
    };

    getUserOffice();
  }, [router, user]);

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Loading...</p>
    </div>
  );
};

export default AdminPage;
