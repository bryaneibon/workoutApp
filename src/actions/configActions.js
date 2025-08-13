// src/actions/configActions.js - EXTENSION WA-013.1
// 🏗️ Actions complémentaires pour la configuration avancée
// Référence Clean Code: "Functions should do one thing and do it well"

import { CONFIG_ACTIONS } from '../reducers/configReducer';

// 🔄 Actions de navigation multi-étapes

/**
 * Action pour passer à l'étape suivante
 */
export const nextStepAction = () => ({
  type: CONFIG_ACTIONS.NEXT_STEP,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'next_step'
  }
});

/**
 * Action pour retourner à l'étape précédente
 */
export const previousStepAction = () => ({
  type: CONFIG_ACTIONS.PREVIOUS_STEP,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'previous_step'
  }
});

/**
 * Action pour aller directement à une étape
 * @param {number} step - Numéro de l'étape (1-3)
 */
export const goToStepAction = (step) => {
  if (typeof step !== 'number' || step < 1 || step > 3) {
    throw new Error('L\'étape doit être un nombre entre 1 et 3');
  }

  return {
    type: CONFIG_ACTIONS.GO_TO_STEP,
    payload: step,
    meta: {
      timestamp: new Date().toISOString(),
      action: 'go_to_step'
    }
  };
};

// 🗑️ Action pour supprimer un exercice

/**
 * Action pour supprimer un exercice par ID
 * @param {string} exerciseId - ID de l'exercice à supprimer
 */
export const removeExerciseAction = (exerciseId) => {
  if (!exerciseId || typeof exerciseId !== 'string') {
    throw new Error('ID d\'exercice requis pour la suppression');
  }

  return {
    type: CONFIG_ACTIONS.REMOVE_EXERCISE,
    payload: { exerciseId },
    meta: {
      timestamp: new Date().toISOString(),
      action: 'remove_exercise'
    }
  };
};

/**
 * Action pour réorganiser les exercices
 * @param {string} exerciseId - ID de l'exercice à déplacer
 * @param {number} newIndex - Nouvelle position
 */
export const reorderExerciseAction = (exerciseId, newIndex) => {
  if (!exerciseId || typeof newIndex !== 'number') {
    throw new Error('ID d\'exercice et nouvel index requis');
  }

  return {
    type: CONFIG_ACTIONS.REORDER_EXERCISES,
    payload: { exerciseId, newIndex },
    meta: {
      timestamp: new Date().toISOString(),
      action: 'reorder_exercise'
    }
  };
};

// 🎚️ Actions de configuration générale

/**
 * Action pour définir la difficulté
 * @param {string} level - Niveau de difficulté ('débutant', 'intermédiaire', 'avancé')
 */
export const setDifficultyAction = (level) => {
  const validLevels = ['débutant', 'intermédiaire', 'avancé'];
  
  if (!validLevels.includes(level)) {
    throw new Error(`Difficulté invalide. Valeurs acceptées: ${validLevels.join(', ')}`);
  }

  return {
    type: CONFIG_ACTIONS.SET_DIFFICULTY,
    payload: level,
    meta: {
      timestamp: new Date().toISOString(),
      action: 'set_difficulty'
    }
  };
};

/**
 * Action pour définir le nom de la configuration
 * @param {string} name - Nom de la configuration
 */
export const setConfigNameAction = (name) => {
  if (typeof name !== 'string') {
    throw new Error('Le nom doit être une chaîne de caractères');
  }

  return {
    type: CONFIG_ACTIONS.SET_CONFIG_NAME,
    payload: name.trim(),
    meta: {
      timestamp: new Date().toISOString(),
      action: 'set_config_name'
    }
  };
};

/**
 * Action pour définir la description de la configuration
 * @param {string} description - Description de la configuration
 */
export const setConfigDescriptionAction = (description) => {
  if (typeof description !== 'string') {
    throw new Error('La description doit être une chaîne de caractères');
  }

  return {
    type: CONFIG_ACTIONS.SET_CONFIG_DESCRIPTION,
    payload: description.trim(),
    meta: {
      timestamp: new Date().toISOString(),
      action: 'set_config_description'
    }
  };
};

// 📦 Actions de preset

/**
 * Action pour charger un preset
 * @param {Object} preset - Configuration prédéfinie
 */
export const loadPresetAction = (preset) => {
  if (!preset || typeof preset !== 'object') {
    throw new Error('Preset invalide');
  }

  const requiredFields = ['name', 'exercises', 'timing'];
  const missingFields = requiredFields.filter(field => !preset[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Champs manquants dans le preset: ${missingFields.join(', ')}`);
  }

  return {
    type: CONFIG_ACTIONS.LOAD_PRESET,
    payload: preset,
    meta: {
      timestamp: new Date().toISOString(),
      action: 'load_preset',
      presetName: preset.name
    }
  };
};

/**
 * Action pour réinitialiser la configuration
 */
export const resetConfigAction = () => ({
  type: CONFIG_ACTIONS.RESET_CONFIG,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'reset_config'
  }
});

// 🔍 Actions de validation

/**
 * Action pour déclencher une validation manuelle
 */
export const validateConfigAction = () => ({
  type: CONFIG_ACTIONS.VALIDATE_CONFIG,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'validate_config'
  }
});

/**
 * Action pour marquer la configuration comme modifiée
 */
export const markDirtyAction = () => ({
  type: CONFIG_ACTIONS.MARK_DIRTY,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'mark_dirty'
  }
});

/**
 * Action pour marquer la configuration comme sauvegardée
 */
export const markCleanAction = () => ({
  type: CONFIG_ACTIONS.MARK_CLEAN,
  meta: {
    timestamp: new Date().toISOString(),
    action: 'mark_clean'
  }
});

// 🏭 Factory pattern pour créer des actions complexes
export class ConfigActionFactory {
  
  /**
   * Crée une action de configuration complète
   * @param {Object} config - Configuration complète
   */
  static createCompleteConfig(config) {
    return {
      type: CONFIG_ACTIONS.SET_COMPLETE_CONFIG,
      payload: config,
      meta: {
        timestamp: new Date().toISOString(),
        action: 'set_complete_config',
        source: 'factory'
      }
    };
  }

  /**
   * Crée une action de sauvegarde de configuration
   * @param {Object} config - Configuration à sauvegarder
   */
  static createSaveConfig(config) {
    return {
      type: CONFIG_ACTIONS.SAVE_CONFIG,
      payload: {
        config,
        saveId: `config_${Date.now()}`,
        timestamp: new Date().toISOString()
      },
      meta: {
        timestamp: new Date().toISOString(),
        action: 'save_config',
        source: 'factory'
      }
    };
  }
}

/**
 * 🎯 Thunk-like actions pour opérations complexes
 * Pragmatic Programmer: "DRY - Don't Repeat Yourself"
 */

/**
 * Action composée pour ajouter plusieurs exercices d'un coup
 * @param {string[]} exerciseIds - Liste des IDs d'exercices
 */
export const addMultipleExercisesAction = (exerciseIds) => {
  if (!Array.isArray(exerciseIds)) {
    throw new Error('exerciseIds doit être un tableau');
  }

  return {
    type: CONFIG_ACTIONS.ADD_MULTIPLE_EXERCISES,
    payload: exerciseIds,
    meta: {
      timestamp: new Date().toISOString(),
      action: 'add_multiple_exercises',
      count: exerciseIds.length
    }
  };
};

/**
 * Action composée pour définir la configuration de timing complète
 * @param {Object} timingConfig - Configuration complète des temps
 */
export const setTimingConfigAction = (timingConfig) => {
  const { workTime, restTime, prepTime, rounds } = timingConfig;
  
  if (typeof workTime !== 'number' || typeof restTime !== 'number' || 
      typeof prepTime !== 'number' || typeof rounds !== 'number') {
    throw new Error('Tous les paramètres de timing doivent être des nombres');
  }

  return {
    type: CONFIG_ACTIONS.SET_TIMING_CONFIG,
    payload: { workTime, restTime, prepTime, rounds },
    meta: {
      timestamp: new Date().toISOString(),
      action: 'set_timing_config'
    }
  };
};