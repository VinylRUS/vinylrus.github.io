// script.js — год, каскадная анимация появления, копирование
document.addEventListener('DOMContentLoaded', () => {

  // ── Авто-год в футере ──
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Каскадная анимация появления (staggered entrance) ──
  // Используем IntersectionObserver: добавляем .seen с задержкой,
  // чтобы карточки появлялись одна за другой.
  const links = document.querySelectorAll('.link');

  if ('IntersectionObserver' in window) {
    // Считаем порядковый номер для задержки
    let visibleIndex = 0;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = visibleIndex * 60; // 60ms между карточками
          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add('seen');
          visibleIndex++;
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    });

    links.forEach(el => {
      // Если карточка уже видна при загрузке — помечаем сразу
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const delay = visibleIndex * 60;
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add('seen');
        visibleIndex++;
      } else {
        observer.observe(el);
      }
    });
  } else {
    // Fallback: просто показываем все
    links.forEach(el => el.classList.add('seen'));
  }

});
