// src/hooks/useMotivationMessages.js
// 🎯 WA-011.3: Hook pour messages motivationnels contextuels
// Référence Clean Code: "Functions should do one thing"

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  getProgressMotivationMessage,
  getPhaseMotivationMessage,
  getRecoveryMessage
} from '../data/motivationMessages.js';
import { WORKOUT_STATUS } from '../constants/workoutStates.js';

/**
 * 🎯 Hook useMotivationMessages - Système de motivation contextuelle
 * 
 * Ce hook gère l'affichage intelligent de messages motivationnels basés sur :
 * - La progression du workout (50%, 80%, 95%)
 * - Le contexte de phase (premier round, dernier round)
 * - L'état de l'utilisateur (repos, effort)
 * 
 * @param {Object} workout - Instance du hook useWorkout
 * @param {Object} phaseContext - Instance du hook usePhaseContext
 * @returns {Object} Interface de motivation avec message actuel
 */
export const useMotivationMessages = (workout, phaseContext = null) => {
  // 📊 État local du système de motivation
  const [shownMessages, setShownMessages] = useState(new Set());
  const [currentMessage, setCurrentMessage] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  
  // 🔗 Références pour éviter les re-déclenchements
  const lastProgressRef = useRef(0);
  const lastRoundRef = useRef(0);
  const messageTimeoutRef = useRef(null);

  // 🎯 Fonction pour afficher un message avec auto-hide
  const showMessage = useCallback((message) => {
    if (!message || shownMessages.has(message.id)) return;

    console.log(`💬 Motivation: Affichage de "${message.message}"`);
    
    // 🛡️ CLEANUP: Clear existing timeout first
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = null;
    }
    
    // Marquer comme affiché
    setShownMessages(prev => new Set([...prev, message.id]));
    
    // Afficher le message
    setCurrentMessage(message);
    
    // Ajouter à l'historique
    setMessageHistory(prev => [...prev.slice(-4), {
      ...message,
      timestamp: new Date().toLocaleTimeString(),
      workoutProgress: workout.computed.progressPercentage
    }]);
    
    // 🆕 PROTECTION: Vérifier si le message est encore valide
    const timeoutId = setTimeout(() => {
      // Double-check que c'est bien notre timeout
      if (messageTimeoutRef.current === timeoutId) {
        setCurrentMessage(null);
        messageTimeoutRef.current = null;
      }
    }, message.duration);
    messageTimeoutRef.current = timeoutId;
  }, [shownMessages, workout.computed.progressPercentage]);

  // 🎯 Détection des messages basés sur la progression
  useEffect(() => {
    const currentProgress = workout.computed.progressPercentage;
    
    // Éviter les déclenchements répétitifs
    if (Math.abs(currentProgress - lastProgressRef.current) < 1) return;
    lastProgressRef.current = currentProgress;
    
    // Chercher un message de progression approprié
    const progressMessage = getProgressMotivationMessage(currentProgress, shownMessages);
    if (progressMessage) {
      showMessage(progressMessage);
    }
    
  }, [workout.computed.progressPercentage, shownMessages, showMessage]);

  // 🎯 Détection des messages basés sur les phases (si phaseContext disponible)
  useEffect(() => {
    if (!phaseContext) return;
    
    const currentRound = workout.state.currentRound;
    
    // Éviter les déclenchements répétitifs
    if (currentRound === lastRoundRef.current) return;
    lastRoundRef.current = currentRound;
    
    // Chercher un message de phase approprié
    const phaseMessage = getPhaseMotivationMessage(
      phaseContext.context, 
      workout.state, 
      shownMessages
    );
    
    if (phaseMessage) {
      // Délai pour éviter conflit avec les messages de progression
      setTimeout(() => {
        showMessage(phaseMessage);
      }, 500);
    }
    
  }, [phaseContext?.context, workout.state.currentRound, shownMessages, showMessage, workout.state]);

  // 🎯 Messages de récupération pendant les repos (optionnel)
  useEffect(() => {
    if (workout.state.status !== WORKOUT_STATUS.RESTING) return;
    
    // Chance de 20% d'avoir un message de récupération
    if (Math.random() > 0.8) {
      const recoveryMessage = getRecoveryMessage(workout.state.status, shownMessages);
      if (recoveryMessage) {
        // Délai pour que l'utilisateur se stabilise en repos
        setTimeout(() => {
          showMessage(recoveryMessage);
        }, 2000);
      }
    }
    
  }, [workout.state.status, shownMessages, showMessage]);

  // 🧹 Cleanup des timeouts
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  // 🔧 Fonction pour forcer l'affichage d'un message (pour tests)
  const forceShowMessage = useCallback((message) => {
    setCurrentMessage(message);
    
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    
    messageTimeoutRef.current = setTimeout(() => {
      setCurrentMessage(null);
    }, message.duration);
    
    console.log(`🧪 Force affichage: "${message.message}"`);
  }, []);

  // 🔧 Fonction pour masquer le message actuel
  const hideCurrentMessage = useCallback(() => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = null;
    }
    setCurrentMessage(null);
  }, []);

  // 🔧 Fonction pour reset du système
  const resetMotivationSystem = useCallback(() => {
    setShownMessages(new Set());
    setCurrentMessage(null);
    setMessageHistory([]);
    lastProgressRef.current = 0;
    lastRoundRef.current = 0;
    
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = null;
    }
    
    console.log('🔄 Système de motivation réinitialisé');
  }, []);

  // 📊 Fonction pour obtenir les statistiques
  const getMotivationStats = useCallback(() => {
    return {
      messagesShown: shownMessages.size,
      currentlyShowing: !!currentMessage,
      historyCount: messageHistory.length,
      lastMessage: messageHistory[messageHistory.length - 1] || null,
      progressTracked: lastProgressRef.current,
      roundTracked: lastRoundRef.current
    };
  }, [shownMessages.size, currentMessage, messageHistory]);

  // 📊 Interface publique du hook
  return {
    // 📨 Message actuel à afficher
    currentMessage,
    
    // 📊 État du système
    stats: {
      messagesShown: shownMessages.size,
      isShowing: !!currentMessage,
      history: messageHistory
    },
    
    // 🔧 Contrôles manuels
    controls: {
      forceShow: forceShowMessage,
      hide: hideCurrentMessage,
      reset: resetMotivationSystem
    },
    
    // 📈 Utilitaires
    utils: {
      getStats: getMotivationStats,
      hasShown: (messageId) => shownMessages.has(messageId),
      getHistory: () => messageHistory
    }
  };
};

/**
 * 🎯 Hook simplifié pour usage basique
 * Clean Code: "Provide a simple interface for common cases"
 */
export const useBasicMotivation = (workout) => {
  const motivation = useMotivationMessages(workout);
  
  return {
    message: motivation.currentMessage,
    hide: motivation.controls.hide
  };
};

export default useMotivationMessages;