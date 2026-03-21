"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Banknote, Globe, Leaf, TreePine, MapPin, Eye } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

/* ─────────────────────────────────────────
   Animated counter
───────────────────────────────────────── */
function useCounter(end: number, duration = 1800, trigger = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let t: number | null = null;
    const step = (ts: number) => {
      if (!t) t = ts;
      const p = Math.min((ts - t) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, trigger]);
  return val;
}

/* ─────────────────────────────────────────
   Intersection observer
───────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────
   Trust card
───────────────────────────────────────── */
function TrustCard({
  icon, title, desc, delay, accent,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
  accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="trust-card"
    >
      <div className={`tc-icon ${accent}`}>{icon}</div>
      <h3 className="tc-title">{title}</h3>
      <p className="tc-desc">{desc}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Stat pill
───────────────────────────────────────── */
function StatPill({
  value, suffix, label, delay, inView,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  inView: boolean;
}) {
  const count = useCounter(value, 1600, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="stat-pill"
    >
      <div className="stat-val">{count}{suffix}</div>
      <div className="stat-lbl">{label}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Feature row item
───────────────────────────────────────── */
function FeatureItem({
  icon, title, desc, href, delay,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={href} className="feature-item">
        <div className="fi-icon">{icon}</div>
        <div className="fi-body">
          <div className="fi-title">{title}</div>
          <div className="fi-desc">{desc}</div>
        </div>
        <ArrowRight className="fi-arrow" />
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const statsSection = useInView(0.2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,700&family=Syne:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Hero ── */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 6rem 1.5rem 5rem;
        }

        /* Big ambient blobs behind hero */
        .hero-blob-1 {
          position: absolute;
          top: -180px; left: -120px;
          width: 700px; height: 600px;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          background: radial-gradient(circle at 40% 40%, rgba(21,128,61,0.18), transparent 70%);
          animation: blob-morph 20s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 0;
        }
        .hero-blob-2 {
          position: absolute;
          bottom: -100px; right: -80px;
          width: 500px; height: 450px;
          border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          background: radial-gradient(circle at 60% 60%, rgba(15,118,110,0.12), transparent 70%);
          animation: blob-morph 25s ease-in-out infinite alternate-reverse;
          pointer-events: none;
          z-index: 0;
        }
        @keyframes blob-morph {
          0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }

        /* Topographic grid overlay */
        .hero-topo {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.03;
          background-image:
            repeating-linear-gradient(0deg, rgba(74,222,128,1) 0px, rgba(74,222,128,1) 1px, transparent 1px, transparent 48px),
            repeating-linear-gradient(90deg, rgba(74,222,128,1) 0px, rgba(74,222,128,1) 1px, transparent 1px, transparent 48px);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Eyebrow badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 16px;
          border-radius: 999px;
          background: rgba(6,20,9,0.7);
          border: 1px solid rgba(34,197,94,0.16);
          backdrop-filter: blur(12px);
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: rgba(74,222,128,0.6);
          text-transform: uppercase;
          margin-bottom: 1.6rem;
        }
        .hero-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 7px rgba(34,197,94,0.7);
          animation: hb-blink 2s ease infinite;
        }
        @keyframes hb-blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

         /* Main title */
         .hero-title {
           font-family: 'Playfair Display', serif;
           font-size: clamp(3rem, 9vw, 7.5rem);
           font-weight: 700;
           color: #ecfdf5;
           line-height: 1.0;
           letter-spacing: -0.035em;
           margin-bottom: 0.4rem;
         }
         .hero-title-tamil {
           font-family: 'Playfair Display', serif;
           font-size: clamp(2.5rem, 7vw, 6rem);
           font-weight: 700;
           color: #ecfdf5;
           line-height: 1.2;
           letter-spacing: -0.02em;
           text-align: center;
           display: block;
           margin-bottom: 0.2rem;
         }
        .hero-title-em {
          display: block;
          font-style: italic;
          font-weight: 500;
          color: #4ade80;
          font-size: 0.88em;
          margin-top: 0.1em;
        }
        .hero-title-ta {
          display: block;
          font-size: clamp(2rem, 6vw, 5rem);
          font-weight: 600;
          color: rgba(187,247,208,0.6);
          margin-top: 0.15em;
          letter-spacing: -0.02em;
        }

        /* Subtitle */
        .hero-sub {
          font-family: 'Syne', sans-serif;
          font-size: clamp(0.88rem, 1.8vw, 1.1rem);
          color: #f8fafc;
          line-height: 1.75;
          max-width: 560px;
          margin: 1.6rem auto 2.4rem;
        }

        /* CTA buttons */
        .hero-ctas {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: center;
        }
        @media(min-width:480px){
          .hero-ctas { flex-direction: row; }
        }

        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.85rem 2rem;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, #15803d, #22c55e);
          color: #ecfdf5;
          font-family: 'Syne', sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 22px rgba(34,197,94,0.25);
          position: relative;
          overflow: hidden;
        }
        .cta-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.08), transparent);
        }
        .cta-primary:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(34,197,94,0.35); }

        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.85rem 2rem;
          border-radius: 999px;
          border: 1px solid rgba(74,222,128,0.2);
          background: rgba(34,197,94,0.05);
          color: rgba(74,222,128,0.7);
          font-family: 'Syne', sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .cta-secondary:hover {
          background: rgba(34,197,94,0.1);
          border-color: rgba(74,222,128,0.35);
          color: #4ade80;
          transform: translateY(-2px);
        }

        /* Scroll indicator */
        .scroll-hint {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 2;
        }
        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(74,222,128,0.4), transparent);
          animation: scroll-drop 2s ease-in-out infinite;
        }
        @keyframes scroll-drop {
          0%,100% { transform: scaleY(1); opacity: 0.6; }
          50% { transform: scaleY(0.5); opacity: 0.2; }
        }
        .scroll-txt {
          font-family: 'Space Mono', monospace;
          font-size: 0.48rem;
          letter-spacing: 0.2em;
          color: rgba(74,222,128,0.25);
          text-transform: uppercase;
        }

        /* ── Stats band ── */
        .stats-band {
          background: rgba(6,18,8,0.7);
          border-top: 1px solid rgba(34,197,94,0.07);
          border-bottom: 1px solid rgba(34,197,94,0.07);
          backdrop-filter: blur(20px);
          padding: 2rem 1.5rem;
        }
        .stats-inner {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        @media(min-width:640px){
          .stats-inner { grid-template-columns: repeat(4, 1fr); }
        }

        .stat-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 1rem;
          background: rgba(6,20,9,0.5);
          border: 1px solid rgba(34,197,94,0.07);
          border-radius: 16px;
          transition: border-color 0.3s;
        }
        .stat-pill:hover { border-color: rgba(74,222,128,0.15); }
        .stat-val {
          font-family: 'Space Mono', monospace;
          font-size: 1.7rem;
          font-weight: 700;
          color: #4ade80;
          line-height: 1;
        }
        .stat-lbl {
          font-family: 'Syne', sans-serif;
          font-size: 0.65rem;
          color: #b9b9b9ff;
          text-align: center;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* ── Trust section ── */
        .trust-section {
          padding: 5rem 1.5rem;
          position: relative;
        }
        .trust-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .section-eyebrow {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'Space Mono', monospace;
          font-size: 0.56rem;
          letter-spacing: 0.26em;
          color: rgba(74,222,128,0.38);
          text-transform: uppercase;
          margin-bottom: 0.65rem;
          justify-content: center;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.9rem, 4vw, 3.2rem);
          font-weight: 700;
          color: #ecfdf5;
          text-align: center;
          letter-spacing: -0.025em;
          line-height: 1.05;
          margin-bottom: 0.65rem;
        }
        .section-title em { color: #4ade80; font-style: italic; }
        .section-sub {
          font-family: 'Syne', sans-serif;
          font-size: 0.88rem;
          color: #b9b9b9ff;
          text-align: center;
          margin-bottom: 3rem;
          line-height: 1.65;
        }

        /* Vine divider */
        .vine-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin: 0 auto 3rem;
          max-width: 600px;
        }
        .vine-l {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(34,197,94,0.25));
        }
        .vine-r {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(34,197,94,0.25), transparent);
        }
        .vine-txt {
          font-family: 'Space Mono', monospace;
          font-size: 0.5rem;
          color: rgba(34,197,94,0.2);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* Trust cards grid */
        .trust-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media(min-width:640px){ .trust-grid { grid-template-columns: repeat(3, 1fr); } }

        .trust-card {
          background: rgba(6,18,8,0.78);
          border: 1px solid rgba(34,197,94,0.09);
          border-radius: 22px;
          padding: 2rem 1.6rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.85rem;
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .trust-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(74,222,128,0.35), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .trust-card:hover {
          border-color: rgba(74,222,128,0.2);
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(34,197,94,0.05);
        }
        .trust-card:hover::before { opacity: 1; }

        .tc-icon {
          width: 56px; height: 56px;
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .tc-icon.moss { background: rgba(22,101,52,0.28); border: 1px solid rgba(34,197,94,0.2); color: #4ade80; }
        .tc-icon.teal { background: rgba(15,118,110,0.22); border: 1px solid rgba(45,212,191,0.18); color: #2dd4bf; }
        .tc-icon.sage { background: rgba(16,185,129,0.14); border: 1px solid rgba(110,231,183,0.16); color: #6ee7b7; }

        .tc-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #ecfdf5;
          letter-spacing: -0.01em;
        }
        .tc-desc {
          font-family: 'Syne', sans-serif;
          font-size: 0.82rem;
          color: #b9b9b9ff;
          line-height: 1.7;
        }

        /* ── Features section ── */
        .features-section {
          padding: 5rem 1.5rem;
          background: rgba(6,18,8,0.4);
          border-top: 1px solid rgba(34,197,94,0.06);
        }
        .features-inner {
          max-width: 860px;
          margin: 0 auto;
        }
        .features-grid {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          padding: 1.2rem 1.4rem;
          background: rgba(6,20,9,0.65);
          border: 1px solid rgba(34,197,94,0.08);
          border-radius: 18px;
          text-decoration: none;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
          position: relative;
          overflow: hidden;
        }
        .feature-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(74,222,128,0.3), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .feature-item:hover {
          border-color: rgba(74,222,128,0.18);
          background: rgba(34,197,94,0.04);
          transform: translateX(4px);
        }
        .feature-item:hover::before { opacity: 1; }

        .fi-icon {
          width: 44px; height: 44px;
          border-radius: 13px;
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.14);
          display: flex; align-items: center; justify-content: center;
          color: #4ade80;
          flex-shrink: 0;
          transition: transform 0.25s, background 0.25s;
        }
        .feature-item:hover .fi-icon {
          transform: rotate(6deg) scale(1.06);
          background: rgba(34,197,94,0.12);
        }
        .fi-body { flex: 1; }
        .fi-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #ecfdf5;
          margin-bottom: 2px;
        }
        .fi-desc {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          color: #b9b9b9ff;
          line-height: 1.5;
        }
        .fi-arrow {
          width: 16px; height: 16px;
          color: rgba(74,222,128,0.25);
          flex-shrink: 0;
          transition: color 0.2s, transform 0.2s;
        }
        .feature-item:hover .fi-arrow {
          color: #4ade80;
          transform: translateX(3px);
        }

        /* ── Forex band ── */
        .forex-band {
          padding: 2.5rem 1.5rem;
          background: rgba(6,18,8,0.6);
          border-top: 1px solid rgba(34,197,94,0.07);
          border-bottom: 1px solid rgba(34,197,94,0.07);
        }
        .forex-inner {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: flex-start;
        }
        @media(min-width:640px){
          .forex-inner { flex-direction: row; align-items: center; justify-content: space-between; }
        }
        .forex-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          color: rgba(74,222,128,0.35);
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .forex-rates {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .forex-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(6,20,9,0.65);
          border: 1px solid rgba(34,197,94,0.1);
          border-radius: 999px;
          padding: 6px 14px;
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          color: rgba(187,247,208,0.65);
          letter-spacing: 0.05em;
          transition: border-color 0.3s;
        }
        .forex-pill:hover { border-color: rgba(74,222,128,0.22); }
        .forex-pill-em { color: #4ade80; font-weight: 700; }

        .forex-cta-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: right;
        }
        @media(max-width:639px){ .forex-cta-wrap { text-align: left; } }
        .forex-cta-note {
          font-family: 'Space Mono', monospace;
          font-size: 0.55rem;
          color: rgba(34,197,94,0.22);
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* ── Footer strip ── */
        .home-footer {
          padding: 2rem 1.5rem 3rem;
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          color: #b9b9b9ff;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .hf-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 7px rgba(34,197,94,0.6);
          animation: hb-blink 2.2s ease infinite;
          flex-shrink: 0;
        }
        .hf-sep { color: #111827; }
      `}</style>

      <main style={{ position: "relative", zIndex: 2 }}>

        {/* ── Hero ── */}
        <section className="hero-section" ref={heroRef}>
          <div className="hero-blob-1" />
          <div className="hero-blob-2" />
          <div className="hero-topo" />

          <motion.div
            className="hero-content"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            {/* Badge */}
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="hero-badge-dot" />
              Premium Eco-Luxury Plots · Tamil Nadu
            </motion.div>

            {/* Title */}
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
             >
               <div className="hero-title-tamil">
                 உங்கள் நிலம்<br />
                 உங்கள் கையில்
               </div>
               <em className="hero-title-em">Ungal Nilam Ungal Kaiyil</em>
              {/* <span className="hero-title-ta">உங்கள் கையில்</span> */}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
            >
              High-end Eco-Luxury real estate plots providing live CCTV monitoring, soil analytics, and verified legal documents — accessible from anywhere in the world.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
            >
              <Link href="/analytics" className="cta-primary">
                View Land Analytics
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
              <Link href="/contact" className="cta-secondary">
                Request Drone Tour
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <div className="scroll-hint">
            <div className="scroll-line" />
            <span className="scroll-txt">Scroll</span>
          </div>
        </section>

        {/* ── Stats band ── */}
        <div className="stats-band" ref={statsSection.ref}>
          <div className="stats-inner">
            <StatPill value={35}  suffix="+"   label="Districts Covered"  delay={0.05} inView={statsSection.inView} />
            <StatPill value={100} suffix="%"   label="Legal Clearance"    delay={0.12} inView={statsSection.inView} />
            <StatPill value={24}  suffix="/7"  label="Live CCTV Uptime"   delay={0.19} inView={statsSection.inView} />
            <StatPill value={3}   suffix="X"   label="Forex Advantage"    delay={0.26} inView={statsSection.inView} />
          </div>
        </div>

        {/* ── Trust section ── */}
        <section className="trust-section">
          <div className="trust-inner">
            <div className="section-eyebrow">
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.65)", animation: "hb-blink 2s ease infinite" }} />
              Built for Global Investors
            </div>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Invest with <em>Confidence</em>
            </motion.h2>
            <motion.p
              className="section-sub"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Seamless transactions for NRI and international investors. Every plot government-surveyed and FMBC-verified.
            </motion.p>

            <div className="vine-wrap">
              <div className="vine-l" />
              <span className="vine-txt">🌿 Nature-First Investment</span>
              <div className="vine-r" />
            </div>

            <div className="trust-grid">
              <TrustCard
                icon={<Globe style={{ width: 22, height: 22 }} />}
                title="Global Investors"
                desc="Optimised for NRI and international buyers with fully verified, FEMA-compliant documents ready for due diligence."
                delay={0.05}
                accent="moss"
              />
              <TrustCard
                icon={<Banknote style={{ width: 22, height: 22 }} />}
                title="Forex Advantage"
                desc="Current rates: 1 GBP ≈ ₹105 · 1 USD ≈ ₹83. Capitalise on the exchange rate and invest significantly below UK/US land prices."
                delay={0.15}
                accent="teal"
              />
              <TrustCard
                icon={<ShieldCheck style={{ width: 22, height: 22 }} />}
                title="Government Surveyed"
                desc="100% legal clearance with live CCTV monitoring, soil analytics, and real-time GPS boundaries — all from your phone."
                delay={0.25}
                accent="sage"
              />
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="features-section">
          <div className="features-inner">
            <div className="section-eyebrow" style={{ justifyContent: "flex-start", marginBottom: "0.6rem" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", flexShrink: 0, boxShadow: "0 0 6px rgba(34,197,94,0.65)" }} />
              Explore the Platform
            </div>
            <motion.h2
              className="section-title"
              style={{ textAlign: "left", marginBottom: "0.5rem" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              Everything you <em>need</em>
            </motion.h2>
            <p className="section-sub" style={{ textAlign: "left", marginBottom: "2rem" }}>
              From live surveillance to legal documents — manage your land from anywhere in the world.
            </p>

            <div className="features-grid">
              <FeatureItem
                icon={<Eye style={{ width: 18, height: 18 }} />}
                title="Live CCTV Dashboard"
                desc="Real-time video feeds of your plot streamed globally. End-to-end encrypted."
                href="/cctv"
                delay={0.05}
              />
              <FeatureItem
                icon={<Leaf style={{ width: 18, height: 18 }} />}
                title="Plot Analytics"
                desc="Soil health, water table, government survey data and ambient environment metrics."
                href="/analytics"
                delay={0.13}
              />
              <FeatureItem
                icon={<MapPin style={{ width: 18, height: 18 }} />}
                title="Investor Portal"
                desc="Secure vault with Patta, EC, FMB Sketch and Legal Opinion — ready for download."
                href="/portal"
                delay={0.21}
              />
              <FeatureItem
                icon={<TreePine style={{ width: 18, height: 18 }} />}
                title="Request a Drone Tour"
                desc="4K live drone walkthrough of your selected plot. Book with our Tamil-speaking concierge."
                href="/contact"
                delay={0.29}
              />
            </div>
          </div>
        </section>

        {/* ── Forex band ── */}
        <div className="forex-band">
          <div className="forex-inner">
            <div>
              <div className="forex-label">💱 Live Exchange Rates</div>
              <div className="forex-rates">
                {[
                  { flag: "🇬🇧", pair: "1 GBP", value: "≈ ₹105" },
                  { flag: "🇺🇸", pair: "1 USD", value: "≈ ₹83" },
                  { flag: "🇦🇪", pair: "1 AED", value: "≈ ₹23" },
                ].map(r => (
                  <div key={r.pair} className="forex-pill">
                    <span>{r.flag}</span>
                    <span>{r.pair}</span>
                    <span className="forex-pill-em">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="forex-cta-wrap">
              <div className="forex-cta-note">Tamil Nadu land prices 6-10× lower than UK equivalents</div>
              <Link href="/contact" className="cta-primary" style={{ fontSize: "0.78rem", padding: "0.65rem 1.4rem", marginTop: "0.5rem", display: "inline-flex" }}>
                Talk to Concierge
                <ArrowRight style={{ width: 14, height: 14 }} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Footer strip ── */}
        <div className="home-footer">
          <div className="hf-dot" />
          <span>Ungal Nilam Ungal Kaiyil</span>
          <span className="hf-sep">·</span>
          <span>Tamil Nadu · India</span>
          <span className="hf-sep">·</span>
          <span>🌿 Eco-Luxury Land</span>
        </div>

      </main>
    </>
  );
}