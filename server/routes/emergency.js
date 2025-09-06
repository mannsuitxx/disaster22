const express = require('express');
const router = express.Router();

const emergencyContacts = [
  {
    id: 1,
    name: 'National Emergency Response',
    category: 'disaster',
    phone: '112',
    description: 'Single emergency number for all emergencies',
    availability: '24/7',
    state: 'all',
    priority: 'high',
    languages: ['Hindi', 'English', 'Regional']
  },
  {
    id: 2,
    name: 'Police Control Room',
    category: 'police',
    phone: '100',
    description: 'Police emergency and crime reporting',
    availability: '24/7',
    state: 'all',
    priority: 'high',
    languages: ['Hindi', 'English', 'Regional']
  },
  {
    id: 3,
    name: 'Fire Brigade',
    category: 'fire',
    phone: '101',
    description: 'Fire emergencies and rescue operations',
    availability: '24/7',
    state: 'all',
    priority: 'high',
    languages: ['Hindi', 'English', 'Regional']
  },
  {
    id: 4,
    name: 'Medical Emergency',
    category: 'medical',
    phone: '102',
    description: 'Ambulance and medical emergencies',
    availability: '24/7',
    state: 'all',
    priority: 'high',
    languages: ['Hindi', 'English', 'Regional']
  }
];

// Get emergency contacts
router.get('/contacts', (req, res) => {
  const { category, state } = req.query;
  let filteredContacts = emergencyContacts;

  if (category && category !== 'all') {
    filteredContacts = filteredContacts.filter(c => c.category === category);
  }

  if (state && state !== 'all') {
    filteredContacts = filteredContacts.filter(c => c.state === state || c.state === 'all');
  }

  res.json(filteredContacts);
});

// Get disaster alerts
router.get('/alerts', (req, res) => {
  const { region } = req.query;
  
  // Mock alerts data
  const alerts = [
    {
      id: 1,
      type: 'flood',
      severity: 'high',
      title: 'Heavy Rainfall Alert - Kerala',
      description: 'IMD issues red alert for heavy to very heavy rainfall',
      region: 'Kerala',
      issuedAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      instructions: [
        'Avoid travel unless absolutely necessary',
        'Stay away from waterlogged areas',
        'Keep emergency kit ready',
        'Monitor weather updates regularly'
      ]
    },
    {
      id: 2,
      type: 'earthquake',
      severity: 'medium',
      title: 'Seismic Activity - Himachal Pradesh',
      description: 'Minor earthquake recorded, aftershocks possible',
      region: 'Himachal Pradesh',
      issuedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      validUntil: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      instructions: [
        'Check for structural damage',
        'Be prepared for aftershocks',
        'Keep emergency supplies accessible',
        'Follow drop, cover, hold protocol if shaking occurs'
      ]
    }
  ];

  let filteredAlerts = alerts;
  if (region && region !== 'all') {
    filteredAlerts = alerts.filter(a => a.region.toLowerCase().includes(region.toLowerCase()));
  }

  res.json(filteredAlerts);
});

module.exports = router;