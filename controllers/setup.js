const Line = require('../models/line');
const parameters = require('../config/gspns');
const { getFinalData } = require('../helpers/setup');

module.exports = {

  // get data from gspns website
  get: async (req, res, next) => {

    if (parameters['_' + req.params.id]) {
      const { weekday, saturday, sunday } = await getFinalData(parameters['_' + req.params.id]);

      res.status(200).json({ number: req.params.id, weekday, saturday, sunday });
      return;
    }

    res.status(404).json({ error: 'Not Found' });
  },

  // get data from gspns website and save inside database
  create: async (req, res, next) => {

    if (parameters['_' + req.params.id]) {
      const { weekday, saturday, sunday } = await getFinalData(parameters['_' + req.params.id]);

      const newLine = new Line({ number: req.params.id, weekday, saturday, sunday });
      await newLine.save();
      
      res.status(201).json({ message: 'Record created successfully' });
      return;
    }
    
    res.status(404).json({ error: 'Not Found' });
  }
}