#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from "fs";
import { basename, dirname, join, resolve } from "path";
import process from "process";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import levenshtein from "fast-levenshtein";

const DEFAULT_SOURCE = "docs/PW_ Videobeschreibungen Circle Modul 1-12(1).md";
const DEFAULT_CSV = "docs/Google Sheets PW-Videobeschreibungen-2025-Transfer - Tabellenblatt1.csv";
const LESSON_REGEX = /^lesson\s+\d+\s+of\s+\d+$/i;
const H1 = 1;
const H2 = 2;

function parseArgs(argv) {
  const options = {
    dryRun: true,
    write: false,
    overwrite: true,
    source: DEFAULT_SOURCE,
    csv: DEFAULT_CSV,
    modules: null,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === "--write") {
      options.write = true;
      options.dryRun = false;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
      options.write = false;
    } else if (arg === "--overwrite") {
      options.overwrite = true;
    } else if (arg === "--no-overwrite") {
      options.overwrite = false;
    } else if (arg === "--source") {
      options.source = argv[++i];
    } else if (arg.startsWith("--source=")) {
      options.source = arg.split("=")[1];
    } else if (arg === "--csv") {
      options.csv = argv[++i];
    } else if (arg.startsWith("--csv=")) {
      options.csv = arg.split("=")[1];
    } else if (arg === "--module") {
      options.modules = argv[++i];
    } else if (arg.startsWith("--module=")) {
      options.modules = arg.split("=")[1];
    } else {
      console.warn(`Unrecognized argument: ${arg}`);
    }
  }

  if (!options.source) options.source = DEFAULT_SOURCE;
  if (!options.csv) options.csv = DEFAULT_CSV;

  if (options.modules) {
    options.moduleSet = new Set(
      options.modules
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    );
  } else {
    options.moduleSet = null;
  }

  return options;
}

function moduleSlug(num) {
  return `modul-${num.toString().padStart(2, "0")}`;
}

function slugifyTitle(title) {
  return title
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseModuleLesson(value) {
  const moduleMatch = value.match(/W(\d+)/i);
  const lessonMatch = value.match(/L(\d+)/i);

  return {
    module: moduleMatch ? parseInt(moduleMatch[1], 10) : null,
    lesson: lessonMatch ? parseInt(lessonMatch[1], 10) : null,
  };
}

function normalizeTitle(title) {
  if (!title) return "";
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ä]/g, "ae")
    .replace(/[ö]/g, "oe")
    .replace(/[ü]/g, "ue")
    .replace(/[ß]/g, "ss")
    .replace(/["'*_`~:;!?.,()[\]{}<>]/g, " ")
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCSV(content) {
  const rows = [];
  let currentRow = [];
  let currentCell = "";
  let insideQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        i++;
      }
      currentRow.push(currentCell.trim());
      if (currentRow.some((cell) => cell.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = "";
    } else {
      currentCell += char;
    }
  }

  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }

  return rows;
}

function readCsvFile(path) {
  const csvContent = readFileSync(path, "utf-8");
  const rows = parseCSV(csvContent);
  if (!rows.length) return [];

  const [header, ...data] = rows;
  const hasShortTitle = header.includes("Kurztitel");

  return data
    .filter((row) => row[0])
    .map((row) => {
      const meta = parseModuleLesson(row[0] || "");
      const moduleNumber = meta.module;
      const lessonNumber = meta.lesson;
      const moduleSlugValue = moduleNumber ? moduleSlug(moduleNumber) : "";
      const title = row[1] || "";
      const slug = slugifyTitle(title) || (lessonNumber ? `lektion-${lessonNumber}` : "lektion");
      const description = row[3] || "";
      const linksStartIndex = hasShortTitle ? 5 : 4;
      const links = row.slice(linksStartIndex).filter((value) => value && value.startsWith("http"));

      return {
        raw: row,
        moduleNumber,
        moduleSlug: moduleSlugValue,
        lessonNumber,
        title,
        slug,
        videoUrl: row[2] || "",
        csvDescription: description,
        normalizedTitle: normalizeTitle(title),
        links,
      };
    });
}

function nodeToPlainText(node) {
  if (!node) return "";
  switch (node.type) {
    case "text":
    case "inlineCode":
    case "code":
      return node.value || "";
    case "strong":
    case "emphasis":
      return (node.children || []).map(nodeToPlainText).join("");
    case "link":
    case "linkReference":
      return (node.children || []).map(nodeToPlainText).join("");
    case "heading":
    case "paragraph":
    case "blockquote":
    case "listItem":
    case "list":
      return (node.children || []).map(nodeToPlainText).join(" ");
    case "break":
      return " ";
    default:
      if (Array.isArray(node)) {
        return node.map(nodeToPlainText).join(" ");
      }
      if (node.children) {
        return node.children.map(nodeToPlainText).join(" ");
      }
      return "";
  }
}

function nodesToPlainText(nodes) {
  return nodes.map(nodeToPlainText).join(" ").replace(/\s+/g, " ").trim();
}

function isLessonMarkerNode(node) {
  if (!node || node.type !== "paragraph") return false;
  const value = nodeToPlainText(node).trim();
  return LESSON_REGEX.test(value);
}

function cloneNodes(nodes) {
  return JSON.parse(JSON.stringify(nodes));
}

function transformNode(node) {
  if (!node) return null;

  if (node.type === "heading" && node.depth === H1) {
    node.depth = H2;
  }

  if (node.children) {
    node.children = node.children
      .map((child) => transformNode(child))
      .filter((child) => child !== null);
  }

  if (node.type === "paragraph") {
    const text = nodeToPlainText(node).trim();
    if (!text) {
      return node;
    }
    if (LESSON_REGEX.test(text.toLowerCase())) {
      return null;
    }
  }

  return node;
}

function isEmptyParagraph(node) {
  if (!node || node.type !== "paragraph") return false;
  return nodeToPlainText(node).trim().length === 0;
}

function prepareNodesForOutput(nodes) {
  const cloned = cloneNodes(nodes).map((node) => transformNode(node)).filter(Boolean);
  const cleaned = [];
  let lastWasHr = false;

  for (const node of cloned) {
    if (node.type === "thematicBreak") {
      if (lastWasHr) continue;
      lastWasHr = true;
      cleaned.push(node);
      continue;
    }

    lastWasHr = false;
    cleaned.push(node);
  }

  while (cleaned.length && isEmptyParagraph(cleaned[0])) cleaned.shift();
  while (cleaned.length && isEmptyParagraph(cleaned[cleaned.length - 1])) cleaned.pop();

  return cleaned;
}

function stringifyNodes(nodes) {
  const tree = { type: "root", children: nodes };
  const content = unified()
    .use(remarkStringify, { bullet: "-" })
    .stringify(tree);

  return content
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .concat("\n");
}

function parseMarkdownBlocks(markdown) {
  const tree = unified().use(remarkParse).parse(markdown);
  const blocks = [];
  let current = null;

  function finalize() {
    if (!current) return;
    const nodes = current.nodes || [];
    if (!nodes.length) {
      current = null;
      return;
    }
    const headingText = current.headingText || (current.headingNode ? nodeToPlainText(current.headingNode).trim() : "");
    blocks.push({
      id: blocks.length,
      heading: headingText,
      normalizedHeading: normalizeTitle(headingText),
      nodes,
      plainText: nodesToPlainText(nodes),
    });
    current = null;
  }

  for (const node of tree.children) {
    if (isLessonMarkerNode(node)) {
      finalize();
      current = { nodes: [], headingNode: null, headingText: "" };
      continue;
    }

    if (node.type === "heading" && node.depth <= H2) {
      if (!current) {
        current = { nodes: [], headingNode: null, headingText: "" };
      } else if (current.headingNode) {
        finalize();
        current = { nodes: [], headingNode: null, headingText: "" };
      }

      current.headingNode = node;
      current.headingText = nodeToPlainText(node).trim();
      current.nodes.push(node);
      continue;
    }

    if (!current) {
      // Skip nodes until we hit a heading or lesson marker
      continue;
    }

    current.nodes.push(node);
  }

  finalize();
  return blocks;
}

function computeScore(a, b) {
  if (!a || !b) return 0;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  const distance = levenshtein.get(a, b);
  return Math.max(0, 1 - distance / maxLen);
}

function formatCsvFallback(title, description) {
  const heading = title ? `## ${title}` : "## Lektion";
  let content = (description || "")
    .replace(/\r\n/g, "\n")
    .replace(/""/g, '"')
    .replace(/[\u2022•]\s*/g, "- ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (content) {
    return `${heading}\n\n${content}\n`;
  }
  return `${heading}\n`;
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function backupFile(targetPath, timestamp) {
  if (!existsSync(targetPath)) return null;
  const backupPath = `${targetPath}.bak.${timestamp}`;
  copyFileSync(targetPath, backupPath);
  return backupPath;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const sourcePath = resolve(process.cwd(), options.source);
  const csvPath = resolve(process.cwd(), options.csv);

  if (!existsSync(sourcePath)) {
    console.error(`Source markdown not found: ${sourcePath}`);
    process.exit(1);
  }
  if (!existsSync(csvPath)) {
    console.error(`CSV not found: ${csvPath}`);
    process.exit(1);
  }

  const csvRows = readCsvFile(csvPath).filter((row) => {
    if (!row.moduleSlug) return false;
    if (options.moduleSet && !options.moduleSet.has(row.moduleSlug)) {
      return false;
    }
    return true;
  });

  const markdownContent = readFileSync(sourcePath, "utf-8");
  const markdownBlocks = parseMarkdownBlocks(markdownContent);

  const unmatchedBlocks = new Set(markdownBlocks.map((block) => block.id));

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const lessonsDir = resolve(process.cwd(), "content", "lessons");
  const summary = [];
  const lowConfidence = [];

  let matchedHigh = 0;
  let matchedLow = 0;
  let csvFallback = 0;

  for (const row of csvRows) {
    let bestMatch = null;

    for (const block of markdownBlocks) {
      if (!unmatchedBlocks.has(block.id)) continue;
      if (!block.normalizedHeading) continue;
      const score = computeScore(row.normalizedTitle, block.normalizedHeading);
      if (!bestMatch || score > bestMatch.score) {
        bestMatch = { block, score };
      }
    }

    const targetDir = join(lessonsDir, row.moduleSlug);
    const targetPath = join(targetDir, `${row.slug}.md`);

    let content = "";
    let source = "csv";
    let confidence = 0;
    let matchedHeading = null;

    if (bestMatch && bestMatch.score >= 0.7) {
      unmatchedBlocks.delete(bestMatch.block.id);
      const nodes = prepareNodesForOutput(bestMatch.block.nodes);
      content = stringifyNodes(nodes);
      source = "md";
      confidence = Number(bestMatch.score.toFixed(4));
      matchedHeading = bestMatch.block.heading;

      if (bestMatch.score < 0.8) {
        matchedLow++;
        lowConfidence.push({
          module: row.moduleSlug,
          lesson: row.slug,
          title: row.title,
          heading: matchedHeading,
          confidence,
          reason: "score-below-0.8",
          targetPath: targetPath.replace(`${process.cwd()}/`, ""),
        });
      } else {
        matchedHigh++;
      }
    } else {
      csvFallback++;
      content = formatCsvFallback(row.title, row.csvDescription);
      confidence = bestMatch ? Number(bestMatch.score.toFixed(4)) : 0;
      if (confidence < 0.8) {
        lowConfidence.push({
          module: row.moduleSlug,
          lesson: row.slug,
          title: row.title,
          heading: matchedHeading,
          confidence,
          reason: "csv-fallback",
          targetPath: targetPath.replace(`${process.cwd()}/`, ""),
        });
      }
    }

    if (options.write) {
      ensureDir(targetDir);
      if (existsSync(targetPath) && options.overwrite) {
        backupFile(targetPath, timestamp);
      }
      if (!existsSync(targetPath) || options.overwrite) {
        writeFileSync(targetPath, content, "utf-8");
      }
    }

    const lines = content.trimEnd().split(/\r?\n/).length;
    summary.push({
      module: row.moduleSlug,
      lesson: row.slug,
      title: row.title,
      source,
      confidence,
      heading: matchedHeading,
      targetPath: targetPath.replace(`${process.cwd()}/`, ""),
      lines,
    });
  }

  ensureDir(resolve(process.cwd(), "reports"));
  const summaryPath = resolve(process.cwd(), "reports", "extract-summary.json");
  writeFileSync(summaryPath, JSON.stringify(summary, null, 2), "utf-8");

  const lowConfidencePath = resolve(process.cwd(), "reports", "low-confidence.json");
  writeFileSync(lowConfidencePath, JSON.stringify(lowConfidence, null, 2), "utf-8");

  console.log("Content extraction report");
  console.log(`  Lessons processed: ${summary.length}`);
  console.log(`  MD matches (>=0.80): ${matchedHigh}`);
  console.log(`  MD matches (0.70-0.79): ${matchedLow}`);
  console.log(`  CSV fallbacks: ${csvFallback}`);
  console.log(`  Reports written: ${summaryPath}, ${lowConfidencePath}`);

  if (options.write) {
    console.log("Files written to content/lessons; backups suffixed with .bak.<timestamp> where applicable.");
  } else {
    console.log("Dry run; no lesson files written.");
  }
}

main();
