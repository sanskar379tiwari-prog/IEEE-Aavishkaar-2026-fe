"use client";

import React, { useEffect, useState } from 'react';
import { RegistrationFormValues } from "@/lib/validations/registration";

export const ReceiptSuccessCard = ({ data }: { data: RegistrationFormValues, onReset: () => void }) => {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    // Auto-trigger print animation for a smooth transition
    const t = setTimeout(() => {
      setIsPrinting(true);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  // Dynamically compute absolute wrapper height based on the number of members so the receipt 
  // pushes all the page content down naturally, staying relative to the main layout size.
  const computedHeight = 580 + (data.teamMembers.length * 45);

  return (
    <div
      className="receipt-container flex flex-col items-center justify-center  w-full relative"
      style={{ minHeight: `${computedHeight}px` }}
    >
      <div className={`wrapper ${isPrinting ? 'printing' : ''}`}>
        <div className="printer" />
        <div className="printer-display flex items-center justify-center p-1">
          <span className="printer-message uppercase font-bold text-[#00ded4]">UPLINK ESTABLISHED</span>
          <div className="letter-wrapper text-[#ff5f34] absolute font-bold tracking-widest pl-2 uppercase hidden-until-print">
            <span className="letter">I</span>
            <span className="letter">S</span>
            <span className="letter">S</span>
            <span className="letter">U</span>
            <span className="letter">I</span>
            <span className="letter">N</span>
            <span className="letter">G</span>
            <span className="letter">.</span>
            <span className="letter">.</span>
            <span className="letter">.</span>
          </div>
        </div>

        <button className="print-button" onClick={() => setIsPrinting(true)} disabled={isPrinting}>🖨</button>

        <div className="receipt-wrapper">
          <div className="receipt">
            <div className="receipt-header text-[#ff5f34]">
              AAVISHKAAR 2026 <br />
              SYS_REGISTRY_LOG <br />
              <div className="logo text-[#00ded4]">⚡</div>
            </div>

            <div className="text-[#00ded4] uppercase tracking-widest leading-relaxed text-[11px] mb-3">
              <div className="flex justify-between border-b border-dashed border-[#00ded4]/30 pb-1 mb-1">
                <span>TEAM_NAME</span> <span className="text-[#ff5f34] font-bold text-right">{data.teamName}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-[#00ded4]/30 pb-1 mb-1">
                <span>LEAD_NAME</span> <span className="text-white text-right">{data.leadName}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-[#00ded4]/30 pb-1 mb-1">
                <span>LEAD_EMAIL</span> <span className="text-white lowercase text-right">{data.leadEmail}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-[#00ded4]/30 pb-1 mb-1">
                <span>LEAD_PHONE_NO</span> <span className="text-white text-right">{data.leadPhone}</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-[#00ded4]/30 pb-1 mb-1">
                <span>LEAD_USN</span> <span className="text-[#ff5f34] text-right">{data.leadUSN}</span>
              </div>
              <div className="flex justify-between mt-2 opacity-80 text-[9px]">
                <span>TS: {new Date().toISOString().split('T')[0]} / {new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="text-[#ff5f34] uppercase tracking-widest font-bold mb-2 text-[11px] mt-4 border-t border-dashed border-[#00ded4] pt-3">
              SQUAD_MEMBERS
            </div>

            <table className="receipt-table text-[#00ded4] text-[10px] uppercase tracking-widest">
              <tbody>
                <tr>
                  <th className="text-left w-[25%] border-b border-dashed border-[#00ded4] opacity-70 pb-1">ID</th>
                  <th className="text-right w-[75%] border-b border-dashed border-[#00ded4] opacity-70 pb-1">IDENTITY / USN</th>
                </tr>
                {data.teamMembers.map((m, i) => (
                  <tr key={i}>
                    <td className="pt-2 border-b border-[#00ded4]/20 pb-2 align-top">MBR_{String(i + 1).padStart(2, '0')}</td>
                    <td className="pt-2 text-right border-b border-[#00ded4]/20 pb-2">
                      <span className="text-white tracking-widest">{m.name || "N/A"}</span>
                      <br />
                      <span className="text-[#ff5f34] text-[9px] mt-1 inline-block">{m.usn || "N/A"}</span>
                    </td>
                  </tr>
                ))}
                <tr className="text-[#ff5f34]">
                  <td colSpan={1} className="py-2 font-bold pt-4">TOTAL_UNITS</td>
                  <td colSpan={1} className="py-2 text-right font-bold pt-4">{data.teamMembers.length + 1}</td>
                </tr>
              </tbody>
            </table>

            <div className="receipt-message text-[#00ded4] mt-2 mb-1 tracking-[0.2em] border-t border-dashed border-[#00ded4] pt-3 text-center text-[10px]">
              {"// CLEARANCE.GRANTED //"}
            </div>

            <div className="mt-6 mb-2 w-full text-center text-[#ff5f34] font-space font-bold uppercase tracking-[0.3em] text-[11px] opacity-90">
              {"// ALL_THE_BEST //"}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .receipt-container {
          --printer-color: #5c1f09;
          --printer-color-2: #8f310f;
          --receipt-color: #0b0e14;
          --text-color: #94a3b8;
          --text-highlight: #00ded4;
          --text-accent: #ff5f34;

          font-size: 14px;
          user-select: none;
        }

        .wrapper {
          position: relative;
          margin-top: 60px;
        }

        .printer {
          width: 440px;
          height: 80px;
          border-radius: 0 0 8px 8px;
          background-color: var(--printer-color);
          border: 2px solid var(--printer-color-2);
          box-shadow: 0 16px 32px 0px #0002, 0 -30px 16px 0px #0001;
        }

        .printer::before {
          content: "";
          position: absolute;
          top: -30px;
          left: 0;
          width: 100%;
          height: 70px;
          border-radius: 12px 12px 0 0;
          border-bottom: 2px solid var(--text-accent);
          box-shadow: 0 12px 16px -12px rgba(255, 95, 52, 0.4) inset, 0 -6px 16px -6px #0003 inset, 0 6px 8px -6px #0004;
          box-sizing: border-box;
          background-color: var(--printer-color);
          filter: brightness(1.2);
          z-index: 2;
        }

        .printer::after {
          content: "";
          position: absolute;
          top: 20px;
          left: 40px;
          width: 360px;
          height: 40px;
          border-radius: 0 0 4px 4px;
          border-bottom: 1px solid #0003;
          background-color: inherit;
          background-image: linear-gradient(to top, var(--printer-color), 60%, var(--printer-color-2));
          box-shadow: 0 4px 4px -2px #0004;
          z-index: 1;
        }

        .printer-display {
          z-index: 2;
          display: flex;
          padding: 6px 8px;
          position: absolute;
          top: -10px;
          left: 40px;
          width: 180px;
          height: 36px;
          background-color: #000;
          background-image: linear-gradient(transparent 0, rgba(255,255,255,0.05) 90%, transparent 100%);
          background-size: 100% 8px;
          background-repeat: no-repeat;
          border: 1px solid var(--text-highlight);
          border-radius: 4px;
          box-sizing: border-box;
          font-family: var(--font-share-tech), monospace;
          font-size: 0.8em;
          box-shadow: 0 0 10px rgba(0, 222, 212, 0.2);
        }

        .print-button {
          z-index: 2;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4em;
          position: absolute;
          top: -20px;
          right: 0;
          margin: 10px 16px;
          border: 1px solid var(--text-accent);
          border-radius: 4px;
          width: 48px;
          height: 38px;
          background-color: var(--printer-color-2);
          color: var(--text-highlight);
          transition: transform 0.2s ease-in-out;
        }
        
        .print-button:hover {
          background-color: var(--text-accent);
          color: #fff;
          transform: scale(1.05);
        }

        .receipt-wrapper {
          position: absolute;
          top: 0;
          left: 30px;
          filter: drop-shadow(0 0 12px rgba(0, 222, 212, 0.15));
          transform: translateY(-100%);
          /* Increased inset to support virtually any length */
          clip-path: inset(100% -100px -2000px -100px);
          transition: clip-path 0.5s;
        }

        .receipt {
          z-index: 2;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1em;
          padding: 24px;
          width: 380px;
          min-height: 200px;
          font-size: 0.9em;
          font-family: var(--font-space-mono), monospace;
          background-color: var(--receipt-color);
          color: var(--text-color);
          box-shadow: 0 12px 12px rgba(0,0,0,0.5);
        }

        .receipt::before,
        .receipt::after {
          --angle: 45deg;
          content: "";
          display: block;
          position: absolute;
          left: -2px;
          width: calc(100% + 4px);
          height: 12px;
          background: linear-gradient(calc(var(--angle) * -1), var(--receipt-color) 6px, transparent 0), linear-gradient(var(--angle), var(--receipt-color) 6px, transparent 0);
          background-position: 6px 0;
          background-repeat: repeat-x;
          background-size: 12px 12px;
        }

        .receipt::before {
          top: -12px;
          background-position: 6px 0;
        }

        .receipt::after {
          bottom: -12px;
          background-position: 0 100%;
          --angle: 225deg;
        }

        .receipt-header,
        .receipt-subheader,
        .receipt-message {
          display: flex;
          justify-content: space-between;
          padding: 0.2em 0;
        }

        .receipt-header {
          font-size: 1.1em;
          font-weight: 600;
        }

        .receipt .logo {
          width: 32px;
          font-size: 2em;
        }

        .receipt-table {
          width: 100%;
          font: inherit;
          color: inherit;
          text-align: left;
          line-height: 1.8em;
        }

        .letter-wrapper {
          position: inherit;
          display: flex;
        }

        .letter {
          display: inline-block;
          opacity: 0;
        }

        .hidden-until-print {
          display: none;
        }

        .wrapper.printing .hidden-until-print {
          display: flex;
        }

        .wrapper.printing .receipt-wrapper {
          animation: print 1.5s 1 forwards cubic-bezier(0.2, 0.8, 0.2, 1), display 0.4s 1 forwards cubic-bezier(0, 0.63, 0.96, 1.1);
          animation-delay: 0s, 1.4s;
        }

        .wrapper.printing .printer-message {
          display: none;
        }

        .letter:nth-child(1) { animation-delay: 0.05s; }
        .letter:nth-child(2) { animation-delay: 0.1s; }
        .letter:nth-child(3) { animation-delay: 0.15s; }
        .letter:nth-child(4) { animation-delay: 0.2s; }
        .letter:nth-child(5) { animation-delay: 0.25s; }
        .letter:nth-child(6) { animation-delay: 0.3s; }
        .letter:nth-child(7) { animation-delay: 0.35s; }
        .letter:nth-child(8) { animation-delay: 0.4s; }
        .letter:nth-child(9) { animation-delay: 0.45s; }
        .letter:nth-child(10) { animation-delay: 0.5s; }

        .wrapper.printing .letter {
          animation: show-text 0.6s 1 forwards linear;
        }

        @keyframes print {
          0% {
            transform: translateY(-100%);
            clip-path: inset(100% -100px -2000px -100px);
          }
          100% {
            transform: translateY(10%);
            clip-path: inset(-20% -100px -2000px -100px);
          }
        }

        @keyframes display {
          0% {
            z-index: 0;
          }
          30% {
            transform: translateY(22%) rotate3d(1, 0, 1, -5deg);
            z-index: 5;
          }
          100% {
            z-index: 5;
            transform: translateY(10%) scale(1.1);
          }
        }

        @keyframes show-text {
          10%, 100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
