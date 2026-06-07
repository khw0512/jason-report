const express = require('express');
const router = express.Router();
const pool = require('../db');
const { requireAuth } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles ORDER BY published_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles WHERE featured = true LIMIT 1');
    res.json(result.rows[0] || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/latest', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM articles WHERE featured = false ORDER BY published_date DESC LIMIT 4'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, excerpt, published_date, image_url, featured, location, body } = req.body;
    if (!title || !published_date) return res.status(400).json({ error: 'title and published_date are required' });
    const result = await pool.query(
      `INSERT INTO articles (title, excerpt, published_date, image_url, featured, location, body)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, excerpt || null, published_date, image_url || null, featured || false, location || null, body ? JSON.stringify(body) : null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { title, excerpt, published_date, image_url, featured, location, body } = req.body;
    if (!title || !published_date) return res.status(400).json({ error: 'title and published_date are required' });
    const result = await pool.query(
      `UPDATE articles SET title=$1, excerpt=$2, published_date=$3, image_url=$4, featured=$5, location=$6, body=$7
       WHERE id=$8 RETURNING *`,
      [title, excerpt || null, published_date, image_url || null, featured || false, location || null, body ? JSON.stringify(body) : null, req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM articles WHERE id = $1 RETURNING id', [req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Not found' });
    res.json({ deleted: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
