// src/hooks/useWorkoutTimer.js
// ⏰ WA-009: Hook Timer automatique avec setInterval - VERSION CORRIGÉE
// Référence Clean Code: "Functions should do one thing and do it well"

import { useEffect, useRef, useCallback, useState } from 'react';
import { WORKOUT_STATUS } from '../constants/workoutStates.js';

/**
 * 🎯 Hook useWorkoutTimer - Timer automatique intelligent
 * 
 * Ce hook gère :
 * - setInterval automatique quand le workout est actif
 * - Pause/Resume du timer selon l'état
 * - Cleanup automatique à la destruction
 * - Performance optimisée avec useCallback
 * 
 * @param {Object} workout - Instance du hook useWorkout
 * @returns {Object} Interface du timer avec contrôles
 */
export const useWorkoutTimer = (workout) => {
  // 🔗 Références pour éviter les re-renders et memory leaks
  const intervalRef = useRef(null);
  const lastTickTime = useRef(Date.now());
  
  // 📊 États locaux du timer
  const [isRunning, setIsRunning] = useState(false);
  const [tickCount, setTickCount] = useState(0);
  
  // 🎯 Fonction de tick stable - CORRIGÉE
  const tick = useCallback(() => {
    const now = Date.now();
    const delta = now - lastTickTime.current;
    
    // Protection contre les ticks trop rapides
    if (delta < 900) {
      console.warn('⚠️ Tick ignoré - trop rapide:', delta);
      return;
    }
    
    lastTickTime.current = now;
    
    setTickCount(prev => {
      const newCount = prev + 1;
      console.log(`📊 Timer tick #${newCount} - Delta: ${delta}ms`);
      return newCount;
    });
    
    // Appel de l'action updateTimer
    workout.actions.updateTimer();
  }, [workout.actions]); // Dépendance uniquement sur actions (stable grâce à useCallback dans useWorkout)
  
  // 🚀 Fonction de démarrage du timer - CORRIGÉE
  const startTimer = useCallback(() => {
    // Protection contre démarrages multiples
    if (intervalRef.current !== null) {
      console.warn('⚠️ Timer déjà actif - ID:', intervalRef.current);
      return false;
    }
    
    console.log('🚀 Démarrage du timer automatique');
    lastTickTime.current = Date.now();
    
    // Création de l'interval
    const id = setInterval(tick, 1000);
    intervalRef.current = id;
    setIsRunning(true);
    
    console.log('✅ Timer démarré avec ID:', id);
    return true;
  }, [tick]);
  
  // ⏸️ Fonction d'arrêt du timer - CORRIGÉE
  const stopTimer = useCallback(() => {
    if (intervalRef.current === null) {
      console.log('⚠️ Aucun timer à arrêter');
      return false;
    }
    
    console.log('⏹️ Arrêt du timer - ID:', intervalRef.current);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    
    return true;
  }, []);
  
  // 🔄 Fonction de reset du timer
  const resetTimer = useCallback(() => {
    stopTimer();
    setTickCount(0);
    lastTickTime.current = Date.now();
    console.log('🔄 Timer réinitialisé');
  }, [stopTimer]);
  
  // 🎵 Hook useEffect principal - Gestion automatique du timer
  useEffect(() => {
    const shouldRun = workout.state.isActive && !workout.state.isPaused;
    
    console.log(`🔍 Timer check - Should run: ${shouldRun}, Is running: ${isRunning}`);
    
    if (shouldRun && !isRunning) {
      console.log('▶️ Conditions remplies - Démarrage du timer');
      startTimer();
    } else if (!shouldRun && isRunning) {
      console.log('⏸️ Conditions non remplies - Arrêt du timer');
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
  
  // 🎯 Hook pour détecter les changements de phase
  useEffect(() => {
    if (workout.state.timeRemaining === 0 && workout.state.isActive) {
      console.log(`🔔 Fin de phase détectée: ${workout.state.status}`);
      
      // Notification sonore ou visuelle ici si nécessaire
      switch (workout.state.status) {
        case WORKOUT_STATUS.PREPARING:
          console.log('🎵 Son: Début du workout!');
          break;
        case WORKOUT_STATUS.WORKING:
          console.log('🎵 Son: Fin d\'exercice - Repos!');
          break;
        case WORKOUT_STATUS.RESTING:
          console.log('🎵 Son: Fin du repos - Prochain exercice!');
          break;
      }
    }
  }, [workout.state.timeRemaining, workout.state.status, workout.state.isActive]);
  
  // 📊 Interface publique du hook
  return {
    // 📊 État du timer
    isRunning,
    tickCount,
    
    // 🎮 Contrôles manuels (pour tests)
    controls: {
      start: startTimer,
      stop: stopTimer,
      reset: resetTimer,
      forceTickONLYFORTEST: tick // NE PAS utiliser en production
    },
    
    // 📈 Statistiques et debug
    stats: {
      tickCount,
      isRunning,
      hasInterval: intervalRef.current !== null,
      workoutActive: workout.state.isActive,
      workoutPaused: workout.state.isPaused,
      timeRemaining: workout.state.timeRemaining,
      lastTickDelta: Date.now() - lastTickTime.current
    },
    
    // 🔧 Utilitaires
    utils: {
      getIntervalId: () => intervalRef.current,
      isHealthy: () => {
        const shouldBeRunning = workout.state.isActive && !workout.state.isPaused;
        const actuallyRunning = intervalRef.current !== null;
        return shouldBeRunning === actuallyRunning;
      }
    }
  };
};

export default useWorkoutTimer;