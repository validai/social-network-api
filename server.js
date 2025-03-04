const express = require('express');
const db = require('./config/connection');
const routes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debugging: Log route initialization
console.log("Initializing API routes...");

app.use('/api', (req, res, next) => {
    console.log(`Request received: ${req.method} ${req.originalUrl}`);
    next();
}, routes);

// Database Connection & Server Start
db.once('open', () => {
    console.log("MongoDB connection established successfully.");
    app.listen(PORT, () => {
        console.log(`API server running on http://localhost:${PORT}`);
    });
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Test Route
app.get('/api/test', (req, res) => {
    console.log("Test route accessed.");
    res.json({ message: 'Server is running!' });
});

// 404 Route Handling
app.use('*', (req, res) => {
    console.warn(`Route Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: "Route Not Found", path: req.originalUrl });
});

module.exports = app;
