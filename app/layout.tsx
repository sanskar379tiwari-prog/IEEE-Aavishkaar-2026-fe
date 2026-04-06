import type { Metadata } from "next";
import { Share_Tech_Mono, Space_Mono } from "next/font/google";
import "./globals.css";

const shareTech = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-tech",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IEEE Techfest 2026",
  description: "Official TechFest Registration System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${shareTech.variable} ${spaceMono.variable} dark`}
    >
      <body className="antialiased min-h-screen flex flex-col bg-bg-main text-white font-tech selection:bg-orange/30">
        {children}
      </body>
    </html>
  );
}