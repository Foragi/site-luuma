(() => {
  const categoryStrip = document.querySelector(".category-strip-inner");
  const currentCategory = categoryStrip?.querySelector(".category-cell[aria-current='page']");

  if (categoryStrip && currentCategory && window.matchMedia("(max-width: 600px)").matches) {
    window.requestAnimationFrame(() => {
      const stripBounds = categoryStrip.getBoundingClientRect();
      const categoryBounds = currentCategory.getBoundingClientRect();
      const centeredOffset =
        categoryStrip.scrollLeft + categoryBounds.left - stripBounds.left -
        (categoryStrip.clientWidth - categoryBounds.width) / 2;
      const maxScroll = categoryStrip.scrollWidth - categoryStrip.clientWidth;
      categoryStrip.scrollLeft = Math.max(0, Math.min(maxScroll, centeredOffset));
    });
  }

  const toggles = document.querySelectorAll("[data-mobile-menu-toggle]");

  toggles.forEach((button) => {
    const header = button.closest(".site-header");
    const nav = header?.querySelector(".main-nav");
    if (!header || !nav) return;

    const setOpen = (open) => {
      header.classList.toggle("is-menu-open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };

    button.addEventListener("click", () => {
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("pointerdown", (event) => {
      if (!header.contains(event.target)) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        button.focus();
      }
    });

    window.matchMedia("(min-width: 521px)").addEventListener?.("change", (event) => {
      if (event.matches) setOpen(false);
    });
  });
})();
