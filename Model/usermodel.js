const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    profilePic: {
      type: String, // URL of the profile picture
      default: '', // Default to an empty string if no picture is provided
    },
    university: {
      type: String, // University name or info
      default: '', // Default to an empty string if not provided
    },
    accommodation: {
      type: String, // Accommodation details
      default: '', // Default to an empty string if not provided
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'moderator'], // Example roles; change as per your need
      default: 'user', // Default to 'user' role
    },
    address: {
      type: String, // For storing user address
      default: '', // Default to an empty string if no address is provided
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create a User model
const User = mongoose.model('User', UserSchema);

module.exports = User;
