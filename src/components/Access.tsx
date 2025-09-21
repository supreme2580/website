'use client';

import Image from 'next/image';
import { useRef } from 'react';

export default function Access() {
  const dividerRef = useRef<HTMLDivElement>(null);

  // No need for useEffect, animation will be infinite

  return (
    <section className="relative w-full min-h-[50vh] flex flex-col items-center justify-center py-24 px-4 md:px-8 bg-black overflow-hidden">
      <div className="relative z-10 flex flex-col items-center w-full max-w-xl mx-auto">
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold tracking-widest text-white text-center mb-2 drop-shadow-lg leading-none">
          ACCESS.<br />UNLOCKED.
        </h2>
        {/* Keypad/QR image */}
        <div className="my-12">
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
        </div>
        {/* Secure verification text */}
        <div className="text-base md:text-lg text-white/80 text-center font-medium mb-1 tracking-wide">
          SECURE VERIFICATION REQUIRED
        </div>
        <div className="text-xs text-white/40 text-center mb-8 tracking-widest">
          SCAN FOR AUTHENTICATED ACCESS &middot; MEMBERS ONLY
        </div>
        {/* Status legend */}
        <div className="flex flex-row items-center justify-center gap-6 mb-8">
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
        </div>
        <div
          ref={dividerRef}
          className="w-56 h-1 bg-gradient-to-r from-white/0 via-white to-white/0 rounded-full opacity-90 shadow-lg animate-divider-up-infinite"
          style={{ zIndex: 20, transform: 'translateX(-50%)' }}
        />
      </div>
    </section>
  );
}
