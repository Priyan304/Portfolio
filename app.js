import { projects, skillGroups } from './projects.js';
import { initMotion } from './motion.js';

const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const $ = selector => document.querySelector(selector);
const art = {
  vault: '<div class="art-label"><span>VAULT / KNOWLEDGE, CONNECTED.</span><span>01</span></div><span class="vault-mark">vault<span style="color:#829768">↗</span></span><div class="vault-window"><div class="vault-sidebar"><strong>v.</strong>All resources<br>Collections<br>Tags<br><br>PERSONAL SPACE</div><div class="vault-main"><h4>Your ideas, together.</h4><div class="resource">↗ &nbsp; Resources & references</div><div class="resource">≡ &nbsp; Notes & things to remember</div><div class="resource">⌘ &nbsp; Ideas worth exploring</div></div></div>',
  pera: '<div class="art-label"><span>HUMAN × AI</span><span>02</span></div><div class="pera-orb"></div><span class="pera-word">PerA<span style="color:#bfb2cf">.</span></span><span class="pera-caption">A LITTLE MORE<br>THAN A CONVERSATION.</span>',
  flood: '<div class="flood-grid"></div><div class="flood-river"></div><div class="flood-target"></div><div class="art-label"><span>CLIMATE / INTELLIGENCE</span><span>03</span></div><span class="flood-title">Reading<br>the landscape.</span><span class="flood-coordinate">IMAGERY × AI<br>EXPERIMENT 03</span>',
  misaki: '<div class="art-label"><span>LOCAL MIND / MISAKI</span><span>04</span></div><div class="misaki-terminal"><div class="terminal-top"><i></i><i></i><i></i></div><div class="terminal-name">misaki_</div><span>~/ exploring intelligence<br>→ closer to your data<br>→ one experiment at a time<br><br>$ <span class="terminal-cursor"></span></span></div>'
};

function renderProjects(filter = 'all') {
  const visible = projects.filter(p => filter === 'all' || p.filters.includes(filter));
  $('#featured-projects').innerHTML = visible.filter(p => p.featured).map(p => `<button class="project-card reveal" data-project="${p.id}" aria-label="View ${escapeHTML(p.title)} case study"><div class="project-art art-${p.preview}" aria-hidden="true">${art[p.preview]}</div><div class="project-meta"><div><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.category)}</p></div><span class="project-status">${escapeHTML(p.status)}</span></div></button>`).join('');
  const archive = visible.filter(p => !p.featured);
  $('#project-archive').innerHTML = archive.map(p => `<button class="archive-project reveal" data-project="${p.id}" aria-label="View ${escapeHTML(p.title)} case study"><span class="archive-index">${String(projects.indexOf(p) + 1).padStart(2, '0')}</span><span class="archive-title">${escapeHTML(p.title)}</span><span class="archive-category">${escapeHTML(p.category)}</span><span class="archive-arrow">↗</span></button>`).join('');
  $('.archive-heading').hidden = archive.length === 0;
  $('#featured-projects').classList.toggle('empty-group', !visible.some(p => p.featured));
  $('.project-count').textContent = `${visible.length} PROJECT${visible.length === 1 ? '' : 'S'}`;
  document.querySelectorAll('.filter').forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.dispatchEvent(new CustomEvent('projects:rendered'));
}
renderProjects();
$('#showcase-stage').innerHTML = projects.filter(p => p.featured).map((p, i) => `<button class="showcase-card" data-project="${p.id}" aria-label="View ${escapeHTML(p.title)} case study"><div class="project-art art-${p.preview}" aria-hidden="true">${art[p.preview]}</div><span class="showcase-card-label"><span>${escapeHTML(p.title)}</span><span>0${i + 1} ↗</span></span></button>`).join('');
$('#skills-grid').innerHTML = skillGroups.map(([title, skills], i) => `<article class="skill-group"><span class="skill-index">${String(i + 1).padStart(2, '0')} /</span><h3>${escapeHTML(title)}</h3><div class="skill-tags">${skills.map(s => `<span>${escapeHTML(s)}</span>`).join('')}</div></article>`).join('');

const dialog = $('#project-dialog');
let previousFocus;
function openProject(id) {
  const p = projects.find(item => item.id === id);
  if (!p) return;
  previousFocus = document.activeElement;
  $('#dialog-content').innerHTML = `<p class="dialog-category">${escapeHTML(p.category.toUpperCase())}</p><h2 class="dialog-title" id="dialog-title">${escapeHTML(p.title)}</h2><p class="dialog-tagline">${escapeHTML(p.tagline)}</p><span class="dialog-status">${escapeHTML(p.status)}</span><div class="dialog-block"><h3>THE IDEA</h3><p>${escapeHTML(p.summary)}</p></div><div class="dialog-block"><h3>THE PROBLEM</h3><p>${escapeHTML(p.problem)}</p></div><div class="dialog-block"><h3>THE APPROACH</h3><p>${escapeHTML(p.approach)}</p><ul>${p.details.map(d => `<li>${escapeHTML(d)}</li>`).join('')}</ul></div>${p.stack.length ? `<div class="dialog-block"><h3>TOOLS & TECHNOLOGIES</h3><div class="dialog-stack">${p.stack.map(s => `<span>${escapeHTML(s)}</span>`).join('')}</div></div>` : ''}<div class="dialog-block"><h3>WHERE IT STANDS</h3><p>${escapeHTML(p.note)}</p></div><div class="dialog-source">${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener noreferrer">Explore the repository ↗</a>` : '<span>More experiments to come.</span>'}<small>PROJECT NOTES / ${String(projects.indexOf(p) + 1).padStart(2, '0')}</small></div>`;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}
document.addEventListener('click', e => {
  const project = e.target.closest('[data-project]');
  if (project) openProject(project.dataset.project);
  const filter = e.target.closest('[data-filter]');
  if (filter) renderProjects(filter.dataset.filter);
});
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {
  const box = dialog.getBoundingClientRect();
  if (e.target === dialog && (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom)) dialog.close();
});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; previousFocus?.focus({ preventScroll: true }); });

const menu = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); mobileNav.hidden = true; menu.querySelector('span').textContent = '+'; }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open)); mobileNav.hidden = !open; menu.querySelector('span').textContent = open ? '−' : '+';
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
$('#year').textContent = new Date().getFullYear();

// Original generative wire sculpture. No external imagery or rendering libraries.
const canvas = $('#hero-canvas');
const ctx = canvas.getContext('2d');
if (ctx) {
  const hero = $('.hero');
  const motion = $('#motion-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, frame = 0, lastTime = 0, time = 0;
  let paused = reducedMotion.matches, inView = true, targetX = 0, targetY = 0, pointerX = 0, pointerY = 0;
  function resize() {
    width = hero.clientWidth; height = hero.clientHeight;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  function projectPoint(u, v, phase, scale) {
    const ring = 1.38 + .12 * Math.sin(u * 3 + phase);
    const tube = .46 + .05 * Math.cos(u * 5 - phase);
    let x = (ring + tube * Math.cos(v)) * Math.cos(u);
    let y = (ring + tube * Math.cos(v)) * Math.sin(u);
    let z = tube * Math.sin(v);
    // A tilted torus, gently folding through the third dimension.
    const rx = .66 + pointerY * .12;
    const ry = -.4 + pointerX * .12;
    const y1 = y * Math.cos(rx) - z * Math.sin(rx), z1 = y * Math.sin(rx) + z * Math.cos(rx);
    const x1 = x * Math.cos(ry) + z1 * Math.sin(ry), z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
    const rz = -.45 + phase * .045;
    const x2 = x1 * Math.cos(rz) - y1 * Math.sin(rz), y2 = x1 * Math.sin(rz) + y1 * Math.cos(rz);
    const perspective = 4.8 / (4.8 + z2);
    return [width * .51 + x2 * scale * perspective, height * .43 + y2 * scale * perspective, z2];
  }
  function draw() {
    pointerX += (targetX - pointerX) * .04; pointerY += (targetY - pointerY) * .04;
    ctx.clearRect(0, 0, width, height);
    const bg = ctx.createLinearGradient(0, 0, width * .9, height);
    bg.addColorStop(0, '#090909'); bg.addColorStop(.5, '#1a1a1a'); bg.addColorStop(1, '#080808');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height);
    const glow = ctx.createRadialGradient(width * .59, height * .33, 0, width * .52, height * .43, width * .6);
    glow.addColorStop(0, '#99999926'); glow.addColorStop(.4, '#7575750c'); glow.addColorStop(1, '#00000000');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
    // Fine horizon contours give the sculpture a quiet, spatial setting.
    ctx.lineWidth = .65;
    for (let row = 0; row < 26; row++) {
      ctx.beginPath();
      for (let x = 0; x <= width; x += 12) {
        const y = height * .8 + row * row * .46 + Math.sin(x / width * 6 + row * .07 + time * .045) * (15 + row * .8);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(151,166,130,${.025 + row * .0013})`; ctx.stroke();
    }
    const scale = Math.min(width * .225, height * .31);
    const phase = time * .16;
    for (let i = 0; i < 62; i++) {
      const u = i / 62 * Math.PI * 2;
      ctx.beginPath();
      let depth = 0;
      for (let j = 0; j <= 90; j++) {
        const p = projectPoint(u, j / 90 * Math.PI * 2, phase, scale);
        depth += p[2]; j === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
      }
      const alpha = .085 + (1 - (depth / 91 + 2) / 4) * .18;
      ctx.strokeStyle = `rgba(191,205,171,${alpha})`; ctx.lineWidth = .65; ctx.stroke();
    }
    for (let i = 0; i < 24; i++) {
      const v = i / 24 * Math.PI * 2;
      ctx.beginPath();
      for (let j = 0; j <= 150; j++) {
        const p = projectPoint(j / 150 * Math.PI * 2, v, phase, scale);
        j === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
      }
      ctx.strokeStyle = 'rgba(193,207,172,.075)'; ctx.lineWidth = .55; ctx.stroke();
    }
    const shade = ctx.createLinearGradient(0, 0, 0, height);
    shade.addColorStop(0, '#00000000'); shade.addColorStop(.6, '#00000000'); shade.addColorStop(1, '#080b08aa');
    ctx.fillStyle = shade; ctx.fillRect(0, 0, width, height);
  }
  function tick(timestamp) {
    frame = 0;
    if (paused || !inView || document.hidden) return;
    if (timestamp - lastTime >= 32) { time += Math.min((timestamp - lastTime) / 1000, .05); lastTime = timestamp; draw(); }
    frame = requestAnimationFrame(tick);
  }
  function syncMotion() {
    cancelAnimationFrame(frame); frame = 0;
    motion.setAttribute('aria-pressed', String(paused));
    motion.setAttribute('aria-label', paused ? 'Play background animation' : 'Pause background animation');
    motion.textContent = paused ? '▷' : 'Ⅱ';
    if (!paused && inView && !document.hidden) { lastTime = performance.now(); frame = requestAnimationFrame(tick); }
  }
  motion.addEventListener('click', () => { paused = !paused; syncMotion(); });
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; syncMotion(); });
  hero.addEventListener('pointermove', e => { const box = hero.getBoundingClientRect(); targetX = (e.clientX - box.left) / width - .5; targetY = (e.clientY - box.top) / height - .5; });
  hero.addEventListener('pointerleave', () => { targetX = targetY = 0; });
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(entries => { inView = entries[0].isIntersecting; syncMotion(); }).observe(hero);
  document.addEventListener('visibilitychange', syncMotion);
  resize(); syncMotion();
}
initMotion();
