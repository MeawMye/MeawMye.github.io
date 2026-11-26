if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.animate(
        [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 420, easing: 'ease-out' }
      );
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px 0px 0px', threshold: 0.15 });

  document.querySelectorAll('.journey-note').forEach((note) => observer.observe(note));
}
