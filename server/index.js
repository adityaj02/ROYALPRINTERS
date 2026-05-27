require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');

const quoteRoutes = require('./routes/quotes');
const contactRoutes = require('./routes/contact');
const portfolioRoutes = require('./routes/portfolio');
const servicesRoutes = require('./routes/services');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Security & Middleware ────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false // allow inline styles/scripts for dev
}));
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
  methods: ['GET', 'POST'],
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Rate Limiting ────────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', apiLimiter);

// ── Static Files (Frontend) ──────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '../public')));

// ── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/quotes', quoteRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/services', servicesRoutes);

// ── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'Royal Printers API' });
});

// ── Catch-all: serve frontend ─────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ── Error Handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`\n🏭  Royal Printers Server running at http://localhost:${PORT}`);
  console.log(`📄  Frontend: http://localhost:${PORT}/`);
  console.log(`🔌  API:      http://localhost:${PORT}/api/health\n`);
});
