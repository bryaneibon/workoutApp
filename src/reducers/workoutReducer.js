// src/reducers/workoutReducer.js
// 🏗️ WA-008.6: Correction du bug TimerProgress 
// Référence Clean Code: "Functions should do one thing, and do it well"

import { WORKOUT_STATUS, WORKOUT_ACTIONS } from '../constants/workoutStates';
import { EXERCISES_DATABASE } from '../data/exercices';

/**
 * 🎯 État initial du workout
 * Clean Code: "Use intention-revealing names"
 */
export const initialWorkoutState = {
  // Configuration du workout
  workoutPlan: null,
  exercises: [],

  // État de progression
  currentExerciseIndex: 0,
  currentRound: 1,
  totalRounds: 3,

  // État temporel
  timeRemaining: 0,
  totalElapsed: 0,

  // 🐛 FIX: Ajout de currentPhaseTime pour TimerProgress
  currentPhaseTime: 0, // Temps total de la phase actuelle (work/rest/prep)

  // État de contrôle
  status: WORKOUT_STATUS.IDLE,
  isActive: false,
  isPaused: false,

  // Métadonnées
  startTime: null,
  endTime: null,
  completedExercises: 0,
  totalExercises: 0,

  // Configuration timing
  workTime: 30,
  restTime: 30,
  prepTime: 10
};

/**
 * 🏗️ Reducer principal du workout
 * Clean Code: "Functions should do one thing" + "Functions should be small"
 * Pragmatic Programmer: "DRY - Don't Repeat Yourself"
 */
export const workoutReducer = (state, action) => {
  switch (action.type) {
    case WORKOUT_ACTIONS.LOAD_WORKOUT: {
      const { workoutPlan } = action.payload;
      const exercises = workoutPlan.exercises.map(id => EXERCISES_DATABASE[id]);

      return {
        ...state,
        workoutPlan,
        exercises,
        totalRounds: workoutPlan.timing.rounds,
        workTime: workoutPlan.timing.workTime,
        restTime: workoutPlan.timing.restTime,
        totalExercises: exercises.length * workoutPlan.timing.rounds,
        status: WORKOUT_STATUS.IDLE,
        // Reset des compteurs
        currentExerciseIndex: 0,
        currentRound: 1,
        completedExercises: 0,
        totalElapsed: 0,
        currentPhaseTime: 0
      };
    }

    case WORKOUT_ACTIONS.START_WORKOUT: {
      if (!state.workoutPlan) {
        console.warn('Impossible de démarrer: aucun workout chargé');
        return state;
      }

      return {
        ...state,
        status: WORKOUT_STATUS.PREPARING,
        isActive: true,
        isPaused: false,
        timeRemaining: state.prepTime,
        currentPhaseTime: state.prepTime, // 🐛 FIX: Phase de préparation
        startTime: new Date().toISOString(),
        endTime: null
      };
    }

    case WORKOUT_ACTIONS.PAUSE_WORKOUT: {
      return {
        ...state,
        isPaused: true,
        isActive: false,
        status: WORKOUT_STATUS.PAUSED
      };
    }

    case WORKOUT_ACTIONS.RESUME_WORKOUT: {
      return {
        ...state,
        isPaused: false,
        isActive: true,
        status: state.timeRemaining > 0 ? 
          (state.status === WORKOUT_STATUS.PREPARING ? WORKOUT_STATUS.PREPARING : WORKOUT_STATUS.WORKING) : 
          WORKOUT_STATUS.WORKING
      };
    }

    case WORKOUT_ACTIONS.STOP_WORKOUT: {
      return {
        ...initialWorkoutState,
        workoutPlan: state.workoutPlan,
        exercises: state.exercises,
        workTime: state.workTime,
        restTime: state.restTime,
        totalRounds: state.totalRounds,
        totalExercises: state.totalExercises
      };
    }

    case WORKOUT_ACTIONS.UPDATE_TIMER: {
        const newTimeRemaining = Math.max(0, state.timeRemaining - 1);
        const newTotalElapsed = state.totalElapsed + 1;

        if (newTimeRemaining === 0) {
            if (state.status === WORKOUT_STATUS.PREPARING) {
            return {
                ...state,
                timeRemaining: state.workTime,
                currentPhaseTime: state.workTime, // 🐛 FIX: Phase de travail
                totalElapsed: newTotalElapsed,
                status: WORKOUT_STATUS.WORKING
            };
            } else if (state.status === WORKOUT_STATUS.WORKING) {
            // ✅ Incrémenter quand on termine un exercice (timer automatique)
            return {
                ...state,
                timeRemaining: state.restTime,
                currentPhaseTime: state.restTime, // 🐛 FIX: Phase de repos
                totalElapsed: newTotalElapsed,
                status: WORKOUT_STATUS.RESTING,
                completedExercises: state.completedExercises + 1
            };
            } else if (state.status === WORKOUT_STATUS.RESTING) {
            const isLastExercise = state.currentExerciseIndex === state.exercises.length - 1;
            const isLastRound = state.currentRound === state.totalRounds;

            if (isLastExercise && isLastRound) {
                return {
                ...state,
                status: WORKOUT_STATUS.COMPLETED,
                isActive: false,
                timeRemaining: 0,
                currentPhaseTime: 0, // 🐛 FIX: Workout terminé
                totalElapsed: newTotalElapsed,
                completedExercises: state.totalExercises, // Force à 100%
                endTime: new Date().toISOString()
                };
            } else if (isLastExercise) {
                return {
                ...state,
                currentExerciseIndex: 0,
                currentRound: state.currentRound + 1,
                timeRemaining: state.workTime,
                currentPhaseTime: state.workTime, // 🐛 FIX: Nouveau round
                totalElapsed: newTotalElapsed,
                status: WORKOUT_STATUS.WORKING
                };
            } else {
                return {
                ...state,
                currentExerciseIndex: state.currentExerciseIndex + 1,
                timeRemaining: state.workTime,
                currentPhaseTime: state.workTime, // 🐛 FIX: Exercice suivant
                totalElapsed: newTotalElapsed,
                status: WORKOUT_STATUS.WORKING
                };
            }
            }
        }

        return {
            ...state,
            timeRemaining: newTimeRemaining,
            totalElapsed: newTotalElapsed
        };
    }

    case WORKOUT_ACTIONS.NEXT_EXERCISE: {
        const isLastExercise = state.currentExerciseIndex === state.exercises.length - 1;
        const isLastRound = state.currentRound === state.totalRounds;

        const newCompletedExercises = state.completedExercises + 1;

        if (isLastExercise && isLastRound) {
            return {
            ...state,
            status: WORKOUT_STATUS.COMPLETED,
            isActive: false,
            completedExercises: state.totalExercises, // Force à 100%
            currentPhaseTime: 0, // 🐛 FIX: Workout terminé
            endTime: new Date().toISOString()
            };
        } else if (isLastExercise) {
            return {
            ...state,
            currentExerciseIndex: 0,
            currentRound: state.currentRound + 1,
            timeRemaining: state.workTime,
            currentPhaseTime: state.workTime, // 🐛 FIX: Nouveau round
            status: WORKOUT_STATUS.WORKING,
            completedExercises: newCompletedExercises // ✅ Incrémenter ici aussi
            };
        } else {
            return {
            ...state,
            currentExerciseIndex: state.currentExerciseIndex + 1,
            timeRemaining: state.workTime,
            currentPhaseTime: state.workTime, // 🐛 FIX: Exercice suivant
            status: WORKOUT_STATUS.WORKING,
            completedExercises: newCompletedExercises // ✅ Incrémenter ici aussi
            };
        }
    }

    case WORKOUT_ACTIONS.RESET_WORKOUT: {
      return initialWorkoutState;
    }

    case WORKOUT_ACTIONS.COMPLETE_WORKOUT: {
      return {
        ...state,
        status: WORKOUT_STATUS.COMPLETED,
        isActive: false,
        isPaused: false,
        currentPhaseTime: 0, // 🐛 FIX: Workout terminé
        endTime: new Date().toISOString()
      };
    }

    default: {
      console.warn(`Action non reconnue: ${action.type}`);
      return state;
    }
  }
};

/**
 * 🧮 Fonctions utilitaires pour le reducer
 * Clean Code: "Use intention-revealing names"
 */

/**
 * Récupère l'exercice actuel
 */
export const getCurrentExercise = (state) => {
  if (!state.exercises.length) return null;
  return state.exercises[state.currentExerciseIndex];
};

/**
 * Calcule le pourcentage de progression
 * Pragmatic Programmer: "DRY - Don't Repeat Yourself"
 */
export const getProgressPercentage = (state) => {
  if (state.totalExercises === 0) return 0;
  return Math.round((state.completedExercises / state.totalExercises) * 100);
};

/**
 * 🐛 FIX: Nouvelle fonction pour récupérer le temps total de la phase actuelle
 * Clean Code: "Use intention-revealing names"
 */
export const getCurrentPhaseTime = (state) => {
  return state.currentPhaseTime || 0;
};

/**
 * Formate le temps en MM:SS
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Vérifie si le workout peut être démarré
 */
export const canStartWorkout = (state) => {
  return state.workoutPlan && !state.isActive && state.status === WORKOUT_STATUS.IDLE;
};

/**
 * Vérifie si le workout peut être pausé/repris
 */
export const canPauseResume = (state) => {
  return state.isActive || state.isPaused;
};