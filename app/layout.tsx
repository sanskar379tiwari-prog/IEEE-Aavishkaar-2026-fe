import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Press_Start_2P,
  Space_Mono,
  Share_Tech_Mono,
  Space_Grotesk,
  Inter,
  Orbitron,
  Audiowide
} from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

// 1. Initialize all fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

const pressStart = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: ["400"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  weight: "400",
  variable: "--font-audiowide",
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
      suppressHydrationWarning
      /* 2. Combined all font variables and kept the 'dark' class from main */
      className={`
        ${geistSans.variable} 
        ${geistMono.variable} 
        ${shareTech.variable} 
        ${spaceMono.variable} 
        ${pressStart.variable} 
        ${spaceGrotesk.variable} 
        ${inter.variable} 
        ${orbitron.variable} 
        ${audiowide.variable} 
        dark
      `}
    >
      <body 
        className="antialiased min-h-screen flex flex-col bg-bg-main text-white font-tech selection:bg-orange/30"
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}