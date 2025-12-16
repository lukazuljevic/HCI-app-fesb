import React from "react";
import "../globals.css";
import { Providers } from "./providers";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";

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
        <Providers>
            <Nav />
            <main>{children}</main>
            <Footer />
        </Providers>
      </body>
    </html>
  );
}
