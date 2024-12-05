const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    busDetails: {
      type: String,
      required: true,
    },
    trainDetails: {
      type: String,
      required: true,
    },
    flightDetails: {
      type: String,
      required: true,
    },
    cabDetails: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

const Transport = mongoose.model('Transport', transportSchema);

module.exports = Transport;
