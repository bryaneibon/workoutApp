// src/hooks/useWorkoutWithTimer.js
// 🚀 WA-009: Hook composé pour workout + timer automatique
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

export default useWorkoutWithAutoTimer;