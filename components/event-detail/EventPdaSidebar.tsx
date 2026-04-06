"use client"

import { useEffect, useMemo, useState } from 'react'
import type { TechfestEvent } from '../../types/event'
import { capacityPercent } from '../../mocks/events'
import '../../styles/event-detail-pda.css'

type PdaTab = 'status' | 'map' | 'info' | 'sys'

export function EventPdaSidebar({
  event,
  canRegister,
}: {
  event: TechfestEvent
  canRegister: boolean
}) {
  const [tab, setTab] = useState<PdaTab>('status')
  const [backlight, setBacklight] = useState(true)
  const [boot, setBoot] = useState(true)
  const [clock, setClock] = useState(() => new Date())

  const pct = capacityPercent(event)
  const reg = event.registrationCount ?? 0
  const cap = event.maxCapacity

  useEffect(() => {
    const t = window.setTimeout(() => setBoot(false), 2800)
    return () => window.clearTimeout(t)
  }, [event.slug])

  useEffect(() => {
    const id = window.setInterval(() => setClock(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const orderId = useMemo(
    () => `${event.slug.toUpperCase().replace(/[^A-Z0-9]/g, '')}-2026`,
    [event.slug],
  )

  const dateStr = useMemo(() => {
    const date = new Date(event.dateTime);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }, [event.dateTime]);

  const timeStr = useMemo(() => {
    const date = new Date(event.dateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }, [event.dateTime]);

  const clockStr = clock.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const transitLabel =
    pct >= 100 ? 'AT CAPACITY' : pct >= 80 ? 'NEAR CAP' : `${reg}/${cap} ENROLLED`

  return (
    <div className="sticky top-24 space-y-4 relative z-10">
      <div
        className="event-pda"
        data-tab={tab}
        data-backlight={backlight ? 'on' : 'off'}
      >
        <div className="event-pda__bezel">
          <div className="event-pda__screws" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <svg key={i} className="event-pda__screw" viewBox="0 0 16 16">
                <circle cx={8} cy={8} r={7} fill="#26292f" />
                <path d="M3 8h10" stroke="#70757d" strokeWidth={2} />
              </svg>
            ))}
          </div>

          <button
            type="button"
            className="event-pda__knob"
            onClick={() => setBacklight((b) => !b)}
            aria-label="Toggle backlight"
            aria-pressed={backlight}
          >
            <span className="event-pda__knob-cap" />
          </button>

          <div className="event-pda__led" aria-hidden />

          <div className="event-pda__screen">
            <div className="event-pda__statusbar">
              <div className="event-pda__logo">
                IEEE-RITB<span className="event-pda__blink" aria-hidden />
              </div>
              <div className="event-pda__ind">
                <div className="event-pda__sig" aria-hidden>
                  <span className="event-pda__sb event-pda__sb--1" />
                  <span className="event-pda__sb event-pda__sb--2" />
                  <span className="event-pda__sb event-pda__sb--3" />
                </div>
                <div className="event-pda__bat" aria-hidden>
                  <div className="event-pda__bb">
                    <div className="event-pda__bf" />
                  </div>
                  <div className="event-pda__bt" />
                </div>
                <div className="event-pda__clk">{clockStr}</div>
              </div>
            </div>

            <div
              className={`event-pda__boot ${boot ? '' : 'event-pda__boot--hide'}`}
              aria-hidden={!boot}
            >
              <div className="event-pda__bline event-pda__bline--1">
                IEEE-PDA v2.026 (C) TECHFEST
              </div>
              <div className="event-pda__bline event-pda__bline--2">Linking node… OK</div>
              <div className="event-pda__bline event-pda__bline--3">Mounting event FS… OK</div>
              <div className="event-pda__bline event-pda__bline--err">
                WARN 021 — HIGH SIGNAL
              </div>
              <div className="event-pda__bprog">
                <div className="event-pda__bfill" />
              </div>
              <div className="event-pda__bline event-pda__bline--5">Dock icons unlock.</div>
            </div>

            <div className="event-pda__viewport">
              <div className="event-pda__apps">
                {/* Status */}
                <div className="event-pda__app">
                  <div className="event-pda__title">Event status</div>
                  <div className="event-pda__box">
                    <div className="event-pda__kv">
                      <div className="event-pda__k">EVT</div>
                      <div className="event-pda__v">{orderId}</div>
                    </div>
                    <div className="event-pda__kv">
                      <div className="event-pda__k">DATE</div>
                      <div className="event-pda__v">
                        {dateStr} · {timeStr}
                      </div>
                    </div>
                    <div className="event-pda__kv">
                      <div className="event-pda__k">STATE</div>
                      <div className="event-pda__v">{event.registrationStatus}</div>
                    </div>
                  </div>
                  <div className="event-pda__prog">
                    <div className="event-pda__trk" />
                    <div className="event-pda__fill" style={{ width: `calc(${pct}% - 6px)` }} />
                    <div className="event-pda__ticks" aria-hidden />
                    <div className="event-pda__plabel">{transitLabel}</div>
                  </div>
                  <div className="event-pda__timeline">
                    <div className="event-pda__row event-pda__row--done">
                      <span className="event-pda__dot" />
                      <span className="event-pda__rt">BRIEF · PUBLISHED</span>
                    </div>
                    <div className="event-pda__row event-pda__row--done">
                      <span className="event-pda__dot" />
                      <span className="event-pda__rt">REG · {event.registrationStatus}</span>
                    </div>
                    <div className="event-pda__row">
                      <span className="event-pda__dot event-pda__dot--pulse" />
                      <span className="event-pda__rt">EXEC · {dateStr}</span>
                    </div>
                    <div className="event-pda__row">
                      <span className="event-pda__dot" />
                      <span className="event-pda__rt">VENUE · TBD</span>
                    </div>
                  </div>
                  <div className="event-pda__cursor" aria-hidden>
                    ▌
                  </div>
                </div>

                {/* Map */}
                <div className="event-pda__app">
                  <div className="event-pda__title">Venue trace</div>
                  <div className="event-pda__box event-pda__box--map">
                    <svg className="event-pda__map" viewBox="0 0 160 80" aria-hidden>
                      {[15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125].map((x, i) => (
                        <rect
                          key={i}
                          x={x}
                          y={26 + (i % 3) * 2}
                          width={10}
                          height={8}
                          className="event-pda__px"
                        />
                      ))}
                      <circle cx={50} cy={32} r={10} className="event-pda__ping" />
                    </svg>
                    <div className="event-pda__legend">
                      <div className="event-pda__kv">
                        <div className="event-pda__k">FROM</div>
                        <div className="event-pda__v">IEEE NODE</div>
                      </div>
                      <div className="event-pda__kv">
                        <div className="event-pda__k">TO</div>
                        <div className="event-pda__v">{event.venue ?? 'TBA'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="event-pda__scan" aria-hidden />
                </div>

                {/* Info */}
                <div className="event-pda__app">
                  <div className="event-pda__title">Details</div>
                  <div className="event-pda__box event-pda__scroll">
                    <div className="event-pda__kv">
                      <div className="event-pda__k">TITLE</div>
                      <div className="event-pda__v">{event.title}</div>
                    </div>
                    <div className="event-pda__kv">
                      <div className="event-pda__k">TEAM</div>
                      <div className="event-pda__v">
                        {event.minTeamSize}–{event.maxTeamSize}
                      </div>
                    </div>
                    <div className="event-pda__kv">
                      <div className="event-pda__k">CAP</div>
                      <div className="event-pda__v">{cap}</div>
                    </div>
                    <div className="event-pda__kv">
                      <div className="event-pda__k">FEE</div>
                      <div className="event-pda__v">
                        {event.registrationFees
                          ? `STD ${event.registrationFees.standard} · IEEE ${event.registrationFees.ieeeMember}`
                          : 'NONE'}
                      </div>
                    </div>
                  </div>
                  <div className="event-pda__tip">KNOB: BACKLIGHT</div>
                </div>

                {/* Sys */}
                <div className="event-pda__app">
                  <div className="event-pda__title">System</div>
                  <div className="event-pda__box">
                    <div className="event-pda__meter">
                      <div className="event-pda__ml">CPU</div>
                      <div className="event-pda__mb">
                        <div className="event-pda__mf event-pda__mf--cpu" />
                      </div>
                      <div className="event-pda__mv">42%</div>
                    </div>
                    <div className="event-pda__meter">
                      <div className="event-pda__ml">MEM</div>
                      <div className="event-pda__mb">
                        <div className="event-pda__mf event-pda__mf--mem" />
                      </div>
                      <div className="event-pda__mv">68%</div>
                    </div>
                    <div className="event-pda__meter">
                      <div className="event-pda__ml">NET</div>
                      <div className="event-pda__mb">
                        <div className="event-pda__mf event-pda__mf--sto" />
                      </div>
                      <div className="event-pda__mv">55%</div>
                    </div>
                  </div>
                  <div className="event-pda__diag">
                    <div className="event-pda__drow">
                      <span>&gt;</span> UPLINK … OK
                    </div>
                    <div className="event-pda__drow">
                      <span>&gt;</span> TLS … OK
                    </div>
                    <div className="event-pda__drow">
                      <span>&gt;</span> CHROMA … OK
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="event-pda__dock" role="tablist" aria-label="PDA views">
              {(
                [
                  ['status', 'Status'],
                  ['map', 'Map'],
                  ['info', 'Info'],
                  ['sys', 'System'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  className={`event-pda__db ${tab === key ? 'event-pda__db--active' : ''}`}
                  onClick={() => setTab(key)}
                  title={label}
                >
                  {key === 'status' ? (
                    <svg className="event-pda__ico" viewBox="0 0 24 24" aria-hidden>
                      <rect x={3} y={5} width={18} height={12} className="event-pda__st" />
                      <path d="M6 11h4M6 9h6M6 13h8" className="event-pda__st" />
                    </svg>
                  ) : key === 'map' ? (
                    <svg className="event-pda__ico" viewBox="0 0 24 24" aria-hidden>
                      <circle cx={12} cy={12} r={8} className="event-pda__st" />
                      <path d="M6 12h12M12 6v12" className="event-pda__st" />
                    </svg>
                  ) : key === 'info' ? (
                    <svg className="event-pda__ico" viewBox="0 0 24 24" aria-hidden>
                      <circle cx={12} cy={8} r="1.5" className="event-pda__st" />
                      <path d="M11 11h2v7h-2" className="event-pda__st" />
                    </svg>
                  ) : (
                    <svg className="event-pda__ico" viewBox="0 0 24 24" aria-hidden>
                      <circle cx={12} cy={12} r={3} className="event-pda__st" />
                      <path
                        d="M12 3v3M12 18v3M3 12h3M18 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"
                        className="event-pda__st"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {canRegister ? (
        <button
          type="button"
          disabled
          className="block w-full text-center py-4 px-4 rounded-sm bg-primary-container text-on-primary-container font-headline font-bold tracking-widest uppercase text-sm transition-all duration-150 opacity-70 cursor-not-allowed relative z-10"
          title="Registration coming soon"
        >
          Coming soon
        </button>
      ) : (
        <p className="text-center text-xs font-mono text-on-surface-variant relative z-10 py-2">
          {event.registrationStatus === 'FULL' ? 'Registration full' : 'Register'}
        </p>
      )}
    </div>
  )
}
