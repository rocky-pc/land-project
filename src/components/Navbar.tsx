"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  DollarSign,
  PoundSterling,
  IndianRupee,
  ArrowLeftRight,
  ChevronDown,
  Leaf,
  Menu,
  X,
} from "lucide-react";
import LoginModal from "@/components/LoginModal";

const currencies = [
  { code: "INR", symbol: "₹", icon: IndianRupee },
  { code: "GBP", symbol: "£", icon: PoundSterling },
  { code: "USD", symbol: "$", icon: DollarSign },
];

const unitOptions = [
  { label: "Sq.Ft", value: "Sq.Ft" },
  { label: "Cents", value: "Cents" },
  { label: "Acres", value: "Acres" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cctv", label: "Live CCTV" },
  { href: "/analytics", label: "Plot Analytics" },
  { href: "/portal", label: "Investor Portal" },
];

/* Tiny dropdown hook */
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return { open, setOpen, ref };
}

export function Navbar() {
  const [currency, setCurrency] = useState("INR");
  const [units, setUnits] = useState("Sq.Ft");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const currDD = useDropdown();
  const unitDD = useDropdown();

  const SelCurrIcon = currencies.find(c => c.code === currency)?.icon ?? IndianRupee;
  const selCurrSymbol = currencies.find(c => c.code === currency)?.symbol ?? "₹";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,500&family=Syne:wght@400;500;600&family=Space+Mono&display=swap');

        .nb-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          font-family: 'Syne', sans-serif;
        }

        /* Main bar */
        .nb-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          height: 64px;
          background: rgba(2,10,3,0.82);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(34,197,94,0.08);
          position: relative;
        }

        /* Shimmer top line */
        .nb-bar::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(74,222,128,0.3) 40%, rgba(45,212,191,0.2) 60%, transparent 100%);
        }

        /* Logo */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nb-logo-leaf {
          width: 30px; height: 30px;
          border-radius: 9px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #4ade80;
          transition: background 0.2s, transform 0.2s;
        }
        .nb-logo:hover .nb-logo-leaf { background: rgba(34,197,94,0.16); transform: rotate(8deg); }
        .nb-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 0.88rem;
          font-style: italic;
          color: rgba(187,247,208,0.8);
          letter-spacing: 0.01em;
          line-height: 1.2;
          max-width: 160px;
        }
        .nb-logo-en {
          font-family: 'Space Mono', monospace;
          font-size: 0.52rem;
          color: rgba(74,222,128,0.35);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-style: normal;
          display: block;
          margin-top: 1px;
        }

        /* Nav links */
        .nb-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        @media(max-width:900px){ .nb-links { display: none; } }
        .nb-link {
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(187,247,208,0.5);
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 9px;
          transition: color 0.2s, background 0.2s;
          letter-spacing: 0.02em;
          position: relative;
        }
        .nb-link:hover {
          color: #4ade80;
          background: rgba(34,197,94,0.07);
        }
        .nb-link.active { color: #4ade80; }

        /* Right controls */
        .nb-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Dropdown button */
        .nb-dd-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 10px;
          border-radius: 9px;
          border: 1px solid rgba(34,197,94,0.1);
          background: rgba(6,20,9,0.5);
          color: rgba(187,247,208,0.55);
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        .nb-dd-btn:hover, .nb-dd-btn.open {
          background: rgba(34,197,94,0.08);
          border-color: rgba(74,222,128,0.2);
          color: #4ade80;
        }
        .nb-dd-btn svg { width: 13px; height: 13px; }
        .nb-chevron { transition: transform 0.2s; }
        .nb-chevron.open { transform: rotate(180deg); }

        /* Dropdown panel */
        .nb-dd-panel {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 140px;
          background: rgba(6,18,8,0.95);
          border: 1px solid rgba(34,197,94,0.12);
          border-radius: 14px;
          padding: 6px;
          z-index: 100;
          box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,197,94,0.04);
          backdrop-filter: blur(16px);
          animation: nb-fadeup 0.18s ease;
        }
        @keyframes nb-fadeup { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .nb-dd-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 9px;
          cursor: pointer;
          transition: background 0.15s;
          font-family: 'Space Mono', monospace;
          font-size: 0.7rem;
          color: rgba(187,247,208,0.55);
          letter-spacing: 0.06em;
          white-space: nowrap;
        }
        .nb-dd-item:hover { background: rgba(34,197,94,0.07); color: #4ade80; }
        .nb-dd-item.sel {
          background: rgba(34,197,94,0.1);
          color: #4ade80;
        }
        .nb-dd-item svg { width: 13px; height: 13px; }
        .nb-dd-code { margin-left: auto; font-size: 0.58rem; color: rgba(74,222,128,0.28); }

        /* Login button */
        .nb-login-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 13px;
          border-radius: 10px;
          border: 1px solid rgba(34,197,94,0.16);
          background: rgba(34,197,94,0.06);
          color: rgba(74,222,128,0.7);
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .nb-login-btn:hover {
          background: rgba(34,197,94,0.12);
          border-color: rgba(74,222,128,0.28);
          color: #4ade80;
        }
        @media(max-width:760px){ .nb-login-btn { display: none; } }

        /* CTA button */
        .nb-cta {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 16px;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #15803d, #22c55e);
          color: #ecfdf5;
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(34,197,94,0.2);
          white-space: nowrap;
        }
        .nb-cta:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 6px 22px rgba(34,197,94,0.3); }
        @media(max-width:640px){ .nb-cta span { display:none; } }

        /* Mobile hamburger */
        .nb-hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(34,197,94,0.12);
          background: rgba(6,20,9,0.5);
          color: rgba(74,222,128,0.6);
          cursor: pointer;
          transition: background 0.2s;
        }
        .nb-hamburger:hover { background: rgba(34,197,94,0.08); color: #4ade80; }
        @media(max-width:900px){ .nb-hamburger { display: flex; } }

        /* Mobile menu */
        .nb-mobile {
          position: absolute;
          top: 64px; left: 0; right: 0;
          background: rgba(4,14,5,0.97);
          border-bottom: 1px solid rgba(34,197,94,0.08);
          backdrop-filter: blur(20px);
          padding: 1rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          animation: nb-slidedown 0.22s ease;
        }
        @keyframes nb-slidedown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        .nb-mob-link {
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(187,247,208,0.55);
          text-decoration: none;
          padding: 10px 12px;
          border-radius: 10px;
          transition: color 0.2s, background 0.2s;
          display: flex; align-items: center; gap: 8px;
        }
        .nb-mob-link:hover { color: #4ade80; background: rgba(34,197,94,0.07); }
        .nb-mob-div { height: 1px; background: rgba(34,197,94,0.06); margin: 0.5rem 0; }
        .nb-mob-login {
          padding: 11px 14px;
          border-radius: 12px;
          border: 1px solid rgba(34,197,94,0.14);
          background: rgba(34,197,94,0.05);
          color: rgba(74,222,128,0.65);
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          text-align: center;
        }
        .nb-mob-login:hover { background: rgba(34,197,94,0.1); color: #4ade80; }

        /* Relative wrapper for dropdowns */
        .nb-dd-wrap { position: relative; }
      `}</style>

      <nav className="nb-root">
        <div className="nb-bar">
          {/* Logo */}
          <Link href="/" className="nb-logo">
            <div className="nb-logo-leaf">
              <Leaf style={{ width: 15, height: 15 }} />
            </div>
            <div className="nb-logo-text">
              உங்கள் நிலம் உங்கள் கையில்
              <span className="nb-logo-en">Your Land, Your Hands</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="nb-links">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="nb-link">{label}</Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="nb-right">
            {/* Currency dropdown */}
            <div className="nb-dd-wrap" ref={currDD.ref}>
              <button
                className={`nb-dd-btn ${currDD.open ? 'open' : ''}`}
                onClick={() => currDD.setOpen(o => !o)}
              >
                <SelCurrIcon />
                <span>{selCurrSymbol}</span>
                <ChevronDown className={`nb-chevron ${currDD.open ? 'open' : ''}`} />
              </button>
              {currDD.open && (
                <div className="nb-dd-panel">
                  {currencies.map(c => {
                    const Icon = c.icon;
                    return (
                      <div
                        key={c.code}
                        className={`nb-dd-item ${currency === c.code ? 'sel' : ''}`}
                        onClick={() => { setCurrency(c.code); currDD.setOpen(false); }}
                      >
                        <Icon />{c.symbol}
                        <span className="nb-dd-code">{c.code}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Units dropdown */}
            <div className="nb-dd-wrap" ref={unitDD.ref}>
              <button
                className={`nb-dd-btn ${unitDD.open ? 'open' : ''}`}
                onClick={() => unitDD.setOpen(o => !o)}
              >
                <ArrowLeftRight />
                <span>{units}</span>
                <ChevronDown className={`nb-chevron ${unitDD.open ? 'open' : ''}`} />
              </button>
              {unitDD.open && (
                <div className="nb-dd-panel">
                  {unitOptions.map(u => (
                    <div
                      key={u.value}
                      className={`nb-dd-item ${units === u.value ? 'sel' : ''}`}
                      onClick={() => { setUnits(u.value); unitDD.setOpen(false); }}
                    >
                      {u.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Login */}
            <button className="nb-login-btn" onClick={() => setShowLogin(true)}>
              <Leaf style={{ width: 13, height: 13 }} />
              Private View
            </button>

            {/* CTA */}
            <Link href="/contact" className="nb-cta">
              <span>Contact Concierge</span>
            </Link>

            {/* Hamburger */}
            <button
              className="nb-hamburger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <X style={{ width: 16, height: 16 }} />
                : <Menu style={{ width: 16, height: 16 }} />
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="nb-mobile">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="nb-mob-link"
                onClick={() => setMobileOpen(false)}
              >
                🌿 {label}
              </Link>
            ))}
            <div className="nb-mob-div" />
            <button className="nb-mob-login" onClick={() => { setShowLogin(true); setMobileOpen(false); }}>
              🔐 Access Private View
            </button>
          </div>
        )}
      </nav>

      {/* Login modal */}
      {showLogin && <LoginModal />}
    </>
  );
}