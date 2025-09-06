import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Shield,
  Heart,
  Flame,
  Droplet,
  Plus,
  Search,
  Star
} from 'lucide-react';

const EmergencyContacts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('all');

  const categories = [
    { id: 'all', name: 'All Services', icon: Shield },
    { id: 'police', name: 'Police', icon: Shield },
    { id: 'fire', name: 'Fire', icon: Flame },
    { id: 'medical', name: 'Medical', icon: Heart },
    { id: 'disaster', name: 'Disaster', icon: AlertTriangle },
    { id: 'flood', name: 'Flood', icon: Droplet }
  ];

  const states = [
    'all', 'Delhi', 'Mumbai', 'Kerala', 'Gujarat', 'Tamil Nadu', 'Karnataka', 'West Bengal'
  ];

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
    },
    {
      id: 5,
      name: 'NDRF Control Room',
      category: 'disaster',
      phone: '+91-11-26701700',
      description: 'National Disaster Response Force',
      availability: '24/7',
      state: 'Delhi',
      priority: 'high',
      languages: ['Hindi', 'English']
    },
    {
      id: 6,
      name: 'Kerala Disaster Management',
      category: 'flood',
      phone: '+91-471-2721566',
      description: 'Kerala State Disaster Management Authority',
      availability: '24/7',
      state: 'Kerala',
      priority: 'high',
      languages: ['Malayalam', 'English']
    },
    {
      id: 7,
      name: 'Mumbai Fire Brigade',
      category: 'fire',
      phone: '+91-22-23037000',
      description: 'Mumbai Metropolitan Fire Brigade',
      availability: '24/7',
      state: 'Mumbai',
      priority: 'medium',
      languages: ['Marathi', 'Hindi', 'English']
    },
    {
      id: 8,
      name: 'Gujarat Emergency Response',
      category: 'disaster',
      phone: '1077',
      description: 'Gujarat State Emergency Response Service',
      availability: '24/7',
      state: 'Gujarat',
      priority: 'high',
      languages: ['Gujarati', 'Hindi', 'English']
    }
  ];

  const filteredContacts = emergencyContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || contact.category === selectedCategory;
    const matchesState = selectedState === 'all' || contact.state === selectedState || contact.state === 'all';
    
    return matchesSearch && matchesCategory && matchesState;
  });

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Contacts</h1>
          <p className="text-gray-600">
            Quick access to emergency services and disaster response teams across India
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div
            onClick={() => handleCall('112')}
            className="bg-red-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-3 mb-3">
              <AlertTriangle className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold">Emergency</h3>
                <p className="text-red-100">National Helpline</p>
              </div>
            </div>
            <div className="text-2xl font-bold group-hover:scale-105 transition-transform">112</div>
          </div>

          <div
            onClick={() => handleCall('100')}
            className="bg-blue-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold">Police</h3>
                <p className="text-blue-100">Crime & Safety</p>
              </div>
            </div>
            <div className="text-2xl font-bold group-hover:scale-105 transition-transform">100</div>
          </div>

          <div
            onClick={() => handleCall('101')}
            className="bg-orange-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Flame className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold">Fire</h3>
                <p className="text-orange-100">Fire & Rescue</p>
              </div>
            </div>
            <div className="text-2xl font-bold group-hover:scale-105 transition-transform">101</div>
          </div>

          <div
            onClick={() => handleCall('102')}
            className="bg-green-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Heart className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold">Medical</h3>
                <p className="text-green-100">Ambulance</p>
              </div>
            </div>
            <div className="text-2xl font-bold group-hover:scale-105 transition-transform">102</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search emergency services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State/Region</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All States</option>
                {states.slice(1).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Emergency Contacts List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => {
            const categoryData = categories.find(cat => cat.id === contact.category);
            const IconComponent = categoryData?.icon || Shield;

            return (
              <div
                key={contact.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    contact.category === 'police' ? 'bg-blue-100' :
                    contact.category === 'fire' ? 'bg-orange-100' :
                    contact.category === 'medical' ? 'bg-green-100' :
                    contact.category === 'disaster' ? 'bg-red-100' :
                    'bg-blue-100'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      contact.category === 'police' ? 'text-blue-600' :
                      contact.category === 'fire' ? 'text-orange-600' :
                      contact.category === 'medical' ? 'text-green-600' :
                      contact.category === 'disaster' ? 'text-red-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  
                  {contact.priority === 'high' && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-xs text-yellow-600 font-medium">Priority</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {contact.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {contact.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{contact.state === 'all' ? 'Pan-India' : contact.state}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{contact.availability}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-xs text-gray-500">Languages: </span>
                  <span className="text-xs text-gray-700">{contact.languages.join(', ')}</span>
                </div>

                <button
                  onClick={() => handleCall(contact.phone)}
                  className={`w-full py-3 rounded-lg font-semibold text-white transition-colors flex items-center justify-center space-x-2 ${
                    contact.priority === 'high'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                  <span>{contact.phone}</span>
                </button>
              </div>
            );
          })}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or location filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;