import { ReactNode } from "react";
import { Fraunces, Source_Serif_4 } from "next/font/google";
import { Viewport } from "next";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import { ThemeProvider } from "./ThemeProvider";
import "./globals.css";

// Display font - Fraunces: Elegant, characterful serif for headings
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

// Body font - Source Serif 4: Readable, warm serif for body text
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  // Warm honey color for browser theme
  themeColor: "#C9A227",
  width: "device-width",
  initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

// Default theme that will be used during SSR and initial render
const defaultTheme = 'werkstatt';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${sourceSerif.variable}`}
      data-theme={defaultTheme}
      suppressHydrationWarning
    >
      <body className="font-body antialiased">
        {/* Theme initialization script - only runs on client side */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  if (stored && (stored === 'werkstatt' || stored === 'werkstatt-dark')) {
                    document.documentElement.setAttribute('data-theme', stored);
                  } else {
                    // Check system preference
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.setAttribute('data-theme', prefersDark ? 'werkstatt-dark' : 'werkstatt');
                  }
                } catch (e) {
                  // If there's an error, the default theme will be used
                }
              })();
            `,
          }}
        />
        {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
