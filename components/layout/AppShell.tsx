"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

function SystemClock() {
  const [t, setT] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="font-headline text-xs tracking-widest text-secondary-container/80 tabular-nums">
      {t.toLocaleTimeString(undefined, { hour12: false })}
    </span>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const linkClass = (href: string) =>
    `font-headline tracking-[0.1em] uppercase text-sm transition-colors ${pathname === href
      ? 'text-primary-container border-b-2 border-primary-container pb-1'
      : 'text-slate-400 hover:text-primary-container'
    }`

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="pointer-events-none fixed inset-0 grid-overlay z-[1]" aria-hidden />
      <div
        className="pointer-events-none fixed inset-0 scanline z-[2] opacity-30"
        aria-hidden
      />

      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-primary-container/20 shadow-[0_4px_20px_rgba(255,107,53,0.15)]">
        <nav className="flex justify-between items-center px-6 md:px-8 h-16 w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="font-headline font-black text-lg md:text-xl tracking-tighter text-primary-container drop-shadow-[0_0_10px_rgba(255,107,53,0.5)]"
            >
              TECHFEST 2026
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className={linkClass('/')}>Home</Link>
              <Link href="/events" className={linkClass('/events')}>Events</Link>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden lg:flex items-center gap-3">
              <SystemClock />
              <span className="font-headline text-xs tracking-widest text-secondary-container/60">
                SYS 042
              </span>
            </div>
            <button
              type="button"
              className="md:hidden text-on-surface p-2 rounded-sm border border-outline-variant/30"
              aria-expanded={open}
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {open ? (
        <div
          className="fixed inset-0 z-[60] md:hidden bg-background/95 backdrop-blur-lg flex flex-col p-6 pt-20 gap-6"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-on-surface p-2"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <Link href="/" className={linkClass('/')} onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/events" className={linkClass('/events')} onClick={() => setOpen(false)}>
            Events
          </Link>
        </div>
      ) : null}

      <div className="flex-1 flex flex-col pt-16 relative z-[5]">
        {children}
      </div>

      <footer className="w-full border-t border-secondary-container/20 bg-surface-container-lowest mt-auto relative z-[5]">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-12 py-8 w-full gap-4 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <span className="text-primary-container font-bold font-headline tracking-wider uppercase">
              IEEE Techfest
            </span>
            <span className="font-headline text-xs tracking-widest text-slate-500">
              © 2026 IEEE Techfest. All systems operational.
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 font-headline text-xs tracking-widest">
            <a
              className="text-slate-500 hover:text-primary-container transition-colors"
              href="#"
            >
              Privacy
            </a>
            <a
              className="text-slate-500 hover:text-primary-container transition-colors"
              href="#"
            >
              Terms
            </a>
            <a
              className="text-slate-500 hover:text-primary-container transition-colors"
              href="#"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
