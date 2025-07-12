const pool = require('../db');

// Create a new booking
exports.createBooking = async (req, res) => {
  const { name, groupSize, date, occasion, preferences } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO bookings (name, groupSize, date, occasion, preferences) VALUES (?, ?, ?, ?, ?)',
      [name, groupSize, date, occasion, JSON.stringify(preferences || [])]
    );
    res.json({ success: true, bookingId: result.insertId });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ success: false, error: 'Failed to create booking.' });
  }
}; 