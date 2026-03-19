"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Banknote, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-1 w-full bg-background relative selection:bg-primary selection:text-primary-foreground min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
        <div className="absolute inset-0 bg-secondary/30 backdrop-blur-[100px] z-[-1]" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 text-sm font-medium text-foreground/80 mb-6 glass">
              <span className="flex h-2 w-2 rounded-full bg-primary" />
              Premium Plots Available Now
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground max-w-5xl mb-6">
              உங்கள் நிலம் <br />
              <span className="text-primary italic font-light mt-2 block">உங்கள் கையில்</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
              Your Land in Your Hands. High-end Eco-Luxury real estate plot project providing security and analytics from anywhere in the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/analytics">
                <Button size="lg" className="rounded-full h-14 px-8 text-lg w-full sm:w-auto">
                  View Land Analytics
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg w-full sm:w-auto bg-transparent border-primary/20 hover:bg-primary/5">
                  Request Drone Tour
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6 border-t border-border/50 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">Invest with Confidence</h2>
            <p className="text-lg text-muted-foreground">Seamless transactions for international investors.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TrustCard 
              icon={<Globe className="size-8 text-primary" />}
              title="Global Investors"
              desc="Optimized for NRI and international buyers with verified documents."
            />
            <TrustCard 
              icon={<Banknote className="size-8 text-primary" />}
              title="Forex Advantage"
              desc="Current Rates: 1 GBP ≈ ₹105 | 1 USD ≈ ₹83. Capitalize on exchange."
            />
            <TrustCard 
              icon={<ShieldCheck className="size-8 text-primary" />}
              title="Government Surveyed"
              desc="100% legal clearance with live CCTV monitoring of your plot."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function TrustCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass-lg p-8 rounded-[2rem] flex flex-col items-center text-center space-y-4 hover:-translate-y-1 transition-transform duration-300">
      <div className="p-4 bg-background rounded-full shadow-sm mb-2 text-primary">
        {icon}
      </div>
      <h3 className="font-serif text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  );
}
