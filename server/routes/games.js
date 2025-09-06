const express = require('express');
const router = express.Router();

const games = [
  {
    id: 1,
    title: 'Earthquake Escape Challenge',
    category: 'earthquake',
    type: 'simulation',
    difficulty: 'Beginner',
    duration: '10 min',
    description: 'Navigate through a school during an earthquake and make the right safety decisions.',
    badge: 'Earthquake Hero',
    tutorialVideo: 'https://www.youtube.com/watch?v=t7Gv7mjTn_M',
    gameData: {
      scenarios: [
        {
          id: 1,
          situation: 'You are in the classroom when the ground starts shaking. What do you do first?',
          options: [
            { text: 'Run to the door immediately', points: 0, feedback: 'Wrong! Running during shaking can cause injuries.' },
            { text: 'Drop, cover, and hold on', points: 10, feedback: 'Correct! This is the safest immediate response.' },
            { text: 'Stand under the doorway', points: 5, feedback: 'Outdated advice. Drop and cover is better.' },
            { text: 'Hide under the teacher\'s desk', points: 8, feedback: 'Good, but your own desk is closer and safer.' }
          ]
        },
        {
          id: 2,
          situation: 'The shaking has stopped. What should you do next?',
          options: [
            { text: 'Wait for teacher\'s instructions', points: 10, feedback: 'Excellent! Follow evacuation procedures.' },
            { text: 'Run outside immediately', points: 3, feedback: 'Be careful of falling debris and follow procedures.' },
            { text: 'Check if anyone is injured', points: 8, feedback: 'Good instinct, but follow evacuation first.' },
            { text: 'Take your belongings', points: 0, feedback: 'Never! Leave belongings and evacuate safely.' }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    title: 'Fire Safety Detective',
    category: 'fire',
    type: 'puzzle',
    difficulty: 'Intermediate',
    duration: '15 min',
    description: 'Identify fire hazards in a virtual school and learn prevention strategies.',
    badge: 'Fire Safety Detective',
    tutorialVideo: 'https://www.youtube.com/watch?v=7z8Tb7OA_F4',
    gameData: {
      rooms: [
        {
          name: 'Chemistry Lab',
          hazards: [
            { item: 'Bunsen burner left on', severity: 'high', points: 15 },
            { item: 'Chemical spill near heat source', severity: 'critical', points: 20 },
            { item: 'Blocked fire exit', severity: 'high', points: 15 },
            { item: 'Missing fire extinguisher', severity: 'medium', points: 10 }
          ]
        },
        {
          name: 'Computer Lab',
          hazards: [
            { item: 'Overloaded power strip', severity: 'high', points: 15 },
            { item: 'Frayed electrical cord', severity: 'medium', points: 10 },
            { item: 'Paper stored near heater', severity: 'medium', points: 10 }
          ]
        }
      ]
    }
  },
  {
    id: 3,
    title: 'Flood Rescue Mission',
    category: 'flood',
    type: 'strategy',
    difficulty: 'Advanced',
    duration: '20 min',
    description: 'Coordinate evacuation and rescue operations during a flood emergency.',
    badge: 'Flood Hero',
    tutorialVideo: 'https://www.youtube.com/watch?v=Lp6iqzeA2ko',
    gameData: {
      missions: [
        {
          title: 'Early Warning Response',
          description: 'Flood warning issued. You have 30 minutes to prepare.',
          tasks: [
            { task: 'Alert all students and staff', time: 5, points: 10 },
            { task: 'Move to higher floors', time: 10, points: 15 },
            { task: 'Secure important documents', time: 8, points: 8 },
            { task: 'Turn off electricity in affected areas', time: 7, points: 12 }
          ]
        }
      ]
    }
  },
  {
    id: 4,
    title: 'First Aid Hero',
    category: 'first-aid',
    type: 'simulation',
    difficulty: 'Beginner',
    duration: '12 min',
    description: 'Practice first aid techniques in various emergency scenarios.',
    badge: 'First Aid Champion',
    tutorialVideo: 'https://www.youtube.com/watch?v=C_b2VKO4mOo',
    gameData: {
      scenarios: [
        {
          injury: 'Minor cut on finger',
          steps: [
            { step: 'Clean your hands', required: true, points: 5 },
            { step: 'Apply pressure to stop bleeding', required: true, points: 10 },
            { step: 'Clean the wound', required: true, points: 8 },
            { step: 'Apply bandage', required: true, points: 7 }
          ]
        },
        {
          injury: 'Someone is unconscious but breathing',
          steps: [
            { step: 'Check for response', required: true, points: 10 },
            { step: 'Place in recovery position', required: true, points: 15 },
            { step: 'Monitor breathing', required: true, points: 10 },
            { step: 'Call for help', required: true, points: 10 }
          ]
        }
      ]
    }
  },
  {
    id: 5,
    title: 'Disaster Preparedness Quiz Master',
    category: 'general',
    type: 'quiz',
    difficulty: 'Mixed',
    duration: '8 min',
    description: 'Test your knowledge across all disaster types with this comprehensive quiz.',
    badge: 'Quiz Master',
    tutorialVideo: 'https://www.youtube.com/watch?v=BLEPakj1YTY',
    gameData: {
      questions: [
        {
          question: 'What is the international emergency number in India?',
          options: ['100', '101', '102', '112'],
          correct: 3,
          explanation: '112 is the single emergency number for all emergencies in India.'
        },
        {
          question: 'During an earthquake, what is the safest place in a room?',
          options: ['Doorway', 'Under a sturdy table', 'Against an exterior wall', 'In the center of the room'],
          correct: 1,
          explanation: 'Under a sturdy table provides the best protection from falling objects.'
        },
        {
          question: 'What should you do if your clothes catch fire?',
          options: ['Run to get help', 'Stop, drop, and roll', 'Pour water immediately', 'Remove clothes quickly'],
          correct: 1,
          explanation: 'Stop, drop, and roll helps smother the flames and prevent burns.'
        }
      ]
    }
  }
];

// Get all games
router.get('/', (req, res) => {
  const { category, difficulty } = req.query;
  let filteredGames = games;

  if (category && category !== 'all') {
    filteredGames = filteredGames.filter(g => g.category === category);
  }

  if (difficulty && difficulty !== 'all') {
    filteredGames = filteredGames.filter(g => g.difficulty === difficulty);
  }

  res.json(filteredGames);
});

// Get game by ID
router.get('/:id', (req, res) => {
  const game = games.find(g => g.id === parseInt(req.params.id));
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  res.json(game);
});

// Submit game score
router.post('/:id/score', (req, res) => {
  const gameId = parseInt(req.params.id);
  const { userId, score, timeCompleted, answers } = req.body;
  
  const game = games.find(g => g.id === gameId);
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }

  // Calculate badge eligibility
  const badgeEarned = score >= 80; // 80% or higher earns badge
  
  res.json({
    success: true,
    score,
    badgeEarned: badgeEarned ? game.badge : null,
    message: badgeEarned ? 'Congratulations! You earned a badge!' : 'Good effort! Try again to earn the badge.',
    leaderboard: {
      rank: Math.floor(Math.random() * 50) + 1, // Mock ranking
      totalPlayers: 1250
    }
  });
});

// Get leaderboard
router.get('/:id/leaderboard', (req, res) => {
  // Mock leaderboard data
  const leaderboard = [
    { rank: 1, name: 'Priya S.', score: 98, institution: 'Delhi Public School' },
    { rank: 2, name: 'Rahul K.', score: 95, institution: 'Kendriya Vidyalaya' },
    { rank: 3, name: 'Anita M.', score: 92, institution: 'DAV School' },
    { rank: 4, name: 'Vikram R.', score: 90, institution: 'Ryan International' },
    { rank: 5, name: 'Sneha P.', score: 88, institution: 'DPS Gurgaon' }
  ];

  res.json(leaderboard);
});

module.exports = router;