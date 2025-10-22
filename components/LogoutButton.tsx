"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setLoading(false);
      router.replace("/");
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="btn btn-ghost btn-sm"
    >
      {loading ? "Wird abgemeldet..." : "Abmelden"}
    </button>
  );
}
