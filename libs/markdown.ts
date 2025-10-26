import { unified } from "unified";
import remarkParse from "remark-parse";
import type { Root, Content } from "mdast";

const processor = unified().use(remarkParse);

function nodeToPlainText(node: Content | Root): string {
  if (node.type === "text" || node.type === "inlineCode" || node.type === "code") {
    return node.value || "";
  }

  if ("children" in node && node.children) {
    return node.children.map((child) => nodeToPlainText(child as Content)).join(" ");
  }

  return "";
}

function sanitize(value: string): string {
  return value
    .replace(/[\u0000-\u001f]/g, "")
    .replace(/\s+/g, " ")
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}\p{Emoji_Component}\u200d\uFE0F]/gu, "")
    .replace(/[^\p{Letter}\p{Number}\s.,;:!?()"'\-]/gu, "")
    .trim();
}

export function toPlainText(markdown: string, maxLen = 160): string {
  if (!markdown) return "";

  const tree = processor.parse(markdown) as Root;
  const rawText = nodeToPlainText(tree);
  const clean = sanitize(rawText);

  if (!clean.length) return "";

  if (clean.length <= maxLen) {
    return clean;
  }

  const truncated = clean.slice(0, maxLen).trimEnd();
  return `${truncated}…`;
}
