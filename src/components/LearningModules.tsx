import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api";
import {
  BookOpen,
  Clock,
  Star,
  MapPin,
  Youtube,
  ExternalLink,
} from "lucide-react";

interface Module {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: string;
  region: string;
  rating: number;
  tutorialVideos?: { title: string; url: string; duration: string }[];
}

const LearningModules: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const loadModules = async () => {
    setLoading(true);
    setError(null);
    try {
      const filters =
        selectedCategory !== "all" ? { category: selectedCategory } : {};
      const modulesData = await apiService.getModules(filters);
      setModules(modulesData);
    } catch (err) {
      console.error("Failed to load modules:", err);
      setError("Failed to load modules. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openVideo = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleModuleClick = (moduleId: number) => {
    navigate(`/modules/${moduleId}`);
  };

  const categories = [
    { id: "all", name: "All Modules" },
    { id: "earthquake", name: "Earthquake" },
    { id: "flood", name: "Flood" },
    { id: "fire", name: "Fire Safety" },
    { id: "cyclone", name: "Cyclone" },
    { id: "first-aid", name: "First Aid" },
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Error Loading Modules
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadModules}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Learning Modules
          </h1>
          <p className="text-gray-600">
            Interactive disaster preparedness courses tailored for Indian
            educational institutions
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
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer transform hover:scale-105"
              onClick={() => handleModuleClick(module.id)}
            >
              <div
                className={`h-2 ${
                  module.category === "earthquake"
                    ? "bg-red-500"
                    : module.category === "flood"
                    ? "bg-blue-500"
                    : module.category === "fire"
                    ? "bg-orange-500"
                    : module.category === "cyclone"
                    ? "bg-purple-500"
                    : "bg-green-500"
                }`}
              ></div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">
                      {module.rating}
                    </span>
                  </div>
                </div>

                {/* Videos */}
                {Array.isArray(module.tutorialVideos) &&
                  module.tutorialVideos.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Tutorial Videos
                      </h3>
                      <div className="space-y-3">
                        {module.tutorialVideos.map((video, index) => (
                          <button
                            key={index}
                            onClick={() => openVideo(video.url)}
                            className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              <Youtube className="w-5 h-5 text-red-600" />
                              <div className="text-left">
                                <div className="font-medium text-gray-900">
                                  {video.title}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {video.duration}
                                </div>
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
