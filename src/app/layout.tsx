
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, useAuth  } from "@clerk/nextjs";
import React from "react";
import "./globals.css";
import { getAuth, signInWithCustomToken } from "firebase/auth";
//

// async function signInWithClerkToFirebase() {
//   const { getToken } = useAuth();
//   const token = await getToken({ template: "firebase" });
//   if (token) {
//     const firebaseAuth = getAuth();
//     await signInWithCustomToken(firebaseAuth, token);
//   } else {
//     console.error("Failed to retrieve token");
//   }
// }

export const metadata = {
  title: "WestTrack",
  description: "Your Transactions Made Easier",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body>
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
