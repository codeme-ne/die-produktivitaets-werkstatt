import type { MDXComponents } from "mdx/types";
import React from "react";
import Checklist from "@/components/Checklist";
import Quiz from "@/components/Quiz";
import Reveal from "@/components/Reveal";
import PromptBuilder from "@/components/PromptBuilder";
import ChunkVisualizer from "@/components/ChunkVisualizer";
import RandomIdea from "@/components/RandomIdea";

/**
 * MDX components for styling lesson content
 */
export const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mb-6 mt-8 first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold mb-4 mt-8">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-bold mb-3 mt-6">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed text-base-content/90">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 ml-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">{children}</ol>
  ),
  li: ({ children }) => <li className="text-base-content/90">{children}</li>,
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");

    if (isBlock) {
      return (
        <code
          className={`${className} block bg-base-300 p-4 rounded-lg overflow-x-auto mb-4 text-sm`}
        >
          {children}
        </code>
      );
    }

    return (
      <code className="bg-base-300 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-base-300 p-4 rounded-lg overflow-x-auto mb-4">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-base-content/80">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-primary hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-base-300" />,
  strong: ({ children }) => (
    <strong className="font-bold text-base-content">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  // Make custom callouts available directly in MDX without import
  Tip,
  Warning,
  Note,
  // Interactive checklist component
  Checklist,
  // Interactive learning widgets
  Quiz,
  Reveal,
  PromptBuilder,
  ChunkVisualizer,
  RandomIdea,
};

/**
 * Custom callout components for MDX content
 */
export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="alert alert-info my-4" role="note">
      <svg
        className="w-6 h-6 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>{children}</div>
    </div>
  );
}

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="alert alert-warning my-4" role="alert">
      <svg
        className="w-6 h-6 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <div>{children}</div>
    </div>
  );
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="alert my-4" role="note">
      <svg
        className="w-6 h-6 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
        />
      </svg>
      <div>{children}</div>
    </div>
  );
}
