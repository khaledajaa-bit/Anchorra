// ---------- Floating star particles ----------
const starsContainer = document.getElementById('stars');
const starColors = ['#ffffff', '#ffffff', '#ffffff', '#c9a3ff', '#f2b705'];

function createStars(count = 70) {
  if (!starsContainer) return;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star-dot';

    const size = Math.random() * 2.2 + 1; // 1px - 3.2px
    const dx = (Math.random() * 24 - 12).toFixed(1) + 'px'; // -12px to 12px
    const dy = (Math.random() * 24 - 12).toFixed(1) + 'px';
    const duration = (Math.random() * 8 + 6).toFixed(1) + 's'; // 6s - 14s
    const delay = (Math.random() * 6).toFixed(1) + 's';

    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.background = starColors[Math.floor(Math.random() * starColors.length)];
    star.style.setProperty('--dx', dx);
    star.style.setProperty('--dy', dy);
    star.style.animationDuration = duration;
    star.style.animationDelay = delay;

    starsContainer.appendChild(star);
  }
}

createStars();

// ---------- Scroll-triggered reveal ----------
const revealEls = document.querySelectorAll('.reveal-on-scroll');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => revealObserver.observe(el));

// ---------- Trust bar fill (animates once the HUD is in view) ----------
const barFill = document.querySelector('.bar-fill');
const hud = document.querySelector('.hud');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && barFill) {
      const target = barFill.dataset.fill || 0;
      barFill.style.width = target + '%';
      barObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

if (hud) barObserver.observe(hud);

// ---------- Typewriter effect for the agent's speech ----------
const speechText =
  "Welcome, traveler. In an ocean of empty tokens, I mark the ones tethered to something real — property, commodities, credit, and yield-bearing instruments. I verify their custody, watch their valuations drift, and report back to anyone holding $ANCHR. Where others promise, I anchor.";

const typedEl = document.getElementById('typedSpeech');
let typeIndex = 0;
let hasTyped = false;

function typeSpeech() {
  if (typeIndex < speechText.length) {
    typedEl.textContent += speechText.charAt(typeIndex);
    typeIndex++;
    setTimeout(typeSpeech, 18);
  }
}

const typeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !hasTyped && typedEl) {
      hasTyped = true;
      typeSpeech();
      typeObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

if (hud) typeObserver.observe(hud);

// ---------- Subtle parallax on the starfield ----------
const stars = document.getElementById('stars');

window.addEventListener('mousemove', (e) => {
  if (!stars) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  stars.style.transform = `translate(${x}px, ${y}px)`;
});

// ---------- Buy buttons (placeholder action, wire up to Virtuals link later) ----------
document.querySelectorAll('.btn-buy').forEach((btn) => {
  btn.addEventListener('click', () => {
    // TODO: replace with the live Virtuals Protocol trading link once $ANCHR launches
    console.log('Buy button clicked — connect this to the Virtuals trading link.');
  });
});
