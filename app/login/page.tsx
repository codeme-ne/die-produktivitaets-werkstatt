"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ButtonCheckout from "@/components/ButtonCheckout";

type Status = "idle" | "loading" | "success" | "not_found" | "error";

const ERROR_MESSAGES: Record<string, string> = {
  no_token: "Kein Token gefunden. Bitte fordere einen neuen Link an.",
  expired: "Der Link ist abgelaufen. Bitte fordere einen neuen an.",
  used: "Dieser Link wurde bereits verwendet.",
  invalid: "Ungültiger Link. Bitte fordere einen neuen an.",
  no_access: "Kein Zugang gefunden.",
  server: "Ein Fehler ist aufgetreten. Bitte versuche es erneut.",
};

// Decorative underline matching landing page
function WavyUnderline({ width = 80 }: { width?: number }) {
  return (
    <svg
      width={width}
      height="12"
      viewBox={`0 0 ${width} 12`}
      className="text-info"
      aria-hidden="true"
    >
      <path
        d={`M2 4 Q${width / 2} 10 ${width - 2} 4`}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M2 8 Q${width / 2} 2 ${width - 2} 8`}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
      } else if (data.error === "not_found") {
        setStatus("not_found");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Ein Fehler ist aufgetreten.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Verbindungsfehler. Bitte versuche es erneut.");
    }
  };

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      {/* Main Card */}
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body p-8 md:p-10">
            {/* Error from URL params */}
            {errorParam &&
              ERROR_MESSAGES[errorParam] &&
              status === "idle" && (
                <div className="alert alert-warning mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{ERROR_MESSAGES[errorParam]}</span>
                </div>
              )}

            {/* Success State */}
            {status === "success" && (
              <div className="text-center py-6">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="font-display text-2xl font-bold text-base-content mb-3">
                  Check dein Postfach!
                </h2>
                <div className="flex justify-center mb-4">
                  <WavyUnderline width={60} />
                </div>
                <p className="text-base-content/70">
                  Wir haben dir einen Login-Link an{" "}
                  <span className="font-semibold text-base-content">
                    {email}
                  </span>{" "}
                  geschickt.
                </p>
                <div className="badge badge-ghost mt-6">
                  Der Link ist 15 Minuten gültig
                </div>
              </div>
            )}

            {/* Not Found State - Show Checkout */}
            {status === "not_found" && (
              <div className="py-4">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-warning/20 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-warning"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-base-content mb-3">
                    Kein Zugang gefunden
                  </h2>
                  <div className="flex justify-center mb-4">
                    <WavyUnderline width={60} />
                  </div>
                  <p className="text-base-content/70">
                    Die E-Mail{" "}
                    <span className="font-semibold text-base-content">
                      {email}
                    </span>{" "}
                    hat keinen Zugang zur Produktivitäts-Werkstatt.
                  </p>
                </div>

                <div className="divider text-base-content/50 text-sm">
                  Jetzt Zugang sichern
                </div>

                <ButtonCheckout />

                <div className="text-center mt-6">
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setEmail("");
                    }}
                    className="btn btn-ghost btn-sm"
                  >
                    ← Andere E-Mail versuchen
                  </button>
                </div>
              </div>
            )}

            {/* Form */}
            {(status === "idle" ||
              status === "loading" ||
              status === "error") && (
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl font-bold text-base-content mb-2">
                    Willkommen zurück
                  </h2>
                  <div className="flex justify-center mb-4">
                    <WavyUnderline width={80} />
                  </div>
                  <p className="text-base-content/70">
                    Gib deine E-Mail ein und wir senden dir einen Login-Link.
                  </p>
                </div>

                {status === "error" && (
                  <div className="alert alert-error mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text font-medium">
                      E-Mail-Adresse
                    </span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="deine@email.de"
                    className="input input-bordered input-lg w-full focus:input-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full mt-6 group"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <span className="loading loading-spinner loading-md"></span>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Login-Link anfordern
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Footer */}
            {status !== "not_found" && (
              <div className="text-center mt-8 pt-6 border-t border-base-300">
                <p className="text-sm text-base-content/60">
                  Noch kein Zugang?{" "}
                  <Link href="/#pricing" className="link link-primary font-medium">
                    Jetzt kaufen
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
