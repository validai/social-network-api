const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected to:', MONGODB_URI);
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB Connection Error:', err);
});

module.exports = mongoose.connection;
