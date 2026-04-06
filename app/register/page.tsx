import RegistrationForm from "@/components/RegistrationForm";
import MatrixBackground from "@/components/MatrixBackground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration | Aavishkaar 2026",
  description: "Secure your squad for the ultimate tech event.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen relative flex flex-col items-center py-12 px-4 selection:bg-orange/30 transition-colors duration-300 overflow-x-hidden bg-bg-main pb-[500px]">
      <MatrixBackground />
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8 pt-10">
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <h1 
            className="text-5xl md:text-7xl font-space font-bold text-white uppercase tracking-widest"
            style={{ filter: "drop-shadow(0 0 15px rgba(255,255,255,0.1))" }}
          >
            Terminal <span className="text-orange">Access</span>
          </h1>
          <p className="text-sm md:text-base text-cyan tracking-[0.2em] max-w-2xl mx-auto px-4 font-tech uppercase">
            {"// Secure your spot in the ultimate tech event //"}
          </p>
        </div>

        <div className="relative z-10 w-full flex justify-center">
          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}
