import Lenis from '../../node_modules/lenis/dist/lenis.mjs';
import { gsap } from '../../node_modules/gsap/index.js';

const cardPhotos = [
  { match: 'Expresso', src: 'cafe' },
  { match: 'Café com leite', src: 'cafe' },
  { match: 'Drip coffee', src: 'cafe' },
  { match: 'Macchiato', src: 'cafe' },
  { match: 'Mocha', src: 'cafe' },
  { match: 'Capuccino', src: 'cafe' },
  { match: 'Chocolate', src: 'cafe' },
  { match: 'Batida', src: 'batida' },
  { match: 'Espanhola', src: 'espanhola' },
  { match: 'Heineken', src: 'cervejas-long-neck' },
  { match: 'Corona', src: 'cervejas-long-neck' },
  { match: 'Amstel', src: 'cervejas-long-neck' },
  { match: 'Praya', src: 'cervejas-long-neck' },
  { match: 'Smirnoff', src: 'dose-whisky' },
  { match: 'Absolut', src: 'dose-whisky' },
  { match: 'Campari', src: 'dose-whisky' },
  { match: 'Gin Beefeater', src: 'dose-whisky' },
  { match: 'Tequila', src: 'dose-whisky' },
  { match: 'Jack Daniel', src: 'dose-whisky' },
  { match: 'Whisky 18 anos', src: 'dose-whisky' },
  { match: 'Cachaças artesanais', src: 'cachacas' },
  { match: 'Guaraná Antarctica', src: 'refrigerantes' },
  { match: 'Pepsi', src: 'refrigerantes' },
  { match: 'Sprite', src: 'refrigerantes' },
  { match: 'Sucos Del Valle', src: 'sucos-del-valle' },
  { match: 'Sucos naturais', src: 'sucos-naturais' },
  { match: 'H2OH!', src: 'h2oh' },
  { match: 'Água', src: 'aguas-tonicas' },
  { match: 'Red Bull', src: 'energeticos' },
  { match: 'Monster', src: 'energeticos' },
];

function addMissingMenuPhotos() {
  document.querySelectorAll('.dish-card').forEach((card) => {
    if (card.querySelector('.dish-photo')) return;

    const title = card.querySelector('.dish-title')?.textContent.trim() || '';
    const photo = cardPhotos.find((entry) => title.includes(entry.match));
    if (!photo) return;

    const image = document.createElement('img');
    image.src = `../assets/menu-items/${photo.src}.jpg`;
    image.alt = title;
    image.loading = 'lazy';

    const frame = document.createElement('div');
    frame.className = 'dish-photo';
    frame.append(image);
    card.prepend(frame);
  });
}

function setupSelectableCards() {
  const cards = [...document.querySelectorAll('.dish-card')];

  const toggleCard = (selectedCard) => {
    const shouldSelect = !selectedCard.classList.contains('is-selected');

    cards.forEach((card) => {
      const isSelected = card === selectedCard && shouldSelect;
      card.classList.toggle('is-selected', isSelected);
      card.setAttribute('aria-pressed', String(isSelected));
    });
  };

  cards.forEach((card) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-pressed', 'false');
    card.addEventListener('click', () => toggleCard(card));
    card.addEventListener('keydown', (event) => {
      if (event.repeat || (event.key !== 'Enter' && event.key !== ' ')) return;
      event.preventDefault();
      toggleCard(card);
    });
  });
}

const categoryLinks = [...document.querySelectorAll('.category-link')];
const menuSections = [...document.querySelectorAll('.menu-section')];
const showAllButton = document.querySelector('[data-show-all]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis;

function setCategoryView(categoryId, animate = false) {
  menuSections.forEach((section) => {
    const isActive = !categoryId || section.id === categoryId;
    section.classList.remove('is-filter-entering');
    section.hidden = !isActive;

    if (isActive && categoryId && animate) {
      section.classList.add('is-filter-entering');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => section.classList.remove('is-filter-entering'));
      });
    }
  });

  categoryLinks.forEach((link) => {
    if (link.hash === `#${categoryId}`) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  showAllButton.hidden = !categoryId;
}

function categoryFromLocation() {
  return categoryLinks.find((link) => link.hash === window.location.hash)?.hash.slice(1) || null;
}

addMissingMenuPhotos();
setupSelectableCards();
setCategoryView(categoryFromLocation());

categoryLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.hash);
    if (!target) return;

    event.preventDefault();
    history.pushState(null, '', link.hash);
    setCategoryView(target.id, true);

    if (lenis) lenis.scrollTo(target, { offset: -66, duration: 0.8 });
    else target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  });
});

showAllButton.addEventListener('click', () => {
  history.pushState(null, '', `${window.location.pathname}${window.location.search}`);
  setCategoryView(null);

  const firstSection = document.getElementById('pratos');
  if (lenis) lenis.scrollTo(firstSection, { offset: -66, duration: 0.8 });
  else firstSection.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
});

window.addEventListener('popstate', () => setCategoryView(categoryFromLocation()));

if (!reducedMotion) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (link.classList.contains('category-link')) return;

      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      event.preventDefault();
      history.pushState(null, '', link.getAttribute('href'));
      lenis.scrollTo(target, { offset: -66, duration: 0.8 });
    });
  });

  window.addEventListener('pagehide', () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
  }, { once: true });

  gsap.fromTo(
    '.hero-content > *',
    { y: 22, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.1, ease: 'power3.out', delay: 0.12 },
  );
}
