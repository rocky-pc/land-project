"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Lock, CheckCircle, X, Leaf, ShieldCheck, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginModal({ className = "", onClose }: { className?: string, onClose?: () => void }) {
  const { user, login, logout, isLoading } = useAuth();
  const [plotId, setPlotId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoggedIn = user?.isLoggedIn && user?.id !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!plotId.trim()) { setError('Please enter your Plot ID'); return; }
    const isValid = login(plotId);
    if (isValid) {
      setIsVerifying(true);
      setTimeout(() => setIsVerifying(false), 1800);
    } else {
      setError('Invalid Plot ID. Please check and try again.');
    }
  };

  const handleLogout = () => {
    logout();
    setPlotId('');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,500&family=Syne:wght@400;500;600&family=Space+Mono&display=swap');

        .lm-backdrop {
          position: fixed;
          inset: 0;
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(1,8,2,0.72);
          backdrop-filter: blur(14px);
          font-family: 'Syne', sans-serif;
          padding: 1rem;
        }

        .lm-card {
          position: relative;
          background: rgba(6,18,8,0.92);
          border: 1px solid rgba(34,197,94,0.14);
          border-radius: 28px;
          padding: 2.2rem 2rem;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(34,197,94,0.06), 0 0 60px rgba(34,197,94,0.04);
          overflow: hidden;
        }

        /* Top shimmer line */
        .lm-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(74,222,128,0.5), rgba(45,212,191,0.3), transparent);
        }

        /* Ambient blob inside card */
        .lm-blob {
          position: absolute;
          top: -60px; right: -60px;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,197,94,0.07), transparent);
          pointer-events: none;
        }

        /* Header */
        .lm-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.6rem;
          position: relative;
        }
        .lm-icon-wrap {
          width: 44px; height: 44px;
          border-radius: 14px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.18);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 0.8rem;
        }
        .lm-icon { color: #4ade80; width: 20px; height: 20px; }
        .lm-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.45rem;
          font-weight: 600;
          color: #ecfdf5;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .lm-title em { font-style: italic; color: #4ade80; }
        .lm-sub {
          font-size: 0.78rem;
          color: #374151;
          margin-top: 0.2rem;
          line-height: 1.5;
        }
        .lm-close {
          width: 32px; height: 32px;
          border-radius: 9px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: rgba(187,247,208,0.4);
          transition: background 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .lm-close:hover { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.2); color: #f87171; }

        /* Input */
        .lm-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(74,222,128,0.45);
          margin-bottom: 0.45rem;
          display: block;
        }
        .lm-input-wrap {
          position: relative;
        }
        .lm-input-icon {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(74,222,128,0.3);
          width: 15px; height: 15px;
          pointer-events: none;
        }
        .lm-input {
          width: 100%;
          background: rgba(6,20,9,0.7);
          border: 1px solid rgba(34,197,94,0.13);
          border-radius: 13px;
          padding: 12px 14px 12px 38px;
          font-family: 'Space Mono', monospace;
          font-size: 0.82rem;
          color: #ecfdf5;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          letter-spacing: 0.06em;
        }
        .lm-input::placeholder { color: rgba(74,222,128,0.2); letter-spacing: 0.08em; }
        .lm-input:focus {
          border-color: rgba(74,222,128,0.3);
          box-shadow: 0 0 0 3px rgba(34,197,94,0.07), 0 0 16px rgba(34,197,94,0.05);
        }
        .lm-input.err { border-color: rgba(239,68,68,0.3); }
        .lm-input.err:focus { box-shadow: 0 0 0 3px rgba(239,68,68,0.07); }

        .lm-error {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 7px;
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          color: #f87171;
          letter-spacing: 0.05em;
        }

        /* Button */
        .lm-btn {
          width: 100%;
          padding: 13px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #15803d, #22c55e);
          color: #ecfdf5;
          font-family: 'Syne', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(34,197,94,0.2);
          position: relative;
          overflow: hidden;
        }
        .lm-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.08), transparent);
        }
        .lm-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(34,197,94,0.3);
        }
        .lm-btn:active:not(:disabled) { transform: translateY(0); }
        .lm-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        /* Demo IDs strip */
        .lm-demo {
          margin-top: 1rem;
          padding: 10px 12px;
          background: rgba(34,197,94,0.04);
          border: 1px solid rgba(34,197,94,0.08);
          border-radius: 10px;
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: rgba(74,222,128,0.35);
          letter-spacing: 0.08em;
          line-height: 1.7;
          text-align: center;
        }
        .lm-demo strong { color: rgba(74,222,128,0.55); }

        /* Verified card */
        .lm-verified-icon {
          width: 56px; height: 56px;
          border-radius: 18px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(74,222,128,0.2);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1rem;
          color: #4ade80;
        }
        .lm-verified-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-style: italic;
          color: #ecfdf5;
          text-align: center;
          margin-bottom: 0.3rem;
        }
        .lm-verified-name {
          font-family: 'Syne', sans-serif;
          font-size: 0.82rem;
          color: rgba(74,222,128,0.55);
          text-align: center;
          margin-bottom: 0.2rem;
        }
        .lm-verified-id {
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          color: rgba(74,222,128,0.3);
          text-align: center;
          letter-spacing: 0.1em;
          margin-bottom: 1.4rem;
        }
        .lm-divider { height: 1px; background: rgba(34,197,94,0.07); margin: 1rem 0; }

        .lm-logout-btn {
          width: 100%;
          padding: 11px;
          border-radius: 12px;
          border: 1px solid rgba(239,68,68,0.15);
          background: rgba(239,68,68,0.05);
          color: rgba(248,113,113,0.6);
          font-family: 'Syne', sans-serif;
          font-size: 0.8rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .lm-logout-btn:hover {
          background: rgba(239,68,68,0.1);
          border-color: rgba(239,68,68,0.25);
          color: #f87171;
        }

        /* Verifying state */
        .lm-verifying {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 0;
        }
        .lm-spinner {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(34,197,94,0.12);
          border-top-color: #22c55e;
          animation: lm-spin 0.9s linear infinite;
        }
        @keyframes lm-spin { to { transform: rotate(360deg); } }
        .lm-verifying-text {
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          color: rgba(74,222,128,0.45);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .lm-verifying-id {
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          color: rgba(74,222,128,0.25);
          letter-spacing: 0.1em;
        }
      `}</style>

      <AnimatePresence>
        <motion.div
          className="lm-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Logged in — access granted */}
           {isLoggedIn ? (
             <motion.div
               className="lm-card"
               initial={{ scale: 0.94, opacity: 0, y: 16 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.94, opacity: 0 }}
               transition={{ duration: 0.35, type: 'spring', stiffness: 200, damping: 24 }}
             >
               <div className="lm-blob" />
                <div className="lm-head">
                  <div className="lm-icon-wrap">
                    <ShieldCheck className="lm-icon" />
                  </div>
                  <div>
                    <h2 className="lm-title">Access Granted</h2>
                    <p className="lm-sub">Welcome back, {user.name}</p>
                  </div>
                  <button className="lm-close" onClick={() => onClose && onClose()}>
                    <X style={{ width: 14, height: 14 }} />
                  </button>
                </div>
               <div className="lm-verified-id">PLOT · {user.plotId}</div>
               <div className="lm-divider" />
               <p style={{ fontSize: '0.78rem', color: '#374151', textAlign: 'center', lineHeight: 1.65, marginBottom: '1.2rem' }}>
                 Your private land data and CCTV feeds are now accessible.
               </p>
               <button className="lm-logout-btn" onClick={handleLogout}>
                 <LogOut style={{ width: 14, height: 14 }} />
                 Sign out
               </button>
             </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {/* Verifying state */}
              {isVerifying ? (
                <motion.div
                  key="verifying"
                  className="lm-card"
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.94, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="lm-blob" />
                  <div className="lm-verifying">
                    <div className="lm-spinner" />
                    <div className="lm-verifying-text">Unlocking your land data…</div>
                    <div className="lm-verifying-id">ID: {plotId}</div>
                  </div>
                </motion.div>
              ) : (
                /* Login form */
                <motion.div
                  key="form"
                  className="lm-card"
                  initial={{ scale: 0.94, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.94, opacity: 0, y: -16 }}
                  transition={{ duration: 0.38, type: 'spring', stiffness: 190, damping: 22 }}
                >
                  <div className="lm-blob" />

                  <div className="lm-head">
                    <div>
                      <div className="lm-icon-wrap">
                        <Leaf className="lm-icon" />
                      </div>
                      <h2 className="lm-title">Access Your <em>Private View</em></h2>
                      <p className="lm-sub">Enter your unique Plot ID to unlock land data & live CCTV.</p>
                    </div>
                       <button className="lm-close" onClick={() => onClose && onClose()}>
                         <X style={{ width: 14, height: 14 }} />
                       </button>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label className="lm-label" htmlFor="plotId">Plot ID</label>
                      <div className="lm-input-wrap">
                        <Lock className="lm-input-icon" />
                        <input
                          id="plotId"
                          type="text"
                          value={plotId}
                          onChange={e => { setPlotId(e.target.value); setError(null); }}
                          placeholder="e.g., TN-CUD-001"
                          className={`lm-input ${error ? 'err' : ''}`}
                          disabled={isLoading}
                          autoComplete="off"
                        />
                      </div>
                      {error && (
                        <div className="lm-error">
                          <X style={{ width: 11, height: 11 }} />
                          {error}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="lm-btn"
                      disabled={isLoading || !plotId.trim()}
                    >
                      {isLoading ? 'Verifying…' : '🌿 Access Private View'}
                    </button>

                    <div className="lm-demo">
                      <strong>Demo IDs:</strong>&nbsp;
                      TN-CUD-001 &middot; TN-CHE-002 &middot; TN-MDU-003
                      <br />
                      LAND2026 &middot; UK-INVEST-01 &middot; CUDDALORE-PLOT
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}