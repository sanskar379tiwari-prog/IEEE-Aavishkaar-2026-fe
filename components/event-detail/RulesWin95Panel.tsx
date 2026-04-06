"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import '../../styles/event-detail-rules-win95.css'

function escapeForDisplay(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/* ── build the full "source code" string we'll typewrite ── */
function buildCodeText(rules: string[], eventSlug: string): string {
  const lines: string[] = [
    `// ═══════════════════════════════════════`,
    `// ${eventSlug.toUpperCase()} — EXECUTION PROTOCOL`,
    `// IEEE Aavishkaar 2026 · Secure Channel`,
    `// ═══════════════════════════════════════`,
    ``,
    `import { enforce } from '@ieee/protocol';`,
    ``,
  ]
  rules.forEach((rule, i) => {
    const tag = `RULE_${String(i + 1).padStart(2, '0')}`
    lines.push(`// ${tag}`)
    lines.push(`enforce('${rule}');`)
    lines.push(``)
  })
  lines.push(`// protocol loaded — ${rules.length} rule(s) active`)
  lines.push(`assertCompliance(rules, 2026);`)
  return lines.join('\n')
}

/* ── syntax-highlight a fully-typed string ── */
function highlightCode(raw: string) {
  return raw.split('\n').map((line, li) => {
    // comment lines
    if (line.trimStart().startsWith('//')) {
      return (
        <span key={li}>
          <span className="rules-win95__cmt">{line}</span>
          {'\n'}
        </span>
      )
    }
    // import line
    if (line.trimStart().startsWith('import')) {
      const m = line.match(/^(import)\s*(\{[^}]*\})\s*(from)\s*('[^']*');?$/)
      if (m) {
        return (
          <span key={li}>
            <span className="rules-win95__kw">{m[1]}</span>{' '}
            <span className="rules-win95__var2">{m[2]}</span>{' '}
            <span className="rules-win95__kw">{m[3]}</span>{' '}
            <span className="rules-win95__str">{m[4]}</span>;
            {'\n'}
          </span>
        )
      }
    }
    // enforce('...'); lines
    if (line.trimStart().startsWith('enforce(')) {
      const m = line.match(/^(enforce)\('([^']*)'\);?$/)
      if (m) {
        return (
          <span key={li}>
            <span className="rules-win95__fn">{m[1]}</span>(
            <span className="rules-win95__str">&apos;{escapeForDisplay(m[2])}&apos;</span>
            );{'\n'}
          </span>
        )
      }
    }
    // assertCompliance line
    if (line.trimStart().startsWith('assertCompliance(')) {
      const m = line.match(/^(assertCompliance)\((\w+),\s*(\d+)\);?$/)
      if (m) {
        return (
          <span key={li}>
            <span className="rules-win95__fn">{m[1]}</span>(
            <span className="rules-win95__var2">{m[2]}</span>,{' '}
            <span className="rules-win95__num">{m[3]}</span>);{'\n'}
          </span>
        )
      }
    }
    // empty or fallback
    return <span key={li}>{line}{'\n'}</span>
  })
}

const BOOT_LINES = [
  '> Initializing secure channel...',
  '> Verifying IEEE credentials... OK',
  '> Loading protocol rules...',
  '',
]

const CHAR_SPEED = 12       // ms per character for rules
const BOOT_LINE_SPEED = 400 // ms per boot line

/** Interactive Win9x "IDE" for execution rules — typewriter effect */
export function RulesWin95Panel({
  rules,
  eventSlug,
}: {
  rules: string[]
  eventSlug: string
}) {
  const fullCode = useMemo(() => buildCodeText(rules, eventSlug), [rules, eventSlug])

  /* ── state machine: boot → typing → done ── */
  const [phase, setPhase] = useState<'boot' | 'typing' | 'done'>('boot')
  const [bootIndex, setBootIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const bodyRef = useRef<HTMLDivElement>(null)

  /* keep scrolled to bottom during animation */
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [bootIndex, charIndex, phase])

  /* boot phase — show lines one by one */
  useEffect(() => {
    if (phase !== 'boot') return
    if (bootIndex >= BOOT_LINES.length) {
      setTimeout(() => setPhase('typing'), 0)
      return
    }
    const t = setTimeout(() => setBootIndex((i) => i + 1), BOOT_LINE_SPEED)
    return () => clearTimeout(t)
  }, [phase, bootIndex])

  /* typing phase — character by character */
  useEffect(() => {
    if (phase !== 'typing') return
    if (charIndex >= fullCode.length) {
      setTimeout(() => setPhase('done'), 0)
      return
    }
    const t = setTimeout(() => setCharIndex((i) => i + 1), CHAR_SPEED)
    return () => clearTimeout(t)
  }, [phase, charIndex, fullCode])

  /* ── derive visible text ── */
  const visibleCode = phase === 'boot' ? '' : fullCode.slice(0, charIndex)
  const lineCount = Math.max(
    1,
    (BOOT_LINES.slice(0, bootIndex).join('\n') + (visibleCode ? '\n' + visibleCode : '')).split('\n').length,
  )
  const lineNums = Array.from({ length: lineCount }, (_, i) => i + 1)

  /* ── copy all rules (even if animation isn't done) ── */
  async function copy() {
    try {
      await navigator.clipboard.writeText(
        rules.map((r, i) => `${i + 1}. ${r}`).join('\n'),
      )
    } catch {
      /* ignore */
    }
  }

  /* ── skip animation ── */
  function skipAnimation() {
    setBootIndex(BOOT_LINES.length)
    setCharIndex(fullCode.length)
    setPhase('done')
  }

  return (
    <div className="rules-win95">
      <div className="rules-win95__card">
        {/* ── title bar ── */}
        <div className="rules-win95__header">
          <div className="rules-win95__titlebar">
            <span className="rules-win95__titlebar-icon">▸</span>
            <span className="rules-win95__titlebar-text">
              protocol://{eventSlug}.rules — IEEE Terminal
            </span>
            {phase !== 'done' && (
              <button
                type="button"
                className="rules-win95__skip"
                onClick={skipAnimation}
                title="Skip animation"
              >
                SKIP ▸▸
              </button>
            )}
          </div>
        </div>

        {/* ── code body ── */}
        <div className="rules-win95__body" ref={bodyRef}>
          <div className="rules-win95__ln" aria-hidden>
            {lineNums.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <pre className="rules-win95__code">
            <code>
              {/* boot lines */}
              {BOOT_LINES.slice(0, bootIndex).map((line, i) => (
                <span key={`b${i}`}>
                  <span className="rules-win95__boot">{line}</span>
                  {'\n'}
                </span>
              ))}
              {/* typed code with syntax highlighting */}
              {visibleCode && highlightCode(visibleCode)}
              {/* blinking cursor */}
              {phase !== 'done' && (
                <span className="rules-win95__cursor">█</span>
              )}
            </code>
          </pre>
        </div>

        {/* ── status bar ── */}
        <div className="rules-win95__footer">
          <span className="text-on-surface-variant text-[11px] font-mono">
            {phase === 'done'
              ? `✓ PROTOCOL/${eventSlug}.ts — ${rules.length} rule(s) loaded`
              : phase === 'typing'
                ? `⟳ Writing... ${Math.round((charIndex / fullCode.length) * 100)}%`
                : '⟳ Booting...'}
          </span>
          <button type="button" className="rules-win95__copy" onClick={copy}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"
              />
            </svg>
            Copy
          </button>
        </div>
      </div>
    </div>
  )
}
