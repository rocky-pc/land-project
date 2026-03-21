"use client";

import { useEffect, useRef, useState } from "react";
import { TreePine, MapPin, Thermometer, Droplets, Ruler, Leaf, Wind, Sun } from "lucide-react";

/* ─────────────────────────────────────────
   Animated Counter Hook
───────────────────────────────────────── */
function useCounter(end: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

/* ─────────────────────────────────────────
   Intersection Observer Hook
───────────────────────────────────────── */
function useInView(threshold = 0.05) {
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
   Floating Leaves Background
───────────────────────────────────────── */
function FloatingLeaves() {
  const items = useRef(
    Array.from({ length: 18 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 12}s`,
      dur: `${10 + Math.random() * 14}s`,
      size: `${0.7 + Math.random() * 1.4}rem`,
      opacity: 0.12 + Math.random() * 0.18,
      icon: ["🍃", "🌿", "🍀", "🌱"][Math.floor(Math.random() * 4)],
    }))
  );
  return (
    <div className="leaves-container" aria-hidden="true">
      {items.current.map((it, i) => (
        <div key={i} className="leaf" style={{
          left: it.left, animationDelay: it.delay,
          animationDuration: it.dur, fontSize: it.size, opacity: it.opacity,
        }}>{it.icon}</div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Blob Background
───────────────────────────────────────── */
function BlobBackground() {
  return (
    <svg className="blob-bg" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="b1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#166534" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#166534" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="b2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f766e" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="b3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="150" rx="320" ry="280" fill="url(#b1)" style={{ animation: "morph 18s ease-in-out infinite alternate" }} />
      <ellipse cx="750" cy="400" rx="280" ry="240" fill="url(#b2)" style={{ animation: "morph 22s ease-in-out infinite alternate-reverse" }} />
      <ellipse cx="500" cy="500" rx="200" ry="180" fill="url(#b3)" style={{ animation: "morph 15s ease-in-out infinite alternate" }} />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Ambient Row
───────────────────────────────────────── */
function AmbientRow({ inView }: { inView: boolean }) {
  const temp = useCounter(26, 1200, inView);
  const humidity = useCounter(72, 1300, inView);
  const aqi = useCounter(18, 1100, inView);
  const items = [
    { icon: <Sun size={15} />, label: "Temperature", value: `${temp}°C`, cls: "chip-amber" },
    { icon: <Droplets size={15} />, label: "Humidity", value: `${humidity}%`, cls: "chip-teal" },
    { icon: <Wind size={15} />, label: "Air Quality", value: `${aqi} AQI`, cls: "chip-sage" },
    { icon: <Leaf size={15} />, label: "Green Cover", value: "84%", cls: "chip-moss" },
  ];
  return (
    <div className="amb-row">
      {items.map(({ icon, label, value, cls }) => (
        <div key={label} className="amb-card">
          <div className={`amb-chip ${cls}`}>{icon}</div>
          <div className="amb-val">{value}</div>
          <div className="amb-lbl">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Soil Card
───────────────────────────────────────── */
function SoilCard({ inView }: { inView: boolean }) {
  const ph = useCounter(68, 1800, inView);
  const n = useCounter(78, 1600, inView);
  const p = useCounter(62, 1700, inView);
  const k = useCounter(91, 1500, inView);
  return (
    <div className="cb">
      <div className="card-top">
        <div>
          <span className="chip chip-moss">🌱 Soil Analysis</span>
          <h3 className="ctitle">Soil Health</h3>
          <p className="cdesc">Optimal pH for luxury landscaping & organic farming. Rich in essential minerals.</p>
        </div>
        <div className="iring"><Thermometer className="ic" /></div>
      </div>
      {/* pH bar */}
      <div style={{ marginTop: "1rem" }}>
        <div className="ph-row">
          <span className="mono-s">ACIDIC 0</span>
          <span className="ph-badge">pH {(ph / 10).toFixed(1)}</span>
          <span className="mono-s">14 ALKALINE</span>
        </div>
        <div className="ph-track">
          <div className="ph-fill" style={{ width: inView ? `${(ph / 10 / 14) * 100}%` : "0%" }}>
            <div className="ph-shine" />
          </div>
          <div className="opt-zone" style={{ left: `${(6.5 / 14) * 100}%`, width: `${((7.5 - 6.5) / 14) * 100}%` }} />
          <div className="opt-lbl" style={{ left: `${(6.5 / 14) * 100}%` }}>Optimal</div>
        </div>
      </div>
      {/* NPK */}
      <div className="npk">
        {[["N", "Nitrogen", n], ["P", "Phosphorus", p], ["K", "Potassium", k]].map(([sym, lbl, val]) => (
          <div key={String(sym)} className="npk-item">
            <div className="npk-hd">
              <span className="npk-sym">{sym}</span>
              <span className="npk-lbl">{lbl}</span>
              <span className="npk-val">{val}%</span>
            </div>
            <div className="npk-track"><div className="npk-fill" style={{ width: inView ? `${val}%` : "0%" }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Water Card
───────────────────────────────────────── */
function WaterCard({ inView }: { inView: boolean }) {
  const depth = useCounter(120, 1500, inView);
  return (
    <div className="cb">
      <div className="ftop">
        <div>
          <span className="chip chip-teal">💧 Hydrology</span>
          <h3 className="ctitle">Water Table</h3>
        </div>
        <div className="iring iring-teal"><Droplets className="ic ic-teal" /></div>
      </div>
      <div className="wtank">
        <div className="wfill" style={{ height: inView ? "58%" : "0%" }}>
          <svg viewBox="0 0 300 40" className="wwave" preserveAspectRatio="none">
            <path className="wp1" d="M0,20 C75,5 150,35 225,20 S300,5 300,20 L300,40 L0,40 Z" fill="rgba(52,211,153,0.5)" />
            <path className="wp2" d="M0,25 C60,10 180,40 300,25 L300,40 L0,40 Z" fill="rgba(52,211,153,0.3)" />
          </svg>
          <div className="wbody" />
        </div>
        <div className="wcenter">
          <div className="wnum">{depth}<span className="wunit">ft</span></div>
          <div className="wsub">Sweet Water Depth</div>
        </div>
        {inView && [1, 2, 3].map(i => (
          <div key={i} className="bubble" style={{ left: `${20 + i * 22}%`, animationDelay: `${i * 0.6}s` }} />
        ))}
      </div>
      <p className="cdesc" style={{ marginTop: "0.6rem" }}>Rainwater harvesting integrated. Year-round supply assured.</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   Location Card
───────────────────────────────────────── */
function LocationCard({ inView }: { inView: boolean }) {
  return (
    <div className="cb">
      <div className="ftop">
        <div>
          <span className="chip chip-moss">📍 Connectivity</span>
          <h3 className="ctitle">Strategic Location</h3>
        </div>
        <div className="iring"><MapPin className="ic" /></div>
      </div>
      <div className="map-vis">
        <div className="forest-sil" aria-hidden="true">
          {["🌲", "🌳", "🌲", "🌳", "🌲"].map((t, i) => (
            <span key={i} className="tree-ic" style={{ fontSize: `${1.2 + (i % 3) * 0.35}rem`, animationDelay: `${i * 0.3}s` }}>{t}</span>
          ))}
        </div>
        <div className="pulse-wrap">
          {[1, 2, 3].map(i => (
            <div key={i} className="pring" style={{ animationDelay: `${i * 0.45}s`, opacity: inView ? 1 : 0 }}
              data-size={i} />
          ))}
          <div className="pin-dot"><MapPin size={13} className="ic" /></div>
        </div>
      </div>
      <div className="loc-grid">
        {[["✈️", "Airport", "25 min"], ["🚇", "Metro Hub", "10 min"]].map(([ic, lbl, val]) => (
          <div key={String(lbl)} className="loc-card">
            <span className="loc-ic">{ic}</span>
            <div>
              <div className="loc-lbl">{lbl}</div>
              <div className="loc-val">{val}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Survey Card
───────────────────────────────────────── */
function SurveyCard({ inView }: { inView: boolean }) {
  const area = useCounter(2400, 2000, inView);
  return (
    <div className="cb survey-cb">
      <div className="survey-left">
        <span className="chip chip-sage">📋 FMBC Certified</span>
        <h3 className="ctitle">Government Survey Data</h3>
        <p className="cdesc">Exact match with FMBC records. All documentation green-certified.</p>
        <div className="dim-row">
          {[["Width", "60 ft"], ["Depth", "40 ft"]].map(([l, v]) => (
            <div key={l} className="dim-box">
              <Ruler size={11} className="ic ic-sage" style={{ marginRight: 4 }} />
              <div>
                <div className="dim-lbl">{l}</div>
                <div className="dim-val">{v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="plot-vis">
        <svg className="pgrid-svg" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ng" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(74,222,128,0.1)" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="200" height="160" fill="url(#ng)" />
        </svg>
        <div className="plot-rect" style={{ width: inView ? "72%" : "10%", height: inView ? "65%" : "10%" }}>
          <div className="scan-beam" />
          <div className="plot-center">
            <TreePine size={18} className="ic" style={{ marginBottom: 3 }} />
            <div className="area-num">{area.toLocaleString()}</div>
            <div className="area-unit">sq.ft</div>
          </div>
          {["tl", "tr", "bl", "br"].map(c => <div key={c} className={`cm cm-${c}`} />)}
        </div>
        <div className="compass-n">N</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function AnalyticsPage() {
  const { ref, inView } = useInView(0.05);
  const [hv, setHv] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHv(true), 80); return () => clearTimeout(t); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Syne:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#020c04;font-family:'Syne',sans-serif;color:#d1fae5;min-height:100vh;overflow-x:hidden;}

        .root{
          position:relative;min-height:100vh;
          background:
            radial-gradient(ellipse 100% 50% at 20% 0%,rgba(21,128,61,0.12) 0%,transparent 60%),
            radial-gradient(ellipse 70% 60% at 80% 90%,rgba(15,118,110,0.08) 0%,transparent 60%),
            #020c04;
        }
        .root::before{
          content:'';position:fixed;inset:0;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events:none;z-index:0;opacity:0.45;
        }

        @keyframes morph{0%{rx:320;ry:280;}100%{rx:270;ry:340;}}
        .blob-bg{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;}

        .leaves-container{position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden;}
        .leaf{position:absolute;top:-60px;animation:leaffall linear infinite;filter:blur(0.5px);user-select:none;}
        @keyframes leaffall{
          0%{top:-60px;transform:translateX(0) rotate(0deg);}
          25%{transform:translateX(30px) rotate(90deg);}
          50%{transform:translateX(-20px) rotate(180deg);}
          75%{transform:translateX(40px) rotate(270deg);}
          100%{top:110vh;transform:translateX(-10px) rotate(360deg);}
        }

        .content{position:relative;z-index:2;max-width:1160px;margin:0 auto;padding:0 1.5rem;}

        /* Header */
        .hdr{padding:4.5rem 0 2.5rem;}
        .eyebrow{display:flex;align-items:center;gap:.5rem;font-family:'Space Mono',monospace;font-size:.58rem;
          letter-spacing:.3em;color:#4ade80;text-transform:uppercase;margin-bottom:1rem;
          opacity:0;transform:translateY(10px);transition:opacity .7s ease,transform .7s ease;}
        .eyebrow.v{opacity:1;transform:translateY(0);}
        .edot{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:blink 2s ease infinite;}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:.3;}}

        .h1{font-family:'Playfair Display',serif;font-size:clamp(3rem,7vw,5.8rem);font-weight:700;
          line-height:1;color:#ecfdf5;letter-spacing:-.03em;
          opacity:0;transform:translateY(24px);transition:opacity 1s ease .1s,transform 1s ease .1s;}
        .h1.v{opacity:1;transform:translateY(0);}
        .h1em{color:#4ade80;font-style:italic;}

        .hsub{font-size:.9rem;color:#c7c7c7ff;line-height:1.75;max-width:460px;margin-top:.9rem;
          opacity:0;transform:translateY(14px);transition:opacity .8s ease .25s,transform .8s ease .25s;}
        .hsub.v{opacity:1;transform:translateY(0);}

        .vine-wrap{display:flex;align-items:center;gap:.6rem;margin-top:2rem;
          opacity:0;transition:opacity 1s ease .4s;}
        .vine-wrap.v{opacity:1;}
        .vline{flex:1;height:1px;background:linear-gradient(90deg,#22c55e,#2dd4bf,transparent);}
        .vline-r{flex:1;height:1px;background:linear-gradient(90deg,transparent,#2dd4bf,#22c55e);}
        .vtxt{font-family:'Space Mono',monospace;font-size:.52rem;color:#15803d;letter-spacing:.2em;
          text-transform:uppercase;white-space:nowrap;}

        /* Ambient */
        .amb-row{display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem;margin-bottom:1.1rem;}
        @media(max-width:640px){.amb-row{grid-template-columns:repeat(2,1fr);}}
        .amb-card{background:rgba(6,20,9,.65);border:1px solid rgba(34,197,94,.08);border-radius:14px;
          padding:.9rem;display:flex;flex-direction:column;align-items:center;gap:.25rem;
          transition:border-color .3s,transform .3s;}
        .amb-card:hover{border-color:rgba(74,222,128,.22);transform:translateY(-2px);}
        .amb-chip{width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;}
        .chip-amber.amb-chip{background:rgba(120,53,15,.3);}
        .chip-teal.amb-chip{background:rgba(15,118,110,.25);}
        .chip-sage.amb-chip{background:rgba(16,185,129,.15);}
        .chip-moss.amb-chip{background:rgba(22,101,52,.3);}
        .amb-val{font-family:'Space Mono',monospace;font-size:1.05rem;font-weight:700;color:#ecfdf5;}
        .amb-lbl{font-size:.6rem;color:#374151;text-align:center;letter-spacing:.05em;text-transform:uppercase;}

        /* Bento */
        .bento{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem;padding-bottom:4rem;}
        @media(max-width:768px){.bento{grid-template-columns:1fr;}}
        .gc2{grid-column:span 2;}
        @media(max-width:768px){.gc2{grid-column:span 1;}}

        /* Card shell */
        .card-shell{position:relative;background:rgba(6,20,9,.78);border:1px solid rgba(34,197,94,.09);
          border-radius:22px;overflow:hidden;backdrop-filter:blur(24px);
          opacity:0;transform:translateY(28px) scale(.98);
          transition:opacity .65s ease,transform .65s ease,border-color .3s,box-shadow .3s;}
        .card-shell.in{opacity:1;transform:translateY(0) scale(1);}
        .card-shell:hover{border-color:rgba(74,222,128,.2);
          box-shadow:0 0 50px rgba(34,197,94,.07),0 24px 48px rgba(0,0,0,.5);
          transform:translateY(-4px) scale(1.005)!important;}
        .cshimmer{position:absolute;top:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,rgba(74,222,128,.45),transparent);
          opacity:0;transition:opacity .3s;}
        .card-shell:hover .cshimmer{opacity:1;}

        /* Card body */
        .cb{padding:1.6rem;min-height:200px;display:flex;flex-direction:column;}
        .card-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0;}
        .ftop{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.7rem;}

        /* Chip */
        .chip{display:inline-flex;align-items:center;gap:.3rem;padding:.2rem .65rem;border-radius:999px;
          font-family:'Space Mono',monospace;font-size:.56rem;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.5rem;}
        .chip-moss{background:rgba(22,101,52,.3);border:1px solid rgba(34,197,94,.2);color:#86efac;}
        .chip-teal{background:rgba(15,118,110,.25);border:1px solid rgba(45,212,191,.2);color:#2dd4bf;}
        .chip-sage{background:rgba(16,185,129,.15);border:1px solid rgba(110,231,183,.2);color:#6ee7b7;}
        .chip-amber{background:rgba(120,53,15,.25);border:1px solid rgba(251,191,36,.2);color:#fbbf24;}

        /* Icon ring */
        .iring{width:40px;height:40px;border-radius:12px;border:1px solid rgba(34,197,94,.18);
          background:rgba(34,197,94,.06);display:flex;align-items:center;justify-content:center;
          flex-shrink:0;transition:transform .3s,background .3s;}
        .card-shell:hover .iring{transform:rotate(8deg) scale(1.08);background:rgba(34,197,94,.1);}
        .iring-teal{border-color:rgba(45,212,191,.2);background:rgba(45,212,191,.06);}
        .ic{color:#4ade80;width:17px;height:17px;}
        .ic-teal{color:#2dd4bf;}
        .ic-sage{color:#6ee7b7;}

        .ctitle{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;
          color:#ecfdf5;line-height:1.15;letter-spacing:-.01em;}
        .cdesc{font-size:.8rem;color:#374151;line-height:1.7;margin-top:.3rem;}

        /* pH */
        .ph-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:.4rem;margin-top:.9rem;}
        .mono-s{font-family:'Space Mono',monospace;font-size:.55rem;color:#1f2937;letter-spacing:.06em;}
        .ph-badge{font-family:'Space Mono',monospace;font-size:.75rem;font-weight:700;color:#4ade80;
          background:rgba(74,222,128,.08);padding:.12rem .48rem;border-radius:999px;border:1px solid rgba(74,222,128,.18);}
        .ph-track{height:9px;background:rgba(20,83,45,.4);border-radius:999px;overflow:visible;position:relative;}
        .ph-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#15803d,#22c55e,#4ade80);
          transition:width 1.8s cubic-bezier(.22,1,.36,1);position:relative;overflow:hidden;}
        .ph-shine{position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.28) 50%,transparent);
          animation:shine 2.8s ease infinite;}
        @keyframes shine{0%{transform:translateX(-100%);}100%{transform:translateX(400%);}}
        .opt-zone{position:absolute;top:-3px;bottom:-3px;background:rgba(74,222,128,.12);
          border-left:1px dashed rgba(74,222,128,.28);border-right:1px dashed rgba(74,222,128,.28);border-radius:4px;}
        .opt-lbl{position:absolute;top:-17px;font-family:'Space Mono',monospace;font-size:.48rem;
          color:rgba(74,222,128,.45);letter-spacing:.1em;text-transform:uppercase;}

        /* NPK */
        .npk{display:flex;flex-direction:column;gap:.45rem;margin-top:.9rem;}
        .npk-item{}
        .npk-hd{display:flex;align-items:baseline;gap:.4rem;margin-bottom:.18rem;}
        .npk-sym{font-family:'Space Mono',monospace;font-size:.72rem;color:#4ade80;font-weight:700;width:13px;}
        .npk-lbl{font-size:.7rem;color:#374151;flex:1;}
        .npk-val{font-family:'Space Mono',monospace;font-size:.7rem;color:#86efac;}
        .npk-track{height:4px;background:rgba(20,83,45,.4);border-radius:999px;overflow:hidden;}
        .npk-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#15803d,#4ade80);
          transition:width 1.6s cubic-bezier(.22,1,.36,1);}

        /* Water */
        .wtank{flex:1;min-height:110px;border-radius:14px;overflow:hidden;
          border:1px solid rgba(45,212,191,.14);background:rgba(4,26,24,.6);
          position:relative;display:flex;align-items:center;justify-content:center;margin:.5rem 0;}
        .wfill{position:absolute;bottom:0;left:0;right:0;transition:height 1.5s cubic-bezier(.22,1,.36,1);}
        .wwave{position:absolute;top:-20px;width:100%;}
        .wp1{animation:wv1 4s ease-in-out infinite;}
        .wp2{animation:wv2 5.5s ease-in-out infinite;}
        @keyframes wv1{0%,100%{d:path("M0,20 C75,5 150,35 225,20 S300,5 300,20 L300,40 L0,40 Z");}50%{d:path("M0,20 C75,35 150,5 225,20 S300,35 300,20 L300,40 L0,40 Z");}}
        @keyframes wv2{0%,100%{d:path("M0,25 C60,10 180,40 300,25 L300,40 L0,40 Z");}50%{d:path("M0,25 C60,40 180,10 300,25 L300,40 L0,40 Z");}}
        .wbody{background:linear-gradient(to top,rgba(13,148,136,.5),rgba(45,212,191,.1));height:100%;}
        .wcenter{position:relative;z-index:2;text-align:center;}
        .wnum{font-family:'Space Mono',monospace;font-size:2.4rem;font-weight:700;color:#a7f3d0;line-height:1;}
        .wunit{font-size:.95rem;color:#2dd4bf;}
        .wsub{font-size:.6rem;color:rgba(45,212,191,.45);text-transform:uppercase;letter-spacing:.15em;margin-top:3px;}
        .bubble{position:absolute;width:5px;height:5px;border-radius:50%;background:rgba(45,212,191,.4);
          bottom:10%;animation:rise 3s ease-in-out infinite;}
        @keyframes rise{0%{bottom:10%;opacity:.6;transform:scale(1);}100%{bottom:90%;opacity:0;transform:scale(.4);}}

        /* Location */
        .map-vis{flex:1;min-height:88px;border-radius:14px;background:rgba(4,14,5,.55);
          border:1px solid rgba(34,197,94,.07);position:relative;display:flex;align-items:center;
          justify-content:center;overflow:hidden;margin:.5rem 0;}
        .forest-sil{position:absolute;bottom:0;left:0;right:0;display:flex;justify-content:center;gap:2px;padding-bottom:1px;line-height:1;}
        .tree-ic{animation:sway 4s ease-in-out infinite;display:inline-block;}
        @keyframes sway{0%,100%{transform:rotate(-2deg);}50%{transform:rotate(2deg);}}
        .pulse-wrap{position:relative;width:76px;height:76px;display:flex;align-items:center;justify-content:center;}
        .pring{position:absolute;border-radius:50%;border:1px solid rgba(34,197,94,.28);animation:pr 2.5s ease-out infinite;transition:opacity .5s;}
        .pring[data-size="1"]{width:76px;height:76px;}
        .pring[data-size="2"]{width:48px;height:48px;}
        .pring[data-size="3"]{width:26px;height:26px;border-color:rgba(34,197,94,.5);}
        @keyframes pr{0%{transform:scale(.9);opacity:.8;}100%{transform:scale(1.12);opacity:.15;}}
        .pin-dot{width:26px;height:26px;border-radius:50%;background:rgba(34,197,94,.14);
          border:1px solid rgba(74,222,128,.38);display:flex;align-items:center;justify-content:center;z-index:2;}
        .loc-grid{display:grid;grid-template-columns:1fr 1fr;gap:.55rem;}
        .loc-card{background:rgba(6,20,9,.7);border:1px solid rgba(34,197,94,.08);border-radius:11px;
          padding:.55rem .7rem;display:flex;align-items:center;gap:.45rem;transition:border-color .3s;}
        .loc-card:hover{border-color:rgba(74,222,128,.18);}
        .loc-ic{font-size:1.1rem;}
        .loc-lbl{font-size:.6rem;color:#374151;text-transform:uppercase;letter-spacing:.05em;}
        .loc-val{font-family:'Space Mono',monospace;font-size:.82rem;font-weight:700;color:#4ade80;}

        /* Survey */
        .survey-cb{flex-direction:row!important;gap:1.4rem;}
        @media(max-width:640px){.survey-cb{flex-direction:column!important;}}
        .survey-left{flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:.7rem;}
        .dim-row{display:flex;gap:.65rem;}
        .dim-box{flex:1;background:rgba(6,20,9,.6);border:1px solid rgba(34,197,94,.09);border-radius:11px;
          padding:.6rem .7rem;display:flex;align-items:center;gap:.35rem;}
        .dim-lbl{font-size:.58rem;color:#1f2937;text-transform:uppercase;letter-spacing:.1em;}
        .dim-val{font-family:'Space Mono',monospace;font-size:.95rem;font-weight:700;color:#6ee7b7;}
        .plot-vis{flex:1;border-radius:16px;border:1px solid rgba(34,197,94,.09);background:rgba(4,14,5,.55);
          min-height:130px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;}
        .pgrid-svg{position:absolute;inset:0;width:100%;height:100%;}
        .plot-rect{position:relative;border:1.5px solid rgba(74,222,128,.45);border-radius:8px;
          display:flex;align-items:center;justify-content:center;
          transition:width 1.8s cubic-bezier(.22,1,.36,1),height 1.8s cubic-bezier(.22,1,.36,1);
          box-shadow:0 0 28px rgba(34,197,94,.09),inset 0 0 18px rgba(34,197,94,.04);}
        .scan-beam{position:absolute;left:0;right:0;height:2px;
          background:linear-gradient(90deg,transparent,rgba(74,222,128,.75),transparent);
          animation:scan 2.2s ease-in-out infinite;box-shadow:0 0 7px rgba(74,222,128,.4);}
        @keyframes scan{0%{top:5%;}50%{top:90%;}100%{top:5%;}}
        .plot-center{text-align:center;z-index:1;}
        .area-num{font-family:'Space Mono',monospace;font-size:1.45rem;font-weight:700;color:#86efac;}
        .area-unit{font-size:.58rem;color:#374151;text-transform:uppercase;letter-spacing:.15em;}
        .cm{position:absolute;width:9px;height:9px;border-color:rgba(74,222,128,.65);border-style:solid;}
        .cm-tl{top:-1px;left:-1px;border-width:2px 0 0 2px;}
        .cm-tr{top:-1px;right:-1px;border-width:2px 2px 0 0;}
        .cm-bl{bottom:-1px;left:-1px;border-width:0 0 2px 2px;}
        .cm-br{bottom:-1px;right:-1px;border-width:0 2px 2px 0;}
        .compass-n{position:absolute;top:8px;right:10px;font-family:'Space Mono',monospace;
          font-size:.55rem;color:rgba(74,222,128,.35);letter-spacing:.1em;}

        /* Footer */
        .foot{display:flex;align-items:center;gap:.7rem;padding-bottom:3rem;
          font-family:'Space Mono',monospace;font-size:.58rem;color:#1f2937;letter-spacing:.12em;text-transform:uppercase;}
        .ldot{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:lpulse 2.2s ease infinite;}
        @keyframes lpulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,.4);opacity:1;}50%{box-shadow:0 0 0 5px rgba(34,197,94,0);opacity:.7;}}
        .fsep{color:#111827;}
      `}</style>

      <div className="root">
        <BlobBackground />
        <FloatingLeaves />

        <div className="content">
          {/* Header */}
          <header className="hdr">
            <div className={`eyebrow ${hv ? "v" : ""}`}>
              <div className="edot" />
              Real-time Environmental Dashboard
            </div>
            <h1 className={`h1 ${hv ? "v" : ""}`}>
              Plot <span className="h1em">Analytics</span>
            </h1>
            <p className={`hsub ${hv ? "v" : ""}`}>
              Live soil health, water intelligence & geographic data — crafted for those who honour the land.
            </p>
            <div className={`vine-wrap ${hv ? "v" : ""}`}>
              <div className="vline" />
              <span className="vtxt">🌿 &nbsp; Nature-First Intelligence &nbsp; 🌿</span>
              <div className="vline-r" />
            </div>
          </header>

          {/* Grid */}
          <div ref={ref}>
            <AmbientRow inView={inView} />
            <div className="bento">
              {/* Soil — col-span-2 */}
              <div className={`card-shell gc2 ${inView ? "in" : ""}`} style={{ transitionDelay: "0.05s" }}>
                <div className="cshimmer" />
                <SoilCard inView={inView} />
              </div>
              {/* Water */}
              <div className={`card-shell ${inView ? "in" : ""}`} style={{ transitionDelay: "0.15s" }}>
                <div className="cshimmer" />
                <WaterCard inView={inView} />
              </div>
              {/* Location */}
              <div className={`card-shell ${inView ? "in" : ""}`} style={{ transitionDelay: "0.28s" }}>
                <div className="cshimmer" />
                <LocationCard inView={inView} />
              </div>
              {/* Survey — col-span-2 */}
              <div className={`card-shell gc2 ${inView ? "in" : ""}`} style={{ transitionDelay: "0.4s" }}>
                <div className="cshimmer" />
                <SurveyCard inView={inView} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="foot">
            <div className="ldot" />
            <span>Live feed active</span>
            <span className="fsep">·</span>
            <span>Last sync: just now</span>
            <span className="fsep">·</span>
            <span>🌱 All systems healthy</span>
          </div>
        </div>
      </div>
    </>
  );
}