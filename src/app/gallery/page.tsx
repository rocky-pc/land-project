export default function GalleryPage() {
  const videos = [
    { id: 1, src: "/videos/landscape/VID-20260320-WA0015.mp4", alt: "Landscape view" },
    { id: 2, src: "/videos/portrait/VID-20260320-WA0017.mp4", alt: "Portrait view" },
    { id: 3, src: "/videos/portrait/VID-20260320-WA0023.mp4", alt: "Portrait view" },
    { id: 4, src: "/videos/square/VID-20260320-WA0006.mp4", alt: "Square view" },
    { id: 5, src: "/videos/square/VID-20260320-WA0007.mp4", alt: "Square view" },
    { id: 6, src: "/videos/square/VID-20260320-WA0014.mp4", alt: "Square view" },
    { id: 7, src: "/videos/square/VID-20260320-WA0016.mp4", alt: "Square view" },
    { id: 8, src: "/videos/square/VID-20260320-WA0018.mp4", alt: "Square view" },
    { id: 9, src: "/videos/square/VID-20260320-WA0019.mp4", alt: "Square view" },
    { id: 10, src: "/videos/square/VID-20260320-WA0020.mp4", alt: "Square view" },
    { id: 11, src: "/videos/square/VID-20260320-WA0021.mp4", alt: "Square view" },
    { id: 12, src: "/videos/square/VID-20260320-WA0022.mp4", alt: "Square view" },
    { id: 13, src: "/videos/square/VID-20260320-WA0024.mp4", alt: "Square view" },
    { id: 14, src: "/videos/square/VID-20260320-WA0025.mp4", alt: "Square view" }
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
          color: #c7c7c7ff;
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

        /* Video grid */
        .video-grid {
          display: grid;
          gap: 1.5rem;
          margin-bottom: 3rem;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
        .video-card {
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(34,197,94,0.12);
          backdrop-filter: blur(8px);
          background: rgba(6,20,9,0.4);
          height: 200px;
        }
        .video-card video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #000;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .video-grid {
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

          <section>
            <h2 className="section-title">Video Gallery</h2>
            <div className="video-grid">
              {videos.map((video) => (
                <div key={video.id} className="video-card">
                  <video src={video.src} controls playsInline aria-label={video.alt} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}