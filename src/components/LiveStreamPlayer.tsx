import { useState } from 'react';

interface LiveStreamPlayerProps {
  videoId: string;
  location: string;
  coordinates: { lat: string; lng: string };
  className?: string;
}

export default function LiveStreamPlayer({ videoId, location, coordinates, className }: LiveStreamPlayerProps) {
  return (
    <div className={`relative rounded-[2rem] overflow-hidden shadow-2xl ${className || ''}`}>
      {/* YouTube iframe */}
      <div className="relative w-full aspect-video">
        <iframe
          title="Live Stream"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&loop=1&playlist=${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Live UI Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col items-start gap-2 p-4 pointer-events-none">
        {/* Live badge */}
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span>Live</span>
        </div>

        {/* Location and coordinates */}
        <div className="text-white/90 text-sm font-mono">
          <div>{location}</div>
          <div>{coordinates.lat}, {coordinates.lng}</div>
        </div>
      </div>
    </div>
  );
}