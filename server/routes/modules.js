const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let modules = [
  {
    id: 1,
    title: 'Earthquake Basics & Preparedness',
    category: 'earthquake',
    duration: '25 min',
    difficulty: 'Beginner',
    rating: 4.8,
    enrollments: 1250,
    description: 'Learn the fundamentals of earthquake science and how to prepare your home and school.',
    objectives: ['Understand earthquake causes', 'Create emergency kits', 'Practice drop, cover, hold'],
    region: 'Pan-India',
    badge: 'Earthquake Ready',
    videoUrl: 'https://www.youtube.com/watch?v=BLEPakj1YTY',
    tutorialVideos: [
      {
        title: 'Drop, Cover, and Hold On',
        url: 'https://www.youtube.com/watch?v=t7Gv7mjTn_M',
        duration: '3:45'
      },
      {
        title: 'Earthquake Safety at School',
        url: 'https://www.youtube.com/watch?v=kFjjAbdQzpE',
        duration: '5:20'
      },
      {
        title: 'Building an Emergency Kit',
        url: 'https://www.youtube.com/watch?v=WK_jOw6wlVs',
        duration: '7:15'
      }
    ],
    content: [
      {
        type: 'video',
        title: 'Understanding Earthquakes',
        url: 'https://www.youtube.com/watch?v=BLEPakj1YTY'
      },
      {
        type: 'text',
        title: 'What Causes Earthquakes?',
        content: 'Earthquakes occur when tectonic plates shift and release energy...'
      },
      {
        type: 'interactive',
        title: 'Earthquake Preparedness Quiz',
        questions: [
          {
            question: 'What should you do first when an earthquake starts?',
            options: ['Run outside', 'Drop to hands and knees', 'Stand in doorway', 'Call for help'],
            correct: 1
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Fire Prevention in Educational Institutions',
    category: 'fire',
    duration: '35 min',
    difficulty: 'Intermediate',
    rating: 4.8,
    enrollments: 1350,
    description: 'Comprehensive fire safety measures specifically designed for schools and colleges.',
    objectives: ['Fire hazard identification', 'Prevention strategies', 'Evacuation planning'],
    region: 'All institutions',
    badge: 'Fire Safety Expert',
    videoUrl: 'https://www.youtube.com/watch?v=7z8Tb7OA_F4',
    tutorialVideos: [
      {
        title: 'Fire Safety in Schools',
        url: 'https://www.youtube.com/watch?v=7z8Tb7OA_F4',
        duration: '8:30'
      },
      {
        title: 'Using Fire Extinguishers',
        url: 'https://www.youtube.com/watch?v=ceTJQUPvJws',
        duration: '4:15'
      },
      {
        title: 'Fire Evacuation Procedures',
        url: 'https://www.youtube.com/watch?v=GO-bOKnwgzo',
        duration: '6:45'
      }
    ]
  },
  {
    id: 3,
    title: 'Flood Risk Assessment & Monitoring',
    category: 'flood',
    duration: '20 min',
    difficulty: 'Beginner',
    rating: 4.7,
    enrollments: 980,
    description: 'Understanding flood patterns, early warning systems, and risk assessment.',
    objectives: ['Read flood maps', 'Monitor weather alerts', 'Assess local risks'],
    region: 'Coastal & River areas',
    badge: 'Flood Guardian',
    videoUrl: 'https://www.youtube.com/watch?v=Lp6iqzeA2ko',
    tutorialVideos: [
      {
        title: 'Flood Safety for Kids',
        url: 'https://www.youtube.com/watch?v=Lp6iqzeA2ko',
        duration: '5:30'
      },
      {
        title: 'Understanding Flood Warnings',
        url: 'https://www.youtube.com/watch?v=RQqQhzHf6oU',
        duration: '7:20'
      },
      {
        title: 'Flood Preparedness at Home',
        url: 'https://www.youtube.com/watch?v=kBhbF7g_pNs',
        duration: '9:15'
      }
    ]
  },
  {
    id: 4,
    title: 'Cyclone Preparedness for Coastal Regions',
    category: 'cyclone',
    duration: '28 min',
    difficulty: 'Intermediate',
    rating: 4.6,
    enrollments: 750,
    description: 'Specialized training for cyclone-prone areas with regional case studies.',
    objectives: ['Track cyclone patterns', 'Secure properties', 'Evacuation procedures'],
    region: 'Coastal states',
    badge: 'Storm Survivor',
    videoUrl: 'https://www.youtube.com/watch?v=FjwYtfK7UIk',
    tutorialVideos: [
      {
        title: 'Cyclone Safety Measures',
        url: 'https://www.youtube.com/watch?v=FjwYtfK7UIk',
        duration: '10:45'
      },
      {
        title: 'Preparing for Cyclones',
        url: 'https://www.youtube.com/watch?v=8xZsQBVJ3oo',
        duration: '8:20'
      }
    ]
  },
  {
    id: 5,
    title: 'Basic First Aid & CPR',
    category: 'first-aid',
    duration: '40 min',
    difficulty: 'Beginner',
    rating: 4.9,
    enrollments: 2100,
    description: 'Essential first aid skills every student and teacher should know.',
    objectives: ['Basic wound care', 'CPR techniques', 'Emergency response'],
    region: 'Universal',
    badge: 'Life Saver',
    videoUrl: 'https://www.youtube.com/watch?v=C_b2VKO4mOo',
    quiz: {
      questions: [
        {
          id: 1,
          question: 'What is the first step in treating a minor cut?',
          options: ['Apply bandage', 'Clean your hands', 'Apply pressure', 'Call for help'],
          correct: 1,
          explanation: 'Always clean your hands first to prevent infection.'
        },
        {
          id: 2,
          question: 'What should you do if someone is unconscious but breathing?',
          options: ['Give CPR', 'Place in recovery position', 'Give water', 'Shake them awake'],
          correct: 1,
          explanation: 'Recovery position keeps airways clear and prevents choking.'
        }
      ]
    },
    tutorialVideos: [
      {
        title: 'Basic First Aid for Students',
        url: 'https://www.youtube.com/watch?v=C_b2VKO4mOo',
        duration: '12:30'
      },
      {
        title: 'CPR Training for Beginners',
        url: 'https://www.youtube.com/watch?v=TRVjwdNVgjs',
        duration: '15:45'
      },
      {
        title: 'Treating Common Injuries',
        url: 'https://www.youtube.com/watch?v=SwEZ7ggDCPk',
        duration: '8:20'
      }
    ]
  }
];

// Get all modules
router.get('/', (req, res) => {
  const { category, difficulty, region } = req.query;
  let filteredModules = modules;

  if (category && category !== 'all') {
    filteredModules = filteredModules.filter(m => m.category === category);
  }

  if (difficulty) {
    filteredModules = filteredModules.filter(m => m.difficulty === difficulty);
  }

  if (region && region !== 'all') {
    filteredModules = filteredModules.filter(m => m.region === region || m.region === 'Universal' || m.region === 'Pan-India');
  }

  res.json(filteredModules);
});

// Get module by ID
router.get('/:id', (req, res) => {
  const module = modules.find(m => m.id === parseInt(req.params.id));
  if (!module) {
    return res.status(404).json({ error: 'Module not found' });
  }
  res.json(module);
});

// Submit quiz answers
router.post('/:id/quiz', (req, res) => {
  const moduleId = parseInt(req.params.id);
  const { userId, answers, timeSpent } = req.body;
  
  const module = modules.find(m => m.id === moduleId);
  if (!module || !module.quiz) {
    return res.status(404).json({ error: 'Module or quiz not found' });
  }
  
  let score = 0;
  const results = module.quiz.questions.map((question, index) => {
    const userAnswer = answers[index];
    const isCorrect = userAnswer === question.correct;
    if (isCorrect) score++;
    
    return {
      questionId: question.id,
      question: question.question,
      userAnswer,
      correctAnswer: question.correct,
      isCorrect,
      explanation: question.explanation
    };
  });
  
  const percentage = Math.round((score / module.quiz.questions.length) * 100);
  const passed = percentage >= 70;
  
  // Save quiz result (in real app, save to database)
  const quizResult = {
    id: uuidv4(),
    userId,
    moduleId,
    score,
    percentage,
    passed,
    timeSpent,
    results,
    completedAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    quizResult,
    badge: passed ? module.badge : null,
    message: passed ? 'Congratulations! You passed the quiz!' : 'Keep studying and try again!'
  });
});

// Create new module (admin only)
router.post('/', (req, res) => {
  const { title, category, duration, difficulty, description, objectives, region, badge, videoUrl, quiz } = req.body;
  
  const newModule = {
    id: modules.length + 1,
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
    tutorialVideos: []
  };
  
  modules.push(newModule);
  
  res.status(201).json({
    success: true,
    module: newModule,
    message: 'Module created successfully'
  });
});

// Complete module
router.post('/:id/complete', (req, res) => {
  const moduleId = parseInt(req.params.id);
  const { userId, score } = req.body;
  
  // In a real app, save completion to database
  res.json({
    success: true,
    message: 'Module completed successfully',
    badge: modules.find(m => m.id === moduleId)?.badge,
    score
  });
});

module.exports = router;