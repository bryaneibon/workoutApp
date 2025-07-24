// src/hooks/useWorkoutTimer.js
// ⏰ WA-010: Hook Timer avec progression automatique d'exercice - ENHANCED
// Référence Clean Code: "Functions should do one thing and do it well"

import { useEffect, useRef, useCallback, useState } from 'react';
import { WORKOUT_STATUS } from '../constants/workoutStates.js';

/**
 * 🎯 Hook useWorkoutTimer Enhanced - Timer + Progression automatique
 * 
 * WA-010 Nouvelles fonctionnalités :
 * - Détection automatique de fin de phase (timeRemaining = 0)
 * - Notifications de changement de phase avec sons/vibrations
 * - Progression automatique vers exercice/round suivant
 * - Gestion intelligente de la completion du workout
 * 
 * @param {Object} workout - Instance du hook useWorkout
 * @returns {Object} Interface du timer avec contrôles et notifications
 */
export const useWorkoutTimer = (workout) => {
  // 🔗 Références pour éviter les re-renders et memory leaks
  const intervalRef = useRef(null);
  const lastTickTime = useRef(Date.now());
  const lastNotifiedPhase = useRef(null); // 🆕 Pour éviter les notifications répétées
  
  // 📊 États locaux du timer
  const [isRunning, setIsRunning] = useState(false);
  const [tickCount, setTickCount] = useState(0);
  const [phaseNotifications, setPhaseNotifications] = useState([]); // 🆕 Historique des notifications

  // 🔔 Système de notifications de phase - NOUVEAU WA-010
  const notifyPhaseChange = useCallback((fromPhase, toPhase, context = {}) => {
    const notification = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      fromPhase,
      toPhase,
      context,
      message: getPhaseChangeMessage(fromPhase, toPhase, context)
    };

    console.log(`🔔 Phase Change: ${notification.message}`);
    
    // Ajouter à l'historique
    setPhaseNotifications(prev => [...prev.slice(-4), notification]); // Garde les 5 dernières

    // 🎵 Notifications sonores (si supportées)
    if ('vibrate' in navigator) {
      navigator.vibrate(getVibrationPattern(toPhase));
    }

    // Optionnel: Web Audio API pour les sons
    playPhaseSound(toPhase);

    return notification;
  }, []);

  // 🎵 Fonction de génération de sons de phase
  const playPhaseSound = useCallback((phase) => {
    // Simple beep avec Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Fréquences différentes par phase
      const frequencies = {
        [WORKOUT_STATUS.PREPARING]: 440, // La
        [WORKOUT_STATUS.WORKING]: 523,   // Do
        [WORKOUT_STATUS.RESTING]: 392,   // Sol
        [WORKOUT_STATUS.COMPLETED]: 659  // Mi
      };

      oscillator.frequency.setValueAtTime(frequencies[phase] || 440, audioContext.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('🔇 Audio non disponible:', error.message);
    }
  }, []);

  // 📱 Patterns de vibration par phase
  const getVibrationPattern = (phase) => {
    const patterns = {
      [WORKOUT_STATUS.PREPARING]: [100, 50, 100], // Court-court
      [WORKOUT_STATUS.WORKING]: [200],            // Long
      [WORKOUT_STATUS.RESTING]: [100, 100, 100],  // Triple court
      [WORKOUT_STATUS.COMPLETED]: [300, 100, 300, 100, 300] // Célébration
    };
    return patterns[phase] || [100];
  };

  // 💬 Messages de changement de phase
  const getPhaseChangeMessage = (fromPhase, toPhase, context) => {
    const messages = {
      [`${WORKOUT_STATUS.PREPARING}-${WORKOUT_STATUS.WORKING}`]: 
        `🚀 Début de l'exercice: ${context.exerciseName || 'Exercice'} !`,
      [`${WORKOUT_STATUS.WORKING}-${WORKOUT_STATUS.RESTING}`]: 
        `😴 Repos mérité ! Prochain: ${context.nextExercise || 'exercice suivant'}`,
      [`${WORKOUT_STATUS.RESTING}-${WORKOUT_STATUS.WORKING}`]: 
        `💪 C'est reparti ! ${context.exerciseName || 'Exercice'} - Round ${context.round || '?'}`,
      [`${WORKOUT_STATUS.RESTING}-${WORKOUT_STATUS.COMPLETED}`]: 
        `🎉 BRAVO ! Workout terminé en ${context.totalTime || '?'} !`
    };
    
    return messages[`${fromPhase}-${toPhase}`] || `Phase: ${fromPhase} → ${toPhase}`;
  };

  // 🎯 Fonction de tick ENHANCED avec détection de progression
  const tick = useCallback(() => {
    const now = Date.now();
    const delta = now - lastTickTime.current;
    
    // Protection contre les ticks trop rapides
    if (delta < 900) {
      console.warn('⚠️ Tick ignoré - trop rapide:', delta);
      return;
    }
    
    lastTickTime.current = now;
    
    // 🆕 WA-010: Sauvegarder l'état AVANT la mise à jour
    const previousState = {
      timeRemaining: workout.state.timeRemaining,
      status: workout.state.status,
      currentExerciseIndex: workout.state.currentExerciseIndex,
      currentRound: workout.state.currentRound,
      completedExercises: workout.state.completedExercises
    };
    
    setTickCount(prev => {
      const newCount = prev + 1;
      console.log(`📊 Timer tick #${newCount} - Delta: ${delta}ms - Time: ${workout.state.timeRemaining}s`);
      return newCount;
    });
    
    // Appel de l'action updateTimer (ceci va déclencher la progression automatique)
    workout.actions.updateTimer();
    
    // 🆕 WA-010: Détecter les changements de phase APRÈS la mise à jour
    // Note: On utilise un useEffect séparé pour cela car l'état n'est pas encore mis à jour ici
    
  }, [workout.actions, workout.state.timeRemaining, workout.state.status]);

  // 🆕 WA-010: Hook de détection des changements de phase
  useEffect(() => {
    const currentPhase = workout.state.status;
    const timeRemaining = workout.state.timeRemaining;
    
    // Détecter les changements de phase
    if (lastNotifiedPhase.current !== null && lastNotifiedPhase.current !== currentPhase) {
      const context = {
        exerciseName: workout.computed.currentExercise?.name,
        nextExercise: getNextExerciseName(workout.state),
        round: workout.state.currentRound,
        totalRounds: workout.state.totalRounds,
        timeRemaining,
        totalTime: workout.computed.formattedTotalElapsed
      };
      
      notifyPhaseChange(lastNotifiedPhase.current, currentPhase, context);
    }
    
    lastNotifiedPhase.current = currentPhase;
  }, [workout.state.status, workout.computed.currentExercise, workout.state.currentRound, notifyPhaseChange]);

  // 🔧 Utilitaire pour récupérer le nom du prochain exercice
  const getNextExerciseName = (state) => {
    if (!state.exercises.length) return null;
    
    const isLastExercise = state.currentExerciseIndex === state.exercises.length - 1;
    const isLastRound = state.currentRound === state.totalRounds;
    
    if (isLastExercise && isLastRound) {
      return null; // Workout terminé
    } else if (isLastExercise) {
      return state.exercises[0]?.name; // Premier exercice du prochain round
    } else {
      return state.exercises[state.currentExerciseIndex + 1]?.name;
    }
  };

  // 🚀 Fonction de démarrage du timer - INCHANGÉE
  const startTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      console.warn('⚠️ Timer déjà actif - ID:', intervalRef.current);
      return false;
    }
    
    console.log('🚀 Démarrage du timer automatique avec progression');
    lastTickTime.current = Date.now();
    lastNotifiedPhase.current = workout.state.status; // Initialiser la phase
    
    const id = setInterval(tick, 1000);
    intervalRef.current = id;
    setIsRunning(true);
    
    console.log('✅ Timer + Progression démarrés - ID:', id);
    return true;
  }, [tick, workout.state.status]);
  
  // ⏸️ Fonction d'arrêt du timer - INCHANGÉE
  const stopTimer = useCallback(() => {
    if (intervalRef.current === null) {
      console.log('⚠️ Aucun timer à arrêter');
      return false;
    }
    
    console.log('⏹️ Arrêt du timer + progression - ID:', intervalRef.current);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    
    return true;
  }, []);
  
  // 🔄 Fonction de reset du timer
  const resetTimer = useCallback(() => {
    stopTimer();
    setTickCount(0);
    setPhaseNotifications([]); // 🆕 Reset des notifications
    lastTickTime.current = Date.now();
    lastNotifiedPhase.current = null; // 🆕 Reset de la phase
    console.log('🔄 Timer + progression réinitialisés');
  }, [stopTimer]);

  // 🎵 Hook useEffect principal - Gestion automatique du timer
  useEffect(() => {
    const shouldRun = workout.state.isActive && !workout.state.isPaused;
    
    console.log(`🔍 Timer check - Should run: ${shouldRun}, Is running: ${isRunning}`);
    
    if (shouldRun && !isRunning) {
      console.log('▶️ Conditions remplies - Démarrage du timer + progression');
      startTimer();
    } else if (!shouldRun && isRunning) {
      console.log('⏸️ Conditions non remplies - Arrêt du timer + progression');
      stopTimer();
    }
  }, [
    workout.state.isActive, 
    workout.state.isPaused, 
    isRunning, 
    startTimer, 
    stopTimer
  ]);
  
  // 🧹 Cleanup à la destruction du composant
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        console.log('🧹 Cleanup - Arrêt du timer avant destruction');
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // 🆕 WA-010: Hook pour détecter la completion du workout
  useEffect(() => {
    if (workout.state.status === WORKOUT_STATUS.COMPLETED && isRunning) {
      console.log('🎉 Workout complété - Arrêt automatique du timer');
      stopTimer();
      
      // Notification spéciale de completion
      notifyPhaseChange(WORKOUT_STATUS.RESTING, WORKOUT_STATUS.COMPLETED, {
        totalTime: workout.computed.formattedTotalElapsed,
        completedExercises: workout.state.completedExercises,
        totalExercises: workout.state.totalExercises
      });
    }
  }, [workout.state.status, isRunning, stopTimer, notifyPhaseChange, workout.computed.formattedTotalElapsed]);

  // 📊 Interface publique du hook - ENHANCED
  return {
    // 📊 État du timer
    isRunning,
    tickCount,
    
    // 🔔 Nouvelles fonctionnalités WA-010
    notifications: {
      latest: phaseNotifications[phaseNotifications.length - 1] || null,
      history: phaseNotifications,
      count: phaseNotifications.length
    },
    
    // 🎮 Contrôles manuels (pour tests)
    controls: {
      start: startTimer,
      stop: stopTimer,
      reset: resetTimer,
      forceTickONLYFORTEST: tick, // NE PAS utiliser en production
      clearNotifications: () => setPhaseNotifications([])
    },
    
    // 📈 Statistiques et debug - ENHANCED
    stats: {
      tickCount,
      isRunning,
      hasInterval: intervalRef.current !== null,
      workoutActive: workout.state.isActive,
      workoutPaused: workout.state.isPaused,
      timeRemaining: workout.state.timeRemaining,
      currentPhase: workout.state.status,
      lastTickDelta: Date.now() - lastTickTime.current,
      notificationCount: phaseNotifications.length,
      lastNotification: phaseNotifications[phaseNotifications.length - 1]?.message
    },
    
    // 🔧 Utilitaires - ENHANCED
    utils: {
      getIntervalId: () => intervalRef.current,
      isHealthy: () => {
        const shouldBeRunning = workout.state.isActive && !workout.state.isPaused;
        const actuallyRunning = intervalRef.current !== null;
        return shouldBeRunning === actuallyRunning;
      },
      getProgressionInfo: () => {
        return {
          currentExercise: workout.computed.currentExercise?.name || 'Aucun',
          nextExercise: getNextExerciseName(workout.state) || 'Terminé',
          phase: workout.state.status,
          timeRemaining: workout.state.timeRemaining,
          progressPercentage: workout.computed.progressPercentage
        };
      }
    }
  };
};

export default useWorkoutTimer;

/**
 * 🎯 Hook simplifié pour la progression automatique uniquement
 * Clean Code: "Extract till you drop"
 */
export const useAutoProgression = (workout) => {
  const [progressionEvents, setProgressionEvents] = useState([]);

  useEffect(() => {
    if (workout.state.timeRemaining === 0 && workout.state.isActive) {
      const event = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        action: 'auto_progression',
        fromPhase: workout.state.status,
        exerciseName: workout.computed.currentExercise?.name,
        round: workout.state.currentRound
      };

      setProgressionEvents(prev => [...prev, event]);
      console.log('🔄 Progression automatique déclenchée:', event);
    }
  }, [workout.state.timeRemaining, workout.state.isActive, workout.state.status]);

  return {
    events: progressionEvents,
    clearEvents: () => setProgressionEvents([]),
    lastEvent: progressionEvents[progressionEvents.length - 1] || null
  };
};