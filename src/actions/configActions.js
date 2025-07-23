// src/actions/configActions.js
// 🏗️ WA-007: Actions pour la configuration du workout
// Référence Clean Code: "Functions should do one thing and do it well"

import { CONFIG_ACTIONS } from '../reducers/configReducer';

/**
 * 🎯 Actions de base pour la configuration
 * Pragmatic Programmer: "DRY - Don't Repeat Yourself"
 */

/**
 * Action pour définir le temps de travail
 * @param {number} seconds - Temps en secondes
 */
export const setWorkTimeAction = (seconds) => {
  if (typeof seconds !== 'number' || seconds < 0) {
    throw new Error('Le temps de travail doit être un nombre positif');
  }

  return {
    type: CONFIG_ACTIONS.SET_WORK_TIME,
    payload: seconds,
    meta: {
      timestamp: new Date().toISOString(),
      action: 'set_work_time'
    }
  };
};

/**
 * Action pour définir le temps de repos
 * @param {number} seconds - Temps en secondes
 */
export const setRestTimeAction = (seconds) => {
  if (typeof seconds !== 'number' || seconds < 0) {
    throw new Error('Le temps de repos doit être un nombre positif');
  }

  return {
    type: CONFIG_ACTIONS.SET_REST_TIME,
    payload: seconds,
    meta: {
      timestamp: new Date().toISOString(),
      action: 'set_rest_time'
    }
  };
};

/**
 * Action pour définir le temps de préparation
 * @param {number} seconds - Temps en secondes
 */
export const setPrepTimeAction = (seconds) => ({
  type: CONFIG_ACTIONS.SET_PREP_TIME,
  payload: seconds,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'set_prep_time'
  }
});

/**
 * Action pour définir le nombre de rounds
 * @param {number} rounds - Nombre de rounds
 */
export const setRoundsAction = (rounds) => {
  if (typeof rounds !== 'number' || rounds < 1) {
    throw new Error('Le nombre de rounds doit être au moins 1');
  }

  return {
    type: CONFIG_ACTIONS.SET_ROUNDS,
    payload: rounds,
    meta: {
      timestamp: new Date().toISOString(),
      action: 'set_rounds'
    }
  };
};

/**
 * Action pour ajouter un exercice
 * @param {string} exerciseId - ID de l'exercice
 */
export const addExerciseAction = (exerciseId) => {
  if (!exerciseId || typeof exerciseId !== 'string') {
    throw new Error('ID d\'exercice requis');
  }

  return {
    type: CONFIG_ACTIONS.ADD_EXERCISE,
    payload: { exerciseId },
    meta: {
      timestamp: new Date().toISOString(),
      action: 'add_exercise',
      exerciseId
    }
  };
};

/**
 * Action pour supprimer un exercice
 * @param {string} exerciseId - ID de l'exercice
 */
export const removeExerciseAction = (exerciseId) => ({
  type: CONFIG_ACTIONS.REMOVE_EXERCISE,
  payload: { exerciseId },
  meta: {
    timestamp: new Date().toISOString(),
    action: 'remove_exercise',
    exerciseId
  }
});

/**
 * Action pour réorganiser les exercices
 * @param {number} fromIndex - Index source
 * @param {number} toIndex - Index destination
 */
export const reorderExercisesAction = (fromIndex, toIndex) => ({
  type: CONFIG_ACTIONS.REORDER_EXERCISES,
  payload: { fromIndex, toIndex },
  meta: {
    timestamp: new Date().toISOString(),
    action: 'reorder_exercises',
    move: `${fromIndex} → ${toIndex}`
  }
});

/**
 * Action pour définir la difficulté
 * @param {string} difficulty - Niveau de difficulté
 */
export const setDifficultyAction = (difficulty) => {
  const validDifficulties = ['débutant', 'intermédiaire', 'avancé'];
  
  if (!validDifficulties.includes(difficulty)) {
    throw new Error(`Difficulté invalide. Doit être: ${validDifficulties.join(', ')}`);
  }

  return {
    type: CONFIG_ACTIONS.SET_DIFFICULTY,
    payload: { difficulty },
    meta: {
      timestamp: new Date().toISOString(),
      action: 'set_difficulty'
    }
  };
};

/**
 * Action pour définir le nom de la configuration
 * @param {string} name - Nom du workout
 */
export const setConfigNameAction = (name) => ({
  type: CONFIG_ACTIONS.SET_CONFIG_NAME,
  payload: { name },
  meta: {
    timestamp: new Date().toISOString(),
    action: 'set_config_name'
  }
});

/**
 * Action pour définir la description
 * @param {string} description - Description du workout
 */
export const setConfigDescriptionAction = (description) => ({
  type: CONFIG_ACTIONS.SET_CONFIG_DESCRIPTION,
  payload: { description },
  meta: {
    timestamp: new Date().toISOString(),
    action: 'set_config_description'
  }
});

/**
 * Action pour charger un preset
 * @param {Object} preset - Plan de workout à charger
 */
export const loadPresetAction = (preset) => {
  if (!preset || typeof preset !== 'object') {
    throw new Error('Preset de workout requis');
  }

  return {
    type: CONFIG_ACTIONS.LOAD_PRESET,
    payload: { preset },
    meta: {
      timestamp: new Date().toISOString(),
      action: 'load_preset',
      presetId: preset.id
    }
  };
};

/**
 * Action pour remettre à zéro la configuration
 */
export const resetConfigAction = () => ({
  type: CONFIG_ACTIONS.RESET_CONFIG,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'reset_config'
  }
});

/**
 * Action pour valider la configuration
 */
export const validateConfigAction = () => ({
  type: CONFIG_ACTIONS.VALIDATE_CONFIG,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'validate_config'
  }
});

/**
 * 🎯 Actions composées pour des opérations complexes
 * Clean Code: "Compose methods to tell a story"
 */

/**
 * Action composée pour ajuster le timing rapidement
 * @param {Object} timing - Objet avec workTime, restTime, prepTime
 */
export const setBulkTimingAction = (timing) => {
  return [
    setWorkTimeAction(timing.workTime),
    setRestTimeAction(timing.restTime),
    setPrepTimeAction(timing.prepTime)
  ];
};

/**
 * Action composée pour ajouter plusieurs exercices
 * @param {Array} exerciseIds - Liste des IDs d'exercices
 */
export const addMultipleExercisesAction = (exerciseIds) => {
  if (!Array.isArray(exerciseIds)) {
    throw new Error('Liste d\'exercices requise');
  }

  return exerciseIds.map(id => addExerciseAction(id));
};

/**
 * Action composée pour créer un workout rapide
 * @param {Object} quickConfig - Configuration rapide
 */
export const createQuickWorkoutAction = (quickConfig) => {
  const actions = [];
  
  if (quickConfig.name) {
    actions.push(setConfigNameAction(quickConfig.name));
  }
  
  if (quickConfig.difficulty) {
    actions.push(setDifficultyAction(quickConfig.difficulty));
  }
  
  if (quickConfig.timing) {
    actions.push(...setBulkTimingAction(quickConfig.timing));
  }
  
  if (quickConfig.rounds) {
    actions.push(setRoundsAction(quickConfig.rounds));
  }
  
  if (quickConfig.exercises) {
    actions.push(...addMultipleExercisesAction(quickConfig.exercises));
  }
  
  actions.push(validateConfigAction());
  
  return actions;
};

/**
 * 🏭 Factory pour les actions de configuration
 * Clean Code: "Use polymorphism instead of switch statements"
 */
export const ConfigActionFactory = {
  timing: {
    work: setWorkTimeAction,
    rest: setRestTimeAction,
    prep: setPrepTimeAction,
    bulk: setBulkTimingAction
  },
  
  structure: {
    rounds: setRoundsAction,
    difficulty: setDifficultyAction
  },
  
  exercises: {
    add: addExerciseAction,
    remove: removeExerciseAction,
    reorder: reorderExercisesAction,
    addMultiple: addMultipleExercisesAction
  },
  
  metadata: {
    name: setConfigNameAction,
    description: setConfigDescriptionAction
  },
  
  workflow: {
    preset: loadPresetAction,
    reset: resetConfigAction,
    validate: validateConfigAction,
    quick: createQuickWorkoutAction
  }
};

/**
 * 🎯 Actions avec presets communs
 * Pragmatic Programmer: "Parameterize from the outside"
 */

/**
 * Presets de timing populaires
 */
export const TIMING_PRESETS = {
  beginner: { workTime: 30, restTime: 30, prepTime: 10 },
  intermediate: { workTime: 45, restTime: 15, prepTime: 10 },
  advanced: { workTime: 60, restTime: 10, prepTime: 5 },
  hiit: { workTime: 20, restTime: 10, prepTime: 5 },
  endurance: { workTime: 90, restTime: 30, prepTime: 15 }
};

/**
 * Action pour appliquer un preset de timing
 * @param {string} presetName - Nom du preset
 */
export const applyTimingPresetAction = (presetName) => {
  const preset = TIMING_PRESETS[presetName];
  
  if (!preset) {
    throw new Error(`Preset de timing inconnu: ${presetName}`);
  }
  
  return setBulkTimingAction(preset);
};

/**
 * 📊 Actions avec analytics
 * Clean Code: "Separate concerns"
 */

/**
 * Action avec logging pour changement de configuration
 * @param {string} configType - Type de configuration modifiée
 * @param {any} oldValue - Ancienne valeur
 * @param {any} newValue - Nouvelle valeur
 */
export const logConfigChangeAction = (configType, oldValue, newValue) => {
  console.log(`🔧 Configuration ${configType}: ${oldValue} → ${newValue}`);
  
  return {
    type: 'LOG_CONFIG_CHANGE',
    payload: { configType, oldValue, newValue },
    meta: {
      timestamp: new Date().toISOString(),
      action: 'log_config_change'
    }
  };
};