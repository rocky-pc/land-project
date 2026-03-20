import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/lib/auth-context";

/*
  Font setup — Syne (body) + Playfair Display (serif/headings) + Space Mono (labels)
  We load Syne and Space Mono via next/font as well for optimal performance.
*/
import { Syne, Space_Mono } from "next/font/google";

const syneFont = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const playfairFont = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ungal Nilam Ungal Kaiyil | Your Land in Your Hands",
  description:
    "High-end Eco-Luxury real estate plot project in Tamil Nadu. Live CCTV monitoring, soil analytics, and verified legal documents — for global NRI investors.",
  keywords: ["Tamil Nadu land", "NRI investment", "eco-luxury plots", "CCTV land monitoring"],
  openGraph: {
    title: "Ungal Nilam Ungal Kaiyil",
    description: "High-end Eco-Luxury real estate plot project in India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${syneFont.variable}
        ${playfairFont.variable}
        ${spaceMono.variable}
        antialiased dark
      `}
    >
      <body className="min-h-screen flex flex-col font-sans pt-[64px] bg-background text-foreground">
        {/* Floating leaves layer — purely decorative, rendered via JS for variety */}
        <FloatingLeavesLayer />

        <AuthProvider>
          <Navbar />
          <div className="relative z-10 flex-1 flex flex-col">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

/* ─────────────────────────────────────────
   Floating Leaves — decorative background layer
   Rendered server-side with fixed seed positions so no hydration mismatch.
───────────────────────────────────────── */
function FloatingLeavesLayer() {
  // Deterministic leaf configs (no Math.random — avoids hydration mismatch)
  const leaves = [
    { left: "5%",  delay: "0s",   dur: "14s",  size: "1.1rem", opacity: 0.14, icon: "🍃" },
    { left: "12%", delay: "2.3s", dur: "18s",  size: "0.85rem",opacity: 0.10, icon: "🌿" },
    { left: "22%", delay: "5.1s", dur: "12s",  size: "1.4rem", opacity: 0.16, icon: "🍀" },
    { left: "31%", delay: "1.0s", dur: "20s",  size: "0.7rem", opacity: 0.09, icon: "🌱" },
    { left: "40%", delay: "7.5s", dur: "15s",  size: "1.2rem", opacity: 0.13, icon: "🍃" },
    { left: "50%", delay: "3.2s", dur: "17s",  size: "0.9rem", opacity: 0.11, icon: "🌿" },
    { left: "61%", delay: "9.0s", dur: "13s",  size: "1.35rem",opacity: 0.15, icon: "🍀" },
    { left: "70%", delay: "0.8s", dur: "22s",  size: "0.75rem",opacity: 0.08, icon: "🌱" },
    { left: "79%", delay: "4.6s", dur: "16s",  size: "1.0rem", opacity: 0.12, icon: "🍃" },
    { left: "88%", delay: "6.4s", dur: "19s",  size: "1.25rem",opacity: 0.13, icon: "🌿" },
    { left: "95%", delay: "11s",  dur: "14s",  size: "0.8rem", opacity: 0.09, icon: "🍀" },
    { left: "17%", delay: "13s",  dur: "21s",  size: "1.1rem", opacity: 0.11, icon: "🌱" },
    { left: "55%", delay: "15s",  dur: "12s",  size: "1.3rem", opacity: 0.14, icon: "🍃" },
    { left: "44%", delay: "8.2s", dur: "24s",  size: "0.65rem",opacity: 0.08, icon: "🌿" },
    { left: "83%", delay: "2.8s", dur: "18s",  size: "1.15rem",opacity: 0.12, icon: "🍀" },
    { left: "7%",  delay: "16s",  dur: "15s",  size: "0.9rem", opacity: 0.10, icon: "🌱" },
    { left: "65%", delay: "10s",  dur: "20s",  size: "1.0rem", opacity: 0.13, icon: "🍃" },
    { left: "28%", delay: "12s",  dur: "16s",  size: "1.2rem", opacity: 0.11, icon: "🌿" },
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {leaves.map((leaf, i) => (
        <span
          key={i}
          className="leaf-float"
          style={{
            position: "absolute",
            top: "-60px",
            left: leaf.left,
            fontSize: leaf.size,
            opacity: leaf.opacity,
            animationDelay: leaf.delay,
            animationDuration: leaf.dur,
            filter: "blur(0.4px)",
          }}
        >
          {leaf.icon}
        </span>
      ))}
    </div>
  );
}