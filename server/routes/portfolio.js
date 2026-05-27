const express = require('express');
const router = express.Router();

const portfolio = [
  {
    id: 1,
    title: 'Sticker Sheet Pack – Retail Brand',
    category: 'digital-print',
    tags: ['Digital', 'Stickers', '13"×51"'],
    size: 'A4 sheets × 1000',
    client: 'Retail Brand',
    description: 'Vivid digital sticker sheets printed on premium glossy vinyl, precision die-cut for retail packaging.',
  },
  {
    id: 2,
    title: 'Jagran Cards – Religious Event',
    category: 'digital-print',
    tags: ['Digital', 'Jagran Cards', 'Event'],
    size: '4"×6" × 2000 pcs',
    client: 'Community Event',
    description: 'High-colour jagran & devotional cards with vibrant imagery, finished in gloss laminate.',
  },
  {
    id: 3,
    title: 'Building Hoarding – Rohini Mall',
    category: 'large-format-flex',
    tags: ['Frontlit', '400 GSM', 'Outdoor'],
    size: '40ft × 20ft',
    client: 'Commercial Client',
    description: 'Massive frontlit flex hoarding installation with UV-stable inks for premium outdoor visibility.',
  },
  {
    id: 4,
    title: 'Vehicle Fleet Decals – Delivery Brand',
    category: 'premium-vinyl',
    tags: ['Roland', 'Eco Solvent', 'Fleet Wrap'],
    size: '12 vehicles',
    client: 'Logistics Company',
    description: 'Roland Eco Solvent precision-cut contour vinyl decals applied to 12 delivery vehicles.',
  },
  {
    id: 5,
    title: 'Premium Business Cards – Consulting Firm',
    category: 'business-cards',
    tags: ['Soft-touch Matte', 'Embossed', 'Business Cards'],
    size: '90mm×54mm × 500 pcs',
    client: 'Consulting Firm',
    description: 'Luxury soft-touch matte business cards with foil embossed logo for a management consultancy.',
  },
  {
    id: 6,
    title: 'Corporate Diary Set – Annual Gift',
    category: 'diary-branding',
    tags: ['A5 Diary', 'Branded', 'Corporate Gift'],
    size: '200 units',
    client: 'Corporate Client',
    description: 'Custom branded A5 diaries with company logo on cover, personalized inner pages for annual gifting.',
  },
  {
    id: 7,
    title: 'Product Catalogue – FMCG Brand',
    category: 'diary-branding',
    tags: ['Catalogue', 'Perfect Bound', 'Spot UV'],
    size: '32 pages × 500 copies',
    client: 'FMCG Company',
    description: 'Full-colour perfect-bound product catalogue with spot UV cover finish for trade-fair distribution.',
  },
  {
    id: 8,
    title: 'Window Frosting – Tech Office',
    category: 'premium-vinyl',
    tags: ['Frosted Vinyl', 'Glass', 'Corporate'],
    size: '180 sqft',
    client: 'IT Company',
    description: 'Precision-cut frosted vinyl applied to office partitions and glass panels across two floors.',
  },
  {
    id: 9,
    title: 'Event Backdrop – Trade Fair Delhi',
    category: 'large-format-flex',
    tags: ['Backlit', 'Event', 'Trade Fair'],
    size: '12ft × 8ft',
    client: 'Event Management',
    description: 'Premium backlit flex event backdrop with photographic quality print for a Delhi trade exhibition.',
  },
];

// GET /api/portfolio
router.get('/', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'all') {
    const filtered = portfolio.filter(p => p.category === category);
    return res.json({ total: filtered.length, projects: filtered });
  }
  res.json({ total: portfolio.length, projects: portfolio });
});

// GET /api/portfolio/:id
router.get('/:id', (req, res) => {
  const project = portfolio.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

module.exports = router;
