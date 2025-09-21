'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // --- PARTICULATE BACKGROUND ---
    const PARTICLE_COUNT = 180;
    const particles: { x: number; y: number; r: number; baseAlpha: number; color: string; twinkleSpeed: number; twinklePhase: number }[] = [];
    const palette = [
      '#FFB347', // orange
      '#FFD700', // gold
      '#7FFFD4', // aquamarine
      '#87CEEB', // sky blue
      '#FF69B4', // pink
      '#B0E57C', // light green
      '#FFFACD', // lemon chiffon
      '#E0BBE4', // lavender
    ];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 1.2 + Math.random() * 1.8,
        baseAlpha: 0.18 + Math.random() * 0.18,
        color: palette[Math.floor(Math.random() * palette.length)],
        twinkleSpeed: 0.5 + Math.random() * 0.7,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    // --- ANIMATION LOOP ---
    let time = 0;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw particulate background
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Gentle twinkle
        const twinkle = Math.sin(time * 0.012 * p.twinkleSpeed + p.twinklePhase) * 0.13;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.baseAlpha + twinkle));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      time += 1;
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#000000' }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-wider">
          PHENOMENA
        </h1>
        {/* Launching Text */}
        <p className="text-xl md:text-2xl mb-8 tracking-wide">
          LAUNCHING
        </p>
        {/* Countdown Timer */}
        <div className="flex gap-4 md:gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-mono font-bold mb-2">00</div>
            <div className="text-sm md:text-base tracking-wider">DAYS</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-mono font-bold mb-2">00</div>
            <div className="text-sm md:text-base tracking-wider">HOURS</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-mono font-bold mb-2">00</div>
            <div className="text-sm md:text-base tracking-wider">MINUTES</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-mono font-bold mb-2">00</div>
            <div className="text-sm md:text-base tracking-wider">SECONDS</div>
          </div>
        </div>
        {/* Cities List */}
        <div className="absolute bottom-8 text-center">
          <p className="text-sm md:text-base text-gray-300 tracking-wider">
            MIAMI • SAN SALVADOR • BUENOS AIRES • TOKYO • HONG KONG • LONDON • PARIS • BERLIN
          </p>
        </div>
      </div>
    </div>
  );
}
