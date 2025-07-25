// src/components/ui/PhaseNotifications.jsx
// 🔔 WA-010: Composant de notifications de changement de phase
// Référence Clean Code: "Single Responsibility Principle"

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Card from './Card.jsx';
import { WORKOUT_STATUS } from '../../constants/workoutStates.js';

/**
 * 🎯 Composant PhaseNotification - Notification individuelle
 */
const PhaseNotification = ({ notification, onDismiss, autoHide = true }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(5); // 5 secondes par défaut

  // 🐛 FIX: useEffect corrigé pour le countdown
  useEffect(() => {
    if (!autoHide || !isVisible) return;

    // 🎯 Timer pour le countdown visuel
    const countdownInterval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        
        if (newTime <= 0) {
          // Déclencher la disparition
          setIsVisible(false);
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    // 🎯 Timer pour la suppression finale
    const dismissTimeout = setTimeout(() => {
      if (onDismiss) {
        onDismiss(notification.id);
      }
    }, 5300); // 5s + 300ms pour l'animation

    // Cleanup
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(dismissTimeout);
    };
  }, [autoHide, isVisible, notification.id, onDismiss]);

  // 🎯 Handler pour fermeture manuelle
  const handleManualDismiss = () => {
    setIsVisible(false);
    // Délai pour l'animation avant suppression
    setTimeout(() => {
      if (onDismiss) {
        onDismiss(notification.id);
      }
    }, 300);
  };

  // Ne pas rendre si invisible
  if (!isVisible) return null;

    // Couleurs selon le type de phase
  const getPhaseColors = (phase) => {
    const colors = {
      [WORKOUT_STATUS.PREPARING]: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', progress: 'bg-yellow-400'},
      [WORKOUT_STATUS.WORKING]: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', progress: 'bg-green-400'},
      [WORKOUT_STATUS.RESTING]: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800',progress: 'bg-blue-400'},
      [WORKOUT_STATUS.COMPLETED]: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-800', progress: 'bg-purple-400'},
      [WORKOUT_STATUS.PAUSED]: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', progress: 'bg-orange-400'}
    };
    return colors[phase] || { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-800', progress: 'bg-slate-400'};
  };

  const colors = getPhaseColors(notification.toPhase);

return (
    <div className={`
      transform transition-all duration-300 ease-in-out
      ${isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
    `}>
      <Card 
        className={`
          ${colors.bg} ${colors.border} border-l-4 border-l-current
          shadow-lg mb-3 relative overflow-hidden max-w-sm
        `}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="text-2xl flex-shrink-0">
              {getPhaseIcon(notification.toPhase)}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`font-semibold ${colors.text} text-sm leading-tight`}>
                {notification.message}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {notification.timestamp}
              </div>
            </div>
          </div>

          {/* Bouton de fermeture et countdown */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {autoHide && (
              <div className={`
                text-xs px-2 py-1 rounded-full bg-white/70 text-slate-600 font-medium
                ${timeLeft <= 2 ? 'animate-pulse' : ''}
              `}>
                {timeLeft}s
              </div>
            )}
            <button
              onClick={handleManualDismiss}
              className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-white/50 transition-colors"
              title="Fermer la notification"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Barre de progression pour auto-hide - CORRIGÉE */}
        {autoHide && (
          <div className="absolute bottom-0 left-0 h-1 bg-black/10 w-full">
            <div 
              className={`h-full ${colors.progress} transition-all duration-1000 ease-linear`}
              style={{ 
                width: `${((5 - timeLeft) / 5) * 100}%`,
                transformOrigin: 'left'
              }}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

// Icônes par phase
const getPhaseIcon = (phase) => {
  const icons = {
    [WORKOUT_STATUS.PREPARING]: '⚡',
    [WORKOUT_STATUS.WORKING]: '💪',
    [WORKOUT_STATUS.RESTING]: '😴',
    [WORKOUT_STATUS.COMPLETED]: '🎉',
    [WORKOUT_STATUS.PAUSED]: '⏸️'
  };
  return icons[phase] || '🔔';
};

// PropTypes pour PhaseNotification
PhaseNotification.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    toPhase: PropTypes.string.isRequired,
    fromPhase: PropTypes.string.isRequired
  }).isRequired,
  onDismiss: PropTypes.func,
  autoHide: PropTypes.bool
};

/**
 * 🔔 Composant PhaseNotifications - Container principal
 */
const PhaseNotifications = ({ 
  notifications = [], 
  maxVisible = 3,
  position = 'top-right',
  showHistory = false,
  onClearAll 
}) => {
  // 🎯 État local pour gérer les notifications visibles
  const [displayedNotifications, setDisplayedNotifications] = useState([]);

  // 🎯 Ajouter nouvelles notifications avec ID unique et timestamp
  useEffect(() => {
    const newNotifications = notifications
      .slice(-maxVisible)
      .map(notification => ({
        ...notification,
        displayId: `${notification.id}-${Date.now()}`, // ID unique pour le rendu
        addedAt: Date.now()
      }));

    setDisplayedNotifications(newNotifications);
  }, [notifications, maxVisible]);

  // 🎯 Handler pour supprimer une notification
  const handleDismiss = useCallback((notificationId) => {
    setDisplayedNotifications(prev => 
      prev.filter(n => n.displayId !== notificationId)
    );
  }, []);

  // 🎯 Classes de positionnement améliorées
  const positionClasses = {
    'top-right': 'fixed top-4 right-4 z-50',
    'top-left': 'fixed top-4 left-4 z-50',
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'bottom-left': 'fixed bottom-4 left-4 z-50',
    'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
    'bottom-center': 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50'
  };

  if (displayedNotifications.length === 0 && !showHistory) return null;

  return (
    <div className={positionClasses[position] || positionClasses['top-right']}>
      <div className="w-80 max-w-sm space-y-3">
        {/* Notifications actives avec clé unique */}
        {displayedNotifications.map(notification => (
          <PhaseNotification
            key={notification.displayId} // 🎯 Clé unique pour éviter les conflits
            notification={notification}
            onDismiss={handleDismiss}
            autoHide={true}
          />
        ))}

        {/* Historique des notifications (optionnel) */}
        {showHistory && notifications.length > 0 && (
          <Card className="bg-slate-50 border border-slate-200 mt-4">
            <div className="flex items-center justify-between mb-3 p-3">
              <h4 className="font-medium text-slate-800 text-sm">
                📋 Historique ({notifications.length})
              </h4>
              {onClearAll && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-slate-500 hover:text-slate-700 bg-slate-200 px-2 py-1 rounded transition-colors"
                >
                  Effacer
                </button>
              )}
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto px-3 pb-3">
              {notifications.slice(-10).reverse().map((notification, index) => (
                <div 
                  key={`history-${notification.id}-${index}`}
                  className="p-2 bg-white rounded border border-slate-200 text-xs"
                >
                  <div className="font-medium text-slate-700">
                    {getPhaseIcon(notification.toPhase)} {notification.message}
                  </div>
                  <div className="text-slate-500 mt-1">
                    {notification.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
// PropTypes pour PhaseNotifications
PhaseNotifications.propTypes = {
  /** Array des notifications à afficher */
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      toPhase: PropTypes.string.isRequired,
      fromPhase: PropTypes.string.isRequired
    })
  ),
  /** Nombre maximum de notifications visibles simultanément */
  maxVisible: PropTypes.number,
  /** Position des notifications */
  position: PropTypes.oneOf([
    'top-right', 'top-left', 'bottom-right', 'bottom-left', 
    'top-center', 'bottom-center'
  ]),
  /** Afficher l'historique des notifications */
  showHistory: PropTypes.bool,
  /** Fonction pour effacer toutes les notifications */
  onClearAll: PropTypes.func
};

export default PhaseNotifications;
export { PhaseNotification };