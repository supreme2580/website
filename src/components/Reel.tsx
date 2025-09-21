import Image from 'next/image';

export default function Reel() {
  // Number of lines
  const lineCount = 12;
  return (
    <section className="relative w-full min-h-screen h-screen bg-black text-white flex flex-col">
      {/* Title */}
      <div className="w-full bg-black py-4 md:py-6 flex justify-center items-center">
        <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-widest text-center leading-none">
          THE REEL
        </h2>
      </div>
      {/* Main Image - fill available space */}
      <div className="flex-1 flex justify-center items-center w-full bg-black relative px-8">
        {/* Faint horizontal lines background */}
        <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between" aria-hidden="true">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div
              key={i}
              className="w-full border-t border-white opacity-10"
              style={{ borderWidth: '1.5px' }}
            />
          ))}
        </div>
        {/* Image above lines */}
        <div className="w-full h-full relative flex items-center justify-center z-10">
          <Image
            src="/reels/img1.webp"
            alt="The Reel Main"
            fill
            className="object-cover object-center grayscale contrast-125"
            priority
          />
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
