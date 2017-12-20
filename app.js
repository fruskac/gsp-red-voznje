const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const cors       = require('cors')
const app        = express();

const { database }  = require('./config/database');
const documentation = require('./config/documentation');

// Database
mongoose.Promise = global.Promise;
mongoose.connect(database);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/lines', require('./routes/lines'));
app.use('/setup', require('./routes/setup'));


// API Documentation
app.all('/', (req, res) => {
  res.status(200).json(documentation);
});

// Invalid url
app.all('*', (req, res) => {
  res.status(404).json({ error: 'URL is not found' });
});

// Start the server
const port = process.env.PORT || 3000;

app.listen(port);

console.log(`Server listening at: ${port}`);