const mongoose = require('mongoose');

// Create a schema
const Schema = new mongoose.Schema({
  number: String,
  created: {type:Date, default:Date.now},
  updated: {type:Date, default:Date.now},
  weekday: {
    info: [String],
    from: {
      times: [mongoose.Schema.Types.Mixed],
      label: String
    },
    to: {
      times: [mongoose.Schema.Types.Mixed],
      label: String
    }
  },
  saturday: {
    info: [String],
    from: {
      times: [mongoose.Schema.Types.Mixed],
      label: String
    },
    to: {
      times: [mongoose.Schema.Types.Mixed],
      label: String
    }
  },
  sunday: {
    info: [String],
    from: {
      times: [mongoose.Schema.Types.Mixed],
      label: String
    },
    to: {
      times: [mongoose.Schema.Types.Mixed],
      label: String
    }
  },
});

// Create a model
const Line = mongoose.model('line', Schema);

// Export the model
module.exports = Line;