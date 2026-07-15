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
