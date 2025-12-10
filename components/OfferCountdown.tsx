"use client";

import { useState, useEffect } from "react";

export default function OfferCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Ziel: 31. Januar des aktuellen (oder nächsten) Jahres
    const now = new Date();
    let target = new Date(now.getFullYear(), 0, 31, 23, 59, 59); // 31. Jan, 23:59:59

    // Falls 31. Jan schon vorbei ist, nimm nächstes Jahr (oder lass es bei 0 stehen? 
    // Für "Frühbucher" nehmen wir an, es ist das kommende Datum)
    if (now > target) {
       target = new Date(now.getFullYear() + 1, 0, 31, 23, 59, 59);
    }

    const calculateTimeLeft = () => {
      const difference = target.getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      <div className="badge badge-accent badge-lg mb-2">Frühbucherrabatt endet in:</div>
      <div className="flex items-center justify-center gap-2 font-mono text-4xl md:text-6xl font-bold text-accent">
        {timeLeft.days > 0 && (
          <>
            <span className="countdown">
              <span style={{ "--value": timeLeft.days } as any}></span>
            </span>
            <span>:</span>
          </>
        )}
        <span className="countdown">
          <span style={{ "--value": timeLeft.hours } as any}></span>
        </span>
        <span>:</span>
        <span className="countdown">
          <span style={{ "--value": timeLeft.minutes } as any}></span>
        </span>
        <span>:</span>
        <span className="countdown">
          <span style={{ "--value": timeLeft.seconds } as any}></span>
        </span>
      </div>
    </div>
  );
}
