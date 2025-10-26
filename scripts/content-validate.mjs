#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from "fs";
import { join, relative } from "path";
import process from "process";
import { unified } from "unified";
import remarkParse from "remark-parse";

const lessonsRoot = join(process.cwd(), "content", "lessons");

function collectMarkdownFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function headingHasImage(node) {
  if (!node || !node.children) return false;
  for (const child of node.children) {
    if (child.type === "image") return true;
    if (child.children && headingHasImage(child)) return true;
  }
  return false;
}

function nodeToText(node) {
  if (!node) return "";
  if (node.type === "text" || node.type === "inlineCode" || node.type === "code") {
    return node.value || "";
  }
  if (node.children) {
    return node.children.map(nodeToText).join(" ");
  }
  return "";
}

function validateFile(filePath, processor) {
  const relPath = relative(process.cwd(), filePath);
  const raw = readFileSync(filePath, "utf-8");
  const trimmed = raw.trim();
  const errors = [];
  const warnings = [];

  if (!trimmed.length) {
    errors.push({ path: relPath, message: "File is empty" });
    return { errors, warnings };
  }

  const tree = processor.parse(raw);
  let prevThematicBreak = false;

  for (const node of tree.children) {
    if (node.type === "heading" && node.depth === 1) {
      errors.push({
        path: relPath,
        message: `Contains H1 heading: "${nodeToText(node).trim()}"`,
      });
    }

    if (node.type === "heading" && headingHasImage(node)) {
      warnings.push({
        path: relPath,
        message: `Image detected inside heading: "${nodeToText(node).trim()}"`,
      });
    }

    if (node.type === "thematicBreak") {
      if (prevThematicBreak) {
        warnings.push({
          path: relPath,
          message: "Multiple horizontal rules in a row",
        });
      }
      prevThematicBreak = true;
    } else if (node.type !== "paragraph" || nodeToText(node).trim().length > 0) {
      prevThematicBreak = false;
    }
  }

  return { errors, warnings };
}

function main() {
  try {
    const stats = statSync(lessonsRoot);
    if (!stats.isDirectory()) {
      console.error(`Lessons directory not found: ${lessonsRoot}`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`Lessons directory not found: ${lessonsRoot}`);
    process.exit(1);
  }

  const files = collectMarkdownFiles(lessonsRoot);
  const processor = unified().use(remarkParse);
  const allErrors = [];
  const allWarnings = [];

  for (const file of files) {
    const { errors, warnings } = validateFile(file, processor);
    allErrors.push(...errors);
    allWarnings.push(...warnings);
  }

  if (allErrors.length) {
    console.error("Validation errors:");
    for (const error of allErrors) {
      console.error(`  - ${error.path}: ${error.message}`);
    }
  }

  if (allWarnings.length) {
    console.warn("Warnings:");
    for (const warning of allWarnings) {
      console.warn(`  - ${warning.path}: ${warning.message}`);
    }
  }

  console.log(`Checked ${files.length} lesson files.`);
  console.log(`Errors: ${allErrors.length}`);
  console.log(`Warnings: ${allWarnings.length}`);

  if (allErrors.length) {
    process.exit(1);
  }
}

main();
