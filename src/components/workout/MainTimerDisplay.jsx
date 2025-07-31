// src/components/workout/MainTimerDisplay.jsx
// 🎯 WA-012.1: Composant Timer circulaire extrait
// Référence Clean Code: "Single Responsibility Principle"

import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardBody } from '../ui/Card.jsx';
import { CircularProgress } from '../ui/ProgressBar.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';

/**
 * 🎯 Composant MainTimerDisplay - Timer circulaire pur
 * 
 * Responsabilité unique : Afficher le timer principal avec progression
 * Clean Code: "Do one thing and do it well"
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

  return (
    <Card variant="elevated" className={`text-center ${className}`}>
      <CardBody>
        {/* Timer circulaire principal */}
        <div className="flex justify-center mb-6 relative">
          <CircularProgress
            value={safeProgress}
            max={100}
            size={220}
            strokeWidth={15}
            variant={statusInfo.color}
            showLabel={false}
          />
          
          {/* Contenu au centre du cercle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {/* Temps restant principal */}
              <div className="text-5xl font-bold text-slate-800 mb-2">
                {timeRemaining}
              </div>
              <div className="text-sm text-slate-600 mb-1">secondes</div>
              
              {/* Statut actuel avec couleur */}
              <div className={`text-xs px-3 py-1 rounded-full bg-${statusInfo.color}-100 text-${statusInfo.color}-800`}>
                {statusInfo.icon} {statusInfo.text}
              </div>
              
              {/* Indicateur progression automatique */}
              {isAutoProgressing && (
                <div className="text-xs text-emerald-600 mt-2 font-medium flex items-center justify-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>Auto-progression</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Informations contextuelles de la phase */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-slate-600">Phase actuelle</div>
              <div className="font-semibold text-slate-800">{currentPhaseTime}s</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Progression</div>
              <div className="font-semibold text-blue-600">{Math.round(safeProgress)}%</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Temps écoulé</div>
              <div className="font-semibold text-emerald-600">{formattedTotalElapsed}</div>
            </div>
          </div>
          
          {/* Mini barre de progression pour compléter */}
          <div className="mt-3">
            <ProgressBar
              value={safeProgress}
              max={100}
              variant="success"
              size="sm"
              animated
              className="opacity-60"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

// 🎯 PropTypes pour validation
MainTimerDisplay.propTypes = {
  /** Temps restant en secondes */
  timeRemaining: PropTypes.number.isRequired,
  /** Temps total de la phase actuelle */
  currentPhaseTime: PropTypes.number.isRequired,
  /** Informations de statut avec couleur et icône */
  statusInfo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired,
  /** Si la progression automatique est active */
  isAutoProgressing: PropTypes.bool,
  /** Temps total écoulé formaté */
  formattedTotalElapsed: PropTypes.string.isRequired,
  /** Classes CSS additionnelles */
  className: PropTypes.string
};

MainTimerDisplay.defaultProps = {
  isAutoProgressing: false,
  className: ''
};

export default MainTimerDisplay;