import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050a14] text-white font-mono">
      
      {/* ── IMPORTED NAVBAR ── */}
      <Navbar />

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
         <div className="h-[800px] border border-orange-900/30 rounded-lg flex items-center justify-center text-orange-900/50 text-sm tracking-widest">
            [ MAIN CONTENT GOES HERE ]
         </div>
      </main>

      {/* ── IMPORTED FOOTER ── */}
      <Footer />
      
    </div>
  );
}