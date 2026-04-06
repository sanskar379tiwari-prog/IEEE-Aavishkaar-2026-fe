"use client"; // Kept from temp to support the CSS animation logic below

import RegistrationForm from "@/components/RegistrationForm";
import MatrixBackground from "@/components/MatrixBackground";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Landing } from "@/components/Landing";

// Note: Metadata cannot be exported from a Client Component. 
// If you need SEO, move metadata to a separate layout.tsx file.

export default function Home() {
  return (
    <main className="relative flex-grow">
      {/* 
          The Landing component already contains the Matrix background, 
          Hero section, and Events section. We render it directly here 
          to avoid duplication.
      */}
      <Landing />
    </main>
  );
}