"use client";

import { useState } from "react";
import { FileText, ShieldCheck, Download, Lock, ChevronRight, Eye, Leaf, CheckCircle } from "lucide-react";

const documents = [
  {
    name: "Title Deed (Patta & Chitta)",
    status: "Verified",
    date: "Oct 2025",
    size: "2.4 MB",
    type: "Legal Title",
    accent: "moss",
  },
  {
    name: "EC (Encumbrance Certificate) — 30 Years",
    status: "Verified",
    date: "Nov 2025",
    size: "4.1 MB",
    type: "Encumbrance",
    accent: "teal",
  },
  {
    name: "FMB Sketch & Topo Plan",
    status: "Verified",
    date: "Jan 2026",
    size: "1.8 MB",
    type: "Survey Map",
    accent: "sage",
  },
  {
    name: "Legal Opinion Report",
    status: "Verified",
    date: "Feb 2026",
    size: "3.5 MB",
    type: "Legal Opinion",
    accent: "amber",
  },
];

const stats = [
  { label: "Documents Verified", value: "4/4", icon: ShieldCheck, accent: "moss" },
  { label: "Compliance Score", value: "100%", icon: CheckCircle, accent: "teal" },
  { label: "Due Diligence Ready", value: "Yes", icon: Eye, accent: "sage" },
];

export default function PortalPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (name: string) => {
    setDownloading(name);
    setTimeout(() => setDownloading(null), 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=Syne:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pp-root {
          min-height: 100vh;
          background:
            radial-gradient(ellipse 80% 50% at 20% 0%, rgba(21,128,61,0.11) 0%, transparent 55%),
            radial-gradient(ellipse 55% 45% at 80% 85%, rgba(15,118,110,0.08) 0%, transparent 55%),
            #020c04;
          font-family: 'Syne', sans-serif;
          color: #d1fae5;
          padding: 7rem 1.5rem 5rem;
          position: relative;
          overflow-x: hidden;
        }
        .pp-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.45;
        }

        .pp-inner {
          max-width: 860px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Header ── */
        .pp-header {
          display: flex;
          align-items: flex-start;
          gap: 1.2rem;
          margin-bottom: 2.5rem;
        }

        .pp-lock-icon {
          width: 56px; height: 56px;
          border-radius: 18px;
          background: rgba(34,197,94,0.09);
          border: 1px solid rgba(34,197,94,0.18);
          display: flex; align-items: center; justify-content: center;
          color: #4ade80;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .pp-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 0.57rem;
          letter-spacing: 0.26em;
          color: rgba(74,222,128,0.38);
          text-transform: uppercase;
          margin-bottom: 0.45rem;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .pp-eyebrow-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px rgba(34,197,94,0.65);
          animation: pp-blink 2s ease infinite;
        }
        @keyframes pp-blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

        .pp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700;
          color: #ecfdf5;
          letter-spacing: -0.025em;
          line-height: 1.05;
        }
        .pp-title em { color: #4ade80; font-style: italic; }
        .pp-sub {
          font-size: 0.82rem;
          color: #b9b9b9ff;
          margin-top: 0.4rem;
          line-height: 1.55;
        }

        /* Vine divider */
        .pp-vine {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.8rem;
        }
        .pp-vine-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(34,197,94,0.25), transparent);
        }
        .pp-vine-txt {
          font-family: 'Space Mono', monospace;
          font-size: 0.5rem;
          color: rgba(34,197,94,0.18);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ── Stats row ── */
        .pp-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.8rem;
          margin-bottom: 2rem;
        }
        @media(max-width:500px){ .pp-stats { grid-template-columns: 1fr; } }

        .pp-stat {
          background: rgba(6,20,9,0.65);
          border: 1px solid rgba(34,197,94,0.08);
          border-radius: 16px;
          padding: 1rem 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: border-color 0.3s, transform 0.3s;
          opacity: 0;
          animation: pp-fadein 0.5s ease forwards;
        }
        .pp-stat:nth-child(1){ animation-delay: 0.05s; }
        .pp-stat:nth-child(2){ animation-delay: 0.12s; }
        .pp-stat:nth-child(3){ animation-delay: 0.2s; }
        @keyframes pp-fadein { to { opacity:1; transform:translateY(0); } }
        .pp-stat { transform: translateY(10px); }
        .pp-stat:hover { border-color: rgba(74,222,128,0.16); transform: translateY(-2px); }

        .pp-stat-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .pp-stat-icon.moss { background: rgba(22,101,52,0.28); border: 1px solid rgba(34,197,94,0.18); color: #4ade80; }
        .pp-stat-icon.teal { background: rgba(15,118,110,0.22); border: 1px solid rgba(45,212,191,0.16); color: #2dd4bf; }
        .pp-stat-icon.sage { background: rgba(16,185,129,0.14); border: 1px solid rgba(110,231,183,0.16); color: #6ee7b7; }

        .pp-stat-val {
          font-family: 'Space Mono', monospace;
          font-size: 1rem;
          font-weight: 700;
          color: #ecfdf5;
          line-height: 1;
        }
        .pp-stat-lbl {
          font-size: 0.65rem;
          color: #b9b9b9ff;
          margin-top: 2px;
          line-height: 1.3;
        }

        /* ── Vault card ── */
        .pp-vault {
          background: rgba(6,18,8,0.82);
          border: 1px solid rgba(34,197,94,0.1);
          border-radius: 26px;
          overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
          position: relative;
        }
        .pp-vault::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(74,222,128,0.4), rgba(45,212,191,0.25), transparent);
        }

        .pp-vault-header {
          padding: 1.5rem 1.8rem;
          border-bottom: 1px solid rgba(34,197,94,0.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .pp-vault-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #ecfdf5;
          letter-spacing: -0.01em;
        }
        .pp-vault-sub {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: #b9b9b9ff;
          letter-spacing: 0.06em;
          margin-top: 2px;
        }
        .pp-vault-badge {
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.14);
          border-radius: 999px;
          padding: 4px 12px;
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: rgba(74,222,128,0.45);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* Doc rows */
        .pp-doc-row {
          padding: 1.4rem 1.8rem;
          border-bottom: 1px solid rgba(34,197,94,0.05);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: background 0.2s;
          opacity: 0;
          animation: pp-fadein 0.5s ease forwards;
          position: relative;
        }
        .pp-doc-row:last-child { border-bottom: none; }
        .pp-doc-row:nth-child(1){ animation-delay: 0.25s; }
        .pp-doc-row:nth-child(2){ animation-delay: 0.35s; }
        .pp-doc-row:nth-child(3){ animation-delay: 0.45s; }
        .pp-doc-row:nth-child(4){ animation-delay: 0.55s; }
        .pp-doc-row:hover { background: rgba(34,197,94,0.025); }

        @media(min-width:600px){
          .pp-doc-row { flex-direction: row; align-items: center; justify-content: space-between; }
        }

        .pp-doc-left { display: flex; align-items: flex-start; gap: 1rem; }

        .pp-doc-icon {
          width: 44px; height: 44px;
          border-radius: 13px;
          border: 1px solid rgba(34,197,94,0.12);
          background: rgba(6,20,9,0.7);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .pp-doc-icon.moss { color: #4ade80; }
        .pp-doc-icon.teal { color: #2dd4bf; }
        .pp-doc-icon.sage { color: #6ee7b7; }
        .pp-doc-icon.amber { color: #fbbf24; }

        .pp-doc-type {
          font-family: 'Space Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 3px;
        }
        .pp-doc-type.moss { color: rgba(74,222,128,0.38); }
        .pp-doc-type.teal { color: rgba(45,212,191,0.38); }
        .pp-doc-type.sage { color: rgba(110,231,183,0.38); }
        .pp-doc-type.amber { color: rgba(251,191,36,0.38); }

        .pp-doc-name {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #ecfdf5;
          line-height: 1.3;
        }

        .pp-doc-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 5px;
          flex-wrap: wrap;
        }
        .pp-doc-meta-item {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: #b9b9b9ff;
          letter-spacing: 0.04em;
        }
        .pp-doc-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(34,197,94,0.2); }
        .pp-doc-verified {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: rgba(74,222,128,0.55);
          letter-spacing: 0.06em;
        }

        /* Download button */
        .pp-dl-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          border-radius: 999px;
          border: 1px solid rgba(34,197,94,0.16);
          background: rgba(34,197,94,0.05);
          color: rgba(74,222,128,0.6);
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .pp-dl-btn:hover {
          background: rgba(34,197,94,0.1);
          border-color: rgba(74,222,128,0.28);
          color: #4ade80;
          transform: translateY(-1px);
        }
        .pp-dl-btn:active { transform: translateY(0); }
        .pp-dl-btn.loading {
          opacity: 0.55;
          cursor: wait;
        }
        .pp-dl-spinner {
          width: 13px; height: 13px;
          border: 1.5px solid rgba(74,222,128,0.2);
          border-top-color: #4ade80;
          border-radius: 50%;
          animation: pp-spin 0.8s linear infinite;
        }
        @keyframes pp-spin { to { transform: rotate(360deg); } }

        /* Bottom NRI note */
        .pp-nri-note {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.5rem;
          background: rgba(34,197,94,0.04);
          border: 1px solid rgba(34,197,94,0.08);
          border-radius: 14px;
          padding: 1rem 1.3rem;
        }
        .pp-nri-icon {
          width: 32px; height: 32px;
          border-radius: 9px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.14);
          display: flex; align-items: center; justify-content: center;
          color: #4ade80;
          flex-shrink: 0;
        }
        .pp-nri-text {
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          color: rgba(74,222,128,0.35);
          letter-spacing: 0.06em;
          line-height: 1.6;
        }
        .pp-nri-text strong { color: rgba(74,222,128,0.55); }
      `}</style>

      <main className="pp-root">
        <div className="pp-inner">

          {/* Header */}
          <header className="pp-header">
            <div className="pp-lock-icon">
              <Lock style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <div className="pp-eyebrow">
                <div className="pp-eyebrow-dot" />
                Secure Document Vault
              </div>
              <h1 className="pp-title">
                <em>Investor</em> Portal
              </h1>
              <p className="pp-sub">
                Secure vault for all verified legal documents. Ready for NRI & foreign investor due diligence.
              </p>
            </div>
          </header>

          {/* Vine divider */}
          <div className="pp-vine">
            <div className="pp-vine-line" />
            <span className="pp-vine-txt">🌿 Verified Documents · Tamil Nadu Registry</span>
            <div className="pp-vine-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.25))' }} />
          </div>

          {/* Stats */}
          <div className="pp-stats">
            {stats.map(({ label, value, icon: Icon, accent }) => (
              <div key={label} className="pp-stat">
                <div className={`pp-stat-icon ${accent}`}>
                  <Icon style={{ width: 16, height: 16 }} />
                </div>
                <div>
                  <div className="pp-stat-val">{value}</div>
                  <div className="pp-stat-lbl">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Vault */}
          <div className="pp-vault">
            <div className="pp-vault-header">
              <div>
                <div className="pp-vault-title">Legal Documents Vault</div>
                <div className="pp-vault-sub">All documents Government & legally verified</div>
              </div>
              <span className="pp-vault-badge">🔐 Encrypted</span>
            </div>

            {documents.map((doc) => (
              <div key={doc.name} className="pp-doc-row">
                <div className="pp-doc-left">
                  <div className={`pp-doc-icon ${doc.accent}`}>
                    <FileText style={{ width: 20, height: 20 }} />
                  </div>
                  <div>
                    <div className={`pp-doc-type ${doc.accent}`}>{doc.type}</div>
                    <div className="pp-doc-name">{doc.name}</div>
                    <div className="pp-doc-meta">
                      <span className="pp-doc-meta-item">{doc.date}</span>
                      <div className="pp-doc-meta-dot" />
                      <span className="pp-doc-meta-item">{doc.size}</span>
                      <div className="pp-doc-meta-dot" />
                      <span className="pp-doc-verified">
                        <ShieldCheck style={{ width: 10, height: 10 }} />
                        {doc.status}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className={`pp-dl-btn ${downloading === doc.name ? 'loading' : ''}`}
                  onClick={() => handleDownload(doc.name)}
                  disabled={downloading === doc.name}
                >
                  {downloading === doc.name ? (
                    <>
                      <div className="pp-dl-spinner" />
                      Preparing…
                    </>
                  ) : (
                    <>
                      <Download style={{ width: 13, height: 13 }} />
                      Download PDF
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* NRI note */}
          <div className="pp-nri-note">
            <div className="pp-nri-icon">
              <Leaf style={{ width: 14, height: 14 }} />
            </div>
            <p className="pp-nri-text">
              <strong>NRI & Foreign Investors:</strong> All documents comply with FEMA guidelines and are pre-verified for international due diligence. Contact our concierge for apostille assistance.
            </p>
          </div>

        </div>
      </main>
    </>
  );
}