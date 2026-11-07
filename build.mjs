import { mkdir, copyFile, cp, access } from 'node:fs/promises';
await import('./prepare-assets.mjs');
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'motion.css', 'app.js', 'motion.js', 'projects.js', 'favicon.svg']) await copyFile(file, `dist/${file}`);
try { await access('assets'); await cp('assets', 'dist/assets', { recursive: true }); } catch {}
console.log('Built static portfolio in dist/');
