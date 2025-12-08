/**
 * RichText Component
 *
 * Renders Markdown content with sanitization and styling.
 *
 * Features:
 * - Markdown → HTML parsing (markdown-it)
 * - HTML sanitization with whitelist (isomorphic-dompurify)
 * - SSR-safe (deterministic, no client-only logic)
 * - Underline support via <u> tag
 * - Tailwind styling
 *
 * Whitelist: p, strong, em, u, a, ul, ol, li, h1, h2, h3, br, hr, img, blockquote, details, summary
 */

import MarkdownIt from "markdown-it";
import DOMPurify from "isomorphic-dompurify";

interface Props {
  content: string;
  className?: string;
}

// Initialize markdown-it with deterministic config (SSR-safe)
const md = new MarkdownIt({
  html: true, // Allow HTML tags (will be sanitized)
  linkify: true, // Auto-convert URLs to links
  typographer: false, // Disable smart quotes (keep deterministic)
  breaks: true, // Convert \n to <br>
});

/**
 * Sanitize HTML with whitelist and security rules
 */
function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "strong",
      "em",
      "u", // Text formatting
      "a", // Links
      "ul",
      "ol",
      "li", // Lists
      "h1",
      "h2",
      "h3", // Headings
      "br", // Line breaks
      "hr", // Horizontal rule
      "img", // Images
      "blockquote", // Quotes / examples
      "details",
      "summary", // Toggle sections
    ],
    ALLOWED_ATTR: [
      // Links
      "href",
      "rel",
      "target",
      // Images
      "src",
      "alt",
      "title",
      "width",
      "height",
      "loading",
      "decoding",
    ],
    ALLOW_DATA_ATTR: false, // No data-* attributes
    ADD_ATTR: ["rel"], // Ensure rel is always added
  });
}

/**
 * Add security attributes to external links
 */
function processLinks(html: string): string {
  return html.replace(/<a\s+href="([^"]+)"([^>]*)>/gi, (match, href, rest) => {
    const isExternal =
      href.startsWith("http://") || href.startsWith("https://");
    const rel = "noopener noreferrer";
    const target = isExternal ? ' target="_blank"' : "";
    return `<a href="${href}"${target} rel="${rel}"${rest}>`;
  });
}

export default function RichText({ content, className = "" }: Props) {
  if (!content || content.trim() === "") {
    return null;
  }

  try {
    // Step 1: Parse Markdown → HTML
    let html = md.render(content);

    // Step 2: Sanitize with whitelist
    html = sanitizeHtml(html);

    // Step 3: Process links (add security attributes)
    html = processLinks(html);
    // Step 3b: Enhance images with performance attributes
    html = html.replace(/<img([^>]*?)>/gi, (match, rest) => {
      let tag = `<img${rest}>`;
      if (!/\sloading=/.test(tag)) {
        tag = tag.replace(/<img/, '<img loading="lazy"');
      }
      if (!/\sdecoding=/.test(tag)) {
        tag = tag.replace(/<img/, '<img decoding="async"');
      }
      return tag;
    });

    // Step 4: Render with Tailwind styling
    return (
      <div
        className={`
          prose prose-lg max-w-none
          space-y-6
          [&_ul]:list-disc [&_ul]:list-outside [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:ml-0
          [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:ml-0
          [&_li]:text-base-content/90 [&_li]:pl-2
          [&_strong]:font-bold [&_strong]:text-base-content
          [&_em]:italic
          [&_u]:underline
          [&_a]:link [&_a]:link-primary
          [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-4
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-4
          [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-3
          [&_p]:text-base-content/90 [&_p]:leading-relaxed
          [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:bg-base-200 [&_blockquote]:rounded-r-lg [&_blockquote]:py-3
          [&_details]:border [&_details]:border-base-300 [&_details]:rounded-lg [&_details]:bg-base-200 [&_details]:p-3
          [&_details>summary]:cursor-pointer [&_details>summary]:font-semibold
          ${className}
        `}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (error) {
    // Fallback: render as plain text
    console.error("RichText render error:", error);
    return (
      <div className={`text-base-content/90 whitespace-pre-wrap ${className}`}>
        {content}
      </div>
    );
  }
}
