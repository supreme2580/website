'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Animated Access Section Component
function AnimatedAccessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-100px" 
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut"
      }}
      className="relative z-10 flex flex-col items-center w-full max-w-xl mx-auto"
    >
      <motion.h2 
        className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold tracking-widest text-white text-center mb-2 drop-shadow-lg leading-none"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.1
        }}
      >
        ACCESS.<br />UNLOCKED.
      </motion.h2>
      
      {/* Keypad/QR image */}
      <motion.div 
        className="my-12"
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.2
        }}
      >
        <div className="bg-black/60 rounded-lg border border-white/10 p-4 flex items-center justify-center shadow-xl">
          <Image
            src="/keypad.png"
            alt="Secure Verification Keypad"
            width={220}
            height={220}
            className="object-contain select-none"
            priority
            draggable={false}
          />
        </div>
      </motion.div>
      
      {/* Secure verification text */}
      <motion.div 
        className="text-base md:text-lg text-white/80 text-center font-medium mb-1 tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.3
        }}
      >
        SECURE VERIFICATION REQUIRED
      </motion.div>
      
      <motion.div 
        className="text-xs text-white/40 text-center mb-8 tracking-widest"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.4
        }}
      >
        SCAN FOR AUTHENTICATED ACCESS &middot; MEMBERS ONLY
      </motion.div>
      
      {/* Status legend */}
      <motion.div 
        className="flex flex-row items-center justify-center gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.5
        }}
      >
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          <span className="text-xs text-white/60">SECURE</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
          <span className="text-xs text-white/60">ENCRYPTED</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
          <span className="text-xs text-white/60">VERIFIED</span>
        </div>
      </motion.div>
      
      <motion.div
        className="w-56 h-1 bg-gradient-to-r from-white/0 via-white to-white/0 rounded-full opacity-90 shadow-lg animate-divider-up-infinite"
        style={{ zIndex: 20, transform: 'translateX(-50%)' }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 0.9, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.6
        }}
      />
    </motion.div>
  );
}

export default function Access() {
  return (
    <section className="relative w-full min-h-[50vh] flex flex-col items-center justify-center pt-24 pb-8 px-4 md:px-8 bg-black overflow-hidden">
      <AnimatedAccessSection />
    </section>
  );
}
