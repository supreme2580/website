'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import { motion, useInView } from 'framer-motion';

export default function Manifesto() {
  // Store the original texts for reference
  const texts = useMemo(() => [
    'Power is not taken.',
    'It is granted by those who recognize its necessity.',
    'September 10th marks not an end,',
    'The convergence of influence.',
    'The alignment of vision.',
    'but the beginning of a new paradigm.',
    'Are you ready to witness history?'
  ], []);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Timing constants
  const typeSpeed = 55;
  const deleteSpeed = 30;
  const delaySpeed = 1200;

  // Use useTypewriter hook
  const [text] = useTypewriter({
    words: texts,
    loop: true,
    typeSpeed,
    deleteSpeed,
    delaySpeed,
  });

  useEffect(() => {
    // Update currentIdx based on which word is currently being typed
    // Find the index of the word that matches the current text (ignoring partial typing)
    const idx = texts.findIndex(word => text && word.startsWith(text));
    if (idx !== -1) setCurrentIdx(idx);
  }, [text, texts]);

  return (
    <div className="w-full min-h-[50vh] flex flex-col items-center justify-center py-10 bg-black">
      <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold tracking-widest text-white text-center drop-shadow-lg mb-10">
        MANIFESTO
      </h1>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full">
          <span
            style={{
              fontFamily: 'inherit',
              fontWeight: 400,
              fontSize: 'clamp(1.5rem,4vw,2.5rem)',
              color: '#fff',
              textAlign: 'center',
              width: '100%',
              minHeight: '3.5em',
              display: 'block',
            }}
          >
            {/* Show the typewriter text and cursor */}
            <span>{text}</span>
            <span style={{ color: '#fff' }}>|</span>
            <div className="my-8 flex flex-row justify-center items-center gap-2">
              {texts.map((_, idx) => (
                <span
                  key={idx}
                  className={`transition-all duration-300 rounded-full inline-block ${
                    idx === currentIdx
                      ? 'w-4 h-4 bg-white scale-125 shadow-lg'
                      : 'w-3 h-3 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </span>
        </div>
        <div className="flex flex-col items-center mt-10">
          <div className="w-px h-16 bg-gradient-to-b from-white via-white/60 to-transparent mb-4" />
          <div className="text-center">
            <div className="text-lg font-semibold text-white tracking-widest mb-1">PHENOMENA GLOBAL</div>
            <div className="text-sm text-white/60 tracking-widest">THE FUTURE AWAITS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
