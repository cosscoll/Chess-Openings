// Logique de la page : génération des cartes d'accueil, transition « portail »,
// ouverture/fermeture d'une ouverture, défilement synchronisé et mise à jour du HUD.
// Le bandeau d'aperçu (en haut) passe sur 2 lignes sur les écrans étroits :
// on mesure sa vraie hauteur et on l'expose en variable CSS pour que tout
// ce qui est calé en dessous (HUD, page d'accueil...) reste correctement
// positionné sans jamais passer derrière le bandeau ni le chevaucher.
const previewBanner = document.querySelector('.preview-banner');
function syncBannerHeight() {
  if (!previewBanner) return;
  const h = Math.ceil(previewBanner.getBoundingClientRect().height);
  if (h > 0) document.documentElement.style.setProperty('--banner-h', h + 'px');
}
syncBannerHeight();
window.addEventListener('resize', syncBannerHeight);
window.addEventListener('orientationchange', syncBannerHeight);
if (window.ResizeObserver && previewBanner) {
  new ResizeObserver(syncBannerHeight).observe(previewBanner);
}

// --- Effet de transition retiré ---
// L'effet de "portail" plein écran (cercle qui se referme) causait un
// calque sombre qui restait bloqué sur certains mobiles. Il a été retiré
// complètement : on bascule maintenant directement d'une page à l'autre.

const grid = document.getElementById('openings-grid');
Object.keys(OPENINGS).forEach((slug, i)=>{
  const opening = OPENINGS[slug];
  const li = document.createElement('li');
  const card = document.createElement('button');
  card.className = 'opening-card';
  card.style.animationDelay = (Math.min(i, 10) * 45) + 'ms'; // plafonné : avec ~36 ouvertures, un délai non borné ferait attendre les dernières cartes trop longtemps
  card.innerHTML = `<span class="opening-card__eco">${opening.eco} · ${Math.ceil(opening.moves.length/2)} coups</span><h2>${opening.name}</h2><p>${opening.description}</p><span class="opening-card__cta">Découvrir l'ouverture →</span>`;
  card.addEventListener('click', () => openOpening(slug));
  li.appendChild(card);
  grid.appendChild(li);
});

const homeCanvas = document.getElementById('home-canvas');
const homeEngine = ChessEngine.create({ canvas: homeCanvas, idle: true });
homeEngine.flyIn(1300);

const homeScreen = document.getElementById('home-screen');
const openingPage = document.getElementById('opening-page');
const openingCanvas = document.getElementById('opening-canvas');
let openingEngine = null;

const hudEco = document.getElementById('hud-eco');
const hudName = document.getElementById('hud-name');
const moveNum = document.getElementById('move-num');
const moveSan = document.getElementById('move-san');
const moveComment = document.getElementById('move-comment');
const progressFill = document.getElementById('progress-fill');
const scrollHint = document.getElementById('scroll-hint');
const scrollTrack = document.getElementById('scroll-track');
const endTitle = document.getElementById('end-title');
const prevBtn = document.getElementById('prev-move');
const nextBtn = document.getElementById('next-move');

let currentObserver = null;
let activeIndex = -1;
let totalMoves = 0;

function openOpening(slug) {
  const opening = OPENINGS[slug];
  homeScreen.classList.add('is-hidden');
  openingPage.classList.add('is-active');
  openingPage.classList.add('snap-scroll');
  hudEco.textContent = opening.eco;
  hudName.textContent = opening.name;
  endTitle.textContent = `Vous connaissez la ligne principale de l'${opening.name}`;

  scrollTrack.innerHTML = '';
  const moves = opening.moves;
  totalMoves = moves.length;
  moves.forEach((move, i) => {
    const step = document.createElement('div');
    step.className = 'scroll-step';
    step.dataset.index = String(i);
    scrollTrack.appendChild(step);
  });

  if (!openingEngine) openingEngine = ChessEngine.create({ canvas: openingCanvas, idle: true });
  else openingEngine.reset();
  openingEngine.flyIn(950);

  function moveLabel(index) {
    const move = moves[index];
    const fullMoveNumber = Math.floor(index / 2) + 1;
    const prefix = move.color === 'w' ? `${fullMoveNumber}.` : `${fullMoveNumber}...`;
    return `${prefix} ${move.san}`;
  }
  // Petit fondu enchaîné quand le texte change, pour que le défilement
  // paraisse plus fluide qu'un remplacement brutal du texte.
  function fadeText(el, text) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      return;
    }
    el.classList.add('is-fading');
    requestAnimationFrame(() => {
      el.textContent = text;
      requestAnimationFrame(() => el.classList.remove('is-fading'));
    });
  }
  function updateHud(index) {
    if (index < 0) {
      moveNum.textContent = `0 / ${moves.length}`;
      fadeText(moveSan, 'Position de départ');
      fadeText(moveComment, 'Faites défiler pour découvrir cette ouverture, coup après coup.');
      progressFill.style.width = '0%';
      return;
    }
    moveNum.textContent = `${index + 1} / ${moves.length}`;
    fadeText(moveSan, moveLabel(index));
    fadeText(moveComment, moves[index].comment || '');
    progressFill.style.width = `${((index + 1) / moves.length) * 100}%`;
  }
  function updateArrowState() {
    prevBtn.disabled = activeIndex <= -1;
    nextBtn.disabled = activeIndex >= totalMoves - 1;
  }
  updateHud(-1);
  activeIndex = -1;
  updateArrowState();
  scrollHint.classList.remove('is-hidden');

  window.scrollTo(0, 0);

  if (currentObserver) currentObserver.disconnect();
  let hintHidden = false;
  currentObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const index = parseInt(entry.target.dataset.index, 10);
      openingEngine.goToIndex(moves, index);
      updateHud(index);
      activeIndex = index;
      updateArrowState();
      if (!hintHidden) { hintHidden = true; scrollHint.classList.add('is-hidden'); }
    });
  }, { threshold: 0.6 });
  const steps = Array.from(document.querySelectorAll('.scroll-step'));
  steps.forEach((step) => currentObserver.observe(step));

  const smooth = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  prevBtn.onclick = () => {
    if (activeIndex <= -1) return;
    if (activeIndex === 0) window.scrollTo({ top: 0, behavior: smooth });
    else steps[activeIndex - 1].scrollIntoView({ behavior: smooth, block: 'start' });
  };
  nextBtn.onclick = () => {
    if (activeIndex >= totalMoves - 1) return;
    steps[activeIndex + 1].scrollIntoView({ behavior: smooth, block: 'start' });
  };
}

function closeOpening() {
  openingPage.classList.remove('is-active');
  homeScreen.classList.remove('is-hidden');
  window.scrollTo(0, 0);
}

document.getElementById('back-link').addEventListener('click', closeOpening);
document.getElementById('back-link-2').addEventListener('click', closeOpening);
document.getElementById('restart-link').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  if (openingEngine) openingEngine.flyIn(900);
});

