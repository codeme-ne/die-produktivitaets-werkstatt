#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function run(cmd, args, env = {}) {
  const res = spawnSync(cmd, args, { stdio: 'inherit', env: { ...process.env, ...env } });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

// 1) Content lint (image placeholders)
run('npm', ['run', 'lint:content']);

// 2) Conditionally sync video metadata from Bunny Stream
let API_KEY = process.env.BUNNY_VIDEO_API_KEY;
if (!API_KEY) {
  try {
    const envPath = join(process.cwd(), '.env.local');
    if (existsSync(envPath)) {
      const txt = readFileSync(envPath, 'utf-8');
      const m = txt.match(/^BUNNY_VIDEO_API_KEY=(.*)$/m);
      if (m) API_KEY = m[1].trim();
    }
  } catch {}
}

if (API_KEY) {
  console.log('BUNNY_VIDEO_API_KEY detected: syncing video metadata...');
  run('npm', ['run', 'videos:sync-meta'], { BUNNY_VIDEO_API_KEY: API_KEY });
} else {
  console.log('No BUNNY_VIDEO_API_KEY set; skipping video meta sync.');
}
