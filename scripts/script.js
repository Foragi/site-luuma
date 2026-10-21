const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

gsap.registerPlugin(ScrollTrigger);

let lenis;
if (!reducedMotion.matches) {
  lenis = new Lenis({
    lerp: 0.12,
    anchors: { offset: -88 },
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

document.querySelectorAll("[data-squeeze-carousel]").forEach((carousel) => {
  const panels = [...carousel.querySelectorAll("[role='tab']")];
  const detail = carousel.querySelector("[role='tabpanel']");
  const title = carousel.querySelector("[data-squeeze-title]");
  const description = carousel.querySelector("[data-squeeze-description]");
  let activeIndex = 0;

  const selectPanel = (index, focus = false) => {
    activeIndex = (index + panels.length) % panels.length;

    panels.forEach((panel, panelIndex) => {
      const selected = panelIndex === activeIndex;
      panel.classList.toggle("is-active", selected);
      panel.setAttribute("aria-selected", String(selected));
      panel.tabIndex = selected ? 0 : -1;
    });

    const activePanel = panels[activeIndex];
    title.textContent = activePanel.dataset.title;
    description.textContent = activePanel.dataset.description;
    detail.setAttribute("aria-labelledby", activePanel.id);
    if (focus) activePanel.focus();
  };

  carousel.querySelector("[data-squeeze-prev]").addEventListener("click", () => {
    selectPanel(activeIndex - 1);
  });
  carousel.querySelector("[data-squeeze-next]").addEventListener("click", () => {
    selectPanel(activeIndex + 1);
  });

  panels.forEach((panel, index) => {
    panel.addEventListener("click", () => selectPanel(index));
    panel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        selectPanel(activeIndex - 1, true);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        selectPanel(activeIndex + 1, true);
      }
    });
  });
});

if (!reducedMotion.matches) {
  gsap.fromTo(
    ".hero-content > *",
    { y: 22, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.1, ease: "power3.out", delay: 0.12 },
  );

  const revealGroups = [
    [".intro-copy", ".intro-image"],
    [".menu-photo", ".menu-copy"],
    [".full-image-copy"],
    [".highlights-heading", ".squeeze-carousel"],
    [".story-note", ".story-photo"],
    [".visit-heading", ".visit-details", ".visit-image"],
  ];

  revealGroups.flat().forEach((selector) => {
    gsap.fromTo(
      selector,
      { y: 26, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.45,
        ease: "power3.out",
        scrollTrigger: { trigger: selector, start: "top 86%", once: true },
      },
    );
  });

  const parallaxImages = [
    ".intro-image img",
    ".full-image img",
    ".story-photo img",
    ".visit-image img",
  ];

  parallaxImages.forEach((selector) => {
    const image = document.querySelector(selector);
    const container = image?.parentElement;
    if (!image || !container) return;

    gsap.fromTo(
      image,
      { yPercent: -5, scale: 1.08 },
      {
        yPercent: 5,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      },
    );
  });
}
