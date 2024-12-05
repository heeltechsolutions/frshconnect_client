const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// MongoDB Schema
const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  passFee: { type: Number, required: true },
  university: { type: String, required: true },
});

// MongoDB Model
const Event = mongoose.model("Event", EventSchema);

// Create Event Entry
router.put("/add", async (req, res) => {
  try {
    const { collegeName, eventName, date, time, passFee, university } = req.body;
    const newEvent = new Event({
      collegeName,
      eventName,
      date,
      time,
      passFee,
      university,
    });

    await newEvent.save();
    res.status(200).json({ message: "Event data added successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error adding event data", error: err.message });
  }
});

// Route to delete an event by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
});

// Route to update an event by ID
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { collegeName, eventName, date, time, passFee, university } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { collegeName, eventName, date, time, passFee, university },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully!", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
});

// Route to get events with pagination and search by event name
router.get("/", async (req, res) => {
  try {
    const { page = 1, search = "" } = req.query;
    const perPage = 30;
    const query = search
      ? { eventName: { $regex: search, $options: "i" } }
      : {}; // Search by event name
    const events = await Event.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);
    const totalCount = await Event.countDocuments(query);

    const totalPages = Math.ceil(totalCount / perPage);
    res.json({ events, totalPages });
  } catch (error) {
    res.status(500).json({ message: "Error fetching event data", error });
  }
});

module.exports = router;