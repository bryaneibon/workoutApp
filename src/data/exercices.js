// src/data/exercises.js
// 🏗️ WA-005.1: Extraction des données d'exercices
// Référence Clean Code: "Separate concerns - data should be isolated"

/**
 * @typedef {Object} Exercise
 * @property {string} id - Identifiant unique
 * @property {string} name - Nom de l'exercice
 * @property {string} muscleGroup - Groupe musculaire principal
 * @property {string[]} secondaryMuscles - Muscles secondaires
 * @property {string} difficulty - Niveau de difficulté
 * @property {string[]} instructions - Instructions étape par étape
 * @property {Object} images - URLs des images
 * @property {number} defaultDuration - Durée par défaut en secondes
 */

/**
 * Base de données d'exercices statiques
 * Clean Code: "Functions should do one thing" - Chaque exercice a une responsabilité claire
 */
export const EXERCISES_DATABASE = {
  'push-up': {
    id: 'push-up',
    name: 'Pompes',
    muscleGroup: 'Pectoraux',
    secondaryMuscles: ['Triceps', 'Épaules'],
    difficulty: 'débutant',
    instructions: [
      'Position planche, mains écartées largeur épaules',
      'Descendre en gardant le corps droit',
      'Remonter en poussant fort'
    ],
    images: { start: '🤲', end: '💪' },
    defaultDuration: 30
  },
  'squat': {
    id: 'squat',
    name: 'Squats',
    muscleGroup: 'Jambes',
    secondaryMuscles: ['Fessiers', 'Mollets'],
    difficulty: 'débutant',
    instructions: [
      'Pieds écartés largeur des hanches',
      'Descendre comme pour s\'asseoir',
      'Remonter en poussant sur les talons'
    ],
    images: { start: '🧍', end: '🤸' },
    defaultDuration: 45
  },
  'plank': {
    id: 'plank',
    name: 'Planche',
    muscleGroup: 'Abdominaux',
    secondaryMuscles: ['Dos', 'Épaules'],
    difficulty: 'intermédiaire',
    instructions: [
      'Position sur les avant-bras',
      'Corps parfaitement droit',
      'Contracter les abdominaux'
    ],
    images: { start: '🏃', end: '🏃' },
    defaultDuration: 60
  },
  'jumping-jacks': {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    muscleGroup: 'Cardio',
    secondaryMuscles: ['Jambes', 'Épaules'],
    difficulty: 'débutant',
    instructions: [
      'Position debout, pieds joints',
      'Sauter en écartant bras et jambes',
      'Revenir à la position initiale'
    ],
    images: { start: '🧍', end: '🤸' },
    defaultDuration: 30
  }
};

/**
 * Fonction utilitaire pour récupérer un exercice par ID
 * Clean Code: "Use intention-revealing names"
 */
export const getExerciseById = (id) => {
  return EXERCISES_DATABASE[id] || null;
};

/**
 * Fonction utilitaire pour récupérer exercices par groupe musculaire
 * Pragmatic Programmer: "DRY - Don't Repeat Yourself"
 */
export const getExercisesByMuscleGroup = (muscleGroup) => {
  return Object.values(EXERCISES_DATABASE).filter(
    exercise => exercise.muscleGroup.toLowerCase() === muscleGroup.toLowerCase()
  );
};

/**
 * Fonction utilitaire pour récupérer exercices par difficulté
 */
export const getExercisesByDifficulty = (difficulty) => {
  return Object.values(EXERCISES_DATABASE).filter(
    exercise => exercise.difficulty === difficulty
  );
};

/**
 * Fonction utilitaire pour valider un exercice
 */
export const validateExercise = (exercise) => {
  return exercise.id && 
         exercise.name && 
         exercise.muscleGroup && 
         exercise.defaultDuration > 0;
};