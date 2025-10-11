"use client";

import { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import config from "@/config";

/**
 * Client-side layout wrapper
 * Simplified - removed SessionProvider and Crisp
 */
const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Progress bar at the top when navigating between pages */}
      <NextTopLoader color={config.colors.main} showSpinner={false} />

      {/* Content inside app/page.js files */}
      {children}

      {/* Toast notifications for success/error messages */}
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />

      {/* Tooltip component */}
      <Tooltip
        id="tooltip"
        className="z-[60] !opacity-100 max-w-sm shadow-lg"
      />
    </>
  );
};

export default ClientLayout;
