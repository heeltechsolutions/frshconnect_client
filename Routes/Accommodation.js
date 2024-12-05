const express = require("express");
const router = express.Router();
const Accommodation = require("../Model/Accommodation.js"); // Import the accommodation model

// Route to fetch accommodations with pagination and search
router.get("/", async (req, res) => {
  const { page = 1, search = "" } = req.query;
  const limit = 10; // Number of items per page
  const skip = (page - 1) * limit;

  try {
    const totalAccommodations = await Accommodation.countDocuments({
      placeName: { $regex: search, $options: "i" }, // Case-insensitive search by place name
    });
    const accommodations = await Accommodation.find({
      placeName: { $regex: search, $options: "i" },
    })
      .skip(skip)
      .limit(limit);

    res.json({
      accommodations,
      totalPages: Math.ceil(totalAccommodations / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching accommodations", error });
  }
});

// Route to add a new accommodation
router.post("/accommodation", async (req, res) => {
  const { placeLink, space, rent, placeName, university, contact,distance,Useremail,status } = req.body;

  try {
    const newAccommodation = new Accommodation({
      placeLink,
      space,
      rent,
      placeName,
      university,
      contact,
      distance,
      Useremail,
      status
    });

    await newAccommodation.save();
    res.status(201).json({ message: "Accommodation added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding accommodation", error });
  }
});

// Route to update an accommodation
router.put("/accommodation/:id", async (req, res) => {
  const { id } = req.params;
  const { placeLink, space, rent, placeName, university, contact,distance,status } = req.body;

  try {
    const accommodation = await Accommodation.findByIdAndUpdate(
      id,
      { placeLink, space, rent, placeName, university, contact,distance,status },
      { new: true }
    );

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.json({ message: "Accommodation updated successfully!", accommodation });
  } catch (error) {
    res.status(500).json({ message: "Error updating accommodation", error });
  }
});

// Route to delete an accommodation
router.delete("/accommodation/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const accommodation = await Accommodation.findByIdAndDelete(id);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.json({ message: "Accommodation deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting accommodation", error });
  }
});

module.exports = router;
