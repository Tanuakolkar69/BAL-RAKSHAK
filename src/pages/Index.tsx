
import React, { useState } from 'react';
import Login from '@/components/Login';
import Registration from '@/components/Registration';
import HomePage from '@/components/HomePage';
import CalendarPage from '@/components/CalendarPage';
import RemindersPage from '@/components/RemindersPage';
import DoctorsPage from '@/components/DoctorsPage';
import Navigation from '@/components/Navigation';

type AppState = 'login' | 'register' | 'app';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('login');
  const [activeTab, setActiveTab] = useState('home');
  const [babyData, setBabyData] = useState<any>(null);

  const handleLogin = () => {
    console.log('User logged in');
    setAppState('app');
  };

  const handleRegister = (data: any) => {
    console.log('Baby registered:', data);
    setBabyData(data);
    setAppState('app');
  };

  const switchToRegister = () => {
    setAppState('register');
  };

  const switchToLogin = () => {
    setAppState('login');
  };

  const renderContent = () => {
    if (appState === 'login') {
      return <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />;
    }
    
    if (appState === 'register') {
      return <Registration onRegister={handleRegister} onSwitchToLogin={switchToLogin} />;
    }

    // Main app content
    switch (activeTab) {
      case 'home':
        return <HomePage babyData={babyData} />;
      case 'calendar':
        return <CalendarPage />;
      case 'reminders':
        return <RemindersPage />;
      case 'doctors':
        return <DoctorsPage />;
      default:
        return <HomePage babyData={babyData} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderContent()}
      {appState === 'app' && (
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
};

export default Index;
