import React from 'react';
import { 
  Shield, 
  BookOpen, 
  Users, 
  Zap, 
  Award, 
  AlertTriangle,
  Play,
  Target
} from 'lucide-react';

interface HeroProps {
  onNavigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Learning',
      description: 'Region-specific disaster education modules tailored to your location'
    },
    {
      icon: Zap,
      title: 'Virtual Drills',
      description: 'Practice emergency scenarios in a safe, controlled environment'
    },
    {
      icon: Users,
      title: 'Community Ready',
      description: 'Connect with local disaster response teams and emergency contacts'
    },
    {
      icon: Award,
      title: 'Gamified Progress',
      description: 'Earn badges and track your disaster preparedness journey'
    }
  ];

  const stats = [
    { number: '50M+', label: 'Students at Risk' },
    { number: '85%', label: 'Schools Unprepared' },
    { number: '12', label: 'Major Disaster Types' },
    { number: '28', label: 'High-Risk States' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4 mr-2" />
              India faces 85% of disaster-related school casualties due to lack of preparedness
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Building
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600"> Disaster-Ready </span>
              Schools
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Empower students, teachers, and institutions with comprehensive disaster management education. 
              From earthquake safety to flood preparedness, learn life-saving skills through interactive 
              modules and virtual drills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onNavigate('/modules')}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <Play className="w-5 h-5" />
                <span>Start Learning Now</span>
              </button>
              
              <button
                onClick={() => onNavigate('/games')}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center space-x-2"
              >
                <Target className="w-5 h-5" />
                <span>Play Safety Games</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Disaster Education Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with proven disaster management 
              principles to create an engaging learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make Your Institution Disaster-Ready?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join thousands of schools and colleges across India in building a safer tomorrow.
          </p>
          <button
           onClick={() => onNavigate('/dashboard')}
            className="px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <Shield className="w-5 h-5" />
            <span>Get Started Today</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hero;