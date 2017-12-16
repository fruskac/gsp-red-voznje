module.exports = {
  getLine: async (req, res, next) => {
    res.status(200).json({ message: 'TODO: Informations about bus lines' });
  },

  setLine: async (req, res, next) => {
    res.status(201).json({ message: 'TODO: Create new bus line' });
  },
  
  updateLine: async (req, res, next) => {
    res.status(200).json({ message: 'TODO: Update bus line' });
  },
    
  deleteLine: async (req, res, next) => {
    res.status(200).json({ message: 'TODO: Delete bus line' });
  }
}