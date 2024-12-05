const express = require('express');
const router = express.Router();
const University = require('../Model/University');  // Import the University model

// Route to get universities by state
router.get('/:state', async (req, res) => {
  const state = req.params.state;

  try {
    // Fetch universities from the database by state
    const universities = await University.find({ state: state }).exec();

    // Check if universities were found
    if (universities.length > 0) {
      return res.json(universities);  // Return the list of universities
    } else {
      return res.status(404).json({ message: `No universities found for ${state}` });
    }
  } catch (err) {
    console.error('Error fetching universities:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
