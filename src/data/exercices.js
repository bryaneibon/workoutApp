// src/data/exercises.js
// 🎨 WA-REDESIGN-005: Base de données d'exercices avec icônes Lucide premium
// Référence Clean Code: "Separate concerns - data should be isolated"
// Référence Pragmatic Programmer: "DRY - Don't Repeat Yourself"

/**
 * @typedef {Object} Exercise
 * @property {string} id - Identifiant unique
 * @property {string} name - Nom de l'exercice
 * @property {string} muscleGroup - Groupe musculaire principal
 * @property {string[]} secondaryMuscles - Muscles secondaires
 * @property {string} difficulty - Niveau de difficulté
 * @property {string[]} instructions - Instructions étape par étape
 * @property {Object} images - Icônes Lucide pour start/end
 * @property {number} defaultDuration - Durée par défaut en secondes
 */

/**
 * Base de données d'exercices avec icônes Lucide premium
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
    images: { 
      start: 'ArrowDown', // Position haute
      end: 'ArrowUp'     // Position basse puis remontée
    },
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
    images: { 
      start: 'User',      // Position debout
      end: 'ChevronDown' // Position accroupie
    },
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
    images: { 
      start: 'Minus',     // Position planche
      end: 'Minus'       // Maintien position
    },
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
    images: { 
      start: 'User',        // Position fermée
      end: 'UserCheck'     // Position ouverte
    },
    defaultDuration: 30
  },
  'burpees': {
    id: 'burpees',
    name: 'Burpees',
    muscleGroup: 'Full Body',
    secondaryMuscles: ['Cardio', 'Pectoraux', 'Jambes', 'Épaules'],
    difficulty: 'avancé',
    instructions: [
      'Position debout, descendre en squat',
      'Faire une pompe (optionnel)',
      'Ramener les pieds vers les mains et sauter'
    ],
    images: { 
      start: 'User',       // Position debout
      end: 'Rocket'       // Explosion/saut
    },
    defaultDuration: 45
  },
  'shadow-boxing': {
    id: 'shadow-boxing',
    name: 'Shadow Boxing',
    muscleGroup: 'Cardio',
    secondaryMuscles: ['Épaules', 'Bras', 'Abdominaux'],
    difficulty: 'intermédiaire',
    instructions: [
      'Position de garde, alterner vos coups de poing',
      'Garder les pieds en mouvement',
      'Contracter les abdominaux à chaque coup'
    ],
    images: { 
      start: 'Shield',     // Position de garde
      end: 'Zap'          // Coup de poing
    },
    defaultDuration: 40
  },
  'explosive-push-ups': {
    id: 'explosive-push-ups',
    name: 'Pompes Explosives',
    muscleGroup: 'Pectoraux',
    secondaryMuscles: ['Triceps', 'Épaules', 'Abdominaux'],
    difficulty: 'avancé',
    instructions: [
      'Position planche classique',
      'Descendre en contrôle',
      'Remonter en explosant pour décoller les mains',
      'Atterrir en douceur et recommencer'
    ],
    images: { 
      start: 'ArrowDown',  // Position haute
      end: 'Sparkles'     // Explosion
    },
    defaultDuration: 35
  },
  'mountain-climbers': {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    muscleGroup: 'Cardio',
    secondaryMuscles: ['Abdominaux', 'Épaules', 'Jambes'],
    difficulty: 'intermédiaire',
    instructions: [
      'Position planche haute',
      'Alterner rapidement les genoux vers la poitrine',
      'Maintenir les hanches basses'
    ],
    images: { 
      start: 'Mountain',   // Position planche
      end: 'Activity'     // Mouvement rapide
    },
    defaultDuration: 30
  },
  'lunges': {
    id: 'lunges',
    name: 'Fentes',
    muscleGroup: 'Jambes',
    secondaryMuscles: ['Fessiers', 'Quadriceps'],
    difficulty: 'débutant',
    instructions: [
      'Un pied en avant, un pied en arrière',
      'Descendre en fléchissant les deux genoux',
      'Remonter en poussant sur la jambe avant'
    ],
    images: { 
      start: 'User',       // Position debout
      end: 'ChevronDown'  // Position fente
    },
    defaultDuration: 40
  },
  'high-knees': {
    id: 'high-knees',
    name: 'Montées de Genoux',
    muscleGroup: 'Cardio',
    secondaryMuscles: ['Jambes', 'Abdominaux'],
    difficulty: 'débutant',
    instructions: [
      'Courir sur place',
      'Lever les genoux le plus haut possible',
      'Maintenir un rythme soutenu'
    ],
    images: { 
      start: 'User',       // Position debout
      end: 'TrendingUp'   // Montée de genou
    },
    defaultDuration: 30
  },
  'bear-crawl': {
    id: 'bear-crawl',
    name: 'Marche de l\'Ours',
    muscleGroup: 'Full Body',
    secondaryMuscles: ['Épaules', 'Abdominaux', 'Jambes'],
    difficulty: 'intermédiaire',
    instructions: [
      'Position quadrupède, genoux légèrement décollés',
      'Avancer en coordonnant main opposée et pied',
      'Garder le dos droit et les abdominaux contractés'
    ],
    images: { 
      start: 'ArrowRight', // Mouvement vers l'avant
      end: 'ArrowLeft'    // Mouvement vers l'arrière
    },
    defaultDuration: 45
  },
  'russian-twists': {
    id: 'russian-twists',
    name: 'Russian Twists',
    muscleGroup: 'Abdominaux',
    secondaryMuscles: ['Obliques', 'Dos'],
    difficulty: 'intermédiaire',
    instructions: [
      'Assis, genoux fléchis, pieds décollés',
      'Pencher légèrement le buste en arrière',
      'Tourner le torse de gauche à droite'
    ],
    images: { 
      start: 'RotateCcw',  // Rotation gauche
      end: 'RotateCw'     // Rotation droite
    },
    defaultDuration: 40
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
 * Fonction utilitaire pour obtenir tous les groupes musculaires
 */
export const getAllMuscleGroups = () => {
  return [...new Set(Object.values(EXERCISES_DATABASE).map(ex => ex.muscleGroup))];
};

/**
 * Fonction utilitaire pour valider un exercice
 */
export const validateExercise = (exercise) => {
  return exercise.id && 
         exercise.name && 
         exercise.muscleGroup && 
         exercise.defaultDuration > 0 &&
         exercise.images &&
         exercise.images.start &&
         exercise.images.end;
};

/**
 * Fonction utilitaire pour obtenir les statistiques d'exercices
 */
export const getExerciseStats = () => {
  const exercises = Object.values(EXERCISES_DATABASE);
  
  return {
    total: exercises.length,
    byDifficulty: {
      débutant: exercises.filter(ex => ex.difficulty === 'débutant').length,
      intermédiaire: exercises.filter(ex => ex.difficulty === 'intermédiaire').length,
      avancé: exercises.filter(ex => ex.difficulty === 'avancé').length
    },
    byMuscleGroup: getAllMuscleGroups().reduce((acc, group) => {
      acc[group] = getExercisesByMuscleGroup(group).length;
      return acc;
    }, {}),
    averageDuration: Math.round(
      exercises.reduce((sum, ex) => sum + ex.defaultDuration, 0) / exercises.length
    )
  };
};