// src/hooks/useWorkoutConfig.js
// 🏗️ WA-013.1: Hook useWorkoutConfig avec useReducer
// Référence Clean Code: "Functions should do one thing" - Hook focalisé sur CONFIG uniquement
// Référence Pragmatic Programmer: "DRY + Orthogonality" - Séparation config vs execution

import { useReducer, useCallback, useMemo } from 'react';
import { configReducer, initialConfigState } from '../reducers/configReducer.js';
import { 
  setWorkTimeAction, 
  setRestTimeAction, 
  setPrepTimeAction,
  setRoundsAction,
  addExerciseAction,
  removeExerciseAction,
  setDifficultyAction,
  setConfigNameAction,
  setConfigDescriptionAction,
  loadPresetAction,
  resetConfigAction,
  nextStepAction,
  previousStepAction
} from '../actions/configActions.js';
import { EXERCISES_DATABASE } from '../data/exercices.js';
import { WORKOUT_PRESETS } from '../data/workoutPresets.js';

/**
 * 🎯 Hook useWorkoutConfig - Gestion complète de la configuration
 * 
 * Ce hook encapsule UNIQUEMENT la logique de configuration du workout :
 * - Gestion d'état complexe avec useReducer
 * - Actions optimisées avec useCallback
 * - Calculs mémorisés avec useMemo
 * - Validation temps réel
 * - Navigation multi-étapes
 * 
 * Clean Code: "Single Responsibility Principle" - Seulement la CONFIG
 * 
 * @returns {Object} Interface complète de configuration
 */
export const useWorkoutConfig = () => {
  // 🧠 État principal avec useReducer - gestion complexe
  const [configState, dispatch] = useReducer(configReducer, initialConfigState);

  // 🎯 Actions de timing optimisées avec useCallback
  // Clean Code: "Functions should be small and do one thing"
  
  const setWorkTime = useCallback((seconds) => {
    try {
      dispatch(setWorkTimeAction(seconds));
      console.log(`⏱️ Temps de travail mis à jour: ${seconds}s`);
    } catch (error) {
      console.error('❌ Erreur temps de travail:', error.message);
    }
  }, []);

  const setRestTime = useCallback((seconds) => {
    try {
      dispatch(setRestTimeAction(seconds));
      console.log(`😴 Temps de repos mis à jour: ${seconds}s`);
    } catch (error) {
      console.error('❌ Erreur temps de repos:', error.message);
    }
  }, []);

  const setPrepTime = useCallback((seconds) => {
    try {
      dispatch(setPrepTimeAction(seconds));
      console.log(`🏃 Temps de préparation mis à jour: ${seconds}s`);
    } catch (error) {
      console.error('❌ Erreur temps de préparation:', error.message);
    }
  }, []);

  const setRounds = useCallback((rounds) => {
    try {
      dispatch(setRoundsAction(rounds));
      console.log(`🔄 Nombre de rounds mis à jour: ${rounds}`);
    } catch (error) {
      console.error('❌ Erreur nombre de rounds:', error.message);
    }
  }, []);

  // 🏋️‍♀️ Actions d'exercices optimisées
  
  const addExercise = useCallback((exerciseId) => {
    try {
      const exercise = EXERCISES_DATABASE[exerciseId];
      if (!exercise) {
        throw new Error(`Exercice ${exerciseId} introuvable`);
      }
      
      dispatch(addExerciseAction(exerciseId));
      console.log(`➕ Exercice ajouté: ${exercise.name}`);
      return { success: true, exercise };
    } catch (error) {
      console.error('❌ Erreur ajout exercice:', error.message);
      return { success: false, error: error.message };
    }
  }, []);

  const removeExercise = useCallback((exerciseId) => {
    try {
      const exercise = EXERCISES_DATABASE[exerciseId];
      dispatch(removeExerciseAction(exerciseId));
      console.log(`➖ Exercice supprimé: ${exercise?.name || exerciseId}`);
      return { success: true };
    } catch (error) {
      console.error('❌ Erreur suppression exercice:', error.message);
      return { success: false, error: error.message };
    }
  }, []);

  // 🎚️ Actions de configuration générale
  
  const setDifficulty = useCallback((level) => {
    try {
      dispatch(setDifficultyAction(level));
      console.log(`🎯 Difficulté mise à jour: ${level}`);
    } catch (error) {
      console.error('❌ Erreur difficulté:', error.message);
    }
  }, []);

  const setConfigName = useCallback((name) => {
    dispatch(setConfigNameAction(name));
    console.log(`📝 Nom de configuration: ${name}`);
  }, []);

  const setConfigDescription = useCallback((description) => {
    dispatch(setConfigDescriptionAction(description));
    console.log(`📋 Description mise à jour`);
  }, []);

  // 🗂️ Actions de preset et reset
  
  const loadPreset = useCallback((presetId) => {
    try {
      const preset = WORKOUT_PRESETS[presetId];
      if (!preset) {
        throw new Error(`Preset ${presetId} introuvable`);
      }
      
      dispatch(loadPresetAction(preset));
      console.log(`📦 Preset chargé: ${preset.name}`);
      return { success: true, preset };
    } catch (error) {
      console.error('❌ Erreur chargement preset:', error.message);
      return { success: false, error: error.message };
    }
  }, []);

  const resetConfig = useCallback(() => {
    dispatch(resetConfigAction());
    console.log('🔄 Configuration réinitialisée');
  }, []);

  // 🧭 Navigation multi-étapes
  
  const nextStep = useCallback(() => {
    try {
      dispatch(nextStepAction());
      console.log(`➡️ Étape suivante: ${configState.currentStep + 1}`);
    } catch (error) {
      console.error('❌ Erreur navigation:', error.message);
    }
  }, [configState.currentStep]);

  const previousStep = useCallback(() => {
    try {
      dispatch(previousStepAction());
      console.log(`⬅️ Étape précédente: ${configState.currentStep - 1}`);
    } catch (error) {
      console.error('❌ Erreur navigation:', error.message);
    }
  }, [configState.currentStep]);

  // 🧮 Valeurs calculées mémorisées avec useMemo
  // Pragmatic Programmer: "Optimize when it matters"
  
  const estimatedDuration = useMemo(() => {
    const { exercises, workTime, restTime, rounds } = configState;
    
    if (exercises.length === 0) return 0;
    
    // Calcul: (workTime + restTime) * exercices * rounds
    const totalExerciseTime = exercises.length * workTime * rounds;
    const totalRestTime = exercises.length * restTime * rounds;
    const totalSeconds = totalExerciseTime + totalRestTime;
    
    return Math.ceil(totalSeconds / 60); // en minutes
  }, [configState.exercises, configState.workTime, configState.restTime, configState.rounds]);

  const totalExercises = useMemo(() => {
    return configState.exercises.length * configState.rounds;
  }, [configState.exercises.length, configState.rounds]);

  const muscleGroupsTargeted = useMemo(() => {
    const muscleGroups = new Set();
    
    configState.exercises.forEach(exerciseId => {
      const exercise = EXERCISES_DATABASE[exerciseId];
      if (exercise) {
        muscleGroups.add(exercise.muscleGroup);
      }
    });
    
    return Array.from(muscleGroups);
  }, [configState.exercises]);

  const exercisesList = useMemo(() => {
    return configState.exercises.map(exerciseId => EXERCISES_DATABASE[exerciseId]).filter(Boolean);
  }, [configState.exercises]);

  // 🎯 Validation en temps réel
  const validationStatus = useMemo(() => {
    const { isValid, errors, warnings } = configState;
    
    return {
      isValid,
      errors,
      warnings,
      canProceed: isValid && configState.exercises.length > 0,
      completionPercentage: calculateCompletionPercentage(configState)
    };
  }, [configState.isValid, configState.errors, configState.warnings, configState.exercises]);

  // 🏗️ Interface publique du hook
  // Clean Code: "Use intention-revealing names"
  return {
    // État de configuration
    configState,
    
    // Actions de timing
    setWorkTime,
    setRestTime,
    setPrepTime,
    setRounds,
    
    // Actions d'exercices
    addExercise,
    removeExercise,
    exercisesList,
    
    // Configuration générale
    setDifficulty,
    setConfigName,
    setConfigDescription,
    
    // Presets et reset
    loadPreset,
    resetConfig,
    
    // Navigation
    nextStep,
    previousStep,
    
    // Valeurs calculées
    estimatedDuration,
    totalExercises,
    muscleGroupsTargeted,
    validationStatus,
    
    // Utilitaires
    canProceedToNextStep: validationStatus.canProceed,
    isDirty: configState.isDirty,
    currentStep: configState.currentStep
  };
};

/**
 * 🧮 Fonction utilitaire pour calculer le pourcentage de completion
 * Clean Code: "Extract till you drop"
 */
const calculateCompletionPercentage = (configState) => {
  let score = 0;
  const maxScore = 10;
  
  // Timing configuré (3 points)
  if (configState.workTime > 0) score += 1;
  if (configState.restTime > 0) score += 1;
  if (configState.rounds > 0) score += 1;
  
  // Exercices configurés (4 points)
  if (configState.exercises.length > 0) score += 2;
  if (configState.exercises.length >= 3) score += 1;
  if (configState.exercises.length >= 5) score += 1;
  
  // Métadonnées (3 points)
  if (configState.name.trim().length > 0) score += 1;
  if (configState.description.trim().length > 0) score += 1;
  if (configState.difficulty !== 'débutant') score += 1;
  
  return Math.round((score / maxScore) * 100);
};

// 🏆 Export par défaut pour usage simple
export default useWorkoutConfig;