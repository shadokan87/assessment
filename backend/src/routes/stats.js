const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');
const cache = new Map();
// GET /api/stats
router.get('/', (req, res, next) => {
  fs.readFile(DATA_PATH, (err, raw) => {
    if (err) return next(err);
    const rawString = raw.toString();
    const cached = cache.get(rawString);
    if (cached) {
      return res.json(cached);
    }
    const items = JSON.parse(raw);
    // Intentional heavy CPU calculation
    const stats = {
      total: items.length,
      averagePrice: items.reduce((acc, cur) => acc + cur.price, 0) / items.length
    };
    cache.set(rawString, stats);
    res.json(stats);
  });
});

module.exports = router;