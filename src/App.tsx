import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import LearningModules from './components/LearningModules';
import VirtualDrills from './components/VirtualDrills';
import EmergencyContacts from './components/EmergencyContacts';
import AdminPanel from './components/AdminPanel';
import Games from './components/Games';
import Footer from './components/Footer';
import ModuleDetail from './components/ModuleDetail';
import GameDetail from './components/GameDetail';
import DrillDetail from './components/DrillDetail';
import { SocketProvider } from './contexts/SocketContext';
import { AuthProvider } from './contexts/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState('student'); // student, teacher, admin
  const [loading, setLoading] = useState(false);

  const handleNavigate = (path: string) => {
    setLoading(true);
    navigate(path);
    setTimeout(() => setLoading(false), 300);
  };

  const getCurrentView = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/dashboard')) return 'dashboard';
    if (path.startsWith('/modules')) return 'modules';
    if (path.startsWith('/drills')) return 'drills';
    if (path.startsWith('/games')) return 'games';
    if (path.startsWith('/contacts')) return 'contacts';
    if (path.startsWith('/admin')) return 'admin';
    return 'home';
  };

  return (
    <ErrorBoundary>
      <AuthProvider>
        <SocketProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header 
              currentView={getCurrentView()} 
              onNavigate={handleNavigate}
              userRole={userRole}
              onRoleChange={setUserRole}
            />
            <main className="pt-16">
              {loading && <LoadingSpinner />}
              <Routes>
                <Route path="/" element={<Hero onNavigate={handleNavigate} />} />
                <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
                <Route path="/modules" element={<LearningModules />} />
                <Route path="/modules/:id" element={<ModuleDetail />} />
                <Route path="/drills" element={<VirtualDrills />} />
                <Route path="/drills/:id" element={<DrillDetail />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/:id" element={<GameDetail />} />
                <Route path="/contacts" element={<EmergencyContacts />} />
                <Route path="/admin" element={
                  userRole === 'admin' ? <AdminPanel /> : <Dashboard userRole={userRole} />
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </SocketProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;