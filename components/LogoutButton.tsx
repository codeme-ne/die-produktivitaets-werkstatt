"use client";

import { logoutUser } from "@/app/actions";

/**
 * Logout button - uses Server Action to clear JWT cookie
 */
export default function LogoutButton() {
  return (
    <button onClick={() => logoutUser()} className="btn btn-ghost btn-sm">
      Abmelden
    </button>
  );
}
