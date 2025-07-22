// src/actions/workoutActions.js
// 🏗️ WA-006: Actions de base pour le workout
// Référence Clean Code: "Functions should do one thing and do it well"

import { WORKOUT_ACTIONS } from '../constants/workoutStates';

/**
 * 🎯 Actions de base du workout
 * Pragmatic Programmer: "DRY - Don't Repeat Yourself"
 * 
 * Ces fonctions encapsulent la logique métier et retournent des actions
 * pour le reducer. Elles peuvent être réutilisées partout dans l'app.
 */

/**
 * Action pour charger un plan d'entraînement
 * @param {Object} workoutPlan - Le plan à charger
 * @returns {Object} Action pour le reducer
 */
export const loadWorkoutAction = (workoutPlan) => {
  if (!workoutPlan) {
    throw new Error('Plan d\'entraînement requis pour charger le workout');
  }

  if (!workoutPlan.exercises || workoutPlan.exercises.length === 0) {
    throw new Error('Le plan d\'entraînement doit contenir au moins un exercice');
  }

  return {
    type: WORKOUT_ACTIONS.LOAD_WORKOUT,
    payload: { workoutPlan },
    meta: {
      timestamp: new Date().toISOString(),
      action: 'load_workout'
    }
  };
};

/**
 * Action pour démarrer un workout
 * Clean Code: "Use intention-revealing names"
 */
export const startWorkoutAction = () => ({
  type: WORKOUT_ACTIONS.START_WORKOUT,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'start_workout'
  }
});

/**
 * Action pour mettre en pause un workout
 */
export const pauseWorkoutAction = () => ({
  type: WORKOUT_ACTIONS.PAUSE_WORKOUT,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'pause_workout'
  }
});

/**
 * Action pour reprendre un workout en pause
 */
export const resumeWorkoutAction = () => ({
  type: WORKOUT_ACTIONS.RESUME_WORKOUT,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'resume_workout'
  }
});

/**
 * Action pour arrêter complètement un workout
 */
export const stopWorkoutAction = () => ({
  type: WORKOUT_ACTIONS.STOP_WORKOUT,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'stop_workout'
  }
});

/**
 * Action pour passer à l'exercice suivant
 */
export const nextExerciseAction = () => ({
  type: WORKOUT_ACTIONS.NEXT_EXERCISE,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'next_exercise'
  }
});

/**
 * Action pour mettre à jour le timer (-1 seconde)
 */
export const updateTimerAction = () => ({
  type: WORKOUT_ACTIONS.UPDATE_TIMER,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'update_timer'
  }
});

/**
 * Action pour remettre à zéro le workout
 */
export const resetWorkoutAction = () => ({
  type: WORKOUT_ACTIONS.RESET_WORKOUT,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'reset_workout'
  }
});

/**
 * Action pour compléter le workout
 */
export const completeWorkoutAction = () => ({
  type: WORKOUT_ACTIONS.COMPLETE_WORKOUT,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'complete_workout'
  }
});

/**
 * 🎯 Actions composées pour des opérations complexes
 * Clean Code: "Compose methods to tell a story"
 */

/**
 * Action composée pour toggle pause/resume
 * @param {boolean} isPaused - État actuel de pause
 */
export const togglePauseAction = (isPaused) => {
  return isPaused ? resumeWorkoutAction() : pauseWorkoutAction();
};

/**
 * Action composée pour passer au prochain élément (exercice ou round)
 * @param {Object} currentState - État actuel du workout
 */
export const advanceWorkoutAction = (currentState) => {
  // Logique métier encapsulée
  const isLastExercise = currentState.currentExerciseIndex === currentState.exercises.length - 1;
  const isLastRound = currentState.currentRound === currentState.totalRounds;
  
  if (isLastExercise && isLastRound) {
    return completeWorkoutAction();
  } else {
    return nextExerciseAction();
  }
};

/**
 * 🛡️ Actions avec validation
 * Pragmatic Programmer: "Use assertions to prevent the impossible"
 */

/**
 * Action sécurisée pour démarrer un workout
 * @param {Object} workoutState - État actuel du workout
 */
export const safeStartWorkoutAction = (workoutState) => {
  if (!workoutState.workoutPlan) {
    throw new Error('Impossible de démarrer: aucun plan chargé');
  }

  if (workoutState.isActive) {
    throw new Error('Impossible de démarrer: workout déjà actif');
  }

  if (workoutState.status === 'completed') {
    throw new Error('Impossible de démarrer: workout déjà terminé');
  }

  return startWorkoutAction();
};

/**
 * Action sécurisée pour mettre en pause
 * @param {Object} workoutState - État actuel du workout
 */
export const safePauseWorkoutAction = (workoutState) => {
  if (!workoutState.isActive) {
    throw new Error('Impossible de mettre en pause: workout non actif');
  }

  if (workoutState.isPaused) {
    throw new Error('Workout déjà en pause');
  }

  return pauseWorkoutAction();
};

/**
 * Action sécurisée pour reprendre
 * @param {Object} workoutState - État actuel du workout
 */
export const safeResumeWorkoutAction = (workoutState) => {
  if (!workoutState.isPaused) {
    throw new Error('Impossible de reprendre: workout non en pause');
  }

  return resumeWorkoutAction();
};

/**
 * 📊 Actions avec analytics/logging
 * Clean Code: "Separate concerns"
 */

/**
 * Action avec logging pour démarrage
 * @param {Object} workoutPlan - Plan à démarrer
 */
export const startWorkoutWithLogging = (workoutPlan) => {
  console.log(`🚀 Démarrage du workout: ${workoutPlan.name}`);
  console.log(`📊 Exercices: ${workoutPlan.exercises.length}, Rounds: ${workoutPlan.timing.rounds}`);
  
  return startWorkoutAction();
};

/**
 * Action avec logging pour arrêt
 * @param {Object} workoutState - État actuel
 */
export const stopWorkoutWithLogging = (workoutState) => {
  const progressPercentage = Math.round((workoutState.completedExercises / workoutState.totalExercises) * 100);
  
  console.log(`⏹️ Arrêt du workout`);
  console.log(`📈 Progression: ${progressPercentage}% (${workoutState.completedExercises}/${workoutState.totalExercises})`);
  console.log(`⏱️ Temps écoulé: ${Math.floor(workoutState.totalElapsed / 60)}:${(workoutState.totalElapsed % 60).toString().padStart(2, '0')}`);
  
  return stopWorkoutAction();
};

/**
 * 🎯 Créateur d'actions batch
 * Pragmatic Programmer: "Automate the workflow"
 */

/**
 * Créé plusieurs actions en une fois (pour des opérations complexes)
 * @param {Array} actionConfigs - Configurations des actions
 */
export const createBatchActions = (actionConfigs) => {
  return actionConfigs.map(config => {
    switch (config.type) {
      case 'load':
        return loadWorkoutAction(config.payload);
      case 'start':
        return startWorkoutAction();
      case 'pause':
        return pauseWorkoutAction();
      case 'resume':
        return resumeWorkoutAction();
      case 'stop':
        return stopWorkoutAction();
      case 'next':
        return nextExerciseAction();
      case 'reset':
        return resetWorkoutAction();
      default:
        throw new Error(`Type d'action non reconnu: ${config.type}`);
    }
  });
};

/**
 * 🔄 Action factory pattern
 * Clean Code: "Use polymorphism instead of switch statements"
 */
export const ActionFactory = {
  load: loadWorkoutAction,
  start: startWorkoutAction,
  pause: pauseWorkoutAction,
  resume: resumeWorkoutAction,
  stop: stopWorkoutAction,
  next: nextExerciseAction,
  update: updateTimerAction,
  reset: resetWorkoutAction,
  complete: completeWorkoutAction,
  
  // Actions composées
  toggle: togglePauseAction,
  advance: advanceWorkoutAction,
  
  // Actions sécurisées
  safeStart: safeStartWorkoutAction,
  safePause: safePauseWorkoutAction,
  safeResume: safeResumeWorkoutAction,
  
  // Actions avec logging
  startWithLog: startWorkoutWithLogging,
  stopWithLog: stopWorkoutWithLogging
};