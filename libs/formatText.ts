/**
 * Secure text formatter: CSV plain text → sanitized HTML
 *
 * Security layers:
 * 1. Full HTML escaping of input
 * 2. Controlled replacements only
 * 3. Whitelist of allowed tags: p, br, ul, ol, li, a, strong, em
 * 4. Fallback: return escaped plaintext on error
 *
 * Target: ≥95% first-hit quality on PW CSV data
 */

/**
 * Escape all HTML entities
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Extract hostname from URL for link labels
 */
function extractHostname(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, "");
  } catch {
    return url.slice(0, 30) + "...";
  }
}

/**
 * Normalize whitespace and line endings
 */
function normalize(text: string): string {
  return text
    .trim()
    .replace(/\r\n/g, "\n") // CRLF → LF
    .replace(/\r/g, "\n") // CR → LF
    .replace(/ +/g, " ") // Multiple spaces → single
    .replace(/ $/gm, ""); // Trailing spaces per line
}

/**
 * Convert plain text to safe HTML with structure and formatting
 *
 * @param text Raw CSV text
 * @returns Sanitized HTML string (safe for dangerouslySetInnerHTML)
 */
export function formatSimple(text: string): string {
  try {
    if (!text) return "";

    // Step 1: Full escaping (security baseline)
    let html = escapeHtml(text);

    // Step 2: Normalize
    html = normalize(html);

    // Step 3: Replace CSV double-quotes with strong tags (before other processing)
    // Pattern: ""Text"" → <strong>Text</strong>
    html = html.replace(
      /&quot;&quot;([^&]+?)&quot;&quot;/g,
      "<strong>$1</strong>",
    );

    // Step 4: Convert URLs to links (before paragraph splitting)
    // Match https?://... but avoid already-tagged content
    html = html.replace(/(?<!href=&quot;)(https?:\/\/[^\s<]+)/g, (match) => {
      const url = match.replace(/&amp;/g, "&"); // Unescape URL
      const hostname = extractHostname(url);
      return `<a href="${url}" target="_blank" rel="noopener nofollow">${hostname}</a>`;
    });

    // Step 5: Split into blocks (double newline = paragraph boundary)
    const blocks = html.split(/\n\n+/);
    const processedBlocks: string[] = [];

    for (let block of blocks) {
      block = block.trim();
      if (!block) continue;

      const lines = block.split("\n");

      // Detect list blocks
      const isUnorderedList = lines.every((line) =>
        /^[•\-*]\s/.test(line.trim()),
      );
      const isOrderedList = lines.every((line) =>
        /^\d+[\.\)]\s/.test(line.trim()),
      );

      if (isUnorderedList) {
        // Unordered list
        const items = lines
          .map((line) => line.replace(/^[•\-*]\s+/, "").trim())
          .filter((item) => item)
          .map((item) => `<li>${item}</li>`)
          .join("");
        processedBlocks.push(`<ul>${items}</ul>`);
      } else if (isOrderedList) {
        // Ordered list
        const items = lines
          .map((line) => line.replace(/^\d+[\.\)]\s+/, "").trim())
          .filter((item) => item)
          .map((item) => `<li>${item}</li>`)
          .join("");
        processedBlocks.push(`<ol>${items}</ol>`);
      } else {
        // Regular paragraph
        // Single newlines within paragraph → <br/>
        const content = lines.join("<br/>\n");
        processedBlocks.push(`<p>${content}</p>`);
      }
    }

    return processedBlocks.join("\n");
  } catch (error) {
    // Fallback: return escaped plaintext (no formatting but safe)
    console.error("formatSimple error:", error);
    return `<p>${escapeHtml(text)}</p>`;
  }
}

/**
 * Extract plain text teaser (first N chars without HTML)
 * For module overview cards
 */
export function extractTeaser(html: string, maxLength: number = 160): string {
  try {
    // Remove all HTML tags
    const plainText = html
      .replace(/<[^>]+>/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();

    if (plainText.length <= maxLength) {
      return plainText;
    }

    // Cut at word boundary
    const truncated = plainText.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "…";
  } catch {
    return "";
  }
}
