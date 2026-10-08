import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, openSync, readSync, closeSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';

// Explicit authoring command, never run by the build or in the browser.
const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath || extname(inputPath).toLowerCase() !== '.pdf' || extname(outputPath).toLowerCase() !== '.png') {
  console.error('Usage: node scripts/presentation-thumbnail.mjs supplied.pdf first-page.png');
  process.exit(1);
}
const input = resolve(inputPath), output = resolve(outputPath);
if (existsSync(output)) throw new Error('Output already exists; choose a new path to preserve the existing thumbnail.');
const descriptor = openSync(input, 'r'), signature = Buffer.alloc(5);
try { readSync(descriptor, signature, 0, 5, 0); } finally { closeSync(descriptor); }
if (signature.toString() !== '%PDF-') throw new Error('Input must be an actual PDF.');
mkdirSync(dirname(output), { recursive: true });
try {
  if (process.platform === 'darwin') {
    // ImageIO rasterizes the first PDF page. Preserve the full slide, limit longest edge.
    execFileSync('/usr/bin/sips', ['-s', 'format', 'png', '-Z', '960', input, '--out', output], { stdio: 'inherit' });
  } else {
    // Optional system Poppler tool; no npm dependency and no build-time requirement.
    execFileSync('pdftoppm', ['-f', '1', '-l', '1', '-singlefile', '-scale-to', '960', '-png', input, output.slice(0, -4)], { stdio: 'inherit' });
  }
} catch (error) {
  if (error.code === 'ENOENT') throw new Error('Install the optional system pdftoppm tool, or export page 1 to PNG manually.');
  throw error;
}
console.log(`Rendered PDF page 1 to ${output}. Review the image and approve it before placing it in public/.`);
