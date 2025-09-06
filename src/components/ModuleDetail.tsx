import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Award,
  Youtube,
  ExternalLink,
  Loader
} from 'lucide-react';
import apiService from '../services/api';

const ModuleDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadModule();
  }, [id]);

  const loadModule = async () => {
    try {
      setLoading(true);
      const moduleData = await apiService.getModule(parseInt(id!));
      setModule(moduleData);
    } catch (error) {
      console.error('Failed to load module:', error);
      setError('Failed to load module. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < module.quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz(newAnswers);
    }
  };

  const submitQuiz = async (finalAnswers: number[]) => {
    try {
      setSubmitting(true);
      const result = await apiService.request(`/modules/${id}/quiz`, {
        method: 'POST',
        body: {
          userId: 1, // Mock user ID
          answers: finalAnswers,
          timeSpent: Date.now() // Mock time
        }
      });

      setQuizResult(result.quizResult);
      setQuizCompleted(true);
      
      if (result.badge) {
        // Show success notification
        alert(`Congratulations! You earned the "${result.badge}" badge!`);
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      setError('Failed to submit quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const openVideo = (url: string) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading module...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/modules')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Modules
          </button>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Module not found</p>
          <button
            onClick={() => navigate('/modules')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Modules
          </button>
        </div>
      </div>
    );
  }

  // Quiz Results Screen
  if (quizCompleted && quizResult) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/modules')}
            className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Modules</span>
          </button>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              quizResult.passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {quizResult.passed ? (
                <CheckCircle className="w-10 h-10 text-green-600" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600" />
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {quizResult.passed ? 'Quiz Passed!' : 'Quiz Completed'}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{module.title}</p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{quizResult.score}</div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className={`p-6 rounded-lg ${quizResult.passed ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className={`text-3xl font-bold mb-2 ${quizResult.passed ? 'text-green-600' : 'text-red-600'}`}>
                  {quizResult.percentage}%
                </div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {module.quiz.questions.length}
                </div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
            </div>

            {quizResult.passed && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Award className="w-6 h-6 text-yellow-600" />
                  <span className="font-bold text-yellow-800">Badge Earned!</span>
                </div>
                <p className="text-yellow-700">You earned the "{module.badge}" badge!</p>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quiz Review</h3>
              <div className="space-y-4 text-left">
                {quizResult.results.map((result: any, index: number) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-start space-x-3">
                      {result.isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-2">{result.question}</p>
                        <p className="text-sm text-gray-600 mb-1">
                          Your answer: {module.quiz.questions[index].options[result.userAnswer]}
                        </p>
                        {!result.isCorrect && (
                          <p className="text-sm text-green-600 mb-1">
                            Correct answer: {module.quiz.questions[index].options[result.correctAnswer]}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">{result.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => {
                  setQuizCompleted(false);
                  setQuizStarted(false);
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setQuizResult(null);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retake Quiz
              </button>
              <button
                onClick={() => navigate('/modules')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Back to Modules
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (quizStarted && module.quiz) {
    const question = module.quiz.questions[currentQuestion];
    
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Quiz: {module.title}</h2>
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {module.quiz.questions.length}
              </div>
            </div>

            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / module.quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {question.question}
              </h3>

              <div className="grid gap-4">
                {question.options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={submitting}
                    className="p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {submitting && (
              <div className="text-center">
                <Loader className="w-6 h-6 animate-spin text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600">Submitting quiz...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Module Detail Screen
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/modules')}
          className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Modules</span>
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">{module.title}</h1>
            <div className="flex items-center space-x-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{module.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>{module.badge}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-600 mb-6">{module.description}</p>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Objectives</h3>
                <ul className="space-y-2 mb-6">
                  {module.objectives.map((objective: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{objective}</span>
                    </li>
                  ))}
                </ul>

                {module.videoUrl && (
                  <div className="mb-6">
                    <button
                      onClick={() => openVideo(module.videoUrl)}
                      className="w-full py-4 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Youtube className="w-6 h-6" />
                      <span>Watch Main Video</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {module.tutorialVideos && module.tutorialVideos.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tutorial Videos</h3>
                    <div className="space-y-3">
                      {module.tutorialVideos.map((video: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => openVideo(video.url)}
                          className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <Youtube className="w-5 h-5 text-red-600" />
                            <div className="text-left">
                              <div className="font-medium text-gray-900">{video.title}</div>
                              <div className="text-sm text-gray-600">{video.duration}</div>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {module.quiz && (
                  <button
                    onClick={startQuiz}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-800 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Take Quiz ({module.quiz.questions.length} questions)</span>
                  </button>
                )}
              </div>

              <div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Module Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className="font-medium">{module.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{module.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{module.category.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Region:</span>
                      <span className="font-medium">{module.region}</span>
                    </div>
                  </div>

                  {module.badge && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Badge Available</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Complete the quiz with 70% or higher to earn the "{module.badge}" badge
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

export default ModuleDetail;