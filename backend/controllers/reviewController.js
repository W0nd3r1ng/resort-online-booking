const pool = require('../db');

// Create a new review
exports.createReview = async (req, res) => {
  const { customerName, rating, comment, date } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO reviews (customerName, rating, comment, date) VALUES (?, ?, ?, ?)',
      [customerName, rating, comment, date]
    );
    res.json({ success: true, reviewId: result.insertId });
  } catch (err) {
    console.error('Review error:', err);
    res.status(500).json({ success: false, error: 'Failed to create review.' });
  }
}; 