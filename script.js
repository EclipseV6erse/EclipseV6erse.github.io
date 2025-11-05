// safe selectors
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

// ---------- fixed single-loop typewriter ----------
(function typewriter() {
  const el = document.querySelector('.typing');
  if (!el) return;
  const phrases = [
    "Lua(u) & Roblox Programmer",
    "Scripter & System Designer",
    "UI & Game Systems"
  ];
  let p = 0;

  // tiny helper for wait
  const wait = ms => new Promise(res => setTimeout(res, ms));

  (async function loop() {
    while (true) {
      const word = phrases[p];
      // type
      for (let i = 0; i <= word.length; i++) {
        el.textContent = word.slice(0, i);
        await wait(70);
      }
      await wait(900);
      // delete
      for (let i = word.length; i >= 0; i--) {
        el.textContent = word.slice(0, i);
        await wait(35);
      }
      await wait(220);
      p = (p + 1) % phrases.length;
    }
  })();
})();

// ---------- scroll reveal ----------
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

// ---------- orb random flicker + click copy ----------
(function discordOrb() {
  const orb = document.getElementById('discord-orb');
  const discordButtons = Array.from(document.querySelectorAll('.discord-btn'));
  const desiredTag = 'eclipse_41934';

  if (!orb) return;

  // small random flicker via CSS variable (update every 2-4s)
  setInterval(() => {
    const intensity = (Math.random() * 0.45 + 0.55).toFixed(2); // 0.55 - 1.0
    orb.style.setProperty('--flick', intensity);
    orb.style.boxShadow = `0 8px 40px rgba(140,85,255,${0.18 * intensity})`;
  }, 2200 + Math.random() * 1600);

  // copy helper + toast
  async function copyTag() {
    try {
      await navigator.clipboard.writeText(desiredTag);
      showToast(`Discord tag copied: ${desiredTag}`);
    } catch (err) {
      // fallback prompt
      const fallback = prompt('Copy Discord tag (Ctrl+C):', desiredTag);
      if (fallback !== null) showToast('Copied (manual)');
    }
  }

  orb.addEventListener('click', copyTag);
  discordButtons.forEach(btn => btn.addEventListener('click', copyTag));
})();

// ---------- mobile menu toggle (creates hamburger if none) ----------
(function mobileMenuQuick(){
  if ($('.hamburger')) return; // existing handlers already created earlier maybe
  const nav = $('.navbar');
  if (!nav) return;
  const hb = document.createElement('button');
  hb.className = 'hamburger';
  hb.innerHTML = '<span></span>';
  nav.appendChild(hb);

  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.style.display = 'none';
  document.body.appendChild(mobileMenu);

  const links = Array.from($$('.nav-links a')).map(a => `<a href="${a.href}" style="display:block;padding:8px 6px;color:#e9e6ff">${a.textContent}</a>`).join('');
  mobileMenu.innerHTML = links;

  let open = false;
  hb.addEventListener('click', () => {
    open = !open;
    mobileMenu.style.display = open ? 'block' : 'none';
    hb.style.transform = open ? 'rotate(90deg)' : 'none';
  });

  mobileMenu.addEventListener('click', () => { mobileMenu.style.display = 'none'; open = false; hb.style.transform = 'none'; });
})();

// ---------- toast ----------
function showToast(text, timeout = 2000) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = text;
  t.classList.add('show');
  clearTimeout(t._hide);
  t._hide = setTimeout(() => t.classList.remove('show'), timeout);
}

// ---------- ensure sections visible if JS loads late ----------
window.addEventListener('load', () => document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible')));
