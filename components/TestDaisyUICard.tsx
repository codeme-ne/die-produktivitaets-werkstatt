"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Test-Komponente für DaisyUI 5 MCP Setup
 * Demonstriert neue v5 Features: btn-soft, btn-dash, card-border
 *
 * Generated with Context7 MCP & DaisyUI GitMCP
 */
export default function TestDaisyUICard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold">DaisyUI 5 MCP Test</h2>

      {/* Card mit neuen v5 Klassennamen */}
      <div className="card bg-base-100 w-96 card-border shadow-sm">
        <figure className="relative w-full h-48">
          <Image
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Test Card"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 384px"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">DaisyUI 5 Test Card</h2>
          <p>
            Diese Card verwendet die neuen v5 Klassennamen: card-border (statt
            card-bordered)
          </p>

          <div className="card-actions justify-end gap-2">
            {/* Neue v5 Button Styles */}
            <button className="btn btn-soft">Soft Button</button>
            <button className="btn btn-dash">Dash Button</button>
            <button
              className="btn btn-primary"
              onClick={() => setModalOpen(true)}
            >
              Open Modal
            </button>
          </div>
        </div>
      </div>

      {/* Modal mit HTML Dialog Element (v5 Best Practice) */}
      {modalOpen && (
        <dialog
          id="test_modal"
          className="modal modal-open"
          onClick={() => setModalOpen(false)}
        >
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold">Modal Test</h3>
            <p className="py-4">
              Dieses Modal verwendet das HTML Dialog Element - Best Practice in
              DaisyUI 5!
            </p>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setModalOpen(false)} />
        </dialog>
      )}

      {/* Size Variants */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Card Size Variants (v5)</h3>

        <div className="card card-sm bg-base-100 w-96 shadow-sm">
          <div className="card-body">
            <h3 className="card-title">Small Card (card-sm)</h3>
            <p>Ersetzt card-compact aus v4</p>
          </div>
        </div>

        <div className="card card-md bg-base-100 w-96 shadow-sm">
          <div className="card-body">
            <h3 className="card-title">Medium Card (default)</h3>
            <p>Standard-Größe in DaisyUI 5</p>
          </div>
        </div>

        <div className="card card-lg bg-base-100 w-96 shadow-sm">
          <div className="card-body">
            <h3 className="card-title">Large Card (card-lg)</h3>
            <p>Größere Variante für Hero-Sections</p>
          </div>
        </div>
      </div>

      {/* Badge Examples */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Badge Variants (v5)</h3>
        <div className="flex gap-2">
          <span className="badge badge-primary">Primary</span>
          <span className="badge badge-soft">Soft Badge</span>
          <span className="badge badge-dash">Dash Badge</span>
        </div>
      </div>
    </div>
  );
}
