const express = require('express');
const cors = require('cors');  // Add CORS for cross-origin requests
const connectDB = require('./db/db');
const userRouter = require('./Routes/userRouter');
const userProfile = require('./Routes/profilePicRouter');
const dotenv = require('dotenv'); // To handle environment variables
const path = require('path');
const Grocery = require('./Routes/groceries')
const Transport = require('./Routes/Transport')
const Accomidation = require('./Routes/Accommodation')
const Event = require('./Routes/events')

const universityRouter = require('./Routes/universityRoutes');
// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON data
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
connectDB();

// Define Routes
app.use('/api/accommodation',Accomidation)
app.use('/api/users', userRouter);
app.use('/api/groceries', Grocery);
app.use("/api/transport", Transport);
app.use('/api/users', userProfile);  // Routes related to users
const Message = require('./Model/Message');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Basic route for health check
app.get('/', (req, res) => {
    res.send('API is running');
});
app.use("/api/events",Event)
app.use('/api/universities', universityRouter);
// Global error handling middleware (after all routes)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});
app.get('/messages/:room', async (req, res) => {
    try {
      const { room } = req.params;
      const messages = await Message.find({ room }).sort({ createdAt: 1 });
      res.json(messages);
    } catch (err) {
      console.error('Error fetching messages:', err);
      res.status(500).send('Server error');
    }
  });
  
// Start the server
const PORT = process.env.PORT || 5500;  // Get port from environment variable or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
