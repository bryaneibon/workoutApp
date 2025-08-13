// src/reducers/configReducer.js - EXTENSION WA-013.1
// 🏗️ Extension du configReducer pour les nouvelles actions
// Référence Clean Code: "Functions should do one thing"

import { DEFAULT_TIMERS } from '../constants/workoutStates';
import { EXERCISES_DATABASE, validateExercise } from '../data/exercices';
import { validateWorkoutPlan } from '../data/workoutPlans';
/**
 * Actions étendues pour la configuration
 * Clean Code: "Use meaningful names"
 */
export const CONFIG_ACTIONS = {
  // Actions de timing
  SET_WORK_TIME: 'SET_WORK_TIME',
  SET_REST_TIME: 'SET_REST_TIME', 
  SET_PREP_TIME: 'SET_PREP_TIME',
  SET_ROUNDS: 'SET_ROUNDS',
  SET_TIMING_CONFIG: 'SET_TIMING_CONFIG', // ⭐ NOUVEAU

  // Actions d'exercices
  ADD_EXERCISE: 'ADD_EXERCISE',
  REMOVE_EXERCISE: 'REMOVE_EXERCISE',
  REORDER_EXERCISES: 'REORDER_EXERCISES',
  ADD_MULTIPLE_EXERCISES: 'ADD_MULTIPLE_EXERCISES', // ⭐ NOUVEAU

  // Actions de configuration
  SET_DIFFICULTY: 'SET_DIFFICULTY',
  SET_CONFIG_NAME: 'SET_CONFIG_NAME',
  SET_CONFIG_DESCRIPTION: 'SET_CONFIG_DESCRIPTION',

  // Actions de preset
  LOAD_PRESET: 'LOAD_PRESET',
  RESET_CONFIG: 'RESET_CONFIG',

  // Actions de navigation - ⭐ NOUVEAU
  NEXT_STEP: 'NEXT_STEP',
  PREVIOUS_STEP: 'PREVIOUS_STEP',
  GO_TO_STEP: 'GO_TO_STEP',

  // Actions de validation
  VALIDATE_CONFIG: 'VALIDATE_CONFIG',
  MARK_DIRTY: 'MARK_DIRTY', // ⭐ NOUVEAU
  MARK_CLEAN: 'MARK_CLEAN', // ⭐ NOUVEAU

  // Actions complexes
  SET_COMPLETE_CONFIG: 'SET_COMPLETE_CONFIG', // ⭐ NOUVEAU
  SAVE_CONFIG: 'SAVE_CONFIG' // ⭐ NOUVEAU
};

/**
 * Calcule la durée estimée d'un workout
 */
const calculateEstimatedDuration = (exercises, workTime, restTime, rounds) => {
  if (exercises.length === 0) return 0;
  
  const totalExerciseTime = exercises.length * workTime * rounds;
  const totalRestTime = exercises.length * restTime * rounds;
  const totalSeconds = totalExerciseTime + totalRestTime;
  
  return Math.ceil(totalSeconds / 60); // en minutes
};

/**
 * Valide la configuration complète
 */
const validateConfiguration = (state) => {
  const errors = [];
  const warnings = [];
  
  // Validation du timing
  if (state.workTime < DEFAULT_TIMERS.MIN_WORK_TIME) {
    errors.push(`Temps de travail minimum: ${DEFAULT_TIMERS.MIN_WORK_TIME}s`);
  }
  if (state.workTime > DEFAULT_TIMERS.MAX_WORK_TIME) {
    errors.push(`Temps de travail maximum: ${DEFAULT_TIMERS.MAX_WORK_TIME}s`);
  }
  if (state.restTime < DEFAULT_TIMERS.MIN_REST_TIME) {
    errors.push(`Temps de repos minimum: ${DEFAULT_TIMERS.MIN_REST_TIME}s`);
  }
  if (state.restTime > DEFAULT_TIMERS.MAX_REST_TIME) {
    errors.push(`Temps de repos maximum: ${DEFAULT_TIMERS.MAX_REST_TIME}s`);
  }
  
  // Validation des exercices
  if (state.exercises.length === 0) {
    errors.push('Au moins un exercice est requis');
  }
  if (state.exercises.length > 10) {
    warnings.push('Plus de 10 exercices peuvent rendre le workout très long');
  }
  
  // Validation des rounds
  if (state.rounds < 1) {
    errors.push('Au moins 1 round est requis');
  }
  if (state.rounds > 10) {
    warnings.push('Plus de 10 rounds peuvent être très difficiles');
  }
  
  // Validation de la durée
  if (state.estimatedDuration > 60) {
    warnings.push('Workout de plus d\'1 heure détecté');
  }
  
  // Validation des exercices individuels
  state.exercises.forEach((exerciseId, index) => {
    const exercise = EXERCISES_DATABASE[exerciseId];
    if (!exercise) {
      errors.push(`Exercice ${index + 1} introuvable`);
    } else if (!validateExercise(exercise)) {
      errors.push(`Exercice ${exercise.name} invalide`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * 🏗️ Extension du reducer principal - nouvelles actions
 * Clean Code: "Functions should do one thing" + "Functions should be small"
 */
export const configReducer = (state, action) => {
  switch (action.type) {
    
    // 🔢 Actions de timing existantes (inchangées)
    case CONFIG_ACTIONS.SET_WORK_TIME: {
      const workTime = Math.max(DEFAULT_TIMERS.MIN_WORK_TIME, Math.min(action.payload, DEFAULT_TIMERS.MAX_WORK_TIME));
      const newState = {
        ...state,
        workTime,
        isDirty: true
      };
      
      return {
        ...newState,
        estimatedDuration: calculateEstimatedDuration(newState.exercises, workTime, newState.restTime, newState.rounds),
        ...validateConfiguration(newState)
      };
    }

    case CONFIG_ACTIONS.SET_REST_TIME: {
      const restTime = Math.max(DEFAULT_TIMERS.MIN_REST_TIME, Math.min(action.payload, DEFAULT_TIMERS.MAX_REST_TIME));
      const newState = {
        ...state,
        restTime,
        isDirty: true
      };
      
      return {
        ...newState,
        estimatedDuration: calculateEstimatedDuration(newState.exercises, newState.workTime, restTime, newState.rounds),
        ...validateConfiguration(newState)
      };
    }

    // ⭐ NOUVELLE ACTION: Configuration de timing complète
    case CONFIG_ACTIONS.SET_TIMING_CONFIG: {
      const { workTime, restTime, prepTime, rounds } = action.payload;
      
      const newState = {
        ...state,
        workTime: Math.max(DEFAULT_TIMERS.MIN_WORK_TIME, Math.min(workTime, DEFAULT_TIMERS.MAX_WORK_TIME)),
        restTime: Math.max(DEFAULT_TIMERS.MIN_REST_TIME, Math.min(restTime, DEFAULT_TIMERS.MAX_REST_TIME)),
        prepTime: Math.max(DEFAULT_TIMERS.MIN_PREP_TIME, Math.min(prepTime, DEFAULT_TIMERS.MAX_PREP_TIME)),
        rounds: Math.max(1, Math.min(rounds, 10)),
        isDirty: true
      };
      
      return {
        ...newState,
        estimatedDuration: calculateEstimatedDuration(newState.exercises, newState.workTime, newState.restTime, newState.rounds),
        ...validateConfiguration(newState)
      };
    }

    // 🏋️‍♀️ Actions d'exercices étendues
    case CONFIG_ACTIONS.ADD_EXERCISE: {
      const { exerciseId } = action.payload;
      
      // Éviter les doublons
      if (state.exercises.includes(exerciseId)) {
        console.warn(`Exercice ${exerciseId} déjà présent`);
        return state;
      }
      
      const newExercises = [...state.exercises, exerciseId];
      const newState = {
        ...state,
        exercises: newExercises,
        isDirty: true
      };
      
      return {
        ...newState,
        estimatedDuration: calculateEstimatedDuration(newExercises, newState.workTime, newState.restTime, newState.rounds),
        ...validateConfiguration(newState)
      };
    }

    case CONFIG_ACTIONS.REMOVE_EXERCISE: {
      const { exerciseId } = action.payload;
      const newExercises = state.exercises.filter(id => id !== exerciseId);
      
      const newState = {
        ...state,
        exercises: newExercises,
        isDirty: true
      };
      
      return {
        ...newState,
        estimatedDuration: calculateEstimatedDuration(newExercises, newState.workTime, newState.restTime, newState.rounds),
        ...validateConfiguration(newState)
      };
    }

    // ⭐ NOUVELLE ACTION: Ajouter plusieurs exercices
    case CONFIG_ACTIONS.ADD_MULTIPLE_EXERCISES: {
      const exerciseIds = action.payload;
      
      // Éviter les doublons avec les exercices existants
      const uniqueExercises = exerciseIds.filter(id => !state.exercises.includes(id));
      const newExercises = [...state.exercises, ...uniqueExercises];
      
      const newState = {
        ...state,
        exercises: newExercises,
        isDirty: true
      };
      
      console.log(`➕ ${uniqueExercises.length} exercices ajoutés`);
      
      return {
        ...newState,
        estimatedDuration: calculateEstimatedDuration(newExercises, newState.workTime, newState.restTime, newState.rounds),
        ...validateConfiguration(newState)
      };
    }

    case CONFIG_ACTIONS.REORDER_EXERCISES: {
      const { exerciseId, newIndex } = action.payload;
      const currentIndex = state.exercises.indexOf(exerciseId);
      
      if (currentIndex === -1 || newIndex < 0 || newIndex >= state.exercises.length) {
        console.warn('Réorganisation impossible: index invalide');
        return state;
      }
      
      const newExercises = [...state.exercises];
      newExercises.splice(currentIndex, 1);
      newExercises.splice(newIndex, 0, exerciseId);
      
      return {
        ...state,
        exercises: newExercises,
        isDirty: true
      };
    }

    // 🎚️ Actions de configuration générale
    case CONFIG_ACTIONS.SET_DIFFICULTY: {
      const newState = {
        ...state,
        difficulty: action.payload,
        isDirty: true
      };
      
      return {
        ...newState,
        ...validateConfiguration(newState)
      };
    }

    case CONFIG_ACTIONS.SET_CONFIG_NAME: {
      return {
        ...state,
        name: action.payload,
        isDirty: true
      };
    }

    case CONFIG_ACTIONS.SET_CONFIG_DESCRIPTION: {
      return {
        ...state,
        description: action.payload,
        isDirty: true
      };
    }

    // 🧭 ⭐ NOUVELLES ACTIONS: Navigation multi-étapes
    case CONFIG_ACTIONS.NEXT_STEP: {
      const currentStep = state.currentStep;
      const maxStep = 3;
      
      // Validation avant progression
      if (currentStep === 1 && !isStep1Valid(state)) {
        console.warn('❌ Impossible de passer à l\'étape 2: configuration timing incomplète');
        return {
          ...state,
          errors: [...state.errors, 'Configuration timing requise pour continuer']
        };
      }
      
      if (currentStep === 2 && state.exercises.length === 0) {
        console.warn('❌ Impossible de passer à l\'étape 3: aucun exercice sélectionné');
        return {
          ...state,
          errors: [...state.errors, 'Au moins un exercice requis pour continuer']
        };
      }
      
      const nextStep = Math.min(currentStep + 1, maxStep);
      console.log(`➡️ Navigation: étape ${currentStep} → ${nextStep}`);
      
      return {
        ...state,
        currentStep: nextStep,
        errors: [] // Clear les erreurs lors de navigation réussie
      };
    }

    case CONFIG_ACTIONS.PREVIOUS_STEP: {
      const currentStep = state.currentStep;
      const minStep = 1;
      
      const previousStep = Math.max(currentStep - 1, minStep);
      console.log(`⬅️ Navigation: étape ${currentStep} → ${previousStep}`);
      
      return {
        ...state,
        currentStep: previousStep,
        errors: [] // Clear les erreurs lors de navigation
      };
    }

    case CONFIG_ACTIONS.GO_TO_STEP: {
      const targetStep = action.payload;
      
      // Validation conditionnelle selon la step cible
      if (targetStep > state.currentStep) {
        if ((targetStep >= 2 && !isStep1Valid(state)) || 
            (targetStep >= 3 && state.exercises.length === 0)) {
          console.warn(`❌ Impossible d'aller à l'étape ${targetStep}: prérequis non remplis`);
          return state;
        }
      }
      
      console.log(`🎯 Navigation directe: étape ${state.currentStep} → ${targetStep}`);
      
      return {
        ...state,
        currentStep: targetStep,
        errors: []
      };
    }

    // 📦 Actions de preset et reset
    case CONFIG_ACTIONS.LOAD_PRESET: {
      const preset = action.payload;
      
        if (!validateWorkoutPlan(preset)) {
            return {
                ...state,
                errors: ['Preset de workout invalide']
        };
      }
      
      console.log(`📦 Chargement preset: ${preset.name}`);
      
      const newState = {
        ...state,
        name: preset.name,
        description: preset.description || '',
        workTime: preset.timing.workTime,
        restTime: preset.timing.restTime,
        prepTime: preset.timing.prepTime || DEFAULT_TIMERS.PREP_TIME,
        rounds: preset.timing.rounds,
        exercises: [...preset.exercises],
        difficulty: preset.difficulty || 'débutant',
        isDirty: false, // Preset chargé = état propre
        currentStep: 1 // Retour à l'étape 1 pour révision
      };
      
      return {
        ...newState,
        estimatedDuration: calculateEstimatedDuration(newState.exercises, newState.workTime, newState.restTime, newState.rounds),
        ...validateConfiguration(newState)
      };
    }

    case CONFIG_ACTIONS.RESET_CONFIG: {
      console.log('🔄 Réinitialisation configuration');
      return {
        ...initialConfigState,
        // Conserver l'étape actuelle pour l'UX
        currentStep: state.currentStep
      };
    }

    // 🔍 ⭐ NOUVELLES ACTIONS: Gestion dirty state
    case CONFIG_ACTIONS.MARK_DIRTY: {
      return {
        ...state,
        isDirty: true
      };
    }

    case CONFIG_ACTIONS.MARK_CLEAN: {
      return {
        ...state,
        isDirty: false
      };
    }

    // 🏭 ⭐ NOUVELLES ACTIONS: Actions complexes
    case CONFIG_ACTIONS.SET_COMPLETE_CONFIG: {
      const config = action.payload;
      
      console.log('🏗️ Configuration complète appliquée');
      
      const newState = {
        ...state,
        ...config,
        isDirty: true
      };
      
      return {
        ...newState,
        estimatedDuration: calculateEstimatedDuration(newState.exercises, newState.workTime, newState.restTime, newState.rounds),
        ...validateConfiguration(newState)
      };
    }

    case CONFIG_ACTIONS.SAVE_CONFIG: {
      const { config, saveId, timestamp } = action.payload;
      
      console.log(`💾 Configuration sauvegardée: ID ${saveId}`);
      
      return {
        ...state,
        isDirty: false,
        lastSaved: timestamp,
        saveId
      };
    }

    // Action de validation manuelle
    case CONFIG_ACTIONS.VALIDATE_CONFIG: {
      console.log('🔍 Validation manuelle déclenchée');
      return {
        ...state,
        ...validateConfiguration(state)
      };
    }

    default:
      console.warn(`Action inconnue: ${action.type}`);
      return state;
  }
};

/**
 * 🧮 Fonctions utilitaires étendues
 * Clean Code: "Extract till you drop" + "Functions do one thing"
 */

/**
 * Vérifie si l'étape 1 (timing) est valide
 */
const isStep1Valid = (state) => {
  return state.workTime > 0 && 
         state.restTime >= 0 && 
         state.prepTime >= 0 && 
         state.rounds > 0;
};

/**
 * Vérifie si l'étape 2 (exercices) est valide
 */
const isStep2Valid = (state) => {
  return state.exercises.length > 0 && 
         state.exercises.every(id => EXERCISES_DATABASE[id]);
};

/**
 * Vérifie si l'étape 3 (validation) est complète
 */
const isStep3Valid = (state) => {
  return state.name.trim().length > 0 && 
         state.isValid && 
         state.errors.length === 0;
};

/**
 * État initial étendu avec nouveaux champs
 */
export const initialConfigState = {
  // Timing configuration
  workTime: DEFAULT_TIMERS.WORK_TIME,
  restTime: DEFAULT_TIMERS.REST_TIME,
  prepTime: DEFAULT_TIMERS.PREP_TIME,
  
  // Workout structure
  rounds: 3,
  exercises: [],
  difficulty: 'débutant',
  
  // Metadata
  name: '',
  description: '',
  estimatedDuration: 0,
  
  // Validation state
  isValid: false,
  errors: [],
  warnings: [],
  
  // ⭐ NOUVEAUX CHAMPS: UI state étendu
  currentStep: 1, // Étape de configuration (1: timing, 2: exercices, 3: validation)
  isDirty: false, // True si des modifications non sauvegardées
  lastSaved: null, // Timestamp de dernière sauvegarde
  saveId: null, // ID de sauvegarde
  
  // ⭐ NOUVEAUX CHAMPS: Métadonnées de step
  stepValidation: {
    step1Valid: false,
    step2Valid: false,
    step3Valid: false
  }
};