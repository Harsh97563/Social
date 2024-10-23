import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "./provider";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import StreakModal from "@/components/StreakModal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Streakified",
  description: "Streakified - Be consistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>"
      />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-backgroundThird min-h-screen pt-20 md:pt-14`}
      >
        <Navbar/>
        <StreakModal/>
        <Provider>
          {children}
        </Provider>
        <Toaster/>
      </body>
    </html>
  );
}
