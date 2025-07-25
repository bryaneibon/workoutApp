// src/hooks/usePhaseContext.js
// 🧠 WA-011.1: Hook d'intelligence contextuelle pour phases
// Référence Clean Code: "Make meaningful distinctions"
// Référence Pragmatic Programmer: "Use meaningful names for complex states"

import { useMemo, useCallback } from 'react';
import { WORKOUT_STATUS } from '../constants/workoutStates.js';

/**
 * 🎯 Contextes de phases intelligents
 * Clean Code: "Use intention-revealing names"
 */
export const PHASE_CONTEXTS = {
  // Contextes de démarrage
  WORKOUT_START: 'workout_start',           // Premier prep du workout
  FIRST_EXERCISE: 'first_exercise',         // Premier exercice du workout
  
  // Contextes de progression normale
  EXERCISE_TRANSITION: 'exercise_transition', // Exercice normal → suivant
  REST_RECOVERY: 'rest_recovery',           // Repos normal entre exercices
  
  // Contextes de round
  ROUND_TRANSITION: 'round_transition',     // Dernier exercice du round → repos
  NEW_ROUND_START: 'new_round_start',       // Début d'un nouveau round
  
  // Contextes de fin
  FINAL_EXERCISE: 'final_exercise',         // Dernier exercice du workout
  FINAL_REST: 'final_rest',                 // Dernier repos avant completion
  WORKOUT_COMPLETION: 'workout_completion', // Fin complète du workout
  
  // Contextes spéciaux
  MID_WORKOUT_PREP: 'mid_workout_prep',     // Préparation en milieu de workout
  STRUGGLE_DETECTED: 'struggle_detected',   // Utilisateur en difficulté (pauses répétées)
  PACE_OPTIMAL: 'pace_optimal'              // Rythme parfait détecté
};

/**
 * 🎯 Niveaux d'intensité contextuelle
 * Pragmatic Programmer: "Design for change"
 */
export const INTENSITY_LEVELS = {
  LOW: 'low',           // Début tranquille
  BUILDING: 'building', // Montée en intensité
  PEAK: 'peak',         // Pic d'intensité
  SUSTAIN: 'sustain',   // Maintien de l'effort
  FINAL_PUSH: 'final_push', // Sprint final
  RECOVERY: 'recovery'  // Récupération
};

/**
 * 🧠 Hook usePhaseContext - Intelligence contextuelle
 * 
 * Analyse l'état complet du workout pour déterminer le contexte intelligent
 * de chaque phase et fournir des données pour personnaliser l'expérience
 * 
 * @param {Object} workout - Instance du hook useWorkout
 * @returns {Object} Contexte intelligent avec métadonnées
 */
export const usePhaseContext = (workout) => {
  // 🧮 Détection du contexte principal
  const primaryContext = useMemo(() => {
    const { state } = workout;
    
    if (!state.workoutPlan) return null;
    
    // 🚀 Contextes de démarrage
    if (state.status === WORKOUT_STATUS.PREPARING && state.currentRound === 1 && state.currentExerciseIndex === 0) {
      return PHASE_CONTEXTS.WORKOUT_START;
    }
    
    if (state.status === WORKOUT_STATUS.WORKING && state.currentRound === 1 && state.currentExerciseIndex === 0) {
      return PHASE_CONTEXTS.FIRST_EXERCISE;
    }
    
    // 🏁 Contextes de fin
    const isLastExercise = state.currentExerciseIndex === state.exercises.length - 1;
    const isLastRound = state.currentRound === state.totalRounds;
    
    if (isLastExercise && isLastRound) {
      if (state.status === WORKOUT_STATUS.WORKING) {
        return PHASE_CONTEXTS.FINAL_EXERCISE;
      }
      if (state.status === WORKOUT_STATUS.RESTING) {
        return PHASE_CONTEXTS.FINAL_REST;
      }
    }
    
    if (state.status === WORKOUT_STATUS.COMPLETED) {
      return PHASE_CONTEXTS.WORKOUT_COMPLETION;
    }
    
    // 🔁 Contextes de round
    if (isLastExercise && !isLastRound) {
      if (state.status === WORKOUT_STATUS.WORKING) {
        return PHASE_CONTEXTS.ROUND_TRANSITION;
      }
      if (state.status === WORKOUT_STATUS.RESTING) {
        return PHASE_CONTEXTS.NEW_ROUND_START;
      }
    }
    
    // 💪 Contextes normaux
    if (state.status === WORKOUT_STATUS.WORKING) {
      return PHASE_CONTEXTS.EXERCISE_TRANSITION;
    }
    
    if (state.status === WORKOUT_STATUS.RESTING) {
      return PHASE_CONTEXTS.REST_RECOVERY;
    }
    
    if (state.status === WORKOUT_STATUS.PREPARING) {
      return PHASE_CONTEXTS.MID_WORKOUT_PREP;
    }
    
    return null;
  }, [
    workout.state.status,
    workout.state.currentRound,
    workout.state.currentExerciseIndex,
    workout.state.exercises.length,
    workout.state.totalRounds,
    workout.state.workoutPlan
  ]);
  
  // 📊 Calcul de l'intensité contextuelle
  const intensityLevel = useMemo(() => {
    const { state, computed } = workout;
    const progressPercentage = computed.progressPercentage;
    
    if (progressPercentage < 15) return INTENSITY_LEVELS.LOW;
    if (progressPercentage < 35) return INTENSITY_LEVELS.BUILDING;
    if (progressPercentage < 60) return INTENSITY_LEVELS.PEAK;
    if (progressPercentage < 85) return INTENSITY_LEVELS.SUSTAIN;
    if (progressPercentage < 100) return INTENSITY_LEVELS.FINAL_PUSH;
    
    return INTENSITY_LEVELS.RECOVERY;
  }, [workout.computed.progressPercentage]);
  
  // 🎯 Métadonnées contextuelles enrichies
  const contextMetadata = useMemo(() => {
    const { state, computed } = workout;
    
    const isFirstRound = state.currentRound === 1;
    const isLastRound = state.currentRound === state.totalRounds;
    const isFirstExercise = state.currentExerciseIndex === 0;
    const isLastExercise = state.currentExerciseIndex === state.exercises.length - 1;
    
    const roundProgress = (state.currentRound / state.totalRounds) * 100;
    const exerciseProgress = ((state.currentExerciseIndex + 1) / state.exercises.length) * 100;
    
    return {
      // Position dans le workout
      isFirstRound,
      isLastRound,
      isFirstExercise,
      isLastExercise,
      isMidWorkout: !isFirstRound && !isLastRound,
      
      // Progression détaillée
      roundProgress: Math.round(roundProgress),
      exerciseProgress: Math.round(exerciseProgress),
      overallProgress: computed.progressPercentage,
      
      // Timing contextuel
      timeRemainingInWorkout: calculated.estimatedTimeRemaining(state),
      timeSpentInWorkout: state.totalElapsed,
      currentPhaseDuration: state.currentPhaseTime,
      
      // Exercices contextuels
      currentExercise: computed.currentExercise,
      nextExercise: getNextExercise(state),
      exercisesRemaining: state.totalExercises - state.completedExercises,
      
      // Données motivationnelles
      strugglingDetected: detectStruggling(state),
      paceQuality: assessPaceQuality(state),
      achievementUnlocked: checkAchievements(state)
    };
  }, [
    workout.state,
    workout.computed.progressPercentage,
    workout.computed.currentExercise
  ]);
  
  // 🎨 Messages contextuels intelligents
  const getContextualMessage = useCallback((messageType = 'motivation') => {
    if (!primaryContext) return null;
    
    const messages = {
      [PHASE_CONTEXTS.WORKOUT_START]: {
        motivation: `🚀 C'est parti ${contextMetadata.currentExercise?.name} ! Premier de ${contextMetadata.exercisesRemaining} exercices`,
        transition: "Préparez-vous pour votre premier exercice",
        celebration: "🎯 Workout commencé avec succès !"
      },
      
      [PHASE_CONTEXTS.FIRST_EXERCISE]: {
        motivation: `💪 Premier ${contextMetadata.currentExercise?.name} ! Donnez le ton !`,
        transition: `Début de l'exercice - ${contextMetadata.currentPhaseDuration}s`,
        celebration: "🔥 Premier exercice en cours !"
      },
      
      [PHASE_CONTEXTS.FINAL_EXERCISE]: {
        motivation: `🏁 DERNIER EXERCICE ! ${contextMetadata.currentExercise?.name} - Tout donner !`,
        transition: "Plus qu'un effort - vous y êtes presque !",
        celebration: "🎉 LAST EXERCISE - VICTORY IS YOURS!"
      },
      
      [PHASE_CONTEXTS.WORKOUT_COMPLETION]: {
        motivation: `🏆 BRAVO ! Workout terminé en ${Math.floor(contextMetadata.timeSpentInWorkout / 60)}min !`,
        transition: "Workout completed successfully",
        celebration: "🎊 FÉLICITATIONS ! Objectif atteint !"
      },
      
      [PHASE_CONTEXTS.ROUND_TRANSITION]: {
        motivation: `🔁 Round ${contextMetadata.roundProgress}% - ${contextMetadata.exercisesRemaining} exercices restants`,
        transition: `Fin du round ${workout.state.currentRound} - Excellent travail !`,
        celebration: `✅ Round ${workout.state.currentRound} complété !`
      },
      
      [PHASE_CONTEXTS.NEW_ROUND_START]: {
        motivation: `⚡ Round ${workout.state.currentRound + 1} ! Rechargé et prêt !`,
        transition: `Nouveau round commence - ${contextMetadata.currentExercise?.name}`,
        celebration: `🆕 Round ${workout.state.currentRound + 1} - Let's go !`
      },
      
      [PHASE_CONTEXTS.REST_RECOVERY]: {
        motivation: `😴 Récupération ${intensityLevel === INTENSITY_LEVELS.FINAL_PUSH ? 'finale' : 'active'} - Prochain: ${contextMetadata.nextExercise?.name}`,
        transition: `Repos bien mérité - ${contextMetadata.currentPhaseDuration}s`,
        celebration: "💨 Récupération en cours"
      }
    };
    
    return messages[primaryContext]?.[messageType] || `Phase: ${primaryContext}`;
  }, [primaryContext, contextMetadata, intensityLevel, workout.state.currentRound]);
  
  // 🎵 Suggestions audio contextuelles
  const getAudioSuggestions = useCallback(() => {
    if (!primaryContext) return null;
    
    return {
      soundType: getSoundTypeForContext(primaryContext, intensityLevel),
      vibrationPattern: getVibrationPatternForContext(primaryContext),
      musicTempo: getMusicTempoForContext(primaryContext, intensityLevel),
      volumeLevel: getVolumeForContext(primaryContext, contextMetadata.timeSpentInWorkout)
    };
  }, [primaryContext, intensityLevel, contextMetadata.timeSpentInWorkout]);
  
  // 📊 Interface publique du hook
  return {
    // Contexte principal
    context: primaryContext,
    intensity: intensityLevel,
    
    // Métadonnées enrichies
    metadata: contextMetadata,
    
    // Fonctions utilitaires
    getContextualMessage,
    getAudioSuggestions,
    
    // Détections spéciales
    isSpecialMoment: isSpecialMoment(primaryContext),
    requiresCelebration: requiresCelebration(primaryContext),
    shouldMotivate: shouldMotivate(primaryContext, intensityLevel),
    
    // Diagnostic pour debug
    diagnostic: {
      primaryContext,
      intensityLevel,
      contextMetadata: Object.keys(contextMetadata),
      lastUpdate: new Date().toISOString()
    }
  };
};

// 🔧 Fonctions utilitaires pour la détection contextuelle

/**
 * Calcule le temps restant estimé dans le workout
 */
/**
 * Calculs utilitaires pour le contexte
 */
const calculated = {
  estimatedTimeRemaining: (state) => {
    if (!state.exercises.length) return 0;
    
    const exercisesLeft = state.totalExercises - state.completedExercises;
    const timePerExercise = state.workTime + state.restTime;
    
    return exercisesLeft * timePerExercise + state.timeRemaining;
  }
};

/**
 * Récupère l'exercice suivant avec contexte
 */
const getNextExercise = (state) => {
  if (!state.exercises.length) return null;
  
  const isLastExercise = state.currentExerciseIndex === state.exercises.length - 1;
  const isLastRound = state.currentRound === state.totalRounds;
  
  if (isLastExercise && isLastRound) {
    return null; // Workout terminé
  } else if (isLastExercise) {
    return state.exercises[0]; // Premier exercice du prochain round
  } else {
    return state.exercises[state.currentExerciseIndex + 1];
  }
};

/**
 * Détecte si l'utilisateur semble en difficulté
 */
const detectStruggling = (state) => {
  // Logique simple pour détecter la difficulté
  // TODO: Implémenter avec historique des pauses
  return state.totalElapsed > 0 && state.completedExercises === 0;
};

/**
 * Évalue la qualité du rythme
 */
const assessPaceQuality = (state) => {
  const idealTimePerExercise = state.workTime + state.restTime;
  const actualTimePerExercise = state.completedExercises > 0 ? 
    state.totalElapsed / state.completedExercises : idealTimePerExercise;
  
  const paceRatio = actualTimePerExercise / idealTimePerExercise;
  
  if (paceRatio < 1.1) return 'excellent';
  if (paceRatio < 1.3) return 'good';
  if (paceRatio < 1.5) return 'acceptable';
  return 'slow';
};

/**
 * Vérifie les achievements débloqués
 */
const checkAchievements = (state) => {
  const achievements = [];
  
  if (state.currentRound === 2 && state.currentExerciseIndex === 0) {
    achievements.push('second_round');
  }
  
  if (state.completedExercises === Math.floor(state.totalExercises / 2)) {
    achievements.push('halfway_point');
  }
  
  return achievements;
};

/**
 * Détermine le type de son pour le contexte
 */
const getSoundTypeForContext = (context, intensity) => {
  const soundMap = {
    [PHASE_CONTEXTS.WORKOUT_START]: 'energetic_start',
    [PHASE_CONTEXTS.FINAL_EXERCISE]: 'epic_final',
    [PHASE_CONTEXTS.WORKOUT_COMPLETION]: 'victory_fanfare',
    [PHASE_CONTEXTS.ROUND_TRANSITION]: 'achievement_unlock',
    [PHASE_CONTEXTS.REST_RECOVERY]: intensity === INTENSITY_LEVELS.FINAL_PUSH ? 'final_rest' : 'gentle_recovery'
  };
  
  return soundMap[context] || 'standard_transition';
};

/**
 * Détermine le pattern de vibration pour le contexte
 */
const getVibrationPatternForContext = (context) => {
  const patterns = {
    [PHASE_CONTEXTS.WORKOUT_START]: [200, 100, 200],
    [PHASE_CONTEXTS.FINAL_EXERCISE]: [100, 50, 100, 50, 300],
    [PHASE_CONTEXTS.WORKOUT_COMPLETION]: [300, 100, 300, 100, 300, 100, 500],
    [PHASE_CONTEXTS.ROUND_TRANSITION]: [150, 100, 150]
  };
  
  return patterns[context] || [100];
};

/**
 * Détermine le tempo musical pour le contexte
 */
const getMusicTempoForContext = (context, intensity) => {
  const baseTempos = {
    [INTENSITY_LEVELS.LOW]: 120,
    [INTENSITY_LEVELS.BUILDING]: 130,
    [INTENSITY_LEVELS.PEAK]: 140,
    [INTENSITY_LEVELS.SUSTAIN]: 135,
    [INTENSITY_LEVELS.FINAL_PUSH]: 150,
    [INTENSITY_LEVELS.RECOVERY]: 100
  };
  
  const contextModifiers = {
    [PHASE_CONTEXTS.FINAL_EXERCISE]: +10,
    [PHASE_CONTEXTS.WORKOUT_START]: +5,
    [PHASE_CONTEXTS.REST_RECOVERY]: -20
  };
  
  return baseTempos[intensity] + (contextModifiers[context] || 0);
};

/**
 * Détermine le volume selon le contexte
 */
const getVolumeForContext = (context, timeSpent) => {
  // Volume plus fort en fin de workout pour la motivation
  const baseVolume = 0.7;
  const fatigueBoost = Math.min(timeSpent / 1800, 0.2); // +20% max après 30min
  
  const contextModifiers = {
    [PHASE_CONTEXTS.FINAL_EXERCISE]: +0.3,
    [PHASE_CONTEXTS.WORKOUT_COMPLETION]: +0.5,
    [PHASE_CONTEXTS.REST_RECOVERY]: -0.2
  };
  
  return Math.min(baseVolume + fatigueBoost + (contextModifiers[context] || 0), 1.0);
};

/**
 * Détermine si c'est un moment spécial
 */
const isSpecialMoment = (context) => {
  return [
    PHASE_CONTEXTS.WORKOUT_START,
    PHASE_CONTEXTS.FINAL_EXERCISE,
    PHASE_CONTEXTS.WORKOUT_COMPLETION,
    PHASE_CONTEXTS.ROUND_TRANSITION
  ].includes(context);
};

/**
 * Détermine si une célébration est requise
 */
const requiresCelebration = (context) => {
  return [
    PHASE_CONTEXTS.WORKOUT_COMPLETION,
    PHASE_CONTEXTS.ROUND_TRANSITION
  ].includes(context);
};

/**
 * Détermine si une motivation est nécessaire
 */
const shouldMotivate = (context, intensity) => {
  const motivationContexts = [
    PHASE_CONTEXTS.FINAL_EXERCISE,
    PHASE_CONTEXTS.STRUGGLE_DETECTED
  ];
  
  const highIntensityPhases = [
    INTENSITY_LEVELS.PEAK,
    INTENSITY_LEVELS.FINAL_PUSH
  ];
  
  return motivationContexts.includes(context) || highIntensityPhases.includes(intensity);
};

export default usePhaseContext;