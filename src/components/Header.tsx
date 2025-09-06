import React from 'react';
import { Shield, Menu, User, Bell } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (path: string) => void;
  userRole: string;
  onRoleChange: (role: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, userRole, onRoleChange }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigationItems = [
    { id: 'home', path: '/', label: 'Home', roles: ['student', 'teacher', 'admin'] },
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard', roles: ['student', 'teacher', 'admin'] },
    { id: 'modules', path: '/modules', label: 'Learn', roles: ['student', 'teacher', 'admin'] },
    { id: 'drills', path: '/drills', label: 'Virtual Drills', roles: ['student', 'teacher', 'admin'] },
    { id: 'games', path: '/games', label: 'Games', roles: ['student', 'teacher', 'admin'] },
    { id: 'contacts', path: '/contacts', label: 'Emergency', roles: ['student', 'teacher', 'admin'] },
    { id: 'admin', path: '/admin', label: 'Admin', roles: ['admin'] },
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SafeLearn India</h1>
              <p className="text-xs text-gray-600">Disaster Preparedness Education</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {filteredNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.path)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-700" />
            
            <select
              value={userRole}
              onChange={(e) => onRoleChange(e.target.value)}
              className="text-sm border rounded-md px-2 py-1 text-gray-700"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>

            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center cursor-pointer">
              <User className="w-4 h-4 text-white" />
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {filteredNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium text-left transition-colors ${
                    currentView === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;