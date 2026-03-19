"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send, Leaf, Clock, Globe } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", time: "Morning (10 AM - 12 PM)", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactItems = [
    {
      icon: MapPin,
      title: "Corporate Office",
      lines: ["Level 4, Prestige Tower", "Anna Salai, Chennai 600002"],
      accent: "moss",
    },
    {
      icon: Phone,
      title: "Global Hotline",
      lines: ["+44 20 7123 4567 (UK)", "+1 212 555 0198 (US)"],
      accent: "teal",
    },
    {
      icon: Mail,
      title: "Email Support",
      lines: ["invest@yourland.com"],
      accent: "sage",
    },
    {
      icon: Clock,
      title: "Response Time",
      lines: ["Within 2 hours", "Mon – Sat, 9 AM – 7 PM IST"],
      accent: "amber",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=Syne:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cp-root {
          min-height: 100vh;
          background:
            radial-gradient(ellipse 80% 55% at 10% 0%, rgba(21,128,61,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 90% 90%, rgba(15,118,110,0.08) 0%, transparent 55%),
            #020c04;
          font-family: 'Syne', sans-serif;
          color: #d1fae5;
          padding: 7rem 1.5rem 5rem;
          position: relative;
          overflow-x: hidden;
        }
        .cp-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.45;
        }

        .cp-inner {
          max-width: 1140px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Left column ── */
        .cp-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media(min-width:900px){ .cp-layout { grid-template-columns: 1fr 1fr; gap: 4rem; } }

        /* Eyebrow */
        .cp-eyebrow {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'Space Mono', monospace;
          font-size: 0.57rem;
          letter-spacing: 0.28em;
          color: rgba(74,222,128,0.4);
          text-transform: uppercase;
          margin-bottom: 0.7rem;
        }
        .cp-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 7px rgba(34,197,94,0.65);
          animation: cp-blink 2s ease infinite;
        }
        @keyframes cp-blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

        .cp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          font-weight: 700;
          color: #ecfdf5;
          letter-spacing: -0.025em;
          line-height: 1.05;
          margin-bottom: 0.9rem;
        }
        .cp-title em { color: #4ade80; font-style: italic; }

        .cp-sub {
          font-size: 0.88rem;
          color: #374151;
          line-height: 1.75;
          margin-bottom: 2.2rem;
          max-width: 420px;
        }

        /* Language badges */
        .cp-langs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        .cp-lang-badge {
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.12);
          border-radius: 999px;
          padding: 4px 12px;
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          color: rgba(74,222,128,0.45);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .cp-lang-prefix {
          font-family: 'Space Mono', monospace;
          font-size: 0.55rem;
          color: rgba(34,197,94,0.25);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* Contact items */
        .cp-contacts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
        }
        @media(max-width:480px){ .cp-contacts { grid-template-columns: 1fr; } }

        .cp-contact-card {
          background: rgba(6,20,9,0.65);
          border: 1px solid rgba(34,197,94,0.08);
          border-radius: 18px;
          padding: 1.1rem 1.2rem;
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          transition: border-color 0.3s, transform 0.3s;
          position: relative;
          overflow: hidden;
        }
        .cp-contact-card:hover { border-color: rgba(74,222,128,0.18); transform: translateY(-2px); }
        .cp-contact-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(74,222,128,0.25), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .cp-contact-card:hover::before { opacity: 1; }

        .cp-c-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .cp-c-icon.moss { background: rgba(22,101,52,0.3); border: 1px solid rgba(34,197,94,0.18); color: #4ade80; }
        .cp-c-icon.teal { background: rgba(15,118,110,0.25); border: 1px solid rgba(45,212,191,0.18); color: #2dd4bf; }
        .cp-c-icon.sage { background: rgba(16,185,129,0.15); border: 1px solid rgba(110,231,183,0.18); color: #6ee7b7; }
        .cp-c-icon.amber { background: rgba(120,53,15,0.25); border: 1px solid rgba(251,191,36,0.18); color: #fbbf24; }

        .cp-c-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: #ecfdf5;
          margin-bottom: 3px;
        }
        .cp-c-line {
          font-family: 'Space Mono', monospace;
          font-size: 0.62rem;
          color: #374151;
          letter-spacing: 0.03em;
          line-height: 1.55;
        }

        /* ── Right column: Form ── */
        .cp-form-card {
          background: rgba(6,18,8,0.82);
          border: 1px solid rgba(34,197,94,0.1);
          border-radius: 26px;
          padding: 2.2rem 2rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 64px rgba(0,0,0,0.45);
        }
        .cp-form-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(74,222,128,0.45), rgba(45,212,191,0.25), transparent);
        }

        .cp-form-blob {
          position: absolute;
          top: -50px; right: -50px;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,197,94,0.07), transparent);
          pointer-events: none;
        }

        .cp-form-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.22em;
          color: rgba(74,222,128,0.35);
          text-transform: uppercase;
          margin-bottom: 0.45rem;
        }

        .cp-form-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.55rem;
          font-weight: 600;
          color: #ecfdf5;
          letter-spacing: -0.01em;
          margin-bottom: 1.6rem;
        }
        .cp-form-title em { color: #4ade80; font-style: italic; }

        /* Form fields */
        .cp-field { margin-bottom: 1rem; }
        .cp-label {
          display: block;
          font-family: 'Space Mono', monospace;
          font-size: 0.57rem;
          letter-spacing: 0.16em;
          color: rgba(74,222,128,0.38);
          text-transform: uppercase;
          margin-bottom: 0.38rem;
        }
        .cp-input, .cp-select, .cp-textarea {
          width: 100%;
          background: rgba(6,20,9,0.65);
          border: 1px solid rgba(34,197,94,0.1);
          border-radius: 12px;
          padding: 11px 14px;
          font-family: 'Syne', sans-serif;
          font-size: 0.82rem;
          color: #ecfdf5;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
        }
        .cp-input::placeholder, .cp-textarea::placeholder { color: rgba(74,222,128,0.18); }
        .cp-input:focus, .cp-select:focus, .cp-textarea:focus {
          border-color: rgba(74,222,128,0.25);
          box-shadow: 0 0 0 3px rgba(34,197,94,0.06);
        }
        .cp-select { cursor: pointer; color: rgba(187,247,208,0.6); }
        .cp-select option { background: #061409; color: #ecfdf5; }
        .cp-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }

        .cp-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }
        @media(max-width:480px){ .cp-row { grid-template-columns: 1fr; } }

        /* Submit button */
        .cp-submit {
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
          box-shadow: 0 4px 20px rgba(34,197,94,0.22);
          display: flex; align-items: center; justify-content: center; gap: 8px;
          position: relative;
          overflow: hidden;
          margin-top: 0.5rem;
        }
        .cp-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.08), transparent);
        }
        .cp-submit:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 6px 26px rgba(34,197,94,0.3); }
        .cp-submit:active { transform: translateY(0); }

        /* Success state */
        .cp-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2.5rem 1rem;
          gap: 0.75rem;
        }
        .cp-success-icon {
          width: 60px; height: 60px;
          border-radius: 20px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(74,222,128,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #4ade80;
          margin-bottom: 0.5rem;
        }
        .cp-success-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.45rem;
          font-style: italic;
          color: #ecfdf5;
        }
        .cp-success-sub {
          font-size: 0.8rem;
          color: #374151;
          line-height: 1.65;
          max-width: 280px;
        }
      `}</style>

      <main className="cp-root">
        <div className="cp-inner">
          <div className="cp-layout">

            {/* Left — contact info */}
            <div>
              <div className="cp-eyebrow">
                <div className="cp-eyebrow-dot" />
                Get In Touch
              </div>
              <h1 className="cp-title">
                Concierge <em>Contact</em>
              </h1>
              <p className="cp-sub">
                Schedule a personalised site visit or request a live 4K drone tour of your selected plots. Our concierges speak multiple languages.
              </p>

              {/* Language badges */}
              <div className="cp-langs">
                <span className="cp-lang-prefix">We speak:</span>
                {["English", "Tamil · தமிழ்", "Hindi · हिंदी"].map(l => (
                  <span key={l} className="cp-lang-badge">{l}</span>
                ))}
              </div>

              {/* Contact cards */}
              <div className="cp-contacts">
                {contactItems.map(({ icon: Icon, title, lines, accent }) => (
                  <div key={title} className="cp-contact-card">
                    <div className={`cp-c-icon ${accent}`}>
                      <Icon style={{ width: 16, height: 16 }} />
                    </div>
                    <div>
                      <div className="cp-c-title">{title}</div>
                      {lines.map((l, i) => (
                        <div key={i} className="cp-c-line">{l}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="cp-form-card">
              <div className="cp-form-blob" />
              {submitted ? (
                <div className="cp-success">
                  <div className="cp-success-icon">
                    <Send style={{ width: 26, height: 26 }} />
                  </div>
                  <div className="cp-success-title">Request Submitted</div>
                  <p className="cp-success-sub">
                    Our concierge team will reach out within 2 hours to confirm your drone tour schedule.
                  </p>
                </div>
              ) : (
                <>
                  <div className="cp-form-eyebrow">🌿 Schedule a visit</div>
                  <h2 className="cp-form-title">Request a <em>Drone Tour</em></h2>

                  <form onSubmit={handleSubmit}>
                    <div className="cp-field">
                      <label className="cp-label">Full Name</label>
                      <input
                        type="text"
                        className="cp-input"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="cp-row">
                      <div className="cp-field">
                        <label className="cp-label">Email Address</label>
                        <input
                          type="email"
                          className="cp-input"
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="cp-field">
                        <label className="cp-label">Phone Number</label>
                        <input
                          type="tel"
                          className="cp-input"
                          placeholder="+44 ..."
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="cp-field">
                      <label className="cp-label">Preferred Time (IST)</label>
                      <select
                        className="cp-select"
                        value={form.time}
                        onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                      >
                        <option>Morning (10 AM – 12 PM)</option>
                        <option>Afternoon (1 PM – 4 PM)</option>
                        <option>Evening (4 PM – 6 PM)</option>
                      </select>
                    </div>

                    <div className="cp-field">
                      <label className="cp-label">Message (Optional)</label>
                      <textarea
                        className="cp-textarea"
                        placeholder="Tell us about your interest or specific plot enquiry…"
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      />
                    </div>

                    <button type="submit" className="cp-submit">
                      <Send style={{ width: 15, height: 15 }} />
                      Submit Request
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </main>
    </>
  );
}