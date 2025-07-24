// src/hooks/useWorkout.js
// 🚀 WA-008: Hook useWorkout personnalisé
// Référence Clean Code: "Extract till you drop" + "Functions should do one thing"
// Référence Pragmatic Programmer: "DRY - Don't Repeat Yourself"

import { useReducer, useCallback, useMemo, useRef, useEffect } from 'react';

// Imports des reducers et actions
import {
  workoutReducer,
  initialWorkoutState,
  getCurrentExercise,
  getProgressPercentage,
  formatTime,
  canStartWorkout,
  canPauseResume,
  getCurrentPhaseTime
} from '../reducers/workoutReducer.js';

import {
  loadWorkoutAction,
  startWorkoutAction,
  pauseWorkoutAction,
  resumeWorkoutAction,
  stopWorkoutAction,
  nextExerciseAction,
  updateTimerAction,
  resetWorkoutAction,
  togglePauseAction,
  safeStartWorkoutAction,
  startWorkoutWithLogging,
  stopWorkoutWithLogging,
  ActionFactory
} from '../actions/workoutActions.js';

import { WORKOUT_PLANS } from '../data/workoutPlans.js';
import { WORKOUT_STATUS } from '../constants/workoutStates.js';

/**
 * 🎯 Hook useWorkout - Encapsulation complète de la logique workout
 * 
 * Ce hook centralise :
 * - La gestion d'état avec useReducer
 * - Les actions optimisées avec useCallback  
 * - Les valeurs calculées avec useMemo
 * - La logique métier encapsulée
 * - L'interface simple pour les composants
 * 
 * @returns {Object} Interface complète du workout
 */
export const useWorkout = () => {
  // 🧠 État principal avec useReducer
  const [workoutState, dispatch] = useReducer(workoutReducer, initialWorkoutState);
  
  // 🔗 Référence pour éviter les re-renders inutiles
  const timerId = useRef(null);

  // 🎯 Actions de base optimisées avec useCallback
  // Clean Code: "Functions should be small and do one thing"
  
  const loadWorkout = useCallback((planId) => {
    try {
      const plan = WORKOUT_PLANS[planId];
      if (!plan) throw new Error(`Plan ${planId} introuvable`);
      
      dispatch(loadWorkoutAction(plan));
      console.log(`📋 Workout chargé: ${plan.name}`);
      return { success: true, plan };
    } catch (error) {
      console.error('❌ Erreur lors du chargement:', error.message);
      return { success: false, error: error.message };
    }
  }, []);

  const startWorkout = useCallback(() => {
    try {
      dispatch(safeStartWorkoutAction(workoutState));
      dispatch(startWorkoutWithLogging(workoutState.workoutPlan));
      console.log('🚀 Workout démarré avec succès');
      return { success: true };
    } catch (error) {
      console.error('❌ Erreur lors du démarrage:', error.message);
      return { success: false, error: error.message };
    }
  }, [workoutState]);

  const pauseWorkout = useCallback(() => {
    dispatch(ActionFactory.pause());
    console.log('⏸️ Workout mis en pause');
  }, []);

  const resumeWorkout = useCallback(() => {
    dispatch(ActionFactory.resume());
    console.log('▶️ Workout repris');
  }, []);

  const stopWorkout = useCallback(() => {
    dispatch(stopWorkoutWithLogging(workoutState));
    console.log('⏹️ Workout arrêté');
  }, [workoutState]);

  const nextExercise = useCallback(() => {
    dispatch(ActionFactory.next());
    console.log('⏭️ Exercice suivant');
  }, []);

  const resetWorkout = useCallback(() => {
    dispatch(ActionFactory.reset());
    console.log('🔄 Workout réinitialisé');
  }, []);

  // 🎯 Action composée intelligente
  const togglePause = useCallback(() => {
    dispatch(togglePauseAction(workoutState.isPaused));
    console.log(`${workoutState.isPaused ? '▶️ Repris' : '⏸️ Pausé'}`);
  }, [workoutState.isPaused]);

  // ⏰ Fonction de mise à jour du timer
  const updateTimer = useCallback(() => {
    dispatch(ActionFactory.update());
  }, []);

  // 🧮 Valeurs calculées optimisées avec useMemo
  // Pragmatic Programmer: "Calculate once, use many times"
  
  const currentExercise = useMemo(() => {
    return getCurrentExercise(workoutState);
  }, [workoutState.currentExerciseIndex, workoutState.exercises]);

  const progressPercentage = useMemo(() => {
    return getProgressPercentage(workoutState);
  }, [workoutState.completedExercises, workoutState.totalExercises]);

  const currentPhaseTime = useMemo(() => {
    return getCurrentPhaseTime(workoutState);
  }, [workoutState.currentPhaseTime]);

  const formattedTimeRemaining = useMemo(() => {
    return formatTime(workoutState.timeRemaining);
  }, [workoutState.timeRemaining]);

  const formattedTotalElapsed = useMemo(() => {
    return formatTime(workoutState.totalElapsed);
  }, [workoutState.totalElapsed]);

  // 🎮 Capacités du workout (pour disable/enable les boutons)
  // 🐛 FIX: Recalculer les capacités à chaque changement d'état
  const capabilities = useMemo(() => {
    const canStart = canStartWorkout(workoutState);
    const canPauseOrResume = canPauseResume(workoutState); // 🐛 FIX: Renommé pour éviter le conflit
    
    return {
      canStart,
      canPause: canPauseOrResume && !workoutState.isPaused,
      canResume: workoutState.isPaused,
      canStop: workoutState.status !== WORKOUT_STATUS.IDLE,
      canNext: workoutState.isActive,
      canReset: true
    };
  }, [
    workoutState.workoutPlan,
    workoutState.status, 
    workoutState.isActive, 
    workoutState.isPaused
  ]); // 🐛 FIX: Dépendances explicites pour recalcul

  // 📊 Informations de statut enrichies
  const statusInfo = useMemo(() => {
    const statusMessages = {
      [WORKOUT_STATUS.IDLE]: { text: 'Prêt à commencer', color: 'slate', icon: '⭕' },
      [WORKOUT_STATUS.PREPARING]: { text: 'Préparez-vous !', color: 'yellow', icon: '⚡' },
      [WORKOUT_STATUS.WORKING]: { text: 'C\'est parti !', color: 'green', icon: '💪' },
      [WORKOUT_STATUS.RESTING]: { text: 'Récupération', color: 'blue', icon: '😴' },
      [WORKOUT_STATUS.PAUSED]: { text: 'En pause', color: 'orange', icon: '⏸️' },
      [WORKOUT_STATUS.COMPLETED]: { text: 'Bravo, terminé !', color: 'purple', icon: '🎉' }
    };
    
    return statusMessages[workoutState.status] || statusMessages[WORKOUT_STATUS.IDLE];
  }, [workoutState.status]);

  // 🎯 Interface publique du hook - Clean and Simple
  // Clean Code: "Interfaces should be easy to use correctly and hard to use incorrectly"
  
  return {
    // 📊 État du workout
    state: workoutState,
    
    // 🎯 Actions principales
    actions: {
      loadWorkout,
      startWorkout,
      pauseWorkout,
      resumeWorkout,
      stopWorkout,
      nextExercise,
      resetWorkout,
      togglePause,
      updateTimer
    },
    
    // 🧮 Valeurs calculées
    computed: {
      currentExercise,
      progressPercentage,
      currentPhaseTime,
      formattedTimeRemaining,
      formattedTotalElapsed,
      statusInfo
    },
    
    // 🎮 Capacités (pour l'UI)
    capabilities,
    
    // 🔧 Utilitaires
    utils: {
      formatTime,
      getCurrentExercise: () => getCurrentExercise(workoutState),
      getProgressPercentage: () => getProgressPercentage(workoutState)
    }
  };
};

/**
 * 🚀 Hook spécialisé pour le timer automatique (WA-009 preview)
 * Clean Code: "Single Responsibility Principle"
 */
export const useWorkoutTimer = (workout) => {
  const timerId = useRef(null);
  
  useEffect(() => {
    if (workout.state.isActive && !workout.state.isPaused) {
      timerId.current = setInterval(() => {
        workout.actions.updateTimer();
      }, 1000);
    } else {
      if (timerId.current) {
        clearInterval(timerId.current);
        timerId.current = null;
      }
    }
    
    // Cleanup à la destruction
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [workout.state.isActive, workout.state.isPaused, workout.actions.updateTimer]);
  
  return {
    isRunning: workout.state.isActive && !workout.state.isPaused,
    timerId: timerId.current
  };
};

/**
 * 🎯 Hook composé pour une utilisation complète (Timer + Workout)
 * Pragmatic Programmer: "Compose behaviors from simple parts"
 */
export const useWorkoutWithTimer = () => {
  const workout = useWorkout();
  const timer = useWorkoutTimer(workout);
  
  return {
    ...workout,
    timer
  };
};

export default useWorkout;