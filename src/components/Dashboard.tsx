import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  BookOpen,
  Target,
  Shield
} from 'lucide-react';

interface DashboardProps {
  userRole: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const userStats = {
    student: {
      completedModules: 8,
      totalModules: 12,
      badges: 5,
      drillsCompleted: 3,
      preparednessScore: 78
    },
    teacher: {
      studentsManaged: 45,
      classesCompleted: 6,
      badges: 8,
      drillsConducted: 4,
      preparednessScore: 85
    },
    admin: {
      totalStudents: 1250,
      institutionScore: 72,
      badges: 12,
      drillsOrganized: 8,
      preparednessScore: 90
    }
  };

  const currentStats = userStats[userRole as keyof typeof userStats];

  const recentActivities = [
    { type: 'module', title: 'Completed Earthquake Safety Module', time: '2 hours ago', status: 'completed' },
    { type: 'drill', title: 'Participated in Fire Evacuation Drill', time: '1 day ago', status: 'completed' },
    { type: 'badge', title: 'Earned "First Responder" badge', time: '2 days ago', status: 'achievement' },
    { type: 'alert', title: 'Regional flood alert issued', time: '3 days ago', status: 'warning' }
  ];

  const upcomingEvents = [
    { title: 'Cyclone Preparedness Workshop', date: 'Tomorrow, 10:00 AM', type: 'workshop' },
    { title: 'Virtual Fire Drill', date: 'Dec 15, 2:00 PM', type: 'drill' },
    { title: 'First Aid Training Session', date: 'Dec 18, 9:00 AM', type: 'training' }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userRole.charAt(0).toUpperCase() + userRole.slice(1)}!
          </h1>
          <p className="text-gray-600">
            {userRole === 'student' && "Continue your disaster preparedness journey"}
            {userRole === 'teacher' && "Monitor your students' progress and safety knowledge"}
            {userRole === 'admin' && "Oversee institution-wide disaster preparedness"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {userRole === 'student' ? `${currentStats.completedModules}/${currentStats.totalModules}` 
                : userRole === 'teacher' ? currentStats.classesCompleted
                : currentStats.totalStudents}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">
              {userRole === 'student' ? 'Modules Completed' 
              : userRole === 'teacher' ? 'Classes Completed'
              : 'Total Students'}
            </h3>
            <p className="text-sm text-gray-600">
              {userRole === 'student' ? 'Keep going!' 
              : userRole === 'teacher' ? 'Great progress'
              : 'Institution-wide'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{currentStats.badges}</span>
            </div>
            <h3 className="font-semibold text-gray-900">Badges Earned</h3>
            <p className="text-sm text-gray-600">Achievement unlocked</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {userRole === 'student' ? currentStats.drillsCompleted 
                : userRole === 'teacher' ? currentStats.drillsConducted
                : currentStats.drillsOrganized}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">
              {userRole === 'student' ? 'Drills Completed' 
              : userRole === 'teacher' ? 'Drills Conducted'
              : 'Drills Organized'}
            </h3>
            <p className="text-sm text-gray-600">Practice makes perfect</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{currentStats.preparednessScore}%</span>
            </div>
            <h3 className="font-semibold text-gray-900">Preparedness Score</h3>
            <p className="text-sm text-gray-600">
              {currentStats.preparednessScore >= 80 ? 'Excellent!' : 
               currentStats.preparednessScore >= 60 ? 'Good progress' : 'Needs improvement'}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.status === 'completed' ? 'bg-green-100' :
                      activity.status === 'achievement' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      {activity.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {activity.status === 'achievement' && <Award className="w-5 h-5 text-yellow-600" />}
                      {activity.status === 'warning' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{event.date}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      event.type === 'workshop' ? 'bg-blue-100 text-blue-800' :
                      event.type === 'drill' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;