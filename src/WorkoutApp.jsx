import React, { useState } from 'react';

// 🏗️ WA-007.1: App.jsx refactorisé - Architecture modulaire
// Référence Clean Code: "Functions should be small. Classes should be small. Files should be small."

// Imports des constantes
import { APP_VIEWS } from './constants/workoutStates.js';

// Imports du layout
import AppLayout from './components/layout/AppLayout.jsx';

// Imports des vues
import HomeView from './components/views/HomeView.jsx';
import WorkoutConfigView from './components/views/WorkoutConfigView.jsx';
import WorkoutDemoView from './components/views/WorkoutDemoView.jsx';
import TestComponentsView from './components/views/TestComponentsView.jsx';
import WorkoutActiveView from './components/views/WorkoutActiveView.jsx';

/**
 * 🏗️ Composant principal WorkoutApp
 * Clean Code: "Main should be minimal and delegate to other functions"
 * 
 * Responsabilités:
 * - Gestion de la navigation entre vues
 * - Orchestration des composants principaux
 * - État global de l'application
 */
const WorkoutApp = () => {
  // État de navigation
  const [currentView, setCurrentView] = useState(APP_VIEWS.HOME);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Handlers de navigation
  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    alert(`🎯 Plan sélectionné: ${plan.name}\n\nProchaine étape: Tester les nouvelles vues modulaires !`);
  };

  // Rendu conditionnel des vues
  const renderCurrentView = () => {
    switch (currentView) {
      case APP_VIEWS.HOME:
        return <HomeView onSelectPlan={handleSelectPlan} onNavigate={handleNavigate} />;
      
      case APP_VIEWS.WORKOUT_CONFIG:
        return <WorkoutConfigView />;
      
      case APP_VIEWS.TEST_COMPONENTS:
        return <TestComponentsView />;
      
      case APP_VIEWS.WORKOUT_DEMO:
        return <WorkoutDemoView />;
      
      case APP_VIEWS.WORKOUT_ACTIVE:
        return <WorkoutActiveView />;
      
      default:
        return <HomeView onSelectPlan={handleSelectPlan} onNavigate={handleNavigate} />;
    }
  };

  return (
    <AppLayout currentView={currentView} onNavigate={handleNavigate}>
      {renderCurrentView()}
    </AppLayout>
  );
};

export default WorkoutApp;