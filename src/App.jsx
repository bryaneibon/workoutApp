// src/App.jsx
import React, { useState } from 'react';

// Imports des constantes
import { APP_VIEWS } from './constants/workoutStates.js';

// Imports du layout et transitions
import AppLayout from './components/layout/AppLayout.jsx';

// Imports des vues complètes
import HomeView from './components/views/HomeView.jsx';
import WorkoutConfigView from './components/views/WorkoutConfigView.jsx';
import TestComponentsView from './components/views/TestComponentsView.jsx';
import WorkoutActiveView from './components/views/WorkoutActiveView.jsx';
import VECTTimerView from './components/views/VECTTimerView.jsx';

/**
 * 🗒️ Composant principal App (VECT)
 * Clean Code: "Main should be minimal and delegate to other functions"
 * Pragmatic Programmer: "Orthogonality - components should be independent"
 */
const App = () => {
  // État de navigation avec historique
  const [currentView, setCurrentView] = useState(APP_VIEWS.HOME);
  const [selectedPlan, setSelectedPlan] = useState(null);

  /**
   * Gestionnaire de navigation avec micro-interactions
   * Clean Code: "Use intention-revealing names"
   */
  const handleNavigate = (view) => {
    console.log(`🎯 Navigation: ${currentView} → ${view}`);    // Change la vue
    setCurrentView(view);
  };

  /**
   * Gestionnaire de sélection de plan avec feedback premium
   * Pragmatic Programmer: "DRY - Don't Repeat Yourself"
   */
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    console.log(`🎯 Plan sélectionné:`, plan);
    
    // Feedback utilisateur ultra clean
    const notification = {
      title: `Plan "${plan.name}" sélectionné !`,
      details: [
        `📊 Difficulté: ${plan.difficulty}`,
        `⏱️ Durée estimée: ${plan.estimatedDuration} minutes`,
        `💪 Exercices: ${plan.exercises.length}`,
        '',
        '💡 Naviguez vers Timer Auto pour commencer !'
      ]
    };
    
    alert([notification.title, ...notification.details].join('\n'));
  };

  /**
   * Rendu conditionnel des vues avec système de transition
   * Clean Code: "Functions should do one thing"
   */
  const renderCurrentView = () => {
    const viewProps = {
      onSelectPlan: handleSelectPlan,
      onNavigate: handleNavigate,
      selectedPlan
    };

    // Sélection de la vue avec fallback sécurisé
    switch (currentView) {
      case APP_VIEWS.HOME:
        return <HomeView {...viewProps} />;
      
      case APP_VIEWS.WORKOUT_CONFIG:
        return <WorkoutConfigView />;
      
      case APP_VIEWS.TEST_COMPONENTS:
        return <TestComponentsView />;
      
      case APP_VIEWS.WORKOUT_ACTIVE:
        return <WorkoutActiveView />;

      case APP_VIEWS.WORKOUT_ACTIVE_V2:
        return <VECTTimerView />;
      
      default:
        console.warn(`🚨 Vue inconnue: ${currentView}, retour à HOME`);
        return <HomeView {...viewProps} />;
    }
  };

  return (
    <div className="min-h-screen">
        <AppLayout 
          currentView={currentView} 
          onNavigate={handleNavigate}
        >
            {renderCurrentView()}
        </AppLayout>

      {/* 🎯 Indicateur de développement (dev only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-lg z-50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-400 rounded-full animate-pulse" />
            <span>VECT - Mode développement</span>
          </div>
          <div className="text-blue-200 text-[10px] mt-1">
            Vue actuelle: {currentView}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;