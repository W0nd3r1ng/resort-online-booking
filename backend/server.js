const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bookRoutes = require('./routes/book');
const reviewRoutes = require('./routes/review');
const recommendRoutes = require('./routes/recommend');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/book', bookRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/recommend', recommendRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 