const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Mock admin data
const adminData = {
  institutionStats: {
    totalStudents: 1250,
    totalTeachers: 85,
    completedModules: 3250,
    drillsCompleted: 156,
    averageScore: 78,
    activeBadges: 425,
    highRiskStudents: 45,
    preparednessGrade: 'B+'
  },
  classPerformance: [
    { class: 'Grade 6', students: 120, completed: 95, score: 82, drills: 8 },
    { class: 'Grade 7', students: 125, completed: 88, score: 79, drills: 7 },
    { class: 'Grade 8', students: 118, completed: 65, score: 71, drills: 6 },
    { class: 'Grade 9', students: 130, completed: 110, score: 85, drills: 9 },
    { class: 'Grade 10', students: 115, completed: 108, score: 88, drills: 10 }
  ],
  recentAlerts: [
    { id: 1, type: 'warning', title: 'Low completion rate in Grade 8', time: '2 hours ago' },
    { id: 2, type: 'success', title: 'Fire drill completed successfully', time: '1 day ago' },
    { id: 3, type: 'info', title: 'New earthquake module available', time: '2 days ago' },
    { id: 4, type: 'warning', title: 'Regional flood alert issued', time: '3 days ago' }
  ]
};

// Get dashboard stats
router.get('/dashboard', (req, res) => {
  res.json(adminData);
});

// Get detailed reports
router.get('/reports', (req, res) => {
  const { type, period } = req.query;
  
  // Mock report data
  const reports = {
    monthly: {
      completionTrend: [65, 72, 78, 85, 82, 88],
      drillParticipation: [45, 52, 48, 67, 71, 69],
      badgesEarned: [23, 31, 28, 45, 52, 48]
    },
    performance: {
      topPerformers: [
        { name: 'Grade 9A', score: 92, improvement: '+8%' },
        { name: 'Grade 10B', score: 89, improvement: '+5%' },
        { name: 'Grade 6C', score: 87, improvement: '+12%' }
      ],
      needsAttention: [
        { name: 'Grade 8A', score: 65, decline: '-3%' },
        { name: 'Grade 7B', score: 68, decline: '-1%' }
      ]
    }
  };

  res.json(reports);
});

// Schedule drill
router.post('/drills/schedule', (req, res) => {
  const { title, type, date, participants, description } = req.body;
  
  const newDrill = {
    id: Date.now(),
    title,
    type,
    date,
    participants,
    description,
    status: 'scheduled',
    createdAt: new Date().toISOString()
  };

  res.json({
    success: true,
    drill: newDrill,
    message: 'Drill scheduled successfully'
  });
});

// Trigger live drill
router.post('/drills/trigger', (req, res) => {
  const { drillId, institutionId, message, type } = req.body;
  const io = req.app.get('io');
  
  const drillAlert = {
    id: uuidv4(),
    drillId,
    type,
    message,
    timestamp: new Date().toISOString(),
    status: 'active'
  };
  
  // Broadcast to all users in the institution
  io.to(`institution-${institutionId}`).emit('drill-alert', drillAlert);
  
  res.json({
    success: true,
    alert: drillAlert,
    message: 'Drill alert sent to all users'
  });
});

// Create new module
router.post('/modules/create', (req, res) => {
  const { title, category, duration, difficulty, description, objectives, region, badge, videoUrl, quiz } = req.body;
  
  // In a real app, save to database
  const newModule = {
    id: Date.now(),
    title,
    category,
    duration,
    difficulty,
    rating: 4.5,
    enrollments: 0,
    description,
    objectives,
    region,
    badge,
    videoUrl,
    quiz,
    createdAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    module: newModule,
    message: 'Module created successfully'
  });
});

module.exports = router;