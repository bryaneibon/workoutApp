// src/components/ui/MotivationMessage.jsx
// 🎯 WA-011.3: Composant d'affichage des messages motivationnels
// Référence Clean Code: "Make the code tell the story"

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * 🎯 Composant MotivationMessage - Affichage discret et élégant
 * 
 * Affiche les messages motivationnels avec :
 * - Animation d'entrée fluide
 * - Barre de progression temporelle
 * - Couleurs adaptées au type de message
 * - Positionnement discret en bas d'écran
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.message - Message motivationnel à afficher
 * @param {Function} props.onHide - Callback appelé quand le message se cache
 * @param {string} props.position - Position du message (bottom, top)
 */
const MotivationMessage = ({ 
  message, 
  onHide, 
  position = 'bottom',
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100); // Pourcentage de temps restant

  // 🎯 Animation d'entrée et gestion du timer
  useEffect(() => {
    if (!message) {
      setIsVisible(false);
      return;
    }

    // Animation d'entrée
    setIsVisible(true);
    setTimeLeft(100);

    // Timer de progression
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / message.duration) * 100);
      
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        clearInterval(progressInterval);
        setIsVisible(false);
        
        // Délai pour l'animation de sortie
        setTimeout(() => {
          if (onHide) onHide();
        }, 300);
      }
    }, 50); // Mise à jour toutes les 50ms pour fluidité

    return () => clearInterval(progressInterval);
  }, [message, onHide]);

  // Ne pas rendre si pas de message
  if (!message) return null;

  // 🎨 Classes de positionnement
  const positionClasses = {
    bottom: 'bottom-24 left-1/2 transform -translate-x-1/2',
    top: 'top-24 left-1/2 transform -translate-x-1/2',
    'bottom-left': 'bottom-24 left-6',
    'bottom-right': 'bottom-24 right-6'
  };

  const positionClass = positionClasses[position] || positionClasses.bottom;

  // 🎨 Couleur par défaut si non spécifiée
  const gradientColor = message.color || 'from-emerald-500 to-blue-500';

  // 🎯 Classes d'animation
  const animationClasses = isVisible 
    ? 'animate-in slide-in-from-bottom-5 duration-500' 
    : 'animate-out slide-out-to-bottom-5 duration-300';

  return (
    <div className={`
      fixed z-30 ${positionClass} ${animationClasses} ${className}
      max-w-sm mx-auto
    `}>
      {/* Container principal avec gradient */}
      <div className={`
        bg-gradient-to-r ${gradientColor} 
        text-white px-6 py-4 rounded-2xl shadow-xl
        backdrop-blur-sm border border-white/20
        transform transition-all duration-300 ease-out
        ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        {/* Contenu du message */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-base font-medium leading-tight">
              {message.message}
            </div>
            
            {/* Type de message (optionnel) */}
            {message.type && (
              <div className="text-xs opacity-80 mt-1 capitalize">
                {message.type}
              </div>
            )}
          </div>
          
          {/* Bouton de fermeture manuel (optionnel) */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                if (onHide) onHide();
              }, 300);
            }}
            className="ml-3 p-1 rounded-full hover:bg-white/20 transition-colors duration-200 opacity-60 hover:opacity-100"
            title="Fermer le message"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Barre de progression temporelle */}
        <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white/60 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${timeLeft}%` }}
          />
        </div>

        {/* Indicateur de temps restant (visible seulement si < 2s) */}
        {timeLeft < 20 && timeLeft > 0 && (
          <div className="absolute -top-2 -right-2 bg-white/90 text-slate-800 text-xs font-bold px-2 py-1 rounded-full">
            {Math.ceil((timeLeft / 100) * (message.duration / 1000))}s
          </div>
        )}
      </div>

      {/* Effet de glow subtil */}
      <div className={`
        absolute inset-0 bg-gradient-to-r ${gradientColor} 
        rounded-2xl blur-lg opacity-20 -z-10
        ${isVisible ? 'animate-pulse' : ''}
      `} />
    </div>
  );
};

// 🎯 PropTypes pour validation
MotivationMessage.propTypes = {
  /** Message motivationnel à afficher */
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    type: PropTypes.string,
    color: PropTypes.string
  }),
  /** Fonction appelée quand le message se cache */
  onHide: PropTypes.func,
  /** Position du message sur l'écran */
  position: PropTypes.oneOf(['bottom', 'top', 'bottom-left', 'bottom-right']),
  /** Classes CSS additionnelles */
  className: PropTypes.string
};

/**
 * 🎯 Composant simplifié pour un message rapide
 */
export const QuickMotivationMessage = ({ text, duration = 3000, onHide }) => {
  const quickMessage = {
    id: `quick-${Date.now()}`,
    message: text,
    duration,
    type: 'quick',
    color: 'from-blue-500 to-purple-500'
  };

  return (
    <MotivationMessage 
      message={quickMessage} 
      onHide={onHide}
    />
  );
};

QuickMotivationMessage.propTypes = {
  /** Texte du message rapide */
  text: PropTypes.string.isRequired,
  /** Durée d'affichage en millisecondes */
  duration: PropTypes.number,
  /** Fonction appelée à la fermeture */
  onHide: PropTypes.func
};

/**
 * 🎯 Container pour multiples messages (si nécessaire)
 */
export const MotivationMessageContainer = ({ messages, onHideMessage, maxVisible = 1 }) => {
  // Limiter le nombre de messages visibles simultanément
  const visibleMessages = messages.slice(-maxVisible);

  return (
    <>
      {visibleMessages.map((message, index) => (
        <MotivationMessage
          key={message.id}
          message={message}
          onHide={() => onHideMessage && onHideMessage(message.id)}
          position={index === 0 ? 'bottom' : 'top'}
          className={index > 0 ? 'mt-4' : ''}
        />
      ))}
    </>
  );
};

MotivationMessageContainer.propTypes = {
  /** Liste des messages à afficher */
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Fonction pour cacher un message spécifique */
  onHideMessage: PropTypes.func,
  /** Nombre maximum de messages visibles */
  maxVisible: PropTypes.number
};

export default MotivationMessage;