// script.js — год, copy, and one-time enter-animation (prevents replay on scroll)
document.addEventListener('DOMContentLoaded', () => {
  // year
  const y = new Date().getFullYear();
  const el = document.getElementById('year'); if (el) el.textContent = y;

  // copy buttons
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(text);
        const prev = btn.innerHTML;
        btn.innerHTML = 'Скопировано ✓';
        setTimeout(() => { btn.innerHTML = prev; }, 1500);
      } catch (e) {
        window.open('mailto:' + text);
      }
    });
  });

  // IntersectionObserver: add .seen once on first visibility — prevents replay on scroll
  if ('IntersectionObserver' in window) {
    const opts = { root: null, rootMargin: '0px', threshold: 0.2 };
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('seen');
          observer.unobserve(entry.target); // UNOBSERVE — so the animation won't play again
        }
      });
    }, opts);

    document.querySelectorAll('.link').forEach(el => {
      // if already visible on load, mark immediately (avoid waiting)
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('seen');
      } else {
        io.observe(el);
      }
    });
  } else {
    // fallback: just add seen (no animations replay anyway for most old browsers)
    document.querySelectorAll('.link').forEach(el => el.classList.add('seen'));
  }
});
