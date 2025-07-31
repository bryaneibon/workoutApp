// src/components/workout/MainTimerDisplay.jsx
// 🎨 WA-012.2: Enhanced avec transitions visuelles fluides
// Référence Clean Code: "Make it expressive with good visual feedback"

import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardBody } from '../ui/Card.jsx';
import { CircularProgress } from '../ui/ProgressBar.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';

/**
 * 🎯 Composant MainTimerDisplay Enhanced - Timer avec animations fluides
 * 
 * WA-012.2 Améliorations visuelles :
 * - Transitions de couleur fluides
 * - Animations de pulsation contextuelles  
 * - Effets de glow dynamiques
 * - Micro-animations sur changements d'état
 * 
 * Pragmatic Programmer: "Invest in your user experience"
 */
const MainTimerDisplay = ({ 
  timeRemaining, 
  currentPhaseTime, 
  statusInfo, 
  isAutoProgressing,
  formattedTotalElapsed,
  className = ''
}) => {
  // 🧮 Calcul sécurisé du pourcentage
  const progressPercentage = currentPhaseTime > 0 
    ? ((currentPhaseTime - timeRemaining) / currentPhaseTime) * 100 
    : 0;

  // 🛡️ Protection contre NaN
  const safeProgress = isNaN(progressPercentage) ? 0 : Math.min(Math.max(progressPercentage, 0), 100);

  // 🎨 Détection des moments critiques pour animations spéciales
  const isLastSeconds = timeRemaining <= 3 && timeRemaining > 0;
  const isPhaseComplete = safeProgress >= 100;

  // 🎭 Classes d'animation dynamiques
  const getTimerAnimationClasses = () => {
    if (isLastSeconds) return 'animate-pulse';
    if (isAutoProgressing) return 'transition-all duration-1000';
    return 'transition-all duration-500';
  };

  // 🌈 Couleurs dynamiques selon l'état
  const getStatusColorClasses = () => {
    const baseClasses = `px-3 py-1 rounded-full text-xs font-medium transition-all duration-500`;
    const colorClasses = `bg-${statusInfo.color}-100 text-${statusInfo.color}-800`;
    
    return `${baseClasses} ${colorClasses} hover:scale-105`;
  };

  return (
    <Card 
      variant="elevated" 
      className={`text-center transition-all duration-500 hover:shadow-2xl ${className}`}
    >
      <CardBody>
        {/* 🕐 Timer circulaire principal avec effets enhanced */}
        <div className="flex justify-center mb-6 relative">
          {/* Effet de glow derrière le timer */}
          <div className={`absolute inset-0 rounded-full transition-all duration-1000 ${
            isAutoProgressing 
              ? `bg-${statusInfo.color}-200 opacity-20 animate-pulse blur-lg scale-110` 
              : 'opacity-0'
          }`}></div>
          
          <div className="relative">
            <CircularProgress
              value={safeProgress}
              max={100}
              size={220}
              strokeWidth={15}
              variant={statusInfo.color}
              showLabel={false}
              className={`transition-all duration-700`}
            />
            
            {/* 🎯 Contenu au centre avec animations */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                {/* ⏰ Temps restant avec animations */}
                <div className={`font-bold text-slate-800 mb-2 transition-all duration-300 ${
                  isLastSeconds ? 'text-6xl text-red-600 animate-bounce' :
                  'text-5xl hover:scale-105'
                } ${getTimerAnimationClasses()}`}>
                  {timeRemaining}
                </div>
                
                <div className="text-sm text-slate-600 mb-1 transition-opacity duration-300">
                  secondes
                </div>
                
                {/* 🎭 Statut avec couleur dynamique et animations */}
                <div className={getStatusColorClasses()}>
                  <span className="transition-transform duration-200 inline-block hover:scale-110">
                    {statusInfo.icon}
                  </span>
                  <span className="ml-1">{statusInfo.text}</span>
                </div>
                
                {/* ⚡ Indicateur progression automatique enhanced */}
                {isAutoProgressing && (
                  <div className="text-xs text-emerald-600 mt-2 font-medium flex items-center justify-center space-x-1 animate-fade-in">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="animate-pulse">Auto-progression</span>
                  </div>
                )}
            
              </div>
            </div>
          </div>
        </div>

        {/* 📊 Informations contextuelles avec animations */}
        <div className={`bg-slate-50 p-4 rounded-lg transition-all duration-500 ${
          isPhaseComplete ? 'bg-green-50 border border-green-200' : ''
        }`}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="transition-all duration-300 hover:scale-105">
              <div className="text-sm text-slate-600">Phase actuelle</div>
              <div className={`font-semibold transition-colors duration-300 ${
                isPhaseComplete ? 'text-green-600' : 'text-slate-800'
              }`}>
                {currentPhaseTime}s
              </div>
            </div>
            
            <div className="transition-all duration-300 hover:scale-105">
              <div className="text-sm text-slate-600">Progression</div>
              <div className={`font-semibold transition-all duration-500 ${
                safeProgress >= 100 ? 'text-green-600 animate-bounce' :
                safeProgress >= 80 ? 'text-orange-600' :
                'text-blue-600'
              }`}>
                {Math.round(safeProgress)}%
              </div>
            </div>
            
            <div className="transition-all duration-300 hover:scale-105">
              <div className="text-sm text-slate-600">Temps écoulé</div>
              <div className="font-semibold text-emerald-600 transition-colors duration-300">
                {formattedTotalElapsed}
              </div>
            </div>
          </div>
          
          {/* 📈 Mini barre de progression enhanced */}
          <div className="mt-3">
            <ProgressBar
              value={safeProgress}
              max={100}
              variant={'success'}
              size="sm"
              animated
              className={`opacity-60 transition-all duration-500`}
            />
          </div>
          
          {/* 🎉 Message de completion */}
          {isPhaseComplete && (
            <div className="mt-2 text-center animate-fade-in">
              <div className="text-sm text-green-600 font-medium flex items-center justify-center space-x-1">
                <span className="animate-bounce">🎉</span>
                <span>Phase terminée !</span>
                <span className="animate-bounce">🎉</span>
              </div>
            </div>
          )}
        </div>
      </CardBody>
      
      {/* 🌟 Effet de brillance en overlay lors des moments critiques */}
      {isLastSeconds && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 to-red-200/20 rounded-xl animate-pulse pointer-events-none"></div>
      )}
    </Card>
  );
};

// 🎯 PropTypes inchangés
MainTimerDisplay.propTypes = {
  timeRemaining: PropTypes.number.isRequired,
  currentPhaseTime: PropTypes.number.isRequired,
  statusInfo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired,
  isAutoProgressing: PropTypes.bool,
  formattedTotalElapsed: PropTypes.string.isRequired,
  className: PropTypes.string
};

MainTimerDisplay.defaultProps = {
  isAutoProgressing: false,
  className: ''
};

export default MainTimerDisplay;