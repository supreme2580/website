'use client';

import { useEffect, useRef, useState } from 'react';
import ZebraBackground from './ZebraBackground';

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

    // --- 3D STARFIELD PARTICULATE BACKGROUND ---
    const PARTICLE_COUNT = 180;
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
    // Each particle has 3D position (x, y, z), color, and twinkle
    const particles: { x: number; y: number; z: number; color: string; twinkleSpeed: number; twinklePhase: number }[] = [];
    const FOV = 420; // field of view (affects tunnel depth)
    const MAX_DEPTH = 1200;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.1 + 0.2; // spread out
      particles.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.random() * MAX_DEPTH + 80,
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
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Move forward (decrease z)
        p.z -= 7.5;
        if (p.z < 10) {
          // Respawn at far distance with new angle/radius
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 1.1 + 0.2;
          p.x = Math.cos(angle) * radius;
          p.y = Math.sin(angle) * radius;
          p.z = MAX_DEPTH;
          p.color = palette[Math.floor(Math.random() * palette.length)];
          p.twinkleSpeed = 0.5 + Math.random() * 0.7;
          p.twinklePhase = Math.random() * Math.PI * 2;
        }
        // 3D to 2D projection
        const scale = FOV / p.z;
        const screenX = cx + p.x * canvas.width * scale;
        const screenY = cy + p.y * canvas.height * scale;
        // Size and alpha by depth
        const baseSize = 2.2 + 8 * (1 - p.z / MAX_DEPTH);
        const twinkle = Math.sin(time * 0.012 * p.twinkleSpeed + p.twinklePhase) * 0.13;
        const alpha = Math.max(0, Math.min(1, 0.18 + 0.7 * (1 - p.z / MAX_DEPTH) + twinkle));
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(screenX, screenY, baseSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12 * (1 - p.z / MAX_DEPTH);
        ctx.fill();
        ctx.shadowBlur = 0;
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

  // --- TIMER LOGIC ---
  const [timeLeft, setTimeLeft] = useState({ days: '10', hours: '00', minutes: '00', seconds: '00' });
  useEffect(() => {
    const target = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // 10 days from now
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, target.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Zebra/Wavy Three.js Background */}
      <ZebraBackground />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white select-none">
        {/* Main Title */}
        <h1 className="text-[clamp(3rem,12vw,8rem)] font-extrabold leading-none text-center mb-10 md:mb-14 tracking-widest">
          PHENOMENA
        </h1>
        {/* Launching Text */}
        <p className="text-xs md:text-base tracking-widest text-center mb-8 md:mb-12 text-white/60 uppercase">
          LAUNCHING
        </p>
        {/* Countdown Timer */}
        <div className="flex flex-row gap-6 md:gap-12 mb-0 md:mb-8 justify-center items-end">
          <div className="flex flex-col items-center">
            <div className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold font-mono leading-none mb-1">{timeLeft.days}</div>
            <div className="text-xs md:text-base tracking-widest text-white/60 uppercase">DAYS</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold font-mono leading-none mb-1">{timeLeft.hours}</div>
            <div className="text-xs md:text-base tracking-widest text-white/60 uppercase">HOURS</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold font-mono leading-none mb-1">{timeLeft.minutes}</div>
            <div className="text-xs md:text-base tracking-widest text-white/60 uppercase">MINUTES</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold font-mono leading-none mb-1">{timeLeft.seconds}</div>
            <div className="text-xs md:text-base tracking-widest text-white/60 uppercase">SECONDS</div>
          </div>
        </div>
      </div>
      {/* Cities List Bar with Marquee */}
      <div className="absolute bottom-0 left-0 w-full py-3 md:py-4 px-1 md:px-2 bg-transparent z-20 overflow-hidden">
        <div
          className="flex w-max animate-marquee"
          style={{
            animation: 'marquee 22s linear infinite',
          }}
        >
          <p className="text-[clamp(1.1rem,2.5vw,2.2rem)] font-bold text-white/60 uppercase tracking-widest whitespace-nowrap mx-4">
            MEXICO CITY • WALL STREET • HOLLYWOOD • SILICON VALLEY • WASHINGTON DC • ABU DHABI • DUBAI • MIAMI • SAN SALVADOR • BUENOS AIRES • TOKYO • HONG KONG • TAIWAN • AUSTIN • LONDON • MADRID • WARSAW • MUMBAI • TORONTO • SEOUL • BOULDER • MEXICO CITY • WALL STREET • HOLLYWOOD • SILICON VALLEY • WASHINGTON DC • ABU DHABI • DUBAI • MIAMI • SAN SALVADOR • BUENOS AIRES • TOKYO • HONG KONG • TAIWAN • AUSTIN • LONDON • MADRID • WARSAW • MUMBAI • TORONTO • SEOUL • BOULDER •
          </p>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </div>
  );
}
