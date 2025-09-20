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

    // Animation variables
    let time = 0;
    const stripes = 8; // Number of stripes
    const stripeHeight = canvas.height / stripes;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create flowing stripes using sine waves
      for (let i = 0; i < stripes; i++) {
        const y = i * stripeHeight;
        const isEven = i % 2 === 0;
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        
        // Create wavy pattern using sine waves
        for (let x = 0; x < canvas.width; x++) {
          const wave1 = Math.sin((x * 0.01) + (time * 0.002)) * 20;
          const wave2 = Math.sin((x * 0.005) + (time * 0.001)) * 10;
          const wave3 = Math.sin((x * 0.02) + (time * 0.003)) * 5;
          const totalWave = wave1 + wave2 + wave3;
          
          ctx.lineTo(x, y + totalWave);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Alternate colors for stripe effect
        if (isEven) {
          ctx.fillStyle = '#000000';
        } else {
          ctx.fillStyle = '#111111';
        }
        ctx.fill();
      }
      
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
