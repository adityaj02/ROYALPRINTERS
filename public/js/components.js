// Shared nav + footer HTML injected by each page

window.WHATSAPP_NUMBER = '919212405987';

const NAV_HTML = `
<nav id="mainNav">
  <div class="nav-inner">
    <a href="/" class="nav-logo" aria-label="Royal Printers Home">
      <div class="logo-icon">RP</div>
      <span class="logo-text">Royal <span>Printers</span></span>
    </a>
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/services.html">Services</a></li>
      <li><a href="/contact.html">Contact</a></li>
    </ul>
    <a href="/contact.html" class="btn btn-primary btn-sm nav-cta">Get a Quote</a>
    <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
  </div>
  <div class="nav-mobile" id="mobileNav" aria-hidden="true">
    <a href="/">Home</a>
    <a href="/services.html">Services</a>
    <a href="/contact.html">Contact &amp; Quote</a>
    <div class="nav-mobile-cta">
      <a href="/contact.html" class="btn btn-primary">💬 Get WhatsApp Quote</a>
    </div>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="nav-logo" style="display:inline-flex;gap:10px;align-items:center;margin-bottom:4px;">
          <div class="logo-icon" style="background:linear-gradient(135deg,#A07830,#C9A84C);">RP</div>
          <span class="footer-logo-text">Royal <span>Printers</span></span>
        </div>
        <p>Delhi's trusted printing partner since 2014. Precision flex, vinyl, digital print and branding solutions — delivered with uncompromising quality.</p>
        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Royal%20Printers!%20I%20need%20a%20quote." target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm" style="margin-top:20px;">💬 WhatsApp Us</a>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="/services.html#flex">Flex Printing</a></li>
          <li><a href="/services.html#vinyl">Vinyl Graphics</a></li>
          <li><a href="/services.html#digital">Digital Print</a></li>
          <li><a href="/services.html#star">Star Flex Print &amp; Cut</a></li>
          <li><a href="/services.html#cards">Business Cards</a></li>
          <li><a href="/services.html#diary">Diary &amp; Branding</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="/contact.html">Contact Us</a></li>
          <li><a href="/contact.html">Get a Quote</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        <ul>
          <li><a href="tel:+919212405987">📞 +91 92124 05987</a></li>
          <li><a href="tel:+919310175191">📞 +91 93101 75191</a></li>
          <li><a href="mailto:royalflexwale@gmail.com">✉️ royalflexwale@gmail.com</a></li>
          <li><a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">💬 WhatsApp Support</a></li>
          <li><span>📍 246, Gali No.1, Near Rohini Sec-2 Govt. Sr. Sec. School, Mangol Pur Kalan, Delhi – 110086</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} Royal Printers Delhi. All rights reserved.</span>
      <span>royalflexwale@gmail.com</span>
    </div>
  </div>
</footer>
<div id="toast"></div>
<a id="floatWA"
   href="https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Royal%20Printers!%20I%20need%20a%20quote."
   target="_blank" rel="noopener noreferrer"
   aria-label="Chat on WhatsApp">💬</a>`;

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
});
