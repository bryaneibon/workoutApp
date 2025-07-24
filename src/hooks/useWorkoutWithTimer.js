// src/hooks/useWorkoutWithTimer.js
// 🚀 WA-010: Hook composé pour workout + timer + progression automatique - COMPLET
// Référence Clean Code: "Compose methods to tell a story"

import { useWorkout } from './useWorkout.js';
import { useWorkoutTimer } from './useWorkoutTimer.js';

/**
 * 🚀 Hook composé useWorkoutWithAutoTimer - La solution complète WA-010 !
 * 
 * Ce hook combine :
 * - useWorkout (logique métier)
 * - useWorkoutTimer (timer automatique + progression)
 * - Notifications de phase intégrées
 * 
 * @returns {Object} Interface complète avec workout + timer + progression
 */
export const useWorkoutWithAutoTimer = () => {
  // 🎯 Hook workout de base
  const workout = useWorkout();
  
  // ⏰ Hook timer automatique avec progression (WA-010 Enhanced)
  const timer = useWorkoutTimer(workout);
  
  // 🎵 Actions enrichies avec contrôle du timer ET progression
  const enhancedActions = {
    ...workout.actions,
    
    // 🚀 Start avec timer automatique et progression
    startWorkout: () => {
      const result = workout.actions.startWorkout();
      if (result.success) {
        console.log('🚀 WA-010: Workout démarré - Timer + Progression automatique activés');
      }
      return result;
    },
    
    // ⏹️ Stop avec arrêt du timer et reset des notifications
    stopWorkout: () => {
      console.log('⏹️ WA-010: Arrêt du workout, timer et notifications');
      timer.controls.stop();
      timer.controls.clearNotifications();
      workout.actions.stopWorkout();
    },
    
    // 🔄 Reset complet de tout le système
    resetWorkout: () => {
      console.log('🔄 WA-010: Reset complet du système');
      timer.controls.reset();
      workout.actions.resetWorkout();
    },
    
    // 🆕 Actions spécifiques à la progression automatique
    forceNextPhase: () => {
      console.log('⏭️ WA-010: Progression forcée vers phase suivante');
      workout.actions.updateTimer(); // Force la progression
    },
    
    // 🔔 Gestion des notifications
    clearNotifications: () => {
      timer.controls.clearNotifications();
      console.log('🔔 Notifications effacées');
    }
  };
  
  // 🎯 Interface publique enrichie WA-010
  return {
    // État du workout
    state: workout.state,
    
    // Actions enrichies avec progression automatique
    actions: enhancedActions,
    
    // Valeurs calculées
    computed: workout.computed,
    
    // Capacités UI
    capabilities: workout.capabilities,
    
    // Timer avec progression automatique (WA-010)
    timer: {
      ...timer,
      // Informations spécifiques à la progression
      progression: {
        isAutoProgressing: timer.isRunning && workout.state.isActive,
        nextPhaseIn: workout.state.timeRemaining,
        currentPhase: workout.state.status,
        progressionInfo: timer.utils.getProgressionInfo()
      }
    },
    
    // Notifications de changement de phase (WA-010)
    notifications: timer.notifications,
    
    // Utilitaires combinés et enrichis
    utils: {
      ...workout.utils,
      
      // Health check complet du système
      systemHealthCheck: () => {
        const timerHealth = timer.utils.isHealthy();
        const workoutState = workout.state.status;
        const progressionActive = timer.isRunning && workout.state.isActive;
        
        console.log('🏥 WA-010 System Health Check:');
        console.log(`   - Timer health: ${timerHealth ? '✅' : '❌'}`);
        console.log(`   - Workout status: ${workoutState}`);
        console.log(`   - Auto progression: ${progressionActive ? '✅' : '❌'}`);
        console.log(`   - Time remaining: ${workout.state.timeRemaining}s`);
        console.log(`   - Notifications: ${timer.notifications.count}`);
        
        return {
          overall: timerHealth && (workoutState !== 'error'),
          timer: timerHealth,
          workout: workoutState,
          progression: progressionActive,
          notifications: timer.notifications.count
        };
      },
      
      // Diagnostic complet pour debugging
      getSystemDiagnostic: () => {
        return {
          timestamp: new Date().toISOString(),
          workout: {
            status: workout.state.status,
            isActive: workout.state.isActive,
            isPaused: workout.state.isPaused,
            timeRemaining: workout.state.timeRemaining,
            currentExercise: workout.computed.currentExercise?.name,
            progress: workout.computed.progressPercentage
          },
          timer: {
            isRunning: timer.isRunning,
            tickCount: timer.tickCount,
            hasInterval: timer.stats.hasInterval,
            lastTickDelta: timer.stats.lastTickDelta
          },
          progression: {
            autoProgressing: timer.isRunning && workout.state.isActive,
            nextPhase: timer.utils.getProgressionInfo().nextExercise,
            notificationCount: timer.notifications.count,
            lastNotification: timer.notifications.latest?.message
          }
        };
      }
    }
  };
};

export default useWorkoutWithAutoTimer;