"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVG path data for Tamil Nadu districts
// Coordinate system: viewBox="0 0 480 620"
// Based on the reference map image proportions

const districts = [
  {
    id: "tiruvallur",
    english: "Tiruvallur",
    tamil: "திருவள்ளூர்",
    path: "M 330 32 L 355 28 L 375 35 L 385 50 L 378 68 L 360 72 L 345 65 L 332 55 Z",
    labelX: 352,
    labelY: 52,
  },
  {
    id: "chennai",
    english: "Chennai",
    tamil: "சென்னை",
    path: "M 375 35 L 395 30 L 405 42 L 400 58 L 385 60 L 378 68 L 378 50 Z",
    labelX: 390,
    labelY: 48,
  },
  {
    id: "kanchipuram",
    english: "Kancheepuram",
    tamil: "காஞ்சிபுரம்",
    path: "M 355 68 L 378 68 L 400 58 L 408 75 L 402 95 L 385 105 L 365 100 L 352 85 Z",
    labelX: 382,
    labelY: 85,
  },
  {
    id: "vellore",
    english: "Vellore",
    tamil: "வெல்லூர்",
    path: "M 285 52 L 330 48 L 345 65 L 360 72 L 355 90 L 340 105 L 315 108 L 292 95 L 280 75 Z",
    labelX: 318,
    labelY: 78,
  },
  {
    id: "tiruvannamalai",
    english: "Tiruvannamalai",
    tamil: "திருவண்ணாமலை",
    path: "M 315 108 L 340 105 L 360 112 L 385 105 L 390 125 L 378 148 L 358 155 L 335 148 L 315 135 L 308 118 Z",
    labelX: 350,
    labelY: 130,
  },
  {
    id: "viluppuram",
    english: "Viluppuram",
    tamil: "விழுப்புரம்",
    path: "M 358 155 L 378 148 L 395 158 L 405 178 L 398 200 L 380 210 L 360 205 L 345 185 L 348 165 Z",
    labelX: 375,
    labelY: 182,
  },
  {
    id: "cuddalore",
    english: "Cuddalore",
    tamil: "கடலூர்",
    path: "M 380 210 L 398 200 L 412 210 L 420 228 L 415 248 L 398 252 L 382 240 L 375 222 Z",
    labelX: 398,
    labelY: 228,
  },
  {
    id: "krishnagiri",
    english: "Krishnagiri",
    tamil: "கிருஷ்ணகிரி",
    path: "M 225 68 L 268 62 L 285 52 L 280 75 L 270 95 L 248 105 L 228 98 L 215 82 Z",
    labelX: 248,
    labelY: 82,
  },
  {
    id: "dharmapuri",
    english: "Dharmapuri",
    tamil: "தர்மபுரி",
    path: "M 215 82 L 248 105 L 270 95 L 292 95 L 308 118 L 298 138 L 275 148 L 248 142 L 228 125 L 212 105 Z",
    labelX: 258,
    labelY: 118,
  },
  {
    id: "tirupathur",
    english: "Tirupathur",
    tamil: "திருப்பத்தூர்",
    path: "M 268 62 L 285 52 L 292 62 L 292 75 L 285 88 L 270 95 Z",
    labelX: 280,
    labelY: 75,
  },
  {
    id: "salem",
    english: "Salem",
    tamil: "சேலம்",
    path: "M 212 105 L 248 142 L 248 162 L 230 175 L 205 165 L 188 145 L 192 122 Z",
    labelX: 220,
    labelY: 140,
  },
  {
    id: "namakkal",
    english: "Namakkal",
    tamil: "நாமக்கல்",
    path: "M 248 142 L 275 148 L 298 138 L 315 148 L 318 168 L 302 182 L 280 182 L 258 172 L 248 162 Z",
    labelX: 282,
    labelY: 162,
  },
  {
    id: "erode",
    english: "Erode",
    tamil: "ஈரோடு",
    path: "M 158 120 L 192 122 L 188 145 L 205 165 L 195 188 L 172 195 L 150 182 L 142 158 L 148 135 Z",
    labelX: 172,
    labelY: 158,
  },
  {
    id: "perambalur",
    english: "Perambalur",
    tamil: "பெரும்பாலூர்",
    path: "M 315 148 L 335 148 L 358 155 L 348 165 L 345 185 L 328 195 L 310 188 L 302 172 L 302 158 Z",
    labelX: 328,
    labelY: 172,
  },
  {
    id: "ariyalur",
    english: "Ariyalur",
    tamil: "அரியலூர்",
    path: "M 345 185 L 360 205 L 365 225 L 355 242 L 338 245 L 322 235 L 315 215 L 318 198 L 328 195 Z",
    labelX: 340,
    labelY: 215,
  },
  {
    id: "karur",
    english: "Karur",
    tamil: "கருர்",
    path: "M 230 175 L 258 172 L 280 182 L 285 200 L 272 215 L 250 218 L 232 205 L 222 192 Z",
    labelX: 255,
    labelY: 198,
  },
  {
    id: "tiruchirappalli",
    english: "Tiruchirappalli",
    tamil: "திருச்சிராப்பள்ளி",
    path: "M 280 182 L 302 182 L 318 198 L 322 218 L 310 235 L 290 242 L 270 235 L 258 218 L 262 200 Z",
    labelX: 292,
    labelY: 215,
  },
  {
    id: "thanjavur",
    english: "Thanjavur",
    tamil: "தஞ்சாவூர்",
    path: "M 322 218 L 338 245 L 345 268 L 330 282 L 308 280 L 290 268 L 288 248 L 292 228 L 310 235 Z",
    labelX: 318,
    labelY: 255,
  },
  {
    id: "nagapattinam",
    english: "Nagapattinam",
    tamil: "நாகப்பட்டினம்",
    path: "M 355 242 L 372 252 L 382 272 L 378 295 L 362 305 L 345 295 L 338 272 L 345 252 Z",
    labelX: 360,
    labelY: 275,
  },
  {
    id: "tiruvarur",
    english: "Tiruvarur",
    tamil: "தீவரூர்",
    path: "M 338 245 L 355 242 L 345 252 L 345 268 L 330 282 Z",
    labelX: 340,
    labelY: 262,
  },
  {
    id: "nilgiris",
    english: "Nilgiris",
    tamil: "நீலகிரி",
    path: "M 108 148 L 142 145 L 148 158 L 145 178 L 128 190 L 108 182 L 98 165 Z",
    labelX: 122,
    labelY: 168,
  },
  {
    id: "tiruppur",
    english: "Tiruppur",
    tamil: "திறுப்பூர்",
    path: "M 148 158 L 172 162 L 172 195 L 158 212 L 138 215 L 122 202 L 118 182 L 128 190 L 145 178 Z",
    labelX: 148,
    labelY: 190,
  },
  {
    id: "coimbatore",
    english: "Coimbatore",
    tamil: "கோயம்புத்தூர்",
    path: "M 78 172 L 108 165 L 118 182 L 122 202 L 108 215 L 88 218 L 70 202 L 68 185 Z",
    labelX: 95,
    labelY: 195,
  },
  {
    id: "kallakurichi",
    english: "Kallakurichi",
    tamil: "கல்லக்குறிச்சி",
    path: "M 298 138 L 315 135 L 315 148 L 302 158 L 285 160 L 278 148 L 285 138 Z",
    labelX: 300,
    labelY: 148,
  },
  {
    id: "pudukkottai",
    english: "Pudukkottai",
    tamil: "புதுக்கோட்டை",
    path: "M 270 235 L 290 242 L 308 258 L 308 280 L 295 298 L 275 302 L 258 290 L 250 268 L 258 250 Z",
    labelX: 280,
    labelY: 268,
  },
  {
    id: "dindigul",
    english: "Dindigul",
    tamil: "திண்டுக்கல்",
    path: "M 185 215 L 222 215 L 235 232 L 238 255 L 222 272 L 200 275 L 182 258 L 178 238 Z",
    labelX: 208,
    labelY: 248,
  },
  {
    id: "theni",
    english: "Theni",
    tamil: "தேனி",
    path: "M 155 248 L 182 245 L 182 258 L 175 280 L 158 288 L 140 278 L 138 258 Z",
    labelX: 160,
    labelY: 268,
  },
  {
    id: "madurai",
    english: "Madurai",
    tamil: "மதுரை",
    path: "M 200 275 L 222 272 L 245 282 L 252 302 L 240 322 L 218 328 L 198 318 L 188 298 L 192 280 Z",
    labelX: 220,
    labelY: 302,
  },
  {
    id: "sivaganga",
    english: "Sivaganga",
    tamil: "சிவகங்கை",
    path: "M 252 302 L 270 295 L 290 305 L 295 325 L 280 342 L 258 345 L 240 332 L 240 315 Z",
    labelX: 268,
    labelY: 322,
  },
  {
    id: "virudhunagar",
    english: "Virudhunagar",
    tamil: "விருதுநகர்",
    path: "M 188 318 L 218 328 L 232 348 L 225 368 L 205 375 L 182 365 L 172 342 L 178 325 Z",
    labelX: 200,
    labelY: 348,
  },
  {
    id: "ramanathapuram",
    english: "Ramanathapuram",
    tamil: "இராமநாதபுரம்",
    path: "M 258 345 L 280 342 L 302 355 L 308 378 L 295 395 L 272 398 L 252 385 L 245 362 Z",
    labelX: 278,
    labelY: 372,
  },
  {
    id: "tenkasi",
    english: "Tenkasi",
    tamil: "தென்காசி",
    path: "M 148 352 L 172 342 L 182 365 L 178 388 L 162 398 L 142 388 L 135 368 Z",
    labelX: 158,
    labelY: 372,
  },
  {
    id: "tirunelveli",
    english: "Tirunelveli",
    tamil: "திருநெல்வேலி",
    path: "M 158 398 L 182 388 L 205 398 L 215 418 L 208 438 L 185 448 L 162 438 L 152 418 Z",
    labelX: 182,
    labelY: 420,
  },
  {
    id: "thoothukudi",
    english: "Thoothukudi",
    tamil: "தூத்துக்குடி",
    path: "M 205 398 L 230 392 L 252 402 L 255 422 L 240 442 L 218 448 L 205 432 L 205 415 Z",
    labelX: 228,
    labelY: 420,
  },
  {
    id: "kanyakumari",
    english: "Kanyakumari",
    tamil: "கன்னியாகுமாரி",
    path: "M 162 438 L 188 448 L 208 458 L 205 478 L 188 490 L 168 482 L 155 462 Z",
    labelX: 182,
    labelY: 465,
  },
];

export default function DistrictScatterMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  const hoveredDistrict = districts.find((d) => d.id === hovered);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,500&family=Syne:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .tnmap-root {
          min-height: 100vh;
          background: #010a03;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          font-family: 'Syne', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Deep forest ambiance */
        .tnmap-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 20% 15%, rgba(21,128,61,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 80%, rgba(15,118,110,0.15) 0%, transparent 55%),
            radial-gradient(ellipse 40% 60% at 50% 50%, rgba(34,197,94,0.04) 0%, transparent 65%);
          pointer-events: none;
        }

        /* Noise grain overlay */
        .tnmap-root::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.7;
        }

        .tnmap-header {
          text-align: center;
          margin-bottom: 32px;
          position: relative;
          z-index: 10;
        }

        .tnmap-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(74,222,128,0.45);
          margin-bottom: 8px;
        }

        .tnmap-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          font-style: italic;
          color: rgba(187,247,208,0.88);
          letter-spacing: 0.02em;
          line-height: 1;
        }

        .tnmap-subtitle {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          color: rgba(74,222,128,0.35);
          margin-top: 6px;
          letter-spacing: 0.15em;
        }

        /* SVG container */
        .tnmap-svg-wrap {
          position: relative;
          z-index: 10;
          filter: drop-shadow(0 0 40px rgba(34,197,94,0.12)) drop-shadow(0 20px 60px rgba(0,0,0,0.6));
        }

        .tnmap-svg {
          width: min(480px, 90vw);
          height: auto;
        }

        /* District paths */
        .district-path {
          fill: rgba(12, 40, 18, 0.85);
          stroke: #22c55e;
          stroke-width: 1.2;
          stroke-linejoin: round;
          cursor: pointer;
          transition: fill 0.25s, filter 0.25s, stroke-width 0.2s;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }

        .district-path:hover,
        .district-path.active {
          fill: rgba(21, 90, 38, 0.92);
          stroke: #4ade80;
          stroke-width: 1.8;
          filter: drop-shadow(0 0 12px rgba(74,222,128,0.45)) drop-shadow(0 2px 8px rgba(0,0,0,0.6));
        }

        /* District labels in SVG */
        .district-label {
          font-family: 'Syne', sans-serif;
          font-size: 6px;
          font-weight: 600;
          fill: rgba(187,247,208,0.82);
          text-anchor: middle;
          dominant-baseline: middle;
          pointer-events: none;
          letter-spacing: 0.02em;
          text-shadow: 0 1px 3px rgba(0,0,0,0.9);
        }

        .district-label.active {
          fill: #4ade80;
        }

        /* Tooltip card */
        .tnmap-tooltip {
          position: fixed;
          pointer-events: none;
          z-index: 100;
          background: rgba(4, 18, 8, 0.96);
          border: 1px solid rgba(74,222,128,0.25);
          border-radius: 14px;
          padding: 12px 16px;
          min-width: 160px;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 40px rgba(0,0,0,0.6), 0 0 24px rgba(34,197,94,0.08);
          transform: translate(-50%, calc(-100% - 16px));
        }

        .tooltip-district {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-style: italic;
          color: #ecfdf5;
          margin-bottom: 3px;
        }

        .tooltip-tamil {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          color: rgba(74,222,128,0.65);
          font-weight: 400;
        }

        .tooltip-tag {
          margin-top: 6px;
          font-family: 'Space Mono', monospace;
          font-size: 0.52rem;
          color: rgba(74,222,128,0.35);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* Grid background on SVG */
        .map-grid-line {
          stroke: rgba(34,197,94,0.06);
          stroke-width: 0.5;
        }

        /* Glowing border ring */
        .tnmap-ring {
          position: absolute;
          inset: -2px;
          border-radius: 4px;
          border: 1px solid rgba(34,197,94,0.08);
          pointer-events: none;
        }

        /* Stats strip */
        .tnmap-stats {
          display: flex;
          gap: 40px;
          margin-top: 28px;
          position: relative;
          z-index: 10;
        }

        .stat-item {
          text-align: center;
        }

        .stat-num {
          font-family: 'Space Mono', monospace;
          font-size: 1.1rem;
          font-weight: 700;
          color: #4ade80;
          display: block;
        }

        .stat-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.6rem;
          color: rgba(74,222,128,0.38);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        /* Blinking status dot */
        .status-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34,197,94,0.7);
          animation: blink 2.5s ease infinite;
          margin-right: 6px;
          vertical-align: middle;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Decorative SVG frame lines */
        .frame-line {
          stroke: rgba(34,197,94,0.18);
          stroke-width: 0.8;
          fill: none;
        }
      `}</style>

      <div className="tnmap-root">
        {/* Header */}
        <div className="tnmap-header">
          <div className="tnmap-eyebrow">
            <span className="status-dot" />
            தமிழ்நாடு · District Map
          </div>
          <div className="tnmap-title">Tamil Nadu</div>
          <div className="tnmap-subtitle">38 Districts · South India</div>
        </div>

        {/* SVG Map */}
        <div className="tnmap-svg-wrap">
          <div className="tnmap-ring" />
          <svg
            className="tnmap-svg"
            viewBox="0 0 480 520"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background grid */}
            {Array.from({ length: 22 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={i * 25}
                x2="480"
                y2={i * 25}
                className="map-grid-line"
              />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 25}
                y1="0"
                x2={i * 25}
                y2="520"
                className="map-grid-line"
              />
            ))}

            {/* Subtle diagonal accents */}
            <line
              x1="0" y1="0" x2="480" y2="520"
              stroke="rgba(74,222,128,0.03)"
              strokeWidth="0.5"
            />

            {/* District paths */}
            {districts.map((d) => (
              <g key={d.id}>
                <path
                  d={d.path}
                  className={`district-path${hovered === d.id ? " active" : ""}`}
                  onMouseEnter={() => setHovered(d.id)}
                  onMouseLeave={() => setHovered(null)}
                />
                <text
                  x={d.labelX}
                  y={d.labelY}
                  className={`district-label${hovered === d.id ? " active" : ""}`}
                  onMouseEnter={() => setHovered(d.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ pointerEvents: "all", cursor: "pointer" }}
                >
                  {d.english}
                </text>
              </g>
            ))}

            {/* Decorative frame corners */}
            <path d="M 10 10 L 10 30 M 10 10 L 30 10" className="frame-line" />
            <path d="M 470 10 L 450 10 M 470 10 L 470 30" className="frame-line" />
            <path d="M 10 510 L 10 490 M 10 510 L 30 510" className="frame-line" />
            <path d="M 470 510 L 450 510 M 470 510 L 470 490" className="frame-line" />

            {/* Compass rose (bottom right) */}
            <g transform="translate(448, 495)">
              <circle cx="0" cy="0" r="8" fill="none" stroke="rgba(34,197,94,0.2)" strokeWidth="0.6" />
              <text x="0" y="-10" textAnchor="middle" fontSize="5" fill="rgba(74,222,128,0.4)" fontFamily="Space Mono">N</text>
              <line x1="0" y1="-6" x2="0" y2="6" stroke="rgba(74,222,128,0.3)" strokeWidth="0.7" />
              <line x1="-6" y1="0" x2="6" y2="0" stroke="rgba(74,222,128,0.2)" strokeWidth="0.5" />
              <polygon points="0,-6 1.5,-2 -1.5,-2" fill="rgba(74,222,128,0.5)" />
            </g>

            {/* Scale bar */}
            <g transform="translate(20, 495)">
              <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(74,222,128,0.35)" strokeWidth="1" />
              <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(74,222,128,0.35)" strokeWidth="0.8" />
              <line x1="40" y1="-3" x2="40" y2="3" stroke="rgba(74,222,128,0.35)" strokeWidth="0.8" />
              <text x="20" y="-6" textAnchor="middle" fontSize="4.5" fill="rgba(74,222,128,0.35)" fontFamily="Space Mono">100 KM</text>
            </g>
          </svg>
        </div>

        {/* Floating tooltip */}
        <AnimatePresence>
          {hovered && hoveredDistrict && (
            <motion.div
              className="tnmap-tooltip"
              style={{
                left: "50%",
                top: "50%",
              }}
              initial={{ opacity: 0, scale: 0.88, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 4 }}
              transition={{ duration: 0.18, type: "spring", stiffness: 300, damping: 24 }}
            >
              <div className="tooltip-district">{hoveredDistrict.english}</div>
              <div className="tooltip-tamil">{hoveredDistrict.tamil}</div>
              <div className="tooltip-tag">Tamil Nadu · District</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats strip */}
        <div className="tnmap-stats">
          <div className="stat-item">
            <span className="stat-num">38</span>
            <span className="stat-label">Districts</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">130K</span>
            <span className="stat-label">km²</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">77M+</span>
            <span className="stat-label">Population</span>
          </div>
        </div>
      </div>
    </>
  );
}