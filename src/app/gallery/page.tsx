import Image from "next/image";

export default function GalleryPage() {
  const landscapeImages = [
    { id: 1, src: "/images/landscape/IMG-20260320-WA0003.jpg", alt: "Landscape view 1" },
    { id: 2, src: "/images/landscape/IMG-20260320-WA0004.jpg", alt: "Landscape view 2" },
    { id: 3, src: "/images/landscape/IMG-20260320-WA0009.jpg", alt: "Landscape view 3" },
    { id: 4, src: "/images/landscape/IMG-20260320-WA0012.jpg", alt: "Landscape view 4" },
  ];

  const portraitImages = [
    { id: 1, src: "/images/portrait/IMG-20260320-WA0005.jpg", alt: "Portrait view 1" },
    { id: 2, src: "/images/portrait/IMG-20260320-WA0011.jpg", alt: "Portrait view 2" },
    { id: 3, src: "/images/portrait/IMG-20260320-WA0013.jpg", alt: "Portrait view 3" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=Syne:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .gallery-root {
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
        .gallery-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
        }

        .gallery-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Header ── */
        .gallery-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        @media(min-width:768px){
          .gallery-header { flex-direction: row; align-items: flex-end; justify-content: space-between; }
        }

        .gallery-eyebrow {
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
        .gallery-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 7px rgba(34,197,94,0.7);
          animation: gallery-blink 2s ease infinite;
        }
        @keyframes gallery-blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }

        .gallery-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 700;
          color: #ecfdf5;
          letter-spacing: -0.025em;
          line-height: 1.05;
        }
        .gallery-title em { color: #4ade80; font-style: italic; }

        .gallery-sub {
          font-size: 0.88rem;
          color: #374151;
          margin-top: 0.5rem;
          line-height: 1.65;
          max-width: 420px;
        }

        /* Section title */
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 700;
          color: #ecfdf5;
          letter-spacing: -0.02em;
          margin: 2.5rem 0 1.5rem;
          position: relative;
          display: inline-block;
        }
        .section-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 50px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #4ade80, transparent);
        }

        /* Image grid */
        .image-grid {
          display: grid;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .landscape-grid { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
        .portrait-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }

        .image-card {
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(34,197,94,0.12);
          backdrop-filter: blur(8px);
          background: rgba(6,20,9,0.4);
          transition: transform 0.3s, border-color 0.3s;
        }
        .image-card:hover {
          transform: translateY(-4px);
          border-color: rgba(74,222,128,0.25);
        }

        .image-card img {
          width: 100%;
          height: auto;
          display: block;
          aspect-ratio: attr(width) / attr(height);
          object-fit: cover;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .landscape-grid, .portrait-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main className="gallery-root">
        <div className="gallery-inner">
          <header className="gallery-header">
            <div>
              <div className="gallery-eyebrow">
                <div className="gallery-eyebrow-dot" />
                Land Gallery · Visual Survey
              </div>
              <h1 className="gallery-title">
                Land <em>Imagery</em> Archive
              </h1>
              <p className="gallery-sub">
                Captured visual documentation of the surveyed terrain, showcasing topographical features and land characteristics.
              </p>
            </div>
          </header>

          {/* Landscape Images Section */}
          <section>
            <h2 className="section-title">Landscape Views</h2>
            <div className="image-grid landscape-grid">
              {landscapeImages.map((img) => (
                <div key={img.id} className="image-card">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Portrait Images Section */}
          <section>
            <h2 className="section-title">Portrait Views</h2>
            <div className="image-grid portrait-grid">
              {portraitImages.map((img) => (
                <div key={img.id} className="image-card">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 240px"
                    priority
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}