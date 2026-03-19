"use client";

import { useState } from "react";
import { Activity, Clock, Sun, CloudRain, ShieldCheck, Disc2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CCTVPage() {
  const [isLive, setIsLive] = useState(true);

  return (
    <main className="flex-1 w-full bg-background px-6 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3 flex items-center gap-3">
              Live CCTV Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">Real-time surveillance of your plot, straight to your hands.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="glass px-6 py-3 rounded-full flex items-center gap-3 font-medium">
              <Sun className="size-5 text-amber-500" />
              <span>32°C / Sunny</span>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden glass-lg shadow-2xl mb-8 group">
          <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
            {/* Placeholder Image/Video bg */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590483736622-398541c4a179?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-luminosity filter blur-xs" />
          </div>

          {/* Overlays */}
          <div className="absolute top-6 left-6 flex items-center gap-4">
            {isLive ? (
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="font-semibold tracking-wider text-sm uppercase">Live</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10">
                <Clock className="size-4" />
                <span className="font-semibold tracking-wider text-sm">Timelapse</span>
              </div>
            )}
            <div className="hidden md:flex items-center gap-2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10 text-xs font-mono">
              <Disc2 className="size-3 animate-spin duration-3000" /> REC
            </div>
          </div>

          <div className="absolute top-6 right-6 hidden md:flex flex-col items-end gap-2 text-white/80 font-mono text-xs bg-black/40 p-3 rounded-xl backdrop-blur-sm border border-white/10">
            <div>CAM-03 (NORTH EAST)</div>
            <div>BITRATE: 4.2 MBPS</div>
            <div>FPS: 29.97</div>
            <div>2026-03-19 16:34:36 IST</div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 transition-opacity opacity-0 group-hover:opacity-100">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-full hover:bg-white/20 hover:text-white ${isLive ? 'bg-white/20 text-white' : 'text-white/60'}`}
              onClick={() => setIsLive(true)}
            >
              Live Stream
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-full hover:bg-white/20 hover:text-white ${!isLive ? 'bg-white/20 text-white' : 'text-white/60'}`}
              onClick={() => setIsLive(false)}
            >
              Past 24H
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-[2rem] flex items-center gap-4">
            <ShieldCheck className="size-10 text-primary" />
            <div>
              <h3 className="font-serif font-bold text-lg">Secure Perimeter</h3>
              <p className="text-sm text-muted-foreground">Motion sensors active</p>
            </div>
          </div>
          <div className="glass p-6 rounded-[2rem] flex items-center gap-4">
            <Activity className="size-10 text-primary" />
            <div>
              <h3 className="font-serif font-bold text-lg">Network Status</h3>
              <p className="text-sm text-muted-foreground">Stable (99.9% Uptime)</p>
            </div>
          </div>
          <div className="glass p-6 rounded-[2rem] flex items-center gap-4">
            <CloudRain className="size-10 text-primary" />
            <div>
              <h3 className="font-serif font-bold text-lg">Weather Alert</h3>
              <p className="text-sm text-muted-foreground">No extreme conditions</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
