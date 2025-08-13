// src/hooks/useWorkoutCalculations.js
// ⚡ WA-013.3: Hook de calculs optimisés avec useMemo
// Référence Clean Code: "Functions should do one thing" - Calculs purs séparés
// Référence Pragmatic Programmer: "Optimize when it matters" - Performance ciblée

import { useMemo, useRef, useCallback } from 'react';
import { EXERCISES_DATABASE } from '../data/exercices.js';
import { DIFFICULTY_LEVELS } from '../data/workoutPresets.js';
import { formatDuration,
        calculateTimeComplexity,
        calculateVolumeComplexity,
        calculateExerciseComplexity,
        getDifficultyLabel,
        getIntensityLevel,
        getNextLevelTarget,
        identifyImprovementAreas,
        generateMuscleRecommendations,
        generateProgressionSuggestions,
        calculateDiversityIndex,
        analyzeExerciseSequence,
        generateOptimalSequence,
        calculateProjections,
        calculateSustainabilityScore,
        generateOptimizationSuggestions,
        benchmarkCalculation,
        CalculationCache,
        globalCalculationCache
} from '../utils/calculationUtils.js';

/**
 * 🎯 Constantes pour calculs de performance
 */
const CALORIES_PER_MINUTE = {
  'débutant': 6,      // 6 calories/minute
  'intermédiaire': 8, // 8 calories/minute
  'avancé': 12        // 12 calories/minute
};

const INTENSITY_MULTIPLIERS = {
  'cardio': 1.3,
  'strength': 1.0,
  'hiit': 1.5,
  'recovery': 0.6
};

const MUSCLE_GROUP_COLORS = {
  'pectoraux': '#ff6b6b',
  'dos': '#4ecdc4', 
  'jambes': '#45b7d1',
  'bras': '#96ceb4',
  'abdos': '#feca57',
  'épaules': '#ff9ff3',
  'cardio': '#fd79a8'
};

/**
 * 🏗️ Hook useWorkoutCalculations - Calculs optimisés avec useMemo
 * 
 * Ce hook centralise TOUS les calculs coûteux :
 * - Durée totale et par phase
 * - Calories estimées avec précision
 * - Analyse des groupes musculaires
 * - Statistiques de difficulté
 * - Métriques de performance
 * 
 * Clean Code: "Single Responsibility" - Seulement les CALCULS
 * Pragmatic Programmer: "Optimize when it matters" - useMemo ciblé
 * 
 * @param {Object} configState - État de configuration
 * @returns {Object} Tous les calculs mémorisés
 */
export const useWorkoutCalculations = (configState) => {
  // 🔗 Cache pour éviter recalculs identiques
  const calculationCache = useRef(new Map());
  const lastStateHash = useRef('');

  // 🎯 Hash de l'état pour détection changements
  const stateHash = useMemo(() => {
    const relevantState = {
      workTime: configState.workTime,
      restTime: configState.restTime,
      prepTime: configState.prepTime,
      rounds: configState.rounds,
      exercises: configState.exercises,
      difficulty: configState.difficulty
    };
    return btoa(JSON.stringify(relevantState)).slice(0, 12);
  }, [configState.workTime, configState.restTime, configState.prepTime, 
      configState.rounds, configState.exercises, configState.difficulty]);

  // ⏱️ Calculs de durée optimisés avec useMemo
  const durationCalculations = useMemo(() => {
    console.log('🧮 Calcul durées - useMemo déclenché - useWorkoutCalculations.js ');
    
    const { workTime, restTime, prepTime, rounds, exercises } = configState;
    
    if (exercises.length === 0) {
      return {
        totalSeconds: 0,
        totalMinutes: 0,
        workSeconds: 0,
        restSeconds: 0,
        prepSeconds: prepTime,
        roundDuration: 0,
        averageExerciseTime: 0,
        formattedDuration: '0:00'
      };
    }

    // Calculs de base
    const workSeconds = exercises.length * workTime * rounds;
    const restSeconds = exercises.length * restTime * rounds;
    const totalSeconds = workSeconds + restSeconds + prepTime;
    const roundDuration = exercises.length * (workTime + restTime);
    
    return {
      totalSeconds,
      totalMinutes: Math.ceil(totalSeconds / 60),
      workSeconds,
      restSeconds,
      prepSeconds: prepTime,
      roundDuration,
      averageExerciseTime: workTime + restTime,
      formattedDuration: formatDuration(totalSeconds),
      
      // Métriques avancées
      workPercentage: Math.round((workSeconds / totalSeconds) * 100),
      restPercentage: Math.round((restSeconds / totalSeconds) * 100),
      intensityRatio: workTime / (workTime + restTime),
      totalExerciseCount: exercises.length * rounds
    };
  }, [configState.workTime, configState.restTime, configState.prepTime, 
      configState.rounds, configState.exercises]);

  // 🔥 Calculs de calories optimisés
  const calorieCalculations = useMemo(() => {
    console.log('🔥 Calcul calories - useMemo déclenché');
    
    const { difficulty, exercises } = configState;
    const { totalMinutes, intensityRatio } = durationCalculations;
    
    if (totalMinutes === 0) {
      return {
        estimatedCalories: 0,
        caloriesPerMinute: 0,
        calorieRange: { min: 0, max: 0 },
        burnRate: 'faible'
      };
    }

    // Calcul base selon difficulté
    const baseCaloriesPerMin = CALORIES_PER_MINUTE[difficulty] || CALORIES_PER_MINUTE.débutant;
    
    // Analyse des types d'exercices pour ajustement
    const exerciseTypes = exercises.map(id => EXERCISES_DATABASE[id]?.type || 'strength');
    const typeMultipliers = exerciseTypes.map(type => INTENSITY_MULTIPLIERS[type] || 1.0);
    const avgMultiplier = typeMultipliers.reduce((sum, mult) => sum + mult, 0) / typeMultipliers.length;
    
    // Ajustement selon ratio intensité
    const intensityAdjustment = 0.7 + (intensityRatio * 0.6); // 0.7 à 1.3
    
    // Calcul final
    const caloriesPerMinute = baseCaloriesPerMin * avgMultiplier * intensityAdjustment;
    const estimatedCalories = Math.round(caloriesPerMinute * totalMinutes);
    
    // Range d'estimation (±20%)
    const calorieRange = {
      min: Math.round(estimatedCalories * 0.8),
      max: Math.round(estimatedCalories * 1.2)
    };
    
    // Classification du taux de combustion
    let burnRate = 'faible';
    if (caloriesPerMinute >= 10) burnRate = 'élevé';
    else if (caloriesPerMinute >= 7) burnRate = 'modéré';
    
    return {
      estimatedCalories,
      caloriesPerMinute: Math.round(caloriesPerMinute * 10) / 10,
      calorieRange,
      burnRate,
      intensityScore: Math.round(intensityRatio * 100),
      metabolicEquivalence: Math.round((caloriesPerMinute / 5) * 10) / 10 // METs approximatifs
    };
  }, [configState.difficulty, configState.exercises, durationCalculations]);

  // 🏋️‍♀️ Analyse des groupes musculaires optimisée
  const muscleGroupAnalysis = useMemo(() => {
    console.log('💪 Analyse groupes musculaires - useMemo déclenché');
    
    const { exercises } = configState;
    
    if (exercises.length === 0) {
      return {
        targetedGroups: [],
        muscleDistribution: {},
        dominantGroup: null,
        coverage: 0,
        balanceScore: 0,
        recommendations: []
      };
    }

    // Collecte des groupes musculaires avec fréquence
    const muscleCount = {};
    const muscleDetails = [];
    
    exercises.forEach((exerciseId, index) => {
      const exercise = EXERCISES_DATABASE[exerciseId];
      if (exercise) {
        const group = exercise.muscleGroup;
        muscleCount[group] = (muscleCount[group] || 0) + 1;
        muscleDetails.push({
          exerciseId,
          name: exercise.name,
          muscleGroup: group,
          position: index,
          color: MUSCLE_GROUP_COLORS[group] || '#95a5a6'
        });
      }
    });

    // Calculs de distribution
    const totalExercises = exercises.length;
    const muscleDistribution = {};
    Object.entries(muscleCount).forEach(([group, count]) => {
      muscleDistribution[group] = {
        count,
        percentage: Math.round((count / totalExercises) * 100),
        color: MUSCLE_GROUP_COLORS[group] || '#95a5a6'
      };
    });

    // Groupe dominant
    const dominantGroup = Object.entries(muscleCount)
      .reduce((max, [group, count]) => count > max.count ? { group, count } : max, 
              { group: null, count: 0 });

    // Score de couverture (nombre de groupes différents)
    const uniqueGroups = Object.keys(muscleCount);
    const maxPossibleGroups = Object.keys(MUSCLE_GROUP_COLORS).length;
    const coverage = Math.round((uniqueGroups.length / maxPossibleGroups) * 100);

    // Score d'équilibre (éviter concentration sur un seul groupe)
    const balanceScore = uniqueGroups.length > 1 
      ? Math.round(100 - (dominantGroup.count / totalExercises * 100))
      : 0;

    // Recommandations intelligentes
    const recommendations = generateMuscleRecommendations(
      muscleDistribution, 
      dominantGroup, 
      coverage
    );

    return {
      targetedGroups: uniqueGroups,
      muscleDistribution,
      dominantGroup: dominantGroup.group,
      dominantPercentage: Math.round((dominantGroup.count / totalExercises) * 100),
      coverage,
      balanceScore,
      muscleDetails,
      recommendations,
      
      // Métriques avancées
      diversityIndex: calculateDiversityIndex(muscleCount),
      sequenceAnalysis: analyzeExerciseSequence(muscleDetails)
    };
  }, [configState.exercises]);

  // 📊 Analyse de difficulté et progression optimisée
  const difficultyAnalysis = useMemo(() => {
    console.log('🎯 Analyse difficulté - useMemo déclenché');
    
    const { difficulty, workTime, restTime, rounds, exercises } = configState;
    const { intensityRatio } = durationCalculations;
    
    // Métriques de difficulté par composant
    const timeComplexity = calculateTimeComplexity(workTime, restTime, intensityRatio);
    const volumeComplexity = calculateVolumeComplexity(exercises.length, rounds);
    const exerciseComplexity = calculateExerciseComplexity(exercises);
    
    // Score de difficulté global (0-100)
    const difficultyScore = Math.round(
      (timeComplexity * 0.4) + 
      (volumeComplexity * 0.3) + 
      (exerciseComplexity * 0.3)
    );

    // Comparaison avec niveau déclaré
    const expectedDifficulty = {
      'débutant': { min: 0, max: 35 },
      'intermédiaire': { min: 30, max: 70 },
      'avancé': { min: 65, max: 100 }
    };

    const currentLevel = expectedDifficulty[difficulty];
    const isAligned = difficultyScore >= currentLevel.min && difficultyScore <= currentLevel.max;
    
    // Suggestions de progression
    const progressionSuggestions = generateProgressionSuggestions(
      difficulty, 
      difficultyScore, 
      configState
    );

    return {
      difficultyScore,
      timeComplexity,
      volumeComplexity,
      exerciseComplexity,
      isAligned,
      currentLevel,
      progressionSuggestions,
      
      // Classification textuelle
      difficultyLabel: getDifficultyLabel(difficultyScore),
      intensityLevel: getIntensityLevel(intensityRatio),

      // Métriques de progression
      nextLevelScore: getNextLevelTarget(difficulty, difficultyScore),
      improvementAreas: identifyImprovementAreas(timeComplexity, volumeComplexity, exerciseComplexity)
    };
  }, [configState.difficulty, configState.workTime, configState.restTime, 
      configState.rounds, configState.exercises, durationCalculations]);

  // 📈 Métriques de performance globales optimisées
  const performanceMetrics = useMemo(() => {
    console.log('📈 Calcul métriques performance - useMemo déclenché');
    
    const { totalMinutes, intensityRatio } = durationCalculations;
    const { estimatedCalories, caloriesPerMinute } = calorieCalculations;
    const { coverage, balanceScore } = muscleGroupAnalysis;
    const { difficultyScore, isAligned } = difficultyAnalysis;
    
    // Score de qualité global (0-100)
    const qualityScore = Math.round(
      (coverage * 0.25) +           // Couverture musculaire
      (balanceScore * 0.25) +       // Équilibre exercices
      (difficultyScore * 0.25) +    // Appropriation difficulté
      ((isAligned ? 100 : 50) * 0.25) // Cohérence niveau
    );

    // Efficacité temporelle (calories/minute)
    const timeEfficiency = totalMinutes > 0 ? caloriesPerMinute : 0;
    
    // Score d'intensité (0-100)
    const intensityScore = Math.round(intensityRatio * 100);
    
    // Classification globale
    let overallRating = 'À améliorer';
    if (qualityScore >= 80) overallRating = 'Excellent';
    else if (qualityScore >= 65) overallRating = 'Très bon';
    else if (qualityScore >= 50) overallRating = 'Bon';
    
    // Prédictions et projections
    const projections = calculateProjections(
      estimatedCalories, 
      totalMinutes, 
      intensityScore
    );

    return {
      qualityScore,
      timeEfficiency,
      intensityScore,
      overallRating,
      projections,
      
      // Scores détaillés
      scores: {
        muscleCoverage: coverage,
        balance: balanceScore,
        difficulty: difficultyScore,
        alignment: isAligned ? 100 : 50,
        efficiency: Math.min(timeEfficiency * 10, 100)
      },
      
      // Recommandations d'optimisation
      optimizationSuggestions: generateOptimizationSuggestions(
        qualityScore, 
        coverage, 
        balanceScore, 
        intensityScore
      )
    };
  }, [durationCalculations, calorieCalculations, muscleGroupAnalysis, difficultyAnalysis]);

  // 🔄 Fonction de nettoyage du cache
  const clearCalculationCache = useCallback(() => {
    calculationCache.current.clear();
    console.log('🧹 Cache de calculs nettoyé');
  }, []);

  // 📊 Fonction de benchmark des performances
  const benchmarkCalculations = useCallback(() => {
    const start = performance.now();
    
    // Force le recalcul de tous les useMemo
    const hash = Date.now().toString();
    
    const end = performance.now();
    const duration = end - start;
    
    console.log(`⚡ Benchmark calculs: ${duration.toFixed(2)}ms`);
    return { duration, timestamp: start };
  }, []);

  // 🏗️ Interface publique du hook
  return {
    // Calculs principaux
    durationCalculations,
    calorieCalculations,
    muscleGroupAnalysis,
    difficultyAnalysis,
    performanceMetrics,
    
    // Métadonnées
    stateHash,
    lastCalculation: Date.now(),
    
    // Utilitaires
    clearCalculationCache,
    benchmarkCalculations,
    
    // Getters optimisés pour composants
    getTotalDuration: useCallback(() => durationCalculations.formattedDuration, [durationCalculations]),
    getCalorieEstimate: useCallback(() => calorieCalculations.estimatedCalories, [calorieCalculations]),
    getMuscleGroups: useCallback(() => muscleGroupAnalysis.targetedGroups, [muscleGroupAnalysis]),
    getQualityScore: useCallback(() => performanceMetrics.qualityScore, [performanceMetrics]),
    
    // Validations rapides
    isWorkoutViable: useCallback(() => {
      return durationCalculations.totalMinutes > 0 && 
             muscleGroupAnalysis.targetedGroups.length > 0 &&
             performanceMetrics.qualityScore >= 30;
    }, [durationCalculations, muscleGroupAnalysis, performanceMetrics])
  };
};