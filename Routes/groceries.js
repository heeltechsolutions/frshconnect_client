const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// MongoDB Schema
const GrocerySchema = new mongoose.Schema({
  groceryName: { type: String, required: true },
  university: { type: String, required: true },
  distance: { type: Number, required: true },
  shopLink: { type: String, required: true },
});

// MongoDB Model
const Grocery = mongoose.model("Grocery", GrocerySchema);

// Create Grocery Entry
router.put("/add", async (req, res) => {
    try {
      const { groceryName, university, distance, shopLink } = req.body;
      const newGrocery = new Grocery({
        groceryName,
        university,
        distance,
        shopLink,
      });
  
      await newGrocery.save();
      res.status(200).json({ message: "Grocery data added successfully!" });
    } catch (err) {
      res.status(500).json({ message: "Error adding grocery data", error: err.message });
    }
  });
  

  // Route to delete a grocery store by ID
router.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const grocery = await Grocery.findByIdAndDelete(id);
      
      if (!grocery) {
        return res.status(404).json({ message: 'Grocery store not found' });
      }
  
      res.status(200).json({ message: 'Grocery store deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting grocery store', error });
    }
  });
  
  // Route to update a grocery store by ID
  router.put('/edit/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { groceryName, university, distance, shopLink } = req.body;
  
      const updatedGrocery = await Grocery.findByIdAndUpdate(id, {
        groceryName,
        university,
        distance,
        shopLink,
      }, { new: true });
  
      if (!updatedGrocery) {
        return res.status(404).json({ message: 'Grocery store not found' });
      }
  
      res.status(200).json({ message: 'Grocery store updated successfully!', grocery: updatedGrocery });
    } catch (error) {
      res.status(500).json({ message: 'Error updating grocery store', error });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const { page = 1, search = '' } = req.query;
      const perPage = 30;
      const query = search ? { groceryName: { $regex: search, $options: 'i' } } : {}; // Search by grocery name
      const groceries = await Grocery.find(query)
        .skip((page - 1) * perPage)
        .limit(perPage);
      const totalCount = await Grocery.countDocuments(query);
  
      const totalPages = Math.ceil(totalCount / perPage);
      res.json({ groceries, totalPages });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching grocery data', error });
    }
  });

module.exports = router;
