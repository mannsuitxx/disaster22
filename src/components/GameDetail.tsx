import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Trophy, 
  Clock, 
  Award,
  Youtube,
  ExternalLink,
  Loader
} from 'lucide-react';
import apiService from '../services/api';

const GameDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGame();
  }, [id]);

  const loadGame = async () => {
    try {
      setLoading(true);
      const gameData = await apiService.getGame(parseInt(id!));
      setGame(gameData);
    } catch (error) {
      console.error('Failed to load game:', error);
      setError('Failed to load game. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startGame = () => {
    navigate('/games');
  };

  const openVideo = (url: string) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading game...</p>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Game</h2>
          <p className="text-gray-600 mb-4">{error || 'Game not found'}</p>
          <button
            onClick={() => navigate('/games')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/games')}
          className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Games</span>
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">{game.title}</h1>
            <div className="flex items-center space-x-6 text-purple-100">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{game.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>{game.badge}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Game Description</h2>
                <p className="text-gray-600 mb-6">{game.description}</p>

                {game.tutorialVideo && (
                  <div className="mb-6">
                    <button
                      onClick={() => openVideo(game.tutorialVideo)}
                      className="w-full py-4 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Youtube className="w-6 h-6" />
                      <span>Watch Tutorial</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <button
                  onClick={startGame}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Game</span>
                </button>
              </div>

              <div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Game Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{game.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{game.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className="font-medium">{game.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{game.category.replace('-', ' ')}</span>
                    </div>
                  </div>

                  {game.badge && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Trophy className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Badge Available</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Score 80% or higher to earn the "{game.badge}" badge
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;