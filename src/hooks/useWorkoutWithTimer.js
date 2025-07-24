// src/hooks/useWorkoutWithTimer.js
// 🚀 WA-009: Hook composé pour workout + timer automatique - VERSION CORRIGÉE
// Référence Clean Code: "Compose methods to tell a story"

import { useWorkout } from './useWorkout.js';
import { useWorkoutTimer } from './useWorkoutTimer.js';

/**
 * 🚀 Hook composé useWorkoutWithAutoTimer - La solution complète !
 * 
 * Ce hook combine useWorkout + useWorkoutTimer pour une expérience complète
 * avec timer automatique intégré.
 * 
 * @returns {Object} Interface complète avec workout + timer
 */
export const useWorkoutWithAutoTimer = () => {
  // 🎯 Hook workout de base
  const workout = useWorkout();
  
  // ⏰ Hook timer automatique
  const timer = useWorkoutTimer(workout);
  
  // 🎵 Actions enrichies avec contrôle du timer
  const enhancedActions = {
    ...workout.actions,
    
    // 🚀 Start avec timer automatique
    startWorkout: () => {
      const result = workout.actions.startWorkout();
      if (result.success) {
        console.log('🚀 Workout démarré - Timer automatique activé');
      }
      return result;
    },
    
    // ⏹️ Stop avec arrêt du timer
    stopWorkout: () => {
      console.log('⏹️ Arrêt du workout et du timer');
      timer.controls.stop();
      workout.actions.stopWorkout();
    },
    
    // 🔄 Reset complet
    resetWorkout: () => {
      console.log('🔄 Reset du workout et du timer');
      timer.controls.reset();
      workout.actions.resetWorkout();
    }
  };
  
  // 🎯 Interface publique enrichie
  return {
    // État du workout
    state: workout.state,
    
    // Actions enrichies
    actions: enhancedActions,
    
    // Valeurs calculées
    computed: workout.computed,
    
    // Capacités UI
    capabilities: workout.capabilities,
    
    // Timer avec toutes ses fonctionnalités
    timer,
    
    // Utilitaires combinés
    utils: {
      ...workout.utils,
      timerHealthCheck: () => {
        const health = timer.utils.isHealthy();
        console.log(`🏥 Timer health check: ${health ? '✅ OK' : '❌ Problem'}`);
        console.log(`   - Should run: ${workout.state.isActive && !workout.state.isPaused}`);
        console.log(`   - Is running: ${timer.isRunning}`);
        console.log(`   - Tick count: ${timer.tickCount}`);
        console.log(`   - Time remaining: ${workout.state.timeRemaining}s`);
        return health;
      }
    }
  };
};

export default useWorkoutWithAutoTimer;