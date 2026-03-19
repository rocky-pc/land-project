"use client";

import { useState } from "react";
import { Activity, Clock, Sun, CloudRain, ShieldCheck, Disc2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import LiveStreamPlayer from "@/components/LiveStreamPlayer";

// Array of live feeds with YouTube video IDs and metadata
const liveFeeds = [
  {
    id: 1,
    videoId: "https://youtu.be/ozyUyazWIqA?si=Wu0CvTfsUeiCbv0K", // Replace with actual YouTube video ID
    title: "Main Plot View",
    location: "Central Survey Zone",
    coordinates: { lat: "12.9716° N", lng: "77.5946° E" }
  },
  {
    id: 2,
    videoId: "https://youtu.be/2OFDeR4-FUs?si=UJgsby_DySk9LcPt", // Replace with actual YouTube video ID
    title: "Entry Gate",
    location: "North Entrance",
    coordinates: { lat: "12.9720° N", lng: "77.5950° E" }
  },
  {
    id: 3,
    videoId: "https://youtu.be/ozyUyazWIqA?si=Wu0CvTfsUeiCbv0K", // Replace with actual YouTube video ID
    title: "North Boundary",
    location: "Perimeter Fence Line",
    coordinates: { lat: "12.9725° N", lng: "77.5955° E" }
  }
];

export default function CCTVPage() {
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

        {/* Video Feeds Grid */}
        <div className="grid gap-6 mb-8">
          {/* Responsive grid: 1col (sm), 2col (md), 3col (lg) */}
          <div className="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid">
            {liveFeeds.map(feed => (
              <LiveStreamPlayer 
                key={feed.id}
                videoId={feed.videoId}
                location={feed.location}
                coordinates={feed.coordinates}
                className="rounded-[2rem] overflow-hidden shadow-2xl"
              />
            ))}
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
