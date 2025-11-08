import React from "react";
import "../globals.css";
import Nav from "@/components/Nav/Nav";

export const metadata = {
  title: "HCI App",
  description: "Migrated to App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
