import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Target, 
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Bell,
  Settings,
  BarChart3,
  PieChart,
  Calendar
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const institutionStats = {
    totalStudents: 1250,
    totalTeachers: 85,
    completedModules: 3250,
    drillsCompleted: 156,
    averageScore: 78,
    activeBadges: 425,
    highRiskStudents: 45,
    preparednessGrade: 'B+'
  };

  const recentAlerts = [
    { id: 1, type: 'warning', title: 'Low completion rate in Grade 8', time: '2 hours ago' },
    { id: 2, type: 'success', title: 'Fire drill completed successfully', time: '1 day ago' },
    { id: 3, type: 'info', title: 'New earthquake module available', time: '2 days ago' },
    { id: 4, type: 'warning', title: 'Regional flood alert issued', time: '3 days ago' }
  ];

  const classPerformance = [
    { class: 'Grade 6', students: 120, completed: 95, score: 82, drills: 8 },
    { class: 'Grade 7', students: 125, completed: 88, score: 79, drills: 7 },
    { class: 'Grade 8', students: 118, completed: 65, score: 71, drills: 6 },
    { class: 'Grade 9', students: 130, completed: 110, score: 85, drills: 9 },
    { class: 'Grade 10', students: 115, completed: 108, score: 88, drills: 10 }
  ];

  const upcomingDrills = [
    { id: 1, title: 'School-wide Earthquake Drill', date: 'Dec 15, 2024', participants: 1250, type: 'earthquake' },
    { id: 2, title: 'Fire Safety Workshop', date: 'Dec 18, 2024', participants: 85, type: 'fire' },
    { id: 3, title: 'First Aid Training', date: 'Dec 22, 2024', participants: 200, type: 'medical' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{institutionStats.totalStudents.toLocaleString()}</span>
          </div>
          <h3 className="font-semibold text-gray-900">Total Students</h3>
          <p className="text-sm text-gray-600">Enrolled in safety programs</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{institutionStats.completedModules.toLocaleString()}</span>
          </div>
          <h3 className="font-semibold text-gray-900">Modules Completed</h3>
          <p className="text-sm text-gray-600">Across all students</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{institutionStats.drillsCompleted}</span>
          </div>
          <h3 className="font-semibold text-gray-900">Drills Completed</h3>
          <p className="text-sm text-gray-600">Institution-wide practice</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{institutionStats.averageScore}%</span>
          </div>
          <h3 className="font-semibold text-gray-900">Average Score</h3>
          <p className="text-sm text-green-600 font-medium">Grade: {institutionStats.preparednessGrade}</p>
        </div>
      </div>

      {/* Charts and Performance */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Class Performance Overview</h2>
          <div className="space-y-4">
            {classPerformance.map((classData, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">{classData.class}</h3>
                  <p className="text-sm text-gray-600">{classData.students} students</p>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-center">
                    <span className="block font-semibold text-gray-900">{Math.round((classData.completed / classData.students) * 100)}%</span>
                    <span className="text-gray-600">Completion</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-semibold text-gray-900">{classData.score}</span>
                    <span className="text-gray-600">Avg Score</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-semibold text-gray-900">{classData.drills}</span>
                    <span className="text-gray-600">Drills</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Alerts & Notifications</h2>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  alert.type === 'warning' ? 'bg-yellow-100' :
                  alert.type === 'success' ? 'bg-green-100' :
                  'bg-blue-100'
                }`}>
                  {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                  {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                  {alert.type === 'info' && <Bell className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderScheduledDrills = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Scheduled Drills & Events</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Schedule New Drill
        </button>
      </div>

      <div className="grid gap-6">
        {upcomingDrills.map((drill) => (
          <div key={drill.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  drill.type === 'earthquake' ? 'bg-red-100' :
                  drill.type === 'fire' ? 'bg-orange-100' :
                  'bg-green-100'
                }`}>
                  {drill.type === 'earthquake' && <Target className="w-6 h-6 text-red-600" />}
                  {drill.type === 'fire' && <AlertTriangle className="w-6 h-6 text-orange-600" />}
                  {drill.type === 'medical' && <Award className="w-6 h-6 text-green-600" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{drill.title}</h3>
                  <p className="text-gray-600">{drill.participants.toLocaleString()} participants expected</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{drill.date}</p>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  drill.type === 'earthquake' ? 'bg-red-100 text-red-800' :
                  drill.type === 'fire' ? 'bg-orange-100 text-orange-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {drill.type.charAt(0).toUpperCase() + drill.type.slice(1)}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Edit Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Monthly Progress</h3>
              <p className="text-sm text-gray-600">Completion trends</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">+15%</div>
          <p className="text-sm text-green-600">Improvement over last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <PieChart className="w-8 h-8 text-orange-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Risk Assessment</h3>
              <p className="text-sm text-gray-600">Preparedness distribution</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">72%</div>
          <p className="text-sm text-blue-600">Students above safety threshold</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Drill Frequency</h3>
              <p className="text-sm text-gray-600">Practice schedule</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">2.3x</div>
          <p className="text-sm text-purple-600">Per month average</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Analytics</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">High Priority Areas</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-gray-700">Grade 8 completion rate needs improvement</span>
              </li>
              <li className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <span className="text-gray-700">Fire drill frequency below recommended</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">Earthquake preparedness above average</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="text-gray-700">Increase interactive modules for Grade 8</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="text-gray-700">Schedule monthly fire safety workshops</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="text-gray-700">Implement gamification for better engagement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Administrative Dashboard</h1>
          <p className="text-gray-600">
            Monitor and manage disaster preparedness across your institution
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'drills', name: 'Scheduled Drills', icon: Calendar },
                { id: 'reports', name: 'Reports', icon: Download }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'drills' && renderScheduledDrills()}
        {activeTab === 'reports' && renderReports()}
      </div>
    </div>
  );
};

export default AdminPanel;