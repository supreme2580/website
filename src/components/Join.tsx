'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Animated Join Section Component
function AnimatedJoinSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-100px" 
  });

  const [email, setEmail] = useState('');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut"
      }}
      className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto"
    >
      <motion.h2 
        className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold tracking-widest text-white text-center mb-6 drop-shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.1
        }}
      >
        JOIN THE ELITE
      </motion.h2>
      
      <motion.p 
        className="text-lg md:text-xl text-white/70 text-center mb-10 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.2
        }}
      >
        Exclusive access to the world&apos;s most influential network. Invitations are limited and by application only.
      </motion.p>
      
      {/* Email input and button */}
      <motion.form 
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mb-10" 
        onSubmit={e => e.preventDefault()}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.3
        }}
      >
        <input
          type="email"
          required
          placeholder="your.email@domain.com"
          className="w-64 sm:w-48 px-2 py-4 rounded-md bg-transparent border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-base"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
        />
        <button
          type="submit"
          className="w-64 sm:w-auto px-8 py-4 font-medium rounded-md bg-white text-black text-base shadow-lg hover:bg-white/90 hover:cursor-pointer transition-all"
        >
         REQUEST ACCESS
        </button>
      </motion.form>
      
      <motion.div 
        className="text-xs text-white/40 tracking-widest text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.4
        }}
      >
        BY INVITATION ONLY &middot; APPLICATIONS REVIEWED QUARTERLY
      </motion.div>
    </motion.div>
  );
}

export default function Join() {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center py-24 px-4 md:px-8 bg-black bg-[url('/join-background.gif')] bg-cover bg-center bg-no-repeat overflow-hidden">
      {/* Video Background */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center" aria-hidden>
        {/* Abstract background effect */}
        <div className="w-full h-full flex items-center justify-center absolute inset-0">
          <div className="w-full h-full blur-2xl opacity-60 bg-gradient-to-br from-white/10 via-black/80 to-black rounded-2xl" />
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-black/80 to-black" /> */}
      </div>
      {/* Content */}
      <AnimatedJoinSection />
    </section>
  );
}
