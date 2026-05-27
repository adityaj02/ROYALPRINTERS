// WHATSAPP_NUMBER is set globally in components.js as window.WHATSAPP_NUMBER

// ── Scroll Reveal ──────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  // Use requestAnimationFrame to avoid layout thrashing during scroll
  requestAnimationFrame(() => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  });
}, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });

function observeReveal() {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}
// Initial observe
observeReveal();
// Re-observe after components inject nav/footer
window.addEventListener('DOMContentLoaded', () => setTimeout(observeReveal, 100));

// ── Nav Scroll Effect ──────────────────────────────────────────────────────
const navEl = document.querySelector('nav');
window.addEventListener('scroll', () => {
  navEl?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Mobile Menu ────────────────────────────────────────────────────────────
// Injected elements need event delegation or binding after insertion
document.addEventListener('click', (e) => {
  const hamburger = e.target.closest('#hamburger');
  const mainNav = document.getElementById('mainNav');
  const mobileNav = document.getElementById('mobileNav');
  
  if (hamburger) {
    mainNav?.classList.toggle('menu-open');
    const isOpen = mainNav?.classList.contains('menu-open');
    hamburger.setAttribute('aria-expanded', isOpen);
    if (mobileNav) mobileNav.setAttribute('aria-hidden', !isOpen);
  } else if (e.target.closest('.nav-mobile a')) {
    // Close mobile menu when a link is clicked
    mainNav?.classList.remove('menu-open');
    document.getElementById('hamburger')?.setAttribute('aria-expanded', 'false');
    if (mobileNav) mobileNav.setAttribute('aria-hidden', 'true');
  }
});

// ── Active Nav Link ────────────────────────────────────────────────────────
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPath || (currentPath === '/' && (href === '/' || href === '/index.html')) || (href !== '/' && currentPath.includes(href.replace('.html','')))) {
    a.classList.add('active');
  }
});

// ── Toast ─────────────────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = `show ${type}`;
  setTimeout(() => toast.className = '', 5000);
}

// ── Build WhatsApp Message Template ───────────────────────────────────────
function buildWhatsAppMessage(data) {
  const lines = [
    '🖨️ *PRINT REQUISITION – Royal Printers*',
    '─────────────────────────────',
    `👤 *Name:* ${data.name || '—'}`,
    `📞 *Phone:* ${data.phone || '—'}`,
    `🏢 *Organisation:* ${data.organization || '—'}`,
    `🖨️ *Service:* ${data.service || data.material || '—'}`,
    `📐 *Dimensions:* ${data.dimensions || '—'}`,
    `📦 *Quantity:* ${data.quantity || '—'}`,
    `📋 *Requirements:*`,
    `${data.brief || '—'}`,
    `🔧 *Installation Required:* ${data.installation ? 'Yes' : 'No'}`,
    '─────────────────────────────',
    '_Please confirm availability and share your best quote. Thank you!_',
  ];
  return lines.join('\n');
}

// ── Redirect to WhatsApp with message ────────────────────────────────────
function redirectToWhatsApp(data) {
  const message = buildWhatsAppMessage(data);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ── Quick Quote Form (Home) ────────────────────────────────────────────────
const quickForm = document.getElementById('quickQuoteForm');
quickForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = quickForm.querySelector('[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Opening WhatsApp…';
  const data = Object.fromEntries(new FormData(quickForm));
  data.brief = data.requirement || data.brief || '';
  // Also post to backend
  try { await fetch('/api/quotes', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) }); } catch(_){}
  redirectToWhatsApp(data);
  showToast('✅ Opening WhatsApp with your quote details!');
  quickForm.reset();
  btn.disabled = false;
  btn.textContent = 'Get Quote on WhatsApp';
});

// ── Full Requisition Form (Contact) ───────────────────────────────────────
const reqForm = document.getElementById('requisitionForm');
reqForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = reqForm.querySelector('[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Opening WhatsApp…';
  const fd = new FormData(reqForm);
  const data = Object.fromEntries(fd);
  data.installation = fd.has('installation');
  // Post to backend
  try { await fetch('/api/quotes', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) }); } catch(_){}
  // Show success banner and redirect to WhatsApp
  const banner = document.getElementById('successBanner');
  if (banner) banner.style.display = 'block';
  redirectToWhatsApp(data);
  showToast('✅ WhatsApp opened with your requisition!');
  reqForm.reset();
  btn.disabled = false;
  btn.textContent = '💬 Submit & WhatsApp Us';
});

// ── Portfolio Filters ──────────────────────────────────────────────────────
const filterBtns = document.querySelectorAll('[data-filter]');
const portfolioGrid = document.getElementById('portfolioGrid');

async function loadPortfolio(category = 'all') {
  if (!portfolioGrid) return;
  portfolioGrid.innerHTML = '<div style="color:var(--text-muted);text-align:center;padding:60px;grid-column:1/-1">Loading…</div>';
  try {
    const url = category === 'all' ? '/api/portfolio' : `/api/portfolio?category=${category}`;
    const res = await fetch(url);
    const data = await res.json();
    renderPortfolio(data.projects);
  } catch {
    portfolioGrid.innerHTML = '<p style="color:var(--text-muted);text-align:center;grid-column:1/-1">Failed to load portfolio. Please refresh.</p>';
  }
}

function renderPortfolio(projects) {
  if (!portfolioGrid) return;
  const icons = { 'large-format-flex':'🏙️', 'premium-vinyl':'🪟', 'bespoke-signs':'✨', 'canvas-prints':'🖼️', 'retail-branding':'🏷️', 'digital-print':'🖨️', 'business-cards':'💼', 'diary-branding':'📒' };
  portfolioGrid.innerHTML = projects.map(p => `
    <article class="card reveal">
      <div style="background:var(--cream-2);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;font-size:3.5rem;border-bottom:1px solid var(--border-light);">${icons[p.category] || '🖨️'}</div>
      <div class="card-body">
        <div class="card-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-desc">${p.description}</p>
        <div style="margin-top:10px;font-size:0.78rem;color:var(--text-muted);">📐 ${p.size}</div>
      </div>
    </article>`).join('');
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadPortfolio(btn.dataset.filter);
  });
});

if (portfolioGrid) loadPortfolio();
