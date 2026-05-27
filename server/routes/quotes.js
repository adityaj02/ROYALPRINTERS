const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const quotes = [];
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '919212405987';

const validateQuote = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('phone').trim().notEmpty().withMessage('Phone is required').matches(/^[+\d\s\-()]{7,20}$/),
  body('organization').trim().optional().isLength({ max: 200 }),
  body('service').trim().optional().isLength({ max: 200 }),
  body('material').trim().optional().isLength({ max: 200 }),
  body('dimensions').trim().optional().isLength({ max: 200 }),
  body('quantity').trim().optional().isLength({ max: 100 }),
  body('brief').trim().notEmpty().withMessage('Project brief is required').isLength({ max: 2000 }),
  body('installation').optional().isBoolean(),
];

// Build WhatsApp message template (mirror of client-side)
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

// POST /api/quotes
router.post('/', validateQuote, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const quote = {
    id: Date.now().toString(),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  quotes.push(quote);
  console.log('📋 New quote requisition:', quote);

  const waMessage = buildWhatsAppMessage(quote);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  res.status(201).json({
    success: true,
    message: 'Requisition received. Redirecting to WhatsApp…',
    referenceId: quote.id,
    whatsappLink,
  });
});

// GET /api/quotes - List all (admin)
router.get('/', (req, res) => {
  res.json({ total: quotes.length, quotes });
});

module.exports = router;
