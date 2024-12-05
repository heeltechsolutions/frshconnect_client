const express = require('express');
const User = require('../Model/usermodel'); // Import the User model
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// POST route to register a new user
router.post('/register', async (req, res) => {
  const { name, email, password, dob } = req.body;

  // Basic validation
  if (!name || !email || !password || !dob) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      dob,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Both email and password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Send back user data (excluding password)
    const { _id, name, dob } = user;
    res.status(200).json({
      message: 'Login successful',
      user: { _id, name, email, dob },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Use findOne to find the user by email
    const user = await User.findOne({ email });

    // If user is not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If user is found, send the user details
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/updateaccomidation', async (req, res) => {
  const { email } = req.body;  // Get email from the request body
  const { accommodation } = req.body;  // Get accommodation from the request body

  try {
    // Ensure email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Your logic to update accommodation status in the database
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Match user by email
      { accommodation }, // Update accommodation field
      { new: true } // Return the updated user document
    );

    // If user is not found
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Accommodation updated successfully!',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating accommodation:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.put('/updateuniversity', async (req, res) => {
  const { email, university } = req.body;  // Get email and university from the request body

  try {
    // Ensure email and university are provided
    if (!email || !university) {
      return res.status(400).json({ message: 'Email and university are required' });
    }

    // Your logic to update the university in the database
    const updatedUser = await User.findOneAndUpdate(
      { email },  // Match user by email
      { university },  // Update university field
      { new: true }  // Return the updated user document
    );

    // If user is not found
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'University updated successfully!',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating university:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;
