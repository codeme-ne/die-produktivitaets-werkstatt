"use client";
import { useEffect, useState } from "react";

export function ChatCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 10, minutes: 24, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else return prev; // Stop at 0
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="countdown font-mono text-2xl">
      <span style={{"--value":timeLeft.hours} as React.CSSProperties}></span>:
      <span style={{"--value":timeLeft.minutes} as React.CSSProperties}></span>:
      <span style={{"--value":timeLeft.seconds} as React.CSSProperties}></span>
    </span>
  );
}
