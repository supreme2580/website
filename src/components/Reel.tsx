"use client";
import Image from 'next/image';
import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Reel() {
  // All images (memoized)
  const allImages = useMemo(() => [
    '/reels/img1.webp',
    '/reels/img2.webp',
    '/reels/img3.webp',
    '/reels/img4.webp',
    '/reels/img5.webp',
  ], []);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Flicker effect
  const [flicker, setFlicker] = useState(1);
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setFlicker(0.97 + Math.random() * 0.06); // subtle flicker between 0.97 and 1.03
    }, 120);
    return () => clearInterval(flickerInterval);
  }, []);

  // Auto-advance logic
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % allImages.length);
    }, 2500);
  }, [allImages.length]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, resetTimer]);

  // Manual navigation
  const goTo = (idx: number) => {
    setCurrent(idx);
    resetTimer();
  };
  const goLeft = () => goTo((current - 1 + allImages.length) % allImages.length);
  const goRight = () => goTo((current + 1) % allImages.length);

  return (
    <section className="relative w-full bg-black text-white flex flex-col">
      {/* Title */}
      <div className="w-full bg-black py-4 md:py-6 flex justify-center items-center">
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-widest text-center leading-none">
          THE REEL
        </h2>
      </div>
      {/* Main Content: image center */}
      <div className="flex-1 flex flex-row w-full bg-black relative">
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="relative w-[90vw] max-w-5xl aspect-video mx-auto flex items-center justify-center bg-black rounded-lg shadow-2xl border-4 border-white/10 overflow-hidden" style={{ filter: `brightness(${flicker})` }}>
            {/* Left arrow */}
            <button
              aria-label="Previous"
              onClick={goLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-white/80"
              tabIndex={0}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            {/* Main image */}
            <Image
              src={allImages[current]}
              alt={`Film frame ${current + 1}`}
              fill
              className="object-cover object-center grayscale contrast-125 transition-all duration-300 select-none"
              priority
              draggable={false}
            />
            {/* Right arrow */}
            <button
              aria-label="Next"
              onClick={goRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-white/80"
              tabIndex={0}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {/* Filmstrip thumbnails */}
      <div className="w-full flex justify-center items-center gap-2 py-4 bg-black">
        {allImages.map((img, idx) => (
          <button
            key={img}
            onClick={() => goTo(idx)}
            className={`relative w-16 h-10 md:w-24 md:h-14 rounded border-2 transition-all duration-200 overflow-hidden ${idx === current ? 'border-white/80 shadow-lg scale-105' : 'border-white/20 opacity-60 hover:opacity-100'}`}
            tabIndex={0}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover object-center grayscale contrast-125 select-none"
              draggable={false}
            />
            {idx === current && (
              <span className="absolute bottom-1 left-1 right-1 h-1 bg-white/80 rounded-full" />
            )}
          </button>
        ))}
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
