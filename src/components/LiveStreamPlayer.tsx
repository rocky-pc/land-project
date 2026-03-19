import { useState } from 'react';
import { Maximize2, Volume2, VolumeX, Radio } from 'lucide-react';

interface LiveStreamPlayerProps {
  videoId: string;
  location: string;
  coordinates: { lat: string; lng: string };
  className?: string;
}

export default function LiveStreamPlayer({
  videoId,
  location,
  coordinates,
  className,
}: LiveStreamPlayerProps) {
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,500&family=Syne:wght@400;500&family=Space+Mono&display=swap');

        .lsp-root {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: #020c04;
          border: 1px solid rgba(34,197,94,0.12);
          font-family: 'Syne', sans-serif;
          box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,197,94,0.06);
        }

        /* Top shimmer line */
        .lsp-shimmer {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(74,222,128,0.45), rgba(45,212,191,0.3), transparent);
          z-index: 10;
        }

        /* Video wrapper */
        .lsp-video {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
        }
        .lsp-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        /* Vignette overlay on video */
        .lsp-vignette {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, rgba(2,12,4,0.85) 0%, transparent 35%),
            linear-gradient(to bottom, rgba(2,12,4,0.4) 0%, transparent 25%),
            linear-gradient(to right, rgba(2,12,4,0.3) 0%, transparent 20%),
            linear-gradient(to left, rgba(2,12,4,0.3) 0%, transparent 20%);
          pointer-events: none;
          z-index: 2;
        }

        /* Corner scan lines */
        .lsp-scanline {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.06) 2px,
            rgba(0,0,0,0.06) 4px
          );
          pointer-events: none;
          z-index: 3;
          opacity: 0.4;
        }

        /* Bottom overlay bar */
        .lsp-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 16px 18px 18px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          z-index: 5;
        }

        /* Live badge */
        .lsp-live {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(2,12,4,0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 999px;
          padding: 4px 10px 4px 8px;
          margin-bottom: 6px;
        }
        .lsp-live-dot {
          position: relative;
          width: 8px; height: 8px;
        }
        .lsp-live-ping {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(239,68,68,0.7);
          animation: lsp-ping 1.5s ease-out infinite;
        }
        .lsp-live-core {
          position: absolute;
          inset: 1px;
          border-radius: 50%;
          background: #ef4444;
        }
        @keyframes lsp-ping {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .lsp-live-text {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #ecfdf5;
          text-transform: uppercase;
        }

        /* Location info */
        .lsp-loc {
          margin-top: 4px;
        }
        .lsp-loc-name {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-style: italic;
          color: rgba(187,247,208,0.9);
          line-height: 1.2;
          text-shadow: 0 1px 8px rgba(0,0,0,0.8);
        }
        .lsp-loc-coords {
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          color: rgba(74,222,128,0.45);
          letter-spacing: 0.1em;
          margin-top: 2px;
        }

        /* Control buttons */
        .lsp-controls {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        .lsp-btn {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: rgba(6,20,9,0.75);
          border: 1px solid rgba(34,197,94,0.18);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          color: rgba(74,222,128,0.7);
        }
        .lsp-btn:hover {
          background: rgba(34,197,94,0.1);
          border-color: rgba(74,222,128,0.35);
          transform: scale(1.06);
          color: #4ade80;
        }
        .lsp-btn:active { transform: scale(0.97); }

        /* Top-right signal badge */
        .lsp-signal {
          position: absolute;
          top: 14px;
          right: 16px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(6,20,9,0.7);
          border: 1px solid rgba(34,197,94,0.15);
          border-radius: 999px;
          padding: 3px 9px 3px 7px;
          backdrop-filter: blur(10px);
        }
        .lsp-signal-icon {
          color: #22c55e;
          width: 11px; height: 11px;
          animation: lsp-pulse 2s ease infinite;
        }
        @keyframes lsp-pulse { 0%,100%{opacity:1;} 50%{opacity:0.45;} }
        .lsp-signal-text {
          font-family: 'Space Mono', monospace;
          font-size: 0.55rem;
          color: rgba(74,222,128,0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* Top-left timestamp */
        .lsp-ts {
          position: absolute;
          top: 14px;
          left: 16px;
          z-index: 10;
          font-family: 'Space Mono', monospace;
          font-size: 0.55rem;
          color: rgba(74,222,128,0.35);
          letter-spacing: 0.12em;
        }

        /* Corner bracket decorations */
        .lsp-corner {
          position: absolute;
          width: 14px; height: 14px;
          z-index: 6;
          pointer-events: none;
        }
        .lsp-corner.tl { top: 8px; left: 8px; border-top: 1.5px solid rgba(74,222,128,0.35); border-left: 1.5px solid rgba(74,222,128,0.35); }
        .lsp-corner.tr { top: 8px; right: 8px; border-top: 1.5px solid rgba(74,222,128,0.35); border-right: 1.5px solid rgba(74,222,128,0.35); }
        .lsp-corner.bl { bottom: 8px; left: 8px; border-bottom: 1.5px solid rgba(74,222,128,0.35); border-left: 1.5px solid rgba(74,222,128,0.35); }
        .lsp-corner.br { bottom: 8px; right: 8px; border-bottom: 1.5px solid rgba(74,222,128,0.35); border-right: 1.5px solid rgba(74,222,128,0.35); }
      `}</style>

      <div className={`lsp-root ${className || ''}`}>
        <div className="lsp-shimmer" />

        {/* Video */}
        <div className="lsp-video">
          <iframe
            className="lsp-iframe"
            title="Live Stream"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&modestbranding=1&showinfo=0&loop=1&playlist=${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="lsp-vignette" />
          <div className="lsp-scanline" />

          {/* Corner brackets */}
          <div className="lsp-corner tl" />
          <div className="lsp-corner tr" />
          <div className="lsp-corner bl" />
          <div className="lsp-corner br" />

          {/* Timestamp top-left */}
          <div className="lsp-ts">REC ● {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>

          {/* Signal badge top-right */}
          <div className="lsp-signal">
            <Radio className="lsp-signal-icon" />
            <span className="lsp-signal-text">HD Live</span>
          </div>

          {/* Bottom overlay */}
          <div className="lsp-overlay">
            <div>
              <div className="lsp-live">
                <div className="lsp-live-dot">
                  <div className="lsp-live-ping" />
                  <div className="lsp-live-core" />
                </div>
                <span className="lsp-live-text">Live</span>
              </div>
              <div className="lsp-loc">
                <div className="lsp-loc-name">{location}</div>
                <div className="lsp-loc-coords">{coordinates.lat}, {coordinates.lng}</div>
              </div>
            </div>

            <div className="lsp-controls">
              <button
                className="lsp-btn"
                onClick={() => setMuted(m => !m)}
                title={muted ? 'Unmute' : 'Mute'}
              >
                {muted
                  ? <VolumeX style={{ width: 15, height: 15 }} />
                  : <Volume2 style={{ width: 15, height: 15 }} />
                }
              </button>
              <button className="lsp-btn" title="Fullscreen">
                <Maximize2 style={{ width: 14, height: 14 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}