import type { Metadata } from "next";
import "../globals.css";
import { Providers } from "./providers";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Lebroner - The LeBron James Fan Page",
  description: "The ultimate fan hub for LeBron James. Watch highlights, explore records, and follow the journey of the King.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Oswald:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
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
