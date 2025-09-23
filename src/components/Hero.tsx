"use client";

import { useEffect, useState } from "react";

export default function Hero() {

  // --- TIMER LOGIC ---
  const [timeLeft, setTimeLeft] = useState({
    days: "10",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
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
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black bg-[url('/hero-background.gif')] bg-cover bg-center bg-no-repeat">
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
            <div className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold font-mono leading-none mb-1">
              {timeLeft.days}
            </div>
            <div className="text-xs md:text-base tracking-widest text-white/60 uppercase">
              DAYS
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold font-mono leading-none mb-1">
              {timeLeft.hours}
            </div>
            <div className="text-xs md:text-base tracking-widest text-white/60 uppercase">
              HOURS
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold font-mono leading-none mb-1">
              {timeLeft.minutes}
            </div>
            <div className="text-xs md:text-base tracking-widest text-white/60 uppercase">
              MINUTES
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold font-mono leading-none mb-1">
              {timeLeft.seconds}
            </div>
            <div className="text-xs md:text-base tracking-widest text-white/60 uppercase">
              SECONDS
            </div>
          </div>
        </div>
      </div>
      {/* Cities List Bar with Marquee */}
      <div className="absolute bottom-0 left-0 w-full py-3 md:py-4 px-1 md:px-2 bg-transparent z-20 overflow-hidden">
        <div className="flex w-max animate-marquee">
          <p className="text-[clamp(1.1rem,2.5vw,2.2rem)] font-bold text-white/60 uppercase tracking-widest whitespace-nowrap mx-4">
            MEXICO CITY • WALL STREET • HOLLYWOOD • SILICON VALLEY • WASHINGTON
            DC • ABU DHABI • DUBAI • MIAMI • SAN SALVADOR • BUENOS AIRES • TOKYO
            • HONG KONG • TAIWAN • AUSTIN • LONDON • MADRID • WARSAW • MUMBAI •
            TORONTO • SEOUL • BOULDER •
          </p>
        </div>
      </div>
    </div>
  );
}
