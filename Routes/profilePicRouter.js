const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const User = require('../Model/usermodel'); // Mongoose model for User
const router = express.Router();

// Create uploads folder if it doesn't exist
const uploadFolder = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder); // Save to uploads folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext; // Add a timestamp to avoid conflicts
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// Profile update endpoint to handle image upload
router.put('/updateprofile', upload.single('profilePic'), async (req, res) => {
  const { email } = req.body; // Get email from request body

  // Check if file is uploaded
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Save the file URL
  const fileUrl = `/uploads/${req.file.filename}`;

  try {
    // Find user by email and update their profile picture URL
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile picture in the database
    user.profilePic = fileUrl;
    await user.save();

    // Respond with the new profile picture URL
    res.status(200).json({ message: 'Profile picture updated successfully', profilePicUrl: fileUrl });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ message: 'Error updating profile picture' });
  }
});



  

module.exports = router;
