/**
 * CSV parser for PW course data
 * Handles UTF-8, quotes, commas in cells
 */

import { readFileSync } from "fs";
import { join } from "path";

export interface CsvRow {
  Dateiname: string;
  Titel: string;
  Videos: string;
  Beschreibung: string;
  Kurztitel?: string; // Shortened title for sidebar (≤40 chars)
  Links: string[];
}

/**
 * Parse CSV with proper quote and comma handling
 */
function parseCSV(content: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = "";
  let insideQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote
        currentCell += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote mode
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      // End of cell
      currentRow.push(currentCell.trim());
      currentCell = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      // End of row
      if (char === "\r" && nextChar === "\n") {
        i++; // Skip \n in \r\n
      }
      if (currentCell || currentRow.length > 0) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
        currentRow = [];
        currentCell = "";
      }
    } else {
      currentCell += char;
    }
  }

  // Push last row if exists
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }

  return rows;
}

/**
 * Read and parse PW CSV file
 */
export function readPwCsv(): CsvRow[] {
  const csvPath = join(
    process.cwd(),
    "docs",
    "Google Sheets PW-Videobeschreibungen-2025-Transfer - Tabellenblatt1.csv",
  );

  const content = readFileSync(csvPath, "utf-8");
  const rows = parseCSV(content);

  if (rows.length === 0) return [];

  // First row is header
  const [header, ...dataRows] = rows;

  return dataRows
    .filter((row) => row[0]) // Skip empty rows
    .map((row) => {
      // Collect all link columns (index 5 onwards, after Kurztitel)
      const links = row
        .slice(5)
        .filter((link) => link && link.startsWith("http"));

      return {
        Dateiname: row[0] || "",
        Titel: row[1] || "",
        Videos: row[2] || "",
        Beschreibung: row[3] || "",
        Kurztitel: row[4] || "", // New: shortened title
        Links: links,
      };
    });
}
