'use client';

import { useState } from 'react';

export default function Join() {
  const [email, setEmail] = useState('');
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center py-24 px-4 md:px-8 bg-black overflow-hidden">
      {/* Abstract background effect */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center" aria-hidden>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[90vw] max-w-3xl h-[60vh] blur-2xl opacity-60 bg-gradient-to-br from-white/10 via-black/80 to-black rounded-2xl" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-black/80 to-black" />
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto">
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold tracking-widest text-white text-center mb-6 drop-shadow-lg">
          JOIN THE ELITE
        </h2>
        <p className="text-lg md:text-xl text-white/70 text-center mb-10 max-w-2xl">
          Exclusive access to the world&apos;s most influential network. Invitations are limited and by application only.
        </p>
        {/* Email input and button */}
        <form className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mb-8" onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder="your.email@domain.com"
            className="w-full sm:w-80 px-5 py-3 rounded-md bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-base"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-md bg-white text-black font-semibold text-base shadow-lg hover:bg-white/90 transition-all"
          >
            REQUEST ACCESS
          </button>
        </form>
        <div className="text-xs text-white/40 tracking-widest text-center">
          BY INVITATION ONLY &middot; APPLICATIONS REVIEWED QUARTERLY
        </div>
      </div>
    </section>
  );
}
