// src/data/workoutPlans.js  
// 🏗️ WA-005.1: Extraction des plans d'entraînement
// Référence Pragmatic Programmer: "Good design is easier to change than bad design"

/**
 * @typedef {Object} WorkoutPlan
 * @property {string} id - Identifiant du plan
 * @property {string} name - Nom du plan
 * @property {string} description - Description du plan
 * @property {string} difficulty - Niveau requis
 * @property {number} estimatedDuration - Durée estimée en minutes
 * @property {string[]} exercises - Liste des IDs d'exercices
 * @property {Object} timing - Configuration temporelle
 */

/**
 * Plans d'entraînement prédéfinis
 * Clean Code: "Use meaningful names"
 */
export const WORKOUT_PLANS = {
  'beginner-full-body': {
    id: 'beginner-full-body',
    name: 'Corps Complet Débutant',
    description: 'Entraînement complet pour débuter en douceur',
    difficulty: 'débutant',
    estimatedDuration: 15,
    exercises: ['push-up', 'squat', 'plank'],
    timing: { workTime: 30, restTime: 30, rounds: 3 }
  },
  'cardio-burn': {
    id: 'cardio-burn',
    name: 'Cardio Intense',
    description: 'Brûlez des calories rapidement',
    difficulty: 'intermédiaire',
    estimatedDuration: 20,
    exercises: ['jumping-jacks', 'squat', 'push-up'],
    timing: { workTime: 45, restTime: 15, rounds: 4 }
  }
};

/**
 * Configuration par défaut pour les workouts personnalisés
 * Clean Code: "Constants should be well-named"
 */
export const DEFAULT_WORKOUT_CONFIG = {
  workTime: 30,        // secondes
  restTime: 30,        // secondes
  prepTime: 10,        // secondes de préparation
  rounds: 3,           // nombre de tours
  exercises: [],       // exercices sélectionnés
  difficulty: 'débutant'
};

/**
 * Fonction utilitaire pour récupérer un plan par ID
 * Clean Code: "Use intention-revealing names"
 */
export const getWorkoutPlanById = (id) => {
  return WORKOUT_PLANS[id] || null;
};

/**
 * Fonction utilitaire pour récupérer plans par difficulté
 */
export const getWorkoutPlansByDifficulty = (difficulty) => {
  return Object.values(WORKOUT_PLANS).filter(
    plan => plan.difficulty === difficulty
  );
};

/**
 * Fonction utilitaire pour calculer la durée totale d'un plan
 * Pragmatic Programmer: "DRY - Don't Repeat Yourself"
 */
export const calculateWorkoutDuration = (plan) => {
  if (!plan) return 0;
  
  const { exercises, timing } = plan;
  const totalTime = exercises.length * (timing.workTime + timing.restTime) * timing.rounds;
  
  return Math.ceil(totalTime / 60); // en minutes
};

/**
 * Fonction utilitaire pour valider un plan
 */
export const validateWorkoutPlan = (plan) => {
  return plan.id && 
         plan.name && 
         plan.exercises && 
         plan.exercises.length > 0 &&
         plan.timing &&
         plan.timing.workTime > 0 &&
         plan.timing.restTime >= 0 &&
         plan.timing.rounds > 0;
};