const express = require('express');
const app     = express();

// Middleware

// Routes
app.use('/lines', require('./routes/lines'));


// API Documentation
app.all('/', (req, res) => {
  res.status(200).json({ message: 'TODO: API Documentation' });
});

// Invalid url
app.all('*', (req, res) => {
  res.status(404).json({ error: 'URL is not found' });
});

// Start the server
const port = process.env.PORT || 3000;

app.listen(port);

console.log(`Server listening at: ${port}`);