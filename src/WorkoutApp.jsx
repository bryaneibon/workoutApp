import React, { useState } from 'react';

// 🏗️ WA-008: App.jsx refactorisé - Architecture modulaire complète  
// Référence Clean Code: "Functions should be small. Classes should be small. Files should be small."

// Imports des constantes
import { APP_VIEWS } from './constants/workoutStates.js';

// Imports du layout
import AppLayout from './components/layout/AppLayout.jsx';

// Imports des vues complètes
import HomeView from './components/views/HomeView.jsx';
import WorkoutConfigView from './components/views/WorkoutConfigView.jsx';
import WorkoutDemoView from './components/views/WorkoutDemoView.jsx';
import TestComponentsView from './components/views/TestComponentsView.jsx';
import WorkoutActiveView from './components/views/WorkoutActiveView.jsx';

/**
 * 🏗️ Composant principal WorkoutApp
 * Clean Code: "Main should be minimal and delegate to other functions"
 * Pragmatic Programmer: "Orthogonality - components should be independent"
 * 
 * Responsabilités:
 * - 🧭 Navigation entre vues
 * - 🎭 Orchestration des composants
 * - 🗂️ État global minimal
 * - 🔄 Gestion des transitions
 */
const WorkoutApp = () => {
  // État de navigation
  const [currentView, setCurrentView] = useState(APP_VIEWS.HOME);
  const [selectedPlan, setSelectedPlan] = useState(null);

  /**
   * Gestionnaire de navigation avec logging
   * Clean Code: "Use intention-revealing names"
   */
  const handleNavigate = (view) => {
    console.log(`🧭 Navigation: ${currentView} → ${view}`);
    setCurrentView(view);
  };

  /**
   * Gestionnaire de sélection de plan
   * Pragmatic Programmer: "DRY - Don't Repeat Yourself"
   */
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    console.log(`🎯 Plan sélectionné:`, plan);
    
    // Feedback utilisateur amélioré
    alert(`🎯 Plan "${plan.name}" sélectionné !

📊 Détails:
• Difficulté: ${plan.difficulty}
• Durée estimée: ${plan.estimatedDuration} minutes
• Exercices: ${plan.exercises.length}

💡 Testez maintenant les vues dans la navigation !`);
  };

  /**
   * Rendu conditionnel des vues
   * Clean Code: "Functions should do one thing"
   */
  const renderCurrentView = () => {
    const viewProps = {
      onSelectPlan: handleSelectPlan,
      onNavigate: handleNavigate,
      selectedPlan
    };

    switch (currentView) {
      case APP_VIEWS.HOME:
        return <HomeView {...viewProps} />;
      
      case APP_VIEWS.WORKOUT_CONFIG:
        return <WorkoutConfigView />;
      
      case APP_VIEWS.TEST_COMPONENTS:
        return <TestComponentsView />;
      
      case APP_VIEWS.WORKOUT_DEMO:
        return <WorkoutDemoView />;
      
      case APP_VIEWS.WORKOUT_ACTIVE:
        return <WorkoutActiveView />;
      
      default:
        console.warn(`🚨 Vue inconnue: ${currentView}, retour à HOME`);
        return <HomeView {...viewProps} />;
    }
  };

  return (
    <AppLayout 
      currentView={currentView} 
      onNavigate={handleNavigate}
    >
      {renderCurrentView()}
    </AppLayout>
  );
};

export default WorkoutApp;