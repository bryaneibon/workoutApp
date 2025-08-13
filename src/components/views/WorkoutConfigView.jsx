import React, { useState, useEffect } from 'react';

// 🎯 Demo du système de validation WA-013.2
// Référence Clean Code: "Functions should do one thing" - Demo focalisée
// Référence Pragmatic Programmer: "Use tracer bullets" - Test visuel des hooks

const WorkoutConfigView = () => {
  // 🔗 État de démonstration
  const [configState, setConfigState] = useState({
    workTime: 15, // Trop faible - déclenchera warning
    restTime: 5,  // Trop faible - déclenchera erreur
    prepTime: 10,
    rounds: 1,
    exercises: [], // Vide - déclenchera erreur critique
    name: '',
    description: '',
    difficulty: 'débutant',
    estimatedDuration: 0,
    currentStep: 1
  });

  // 🎨 Simulation des résultats de validation
  const [validationResults, setValidationResults] = useState({
    isValid: false,
    results: [],
    errors: [],
    warnings: [],
    infos: []
  });

  // 🔍 Simulation de validation temps réel
  useEffect(() => {
    const simulateValidation = () => {
      const results = [];

      // Validation workTime
      if (configState.workTime < 20) {
        results.push({
          type: 'warning',
          priority: 3,
          field: 'workTime',
          message: 'Temps de travail faible pour débutant',
          suggestion: 'Augmentez à 20-30s pour plus d\'efficacité',
          code: 'WORK_TIME_LOW'
        });
      }

      // Validation restTime  
      if (configState.restTime < 10) {
        results.push({
          type: 'error',
          priority: 2,
          field: 'restTime',
          message: 'Temps de repos trop faible',
          suggestion: 'Minimum 10s recommandé',
          code: 'REST_TIME_TOO_LOW'
        });
      }

      // Validation exercices
      if (configState.exercises.length === 0) {
        results.push({
          type: 'error',
          priority: 1,
          field: 'exercises',
          message: 'Aucun exercice sélectionné',
          suggestion: 'Ajoutez au moins un exercice',
          code: 'NO_EXERCISES'
        });
      }

      // Validation nom
      if (!configState.name.trim()) {
        results.push({
          type: 'info',
          priority: 4,
          field: 'name',
          message: 'Nom du workout manquant',
          suggestion: 'Donnez un nom à votre workout',
          code: 'NO_NAME'
        });
      }

      // Validation ratio work/rest
      if (configState.workTime > 0 && configState.restTime > 0) {
        const ratio = configState.workTime / configState.restTime;
        if (ratio > 2) {
          results.push({
            type: 'warning',
            priority: 3,
            field: 'ratio',
            message: 'Ratio travail/repos élevé',
            suggestion: 'Augmentez le temps de repos',
            code: 'WORK_REST_RATIO_HIGH',
            data: { ratio: Math.round(ratio * 10) / 10 }
          });
        }
      }

      const errors = results.filter(r => r.type === 'error');
      const warnings = results.filter(r => r.type === 'warning');
      const infos = results.filter(r => r.type === 'info');

      setValidationResults({
        isValid: errors.length === 0,
        canProceed: errors.filter(e => e.priority <= 2).length === 0,
        results: results.sort((a, b) => a.priority - b.priority),
        errors,
        warnings,
        infos,
        summary: {
          totalIssues: results.length,
          criticalIssues: errors.filter(e => e.priority === 1).length,
          completionScore: calculateScore(configState, results)
        }
      });
    };

    simulateValidation();
  }, [configState]);

  // 🧮 Calcul du score de completion
  const calculateScore = (state, results) => {
    let score = 0;
    if (state.workTime > 0) score += 20;
    if (state.restTime >= 10) score += 20;
    if (state.rounds > 0) score += 15;
    if (state.exercises.length > 0) score += 25;
    if (state.name.trim()) score += 10;
    if (results.filter(r => r.type === 'error').length === 0) score += 10;
    return score;
  };

  // 🎨 Styles pour les types de validation
  const getValidationStyle = (type) => {
    const styles = {
      'error': 'bg-red-50 border-red-200 text-red-700',
      'warning': 'bg-orange-50 border-orange-200 text-orange-700',
      'info': 'bg-blue-50 border-blue-200 text-blue-700',
      'success': 'bg-green-50 border-green-200 text-green-700'
    };
    return styles[type] || styles.info;
  };

  const getValidationIcon = (type) => {
    const icons = {
      'error': '❌',
      'warning': '⚠️', 
      'info': 'ℹ️',
      'success': '✅'
    };
    return icons[type] || '📌';
  };

  // 🎯 Mise à jour des valeurs
  const updateConfig = (field, value) => {
    setConfigState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🔍 Demo Validation Workout WA-013.2
        </h1>
        <p className="text-gray-600">
          Test du système de validation temps réel avec <code>useCallback</code> et feedback intelligent
        </p>
      </div>

      {/* État de validation global */}
      <div className="mb-6 p-4 rounded-lg border-2 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">📊 État de validation</h2>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            validationResults.isValid 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {validationResults.isValid ? '✅ Valide' : '❌ Invalide'}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-red-50 rounded">
            <div className="text-2xl font-bold text-red-600">{validationResults.errors.length}</div>
            <div className="text-sm text-red-600">Erreurs</div>
          </div>
          <div className="p-3 bg-orange-50 rounded">
            <div className="text-2xl font-bold text-orange-600">{validationResults.warnings.length}</div>
            <div className="text-sm text-orange-600">Avertissements</div>
          </div>
          <div className="p-3 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">{validationResults.infos.length}</div>
            <div className="text-sm text-blue-600">Infos</div>
          </div>
        </div>

        {/* Score de completion */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Score de completion</span>
            <span className="text-sm text-gray-600">
              {validationResults.summary?.completionScore || 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${validationResults.summary?.completionScore || 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">⚙️ Configuration Workout</h3>
          
          {/* Temps de travail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ⏱️ Temps de travail (secondes)
            </label>
            <input
              type="range"
              min="10"
              max="120"
              value={configState.workTime}
              onChange={(e) => updateConfig('workTime', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-600 mt-1">
              Valeur: {configState.workTime}s
            </div>
          </div>

          {/* Temps de repos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              😴 Temps de repos (secondes)
            </label>
            <input
              type="range"
              min="5"
              max="90"
              value={configState.restTime}
              onChange={(e) => updateConfig('restTime', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-600 mt-1">
              Valeur: {configState.restTime}s
            </div>
          </div>

          {/* Nombre de rounds */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              🔄 Nombre de rounds
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={configState.rounds}
              onChange={(e) => updateConfig('rounds', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-600 mt-1">
              Valeur: {configState.rounds}
            </div>
          </div>

          {/* Nom du workout */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              📝 Nom du workout
            </label>
            <input
              type="text"
              value={configState.name}
              onChange={(e) => updateConfig('name', e.target.value)}
              placeholder="Mon Super Workout"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Simulation ajout exercices */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🏋️‍♀️ Exercices ({configState.exercises.length})
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => updateConfig('exercises', ['push-ups'])}
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                + Ajouter Pompes
              </button>
              <button
                onClick={() => updateConfig('exercises', [])}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Vider
              </button>
            </div>
          </div>
        </div>

        {/* Résultats de validation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">🔍 Résultats de validation</h3>
          
          {validationResults.results.length === 0 ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                <span className="text-green-700 font-medium">
                  Aucun problème détecté !
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {validationResults.results.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${getValidationStyle(result.type)}`}
                >
                  <div className="flex items-start">
                    <span className="mr-3 text-lg">
                      {getValidationIcon(result.type)}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium mb-1">
                        {result.message}
                      </div>
                      {result.suggestion && (
                        <div className="text-sm opacity-80 mb-2">
                          💡 {result.suggestion}
                        </div>
                      )}
                      <div className="flex items-center justify-between text-xs">
                        <span className="bg-black bg-opacity-10 px-2 py-1 rounded">
                          {result.field}
                        </span>
                        <span className="font-mono">
                          P{result.priority} • {result.code}
                        </span>
                      </div>
                      {result.data && (
                        <div className="mt-2 text-xs font-mono bg-black bg-opacity-5 p-2 rounded">
                          {JSON.stringify(result.data)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Indicateurs temps réel */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-3">⚡ Validation temps réel (useCallback optimisé)</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Ratio travail/repos:</strong> {
              configState.restTime > 0 
                ? (configState.workTime / configState.restTime).toFixed(2)
                : 'N/A'
            }
          </div>
          <div>
            <strong>Peut démarrer:</strong> {
              validationResults.canProceed ? '✅ Oui' : '❌ Non'
            }
          </div>
          <div>
            <strong>Durée estimée:</strong> {
              Math.ceil((configState.workTime + configState.restTime) * configState.rounds / 60)
            } min
          </div>
          <div>
            <strong>Problèmes critiques:</strong> {
              validationResults.summary?.criticalIssues || 0
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutConfigView;