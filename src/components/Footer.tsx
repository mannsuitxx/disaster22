import React from 'react';
import { Shield, Heart, Globe, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">SafeLearn India</h3>
                <p className="text-sm text-gray-400">Building disaster-ready schools</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Empowering educational institutions across India with comprehensive disaster preparedness education and training.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <Globe className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Learning Modules</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Virtual Drills</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Emergency Contacts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Disaster Types */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Disaster Preparedness</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Earthquake Safety</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fire Prevention</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Flood Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cyclone Response</a></li>
              <li><a href="#" className="hover:text-white transition-colors">First Aid Training</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support & Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Training Materials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Institution Setup</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community Forum</a></li>
            </ul>

            <div className="mt-6">
              <h5 className="font-semibold mb-2">Emergency Helpline</h5>
              <div className="flex items-center space-x-2 text-red-400">
                <Phone className="w-4 h-4" />
                <span className="font-bold">112</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
            <span>© 2024 SafeLearn India. All rights reserved.</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>Made for safer schools</span>
          </div>
          
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>

        {/* Government Partnership */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-center text-sm text-gray-500">
            In partnership with <span className="text-blue-400">National Disaster Management Authority (NDMA)</span> 
            {' '} and <span className="text-green-400">Ministry of Education, Government of India</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;