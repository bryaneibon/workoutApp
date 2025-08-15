// src/constants/workoutStates.js
// 🏗️ WA-005.1: Extraction des constantes d'état
// Référence Pragmatic Programmer: "Use enums to document state"

/**
 * États possibles du workout
 * Clean Code: "Use meaningful names"
 */
export const WORKOUT_STATUS = {
  IDLE: 'idle',
  PREPARING: 'preparing', 
  WORKING: 'working',
  RESTING: 'resting',
  PAUSED: 'paused',
  COMPLETED: 'completed'
};

/**
 * Types d'actions pour le reducer
 * Pragmatic Programmer: "Use meaningful names"
 */
export const WORKOUT_ACTIONS = {
  LOAD_WORKOUT: 'LOAD_WORKOUT',
  START_WORKOUT: 'START_WORKOUT',
  PAUSE_WORKOUT: 'PAUSE_WORKOUT',
  RESUME_WORKOUT: 'RESUME_WORKOUT', 
  STOP_WORKOUT: 'STOP_WORKOUT',
  NEXT_EXERCISE: 'NEXT_EXERCISE',
  NEXT_ROUND: 'NEXT_ROUND',
  UPDATE_TIMER: 'UPDATE_TIMER',
  COMPLETE_WORKOUT: 'COMPLETE_WORKOUT',
  RESET_WORKOUT: 'RESET_WORKOUT'
};

/**
 * Vues de l'application
 * Clean Code: "Use intention-revealing names"
 */
export const APP_VIEWS = {
  HOME: 'home',
  WORKOUT_CONFIG: 'workout-config',
  WORKOUT_ACTIVE: 'workout-active', 
  WORKOUT_ACTIVE_V2: 'workout-active-V2', 
  WORKOUT_SUMMARY: 'workout-summary',
  TEST_COMPONENTS: 'test-components'
};

/**
 * Configuration des timers par défaut
 * Pragmatic Programmer: "Parameterize from the outside"
 */
export const DEFAULT_TIMERS = {
  PREP_TIME: 10,      // secondes de préparation
  WORK_TIME: 30,      // secondes de travail  
  REST_TIME: 30,      // secondes de repos
  MIN_WORK_TIME: 5,   // minimum travail
  MAX_WORK_TIME: 300, // maximum travail (5min)
  MIN_REST_TIME: 5,   // minimum repos
  MAX_REST_TIME: 180  // maximum repos (3min)
};

/**
 * Messages d'état pour l'interface utilisateur
 * Clean Code: "Use meaningful names"
 */
export const UI_MESSAGES = {
  [WORKOUT_STATUS.IDLE]: 'Prêt à commencer',
  [WORKOUT_STATUS.PREPARING]: 'Préparez-vous !',
  [WORKOUT_STATUS.WORKING]: 'C\'est parti !',
  [WORKOUT_STATUS.RESTING]: 'Récupération',
  [WORKOUT_STATUS.PAUSED]: 'En pause',
  [WORKOUT_STATUS.COMPLETED]: 'Bravo, terminé !'
};

/**
 * Couleurs associées aux états
 * Clean Code: "Make meaningful distinctions"
 */
export const STATUS_COLORS = {
  [WORKOUT_STATUS.IDLE]: '#6c757d',
  [WORKOUT_STATUS.PREPARING]: '#ffc107',
  [WORKOUT_STATUS.WORKING]: '#28a745',
  [WORKOUT_STATUS.RESTING]: '#17a2b8',
  [WORKOUT_STATUS.PAUSED]: '#fd7e14',
  [WORKOUT_STATUS.COMPLETED]: '#6f42c1'
};

/**
 * Fonction utilitaire pour vérifier si le workout est actif
 */
export const isWorkoutActive = (status) => {
  return [
    WORKOUT_STATUS.PREPARING,
    WORKOUT_STATUS.WORKING,
    WORKOUT_STATUS.RESTING
  ].includes(status);
};

/**
 * Fonction utilitaire pour vérifier si le workout peut être contrôlé
 */
export const isWorkoutControllable = (status) => {
  return status !== WORKOUT_STATUS.IDLE && status !== WORKOUT_STATUS.COMPLETED;
};