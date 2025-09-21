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
    
    interface Stream {
      startX: number;
      startY: number;
      progress: number;
      length: number;
      thickness: number;
    }
    
    const streams: Stream[] = [];

    // Stream properties
    const streamLength = 600; // 4x longer streams (600px instead of 150px)
    const maxStreams = 20; // Maximum number of streams on screen
    const spawnRate = 0.02; // Snake spawning rate

    // Create initial streams
    for (let i = 0; i < 5; i++) {
      spawnNewStream();
    }

    function spawnNewStream() {
      if (!canvas) return;
      
      streams.push({
        startX: -50, // Start from left edge (top-left to bottom-right)
        startY: Math.random() * canvas.height * 0.6, // Start from top 60%
        progress: 0,
        length: streamLength + Math.random() * 200, // Variable length (4x longer)
        thickness: 40 // 10x thicker streams
      });
    }

    function removeOldStreams() {
      for (let i = streams.length - 1; i >= 0; i--) {
        if (streams[i].progress > 1) {
          streams.splice(i, 1);
        }
      }
    }

    function drawStream(stream: Stream, time: number) {
      if (!ctx || !canvas) return;
      
      ctx.beginPath();
      
      // Calculate the head position (leading edge)
      const headX = stream.startX + (stream.progress * (canvas.width + stream.length));
      const headY = stream.startY + (stream.progress * canvas.height * 0.4);
      
      // Calculate the tail position (trailing edge)
      const tailX = headX - stream.length;
      const tailY = headY - (stream.length * 0.6);
      
      // Create smoothly curved stream using bezier curves
      const width = headX - tailX;
      const height = headY - tailY;
      
      // Calculate smooth curve control points (4x more curved)
      const control1X = tailX + width * 0.3;
      const control1Y = tailY + height * 0.3 + Math.sin(time * 0.01 + stream.startY * 0.01) * 120;
      const control2X = tailX + width * 0.7;
      const control2Y = tailY + height * 0.7 + Math.sin(time * 0.015 + stream.startY * 0.02) * 100;
      
      // Start point
      ctx.moveTo(tailX, tailY);
      
      // Draw smooth bezier curve
      ctx.bezierCurveTo(control1X, control1Y, control2X, control2Y, headX, headY);
      
      // Only fade out when approaching the end (progress > 0.8)
      const fadeProgress = stream.progress > 0.8 ? (1 - stream.progress) / 0.2 : 1;
      const baseOpacity = 0.4;
      const pulseOpacity = Math.sin(time * 0.01 + stream.startY * 0.01) * 0.1;
      const finalOpacity = (baseOpacity + pulseOpacity) * fadeProgress;
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${finalOpacity})`;
      ctx.lineWidth = stream.thickness;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Spawn new streams
      if (Math.random() < spawnRate && streams.length < maxStreams) {
        spawnNewStream();
      }
      
      // Update and draw streams
      for (let i = 0; i < streams.length; i++) {
        const stream = streams[i];
        stream.progress += 0.005; // 2x slower snake-like movement speed
        
        drawStream(stream, time);
      }
      
      // Remove streams that have finished
      removeOldStreams();
      
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
