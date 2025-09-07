const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const moduleRoutes = require('./routes/modules');
const drillRoutes = require('./routes/drills');
const gameRoutes = require('./routes/games');
const emergencyRoutes = require('./routes/emergency');
const adminRoutes = require('./routes/admin');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow frontend (both localhost & Render)
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('⚡ User connected:', socket.id);

  socket.on('join-institution', (institutionId) => {
    socket.join(`institution-${institutionId}`);
    console.log(`User ${socket.id} joined institution ${institutionId}`);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// Make io accessible to routes
app.set('io', io);

// ✅ Health check FIRST (so it doesn’t get overridden by React route)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SafeLearn India API is running' });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/drills', drillRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/admin', adminRoutes);

// ✅ React app serve AFTER API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

server.listen(PORT, () => {
  console.log(`🚀 SafeLearn India server running on port ${PORT}`);
});
