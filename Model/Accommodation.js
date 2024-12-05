const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  placeLink: {
    type: String,
    required: false,
  },
  space: {
    type: String,
    required: false,
  },
  rent: {
    type: String,
    required: false,
  },
  placeName: {
    type: String,
    required: false,
  },
  university: {
    type: String,
    required: false,
  },
  contact: {
    type: String,
    required: false,
  },
  distance: {
    type: String,
    required: false,
  },
  Useremail: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // Valid values for the status
    default: "active", // Default value
    required: true,
  },
});

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

module.exports = Accommodation;
