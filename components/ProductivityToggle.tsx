"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export function ProductivityToggle() {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    if (newState) {
      toast.success("Produktivitäts-Modus aktiviert! 🚀", {
        icon: "🚀",
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      toast("Produktivitäts-Modus deaktiviert. Pause gönnen! ☕", {
        icon: "☕",
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  return (
    <div className="form-control w-full max-w-xs mx-auto mt-4">
      <label className="label cursor-pointer justify-center gap-4">
        <span className={`label-text transition-all duration-300 ${!isEnabled ? "font-bold text-base-content opacity-100 scale-105" : "opacity-50"}`}>
          Produktivität AUS
        </span>
        <input 
          type="checkbox" 
          className="toggle toggle-success toggle-lg" 
          checked={isEnabled} 
          onChange={toggle} 
        />
        <span className={`label-text transition-all duration-300 ${isEnabled ? "text-success font-bold opacity-100 scale-105" : "opacity-50"}`}>
          AN 🚀
        </span>
      </label>
    </div>
  );
}
