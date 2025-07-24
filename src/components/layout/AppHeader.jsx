// src/components/layout/AppHeader.jsx
// 🎨 WA-008.5: Header moderne avec PropTypes (Clean Code compliance)
// Référence Clean Code: "Use meaningful names" + "Functions should be small"

import React from 'react';
import PropTypes from 'prop-types';
import { APP_VIEWS } from '../../constants/workoutStates.js';
import Button from '../ui/Button.jsx';

/**
 * Navigation items configuration
 */
const navigationItems = [
  { view: APP_VIEWS.HOME, icon: '🏠', label: 'Accueil', shortLabel: 'Home' },
  { view: APP_VIEWS.WORKOUT_CONFIG, icon: '⚙️', label: 'Configuration', shortLabel: 'Config' },
  { view: APP_VIEWS.TEST_COMPONENTS, icon: '🧪', label: 'Tests', shortLabel: 'Tests' },
  { view: APP_VIEWS.WORKOUT_DEMO, icon: '🧠', label: 'Démo', shortLabel: 'Démo' }
];

/**
 * Messages contextuels par vue
 */
const contextMessages = {
  [APP_VIEWS.HOME]: 'Choisissez votre entraînement',
  [APP_VIEWS.WORKOUT_CONFIG]: 'Configuration de la séance',
  [APP_VIEWS.WORKOUT_ACTIVE]: 'Séance en cours',
  [APP_VIEWS.WORKOUT_SUMMARY]: 'Résumé de la séance',
  [APP_VIEWS.TEST_COMPONENTS]: 'Tests de validation',
  [APP_VIEWS.WORKOUT_DEMO]: 'Démo useReducer'
};

/**
 * Calcul du pourcentage de progression du développement
 */
const getProgressPercentage = () => {
  const completedTickets = [
    'WA-001', 'WA-002', 'WA-003', 'WA-004', 
    'WA-005', 'WA-005.1', 'WA-006', 'WA-007', 'WA-008'
  ];
  const totalTickets = 12; // Estimation totale
  
  return Math.min(100, (completedTickets.length / totalTickets) * 100);
};

/**
 * Composant AppHeader
 * @param {Object} props - Propriétés du header
 * @param {string} props.currentView - Vue actuelle
 * @param {Function} props.onNavigate - Fonction de navigation
 */
const AppHeader = ({ currentView, onNavigate }) => {
  const progressPercentage = getProgressPercentage();

  return (
    <header className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white rounded-xl shadow-lg mb-6 overflow-hidden">
      {/* Contenu principal du header */}
      <div className="px-6 py-4 flex flex-wrap justify-between items-center">
        {/* Logo et titre */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            🏋️ WorkoutApp
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            {contextMessages[currentView] || 'Application de fitness'}
          </p>
        </div>
        
        {/* Navigation */}
        <nav className="flex gap-2 mt-3 sm:mt-0 flex-wrap" role="navigation">
          {navigationItems.map(({ view, icon, label, /* shortLabel */ }) => (
            <Button
              key={view}
              variant={currentView === view ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onNavigate(view)}
              className={`
                focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800
                ${currentView === view 
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
                  : 'bg-slate-600/50 text-slate-200 hover:bg-slate-500 hover:text-white hover:scale-105'
                }
              `}
            >
              <span className="hidden sm:inline">{icon} {label}</span>
              <span className="sm:hidden" title={label}>{icon}</span>
            </Button>
          ))}
        </nav>
      </div>
      
      {/* Barre de progression du développement */}
      <div className="h-1 bg-slate-600">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
          title={`Progression du développement: ${Math.round(progressPercentage)}%`}
        />
      </div>
    </header>
  );
};

// 🎯 PropTypes pour validation et documentation
AppHeader.propTypes = {
  /** Vue actuelle de l'application */
  currentView: PropTypes.oneOf(Object.values(APP_VIEWS)).isRequired,
  /** Fonction appelée lors de la navigation vers une nouvelle vue */
  onNavigate: PropTypes.func.isRequired
};

export default AppHeader;