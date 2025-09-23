"use client";
import Image from 'next/image';
import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { motion, useInView } from 'framer-motion';

// Animated Reel Section Component
function AnimatedReelSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-100px" 
  });

  // All images (memoized)
  const allImages = useMemo(() => [
    '/reels/img1.webp',
    '/reels/img2.webp',
    '/reels/img3.webp',
    '/reels/img4.webp',
    '/reels/img5.webp',
    '/reels/img6.webp',
    '/reels/img7.webp',
    '/reels/img8.webp',
    '/reels/img9.webp',
  ], []);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance logic
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPrev(current);
      setDirection('right');
      setCurrent((prev) => (prev + 1) % allImages.length);
    }, 2500);
  }, [allImages.length, current]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, resetTimer]);

  // Manual navigation
  const goTo = (idx: number) => {
    if (idx === current) return;
    setPrev(current);
    setDirection(idx > current || (current === allImages.length - 1 && idx === 0) ? 'right' : 'left');
    setCurrent(idx);
    resetTimer();
  };
  const goLeft = () => goTo((current - 1 + allImages.length) % allImages.length);
  const goRight = () => goTo((current + 1) % allImages.length);

  // Sliding transition logic
  const slideClass = (imgIdx: number) => {
    if (imgIdx === current) {
      return `absolute inset-0 transition-transform duration-500 ease-in-out z-20 ${direction === 'right' ? 'translate-x-0' : 'translate-x-0'}`;
    } else if (imgIdx === prev) {
      return `absolute inset-0 transition-transform duration-500 ease-in-out z-10 ${direction === 'right' ? '-translate-x-full' : 'translate-x-full'}`;
    } else {
      return 'hidden';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut"
      }}
      className="relative w-full bg-black text-white flex flex-col"
    >
      {/* Title */}
      <motion.div 
        className="w-full bg-black py-4 md:py-6 flex justify-center items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.1
        }}
      >
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-widest text-center leading-none">
          THE REEL
        </h2>
      </motion.div>
      
      {/* Main Content: image center */}
      <motion.div 
        className="flex-1 flex flex-row w-full bg-black relative"
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.2
        }}
      >
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="relative w-[90vw] max-w-5xl aspect-video mx-auto flex items-center justify-center bg-black rounded-lg shadow-2xl border-4 border-white/10 overflow-hidden">
            {/* Left arrow */}
            <button
              aria-label="Previous"
              onClick={goLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-white/80"
              tabIndex={0}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            {/* Sliding images */}
            {allImages.map((img, idx) => (
              <Image
                key={img}
                src={img}
                alt={`Film frame ${idx + 1}`}
                fill
                className={`object-cover object-center grayscale contrast-125 transition-all duration-300 select-none ${slideClass(idx)}`}
                priority={idx === current}
                draggable={false}
                style={{ pointerEvents: idx === current ? 'auto' : 'none' }}
              />
            ))}
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
      </motion.div>
      
      {/* Filmstrip thumbnails */}
      <motion.div 
        className="w-full flex justify-center items-center gap-2 py-4 px-8 bg-black"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.3
        }}
      >
        {allImages.map((img, idx) => (
          <button
            key={img}
            onClick={() => goTo(idx)}
            className={`relative w-16 h-10 md:w-24 md:h-14 rounded border-2 transition-all duration-200 hover:cursor-pointer overflow-hidden ${idx === current ? 'border-white/80 shadow-lg scale-105' : 'border-white/20 opacity-60 hover:opacity-100'}`}
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
      </motion.div>
      
      {/* Caption at the bottom */}
      <motion.div 
        className="w-full bg-black py-3 flex justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.4
        }}
      >
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-4xl mx-auto leading-relaxed text-center px-2">
          Glimpses of power. Fragments of influence. The convergence of worlds that shape tomorrow.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Reel() {
  return (
    <section className="relative w-full bg-black text-white flex flex-col">
      <AnimatedReelSection />
    </section>
  );
}
