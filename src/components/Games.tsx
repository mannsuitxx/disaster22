import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Play, 
  Trophy, 
  Clock, 
  Star,
  Award,
  Target,
  Brain,
  Zap,
  Youtube,
  ExternalLink
} from 'lucide-react';
import apiService from '../services/api';

const Games: React.FC = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const gamesData = await apiService.getGames();
      setGames(gamesData);
    } catch (error) {
      console.error('Failed to load games:', error);
    } finally {
      setLoading(false);
    }
  };

  const startGame = async (game: any) => {
    try {
      const gameData = await apiService.getGame(game.id);
      setSelectedGame(gameData);
      setGameInProgress(true);
      setCurrentQuestion(0);
      setScore(0);
      setAnswers([]);
      setShowResults(false);
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  };

  const handleAnswer = (answerIndex: number, points: number) => {
    const newAnswers = [...answers, { questionIndex: currentQuestion, answerIndex, points }];
    setAnswers(newAnswers);
    setScore(score + points);

    if (selectedGame.gameData.scenarios) {
      // Scenario-based game
      if (currentQuestion < selectedGame.gameData.scenarios.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        finishGame(score + points, newAnswers);
      }
    } else if (selectedGame.gameData.questions) {
      // Quiz game
      if (currentQuestion < selectedGame.gameData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        finishGame(score + points, newAnswers);
      }
    }
  };

  const finishGame = async (finalScore: number, gameAnswers: any[]) => {
    try {
      const result = await apiService.submitGameScore(selectedGame.id, {
        userId: 1, // Mock user ID
        score: finalScore,
        timeCompleted: Date.now(),
        answers: gameAnswers
      });

      setShowResults(true);
      setGameInProgress(false);

      // Load leaderboard
      const leaderboardData = await apiService.getGameLeaderboard(selectedGame.id);
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Failed to submit game score:', error);
    }
  };

  const resetGame = () => {
    setSelectedGame(null);
    setGameInProgress(false);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setShowResults(false);
    setLeaderboard([]);
  };

  const openTutorialVideo = (url: string) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading games...</p>
        </div>
      </div>
    );
  }

  // Game Results Screen
  if (showResults && selectedGame) {
    const percentage = Math.round((score / (selectedGame.gameData.scenarios?.length * 10 || selectedGame.gameData.questions?.length * 10)) * 100);
    
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Game Complete!</h1>
            <p className="text-xl text-gray-600 mb-6">{selectedGame.title}</p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{score}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{percentage}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">#{Math.floor(Math.random() * 50) + 1}</div>
                <div className="text-sm text-gray-600">Your Rank</div>
              </div>
            </div>

            {percentage >= 80 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Award className="w-6 h-6 text-yellow-600" />
                  <span className="font-bold text-yellow-800">Badge Earned!</span>
                </div>
                <p className="text-yellow-700">Congratulations! You earned the "{selectedGame.badge}" badge!</p>
              </div>
            )}

            {leaderboard.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Leaderboard</h3>
                <div className="space-y-2">
                  {leaderboard.slice(0, 5).map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-400 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-orange-400 text-white' :
                          'bg-gray-200 text-gray-700'
                        }`}>
                          {player.rank}
                        </span>
                        <span className="font-medium">{player.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{player.score}</div>
                        <div className="text-xs text-gray-500">{player.institution}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => startGame(selectedGame)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={resetGame}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Games
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game Playing Screen
  if (gameInProgress && selectedGame) {
    const currentData = selectedGame.gameData.scenarios?.[currentQuestion] || selectedGame.gameData.questions?.[currentQuestion];
    const totalQuestions = selectedGame.gameData.scenarios?.length || selectedGame.gameData.questions?.length;
    
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-red-50 to-orange-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedGame.title}</h2>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {totalQuestions}
                </div>
                <div className="text-sm font-bold text-blue-600">
                  Score: {score}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {currentData.situation || currentData.question}
              </h3>

              <div className="grid gap-4">
                {currentData.options.map((option: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index, option.points || (index === currentData.correct ? 10 : 0))}
                    className="p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option.text || option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={resetGame}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Exit Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Game Selection Screen
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Disaster Safety Games</h1>
          <p className="text-gray-600">
            Learn disaster preparedness through interactive games and simulations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{games.length} Games Available</h3>
            <p className="text-sm text-gray-600">Interactive learning experiences</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Skill Building</h3>
            <p className="text-sm text-gray-600">Practical safety knowledge</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Earn Badges</h3>
            <p className="text-sm text-gray-600">Achievement system</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Real-time Feedback</h3>
            <p className="text-sm text-gray-600">Instant learning</p>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game: any) => (
            <div
              key={game.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <div className={`h-2 ${
                game.category === 'earthquake' ? 'bg-red-500' :
                game.category === 'fire' ? 'bg-orange-500' :
                game.category === 'flood' ? 'bg-blue-500' :
                game.category === 'first-aid' ? 'bg-green-500' :
                'bg-purple-500'
              }`}></div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    game.type === 'simulation' ? 'bg-blue-100 text-blue-800' :
                    game.type === 'quiz' ? 'bg-green-100 text-green-800' :
                    game.type === 'puzzle' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {game.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    game.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    game.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    game.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {game.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {game.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {game.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{game.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>{game.badge}</span>
                  </div>
                </div>

                {game.tutorialVideo && (
                  <button
                    onClick={() => openTutorialVideo(game.tutorialVideo)}
                    className="w-full mb-3 py-2 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>Watch Tutorial</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}

                <button
                  onClick={() => startGame(game)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Game</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;