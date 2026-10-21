(() => {
  const hero = document.querySelector('.hero');
  const image = hero?.querySelector('.hero-image');
  if (!hero || !image) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;

  const update = () => {
    frame = 0;
    if (reduceMotion.matches) {
      image.style.removeProperty('--hero-parallax-offset');
      hero.classList.remove('hero-parallax-ready');
      return;
    }

    const bounds = hero.getBoundingClientRect();
    const limit = bounds.height * 0.16;
    const offset = Math.max(-limit, Math.min(limit, -bounds.top * 0.22));
    image.style.setProperty('--hero-parallax-offset', offset.toFixed(2) + 'px');
    hero.classList.add('hero-parallax-ready');
  };

  const scheduleUpdate = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  reduceMotion.addEventListener?.('change', scheduleUpdate);
  update();
})();
