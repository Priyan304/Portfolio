// Original GSAP implementation of the reference's motion language.
// GSAP and its plugins are served locally from assets/vendor.
export function initMotion() {
  const { gsap, ScrollTrigger, ScrollSmoother, ScrollToPlugin, CustomEase } = window;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(...[ScrollTrigger, ScrollSmoother, ScrollToPlugin, CustomEase].filter(Boolean));
  if (CustomEase) CustomEase.create('portfolio', '0.6, 0.01, 0.05, 1');
  const ease = CustomEase ? 'portfolio' : 'power4.inOut';
  const $ = s => document.querySelector(s);
  const all = s => [...document.querySelectorAll(s)];

  // Preserve link names and heading semantics while animating individual glyphs.
  all('.desktop-nav a, .contact-github, .back-top').forEach(link => {
    const text = link.textContent.replace(/\s+/g, ' ').trim();
    link.setAttribute('aria-label', text);
    const line = document.createElement('span');
    line.className = 'roll-text'; line.setAttribute('aria-hidden', 'true');
    for (const char of text) {
      const span = document.createElement('span'); span.className = 'roll-char';
      span.textContent = char === ' ' ? '\u00a0' : char; span.dataset.char = span.textContent;
      line.append(span);
    }
    link.replaceChildren(line);
  });
  const statement = $('.statement');
  const statementText = statement.innerText.replace(/\s+/g, ' ').trim();
  statement.setAttribute('aria-label', statementText);
  statement.replaceChildren(...statementText.split(' ').map(word => {
    const span = document.createElement('span'); span.className = 'philosophy-word';
    span.textContent = `${word} `; span.dataset.word = `${word} `; span.setAttribute('aria-hidden', 'true');
    return span;
  }));

  const wrapper = document.createElement('div'); wrapper.id = 'smooth-wrapper';
  const content = document.createElement('div'); content.id = 'smooth-content';
  const main = $('main'), footer = $('footer');
  main.before(wrapper); wrapper.append(content); content.append(main, footer);
  // Fixed elements remain outside the transformed ScrollSmoother content.
  document.body.append($('#motion-toggle'));
  const progress = document.createElement('div'); progress.className = 'scroll-progress'; progress.setAttribute('aria-hidden', 'true'); document.body.append(progress);
  const cursor = document.createElement('div'); cursor.className = 'view-cursor'; cursor.textContent = 'VIEW ↗'; cursor.setAttribute('aria-hidden', 'true'); document.body.append(cursor);

  let hasPlayedIntro = false;
  const media = gsap.matchMedia();
  media.add({ desktop: '(min-width: 900px)', mobile: '(max-width: 899px)', fine: '(hover: hover) and (pointer: fine)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
    if (context.conditions.reduce) return;
    document.documentElement.classList.add('motion-enabled');
    const listeners = new AbortController();
    const listen = (el, type, handler, options = {}) => el.addEventListener(type, handler, { ...options, signal: listeners.signal });
    let smoother = null, intro = null, curtain = null;
    let projectContext = null, projectListeners = null;
    if (context.conditions.desktop && ScrollSmoother) {
      smoother = ScrollSmoother.create({ wrapper, content, smooth: 1.15, smoothTouch: 0, effects: false, normalizeScroll: false });
    }

    // Intro: sequential portrait-sized artwork wipes, then the final frame expands.
    const hero = $('.hero');
    if (!hasPlayedIntro && !location.hash && window.scrollY < 50) {
      hasPlayedIntro = true;
      curtain = document.createElement('div'); curtain.className = 'intro-curtain'; curtain.setAttribute('aria-hidden', 'true');
      const stack = document.createElement('div'); stack.className = 'intro-stack';
      all('#featured-projects .project-art').forEach(art => {
        const card = document.createElement('div'); card.className = 'intro-card'; card.append(art.cloneNode(true)); stack.append(card);
      });
      const count = document.createElement('span'); count.className = 'intro-number'; count.textContent = '01 — 04';
      const label = document.createElement('span'); label.className = 'intro-label'; label.textContent = 'YAMI / SELECTED EXPERIMENTS';
      curtain.append(stack, count, label); document.body.append(curtain);
      const complete = () => { curtain?.remove(); gsap.set(hero, { clearProps: 'clipPath' }); ScrollTrigger.refresh(); };
      intro = gsap.timeline({ defaults: { ease }, onComplete: complete });
      intro.set(hero, { clipPath: context.conditions.desktop ? 'inset(25% 40% 25% 40%)' : 'inset(25% 18% 25% 18%)' })
        .fromTo(stack, { y: 25, scale: .93 }, { y: 0, scale: 1, duration: .7 }, 0)
        .to(stack.querySelectorAll('.intro-card'), { clipPath: 'inset(0% 0% 0% 0%)', duration: .65, stagger: .18 }, .1)
        .to(curtain, { backgroundColor: 'rgba(238,238,238,0)', duration: .4 }, 1.35)
        .to([stack, count, label], { autoAlpha: 0, duration: .3 }, 1.35)
        .to(hero, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.35 }, 1.5)
        .fromTo('.hero-year', { scale: 1.65, filter: 'blur(35px)' }, { scale: 1, filter: 'blur(10px)', duration: 1.8 }, 1.6)
        .fromTo('.hero-center', { filter: 'blur(15px)', opacity: 0 }, { filter: 'blur(0px)', opacity: 1, duration: 1.1 }, 1.65)
        .fromTo('.header', { y: -30, autoAlpha: 0, filter: 'blur(12px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1 }, 2.15)
        .fromTo('.hero-top > span, .hero-bottom > *', { y: 25, autoAlpha: 0, filter: 'blur(10px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', stagger: .07, duration: 1 }, 2.2);
      listen(window, 'wheel', () => { if (intro?.isActive()) intro.progress(1); }, { once: true, passive: true });
      listen(window, 'touchstart', () => { if (intro?.isActive()) intro.progress(1); }, { once: true, passive: true });
    }

    // Scrubbed hero parallax and a continuous reading-progress line.
    gsap.fromTo('.hero-center', { yPercent: 0, opacity: 1 }, { yPercent: -85, opacity: .1, immediateRender: false, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .8 } });
    gsap.fromTo('.hero-year', { yPercent: 0, scale: 1 }, { yPercent: -30, scale: 1.13, immediateRender: false, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.2 } });
    gsap.to(progress, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .2 } });

    // Per-letter rolling links, matching the reference's staggered hover behavior.
    all('.roll-text').forEach(line => {
      const tween = gsap.to(line.children, { yPercent: -100, duration: .6, stagger: .015, ease, paused: true });
      listen(line.parentElement, 'pointerenter', () => tween.play());
      listen(line.parentElement, 'pointerleave', () => tween.reverse());
      listen(line.parentElement, 'focusin', () => tween.play());
      listen(line.parentElement, 'focusout', () => tween.reverse());
    });

    // Scroll illumination, with a soft spotlight that follows the cursor.
    const words = all('.philosophy-word');
    gsap.fromTo(words, { color: '#393939' }, { color: '#c9c9c9', stagger: .055, ease: 'none', scrollTrigger: { trigger: statement, start: 'top 78%', end: 'bottom 35%', scrub: .8 } });
    if (context.conditions.fine) {
      listen(statement, 'pointermove', e => {
        words.forEach(word => {
          const rect = word.getBoundingClientRect();
          const distance = Math.hypot(e.clientX - rect.left - rect.width / 2, e.clientY - rect.top - rect.height / 2);
          gsap.to(word, { '--light': Math.max(0, 1 - distance / 260), duration: .35, overwrite: true });
        });
      });
      listen(statement, 'pointerleave', () => gsap.to(words, { '--light': 0, duration: .6, overwrite: true }));
    }

    // Pinned perspective scene: cards arrive from depth and fan into an orbit.
    const scene = $('.motion-showcase');
    const cards = all('.showcase-card');
    gsap.set(cards, { xPercent: -50, yPercent: -50, z: -1500, scale: .12, opacity: 0, pointerEvents: 'none' });
    const timeline = gsap.timeline({ scrollTrigger: { id: 'project-orbit', trigger: scene, start: 'top top', end: () => `+=${innerHeight * (context.conditions.desktop ? 2.8 : 2)}`, pin: true, scrub: .8, anticipatePin: 1, invalidateOnRefresh: true } });
    const poses = [
      { x: -.24, y: -.18, rotation: -12, rotationY: 12, z: 30 },
      { x: .24, y: -.16, rotation: 10, rotationY: -10, z: 65 },
      { x: -.17, y: .23, rotation: 7, rotationY: 8, z: 140 },
      { x: .2, y: .25, rotation: -9, rotationY: -8, z: 200 }
    ];
    cards.forEach((card, i) => {
      const pose = poses[i];
      timeline.to(card, { x: () => innerWidth * pose.x * (context.conditions.desktop ? 1 : .9), y: () => innerHeight * pose.y, z: pose.z, scale: context.conditions.desktop ? 1 : .9, rotation: pose.rotation, rotationY: pose.rotationY, opacity: 1, pointerEvents: 'auto', duration: 1.3, ease: 'power2.out' }, i * .55);
    });
    timeline.to('.motion-showcase h2', { autoAlpha: .16, filter: 'blur(5px)', scale: .85, duration: 1.4 }, .4)
      .to('.showcase-progress i', { scaleX: 1, duration: 3.3, ease: 'none' }, 0)
      .to({}, { duration: .25 });
    gsap.to('.showcase-orbits i', { rotation: '+=250', stagger: .1, ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: () => `+=${innerHeight * 5}`, scrub: 1 } });
    // Keyboard focus can always bring a card into view, even before its scroll reveal.
    cards.forEach(card => listen(card, 'focus', () => {
      if (Number(gsap.getProperty(card, 'opacity')) < .4) timeline.scrollTrigger.scroll(timeline.scrollTrigger.end - 1);
    }));

    // Large, opposing typography tracks respond to native scrolling.
    gsap.fromTo('.marquee-track:not(.marquee-secondary)', { xPercent: -18 }, { xPercent: 2, ease: 'none', scrollTrigger: { trigger: '.work-marquee', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
    gsap.fromTo('.marquee-secondary', { xPercent: -2 }, { xPercent: -24, ease: 'none', scrollTrigger: { trigger: '.work-marquee', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });

    // Dynamic project results own their contexts so filtering never leaves stale triggers.
    function bindProjects() {
      projectListeners?.abort(); projectContext?.revert();
      projectListeners = new AbortController();
      projectContext = gsap.context(() => {
        all('#work .project-card').forEach(card => {
          const image = card.querySelector('.project-art');
          gsap.fromTo(image, { clipPath: 'inset(12% 0% 12% 0%)', scale: .94 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 35%', scrub: .65 } });
          gsap.from(card.querySelector('.project-meta'), { y: 20, autoAlpha: 0, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'bottom 110%', once: true } });
        });
        all('.archive-project').forEach(row => {
          const overlay = document.createElement('span'); overlay.className = 'archive-marquee'; overlay.setAttribute('aria-hidden', 'true');
          const track = document.createElement('span'); track.className = 'archive-marquee-track';
          const title = row.querySelector('.archive-title').textContent;
          for (let i = 0; i < 4; i++) { const repeat = document.createElement('span'); repeat.textContent = `${title}  ↗`; track.append(repeat); }
          overlay.append(track); row.append(overlay);
          const loop = gsap.to(track, { xPercent: -50, duration: 12, ease: 'none', repeat: -1, paused: true });
          const enter = () => { gsap.to(overlay, { clipPath: 'inset(0% 0% 0% 0%)', duration: .45, ease }); loop.play(); };
          const leave = () => { gsap.to(overlay, { clipPath: 'inset(50% 0% 50% 0%)', duration: .35, ease, onComplete: () => loop.pause() }); };
          for (const event of ['pointerenter', 'focusin']) row.addEventListener(event, enter, { signal: projectListeners.signal });
          for (const event of ['pointerleave', 'focusout']) row.addEventListener(event, leave, { signal: projectListeners.signal });
          gsap.from(row, { y: 35, opacity: 0, duration: .8, scrollTrigger: { trigger: row, start: 'top 96%', once: true } });
        });
      });
      ScrollTrigger.refresh();
    }
    bindProjects();
    listen(document, 'projects:rendered', bindProjects);

    // Restrained section reveals and the contact section's upward reveal.
    all('.section-heading h2, .section-label, .timeline-item, .skill-group, .learning-grid article, .interest-list details, .about-bottom > *').forEach(el => {
      gsap.from(el, { y: 45, autoAlpha: 0, filter: 'blur(5px)', duration: 1.05, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
    });
    gsap.from('.contact h2', { y: 100, filter: 'blur(10px)', opacity: .15, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top 85%', end: 'top 25%', scrub: .8 } });

    if (context.conditions.fine) {
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });
      const moveX = gsap.quickTo(cursor, 'x', { duration: .5, ease: 'power3' });
      const moveY = gsap.quickTo(cursor, 'y', { duration: .5, ease: 'power3' });
      listen(document, 'pointermove', e => { moveX(e.clientX); moveY(e.clientY); });
      const projectSelector = '.project-card, .showcase-card';
      listen(document, 'pointerover', e => { if (e.target.closest(projectSelector)) gsap.to(cursor, { autoAlpha: 1, scale: 1, duration: .25 }); });
      listen(document, 'pointerout', e => { if (e.target.closest(projectSelector) && !e.relatedTarget?.closest(projectSelector)) gsap.to(cursor, { autoAlpha: 0, scale: .5, duration: .25 }); });
    }

    // Anchor links use the same native scroll position as ScrollTrigger and Smoother.
    listen(document, 'click', e => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      const target = hash === '#top' ? 0 : document.getElementById(hash.slice(1));
      if (target === null) return;
      e.preventDefault(); intro?.progress(1);
      history.pushState(null, '', hash);
      if (smoother) smoother.scrollTo(target, true, 'top 65px');
      else gsap.to(window, { scrollTo: { y: target, offsetY: target === 0 ? 0 : 65, autoKill: true }, duration: 1.2, ease: 'power3.inOut', overwrite: 'auto' });
    });
    const dialog = $('#project-dialog');
    const dialogObserver = new MutationObserver(() => {
      smoother?.paused(dialog.open);
      if (dialog.open) gsap.fromTo(dialog, { y: 35, opacity: 0, scale: .97 }, { y: 0, opacity: 1, scale: 1, duration: .5, ease: 'power3.out', overwrite: true });
      else gsap.to(cursor, { autoAlpha: 0, duration: .1 });
    });
    dialogObserver.observe(dialog, { attributes: true, attributeFilter: ['open'] });
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
      if (location.hash) {
        const target = document.getElementById(location.hash.slice(1));
        if (target && smoother) smoother.scrollTo(target, false, 'top 65px');
      }
    });
    return () => {
      listeners.abort(); projectListeners?.abort(); projectContext?.revert();
      all('.archive-marquee').forEach(el => el.remove());
      dialogObserver.disconnect(); intro?.kill(); curtain?.remove(); smoother?.kill();
      document.documentElement.classList.remove('motion-enabled');
      gsap.set(cursor, { autoAlpha: 0 });
    };
  });
}
