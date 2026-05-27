const express = require('express');
const router = express.Router();

const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '919212405987';

const services = [
  {
    id: 'digital-print',
    slug: 'digital-print',
    title: 'Digital Print',
    shortDesc: 'High-resolution digital prints up to 13"×51" — stickers, jagran cards, visiting cards.',
    specs: { printWidth: 'Up to 13" × 51"', resolution: 'Up to 1440 dpi', products: 'Stickers, Jagran Cards, Wedding/Birthday Cards, Digital Visiting Cards', media: 'Coated Paper, Glossy, Matte, Vinyl' },
    tags: ['Digital', 'Stickers', 'Jagran Cards', 'Visiting Cards'],
    icon: '🖨️',
  },
  {
    id: 'star-flex',
    slug: 'star-flex-print-cut',
    title: 'Star Flex Print & Cut (Roland Eco Solvent)',
    shortDesc: 'Roland Eco Solvent precision print & cut for shaped vinyl, decals and retail branding.',
    specs: { machine: 'Roland Eco Solvent Print & Cut', resolution: 'Up to 1440 dpi', cutPrecision: '±0.1mm', mediaWidth: 'Up to 64"', applications: 'Vehicle decals, shaped stickers, retail POP' },
    tags: ['Roland', 'Eco Solvent', 'Print & Cut', 'Stickers'],
    icon: '✂️',
  },
  {
    id: 'flex-solvent',
    slug: 'flex-solvent-printing',
    title: 'Flex & Solvent Printing',
    shortDesc: 'Industrial frontlit/backlit flex for hoardings, events and outdoor advertising.',
    specs: { media: 'Frontlit / Backlit Flex', gsm: '280 – 400 GSM', resolution: '720 – 1440 dpi', maxWidth: '12ft seamless', finishing: 'Hemming, Eyelets, Pocket Stitching' },
    tags: ['Frontlit', 'Backlit', 'Hoarding', 'Solvent'],
    icon: '🏙️',
  },
  {
    id: 'business-cards',
    slug: 'business-cards-stationery',
    title: 'Business Cards, Letter Head & Tag',
    shortDesc: 'Premium business cards, letter heads, tags, invoice books and digital visiting cards.',
    specs: { businessCards: 'Standard, Die-cut, Spot UV, Embossed', letterHead: 'A4/A5, Single & Double Side', visitingCards: 'Digital / QR-coded', tags: 'Custom shape, cord, hole-punched', invoiceBook: 'Custom printed, carbon copy sets' },
    tags: ['Business Cards', 'Letter Head', 'Tags', 'Invoice Book'],
    icon: '💼',
  },
  {
    id: 'diary-branding',
    slug: 'diary-branding-print',
    title: 'Diary & Branding Print',
    shortDesc: 'Custom branded diaries, catalogues, pamphlets, brochures, leaflets and posters.',
    specs: { diaries: 'A4/A5, Custom cover, Branded pages', catalogues: 'Perfect bound / Saddle stitched', pamphlets: 'A4, A5, DL, Tri-fold, Z-fold', brochures: 'Multi-page, Spot UV / Matte laminate', posters: 'A0–A3, Full bleed colour' },
    tags: ['Diary', 'Catalogue', 'Pamphlet', 'Brochure'],
    icon: '📒',
  },
  {
    id: 'vinyl',
    slug: 'premium-vinyl-graphics',
    title: 'Premium Vinyl Graphics',
    shortDesc: 'Precision-cut adhesive vinyl for storefronts, vehicles, offices and interiors.',
    specs: { media: 'Calendered & Cast Vinyl', finishes: 'Matte / Gloss / Chrome / Frosted', outdoorLife: '3 – 7 years', applications: 'Glass, Vehicle, Wall, Floor', lamination: 'Gloss / Matte / Anti-scratch' },
    tags: ['Window Graphics', 'Frosting', 'Fleet Wrap', 'Decals'],
    icon: '🪟',
  },
];

// GET /api/services
router.get('/', (req, res) => {
  res.json({ total: services.length, services });
});

// GET /api/services/:slug
router.get('/:slug', (req, res) => {
  const service = services.find(s => s.slug === req.params.slug || s.id === req.params.slug);
  if (!service) return res.status(404).json({ error: 'Service not found' });
  res.json(service);
});

module.exports = router;
