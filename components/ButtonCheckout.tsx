"use client";

import { useState } from "react";
import apiClient from "@/libs/api";
import { DEFAULT_PRODUCT, type CourseProduct } from "@/types/products";

/**
 * Checkout button with German legal consent checkboxes
 * Required for GDPR compliance and digital content waiver
 */
const ButtonCheckout = ({
  productType = DEFAULT_PRODUCT,
}: {
  productType?: CourseProduct;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agbAccepted, setAgbAccepted] = useState<boolean>(false);
  const [widerrufAccepted, setWiderrufAccepted] = useState<boolean>(false);

  const handlePayment = async () => {
    if (!agbAccepted || !widerrufAccepted) {
      return; // Button should be disabled, but extra safety check
    }

    setIsLoading(true);

    try {
      const { url }: { url: string } = await apiClient.post(
        "/stripe/create-checkout",
        {
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: window.location.href,
          productType,
        },
      );

      window.location.href = url;
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const canProceed = agbAccepted && widerrufAccepted;

  return (
    <div className="space-y-4">
      {/* Consent Checkboxes */}
      <div className="space-y-3 text-sm">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-primary mt-1"
            checked={agbAccepted}
            onChange={(e) => setAgbAccepted(e.target.checked)}
          />
          <span className="text-base-content/80">
            Ich habe die{" "}
            <a href="/tos" target="_blank" className="link link-primary">
              AGB
            </a>{" "}
            gelesen und akzeptiere diese sowie die{" "}
            <a
              href="/privacy-policy"
              target="_blank"
              className="link link-primary"
            >
              Datenschutzerklärung
            </a>
            .
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-primary mt-1"
            checked={widerrufAccepted}
            onChange={(e) => setWiderrufAccepted(e.target.checked)}
          />
          <span className="text-base-content/80">
            Ich stimme ausdrücklich zu, dass mit der Ausführung des Vertrags
            über digitale Inhalte vor Ablauf der Widerrufsfrist begonnen wird.
            Mir ist bekannt, dass ich dadurch mein{" "}
            <a href="/widerruf" target="_blank" className="link link-primary">
              Widerrufsrecht
            </a>{" "}
            verliere.
          </span>
        </label>
      </div>

      {/* Checkout Button */}
      <button
        className="btn btn-primary btn-block btn-lg group"
        onClick={handlePayment}
        disabled={!canProceed || isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <>
            <svg
              className="w-5 h-5 fill-primary-content group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200"
              viewBox="0 0 375 509"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M249.685 14.125C249.685 11.5046 248.913 8.94218 247.465 6.75675C246.017 4.57133 243.957 2.85951 241.542 1.83453C239.126 0.809546 236.463 0.516683 233.882 0.992419C231.301 1.46815 228.917 2.69147 227.028 4.50999L179.466 50.1812C108.664 118.158 48.8369 196.677 2.11373 282.944C0.964078 284.975 0.367442 287.272 0.38324 289.605C0.399039 291.938 1.02672 294.226 2.20377 296.241C3.38082 298.257 5.06616 299.929 7.09195 301.092C9.11775 302.255 11.4133 302.867 13.75 302.869H129.042V494.875C129.039 497.466 129.791 500.001 131.205 502.173C132.62 504.345 134.637 506.059 137.01 507.106C139.383 508.153 142.01 508.489 144.571 508.072C147.131 507.655 149.516 506.503 151.432 504.757L172.698 485.394C247.19 417.643 310.406 338.487 359.975 250.894L373.136 227.658C374.292 225.626 374.894 223.327 374.882 220.99C374.87 218.653 374.243 216.361 373.065 214.341C371.887 212.322 370.199 210.646 368.17 209.482C366.141 208.318 363.841 207.706 361.5 207.707H249.685V14.125Z" />
            </svg>
            Jetzt kaufen
          </>
        )}
      </button>

      {!canProceed && (
        <p className="text-xs text-center text-base-content/60">
          Bitte akzeptiere beide Bedingungen, um fortzufahren
        </p>
      )}
    </div>
  );
};

export default ButtonCheckout;
