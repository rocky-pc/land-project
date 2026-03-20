"use client";

import { Activity, Sun, CloudRain, ShieldCheck, Wifi, Eye, Thermometer, Wind } from "lucide-react";
import LiveStreamPlayer from "@/components/LiveStreamPlayer";

const liveFeeds = [
  {
    id: 1,
    videoId: "VID-20260320-WA0015",
    orientation: "landscape" as const,
    title: "Main Plot View",
    location: "Central Survey Zone",
    coordinates: { lat: "12.9716° N", lng: "77.5946° E" },
  },
  {
    id: 2,
    videoId: "VID-20260320-WA0017",
    orientation: "portrait" as const,
    title: "Entry Gate",
    location: "North Entrance",
    coordinates: { lat: "12.9720° N", lng: "77.5950° E" },
  },
  {
    id: 3,
    videoId: "VID-20260320-WA0006",
    orientation: "square" as const,
    title: "North Boundary",
    location: "Perimeter Fence Line",
    coordinates: { lat: "12.9725° N", lng: "77.5955° E" },
  },
];

const statusCards = [
  {
    icon: ShieldCheck,
    label: "Secure Perimeter",
    value: "Motion Sensors Active",
    accent: "moss",
  },
  {
    icon: Activity,
    label: "Network Status",
    value: "Stable · 99.9% Uptime",
    accent: "teal",
  },
  {
    icon: CloudRain,
    label: "Weather Alert",
    value: "No Extreme Conditions",
    accent: "sage",
  },
];

export default function CCTVPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=Syne:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cctv-root {
          min-height: 100vh;
          background:
            radial-gradient(ellipse 90% 50% at 15% 0%, rgba(21,128,61,0.11) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 85% 85%, rgba(15,118,110,0.08) 0%, transparent 55%),
            #020c04;
          font-family: 'Syne', sans-serif;
          color: #d1fae5;
          padding: 7rem 1.5rem 4rem;
          position: relative;
          overflow-x: hidden;
        }

        /* Grain overlay */
        .cctv-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
        }

        .cctv-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Header ── */
        .cctv-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        @media(min-width:768px){
          .cctv-header { flex-direction: row; align-items: flex-end; justify-content: space-between; }
        }

        .cctv-eyebrow {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          color: rgba(74,222,128,0.45);
          text-transform: uppercase;
          margin-bottom: 0.55rem;
        }
        .cctv-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 7px rgba(34,197,94,0.7);
          animation: cctv-blink 2s ease infinite;
        }
        @keyframes cctv-blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

        .cctv-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 700;
          color: #ecfdf5;
          letter-spacing: -0.025em;
          line-height: 1.05;
        }
        .cctv-title em { color: #4ade80; font-style: italic; }

        .cctv-sub {
          font-size: 0.88rem;
          color: #374151;
          margin-top: 0.5rem;
          line-height: 1.65;
          max-width: 420px;
        }

        /* Weather pill */
        .cctv-weather {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(6,20,9,0.7);
          border: 1px solid rgba(34,197,94,0.1);
          border-radius: 999px;
          padding: 8px 18px;
          backdrop-filter: blur(12px);
          flex-shrink: 0;
        }
        .cctv-weather-icon { color: #fbbf24; width: 18px; height: 18px; }
        .cctv-weather-text {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          color: rgba(187,247,208,0.65);
          letter-spacing: 0.06em;
        }
        .cctv-weather-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(74,222,128,0.25); }

        /* Divider vine */
        .cctv-vine {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 2rem;
        }
        .cctv-vine-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(34,197,94,0.3), transparent);
        }
        .cctv-vine-txt {
          font-family: 'Space Mono', monospace;
          font-size: 0.52rem;
          color: rgba(34,197,94,0.2);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* ── Feed count bar ── */
        .cctv-feedbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.2rem;
        }
        .cctv-feedbar-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cctv-feed-badge {
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.14);
          border-radius: 999px;
          padding: 3px 12px;
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          color: rgba(74,222,128,0.5);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .cctv-feed-live {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          color: rgba(239,68,68,0.7);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .cctv-live-ping {
          position: relative;
          width: 7px; height: 7px;
        }
        .cctv-live-ping-inner {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(239,68,68,0.65);
          animation: cctv-liveping 1.6s ease-out infinite;
        }
        .cctv-live-ping-core {
          position: absolute;
          inset: 1.5px;
          border-radius: 50%;
          background: #ef4444;
        }
        @keyframes cctv-liveping {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        /* ── Video grid ── */
        .cctv-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.1rem;
          margin-bottom: 2rem;
        }
        @media(min-width:640px){ .cctv-grid { grid-template-columns: 1fr 1fr; } }
        @media(min-width:1024px){ .cctv-grid { grid-template-columns: repeat(3, 1fr); } }

        /* Feed wrapper with label */
        .cctv-feed-wrap {
          position: relative;
          opacity: 0;
          transform: translateY(18px);
          animation: cctv-fadein 0.55s ease forwards;
        }
        .cctv-feed-wrap:nth-child(1){ animation-delay: 0.05s; }
        .cctv-feed-wrap:nth-child(2){ animation-delay: 0.15s; }
        .cctv-feed-wrap:nth-child(3){ animation-delay: 0.25s; }
        @keyframes cctv-fadein { to { opacity:1; transform:translateY(0); } }

        .cctv-feed-label {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 0.5rem;
        }
        .cctv-feed-num {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: rgba(74,222,128,0.3);
          letter-spacing: 0.12em;
        }
        .cctv-feed-name {
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(187,247,208,0.55);
        }

        /* ── Status cards ── */
        .cctv-status-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.9rem;
        }
        @media(min-width:640px){ .cctv-status-grid { grid-template-columns: repeat(3, 1fr); } }

        .cctv-stat-card {
          background: rgba(6,20,9,0.72);
          border: 1px solid rgba(34,197,94,0.09);
          border-radius: 20px;
          padding: 1.3rem 1.4rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          backdrop-filter: blur(16px);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(14px);
          animation: cctv-fadein 0.5s ease forwards;
          transition: border-color 0.3s, transform 0.3s;
        }
        .cctv-stat-card:nth-child(1){ animation-delay: 0.35s; }
        .cctv-stat-card:nth-child(2){ animation-delay: 0.45s; }
        .cctv-stat-card:nth-child(3){ animation-delay: 0.55s; }
        .cctv-stat-card:hover {
          border-color: rgba(74,222,128,0.18);
          transform: translateY(-2px);
        }
        .cctv-stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(74,222,128,0.3), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .cctv-stat-card:hover::before { opacity: 1; }

        .cctv-stat-icon {
          width: 46px; height: 46px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .cctv-stat-icon.moss { background: rgba(22,101,52,0.3); border: 1px solid rgba(34,197,94,0.18); color: #4ade80; }
        .cctv-stat-icon.teal { background: rgba(15,118,110,0.25); border: 1px solid rgba(45,212,191,0.18); color: #2dd4bf; }
        .cctv-stat-icon.sage { background: rgba(16,185,129,0.15); border: 1px solid rgba(110,231,183,0.18); color: #6ee7b7; }

        .cctv-stat-label {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 600;
          color: #ecfdf5;
          line-height: 1.2;
        }
        .cctv-stat-val {
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          color: #374151;
          margin-top: 3px;
          letter-spacing: 0.05em;
        }

        /* Active indicator dot */
        .cctv-active-dot {
          position: absolute;
          top: 14px; right: 14px;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 7px rgba(34,197,94,0.6);
          animation: cctv-blink 2.5s ease infinite;
        }
      `}</style>

      <main className="cctv-root">
        <div className="cctv-inner">

          {/* Header */}
          <header className="cctv-header">
            <div>
              <div className="cctv-eyebrow">
                <div className="cctv-eyebrow-dot" />
                Surveillance Dashboard · Live
              </div>
              <h1 className="cctv-title">
                Live <em>CCTV</em> Dashboard
              </h1>
              <p className="cctv-sub">
                Real-time surveillance of your plot, streamed directly to your hands. All feeds encrypted end-to-end.
              </p>
            </div>
            <div className="cctv-weather">
              <Sun className="cctv-weather-icon" />
              <span className="cctv-weather-text">32°C</span>
              <div className="cctv-weather-dot" />
              <span className="cctv-weather-text">Sunny</span>
              <div className="cctv-weather-dot" />
              <Wind style={{ width: 14, height: 14, color: 'rgba(74,222,128,0.4)' }} />
              <span className="cctv-weather-text">12 km/h</span>
            </div>
          </header>

          {/* Vine divider */}
          <div className="cctv-vine">
            <div className="cctv-vine-line" />
            <span className="cctv-vine-txt">🌿 Live Feeds · Tamil Nadu</span>
            <div className="cctv-vine-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.3))' }} />
          </div>

          {/* Feed count bar */}
          <div className="cctv-feedbar">
            <div className="cctv-feedbar-left">
              <span className="cctv-feed-badge">{liveFeeds.length} Cameras</span>
              <div className="cctv-feed-live">
                <div className="cctv-live-ping">
                  <div className="cctv-live-ping-inner" />
                  <div className="cctv-live-ping-core" />
                </div>
                All Live
              </div>
            </div>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '0.55rem', color: 'rgba(74,222,128,0.22)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Updated: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST
            </span>
          </div>

          {/* Video grid */}
          <div className="cctv-grid">
            {liveFeeds.map((feed) => (
              <div key={feed.id} className="cctv-feed-wrap">
                <div className="cctv-feed-label">
                  <span className="cctv-feed-num">CAM·{String(feed.id).padStart(2, '0')}</span>
                  <span className="cctv-feed-name">{feed.title}</span>
                </div>
                 <LiveStreamPlayer
                   videoId={feed.videoId}
                   orientation={feed.orientation}
                   location={feed.location}
                   coordinates={feed.coordinates}
                 />
              </div>
            ))}
          </div>

          {/* Status cards */}
          <div className="cctv-status-grid">
            {statusCards.map(({ icon: Icon, label, value, accent }) => (
              <div key={label} className="cctv-stat-card">
                <div className={`cctv-stat-icon ${accent}`}>
                  <Icon style={{ width: 20, height: 20 }} />
                </div>
                <div>
                  <div className="cctv-stat-label">{label}</div>
                  <div className="cctv-stat-val">{value}</div>
                </div>
                <div className="cctv-active-dot" />
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}