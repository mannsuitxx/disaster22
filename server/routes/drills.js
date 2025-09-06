const express = require('express');
const router = express.Router();

const drills = [
  {
    id: 1,
    title: 'School Earthquake Drill',
    type: 'Earthquake',
    duration: '10 min',
    difficulty: 'Beginner',
    participants: 45,
    description: 'Practice earthquake response procedures in a classroom setting.',
    scenario: 'You are in your classroom when an earthquake begins. The ground starts shaking.',
    steps: [
      'Drop to your hands and knees',
      'Take cover under your desk',
      'Hold on to your desk and protect your head',
      'Wait for shaking to stop',
      'Exit the classroom calmly when instructed'
    ],
    badge: 'Earthquake Responder',
    region: 'Seismic zones III-V',
    tutorialVideo: 'https://www.youtube.com/watch?v=t7Gv7mjTn_M',
    relatedVideos: [
      {
        title: 'Earthquake Safety at School',
        url: 'https://www.youtube.com/watch?v=kFjjAbdQzpE',
        duration: '5:20'
      },
      {
        title: 'Drop, Cover, Hold On Demonstration',
        url: 'https://www.youtube.com/watch?v=t7Gv7mjTn_M',
        duration: '3:45'
      }
    ]
  },
  {
    id: 2,
    title: 'Fire Evacuation Protocol',
    type: 'Fire',
    duration: '15 min',
    difficulty: 'Intermediate',
    participants: 89,
    description: 'Complete fire evacuation drill for multi-story educational buildings.',
    scenario: 'Fire alarm sounds in the computer lab on the second floor.',
    steps: [
      'Stop all activities immediately',
      'Leave belongings behind',
      'Move to nearest exit (not elevator)',
      'Stay low if there is smoke',
      'Assemble at designated meeting point'
    ],
    badge: 'Fire Safety Champion',
    region: 'All institutions',
    tutorialVideo: 'https://www.youtube.com/watch?v=7z8Tb7OA_F4',
    relatedVideos: [
      {
        title: 'Fire Evacuation Procedures',
        url: 'https://www.youtube.com/watch?v=GO-bOKnwgzo',
        duration: '6:45'
      },
      {
        title: 'School Fire Safety',
        url: 'https://www.youtube.com/watch?v=7z8Tb7OA_F4',
        duration: '8:30'
      }
    ]
  }
];

// Get all drills
router.get('/', (req, res) => {
  res.json(drills);
});

// Get drill by ID
router.get('/:id', (req, res) => {
  const drill = drills.find(d => d.id === parseInt(req.params.id));
  if (!drill) {
    return res.status(404).json({ error: 'Drill not found' });
  }
  res.json(drill);
});

// Complete drill
router.post('/:id/complete', (req, res) => {
  const drillId = parseInt(req.params.id);
  const { userId, completionTime, stepsCompleted } = req.body;
  
  const drill = drills.find(d => d.id === drillId);
  if (!drill) {
    return res.status(404).json({ error: 'Drill not found' });
  }

  const completionRate = (stepsCompleted / drill.steps.length) * 100;
  const badgeEarned = completionRate >= 90;

  res.json({
    success: true,
    completionRate,
    badgeEarned: badgeEarned ? drill.badge : null,
    message: badgeEarned ? 'Excellent! You completed the drill successfully!' : 'Good effort! Practice more to earn the badge.',
    certificate: badgeEarned ? `Certificate-${drillId}-${userId}-${Date.now()}` : null
  });
});

module.exports = router;