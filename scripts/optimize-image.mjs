#!/usr/bin/env node
/**
 * Image optimization script using sharp
 * Converts images to WebP with high quality compression
 */

import sharp from 'sharp';
import { existsSync, statSync, unlinkSync, renameSync } from 'fs';
import { basename, dirname, join, extname } from 'path';

const inputPath = process.argv[2];
const replaceOriginal = process.argv[3] === '--replace';

if (!inputPath) {
  console.error('Usage: node scripts/optimize-image.mjs <image-path> [--replace]');
  console.error('  --replace: Replace original with optimized WebP version');
  process.exit(1);
}

if (!existsSync(inputPath)) {
  console.error(`File not found: ${inputPath}`);
  process.exit(1);
}

const originalSize = statSync(inputPath).size;
const dir = dirname(inputPath);
const ext = extname(inputPath);
const name = basename(inputPath, ext);

// Output path - clean name without double extensions
const webpPath = join(dir, `${name}.webp`);

console.log(`\n📁 Original: ${inputPath}`);
console.log(`   Size: ${(originalSize / 1024 / 1024).toFixed(2)} MB\n`);

async function optimize() {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  console.log(`📐 Dimensions: ${metadata.width} x ${metadata.height}`);
  console.log(`   Format: ${metadata.format}\n`);

  // Create WebP version (best compression)
  console.log('🔄 Creating WebP version...');
  await sharp(inputPath)
    .webp({ quality: 85, effort: 6 })
    .toFile(webpPath);
  
  const webpSize = statSync(webpPath).size;
  const webpReduction = ((1 - webpSize / originalSize) * 100).toFixed(1);
  console.log(`   ✅ ${webpPath}`);
  console.log(`   Size: ${(webpSize / 1024).toFixed(0)} KB (${webpReduction}% smaller)\n`);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Summary:');
  console.log(`   Original:  ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   WebP:      ${(webpSize / 1024).toFixed(0)} KB  ⭐ (${webpReduction}% smaller)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  return { webpPath, webpSize };
}

optimize().catch(console.error);
