const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#primary-nav');
const languageMarker = document.querySelector('.language');

if (languageMarker) {
  const english = window.location.pathname.includes('/en/');
  const lastSegment = window.location.pathname.split('/').filter(Boolean).at(-1) || '';
  const fileName = lastSegment.endsWith('.html') ? lastSegment : 'index.html';
  const counterpart = english ? `../${fileName}${window.location.hash}` : `en/${fileName}${window.location.hash}`;
  let savedLanguage = null;
  try {
    savedLanguage = window.localStorage.getItem('portfolio-language');
  } catch {}
  const preferredLanguage = savedLanguage || 'en';

  if ((preferredLanguage === 'en') !== english) {
    window.location.replace(counterpart);
  }

  const current = document.createElement('span');
  const other = document.createElement('a');
  current.className = 'active';
  current.textContent = english ? 'EN' : 'KO';
  other.href = counterpart;
  other.textContent = english ? 'KO' : 'EN';
  other.setAttribute('aria-label', english ? '한국어로 보기' : 'View in English');
  other.addEventListener('click', () => {
    try {
      window.localStorage.setItem('portfolio-language', english ? 'ko' : 'en');
    } catch {}
  });
  languageMarker.className = 'language-switch';
  languageMarker.replaceChildren(english ? other : current, english ? current : other);
}

document.querySelectorAll('a[href="about.html"]').forEach((link) => {
  link.setAttribute('href', 'about-details.html');
});

if (/\/about(?:\.html)?$/.test(window.location.pathname)) {
  window.location.replace('about-details.html');
}

document.querySelectorAll('h2').forEach((heading) => {
  if (heading.textContent.trim() !== 'System-level Debugging') return;
  const article = heading.closest('article');
  const status = article?.querySelector('.status');
  if (!status) return;
  const link = document.createElement('a');
  link.className = 'text-link';
  link.href = 'system-debugging.html';
  link.textContent = '상세 페이지 보기 →';
  status.replaceWith(link);
});

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
}

if (document.body.classList.contains('portfolio-home') && nav) {
  const sectionLinks = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = sectionLinks
    .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
    .filter((item) => item.section);
  let scheduled = false;

  const updateActiveSection = () => {
    const activationPoint = window.scrollY + window.innerHeight * 0.38;
    let current = null;

    sections.forEach((item) => {
      if (item.section.offsetTop <= activationPoint) current = item;
    });

    sections.forEach((item) => {
      const active = item === current;
      item.link.classList.toggle('active', active);
      if (active) item.link.setAttribute('aria-current', 'location');
      else item.link.removeAttribute('aria-current');
    });
    scheduled = false;
  };

  const scheduleUpdate = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateActiveSection);
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  updateActiveSection();
}
