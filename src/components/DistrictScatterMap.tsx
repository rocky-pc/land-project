"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// 38 districts of Tamil Nadu with English and Tamil names
const tamilNaduDistricts = [
  { english: 'Ariyalur', tamil: 'அரியலூர்' },
  { english: 'Chennai', tamil: 'சென்னை' },
  { english: 'Coimbatore', tamil: 'கோயம்புத்தூர்' },
  { english: 'Cuddalore', tamil: 'கடலூர்' },
  { english: 'Dharmapuri', tamil: 'தர்மபுரி' },
  { english: 'Dindigul', tamil: 'திண்டுக்கல்' },
  { english: 'Erode', tamil: 'ஈரோடு' },
  { english: 'Kallakurichi', tamil: 'கல்லக்குறிச்சி' },
  { english: 'Kanchipuram', tamil: 'காஞ்சிபுரம்' },
  { english: 'Kanyakumari', tamil: 'கன்னியாகுமாரி' },
  { english: 'Karur', tamil: 'கருர்' },
  { english: 'Krishnagiri', tamil: 'கிருஷ்ணகிரி' },
  { english: 'Madurai', tamil: 'மதுரை' },
  { english: 'Nagapattinam', tamil: 'நாகப்பட்டினம்' },
  { english: 'Namakkal', tamil: 'நாமக்கல்' },
  { english: 'Nilgiris', tamil: 'நீலகிரி' },
  { english: 'Perambalur', tamil: 'பெரும்பালூர்' },
  { english: 'Pudukkottai', tamil: 'புதுக்கோட்டை' },
  { english: 'Ramanathapuram', tamil: 'இராமநாதபுரம்' },
  { english: 'Salem', tamil: 'சேலம்' },
  { english: 'Sivaganga', tamil: 'சிவகங்கை' },
  { english: 'Tenkasi', tamil: 'தென்காசி' },
  { english: 'Thanjavur', tamil: 'தஞ்சாவூர்' },
  { english: 'Theni', tamil: 'தேனி' },
  { english: 'Thoothukudi', tamil: 'தூத்துக்குடி' },
  { english: 'Tiruchirappalli', tamil: 'திருச்சிராப்பள்ளி' },
  { english: 'Tirunelveli', tamil: 'திருநெல்வேலி' },
  { english: 'Tirupathur', tamil: 'திருப்பத்தூர்' },
  { english: 'Tiruppur', tamil: 'திறுப்பூர்' },
  { english: 'Tiruvallur', tamil: 'திருவள்ளூர்' },
  { english: 'Tiruvannamalai', tamil: 'திருவண்ணாமலை' },
  { english: 'Tiruvarur', tamil: 'தீவரூர்' },
  { english: 'Vellore', tamil: 'வெலூர்' },
  { english: 'Viluppuram', tamil: 'விழுப்புரம்' },
  { english: 'Virudhunagar', tamil: 'விருதுநகர்' }
];

export default function DistrictScatterMap() {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  // Generate random positions for each district within a container
  const getRandomPosition = (index: number) => {
    // Use a seeded random based on index for consistent positioning
    const seed = index * 0.12345;
    const x = Math.sin(seed) * 40 + Math.cos(seed * 0.7) * 20;
    const y = Math.cos(seed * 0.5) * 30 + Math.sin(seed * 0.9) * 25;
    return { x: `${x}%`, y: `${y}%` };
  };

  // Generate varying font sizes and animation delays
  const getFontSize = (index: number) => {
    const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl'];
    return sizes[index % sizes.length];
  };

  const getAnimationDelay = (index: number) => {
    return index * 0.05; // Staggered animation
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {/* Background grassland image with green overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-[url('/grassland.jpg')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-green-900/30" />
      </div>
      
      {/* Floating districts */}
      <div className="absolute inset-0 pointer-events-none">
        {tamilNaduDistricts.map((district, index) => {
          const position = getRandomPosition(index);
          const fontSize = getFontSize(index);
          const delay = getAnimationDelay(index);
          const isHovered = hoveredDistrict === district.english;
          
          return (
            <motion.div
              key={district.english}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 2 : 0
              }}
              transition={{ 
                duration: 0.4, 
                delay,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              whileHover={{
                scale: 1.15,
                rotate: 3,
                y: -5
              }}
              whileTap={{ scale: 1.05 }}
              className={`absolute cursor-pointer transition-all duration-300 ${fontSize} font-medium text-white/90 drop-shadow-md`}
              style={{ 
                left: position.x, 
                top: position.y,
                transform: `translate(-50%, -50%)`
              }}
              onMouseEnter={() => setHoveredDistrict(district.english)}
              onMouseLeave={() => setHoveredDistrict(null)}
            >
              {/* District name with English and Tamil */}
              <div className="text-center">
                <div className="whitespace-nowrap">{district.english}</div>
                <div className="text-xs text-white/70 italic">{district.tamil}</div>
              </div>
              
              {/* Hover thumbnail */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-16 rounded-lg overflow-hidden shadow-lg border border-white/20"
                >
                  <div className="absolute inset-0 bg-[url('/grassland.jpg')] bg-cover bg-center" />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Clickable links overlay */}
      <div className="absolute inset-0">
        {tamilNaduDistricts.map((district, index) => {
          const position = getRandomPosition(index);
          return (
            <Link
              key={district.english}
              href={`/plot/${district.english.toLowerCase().replace(/\s+/g, '-')}`}
              className="absolute inset-0"
              style={{ 
                left: position.x, 
                top: position.y,
                width: '80px',
                height: '40px',
                transform: `translate(-50%, -50%)`
              }}
            >
              {/* Invisible link for clickability */}
            </Link>
          );
        })}
      </div>
    </div>
  );
}