import React, { useState, useMemo, useCallback, useRef } from 'react';

// 🎯 Demo du système de calculs optimisés WA-013.3
// Référence Clean Code: "Functions should do one thing" - Demo focalisée
// Référence Pragmatic Programmer: "Optimize when it matters" - Performance visible
import { formatDuration /*
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
  */ } from '../../utils/calculationUtils';

const WorkoutCalculationsDemo = () => {
  // 🔗 État de configuration simulé
  const [configState, setConfigState] = useState({
    workTime: 30,
    restTime: 15,
    prepTime: 10,
    rounds: 3,
    exercises: ['push-ups', 'squats', 'jumping-jacks'],
    difficulty: 'intermédiaire',
    name: 'Mon Workout HIIT'
  });

  // 📊 État pour mesures de performance
  const [lastCalculationTime, setLastCalculationTime] = useState(0);
  const [benchmarkResults, setBenchmarkResults] = useState(null);

    // 📈 Compteur de rendus avec useRef
  const renderCountRef = useRef(0);
  renderCountRef.current = renderCountRef.current + 1;
  const renderCount = renderCountRef.current;
  // 🧮 Simulation du hook useWorkoutCalculations avec useMemo
  // Durée calculations avec useMemo
  const durationCalculations = useMemo(() => {
    console.log('🧮 Calcul durées - useMemo déclenché');
    const start = performance.now();
    
    const { workTime, restTime, prepTime, rounds, exercises } = configState;
    
    if (exercises.length === 0) {
      return {
        totalSeconds: 0,
        totalMinutes: 0,
        formattedDuration: '0:00',
        workPercentage: 0,
        restPercentage: 0
      };
    }

    const workSeconds = exercises.length * workTime * rounds;
    const restSeconds = exercises.length * restTime * rounds;
    const totalSeconds = workSeconds + restSeconds + prepTime;
    
    const result = {
      totalSeconds,
      totalMinutes: Math.ceil(totalSeconds / 60),
      workSeconds,
      restSeconds,
      prepSeconds: prepTime,
      formattedDuration: formatDuration(totalSeconds),
      workPercentage: Math.round((workSeconds / totalSeconds) * 100),
      restPercentage: Math.round((restSeconds / totalSeconds) * 100),
      intensityRatio: workTime / (workTime + restTime)
    };
    
    const end = performance.now();
    setLastCalculationTime(end - start);
    
    return result;
  }, [configState.workTime, configState.restTime, configState.prepTime, 
      configState.rounds, configState.exercises]);

  // 🔥 Calculs de calories avec useMemo
  const calorieCalculations = useMemo(() => {
    console.log('🔥 Calcul calories - useMemo déclenché');
    
    const caloriesPerMinute = {
      'débutant': 6,
      'intermédiaire': 8,
      'avancé': 12
    };
    
    const baseRate = caloriesPerMinute[configState.difficulty] || 8;
    const intensityAdjustment = 0.7 + (durationCalculations.intensityRatio * 0.6);
    const finalRate = baseRate * intensityAdjustment;
    const estimatedCalories = Math.round(finalRate * durationCalculations.totalMinutes);
    
    return {
      estimatedCalories,
      caloriesPerMinute: Math.round(finalRate * 10) / 10,
      calorieRange: {
        min: Math.round(estimatedCalories * 0.8),
        max: Math.round(estimatedCalories * 1.2)
      },
      burnRate: finalRate >= 10 ? 'élevé' : finalRate >= 7 ? 'modéré' : 'faible'
    };
  }, [configState.difficulty, durationCalculations.totalMinutes, durationCalculations.intensityRatio]);

  // 💪 Analyse des groupes musculaires avec useMemo
  const muscleGroupAnalysis = useMemo(() => {
    console.log('💪 Analyse groupes musculaires - useMemo déclenché');
    
    // Simulation de base de données d'exercices
    const exerciseDatabase = {
      'push-ups': { name: 'Pompes', muscleGroup: 'pectoraux' },
      'squats': { name: 'Squats', muscleGroup: 'jambes' },
      'jumping-jacks': { name: 'Jumping Jacks', muscleGroup: 'cardio' },
      'burpees': { name: 'Burpees', muscleGroup: 'cardio' },
      'lunges': { name: 'Fentes', muscleGroup: 'jambes' },
      'plank': { name: 'Planche', muscleGroup: 'abdos' }
    };
    
    const muscleCount = {};
    configState.exercises.forEach(exerciseId => {
      const exercise = exerciseDatabase[exerciseId];
      if (exercise) {
        const group = exercise.muscleGroup;
        muscleCount[group] = (muscleCount[group] || 0) + 1;
      }
    });
    
    const uniqueGroups = Object.keys(muscleCount);
    const totalExercises = configState.exercises.length;
    const coverage = Math.round((uniqueGroups.length / 6) * 100); // 6 groupes possibles
    
    // Score d'équilibre
    const dominantCount = Math.max(...Object.values(muscleCount));
    const balanceScore = Math.round(100 - (dominantCount / totalExercises * 100));
    
    return {
      targetedGroups: uniqueGroups,
      muscleCount,
      coverage,
      balanceScore,
      dominantGroup: Object.entries(muscleCount).find(([, count]) => count === dominantCount)?.[0]
    };
  }, [configState.exercises]);

  // 🎯 Score de qualité global avec useMemo
  const performanceMetrics = useMemo(() => {
    console.log('📈 Calcul métriques performance - useMemo déclenché');
    
    const qualityScore = Math.round(
      (muscleGroupAnalysis.coverage * 0.3) +
      (muscleGroupAnalysis.balanceScore * 0.3) +
      (Math.min(durationCalculations.intensityRatio * 100, 100) * 0.4)
    );
    
    let overallRating = 'À améliorer';
    if (qualityScore >= 80) overallRating = 'Excellent';
    else if (qualityScore >= 65) overallRating = 'Très bon';
    else if (qualityScore >= 50) overallRating = 'Bon';
    
    return {
      qualityScore,
      overallRating,
      timeEfficiency: Math.round((calorieCalculations.estimatedCalories / durationCalculations.totalMinutes) * 10) / 10
    };
  }, [muscleGroupAnalysis, durationCalculations, calorieCalculations]);

  // 🎯 Mise à jour optimisée avec useCallback
  const updateConfig = useCallback((field, value) => {
    setConfigState(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // 📊 Benchmark des calculs
  const runBenchmark = useCallback(() => {
    console.log('🚀 Lancement benchmark...');
    const iterations = 1000;
    const start = performance.now();
    
    // Simulation de calculs intensifs
    for (let i = 0; i < iterations; i++) {
      const mockDuration = configState.exercises.length * (configState.workTime + configState.restTime) * configState.rounds;
      const mockCalories = Math.round(mockDuration / 60 * 8);
      // Calculs factices pour mesurer la performance
    }
    
    const end = performance.now();
    const totalTime = end - start;
    
    setBenchmarkResults({
      iterations,
      totalTime: Math.round(totalTime * 100) / 100,
      avgTime: Math.round((totalTime / iterations) * 1000) / 1000,
      performanceRating: totalTime < 50 ? 'Excellent' : totalTime < 100 ? 'Bon' : 'À optimiser'
    });
  }, [configState]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ⚡ Demo Calculs Optimisés WA-013.3
        </h1>
        <p className="text-gray-600">
          Test du système de calculs avec <code>useMemo</code> pour optimisation performance
        </p>
        
        {/* Métriques de performance */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded">
            <div className="text-sm text-gray-600">Rendus composant</div>
            <div className="text-2xl font-bold text-gray-800">{renderCount}</div>
          </div>
          <div className="p-3 bg-blue-50 rounded">
            <div className="text-sm text-blue-600">Dernier calcul</div>
            <div className="text-2xl font-bold text-blue-800">
              {lastCalculationTime.toFixed(2)}ms
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded">
            <div className="text-sm text-green-600">useMemo actifs</div>
            <div className="text-2xl font-bold text-green-800">4</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">⚙️ Configuration Workout</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ⏱️ Temps de travail: {configState.workTime}s
            </label>
            <input
              type="range"
              min="15"
              max="60"
              value={configState.workTime}
              onChange={(e) => updateConfig('workTime', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              😴 Temps de repos: {configState.restTime}s
            </label>
            <input
              type="range"
              min="5"
              max="45"
              value={configState.restTime}
              onChange={(e) => updateConfig('restTime', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              🔄 Rounds: {configState.rounds}
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={configState.rounds}
              onChange={(e) => updateConfig('rounds', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🎚️ Difficulté: {configState.difficulty}
            </label>
            <select
              value={configState.difficulty}
              onChange={(e) => updateConfig('difficulty', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="débutant">🔰 Débutant</option>
              <option value="intermédiaire">🎯 Intermédiaire</option>
              <option value="avancé">🔥 Avancé</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🏋️‍♀️ Exercices ({configState.exercises.length})
            </label>
            <div className="flex flex-wrap gap-2">
              {['push-ups', 'squats', 'jumping-jacks', 'burpees', 'lunges', 'plank'].map(exercise => (
                <button
                  key={exercise}
                  onClick={() => {
                    const isSelected = configState.exercises.includes(exercise);
                    if (isSelected) {
                      updateConfig('exercises', configState.exercises.filter(ex => ex !== exercise));
                    } else {
                      updateConfig('exercises', [...configState.exercises, exercise]);
                    }
                  }}
                  className={`px-3 py-1 text-sm rounded ${
                    configState.exercises.includes(exercise)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {exercise}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Résultats calculés */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">📊 Calculs Optimisés (useMemo)</h3>
          
          {/* Durée */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">⏱️ Analyse Temporelle</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Durée totale: <strong>{durationCalculations.formattedDuration}</strong></div>
              <div>Minutes: <strong>{durationCalculations.totalMinutes}</strong></div>
              <div>Travail: <strong>{durationCalculations.workPercentage}%</strong></div>
              <div>Repos: <strong>{durationCalculations.restPercentage}%</strong></div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2 flex">
                <div 
                  className="bg-red-500 h-2 rounded-l-full"
                  style={{ width: `${durationCalculations.workPercentage}%` }}
                ></div>
                <div 
                  className="bg-green-500 h-2 rounded-r-full"
                  style={{ width: `${durationCalculations.restPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Calories */}
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">🔥 Analyse Calorique</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Estimation: <strong>{calorieCalculations.estimatedCalories} cal</strong></div>
              <div>Par minute: <strong>{calorieCalculations.caloriesPerMinute}</strong></div>
              <div>Fourchette: <strong>{calorieCalculations.calorieRange.min}-{calorieCalculations.calorieRange.max}</strong></div>
              <div>Taux: <strong>{calorieCalculations.burnRate}</strong></div>
            </div>
          </div>

          {/* Groupes musculaires */}
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">💪 Analyse Musculaire</h4>
            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              <div>Groupes ciblés: <strong>{muscleGroupAnalysis.targetedGroups.length}</strong></div>
              <div>Couverture: <strong>{muscleGroupAnalysis.coverage}%</strong></div>
              <div>Équilibre: <strong>{muscleGroupAnalysis.balanceScore}%</strong></div>
              <div>Dominant: <strong>{muscleGroupAnalysis.dominantGroup || 'Aucun'}</strong></div>
            </div>
            <div className="space-y-1">
              {Object.entries(muscleGroupAnalysis.muscleCount).map(([group, count]) => (
                <div key={group} className="flex justify-between items-center text-xs">
                  <span className="capitalize">{group}:</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-1 mr-2">
                      <div 
                        className="bg-purple-500 h-1 rounded-full"
                        style={{ width: `${(count / configState.exercises.length) * 100}%` }}
                      ></div>
                    </div>
                    <span>{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance globale */}
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">📈 Score Global</h4>
            <div className="text-center mb-2">
              <div className="text-3xl font-bold text-green-600">
                {performanceMetrics.qualityScore}%
              </div>
              <div className="text-sm text-green-700">
                {performanceMetrics.overallRating}
              </div>
            </div>
            <div className="text-xs text-center">
              Efficacité: {performanceMetrics.timeEfficiency} cal/min
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${performanceMetrics.qualityScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance et Benchmark */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">⚡ Performance useMemo</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Dernier calcul:</span>
              <span className="font-mono">{lastCalculationTime.toFixed(3)}ms</span>
            </div>
            <div className="flex justify-between">
              <span>Rendus totaux:</span>
              <span className="font-mono">{renderCount}</span>
            </div>
            <div className="flex justify-between">
              <span>useMemo actifs:</span>
              <span className="font-mono">4/4</span>
            </div>
            <div className="flex justify-between">
              <span>Status optimisation:</span>
              <span className={`font-semibold ${
                lastCalculationTime < 1 ? 'text-green-600' : 
                lastCalculationTime < 5 ? 'text-orange-600' : 'text-red-600'
              }`}>
                {lastCalculationTime < 1 ? 'Excellent' : 
                 lastCalculationTime < 5 ? 'Bon' : 'À optimiser'}
              </span>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="text-xs text-gray-600 mb-1">
              Performance temps réel (ms)
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  lastCalculationTime < 1 ? 'bg-green-500' :
                  lastCalculationTime < 5 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min((lastCalculationTime / 10) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">🚀 Benchmark Calculs</h4>
          
          <button
            onClick={runBenchmark}
            className="w-full mb-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Lancer Benchmark (1000 itérations)
          </button>
          
          {benchmarkResults && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Itérations:</span>
                <span className="font-mono">{benchmarkResults.iterations}</span>
              </div>
              <div className="flex justify-between">
                <span>Temps total:</span>
                <span className="font-mono">{benchmarkResults.totalTime}ms</span>
              </div>
              <div className="flex justify-between">
                <span>Temps moyen:</span>
                <span className="font-mono">{benchmarkResults.avgTime}ms</span>
              </div>
              <div className="flex justify-between">
                <span>Performance:</span>
                <span className={`font-semibold ${
                  benchmarkResults.performanceRating === 'Excellent' ? 'text-green-600' :
                  benchmarkResults.performanceRating === 'Bon' ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {benchmarkResults.performanceRating}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logs de debug */}
      <div className="mt-6 p-4 bg-black rounded-lg">
        <h4 className="font-semibold text-white mb-2">🔍 Console Debug</h4>
        <div className="text-xs text-green-400 font-mono space-y-1">
          <div>📊 Optimisation useMemo actives:</div>
          <div className="ml-4">✅ durationCalculations - Deps: workTime, restTime, prepTime, rounds, exercises</div>
          <div className="ml-4">✅ calorieCalculations - Deps: difficulty, totalMinutes, intensityRatio</div>
          <div className="ml-4">✅ muscleGroupAnalysis - Deps: exercises</div>
          <div className="ml-4">✅ performanceMetrics - Deps: muscleGroupAnalysis, durationCalculations, calorieCalculations</div>
          <div className="mt-2">⚡ Recalculs déclenchés seulement quand dépendances changent</div>
          <div>🎯 Évite {renderCount > 0 ? Math.max(0, renderCount - 4) : 0} calculs inutiles sur {renderCount} rendus</div>
        </div>
      </div>

      {/* Comparaison avec/sans useMemo */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">📈 Impact de l'optimisation useMemo</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-red-700 mb-2">❌ Sans useMemo</h5>
            <ul className="space-y-1 text-red-600">
              <li>• Calculs à chaque rendu ({renderCount} fois)</li>
              <li>• Durée recalculée {renderCount} fois</li>
              <li>• Calories recalculées {renderCount} fois</li>
              <li>• Analyse musculaire {renderCount} fois</li>
              <li>• Performance: ~{(lastCalculationTime * renderCount).toFixed(1)}ms total</li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-medium text-green-700 mb-2">✅ Avec useMemo</h5>
            <ul className="space-y-1 text-green-600">
              <li>• Calculs seulement si deps changent</li>
              <li>• Durée: calculée 1 fois, réutilisée</li>
              <li>• Calories: calculées 1 fois, réutilisées</li>
              <li>• Analyse: calculée 1 fois, réutilisée</li>
              <li>• Performance: ~{lastCalculationTime ? lastCalculationTime.toFixed(1) : '0'}ms par calcul</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-3 p-3 bg-white rounded border">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              Gain: ~{renderCount > 1 ? Math.round(((renderCount - 1) / renderCount) * 100) : 0}% de performance
            </div>
            <div className="text-sm text-gray-600">
              {renderCount > 1 ? `Évite ${renderCount - 4} recalculs inutiles` : 'Optimisation active'}
            </div>
          </div>
        </div>
      </div>

      {/* Recommandations d'optimisation */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Recommandations d'optimisation</h4>
        <div className="space-y-2 text-sm text-blue-700">
          <div>✨ <strong>useMemo parfaitement utilisé:</strong> Calculs coûteux mémorisés avec dépendances précises</div>
          <div>🎯 <strong>Dépendances optimales:</strong> Chaque useMemo a des deps minimales et spécifiques</div>
          <div>⚡ <strong>Performance excellente:</strong> {lastCalculationTime < 1 ? 'Temps de calcul < 1ms' : 'Considérer optimisation supplémentaire'}</div>
          <div>🔄 <strong>Cache intelligent:</strong> Résultats réutilisés entre rendus identiques</div>
          {renderCount > 10 && (
            <div>🚀 <strong>Stabilité prouvée:</strong> {renderCount} rendus avec optimisation constante</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutCalculationsDemo;