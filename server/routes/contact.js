const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const messages = [];
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '919212405987';

const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').trim().optional().matches(/^[+\d\s\-()]{7,20}$/),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
];

// POST /api/contact
router.post('/', validateContact, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const message = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };

  messages.push(message);
  console.log('📬 New contact message:', message);

  // Generate WhatsApp link with message template
  const waText = [
    '💬 *MESSAGE – Royal Printers*',
    '─────────────────────────────',
    `👤 *Name:* ${req.body.name || '—'}`,
    `✉️ *Email:* ${req.body.email || '—'}`,
    `📞 *Phone:* ${req.body.phone || '—'}`,
    `💬 *Message:*`,
    `${req.body.message || '—'}`,
  ].join('\n');

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  res.status(201).json({
    success: true,
    message: 'Thank you! Redirecting to WhatsApp…',
    whatsappLink,
  });
});

// GET /api/contact - List all messages (admin)
router.get('/', (req, res) => {
  res.json({ total: messages.length, messages });
});

module.exports = router;
