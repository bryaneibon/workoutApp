// src/hooks/useWorkoutTimer.js
// ⏰ WA-009: Hook Timer automatique avec setInterval
// Référence Clean Code: "Functions should do one thing and do it well"
// Référence Pragmatic Programmer: "Use the power of command shells"

import { useEffect, useRef, useCallback, useState } from 'react';
import { WORKOUT_STATUS } from '../constants/workoutStates.js';

/**
 * 🎯 Hook useWorkoutTimer - Timer automatique intelligent
 * 
 * Ce hook gère :
 * - setInterval automatique quand le workout est actif
 * - Pause/Resume du timer selon l'état
 * - Cleanup automatique à la destruction
 * - Notifications de phases (work/rest/prep)
 * - Performance optimisée avec useCallback
 * 
 * @param {Object} workout - Instance du hook useWorkout
 * @returns {Object} Interface du timer avec contrôles
 */
export const useWorkoutTimer = (workout) => {
  // 🔗 Références pour éviter les re-renders et memory leaks
  const timerId = useRef(null);
  const lastUpdateTime = useRef(Date.now());
  
  // 📊 États locaux du timer
  const [isRunning, setIsRunning] = useState(false);
  const [tickCount, setTickCount] = useState(0);
  
  // 🎯 Fonction de tick optimisée - FIX CRITIQUE
  const tick = useCallback(() => {
    console.log('⏰ Timer tick déclenché');
    setTickCount(prev => {
      const newCount = prev + 1;
      console.log(`📊 Tick #${newCount}`);
      return newCount;
    });
    
    // 🎯 Mise à jour du workout - FIX: Utiliser dispatch directement
    workout.actions.updateTimer();
    console.log(`🎯 UpdateTimer appelé - Temps restant après: ${workout.state.timeRemaining}`);
  }, [workout.actions.updateTimer, workout.state.timeRemaining]); // FIX: Dépendances explicites
  
  // 🚀 Fonction de démarrage du timer
  const startTimer = useCallback(() => {
    if (timerId.current) {
      console.warn('⚠️ Timer déjà actif');
      return false;
    }
    
    console.log('🚀 Démarrage du timer automatique');
    timerId.current = setInterval(tick, 1000);
    setIsRunning(true);
    console.log('🎯 setInterval créé avec ID:', timerId.current);
    return true;
  }, [tick]); // FIX: Dépendance à tick
  
  // ⏸️ Fonction d'arrêt du timer
  const stopTimer = useCallback(() => {
    if (timerId.current) {
      console.log('⏹️ Arrêt du timer automatique');
      clearInterval(timerId.current);
      timerId.current = null;
      setIsRunning(false);
      return true;
    }
    return false;
  }, []);
  
  // 🔄 Fonction de reset du timer
  const resetTimer = useCallback(() => {
    stopTimer();
    setTickCount(0);
    lastUpdateTime.current = Date.now();
    console.log('🔄 Timer réinitialisé');
  }, [stopTimer]);
  
  // 🎵 Hook useEffect principal - Gestion automatique du timer
  useEffect(() => {
    const shouldRun = workout.state.isActive && !workout.state.isPaused;
    
    if (shouldRun && !isRunning) {
      // 🚀 Démarrer le timer
      startTimer();
    } else if (!shouldRun && isRunning) {
      // ⏹️ Arrêter le timer
      stopTimer();
    }
    
    // 🧹 Cleanup à la destruction du composant
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
        timerId.current = null;
      }
    };
  }, [workout.state.isActive, workout.state.isPaused, isRunning, startTimer, stopTimer]);
  
  // 🎯 Hook useEffect pour les transitions de phases
  useEffect(() => {
    if (workout.state.timeRemaining === 0 && workout.state.isActive) {
      console.log(`🔔 Transition de phase détectée: ${workout.state.status}`);
    }
  }, [workout.state.status, workout.state.timeRemaining, workout.state.isActive]);
  
  // 📊 Statistiques du timer (utile pour debugging)
  const timerStats = {
    tickCount,
    isRunning,
    timerId: !!timerId.current,
    workoutActive: workout.state.isActive,
    workoutPaused: workout.state.isPaused,
    timeRemaining: workout.state.timeRemaining
  };
  
  // 🎯 Interface publique du hook
  return {
    // 📊 État du timer
    isRunning,
    tickCount,
    
    // 🎮 Contrôles manuels (pour tests ou cas spéciaux)
    controls: {
      start: startTimer,
      stop: stopTimer,
      reset: resetTimer,
      forcetick: tick
    },
    
    // 📈 Statistiques et debug
    stats: timerStats,
    
    // 🔧 Utilitaires
    utils: {
      getTimerId: () => timerId.current,
      getElapsedTime: () => Date.now() - lastUpdateTime.current,
      isHealthy: () => isRunning === (workout.state.isActive && !workout.state.isPaused)
    }
  };
};

/**
 * 🚀 Hook composé useWorkoutWithAutoTimer - La solution complète !
 * Clean Code: "Compose methods to tell a story"
 */
export const useWorkoutWithAutoTimer = () => {
  // 🎯 Import du hook workout de base
  const workout = useWorkout();
  
  // ⏰ Ajout du timer automatique
  const timer = useWorkoutTimer(workout);
  
  // 🎵 Actions enrichies avec contrôle du timer
  const enhancedActions = {
    ...workout.actions,
    
    // 🚀 Start avec timer automatique
    startWorkout: () => {
      const result = workout.actions.startWorkout();
      if (result.success) {
        console.log('🚀 Workout + Timer automatique démarrés');
      }
      return result;
    },
    
    // ⏹️ Stop avec arrêt du timer
    stopWorkout: () => {
      timer.controls.stop();
      workout.actions.stopWorkout();
      console.log('⏹️ Workout + Timer arrêtés');
    },
    
    // 🔄 Reset complet
    resetWorkout: () => {
      timer.controls.reset();
      workout.actions.resetWorkout();
      console.log('🔄 Workout + Timer réinitialisés');
    }
  };
  
  return {
    ...workout,
    timer,
    actions: enhancedActions
  };
};

// 🔄 Import du hook useWorkout (pour éviter la dépendance circulaire)
import { useWorkout } from './useWorkout.js';

export default useWorkoutTimer;