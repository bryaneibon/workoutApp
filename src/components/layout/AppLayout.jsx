// src/components/layout/AppLayout.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { APP_VIEWS } from '../../constants/workoutStates.js';
import AppHeader from './AppHeader.jsx';

/**
 * Composant AppLayout - VERSION MINIMALISTE
 * Fait UNE chose : Layout de base avec header + contenu
 * Pas de footer inutile, pas de métriques, pas d'animations superflues
 */
const AppLayout = ({ children, currentView, onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header essentiel */}
        <AppHeader 
          currentView={currentView} 
          onNavigate={onNavigate} 
        />

        {/* Contenu principal - C'EST TOUT ! */}
        <main className="mt-8">
          {children}
        </main>
      </div>
    </div>
  );
};

// PropTypes strict
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  currentView: PropTypes.oneOf(Object.values(APP_VIEWS)).isRequired,
  onNavigate: PropTypes.func.isRequired
};

export default AppLayout;