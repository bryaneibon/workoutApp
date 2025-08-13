// src/hooks/useWorkoutValidation.js
// 🔍 WA-013.2: Hook de validation robuste avec useCallback
// Référence Clean Code: "Functions should do one thing" - Validation pure séparée
// Référence Pragmatic Programmer: "Fail fast" - Validation précoce et précise

import { useCallback, useRef, useEffect } from 'react';
import { EXERCISES_DATABASE } from '../data/exercices.js';
import { DEFAULT_TIMERS } from '../constants/workoutStates.js';

/**
 * 🎯 Types de validation et leurs priorités
 * Clean Code: "Use meaningful names"
 */
export const VALIDATION_TYPES = {
  ERROR: 'error',       // Bloquant - empêche progression
  WARNING: 'warning',   // Non-bloquant - suggère amélioration  
  INFO: 'info',         // Informatif - aide utilisateur
  SUCCESS: 'success'    // Confirmation - tout va bien
};

export const VALIDATION_PRIORITIES = {
  CRITICAL: 1,    // Empêche démarrage workout
  HIGH: 2,        // Empêche progression étape
  MEDIUM: 3,      // Suggère modification
  LOW: 4          // Information seulement
};

/**
 * 🏗️ Hook useWorkoutValidation - Validation robuste avec useCallback
 * 
 * Ce hook gère UNIQUEMENT la validation :
 * - Validation temps réel avec debouncing
 * - Règles contextuelles par étape
 * - Feedback utilisateur granulaire
 * - Performance optimisée avec useCallback
 * 
 * Clean Code: "Single Responsibility Principle" - Seulement la VALIDATION
 * 
 * @param {Object} configState - État de configuration à valider
 * @returns {Object} Interface complète de validation
 */
export const useWorkoutValidation = (configState) => {
  // 🔗 Références pour debouncing et cache
  const debounceTimers = useRef({});
  const validationCache = useRef(new Map());
  const lastValidationHash = useRef('');

  // 🎯 Validation du timing optimisée avec useCallback
  // Clean Code: "Functions should be small and do one thing"
  
  const validateTiming = useCallback((timing) => {
    const { workTime, restTime, prepTime, rounds } = timing;
    const results = [];

    // Validation workTime
    if (workTime < DEFAULT_TIMERS.MIN_WORK_TIME) {
      results.push({
        type: VALIDATION_TYPES.ERROR,
        priority: VALIDATION_PRIORITIES.CRITICAL,
        field: 'workTime',
        message: `Temps de travail minimum: ${DEFAULT_TIMERS.MIN_WORK_TIME}s`,
        suggestion: `Augmentez à au moins ${DEFAULT_TIMERS.MIN_WORK_TIME}s`,
        code: 'WORK_TIME_TOO_LOW'
      });
    } else if (workTime > DEFAULT_TIMERS.MAX_WORK_TIME) {
      results.push({
        type: VALIDATION_TYPES.ERROR,
        priority: VALIDATION_PRIORITIES.HIGH,
        field: 'workTime',
        message: `Temps de travail maximum: ${DEFAULT_TIMERS.MAX_WORK_TIME}s`,
        suggestion: `Réduisez à maximum ${DEFAULT_TIMERS.MAX_WORK_TIME}s`,
        code: 'WORK_TIME_TOO_HIGH'
      });
    } else if (workTime >= 60) {
      results.push({
        type: VALIDATION_TYPES.WARNING,
        priority: VALIDATION_PRIORITIES.MEDIUM,
        field: 'workTime',
        message: 'Temps de travail élevé détecté',
        suggestion: 'Considérez 30-45s pour débuter',
        code: 'WORK_TIME_HIGH'
      });
    }

    // Validation restTime
    if (restTime < DEFAULT_TIMERS.MIN_REST_TIME) {
      results.push({
        type: VALIDATION_TYPES.ERROR,
        priority: VALIDATION_PRIORITIES.HIGH,
        field: 'restTime',
        message: `Temps de repos minimum: ${DEFAULT_TIMERS.MIN_REST_TIME}s`,
        suggestion: `Augmentez à au moins ${DEFAULT_TIMERS.MIN_REST_TIME}s`,
        code: 'REST_TIME_TOO_LOW'
      });
    }

    // Validation ratio work/rest intelligent
    if (workTime > 0 && restTime > 0) {
      const ratio = workTime / restTime;
      
      if (ratio > 3) {
        results.push({
          type: VALIDATION_TYPES.WARNING,
          priority: VALIDATION_PRIORITIES.MEDIUM,
          field: 'ratio',
          message: 'Ratio travail/repos très élevé',
          suggestion: 'Augmentez le temps de repos pour récupération',
          code: 'WORK_REST_RATIO_HIGH',
          data: { ratio: Math.round(ratio * 10) / 10 }
        });
      } else if (ratio < 0.3) {
        results.push({
          type: VALIDATION_TYPES.INFO,
          priority: VALIDATION_PRIORITIES.LOW,
          field: 'ratio',
          message: 'Ratio travail/repos faible - workout très récupératif',
          suggestion: 'Parfait pour récupération active',
          code: 'WORK_REST_RATIO_LOW',
          data: { ratio: Math.round(ratio * 10) / 10 }
        });
      }
    }

    // Validation rounds
    if (rounds < 1) {
      results.push({
        type: VALIDATION_TYPES.ERROR,
        priority: VALIDATION_PRIORITIES.CRITICAL,
        field: 'rounds',
        message: 'Au moins 1 round requis',
        suggestion: 'Définissez le nombre de tours',
        code: 'ROUNDS_TOO_LOW'
      });
    } else if (rounds > 10) {
      results.push({
        type: VALIDATION_TYPES.WARNING,
        priority: VALIDATION_PRIORITIES.MEDIUM,
        field: 'rounds',
        message: 'Nombre de rounds très élevé',
        suggestion: 'Plus de 10 rounds peuvent être épuisant',
        code: 'ROUNDS_HIGH'
      });
    }

    return results;
  }, []);

  // 🏋️‍♀️ Validation des exercices optimisée
  const validateExercises = useCallback((exercises) => {
    const results = [];

    // Validation nombre d'exercices
    if (exercises.length === 0) {
      results.push({
        type: VALIDATION_TYPES.ERROR,
        priority: VALIDATION_PRIORITIES.CRITICAL,
        field: 'exercises',
        message: 'Au moins un exercice requis',
        suggestion: 'Sélectionnez des exercices dans la liste',
        code: 'NO_EXERCISES'
      });
      return results; // Early return si pas d'exercices
    }

    if (exercises.length === 1) {
      results.push({
        type: VALIDATION_TYPES.WARNING,
        priority: VALIDATION_PRIORITIES.MEDIUM,
        field: 'exercises',
        message: 'Un seul exercice sélectionné',
        suggestion: 'Ajoutez 2-3 exercices pour varier',
        code: 'SINGLE_EXERCISE'
      });
    }

    if (exercises.length > 8) {
      results.push({
        type: VALIDATION_TYPES.WARNING,
        priority: VALIDATION_PRIORITIES.MEDIUM,
        field: 'exercises',
        message: 'Beaucoup d\'exercices sélectionnés',
        suggestion: 'Plus de 8 exercices = workout très long',
        code: 'MANY_EXERCISES'
      });
    }

    // Validation existence des exercices
    const missingExercises = exercises.filter(id => !EXERCISES_DATABASE[id]);
    if (missingExercises.length > 0) {
      results.push({
        type: VALIDATION_TYPES.ERROR,
        priority: VALIDATION_PRIORITIES.HIGH,
        field: 'exercises',
        message: `${missingExercises.length} exercice(s) introuvable(s)`,
        suggestion: 'Supprimez les exercices invalides',
        code: 'MISSING_EXERCISES',
        data: { missingIds: missingExercises }
      });
    }

    // Analyse des groupes musculaires
    const muscleGroups = exercises
      .map(id => EXERCISES_DATABASE[id]?.muscleGroup)
      .filter(Boolean);
    
    const uniqueMuscleGroups = new Set(muscleGroups);
    
    if (uniqueMuscleGroups.size === 1 && exercises.length > 3) {
      results.push({
        type: VALIDATION_TYPES.WARNING,
        priority: VALIDATION_PRIORITIES.MEDIUM,
        field: 'exercises',
        message: 'Tous les exercices ciblent le même groupe musculaire',
        suggestion: 'Variez les groupes musculaires pour équilibrer',
        code: 'SINGLE_MUSCLE_GROUP',
        data: { muscleGroup: Array.from(uniqueMuscleGroups)[0] }
      });
    }

    // Détection exercices consécutifs même groupe musculaire
    for (let i = 0; i < exercises.length - 1; i++) {
      const current = EXERCISES_DATABASE[exercises[i]];
      const next = EXERCISES_DATABASE[exercises[i + 1]];
      
      if (current && next && current.muscleGroup === next.muscleGroup) {
        results.push({
          type: VALIDATION_TYPES.INFO,
          priority: VALIDATION_PRIORITIES.LOW,
          field: 'exercises',
          message: `Exercices ${i + 1}-${i + 2}: même groupe musculaire`,
          suggestion: 'Considérez réorganiser pour alterner',
          code: 'CONSECUTIVE_SAME_MUSCLE',
          data: { 
            positions: [i, i + 1], 
            muscleGroup: current.muscleGroup,
            exercises: [current.name, next.name]
          }
        });
      }
    }

    return results;
  }, []);

  // 📊 Validation de la durée et intensité
  const validateWorkoutMetrics = useCallback((state) => {
    const results = [];
    const { estimatedDuration, exercises, workTime, restTime, rounds, difficulty } = state;

      // Validation cohérence exercices/durée
      if (exercises.length > 5 && rounds > 5) {
        results.push({
          type: VALIDATION_TYPES.WARNING,
          priority: VALIDATION_PRIORITIES.MEDIUM,
          field: 'volume',
          message: 'Combinaison exercices/rounds très intense',
          suggestion: 'Réduisez exercices ou rounds pour éviter épuisement',
          code: 'HIGH_VOLUME_COMBINATION'
        });
      }

    // Validation durée
    if (estimatedDuration > 60) {
      results.push({
        type: VALIDATION_TYPES.WARNING,
        priority: VALIDATION_PRIORITIES.MEDIUM,
        field: 'duration',
        message: 'Workout de plus d\'1 heure détecté',
        suggestion: 'Réduisez exercices ou rounds pour session plus courte',
        code: 'DURATION_VERY_LONG',
        data: { duration: estimatedDuration }
      });
    } else if (estimatedDuration < 5) {
      results.push({
        type: VALIDATION_TYPES.INFO,
        priority: VALIDATION_PRIORITIES.LOW,
        field: 'duration',
        message: 'Workout très court',
        suggestion: 'Ajoutez exercices ou augmentez rounds',
        code: 'DURATION_SHORT',
        data: { duration: estimatedDuration }
      });
    }

    // Validation cohérence difficulté/paramètres
    if (difficulty === 'débutant') {
      if (workTime > 30) {
        results.push({
          type: VALIDATION_TYPES.WARNING,
          priority: VALIDATION_PRIORITIES.MEDIUM,
          field: 'difficulty',
          message: 'Temps de travail élevé pour niveau débutant',
          suggestion: 'Réduisez à 15-30s ou changez la difficulté',
          code: 'DIFFICULTY_MISMATCH_WORK_TIME'
        });
      }
      
      if (restTime < workTime) {
        results.push({
          type: VALIDATION_TYPES.WARNING,
          priority: VALIDATION_PRIORITIES.MEDIUM,
          field: 'difficulty',
          message: 'Temps de repos insuffisant pour débutant',
          suggestion: 'Repos >= temps de travail recommandé',
          code: 'DIFFICULTY_MISMATCH_REST_TIME'
        });
      }
    }

    if (difficulty === 'avancé') {
      if (workTime < 30) {
        results.push({
          type: VALIDATION_TYPES.INFO,
          priority: VALIDATION_PRIORITIES.LOW,
          field: 'difficulty',
          message: 'Temps de travail faible pour niveau avancé',
          suggestion: 'Augmentez à 40-60s pour plus de challenge',
          code: 'DIFFICULTY_MISMATCH_LOW_INTENSITY'
        });
      }
    }

    return results;
  }, []);

  // 📝 Validation métadonnées
  const validateMetadata = useCallback((state) => {
    const results = [];
    const { name, description } = state;

    if (!name || name.trim().length === 0) {
      results.push({
        type: VALIDATION_TYPES.WARNING,
        priority: VALIDATION_PRIORITIES.MEDIUM,
        field: 'name',
        message: 'Nom du workout manquant',
        suggestion: 'Donnez un nom à votre workout',
        code: 'NO_NAME'
      });
    } else if (name.trim().length < 3) {
      results.push({
        type: VALIDATION_TYPES.INFO,
        priority: VALIDATION_PRIORITIES.LOW,
        field: 'name',
        message: 'Nom très court',
        suggestion: 'Un nom plus descriptif serait mieux',
        code: 'NAME_TOO_SHORT'
      });
    }

    if (name && name.length > 50) {
      results.push({
        type: VALIDATION_TYPES.WARNING,
        priority: VALIDATION_PRIORITIES.LOW,
        field: 'name',
        message: 'Nom très long',
        suggestion: 'Limitez à 50 caractères maximum',
        code: 'NAME_TOO_LONG'
      });
    }

    if (description && description.length > 200) {
      results.push({
        type: VALIDATION_TYPES.INFO,
        priority: VALIDATION_PRIORITIES.LOW,
        field: 'description',
        message: 'Description très longue',
        suggestion: 'Une description concise est plus lisible',
        code: 'DESCRIPTION_LONG'
      });
    }

    return results;
  }, []);

  // 🎯 Validation par étape avec useCallback
  const validateStep = useCallback((stepNumber, state) => {
    switch (stepNumber) {
      case 1: // Étape timing
        return validateTiming({
          workTime: state.workTime,
          restTime: state.restTime,
          prepTime: state.prepTime,
          rounds: state.rounds
        });
      
      case 2: // Étape exercices
        return validateExercises(state.exercises);
      
      case 3: // Étape finalisation
        return [
          ...validateMetadata(state),
          ...validateWorkoutMetrics(state)
        ];
      
      default:
        return [];
    }
  }, [validateTiming, validateExercises, validateMetadata, validateWorkoutMetrics]);

  // 🚀 Validation complète avec cache et debouncing
  const validateComplete = useCallback((state, options = {}) => {
    const { debounceMs = 300, useCache = true } = options;
    
    // Génération hash pour cache
    const stateHash = generateStateHash(state);
    
    // Check cache si activé
    if (useCache && validationCache.current.has(stateHash)) {
      console.log('🎯 Validation depuis cache');
      return validationCache.current.get(stateHash);
    }

    // Fonction de validation réelle
    const performValidation = () => {
      console.log('🔍 Validation complète en cours...');
      
      const allResults = [
        ...validateTiming(state),
        ...validateExercises(state.exercises),
        ...validateMetadata(state),
        ...validateWorkoutMetrics(state)
      ];

      // Tri par priorité
      allResults.sort((a, b) => a.priority - b.priority);

      // Classification des résultats
      const errors = allResults.filter(r => r.type === VALIDATION_TYPES.ERROR);
      const warnings = allResults.filter(r => r.type === VALIDATION_TYPES.WARNING);
      const infos = allResults.filter(r => r.type === VALIDATION_TYPES.INFO);
      const successes = allResults.filter(r => r.type === VALIDATION_TYPES.SUCCESS);

      const validationResult = {
        isValid: errors.length === 0,
        canProceed: errors.filter(e => e.priority <= VALIDATION_PRIORITIES.HIGH).length === 0,
        results: allResults,
        errors,
        warnings,
        infos,
        successes,
        summary: {
          totalIssues: allResults.length,
          criticalIssues: errors.filter(e => e.priority === VALIDATION_PRIORITIES.CRITICAL).length,
          highIssues: errors.filter(e => e.priority === VALIDATION_PRIORITIES.HIGH).length,
          completionScore: calculateCompletionScore(state, allResults)
        },
        timestamp: new Date().toISOString()
      };

      // Mise en cache
      if (useCache) {
        validationCache.current.set(stateHash, validationResult);
        lastValidationHash.current = stateHash;
      }

      return validationResult;
    };

    // Debouncing si activé
    if (debounceMs > 0) {
      return new Promise((resolve) => {
        // Clear timer précédent
        if (debounceTimers.current.complete) {
          clearTimeout(debounceTimers.current.complete);
        }

        debounceTimers.current.complete = setTimeout(() => {
          resolve(performValidation());
        }, debounceMs);
      });
    }

    return performValidation();
  }, [validateTiming, validateExercises, validateMetadata, validateWorkoutMetrics]);

  // 🧹 Nettoyage des timers au démontage
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  // 🏗️ Interface publique du hook
  return {
    // Validations spécifiques
    validateTiming,
    validateExercises,
    validateMetadata,
    validateWorkoutMetrics,
    validateStep,
    
    // Validation complète
    validateComplete,
    
    // Utilitaires
    clearValidationCache: useCallback(() => {
      validationCache.current.clear();
      console.log('🧹 Cache de validation nettoyé');
    }, []),
    
    getValidationCacheSize: useCallback(() => {
      return validationCache.current.size;
    }, []),
    
    // Constants pour les composants
    VALIDATION_TYPES,
    VALIDATION_PRIORITIES
  };
};

/**
 * 🧮 Fonctions utilitaires pour la validation
 * Clean Code: "Extract till you drop"
 */

/**
 * Génère un hash de l'état pour le cache
 */
const generateStateHash = (state) => {
  const relevant = {
    workTime: state.workTime,
    restTime: state.restTime,
    prepTime: state.prepTime,
    rounds: state.rounds,
    exercises: state.exercises,
    name: state.name,
    description: state.description,
    difficulty: state.difficulty
  };
  
  return btoa(JSON.stringify(relevant)).slice(0, 16);
};

/**
 * Calcule un score de completion basé sur la configuration
 */
const calculateCompletionScore = (state, validationResults) => {
  let score = 0;
  const maxScore = 100;
  
  // Points base (50 points)
  if (state.workTime > 0) score += 10;
  if (state.restTime >= 0) score += 10;
  if (state.rounds > 0) score += 10;
  if (state.exercises.length > 0) score += 20;
  
  // Points bonus (30 points)
  if (state.exercises.length >= 3) score += 10;
  if (state.name.trim().length > 0) score += 10;
  if (state.description.trim().length > 0) score += 10;
  
  // Points qualité (20 points)
  const errors = validationResults.filter(r => r.type === VALIDATION_TYPES.ERROR);
  const warnings = validationResults.filter(r => r.type === VALIDATION_TYPES.WARNING);
  
  if (errors.length === 0) score += 10;
  if (warnings.length <= 2) score += 10;
  
  return Math.min(score, maxScore);
};

export default useWorkoutValidation;