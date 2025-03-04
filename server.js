const express = require('express');
const db = require('./config/connection');
const routes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});
