/* eslint-disable */
// Safe DOM lookups
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// ---------- Mobile menu toggle ----------
(function mobileMenu(){
  // create hamburger if not present
  if (!$('.hamburger')) {
    const hb = document.createElement('button');
    hb.className = 'hamburger';
    hb.innerHTML = '<span></span>';
    document.querySelector('.navbar').appendChild(hb);

    // mobile menu container
    const mm = document.createElement('div');
    mm.className = 'mobile-menu';
    mm.style.display = 'none';
    document.body.appendChild(mm);
  }

  const hamburger = $('.hamburger');
  const mobileMenuBox = $('.mobile-menu');

  // populate mobile menu links from nav-links
  const navLinks = $$('.nav-links a');
  mobileMenuBox.innerHTML = navLinks.map(a => `<a href="${a.getAttribute('href')}" style="display:block;padding:10px 6px;color:#e9e6ff;text-decoration:none;border-radius:6px;margin-bottom:6px">${a.textContent}</a>`).join('');

  let open = false;
  hamburger.addEventListener('click', () => {
    open = !open;
    mobileMenuBox.style.display = open ? 'block' : 'none';
    hamburger.style.transform = open ? 'rotate(90deg)' : 'none';
  });

  // close when clicking a link
  mobileMenuBox.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      mobileMenuBox.style.display = 'none';
      open = false;
    }
  });
})();

// ---------- Typing subtitle (rotating) ----------
(function typingEffect(){
  const el = document.querySelector('.typing');
  if (!el) return;
  const words = ["Lua(u) & Roblox Programmer", "Scripter & System Designer", "UI & Game Systems"];
  let w = 0, i = 0, dir = 1;
  function tick(){
    const word = words[w];
    el.textContent = word.substring(0, i);
    i += dir;
    if (i > word.length) { dir = -1; setTimeout(tick, 900); }
    else if (i < 0) { dir = 1; w = (w+1) % words.length; i = 0; }
    setTimeout(tick, dir === 1 ? 80 : 40);
  }
  tick();
})();

// ---------- Scroll reveal with IntersectionObserver ----------
(function revealOnScroll(){
  const items = document.querySelectorAll('.fade-up');
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  items.forEach(it => io.observe(it));
})();

// ---------- Parallax hero slight movement on mouse ----------
(function heroParallax(){
  const hero = document.querySelector('.hero');
  if (!hero) return;
  hero.addEventListener('mousemove', (ev) => {
    const x = (ev.clientX / window.innerWidth - 0.5) * 18;
    const y = (ev.clientY / window.innerHeight - 0.5) * 10;
    hero.style.setProperty('--mx', `${x}px`);
    hero.style.setProperty('--my', `${y}px`);
    // subtle transform on :before via CSS (already animated), but we can nudge
    hero.style.transform = `translate3d(${x * 0.2}px, ${y * 0.15}px, 0)`;
  });
  hero.addEventListener('mouseleave', () => { hero.style.transform = ''; });
})();

// ---------- Ensure email button uses the correct address and avoid overlap ----------
(function emailFix(){
  const desired = 'eclipsedev47@gmail.com';
  // find obvious anchors that mention "email" or mailto
  const anchors = Array.from(document.querySelectorAll('a'));
  anchors.forEach(a => {
    const txt = (a.textContent||'').toLowerCase();
    const href = a.getAttribute('href') || '';
    if (txt.includes('email') || txt.includes('send') || href.startsWith('mailto:')) {
      a.classList.add('btn-email');
      a.setAttribute('href', `mailto:${desired}`);
      a.setAttribute('target','_blank');
      a.setAttribute('rel','noopener');
      // ensure spacing so it doesn't overlap text
      a.style.display = 'inline-block';
      a.style.marginTop = '14px';
    }
  });
})();

// ---------- small accessibility: highlight current nav on scroll ----------
(function navHighlight(){
  const sections = $$('.section, .hero');
  const navAnchors = $$('.nav-links a');
  if (!sections.length || !navAnchors.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const id = en.target.id || 'home';
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => obs.observe(s));
})();

// ---------- quick fallback: reveal sections on load if JS didn't run for some reason ----------
window.addEventListener('load', () => {
  document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
});
