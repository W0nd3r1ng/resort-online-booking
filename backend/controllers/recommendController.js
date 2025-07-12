// Simple rules-based recommendation logic
function getSeason(month) {
  // Example: April, May, December are peak
  return [4, 5, 12].includes(month) ? 'peak' : 'off-peak';
}

function generateRecommendation({ date, groupSize, occasion, preferences }) {
  const month = new Date(date).getMonth() + 1;
  const season = getSeason(month);
  let recommendation = '';
  let bestRoom = 'Standard Room';

  if (groupSize >= 8) bestRoom = 'Big Cottage';
  else if (groupSize >= 4) bestRoom = 'Family Villa';
  else if (groupSize === 2) bestRoom = 'Couple Suite';

  if (occasion && occasion.toLowerCase().includes('birthday')) {
    recommendation += 'Add Videoke for a fun birthday! ';
  }
  if (preferences && preferences.includes('overnight')) {
    recommendation += 'Consider an overnight stay for more relaxation. ';
  }
  recommendation += `Recommended: ${bestRoom}. Season: ${season === 'peak' ? 'Peak (book early!)' : 'Off-peak (more availability)'}`;

  return { recommendation, season };
}

exports.getRecommendation = async (req, res) => {
  const input = req.body;
  try {
    const rec = generateRecommendation(input);
    res.json(rec);
  } catch (err) {
    console.error('Recommendation error:', err);
    res.status(500).json({ error: 'Failed to generate recommendation.' });
  }
}; 