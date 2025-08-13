// src/data/workoutPresets.js
// 🏗️ WA-013.1: Presets de configuration pour tests
// Référence Pragmatic Programmer: "Use meaningful test data"

import { DEFAULT_TIMERS } from '../constants/workoutStates';

/**
 * 🎯 Presets de workout pour configuration rapide
 * Clean Code: "Use intention-revealing names"
 */
export const WORKOUT_PRESETS = {
  
  // 🔰 Preset débutant
  'beginner-full-body': {
    id: 'beginner-full-body',
    name: 'Débutant - Corps Complet',
    description: 'Workout parfait pour débuter avec des exercices de base',
    difficulty: 'débutant',
    category: 'full-body',
    timing: {
      workTime: 20, // 20 secondes de travail
      restTime: 40, // 40 secondes de repos
      prepTime: 10, // 10 secondes de préparation
      rounds: 2    // 2 tours
    },
    exercises: [
      'jumping-jacks',
      'push-ups',
      'squats'
    ],
    tags: ['débutant', 'cardio', 'force'],
    estimatedCalories: 80,
    totalDuration: 6 // minutes
  },

  // 🏃‍♀️ Preset cardio
  'cardio-blast': {
    id: 'cardio-blast',
    name: 'Cardio Blast',
    description: 'Séance cardio intensive pour brûler des calories',
    difficulty: 'intermédiaire',
    category: 'cardio',
    timing: {
      workTime: 30, // 30 secondes de travail
      restTime: 15, // 15 secondes de repos
      prepTime: 5,  // 5 secondes de préparation
      rounds: 3     // 3 tours
    },
    exercises: [
      'jumping-jacks',
      'high-knees',
      'burpees',
      'mountain-climbers'
    ],
    tags: ['cardio', 'hiit', 'brûle-graisse'],
    estimatedCalories: 150,
    totalDuration: 9 // minutes
  },

  // 💪 Preset force
  'strength-builder': {
    id: 'strength-builder',
    name: 'Renforcement Musculaire',
    description: 'Développement de la force avec exercices au poids du corps',
    difficulty: 'intermédiaire',
    category: 'strength',
    timing: {
      workTime: 45, // 45 secondes de travail
      restTime: 30, // 30 secondes de repos
      prepTime: 10, // 10 secondes de préparation
      rounds: 3     // 3 tours
    },
    exercises: [
      'push-ups',
      'squats',
      'lunges',
      'plank',
      'glute-bridges'
    ],
    tags: ['force', 'musculation', 'tonification'],
    estimatedCalories: 120,
    totalDuration: 15 // minutes
  },

  // 🔥 Preset avancé
  'hiit-extreme': {
    id: 'hiit-extreme',
    name: 'HIIT Extrême',
    description: 'Entraînement haute intensité pour athlètes confirmés',
    difficulty: 'avancé',
    category: 'hiit',
    timing: {
      workTime: 40, // 40 secondes de travail
      restTime: 10, // 10 secondes de repos seulement !
      prepTime: 15, // 15 secondes de préparation
      rounds: 4     // 4 tours intenses
    },
    exercises: [
      'burpees',
      'mountain-climbers',
      'jumping-jacks',
      'high-knees',
      'push-ups',
      'squats'
    ],
    tags: ['hiit', 'intense', 'cardio', 'force'],
    estimatedCalories: 250,
    totalDuration: 18 // minutes
  },

  // 🧘‍♀️ Preset récupération
  'recovery-flow': {
    id: 'recovery-flow',
    name: 'Récupération Active',
    description: 'Séance douce pour la récupération et la mobilité',
    difficulty: 'débutant',
    category: 'recovery',
    timing: {
      workTime: 60, // 60 secondes - mouvements lents
      restTime: 20, // 20 secondes de transition
      prepTime: 10, // 10 secondes de préparation
      rounds: 2     // 2 tours tranquilles
    },
    exercises: [
      'plank',
      'glute-bridges',
      'lunges' // Mouvement lent et contrôlé
    ],
    tags: ['récupération', 'mobilité', 'étirements'],
    estimatedCalories: 40,
    totalDuration: 8 // minutes
  },

  // ⚡ Preset express
  'quick-burst': {
    id: 'quick-burst',
    name: 'Express 5 min',
    description: 'Workout rapide quand on manque de temps',
    difficulty: 'intermédiaire',
    category: 'express',
    timing: {
      workTime: 25, // 25 secondes de travail
      restTime: 10, // 10 secondes de repos
      prepTime: 5,  // 5 secondes de préparation
      rounds: 2     // 2 tours seulement
    },
    exercises: [
      'burpees',
      'mountain-climbers',
      'jumping-jacks'
    ],
    tags: ['express', 'rapide', 'efficace'],
    estimatedCalories: 60,
    totalDuration: 5 // minutes
  }

};

/**
 * 🏷️ Catégories de presets pour l'interface
 */
export const PRESET_CATEGORIES = {
  'full-body': {
    name: 'Corps Complet',
    icon: '🏋️‍♀️',
    description: 'Exercices pour tout le corps'
  },
  'cardio': {
    name: 'Cardio',
    icon: '🏃‍♀️',
    description: 'Amélioration cardiovasculaire'
  },
  'strength': {
    name: 'Force',
    icon: '💪',
    description: 'Renforcement musculaire'
  },
  'hiit': {
    name: 'HIIT',
    icon: '🔥',
    description: 'Haute intensité'
  },
  'recovery': {
    name: 'Récupération',
    icon: '🧘‍♀️',
    description: 'Récupération active'
  },
  'express': {
    name: 'Express',
    icon: '⚡',
    description: 'Workouts rapides'
  }
};

/**
 * 🎚️ Niveaux de difficulté
 */
export const DIFFICULTY_LEVELS = {
  'débutant': {
    name: 'Débutant',
    icon: '🔰',
    color: 'green',
    description: 'Parfait pour commencer',
    recommendedWorkTime: '15-30s',
    recommendedRestTime: '30-60s'
  },
  'intermédiaire': {
    name: 'Intermédiaire',
    icon: '🎯',
    color: 'orange', 
    description: 'Pour progresser',
    recommendedWorkTime: '30-45s',
    recommendedRestTime: '15-30s'
  },
  'avancé': {
    name: 'Avancé',
    icon: '🔥',
    color: 'red',
    description: 'Challenge intense',
    recommendedWorkTime: '40-60s',
    recommendedRestTime: '10-20s'
  }
};

/**
 * 🔍 Fonctions utilitaires pour les presets
 * Clean Code: "Functions should do one thing"
 */

/**
 * Récupère tous les presets d'une catégorie
 * @param {string} category - Catégorie recherchée
 * @returns {Object[]} Liste des presets de la catégorie
 */
export const getPresetsByCategory = (category) => {
  return Object.values(WORKOUT_PRESETS).filter(preset => preset.category === category);
};

/**
 * Récupère tous les presets d'un niveau de difficulté
 * @param {string} difficulty - Niveau de difficulté
 * @returns {Object[]} Liste des presets du niveau
 */
export const getPresetsByDifficulty = (difficulty) => {
  return Object.values(WORKOUT_PRESETS).filter(preset => preset.difficulty === difficulty);
};

/**
 * Récupère un preset par son ID
 * @param {string} presetId - ID du preset
 * @returns {Object|null} Preset trouvé ou null
 */
export const getPresetById = (presetId) => {
  return WORKOUT_PRESETS[presetId] || null;
};

/**
 * Calcule la durée réelle d'un preset
 * @param {Object} preset - Preset à analyser
 * @returns {number} Durée en minutes
 */
export const calculatePresetDuration = (preset) => {
  const { exercises, timing } = preset;
  const { workTime, restTime, prepTime, rounds } = timing;
  
  const totalExerciseTime = exercises.length * workTime * rounds;
  const totalRestTime = exercises.length * restTime * rounds;  
  const totalPrepTime = prepTime; // Une seule fois au début
  
  const totalSeconds = totalExerciseTime + totalRestTime + totalPrepTime;
  return Math.ceil(totalSeconds / 60);
};

/**
 * Valide qu'un preset est bien formé
 * @param {Object} preset - Preset à valider
 * @returns {boolean} True si valide
 */
export const validatePreset = (preset) => {
  const requiredFields = ['id', 'name', 'timing', 'exercises'];
  const hasRequiredFields = requiredFields.every(field => preset[field]);
  
  const hasValidTiming = preset.timing && 
                        typeof preset.timing.workTime === 'number' &&
                        typeof preset.timing.restTime === 'number' &&
                        typeof preset.timing.rounds === 'number';
                        
  const hasValidExercises = Array.isArray(preset.exercises) && preset.exercises.length > 0;
  
  return hasRequiredFields && hasValidTiming && hasValidExercises;
};

// Export pour tests
export const PRESET_COUNT = Object.keys(WORKOUT_PRESETS).length;
export const CATEGORY_COUNT = Object.keys(PRESET_CATEGORIES).length;