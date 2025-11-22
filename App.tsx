import React, { useState, useEffect } from 'react';
import ProfileCalculator from './components/ProfileCalculator';
import Scanner from './components/Scanner';
import Dashboard from './components/Dashboard';
import { FoodEntry, UserProfile } from './types';

// View Enum for simple navigation
enum View {
  DASHBOARD = 'dashboard',
  SCANNER = 'scanner',
  PROFILE = 'profile'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  
  // State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [foodLogs, setFoodLogs] = useState<FoodEntry[]>([]);

  // Load Data from LocalStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    const storedLogs = localStorage.getItem('foodLogs');
    
    if (storedProfile) setUserProfile(JSON.parse(storedProfile));
    if (storedLogs) setFoodLogs(JSON.parse(storedLogs));
  }, []);

  // Save Profile
  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setCurrentView(View.DASHBOARD); // Go to dashboard after setup
  };

  // Add Food
  const handleAddFood = (entry: FoodEntry) => {
    const updatedLogs = [entry, ...foodLogs];
    setFoodLogs(updatedLogs);
    localStorage.setItem('foodLogs', JSON.stringify(updatedLogs));
    setCurrentView(View.DASHBOARD);
  };

  // Delete Food
  const handleDeleteFood = (id: string) => {
    const updatedLogs = foodLogs.filter(l => l.id !== id);
    setFoodLogs(updatedLogs);
    localStorage.setItem('foodLogs', JSON.stringify(updatedLogs));
  };

  // Conditional Rendering
  const renderView = () => {
    if (!userProfile && currentView !== View.PROFILE) {
      // Force profile creation if not exists
      return (
        <div className="h-full flex flex-col justify-center p-6 text-center">
           <h1 className="text-3xl font-bold text-brand-900 mb-4">Bienvenido</h1>
           <p className="text-gray-600 mb-8">Para comenzar, necesitamos calcular tus metas calóricas.</p>
           <ProfileCalculator profile={null} onSave={handleSaveProfile} />
        </div>
      );
    }

    switch (currentView) {
      case View.PROFILE:
        return <ProfileCalculator profile={userProfile} onSave={handleSaveProfile} />;
      case View.SCANNER:
        return <Scanner onAddFood={handleAddFood} />;
      case View.DASHBOARD:
      default:
        return <Dashboard profile={userProfile} logs={foodLogs} onDelete={handleDeleteFood} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold">AI</div>
          <h1 className="text-xl font-bold text-brand-900 tracking-tight">CalorieAI</h1>
        </div>
        {userProfile && (
           <div className="text-xs text-right text-gray-500">
             <span className="block font-bold text-brand-600">{userProfile.targetCalories} kcal</span>
             <span>Meta Diaria</span>
           </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pb-24">
        {renderView()}
      </main>

      {/* Bottom Navigation (Only show if profile exists) */}
      {userProfile && (
        <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around items-center p-2 pb-6 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => setCurrentView(View.DASHBOARD)}
            className={`flex flex-col items-center p-2 rounded-xl transition ${currentView === View.DASHBOARD ? 'text-brand-600 bg-brand-50' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <span className="text-xs font-medium mt-1">Diario</span>
          </button>

          <button 
            onClick={() => setCurrentView(View.SCANNER)}
            className="flex flex-col items-center justify-center w-14 h-14 bg-brand-600 text-white rounded-full shadow-lg -mt-6 hover:bg-brand-500 transition hover:scale-105"
          >
             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>

          <button 
            onClick={() => setCurrentView(View.PROFILE)}
            className={`flex flex-col items-center p-2 rounded-xl transition ${currentView === View.PROFILE ? 'text-brand-600 bg-brand-50' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-xs font-medium mt-1">Perfil</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;