'use client';

import { useState, useMemo, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';

export default function Manifesto() {
  // Store the original texts for reference
  const texts = useMemo(() => [
    'Are you ready to witness history?',
    "Embrace the future, it's no mystery.",
    'Stand with us, in this grand symphony.',
    'Dreams ignite, and boundaries fall.',
    'Together we rise, answering the call.',
    'A new era begins—this is for all.'
  ], []);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Timing constants
  const typeSpeed = 55;
  const deleteSpeed = 30;
  const delaySpeed = 1200;

  useEffect(() => {
    const advanceDot = () => {
      setCurrentIdx(prev => (prev + 1) % texts.length);
    };
    // Calculate the time for the current word
    const word = texts[currentIdx];
    const typingTime = word.length * typeSpeed;
    const deletingTime = word.length * deleteSpeed;
    const totalTime = typingTime + delaySpeed + deletingTime;
    const timer = setTimeout(advanceDot, totalTime);
    return () => clearTimeout(timer);
  }, [currentIdx, texts, typeSpeed, deleteSpeed, delaySpeed]);

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
            <Typewriter
              loop={true}
              words={texts}
              cursor
              cursorStyle="|"
              typeSpeed={typeSpeed}
              deleteSpeed={deleteSpeed}
              delaySpeed={delaySpeed}
            />        
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
