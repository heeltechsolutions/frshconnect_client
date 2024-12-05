const express = require('express');
const router = express.Router();
const Transport = require('../Model/Transport');

// Fetch all transports with pagination and search
router.get('/', async (req, res) => {
  const { page = 1, search = "" } = req.query;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  try {
    const transports = await Transport.find({ $or: [{ from: { $regex: search, $options: "i" } }, { to: { $regex: search, $options: "i" } }] })
      .skip(skip)
      .limit(pageSize);
    const total = await Transport.countDocuments();
    res.json({ transports, totalPages: Math.ceil(total / pageSize) });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transport data' });
  }
});

// Add a new transport
router.post('/add', async (req, res) => {
  const { from, to, busDetails, trainDetails, flightDetails, cabDetails, description } = req.body;
  try {
    const newTransport = new Transport({ from, to, busDetails, trainDetails, flightDetails, cabDetails, description });
    await newTransport.save();
    res.status(201).json({ message: 'Transport added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add transport' });
  }
});

// Edit an existing transport
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { from, to, busDetails, trainDetails, flightDetails, cabDetails, description } = req.body;
  try {
    const updatedTransport = await Transport.findByIdAndUpdate(id, { from, to, busDetails, trainDetails, flightDetails, cabDetails, description }, { new: true });
    res.json({ message: 'Transport updated successfully!', updatedTransport });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update transport' });
  }
});

// Delete a transport
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Transport.findByIdAndDelete(id);
    res.json({ message: 'Transport deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete transport' });
  }
});

module.exports = router;
