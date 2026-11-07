import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('assets/vendor', { recursive: true });
for (const name of ['gsap', 'ScrollTrigger', 'ScrollSmoother', 'ScrollToPlugin', 'CustomEase']) {
  await copyFile(`node_modules/gsap/dist/${name}.min.js`, `assets/vendor/${name}.min.js`);
}
await copyFile('node_modules/gsap/README.md', 'assets/vendor/GSAP-README.md');
console.log('Local GSAP runtime prepared.');
