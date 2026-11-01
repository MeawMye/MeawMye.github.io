const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#primary-nav');

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
