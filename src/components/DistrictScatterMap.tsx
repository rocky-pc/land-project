"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const tamilNaduDistricts = [
  { english: 'Ariyalur', tamil: 'அரியலூர்' },
  { english: 'Chennai', tamil: 'சென்னை' },
  { english: 'Coimbatore', tamil: 'கோயம்புத்தூர்' },
  { english: 'Cuddalore', tamil: 'கடலூர்' },
  { english: 'Dharmapuri', tamil: 'தர்மபுரி' },
  { english: 'Dindigul', tamil: 'திண்டுக்கல்' },
  { english: 'Erode', tamil: 'ஈரோடு' },
  { english: 'Kallakurichi', tamil: 'கல்லக்குறிச்சி' },
  { english: 'Kanchipuram', tamil: 'காஞ்சிபுரம்' },
  { english: 'Kanyakumari', tamil: 'கன்னியாகுமாரி' },
  { english: 'Karur', tamil: 'கருர்' },
  { english: 'Krishnagiri', tamil: 'கிருஷ்ணகிரி' },
  { english: 'Madurai', tamil: 'மதுரை' },
  { english: 'Nagapattinam', tamil: 'நாகப்பட்டினம்' },
  { english: 'Namakkal', tamil: 'நாமக்கல்' },
  { english: 'Nilgiris', tamil: 'நீலகிரி' },
  { english: 'Perambalur', tamil: 'பெரும்பாலூர்' },
  { english: 'Pudukkottai', tamil: 'புதுக்கோட்டை' },
  { english: 'Ramanathapuram', tamil: 'இராமநாதபுரம்' },
  { english: 'Salem', tamil: 'சேலம்' },
  { english: 'Sivaganga', tamil: 'சிவகங்கை' },
  { english: 'Tenkasi', tamil: 'தென்காசி' },
  { english: 'Thanjavur', tamil: 'தஞ்சாவூர்' },
  { english: 'Theni', tamil: 'தேனி' },
  { english: 'Thoothukudi', tamil: 'தூத்துக்குடி' },
  { english: 'Tiruchirappalli', tamil: 'திருச்சிராப்பள்ளி' },
  { english: 'Tirunelveli', tamil: 'திருநெல்வேலி' },
  { english: 'Tirupathur', tamil: 'திருப்பத்தூர்' },
  { english: 'Tiruppur', tamil: 'திறுப்பூர்' },
  { english: 'Tiruvallur', tamil: 'திருவள்ளூர்' },
  { english: 'Tiruvannamalai', tamil: 'திருவண்ணாமலை' },
  { english: 'Tiruvarur', tamil: 'தீவரூர்' },
  { english: 'Vellore', tamil: 'வெல்லூர்' },
  { english: 'Viluppuram', tamil: 'விழுப்புரம்' },
  { english: 'Virudhunagar', tamil: 'விருதுநகர்' },
];

// Deterministic scatter positions — fills the canvas more organically
const getPosition = (index: number) => {
  const cols = 7;
  const rows = Math.ceil(tamilNaduDistricts.length / cols);
  const col = index % cols;
  const row = Math.floor(index / cols);
  // Add deterministic jitter using sin/cos
  const jx = Math.sin(index * 1.7) * 5.5;
  const jy = Math.cos(index * 2.3) * 4.5;
  const x = 7 + col * (86 / (cols - 1)) + jx;
  const y = 8 + row * (82 / (rows - 1)) + jy;
  return { x: Math.max(4, Math.min(94, x)), y: Math.max(5, Math.min(92, y)) };
};

const sizeVariants = ['text-xs', 'text-sm', 'text-base', 'text-sm', 'text-xs'];

export default function DistrictScatterMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,500&family=Syne:wght@400;500&family=Space+Mono&display=swap');

        .dsm-root {
          position: relative;
          height: 560px;
          width: 100%;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid rgba(34,197,94,0.12);
          background: #020c04;
          font-family: 'Syne', sans-serif;
        }

        /* Deep forest gradient layers */
        .dsm-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 15% 20%, rgba(21,128,61,0.18) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 85% 75%, rgba(15,118,110,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(34,197,94,0.05) 0%, transparent 60%),
            #020c04;
        }

        /* Animated SVG grid lines — like a topographic overlay */
        .dsm-grid {
          position: absolute;
          inset: 0;
          opacity: 0.06;
        }

        /* Noise grain */
        .dsm-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.6;
        }

        /* Title badge */
        .dsm-title {
          position: absolute;
          top: 20px;
          left: 24px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dsm-title-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem;
          font-style: italic;
          color: rgba(187,247,208,0.75);
          letter-spacing: 0.02em;
        }
        .dsm-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34,197,94,0.7);
          animation: dsblink 2.5s ease infinite;
        }
        @keyframes dsblink { 0%,100%{opacity:1;} 50%{opacity:0.35;} }

        /* Count badge */
        .dsm-count {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 10;
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: rgba(74,222,128,0.4);
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        /* District chip */
        .dsm-chip {
          position: absolute;
          cursor: pointer;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 5;
          pointer-events: all;
        }
        .dsm-en {
          font-family: 'Syne', sans-serif;
          font-weight: 500;
          color: rgba(187,247,208,0.82);
          white-space: nowrap;
          text-shadow: 0 1px 8px rgba(0,0,0,0.8), 0 0 12px rgba(34,197,94,0.2);
          transition: color 0.25s, text-shadow 0.25s;
          line-height: 1.2;
        }
        .dsm-chip:hover .dsm-en,
        .dsm-chip.active .dsm-en {
          color: #4ade80;
          text-shadow: 0 0 16px rgba(74,222,128,0.6), 0 1px 4px rgba(0,0,0,0.9);
        }
        .dsm-ta {
          font-family: 'Syne', sans-serif;
          font-size: 0.6rem;
          color: rgba(74,222,128,0.35);
          font-style: italic;
          transition: color 0.25s;
        }
        .dsm-chip:hover .dsm-ta,
        .dsm-chip.active .dsm-ta {
          color: rgba(74,222,128,0.65);
        }

        /* Hover tooltip card */
        .dsm-tooltip {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(6,20,9,0.92);
          border: 1px solid rgba(74,222,128,0.2);
          border-radius: 12px;
          padding: 8px 12px;
          min-width: 130px;
          pointer-events: none;
          z-index: 20;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(34,197,94,0.06);
        }
        .dsm-tooltip-title {
          font-family: 'Playfair Display', serif;
          font-size: 0.78rem;
          color: #ecfdf5;
          margin-bottom: 2px;
        }
        .dsm-tooltip-sub {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: rgba(74,222,128,0.55);
          letter-spacing: 0.08em;
        }
        .dsm-tooltip-arrow {
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 8px; height: 8px;
          background: rgba(6,20,9,0.92);
          border-right: 1px solid rgba(74,222,128,0.2);
          border-bottom: 1px solid rgba(74,222,128,0.2);
        }

        /* Glow dot under chip on hover */
        .dsm-glow {
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74,222,128,0.8);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .dsm-chip:hover .dsm-glow { opacity: 1; }

        /* Bottom gradient fade */
        .dsm-fade-b {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 80px;
          background: linear-gradient(to top, rgba(2,12,4,0.7), transparent);
          pointer-events: none;
          z-index: 8;
        }
        .dsm-fade-t {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 60px;
          background: linear-gradient(to bottom, rgba(2,12,4,0.5), transparent);
          pointer-events: none;
          z-index: 8;
        }

        /* Vine decorative corner */
        .dsm-corner {
          position: absolute;
          bottom: 16px;
          right: 20px;
          font-size: 0.55rem;
          font-family: 'Space Mono', monospace;
          color: rgba(34,197,94,0.2);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          z-index: 9;
        }
      `}</style>

      <div className="dsm-root">
        {/* Background layers */}
        <div className="dsm-bg" />
        <div className="dsm-grain" />

        {/* Topographic SVG grid */}
        <svg className="dsm-grid" viewBox="0 0 800 560" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#22c55e" strokeWidth="0.6" />
          ))}
          {Array.from({ length: 17 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="560" stroke="#22c55e" strokeWidth="0.6" />
          ))}
          {/* Diagonal accent lines */}
          <line x1="0" y1="0" x2="800" y2="560" stroke="#4ade80" strokeWidth="0.4" strokeDasharray="4 8" />
          <line x1="800" y1="0" x2="0" y2="560" stroke="#4ade80" strokeWidth="0.4" strokeDasharray="4 8" />
        </svg>

        {/* Fade edges */}
        <div className="dsm-fade-t" />
        <div className="dsm-fade-b" />

        {/* Header */}
        <div className="dsm-title">
          <div className="dsm-dot" />
          <span className="dsm-title-text">Tamil Nadu — All Districts</span>
        </div>
        <div className="dsm-count">35 districts · live</div>

        {/* District chips */}
        {tamilNaduDistricts.map((district, index) => {
          const pos = getPosition(index);
          const sz = sizeVariants[index % sizeVariants.length];
          const isHov = hovered === district.english;

          return (
            <motion.div
              key={district.english}
              className={`dsm-chip ${isHov ? 'active' : ''}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              initial={{ opacity: 0, y: 10, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, delay: index * 0.04, type: 'spring', stiffness: 180, damping: 22 }}
              whileHover={{ scale: 1.18, y: -4 }}
              whileTap={{ scale: 1.05 }}
              onMouseEnter={() => setHovered(district.english)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Tooltip */}
              {isHov && (
                <motion.div
                  className="dsm-tooltip"
                  initial={{ opacity: 0, y: 4, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="dsm-tooltip-title">{district.english}</div>
                  <div className="dsm-tooltip-sub">{district.tamil}</div>
                  <div className="dsm-tooltip-sub" style={{ marginTop: 4, color: 'rgba(74,222,128,0.35)' }}>
                    → View Plots
                  </div>
                  <div className="dsm-tooltip-arrow" />
                </motion.div>
              )}

              <Link href={`/plot/${district.english.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className={`dsm-en ${sz}`}>{district.english}</div>
                <div className="dsm-ta">{district.tamil}</div>
              </Link>
              <div className="dsm-glow" />
            </motion.div>
          );
        })}

        {/* Corner label */}
        <div className="dsm-corner">🌿 Tamil Nadu · தமிழ்நாடு</div>
      </div>
    </>
  );
}