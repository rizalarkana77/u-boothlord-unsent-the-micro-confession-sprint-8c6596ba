// SPDX-License-Identifier: MIT
// Unsent: The Micro-Confession Sprint — entry program (Node 22, standard library only).
//
// The entry is one micro-confession in exactly two parts: a "To:" line naming
// who it was meant for, and the unsent message itself, one line written exactly
// as it was typed, with no explanation after it. The program writes it,
// verbatim and deterministically, to entry.txt in the output directory, then
// reads the file back and verifies the bytes it wrote. No network, no
// randomness, no clock.
//
// Gate (from the competition rules): /output/entry.txt must be UTF-8 text of
// 1 to 260 characters, not only white space. This entry is 153 characters,
// and its message line is 138 characters (the judge brief caps the message
// line at 200 characters).
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

// To: my stepdad — a role, not a real full name or handle.
// The message is one line, typed as it was typed: eleven years of calling
// him by his first name, and the reason it stayed unsent — saying "Dad"
// felt like betraying the man who left before the writer could spell his
// name. The To: line and the message need each other: without "stepdad",
// the first-name detail and the betrayal have no anchor.
const ENTRY = [
  'To: my stepdad',
  'I called you by your first name for eleven years because calling you Dad felt like betraying a man who left before I could spell his name.',
].join('\n');

function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 260) {
    throw new Error(`entry must be 1-260 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error('entry must not be only white space');
  }
  const lines = text.split('\n');
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, got ${lines.length}`);
  }
  if (!lines[0].startsWith('To: ')) {
    throw new Error('first line must be a "To:" line naming who it was meant for');
  }
  if (lines[0].slice(4).trim().length === 0) {
    throw new Error('the "To:" line must actually name someone');
  }
  if (text.endsWith('\n') || text.includes('\r')) {
    throw new Error('entry must have no trailing newline and no carriage returns');
  }
  if (lines[1].length > 200) {
    throw new Error(`message line must be at most 200 characters, got ${lines[1].length}`);
  }
  if (!/[.!?]$/.test(lines[1].trim())) {
    throw new Error('message line must end with sentence punctuation');
  }
  // The entry is plain ASCII here, but the gate is about UTF-8 text: verify
  // the text survives a UTF-8 encode/decode round trip byte for byte.
  if (Buffer.from(text, 'utf8').toString('utf8') !== text) {
    throw new Error('entry must be valid UTF-8 text');
  }
  for (const line of lines) {
    if (line.trim().length === 0) {
      throw new Error('each line must be non-empty');
    }
  }
}

validate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.txt');
writeFileSync(outPath, ENTRY, 'utf8');

// Read back and verify: the bytes on disk must be exactly the entry.
const readBack = readFileSync(outPath, 'utf8');
if (readBack !== ENTRY) {
  throw new Error('read-back verification failed: entry.txt differs from the entry');
}

console.log(`wrote ${outPath} (${[...ENTRY].length} characters)`);
console.log(`sha256: ${createHash('sha256').update(ENTRY, 'utf8').digest('hex')}`);
