import React from "react";
import "../globals.css";
import { Providers } from "./providers";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "LeBroner - LeBron James Fan Club",
  description: "The ultimate destination for fans of King James. Stats, highlights, and the legacy of the greatest of all time.",
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
