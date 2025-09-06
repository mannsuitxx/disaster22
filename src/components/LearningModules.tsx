import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Star,
  Play,
  Award,
  MapPin,
  Users,
  Youtube,
  ExternalLink
} from 'lucide-react';

const LearningModules: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    loadModules();
  }, [selectedCategory]);

  const loadModules = async () => {
    try {
      const filters = selectedCategory !== 'all' ? { category: selectedCategory } : {};
      const modulesData = await apiService.getModules(filters);
      setModules(modulesData);
    } catch (error) {
      console.error('Failed to load modules:', error);
      setError('Failed to load modules. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openVideo = (url: string) => {
    window.open(url, '_blank');
  };

  const handleModuleClick = (moduleId: number) => {
    navigate(`/modules/${moduleId}`);
  };

  const categories = [
    { id: 'all', name: 'All Modules', count: 24 },
    { id: 'earthquake', name: 'Earthquake', count: 6 },
    { id: 'flood', name: 'Flood', count: 5 },
    { id: 'fire', name: 'Fire Safety', count: 4 },
    { id: 'cyclone', name: 'Cyclone', count: 4 },
    { id: 'first-aid', name: 'First Aid', count: 5 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading modules...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Modules</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Modules</h1>
          <p className="text-gray-600">
            Interactive disaster preparedness courses tailored for Indian educational institutions
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module: any) => (
            <div 
              key={module.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer transform hover:scale-105"
              onClick={() => handleModuleClick(module.id)}
            >
              <div className={`h-2 ${
                module.category === 'earthquake' ? 'bg-red-500' :
                module.category === 'flood' ? 'bg-blue-500' :
                module.category === 'fire' ? 'bg-orange-500' :
                module.category === 'cyclone' ? 'bg-purple-500' :
                'bg-green-500'
              }`}></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{module.rating}</span>
                  </div>
                </div>

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

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {module.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {module.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{module.duration}</span>
                  </div>
                  <span className="capitalize">{module.difficulty}</span>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{module.region}</span>
                </div>

                <button className="w-full py-2 px-4 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700">
                  View Module
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningModules;