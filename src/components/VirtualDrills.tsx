import React, { useState } from 'react';
import { 
  Target, 
  Play, 
  Clock, 
  Users, 
  CheckCircle,
  AlertTriangle,
  Award,
  MapPin,
  Zap
} from 'lucide-react';

const VirtualDrills: React.FC = () => {
  const [selectedDrill, setSelectedDrill] = useState<number | null>(null);
  const [drillInProgress, setDrillInProgress] = useState(false);
  const [drillStep, setDrillStep] = useState(0);

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
      region: 'Seismic zones III-V'
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
      region: 'All institutions'
    },
    {
      id: 3,
      title: 'Flood Emergency Response',
      type: 'Flood',
      duration: '12 min',
      difficulty: 'Advanced',
      participants: 32,
      description: 'Flood response procedures for ground-floor classrooms.',
      scenario: 'Heavy rains cause rapid flooding. Water is entering the building.',
      steps: [
        'Move to higher floors immediately',
        'Turn off electricity in affected areas',
        'Help those who need assistance',
        'Stay away from contaminated water',
        'Wait for rescue if trapped'
      ],
      badge: 'Flood Guardian',
      region: 'Flood-prone areas'
    },
    {
      id: 4,
      title: 'Cyclone Shelter Procedures',
      type: 'Cyclone',
      duration: '20 min',
      difficulty: 'Advanced',
      participants: 67,
      description: 'Cyclone preparedness and shelter-in-place procedures.',
      scenario: 'Severe cyclone warning issued. Winds are increasing rapidly.',
      steps: [
        'Move to interior rooms on lower floors',
        'Stay away from windows and doors',
        'Gather emergency supplies',
        'Monitor weather updates',
        'Remain in shelter until all-clear'
      ],
      badge: 'Storm Survivor',
      region: 'Coastal regions'
    }
  ];

  const handleStartDrill = (drill: any) => {
    setDrillInProgress(true);
    setDrillStep(0);
  };

  const handleNextStep = () => {
    if (selectedDrill) {
      const drill = drills.find(d => d.id === selectedDrill);
      if (drill && drillStep < drill.steps.length - 1) {
        setDrillStep(drillStep + 1);
      } else {
        // Drill completed
        setDrillInProgress(false);
        setDrillStep(0);
        // Show completion message
      }
    }
  };

  if (selectedDrill && drillInProgress) {
    const drill = drills.find(d => d.id === selectedDrill)!;
    
    return (
      <div className="min-h-screen p-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold">DRILL IN PROGRESS</h2>
                <p>Step {drillStep + 1} of {drill.steps.length} - {drill.title}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {drill.scenario}
              </h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Step {drillStep + 1}: {drill.steps[drillStep]}
                </h4>
                <p className="text-gray-600">
                  Follow the instruction above, then click "Next Step" when ready.
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setDrillInProgress(false);
                  setSelectedDrill(null);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Exit Drill
              </button>
              <button
                onClick={handleNextStep}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {drillStep < drill.steps.length - 1 ? 'Next Step' : 'Complete Drill'}
              </button>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm text-gray-600">
                  {Math.round(((drillStep + 1) / drill.steps.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((drillStep + 1) / drill.steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedDrill) {
    const drill = drills.find(d => d.id === selectedDrill)!;
    
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedDrill(null)}
            className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Drills
          </button>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-8 text-white">
              <h1 className="text-3xl font-bold mb-4">{drill.title}</h1>
              <div className="flex items-center space-x-6 text-orange-100">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{drill.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{drill.participants} participants</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{drill.region}</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Drill Overview</h2>
                  <p className="text-gray-600 mb-6">{drill.description}</p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Scenario</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">{drill.scenario}</p>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Drill Steps</h3>
                  <ol className="space-y-3 mb-6">
                    {drill.steps.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-600">{step}</span>
                      </li>
                    ))}
                  </ol>

                  <button
                    onClick={() => handleStartDrill(drill)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Start Virtual Drill</span>
                  </button>
                </div>

                <div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">Drill Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{drill.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{drill.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Difficulty:</span>
                        <span className="font-medium">{drill.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Participants:</span>
                        <span className="font-medium">{drill.participants}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Badge Available</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Complete this drill to earn the "{drill.badge}" badge
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Virtual Emergency Drills</h1>
          <p className="text-gray-600">
            Practice disaster response procedures through immersive virtual simulations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">12 Drill Types</h3>
            <p className="text-sm text-gray-600">Covering major disaster scenarios</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">2,500+ Users</h3>
            <p className="text-sm text-gray-600">Active drill participants</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">85% Success Rate</h3>
            <p className="text-sm text-gray-600">Drill completion average</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Real-time Feedback</h3>
            <p className="text-sm text-gray-600">Instant performance analysis</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {drills.map((drill) => (
            <div
              key={drill.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer"
              onClick={() => setSelectedDrill(drill.id)}
            >
              <div className={`h-2 ${
                drill.type === 'Earthquake' ? 'bg-red-500' :
                drill.type === 'Fire' ? 'bg-orange-500' :
                drill.type === 'Flood' ? 'bg-blue-500' :
                'bg-purple-500'
              }`}></div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    drill.type === 'Earthquake' ? 'bg-red-100 text-red-800' :
                    drill.type === 'Fire' ? 'bg-orange-100 text-orange-800' :
                    drill.type === 'Flood' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {drill.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    drill.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    drill.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {drill.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {drill.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {drill.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{drill.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{drill.participants}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{drill.region}</span>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-colors flex items-center justify-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Start Drill</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualDrills;