const mongoose = require('mongoose');

// Define the message schema
const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Message model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
