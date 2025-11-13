const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Mock Weather
app.get('/weather', (req, res) => {
  res.json({
    temperature: (25 + Math.random()*10).toFixed(1),
    humidity: (50 + Math.random()*30).toFixed(1),
    condition: ["Sunny", "Rainy", "Cloudy", "Windy"][Math.floor(Math.random()*4)]
  });
});

// Mandi data
const mandiData = require('./db.json');
app.get('/mandi', (req, res) => {
  res.json(mandiData);
});

app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));
