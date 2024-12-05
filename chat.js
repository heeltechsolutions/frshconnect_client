const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./db/db');
const cors = require('cors');
const mongoose = require('mongoose'); // Import mongoose
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://fresh-connect.online", // The frontend's URL (React app)
    methods: ["GET", "POST"]
  }
});

// Enable CORS for all routes (if required)
app.use(cors({ origin: "https://fresh-connect.online" }));

// Connect to MongoDB
connectDB();

// MongoDB Message Schema
const messageSchema = new mongoose.Schema({
  text: String,
  email: String,
  room: String,
  profilePic: String,
  createdAt: { type: Date, default: Date.now }
});

// Create a Message model
const Message = mongoose.model('Message', messageSchema);

// When a user connects to the socket server
io.on('connection', (socket) => {
  console.log('a user connected');

  // Join a specific chat room
  socket.on('joinRoom', async (roomName) => {
    socket.join(roomName);
    console.log(`User joined room: ${roomName}`);
  });

  // Listen for new messages in the room
  socket.on('sendMessage', async (messageData, roomName) => {
    const { text, email, userDetails, profilePics } = messageData;
    const newMessage = new Message({
      text,
      email,
      room: roomName,
      profilePic: userDetails.profilePic || 'default.jpg',
      profilePics
       // Ensure user profile pic is available
    });

    // Save the message to the MongoDB database
    await newMessage.save();

    // Emit the message to the room
    io.to(roomName).emit('newMessage', newMessage);
  });

  // Handle disconnects
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(5600, () => {
  console.log('Server is running on http://localhost:5600');
});
