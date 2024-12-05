const mongoose = require('mongoose');

// Define schema for the universities
const universitySchema = new mongoose.Schema({
  state: { type: String, required: true },
  university: { type: String, required: true },
});

// Create model based on schema
const University = mongoose.model('University', universitySchema);

module.exports = University;
