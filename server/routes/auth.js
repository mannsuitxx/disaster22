const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock user database (replace with actual database)
const users = [
  {
    id: 1,
    email: 'student@school.edu',
    password: '$2a$10$hash', // hashed password
    role: 'student',
    name: 'Rahul Sharma',
    institution: 'Delhi Public School'
  },
  {
    id: 2,
    email: 'teacher@school.edu',
    password: '$2a$10$hash',
    role: 'teacher',
    name: 'Priya Patel',
    institution: 'Delhi Public School'
  },
  {
    id: 3,
    email: 'admin@school.edu',
    password: '$2a$10$hash',
    role: 'admin',
    name: 'Dr. Amit Kumar',
    institution: 'Delhi Public School'
  }
];

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, name, institution } = req.body;
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      role,
      name,
      institution
    };
    
    users.push(newUser);
    
    // Generate token
    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
        institution: newUser.institution
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        institution: user.institution
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;