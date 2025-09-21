'use client';

import Image from 'next/image';
import { useEffect, useState, useMemo, useRef } from 'react';

export default function Reel() {
  // Number of lines
  const lineCount = 24;
  // All images (memoized)
  const allImages = useMemo(() => [
    '/reels/img1.webp',
    '/reels/img2.webp',
    '/reels/img3.webp',
    '/reels/img4.webp',
    '/reels/img5.webp',
  ], []);
  const [imgSrc, setImgSrc] = useState(allImages[0]);
  const [phase, setPhase] = useState(0); // 0,1,2 = fast, 3 = random hold
  const prevPhase = useRef(phase);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (phase < 3) {
      timeout = setTimeout(() => {
        const randomIdx = Math.floor(Math.random() * allImages.length);
        setImgSrc(allImages[randomIdx]);
        setPhase((prev) => prev + 1);
      }, 500);
    } else if (phase === 3 && prevPhase.current !== 3) {
      // Only set the 4th image when entering phase 3
      const available = allImages.filter((img) => img !== imgSrc);
      const randomIdx = Math.floor(Math.random() * available.length);
      setImgSrc(available[randomIdx]);
      timeout = setTimeout(() => {
        setPhase(0);
      }, 4000);
    }
    prevPhase.current = phase;
    return () => clearTimeout(timeout);
  }, [phase, allImages, imgSrc]);

  return (
    <section className="relative w-full min-h-screen h-screen bg-black text-white flex flex-col">
      {/* Title */}
      <div className="w-full bg-black py-4 md:py-6 flex justify-center items-center">
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-widest text-center leading-none">
          THE REEL
        </h2>
      </div>
      {/* Main Content: lines left/right, image center */}
      <div className="flex-1 flex flex-row w-full bg-black relative">
        {/* Left lines */}
        <div className="relative w-1/24 min-w-[8px] max-w-[24px] h-full flex flex-col justify-between z-0 pointer-events-none">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div
              key={i}
              className="w-full border-t border-white/20 border-opacity-10 h-[0.5px]"
            />
          ))}
        </div>
        {/* Image center */}
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="w-full h-full relative flex items-center justify-center">
            <Image
              src={imgSrc}
              alt="The Reel Main"
              fill
              className="object-cover object-center grayscale contrast-125 transition-all duration-300"
              priority
            />
          </div>
        </div>
        {/* Right lines */}
        <div className="relative w-1/24 min-w-[8px] max-w-[24px] h-full flex flex-col justify-between z-0 pointer-events-none">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div
              key={i}
              className="w-full border-t border-white/20 border-opacity-10 h-[0.5px]"
            />
          ))}
        </div>
      </div>
      {/* Caption at the bottom */}
      <div className="w-full bg-black py-3 flex justify-center items-center">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-4xl mx-auto leading-relaxed text-center px-2">
          Glimpses of power. Fragments of influence. The convergence of worlds that shape tomorrow.
        </p>
      </div>
    </section>
  );
}
