// src/reducers/configReducer.js
// 🏗️ WA-007: Reducer pour la configuration du workout
// Référence Clean Code: "Separate concerns - configuration vs execution"

import { DEFAULT_TIMERS } from '../constants/workoutStates';
import { EXERCISES_DATABASE, validateExercise } from '../data/exercices';
import { validateWorkoutPlan } from '../data/workoutPlans';

/**
 * Actions pour la configuration
 * Pragmatic Programmer: "Use meaningful names"
 */
export const CONFIG_ACTIONS = {
  SET_WORK_TIME: 'SET_WORK_TIME',
  SET_REST_TIME: 'SET_REST_TIME', 
  SET_PREP_TIME: 'SET_PREP_TIME',
  SET_ROUNDS: 'SET_ROUNDS',
  ADD_EXERCISE: 'ADD_EXERCISE',
  REMOVE_EXERCISE: 'REMOVE_EXERCISE',
  REORDER_EXERCISES: 'REORDER_EXERCISES',
  SET_DIFFICULTY: 'SET_DIFFICULTY',
  LOAD_PRESET: 'LOAD_PRESET',
  RESET_CONFIG: 'RESET_CONFIG',
  VALIDATE_CONFIG: 'VALIDATE_CONFIG',
  SET_CONFIG_NAME: 'SET_CONFIG_NAME',
  SET_CONFIG_DESCRIPTION: 'SET_CONFIG_DESCRIPTION'
};

/**
 * État initial de la configuration
 * Clean Code: "Use intention-revealing names"
 */
export const initialConfigState = {
  // Timing configuration
  workTime: DEFAULT_TIMERS.WORK_TIME,
  restTime: DEFAULT_TIMERS.REST_TIME,
  prepTime: DEFAULT_TIMERS.PREP_TIME,
  
  // Workout structure
  rounds: 3,
  exercises: [], // Array of exercise IDs
  difficulty: 'débutant',
  
  // Metadata
  name: '',
  description: '',
  estimatedDuration: 0, // calculé automatiquement
  
  // Validation state
  isValid: false,
  errors: [],
  warnings: [],
  
  // UI state
  currentStep: 1, // Étape de configuration (1: timing, 2: exercices, 3: validation)
  isDirty: false // True si des modifications non sauvegardées
};

/**
 * 🧮 Fonctions utilitaires pour la configuration
 * Clean Code: "Extract till you drop"
 */

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
 * Vérifie si deux exercices consécutifs ciblent le même groupe musculaire
 */
const checkMuscleGroupSequence = (exercises) => {
  const warnings = [];
  
  for (let i = 0; i < exercises.length - 1; i++) {
    const current = EXERCISES_DATABASE[exercises[i]];
    const next = EXERCISES_DATABASE[exercises[i + 1]];
    
    if (current && next && current.muscleGroup === next.muscleGroup) {
      warnings.push(`Exercices ${i + 1} et ${i + 2} ciblent le même groupe musculaire (${current.muscleGroup})`);
    }
  }
  
  return warnings;
};

/**
 * 🏗️ Reducer principal de configuration
 * Clean Code: "Functions should do one thing"
 */
export const configReducer = (state, action) => {
  switch (action.type) {
    case CONFIG_ACTIONS.SET_WORK_TIME: {
      const workTime = Math.max(DEFAULT_TIMERS.MIN_WORK_TIME, 
                               Math.min(DEFAULT_TIMERS.MAX_WORK_TIME, action.payload));
      
      const newState = {
        ...state,
        workTime,
        isDirty: true,
        estimatedDuration: calculateEstimatedDuration(state.exercises, workTime, state.restTime, state.rounds)
      };
      
      const validation = validateConfiguration(newState);
      return { ...newState, ...validation };
    }

    case CONFIG_ACTIONS.SET_REST_TIME: {
      const restTime = Math.max(DEFAULT_TIMERS.MIN_REST_TIME,
                               Math.min(DEFAULT_TIMERS.MAX_REST_TIME, action.payload));
      
      const newState = {
        ...state,
        restTime,
        isDirty: true,
        estimatedDuration: calculateEstimatedDuration(state.exercises, state.workTime, restTime, state.rounds)
      };
      
      const validation = validateConfiguration(newState);
      return { ...newState, ...validation };
    }

    case CONFIG_ACTIONS.SET_PREP_TIME: {
      const prepTime = Math.max(5, Math.min(30, action.payload));
      
      return {
        ...state,
        prepTime,
        isDirty: true
      };
    }

    case CONFIG_ACTIONS.SET_ROUNDS: {
      const rounds = Math.max(1, Math.min(10, action.payload));
      
      const newState = {
        ...state,
        rounds,
        isDirty: true,
        estimatedDuration: calculateEstimatedDuration(state.exercises, state.workTime, state.restTime, rounds)
      };
      
      const validation = validateConfiguration(newState);
      return { ...newState, ...validation };
    }

    case CONFIG_ACTIONS.ADD_EXERCISE: {
      const { exerciseId } = action.payload;
      
      // Éviter les doublons
      if (state.exercises.includes(exerciseId)) {
        return {
          ...state,
          warnings: [...state.warnings, `Exercice ${EXERCISES_DATABASE[exerciseId]?.name} déjà ajouté`]
        };
      }
      
      const newExercises = [...state.exercises, exerciseId];
      const muscleGroupWarnings = checkMuscleGroupSequence(newExercises);
      
      const newState = {
        ...state,
        exercises: newExercises,
        isDirty: true,
        estimatedDuration: calculateEstimatedDuration(newExercises, state.workTime, state.restTime, state.rounds)
      };
      
      const validation = validateConfiguration(newState);
      return { 
        ...newState, 
        ...validation,
        warnings: [...validation.warnings, ...muscleGroupWarnings]
      };
    }

    case CONFIG_ACTIONS.REMOVE_EXERCISE: {
      const { exerciseId } = action.payload;
      const newExercises = state.exercises.filter(id => id !== exerciseId);
      
      const newState = {
        ...state,
        exercises: newExercises,
        isDirty: true,
        estimatedDuration: calculateEstimatedDuration(newExercises, state.workTime, state.restTime, state.rounds)
      };
      
      const validation = validateConfiguration(newState);
      return { ...newState, ...validation };
    }

    case CONFIG_ACTIONS.REORDER_EXERCISES: {
      const { fromIndex, toIndex } = action.payload;
      const newExercises = [...state.exercises];
      const [movedExercise] = newExercises.splice(fromIndex, 1);
      newExercises.splice(toIndex, 0, movedExercise);
      
      const muscleGroupWarnings = checkMuscleGroupSequence(newExercises);
      
      const newState = {
        ...state,
        exercises: newExercises,
        isDirty: true
      };
      
      const validation = validateConfiguration(newState);
      return { 
        ...newState, 
        ...validation,
        warnings: [...validation.warnings, ...muscleGroupWarnings]
      };
    }

    case CONFIG_ACTIONS.SET_DIFFICULTY: {
      const { difficulty } = action.payload;
      
      return {
        ...state,
        difficulty,
        isDirty: true
      };
    }

    case CONFIG_ACTIONS.SET_CONFIG_NAME: {
      const { name } = action.payload;
      
      return {
        ...state,
        name: name.slice(0, 50), // Limite à 50 caractères
        isDirty: true
      };
    }

    case CONFIG_ACTIONS.SET_CONFIG_DESCRIPTION: {
      const { description } = action.payload;
      
      return {
        ...state,
        description: description.slice(0, 200), // Limite à 200 caractères
        isDirty: true
      };
    }

    case CONFIG_ACTIONS.LOAD_PRESET: {
      const { preset } = action.payload;
      
      if (!validateWorkoutPlan(preset)) {
        return {
          ...state,
          errors: ['Preset de workout invalide']
        };
      }
      
      const newState = {
        ...state,
        workTime: preset.timing.workTime,
        restTime: preset.timing.restTime,
        rounds: preset.timing.rounds,
        exercises: [...preset.exercises],
        difficulty: preset.difficulty,
        name: preset.name,
        description: preset.description,
        isDirty: false,
        estimatedDuration: calculateEstimatedDuration(
          preset.exercises, 
          preset.timing.workTime, 
          preset.timing.restTime, 
          preset.timing.rounds
        )
      };
      
      const validation = validateConfiguration(newState);
      return { ...newState, ...validation };
    }

    case CONFIG_ACTIONS.RESET_CONFIG: {
      return {
        ...initialConfigState,
        isDirty: false
      };
    }

    case CONFIG_ACTIONS.VALIDATE_CONFIG: {
      const validation = validateConfiguration(state);
      return { ...state, ...validation };
    }

    default: {
      console.warn(`Action de configuration non reconnue: ${action.type}`);
      return state;
    }
  }
};

/**
 * 🎯 Fonctions utilitaires exportées
 * Clean Code: "Use intention-revealing names"
 */

/**
 * Convertit une configuration en plan de workout
 */
export const configToWorkoutPlan = (configState) => {
  return {
    id: `custom-${Date.now()}`,
    name: configState.name || 'Workout Personnalisé',
    description: configState.description || 'Créé avec Kaizen-Forge',
    difficulty: configState.difficulty,
    estimatedDuration: configState.estimatedDuration,
    exercises: configState.exercises,
    timing: {
      workTime: configState.workTime,
      restTime: configState.restTime,
      prepTime: configState.prepTime,
      rounds: configState.rounds
    }
  };
};

/**
 * Vérifie si la configuration peut être sauvegardée
 */
export const canSaveConfig = (configState) => {
  return configState.isValid && configState.isDirty;
};

/**
 * Récupère un résumé de la configuration
 */
export const getConfigSummary = (configState) => {
  return {
    totalExercises: configState.exercises.length,
    totalRounds: configState.rounds,
    estimatedDuration: configState.estimatedDuration,
    muscleGroups: [...new Set(configState.exercises.map(id => EXERCISES_DATABASE[id]?.muscleGroup).filter(Boolean))],
    difficulty: configState.difficulty,
    isValid: configState.isValid,
    errorCount: configState.errors.length,
    warningCount: configState.warnings.length
  };
};