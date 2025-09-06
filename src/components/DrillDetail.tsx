import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  Users,
  Award,
  MapPin,
  Youtube,
  ExternalLink,
  Loader
} from 'lucide-react';
import apiService from '../services/api';

const DrillDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drill, setDrill] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDrill();
  }, [id]);

  const loadDrill = async () => {
    try {
      setLoading(true);
      const drillData = await apiService.getDrill(parseInt(id!));
      setDrill(drillData);
    } catch (error) {
      console.error('Failed to load drill:', error);
      setError('Failed to load drill. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startDrill = () => {
    navigate('/drills');
  };

  const openVideo = (url: string) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading drill...</p>
        </div>
      </div>
    );
  }

  if (error || !drill) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Drill</h2>
          <p className="text-gray-600 mb-4">{error || 'Drill not found'}</p>
          <button
            onClick={() => navigate('/drills')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Drills
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/drills')}
          className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Drills</span>
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
                  {drill.steps.map((step: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-600">{step}</span>
                    </li>
                  ))}
                </ol>

                {drill.tutorialVideo && (
                  <div className="mb-6">
                    <button
                      onClick={() => openVideo(drill.tutorialVideo)}
                      className="w-full py-4 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Youtube className="w-6 h-6" />
                      <span>Watch Tutorial</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <button
                  onClick={startDrill}
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
};

export default DrillDetail;