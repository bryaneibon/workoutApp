// src/components/layout/AppLayout.jsx
// 🎨 WA-008.5: Layout principal avec PropTypes (Clean Code compliance)
// Référence Clean Code: "Organize around the architecture, not the framework"

import React from 'react';
import PropTypes from 'prop-types';
import { APP_VIEWS } from '../../constants/workoutStates.js';
import AppHeader from './AppHeader.jsx';

/**
 * Messages de pied de page dynamiques
 */
const getFooterMessage = () => {
  const messages = [
    { 
      phase: 'WA-011.2 Audio Contextuel terminé!', 
      status: 'Système audio intelligent + Intelligence contextuelle + Timer automatique',
      next: 'WA-012 - Affichage Timer Formaté',
      color: 'text-purple-600'
    }
  ];
  
  return messages[0]; // Pour l'instant, on retourne le message actuel
};

/**
 * Composant AppLayout
 * @param {Object} props - Propriétés du layout
 * @param {React.ReactNode} props.children - Contenu principal
 * @param {string} props.currentView - Vue actuelle
 * @param {Function} props.onNavigate - Fonction de navigation
 */
const AppLayout = ({ children, currentView, onNavigate }) => {
  const footerMessage = getFooterMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header avec navigation */}
        <AppHeader 
          currentView={currentView} 
          onNavigate={onNavigate} 
        />

        {/* Contenu principal */}
        <main className="space-y-6" role="main">
          {children}
        </main>

        {/* Footer informatif */}
        <footer className="mt-12 p-6 bg-white/50 backdrop-blur rounded-xl border border-slate-200 text-center text-sm text-slate-600">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <strong className={footerMessage.color}>
              🚀 {footerMessage.phase}
            </strong>
            <span className="hidden sm:inline">|</span>
            <span>{footerMessage.status}</span>
            <span className="hidden sm:inline">|</span>
            <strong className="text-emerald-600">
              Prochaine étape: {footerMessage.next}
            </strong>
          </div>
          
          {/* Indicateurs de développement */}
          <div className="mt-3 flex items-center justify-center space-x-2 text-xs">
            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
              ✅ Architecture modulaire + PropTypes
            </span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
              🎨 Design system uniforme
            </span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
              🏗️ Clean Code appliqué
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

// 🎯 PropTypes pour AppLayout
AppLayout.propTypes = {
  /** Contenu principal à afficher dans le layout */
  children: PropTypes.node.isRequired,
  /** Vue actuelle de l'application */
  currentView: PropTypes.oneOf(Object.values(APP_VIEWS)).isRequired,
  /** Fonction appelée lors de la navigation vers une nouvelle vue */
  onNavigate: PropTypes.func.isRequired
};

export default AppLayout;