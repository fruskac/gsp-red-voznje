const Line = require('../models/line');
const { createResponseOneLine, createResponseAllLine } = require('../helpers/lines');

module.exports = {

  // get list of all records from lines collection
  getAll: async (req, res, next) => {

    const lines = await Line.find({ });

    if (lines) {
      res.status(200).json( createResponseAllLine(lines) );
      return;
    }

    res.status(404).json({ error: 'Not Found' });
  },

  // get record by id from lines collection
  get: async (req, res, next) => {
    const oneLine = await Line.findOne({ _id: req.params.id });

    if (oneLine) {
      res.status(200).json( createResponseOneLine(oneLine) );
      return;
    }
    
    res.status(404).json({ error: 'Not Found' });
  },

  // create new record inside lines collection
  create: async (req, res, next) => {

    const { number, weekday, saturday, sunday } = req.value.body;

    const newLine = new Line({ number, weekday, saturday, sunday });
    await newLine.save();

    res.status(201).json({ message: 'Record created successfully' });
  },
  
  // update record by id inside lines collection
  update: async (req, res, next) => {
    const { number, weekday, saturday, sunday } = req.value.body;

    const oneLine = await Line.findOne({ _id: req.params.id });
    
    if (oneLine) {
      await oneLine.set({ number, weekday, saturday, sunday, updated: new Date() });
      await oneLine.save();

      res.status(200).json({ message: 'Record updated successfully' });
      return;
    }
    
    res.status(204).json({ error: 'Not Found' });
  },
    
  // delete record by id from lines collection
  delete: async (req, res, next) => {
    const oneLine = await Line.findOne({ _id: req.params.id });
    
    if (oneLine) {
      
      await oneLine.remove();

      res.status(200).json({ message: 'Record deleted successfully' });
      return;
    }

    res.status(204).json({ error: 'Not Found' });
  }
}