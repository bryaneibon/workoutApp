// src/utils/calculationUtils.js
// 🧮 WA-013.3: Fonctions utilitaires pour calculs optimisés
// Référence Clean Code: "Extract till you drop" - Fonctions pures extraites
// Référence Pragmatic Programmer: "DRY - Don't Repeat Yourself"

import { EXERCISES_DATABASE } from '../data/exercices.js';

/**
 * 🕒 Formatage de durée en format lisible
 * @param {number} totalSeconds - Durée en secondes
 * @returns {string} Format "MM:SS" ou "HH:MM:SS"
 */
export const formatDuration = (totalSeconds) => {
  if (totalSeconds < 0) return '0:00';
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * ⏱️ Calcul de complexité temporelle
 * @param {number} workTime - Temps de travail
 * @param {number} restTime - Temps de repos  
 * @param {number} intensityRatio - Ratio d'intensité
 * @returns {number} Score 0-100
 */
export const calculateTimeComplexity = (workTime, restTime, intensityRatio) => {
  // Complexité basée sur temps de travail (0-40 points)
  let workComplexity = 0;
  if (workTime <= 20) workComplexity = 10;
  else if (workTime <= 30) workComplexity = 20;
  else if (workTime <= 45) workComplexity = 30;
  else workComplexity = 40;
  
  // Complexité basée sur ratio intensité (0-35 points)
  const ratioComplexity = Math.min(intensityRatio * 35, 35);
  
  // Pénalité pour temps de repos très courts (0-25 points)
  let restPenalty = 0;
  if (restTime < workTime * 0.5) restPenalty = 25;
  else if (restTime < workTime * 0.75) restPenalty = 15;
  else if (restTime < workTime) restPenalty = 10;
  
  return Math.min(workComplexity + ratioComplexity + restPenalty, 100);
};

/**
 * 📊 Calcul de complexité de volume
 * @param {number} exerciseCount - Nombre d'exercices
 * @param {number} rounds - Nombre de rounds
 * @returns {number} Score 0-100
 */
export const calculateVolumeComplexity = (exerciseCount, rounds) => {
  // Complexité basée sur nombre d'exercices (0-50 points)
  let exerciseComplexity = 0;
  if (exerciseCount <= 2) exerciseComplexity = 10;
  else if (exerciseCount <= 4) exerciseComplexity = 25;
  else if (exerciseCount <= 6) exerciseComplexity = 40;
  else exerciseComplexity = 50;
  
  // Complexité basée sur rounds (0-50 points)
  let roundComplexity = 0;
  if (rounds <= 2) roundComplexity = 15;
  else if (rounds <= 4) roundComplexity = 30;
  else if (rounds <= 6) roundComplexity = 45;
  else roundComplexity = 50;
  
  return Math.min(exerciseComplexity + roundComplexity, 100);
};

/**
 * 💪 Calcul de complexité des exercices
 * @param {string[]} exercises - Liste des IDs d'exercices
 * @returns {number} Score 0-100
 */
export const calculateExerciseComplexity = (exercises) => {
  if (exercises.length === 0) return 0;
  
  const difficultyScores = {
    'débutant': 20,
    'intermédiaire': 50,
    'avancé': 80
  };
  
  const typeScores = {
    'cardio': 30,
    'strength': 50,
    'hiit': 70,
    'compound': 60
  };
  
  let totalScore = 0;
  let validExercises = 0;
  
  exercises.forEach(exerciseId => {
    const exercise = EXERCISES_DATABASE[exerciseId];
    if (exercise) {
      const diffScore = difficultyScores[exercise.difficulty] || 20;
      const typeScore = typeScores[exercise.type] || 40;
      totalScore += (diffScore + typeScore) / 2;
      validExercises++;
    }
  });
  
  return validExercises > 0 ? Math.round(totalScore / validExercises) : 0;
};

/**
 * 🏷️ Classification textuelle de difficulté
 * @param {number} score - Score de difficulté 0-100
 * @returns {string} Label textuel
 */
export const getDifficultyLabel = (score) => {
  if (score >= 80) return 'Très difficile';
  if (score >= 65) return 'Difficile';
  if (score >= 50) return 'Modéré';
  if (score >= 35) return 'Facile';
  return 'Très facile';
};

/**
 * 🔥 Classification du niveau d'intensité
 * @param {number} intensityRatio - Ratio d'intensité 0-1
 * @returns {string} Niveau d'intensité
 */
export const getIntensityLevel = (intensityRatio) => {
  if (intensityRatio >= 0.8) return 'Très haute';
  if (intensityRatio >= 0.6) return 'Haute';
  if (intensityRatio >= 0.4) return 'Modérée';
  if (intensityRatio >= 0.2) return 'Faible';
  return 'Très faible';
};

/**
 * 🎯 Calcul du score cible pour niveau suivant
 * @param {string} currentDifficulty - Difficulté actuelle
 * @param {number} currentScore - Score actuel
 * @returns {number} Score cible pour progression
 */
export const getNextLevelTarget = (currentDifficulty, currentScore) => {
  const targets = {
    'débutant': 40,      // Passage à intermédiaire
    'intermédiaire': 70, // Passage à avancé
    'avancé': 90         // Perfectionnement
  };
  
  const target = targets[currentDifficulty] || 50;
  return Math.max(target, currentScore + 10);
};

/**
 * 🔍 Identification des zones d'amélioration
 * @param {number} timeComplexity - Complexité temporelle
 * @param {number} volumeComplexity - Complexité de volume
 * @param {number} exerciseComplexity - Complexité des exercices
 * @returns {string[]} Liste des zones à améliorer
 */
export const identifyImprovementAreas = (timeComplexity, volumeComplexity, exerciseComplexity) => {
  const areas = [];
  
  if (timeComplexity < 40) {
    areas.push('Augmenter l\'intensité temporelle');
  }
  
  if (volumeComplexity < 40) {
    areas.push('Ajouter plus d\'exercices ou de rounds');
  }
  
  if (exerciseComplexity < 40) {
    areas.push('Intégrer des exercices plus challengeants');
  }
  
  // Suggestions spécifiques
  const maxComplexity = Math.max(timeComplexity, volumeComplexity, exerciseComplexity);
  if (maxComplexity - Math.min(timeComplexity, volumeComplexity, exerciseComplexity) > 30) {
    areas.push('Équilibrer les différents aspects de difficulté');
  }
  
  return areas.length > 0 ? areas : ['Configuration déjà bien optimisée'];
};

/**
 * 💡 Génération de recommandations musculaires
 * @param {Object} muscleDistribution - Distribution des groupes musculaires
 * @param {Object} dominantGroup - Groupe dominant
 * @param {number} coverage - Pourcentage de couverture
 * @returns {string[]} Liste de recommandations
 */
export const generateMuscleRecommendations = (muscleDistribution, dominantGroup, coverage) => {
  const recommendations = [];
  
  // Recommandations basées sur couverture
  if (coverage < 30) {
    recommendations.push('Ajoutez des exercices ciblant d\'autres groupes musculaires');
  }
  
  // Recommandations basées sur déséquilibre
  if (dominantGroup.count > Object.keys(muscleDistribution).length * 0.6) {
    recommendations.push(`Réduisez la dominance du groupe "${dominantGroup.group}"`);
  }
  
  // Suggestions de groupes manquants
  const missingGroups = ['pectoraux', 'dos', 'jambes', 'abdos'].filter(
    group => !muscleDistribution[group]
  );
  
  if (missingGroups.length > 0 && Object.keys(muscleDistribution).length < 6) {
    recommendations.push(`Considérez ajouter: ${missingGroups.slice(0, 2).join(', ')}`);
  }
  
  // Recommandation d'équilibre push/pull
  const hasPush = muscleDistribution['pectoraux'] || muscleDistribution['épaules'];
  const hasPull = muscleDistribution['dos'];
  
  if (hasPush && !hasPull) {
    recommendations.push('Équilibrez avec des exercices de dos (tirages)');
  } else if (hasPull && !hasPush) {
    recommendations.push('Équilibrez avec des exercices de poussée');
  }
  
  return recommendations.length > 0 ? recommendations : ['Distribution musculaire équilibrée'];
};

/**
 * 📈 Suggestions de progression personnalisées
 * @param {string} difficulty - Niveau de difficulté
 * @param {number} difficultyScore - Score de difficulté actuel
 * @param {Object} configState - État de configuration
 * @returns {string[]} Suggestions de progression
 */
export const generateProgressionSuggestions = (difficulty, difficultyScore, configState) => {
  const suggestions = [];
  const { workTime, restTime, rounds, exercises } = configState;
  
  // Suggestions selon niveau et score
  if (difficulty === 'débutant' && difficultyScore > 40) {
    suggestions.push('Prêt pour passer au niveau intermédiaire !');
  }
  
  if (difficulty === 'intermédiaire' && difficultyScore > 70) {
    suggestions.push('Vous pouvez tenter le niveau avancé');
  }
  
  // Suggestions d'ajustement progressif
  if (difficultyScore < 30) {
    if (workTime < 30) suggestions.push('Augmentez progressivement le temps de travail');
    if (rounds < 3) suggestions.push('Ajoutez un round supplémentaire');
    if (exercises.length < 4) suggestions.push('Intégrez 1-2 exercices supplémentaires');
  }
  
  // Suggestions d'optimisation du ratio
  const ratio = workTime / (workTime + restTime);
  if (ratio < 0.3) {
    suggestions.push('Réduisez le temps de repos pour plus d\'intensité');
  } else if (ratio > 0.7) {
    suggestions.push('Augmentez le temps de repos pour meilleure récupération');
  }
  
  return suggestions.length > 0 ? suggestions : ['Configuration appropriée pour votre niveau'];
};

/**
 * 📊 Calcul de l'index de diversité musculaire
 * @param {Object} muscleCount - Comptage par groupe musculaire
 * @returns {number} Index de diversité (Shannon)
 */
export const calculateDiversityIndex = (muscleCount) => {
  const totalExercises = Object.values(muscleCount).reduce((sum, count) => sum + count, 0);
  
  if (totalExercises === 0) return 0;
  
  // Calcul de l'index de Shannon
  let diversity = 0;
  Object.values(muscleCount).forEach(count => {
    const proportion = count / totalExercises;
    if (proportion > 0) {
      diversity -= proportion * Math.log2(proportion);
    }
  });
  
  // Normalisation sur 100
  const maxDiversity = Math.log2(Object.keys(muscleCount).length);
  return maxDiversity > 0 ? Math.round((diversity / maxDiversity) * 100) : 0;
};

/**
 * 🔄 Analyse de la séquence d'exercices
 * @param {Array} muscleDetails - Détails des exercices avec groupes musculaires
 * @returns {Object} Analyse de séquence
 */
export const analyzeExerciseSequence = (muscleDetails) => {
  if (muscleDetails.length < 2) {
    return {
      consecutiveSameGroup: 0,
      alternationScore: 100,
      recommendations: ['Séquence trop courte pour analyse']
    };
  }
  
  let consecutiveCount = 0;
  let consecutivePairs = 0;
  
  // Analyse des paires consécutives
  for (let i = 0; i < muscleDetails.length - 1; i++) {
    const current = muscleDetails[i];
    const next = muscleDetails[i + 1];
    
    if (current.muscleGroup === next.muscleGroup) {
      consecutiveCount++;
      consecutivePairs++;
    }
  }
  
  // Score d'alternation (0-100, 100 = parfait)
  const totalPairs = muscleDetails.length - 1;
  const alternationScore = totalPairs > 0 
    ? Math.round(((totalPairs - consecutivePairs) / totalPairs) * 100)
    : 100;
  
  // Recommandations de séquence
  const recommendations = [];
  if (alternationScore < 70) {
    recommendations.push('Alternez davantage entre les groupes musculaires');
  }
  
  if (consecutiveCount > muscleDetails.length * 0.3) {
    recommendations.push('Trop d\'exercices consécutifs pour même groupe');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Séquence bien organisée');
  }
  
  return {
    consecutiveSameGroup: consecutiveCount,
    alternationScore,
    recommendations,
    optimalSequence: generateOptimalSequence(muscleDetails)
  };
};

/**
 * 🎯 Génération de séquence optimale
 * @param {Array} muscleDetails - Détails des exercices
 * @returns {Array} Séquence optimisée
 */
export const generateOptimalSequence = (muscleDetails) => {
  if (muscleDetails.length <= 2) return muscleDetails;
  
  // Regroupement par muscle
  const groupedByMuscle = {};
  muscleDetails.forEach(exercise => {
    const group = exercise.muscleGroup;
    if (!groupedByMuscle[group]) {
      groupedByMuscle[group] = [];
    }
    groupedByMuscle[group].push(exercise);
  });
  
  // Distribution équilibrée
  const muscleGroups = Object.keys(groupedByMuscle);
  const optimalSequence = [];
  
  let maxIterations = muscleDetails.length;
  let currentIndex = 0;
  
  while (optimalSequence.length < muscleDetails.length && maxIterations > 0) {
    const currentGroup = muscleGroups[currentIndex % muscleGroups.length];
    
    if (groupedByMuscle[currentGroup].length > 0) {
      optimalSequence.push(groupedByMuscle[currentGroup].shift());
    }
    
    currentIndex++;
    maxIterations--;
  }
  
  return optimalSequence;
};

/**
 * 📈 Calcul des projections de performance
 * @param {number} estimatedCalories - Calories estimées
 * @param {number} totalMinutes - Durée totale
 * @param {number} intensityScore - Score d'intensité
 * @returns {Object} Projections diverses
 */
export const calculateProjections = (estimatedCalories, totalMinutes, intensityScore) => {
  return {
    // Projections hebdomadaires (3x par semaine)
    weeklyCalories: Math.round(estimatedCalories * 3),
    weeklyMinutes: totalMinutes * 3,
    
    // Projections mensuelles (12 séances)
    monthlyCalories: Math.round(estimatedCalories * 12),
    monthlyMinutes: totalMinutes * 12,
    
    // Projections de perte de poids (approximatives)
    // 3500 calories ≈ 1 pound de graisse
    weeklyWeightLoss: Math.round((estimatedCalories * 3) / 3500 * 1000) / 1000, // en pounds
    monthlyWeightLoss: Math.round((estimatedCalories * 12) / 3500 * 1000) / 1000,
    
    // Métriques de condition physique
    cardiovascularImprovement: Math.min(intensityScore * 0.8, 100),
    strengthImprovement: Math.max(100 - intensityScore * 0.6, 20),
    
    // Estimation du temps pour voir des résultats
    visibleResultsWeeks: intensityScore > 60 ? 4 : intensityScore > 40 ? 6 : 8,
    
    // Score de durabilité (peut-on maintenir ce rythme ?)
    sustainabilityScore: calculateSustainabilityScore(totalMinutes, intensityScore)
  };
};

/**
 * 🔄 Calcul du score de durabilité
 * @param {number} totalMinutes - Durée totale
 * @param {number} intensityScore - Score d'intensité
 * @returns {number} Score de durabilité 0-100
 */
export const calculateSustainabilityScore = (totalMinutes, intensityScore) => {
  let score = 100;
  
  // Pénalité pour durée excessive
  if (totalMinutes > 60) score -= 30;
  else if (totalMinutes > 45) score -= 15;
  else if (totalMinutes > 30) score -= 5;
  
  // Pénalité pour intensité trop élevée
  if (intensityScore > 85) score -= 25;
  else if (intensityScore > 70) score -= 10;
  
  // Bonus pour durée optimale (20-30 min)
  if (totalMinutes >= 20 && totalMinutes <= 30) score += 10;
  
  return Math.max(Math.min(score, 100), 0);
};

/**
 * 💡 Génération de suggestions d'optimisation
 * @param {number} qualityScore - Score de qualité global
 * @param {number} coverage - Couverture musculaire
 * @param {number} balanceScore - Score d'équilibre
 * @param {number} intensityScore - Score d'intensité
 * @returns {string[]} Suggestions d'optimisation
 */
export const generateOptimizationSuggestions = (qualityScore, coverage, balanceScore, intensityScore) => {
  const suggestions = [];
  
  // Optimisations basées sur le score global
  if (qualityScore < 50) {
    suggestions.push('🔧 Configuration nécessite des améliorations majeures');
  } else if (qualityScore < 70) {
    suggestions.push('⚡ Quelques ajustements amélioreront significativement votre workout');
  }
  
  // Optimisations spécifiques
  if (coverage < 40) {
    suggestions.push('🎯 Diversifiez les groupes musculaires ciblés');
  }
  
  if (balanceScore < 50) {
    suggestions.push('⚖️ Rééquilibrez la répartition des exercices');
  }
  
  if (intensityScore < 30) {
    suggestions.push('🔥 Augmentez l\'intensité pour plus d\'efficacité');
  } else if (intensityScore > 80) {
    suggestions.push('😌 Intensité très élevée - assurez-vous de pouvoir maintenir');
  }
  
  // Suggestions d'optimisation avancées
  if (qualityScore >= 70 && coverage >= 60 && balanceScore >= 60) {
    suggestions.push('✨ Excellent workout ! Considérez varier les exercices périodiquement');
  }
  
  // Suggestions de progression
  if (qualityScore >= 80) {
    suggestions.push('🚀 Prêt pour des défis plus avancés ou des variations');
  }
  
  return suggestions.length > 0 ? suggestions : ['💪 Configuration déjà bien optimisée !'];
};

/**
 * 🧮 Fonction de benchmark pour mesurer performance des calculs
 * @param {Function} calculationFunction - Fonction à benchmarker
 * @param {Array} args - Arguments de la fonction
 * @param {number} iterations - Nombre d'itérations pour la moyenne
 * @returns {Object} Résultats de benchmark
 */
export const benchmarkCalculation = (calculationFunction, args = [], iterations = 100) => {
  const times = [];
  
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    calculationFunction(...args);
    const end = performance.now();
    times.push(end - start);
  }
  
  const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  
  return {
    averageTime: Math.round(avgTime * 1000) / 1000, // ms avec 3 décimales
    minTime: Math.round(minTime * 1000) / 1000,
    maxTime: Math.round(maxTime * 1000) / 1000,
    iterations,
    performanceRating: avgTime < 1 ? 'Excellent' : avgTime < 5 ? 'Bon' : 'À optimiser'
  };
};

/**
 * 🔄 Cache intelligent avec TTL (Time To Live)
 */
export class CalculationCache {
  constructor(ttlMinutes = 5) {
    this.cache = new Map();
    this.ttl = ttlMinutes * 60 * 1000; // TTL en millisecondes
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    // Vérification TTL
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
  
  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }
  
  clear() {
    this.cache.clear();
  }
  
  size() {
    return this.cache.size;
  }
  
  // Nettoyage automatique des entrées expirées
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// Instance globale du cache
export const globalCalculationCache = new CalculationCache(10); // 10 minutes TTL

// Export de toutes les fonctions utilitaires
export default {
  formatDuration,
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
};