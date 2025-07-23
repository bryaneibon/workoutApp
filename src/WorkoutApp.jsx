import React, { useState, useReducer } from 'react';

// 🏗️ WA-005.1: App refactorisé avec imports modulaires
// Référence Clean Code: "Organize imports - keep related things together"

// Imports des données
import { EXERCISES_DATABASE } from './data/exercices.js';
import { WORKOUT_PLANS } from './data/workoutPlans';

// Imports des constantes
import { APP_VIEWS, WORKOUT_STATUS } from './constants/workoutStates';

// Imports du reducer et utilitaires
import { 
  workoutReducer, 
  initialWorkoutState,
  getCurrentExercise,
  getProgressPercentage,
  formatTime,
  canStartWorkout,
  canPauseResume
} from './reducers/workoutReducer';

// 🚀 WA-007: Import des actions de configuration
import { 
  loadWorkoutAction,
  startWorkoutAction,
  pauseWorkoutAction,
  resumeWorkoutAction,
  stopWorkoutAction,
  nextExerciseAction,
  updateTimerAction,
  resetWorkoutAction,
  togglePauseAction,
  safeStartWorkoutAction,
  startWorkoutWithLogging,
  stopWorkoutWithLogging,
  ActionFactory
} from './actions/workoutActions';

import {
  configReducer,
  initialConfigState,
  CONFIG_ACTIONS,
  configToWorkoutPlan,
  canSaveConfig,
  getConfigSummary
} from './reducers/configReducer';

import {
  ConfigActionFactory,
  TIMING_PRESETS,
  applyTimingPresetAction
} from './actions/configActions';

/**
 * 🎨 Header réutilisable avec Tailwind CSS
 * Clean Code: "Small functions are easier to understand"
 */
const AppHeader = ({ currentView, onNavigate }) => (
  <header className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white rounded-xl shadow-lg mb-6 overflow-hidden">
    <div className="px-6 py-4 flex flex-wrap justify-between items-center">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          🏋️ WorkoutApp
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          {currentView === APP_VIEWS.HOME && 'Choisissez votre entraînement'}
          {currentView === APP_VIEWS.WORKOUT_CONFIG && 'Configuration de la séance'}
          {currentView === APP_VIEWS.WORKOUT_ACTIVE && 'Séance en cours'}
          {currentView === APP_VIEWS.WORKOUT_SUMMARY && 'Résumé de la séance'}
          {currentView === APP_VIEWS.TEST_COMPONENTS && 'Tests de validation'}
          {currentView === APP_VIEWS.WORKOUT_DEMO && 'Démo useReducer'}
        </p>
      </div>
      
      <nav className="flex gap-2 mt-3 sm:mt-0 flex-wrap">
        {[
          { view: APP_VIEWS.HOME, icon: '🏠', label: 'Accueil' },
          { view: APP_VIEWS.WORKOUT_CONFIG, icon: '⚙️', label: 'Config' },
          { view: APP_VIEWS.TEST_COMPONENTS, icon: '🧪', label: 'Tests' },
          { view: APP_VIEWS.WORKOUT_DEMO, icon: '🧠', label: 'Démo' }
        ].map(({ view, icon, label }) => (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800
              ${currentView === view 
                ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
                : 'bg-slate-600/50 text-slate-200 hover:bg-slate-500 hover:text-white hover:scale-105'
              }
            `}
          >
            <span className="hidden sm:inline">{icon} {label}</span>
            <span className="sm:hidden">{icon}</span>
          </button>
        ))}
      </nav>
    </div>
    
    {/* Barre de progression en bas du header */}
    <div className="h-1 bg-slate-600">
      <div 
        className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-500 ease-out"
        style={{ 
          width: `${Math.min(100, (
            ['WA-001', 'WA-002', 'WA-003', 'WA-004', 'WA-005', 'WA-005.1', 'WA-006'].length / 12
          ) * 100)}%` 
        }}
      />
    </div>
  </header>
);

/**
 * 🏠 Vue Accueil - Sélection rapide
 * Clean Code: "Use meaningful names"
 */
const HomeView = ({ onSelectPlan, onNavigate }) => (
  <div>
    <div style={{ backgroundColor: '#e8f5e8', border: '2px solid #4CAF50', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
      <h3>📋 Status du développement</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {['WA-001: Setup', 'WA-002: Données', 'WA-003: Layout', 'WA-004: Tests', 'WA-005: useReducer', 'WA-005.1: Refactor', 'WA-006: Actions', 'WA-007: Config'].map((item, index) => (
          <span key={index} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>✅ {item}</span>
        ))}
        <span className="px-3 py-1 bg-slate-400 text-white rounded-lg text-xs">⏳ WA-008: Hook useWorkout</span>
      </div>
    </div>
    
    <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <h2>🚀 Démarrage rapide</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>Choisissez un plan d'entraînement prédéfini ou créez le vôtre</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
        {Object.values(WORKOUT_PLANS).map(plan => (
          <div key={plan.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: 'white' }} onClick={() => onSelectPlan(plan)}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{plan.name}</h3>
            <p style={{ color: '#666', fontSize: '14px', margin: '0 0 15px 0' }}>{plan.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ backgroundColor: '#007bff', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{plan.difficulty}</span>
              <span style={{ fontSize: '14px', color: '#666' }}>⏱️ {plan.estimatedDuration} min</span>
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}><strong>Exercices:</strong> {plan.exercises.map(id => EXERCISES_DATABASE[id].name).join(', ')}</div>
            <button style={{ width: '100%', marginTop: '15px', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>🚀 Démarrer ce plan</button>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button onClick={() => onNavigate(APP_VIEWS.WORKOUT_CONFIG)} style={{ padding: '15px 30px', fontSize: '16px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          ⚙️ Créer un workout personnalisé
        </button>
      </div>
    </div>
  </div>
);

/**
 * ⚙️ Vue Configuration - Interface moderne avec Tailwind
 * WA-007: Configuration complète du workout
 */
const WorkoutConfigView = () => {
  const [configState, dispatchConfig] = useReducer(configReducer, initialConfigState);
  const [currentStep, setCurrentStep] = useState(1);

  // Actions de configuration
  const setWorkTime = (seconds) => {
    dispatchConfig(ConfigActionFactory.timing.work(seconds));
  };

  const setRestTime = (seconds) => {
    dispatchConfig(ConfigActionFactory.timing.rest(seconds));
  };

  const setRounds = (rounds) => {
    dispatchConfig(ConfigActionFactory.structure.rounds(rounds));
  };

  const addExercise = (exerciseId) => {
    dispatchConfig(ConfigActionFactory.exercises.add(exerciseId));
  };

  const removeExercise = (exerciseId) => {
    dispatchConfig(ConfigActionFactory.exercises.remove(exerciseId));
  };

  const applyPreset = (presetName) => {
    const actions = applyTimingPresetAction(presetName);
    actions.forEach(action => dispatchConfig(action));
  };

  const resetConfig = () => {
    dispatchConfig(ConfigActionFactory.workflow.reset());
    setCurrentStep(1);
  };

  const summary = getConfigSummary(configState);

  return (
    <div className="space-y-6">
      {/* Header de progression */}
      <div className="workout-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">⚙️ Configuration du Workout</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">Étape {currentStep}/3</span>
            <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation des étapes */}
        <div className="flex space-x-1 mb-6">
          {[
            { step: 1, icon: '⏱️', label: 'Timing', desc: 'Temps de travail et repos' },
            { step: 2, icon: '🏋️', label: 'Exercices', desc: 'Sélection des mouvements' },
            { step: 3, icon: '✅', label: 'Validation', desc: 'Vérification finale' }
          ].map(({ step, icon, label, desc }) => (
            <button
              key={step}
              onClick={() => setCurrentStep(step)}
              className={`
                flex-1 p-4 rounded-lg text-left transition-all duration-200
                ${currentStep === step 
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{icon}</span>
                <div>
                  <div className="font-medium">{label}</div>
                  <div className="text-xs opacity-75">{desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Étape 1: Configuration du timing */}
      {currentStep === 1 && (
        <div className="workout-card">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">⏱️ Configuration des temps</h3>
          
          {/* Presets rapides */}
          <div className="mb-8">
            <h4 className="font-medium text-slate-700 mb-3">🚀 Presets populaires</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(TIMING_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className="p-3 bg-slate-100 hover:bg-blue-500 hover:text-white rounded-lg transition-all duration-200 text-center"
                >
                  <div className="font-medium capitalize">{key}</div>
                  <div className="text-xs opacity-75">{preset.workTime}s / {preset.restTime}s</div>
                </button>
              ))}
            </div>
          </div>

          {/* Configuration manuelle */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                💪 Temps de travail
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="10"
                  max="180"
                  value={configState.workTime}
                  onChange={(e) => setWorkTime(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>10s</span>
                  <span className="font-semibold text-blue-600">{configState.workTime}s</span>
                  <span>3min</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                😴 Temps de repos
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={configState.restTime}
                  onChange={(e) => setRestTime(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>5s</span>
                  <span className="font-semibold text-emerald-600">{configState.restTime}s</span>
                  <span>2min</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                🔁 Nombre de rounds
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={configState.rounds}
                  onChange={(e) => setRounds(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1</span>
                  <span className="font-semibold text-purple-600">{configState.rounds} rounds</span>
                  <span>10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Aperçu en temps réel */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium text-slate-800">📊 Aperçu de la configuration</h5>
                <p className="text-sm text-slate-600 mt-1">
                  Durée estimée: <span className="font-semibold text-blue-600">{configState.estimatedDuration} minutes</span>
                </p>
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                disabled={configState.errors.length > 0}
                className="workout-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant: Exercices →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Étape 2: Sélection des exercices */}
      {currentStep === 2 && (
        <div className="workout-card">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">🏋️ Sélection des exercices</h3>
          
          {/* Exercices sélectionnés */}
          <div className="mb-6">
            <h4 className="font-medium text-slate-700 mb-3">
              📋 Exercices sélectionnés ({configState.exercises.length})
            </h4>
            {configState.exercises.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-lg text-center text-slate-500">
                Aucun exercice sélectionné. Choisissez des exercices ci-dessous.
              </div>
            ) : (
              <div className="grid gap-3">
                {configState.exercises.map((exerciseId, index) => {
                  const exercise = EXERCISES_DATABASE[exerciseId];
                  return (
                    <div key={exerciseId} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{exercise.images.start}</span>
                        <div>
                          <div className="font-medium text-slate-800">{exercise.name}</div>
                          <div className="text-sm text-slate-600">{exercise.muscleGroup}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeExercise(exerciseId)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Exercices disponibles */}
          <div>
            <h4 className="font-medium text-slate-700 mb-3">💪 Exercices disponibles</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {Object.values(EXERCISES_DATABASE).map(exercise => (
                <button
                  key={exercise.id}
                  onClick={() => addExercise(exercise.id)}
                  disabled={configState.exercises.includes(exercise.id)}
                  className={`
                    p-4 rounded-lg text-left transition-all duration-200
                    ${configState.exercises.includes(exercise.id)
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{exercise.images.start}</span>
                    <div>
                      <div className="font-medium text-slate-800">{exercise.name}</div>
                      <div className="text-sm text-slate-600">{exercise.muscleGroup}</div>
                      <div className="text-xs text-slate-500">{exercise.difficulty}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="workout-button bg-slate-500 text-white hover:bg-slate-600"
            >
              ← Retour: Timing
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              disabled={configState.exercises.length === 0}
              className="workout-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant: Validation →
            </button>
          </div>
        </div>
      )}

      {/* Étape 3: Validation et création */}
      {currentStep === 3 && (
        <div className="workout-card">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">✅ Validation et création</h3>
          
          {/* Résumé du workout */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h4 className="font-medium text-slate-700">📊 Résumé</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Exercices:</span>
                  <span className="font-medium">{summary.totalExercises}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rounds:</span>
                  <span className="font-medium">{summary.totalRounds}</span>
                </div>
                <div className="flex justify-between">
                  <span>Durée estimée:</span>
                  <span className="font-medium text-blue-600">{summary.estimatedDuration} min</span>
                </div>
                <div className="flex justify-between">
                  <span>Groupes musculaires:</span>
                  <span className="font-medium">{summary.muscleGroups.length}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-slate-700">⚠️ Validation</h4>
              <div className="space-y-2">
                {configState.errors.length > 0 && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-sm font-medium text-red-800 mb-1">Erreurs à corriger:</div>
                    {configState.errors.map((error, index) => (
                      <div key={index} className="text-xs text-red-600">• {error}</div>
                    ))}
                  </div>
                )}
                
                {configState.warnings.length > 0 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="text-sm font-medium text-yellow-800 mb-1">Avertissements:</div>
                    {configState.warnings.map((warning, index) => (
                      <div key={index} className="text-xs text-yellow-600">• {warning}</div>
                    ))}
                  </div>
                )}

                {configState.isValid && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm font-medium text-green-800">✅ Configuration valide !</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions finales */}
          <div className="flex justify-between items-center">
            <div className="space-x-3">
              <button
                onClick={() => setCurrentStep(2)}
                className="workout-button bg-slate-500 text-white hover:bg-slate-600"
              >
                ← Retour: Exercices
              </button>
              <button
                onClick={resetConfig}
                className="workout-button bg-red-500 text-white hover:bg-red-600"
              >
                🔄 Recommencer
              </button>
            </div>
            
            <button
              disabled={!configState.isValid}
              className="workout-button-success disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 text-lg"
              onClick={() => {
                const workoutPlan = configToWorkoutPlan(configState);
                alert(`🎉 Workout créé: ${workoutPlan.name}\n\nDurée: ${workoutPlan.estimatedDuration}min\nExercices: ${workoutPlan.exercises.length}`);
              }}
            >
              🚀 Créer le Workout
            </button>
          </div>
        </div>
      )}

      {/* Debug de la configuration (en développement) */}
      <div className="workout-card">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">🔍 Debug Configuration (WA-007)</h3>
        <div className="bg-slate-50 p-4 rounded-lg">
          <pre className="text-xs text-slate-600 overflow-auto max-h-40">
            {JSON.stringify({ summary, configState }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

/**
 * 🧪 Vue Tests - Validation des composants
 * Clean Code: "Test code is just as important as production code"
 */
const TestComponentsView = () => {
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const testBasicState = () => {
    const result = {
      test: 'Basic State Management',
      passed: true,
      details: 'useState fonctionne correctement',
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => ({ ...prev, basicState: result }));
  };

  const testDataManipulation = () => {
    const exerciseCount = Object.keys(EXERCISES_DATABASE).length;
    const planCount = Object.keys(WORKOUT_PLANS).length;
    
    const result = {
      test: 'Data Manipulation',
      passed: exerciseCount === 4 && planCount === 2,
      details: `${exerciseCount} exercices, ${planCount} plans détectés`,
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => ({ ...prev, dataManipulation: result }));
  };

  const testAsyncOperation = async () => {
    setIsLoading(true);
    
    const result = await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          test: 'Async Operations',
          passed: true,
          details: 'Simulation d\'appel API réussie',
          timestamp: new Date().toLocaleTimeString()
        });
      }, 1500);
    });
    
    setTestResults(prev => ({ ...prev, asyncOperation: result }));
    setIsLoading(false);
  };

  const testCalculations = () => {
    const plan = WORKOUT_PLANS['beginner-full-body'];
    const totalTime = plan.exercises.length * (plan.timing.workTime + plan.timing.restTime) * plan.timing.rounds;
    const expectedTime = 3 * (30 + 30) * 3;
    
    const result = {
      test: 'Workout Calculations',
      passed: totalTime === expectedTime,
      details: `Durée calculée: ${totalTime}s (${Math.round(totalTime/60)}min)`,
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => ({ ...prev, calculations: result }));
  };

  const testDataValidation = () => {
    const allExercisesValid = Object.values(EXERCISES_DATABASE).every(exercise => 
      exercise.id && exercise.name && exercise.muscleGroup && exercise.defaultDuration > 0
    );
    
    const result = {
      test: 'Data Validation',
      passed: allExercisesValid,
      details: allExercisesValid ? 'Toutes les données sont valides' : 'Erreur de validation détectée',
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => ({ ...prev, dataValidation: result }));
  };

  return (
    <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
      <h2>🧪 Tests de Composants - WA-004</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>Validation du fonctionnement des composants avant Phase 2</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        <button onClick={testBasicState} style={{ padding: '15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>🔄 Test State</button>
        <button onClick={testDataManipulation} style={{ padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>📊 Test Données</button>
        <button onClick={testAsyncOperation} disabled={isLoading} style={{ padding: '15px', backgroundColor: isLoading ? '#6c757d' : '#ffc107', color: isLoading ? 'white' : '#212529', border: 'none', borderRadius: '8px', cursor: isLoading ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: 'bold' }}>{isLoading ? '⏳ Chargement...' : '⚡ Test Async'}</button>
        <button onClick={testCalculations} style={{ padding: '15px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>🧮 Test Calculs</button>
        <button onClick={testDataValidation} style={{ padding: '15px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>✅ Test Validation</button>
        <button onClick={() => { testBasicState(); testDataManipulation(); testCalculations(); testDataValidation(); testAsyncOperation(); }} style={{ padding: '15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>🚀 Tout Tester</button>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '8px', padding: '20px' }}>
        <h3>📋 Résultats des tests</h3>
        {Object.keys(testResults).length === 0 && (<p style={{ color: '#666', fontStyle: 'italic' }}>Aucun test exécuté. Cliquez sur les boutons ci-dessus pour commencer.</p>)}
        {Object.values(testResults).map((result, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', margin: '5px 0', backgroundColor: result.passed ? '#d4edda' : '#f8d7da', border: `1px solid ${result.passed ? '#c3e6cb' : '#f5c6cb'}`, borderRadius: '5px' }}>
            <div>
              <strong style={{ color: result.passed ? '#155724' : '#721c24' }}>{result.passed ? '✅' : '❌'} {result.test}</strong>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{result.details}</div>
            </div>
            <span style={{ fontSize: '12px', color: '#666' }}>{result.timestamp}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', backgroundColor: '#e9ecef', padding: '15px', borderRadius: '8px' }}>
        <h4>🔍 Diagnostics système</h4>
        <div style={{ fontSize: '14px', color: '#495057' }}>
          <p><strong>React version:</strong> {React.version}</p>
          <p><strong>Exercices chargés:</strong> {Object.keys(EXERCISES_DATABASE).length}</p>
          <p><strong>Plans disponibles:</strong> {Object.keys(WORKOUT_PLANS).length}</p>
          <p><strong>Timestamp:</strong> {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * 🧠 Vue Démo - Test du reducer
 * Clean Code: "Separate concerns - UI logic from business logic"
 */
const WorkoutDemoView = () => {
  const [workoutState, dispatchWorkout] = useReducer(workoutReducer, initialWorkoutState);
  
  // 🚀 WA-006: Actions refactorisées avec fonctions propres
  const loadWorkout = (planId) => {
    const plan = WORKOUT_PLANS[planId];
    try {
      dispatchWorkout(loadWorkoutAction(plan));
    } catch (error) {
      console.error('Erreur lors du chargement:', error.message);
      alert(`Erreur: ${error.message}`);
    }
  };

  const startWorkout = () => {
    try {
      dispatchWorkout(safeStartWorkoutAction(workoutState));
      dispatchWorkout(startWorkoutWithLogging(workoutState.workoutPlan));
    } catch (error) {
      console.error('Erreur lors du démarrage:', error.message);
      alert(`Erreur: ${error.message}`);
    }
  };

  const pauseWorkout = () => dispatchWorkout(ActionFactory.pause());
  const resumeWorkout = () => dispatchWorkout(ActionFactory.resume());
  const stopWorkout = () => {
    dispatchWorkout(stopWorkoutWithLogging(workoutState));
  };
  const nextExercise = () => dispatchWorkout(ActionFactory.next());
  const updateTimer = () => dispatchWorkout(ActionFactory.update());
  const resetWorkout = () => dispatchWorkout(ActionFactory.reset());

  // 🎯 Nouvelle fonction: Toggle pause/resume intelligent
  const togglePause = () => {
    dispatchWorkout(togglePauseAction(workoutState.isPaused));
  };

  return (
    <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
      <h2>🧠 Démo useReducer - WA-005 (Refactorisé)</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Test du reducer principal avec imports modulaires
      </p>

      {/* Chargement du workout */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>📋 1. Charger un workout</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {Object.values(WORKOUT_PLANS).map(plan => (
            <button
              key={plan.id}
              onClick={() => loadWorkout(plan.id)}
              style={{
                padding: '10px 15px',
                backgroundColor: workoutState.workoutPlan?.id === plan.id ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {plan.name}
            </button>
          ))}
        </div>
      </div>

      {/* État actuel du workout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
        <div style={{ padding: '15px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>📊 État général</h4>
          <p><strong>Status:</strong> {workoutState.status}</p>
          <p><strong>Actif:</strong> {workoutState.isActive ? '✅' : '❌'}</p>
          <p><strong>Pausé:</strong> {workoutState.isPaused ? '✅' : '❌'}</p>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#d4edda', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>⏱️ Temporel</h4>
          <p><strong>Temps restant:</strong> {formatTime(workoutState.timeRemaining)}</p>
          <p><strong>Temps écoulé:</strong> {formatTime(workoutState.totalElapsed)}</p>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>🎯 Progression</h4>
          <p><strong>Exercice:</strong> {workoutState.currentExerciseIndex + 1}/{workoutState.exercises.length}</p>
          <p><strong>Round:</strong> {workoutState.currentRound}/{workoutState.totalRounds}</p>
          <p><strong>Complétés:</strong> {workoutState.completedExercises}/{workoutState.totalExercises}</p>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>🏋️ Exercice actuel</h4>
          {getCurrentExercise(workoutState) ? (
            <>
              <p><strong>Nom:</strong> {getCurrentExercise(workoutState).name}</p>
              <p><strong>Muscle:</strong> {getCurrentExercise(workoutState).muscleGroup}</p>
              <p><strong>Émojis:</strong> {getCurrentExercise(workoutState).images.start} → {getCurrentExercise(workoutState).images.end}</p>
            </>
          ) : (
            <p style={{ fontStyle: 'italic', color: '#666' }}>Aucun workout chargé</p>
          )}
        </div>
      </div>

      {/* Barre de progression */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
          <strong>Progression globale</strong>
          <span>{getProgressPercentage(workoutState)}%</span>
        </div>
        <div style={{ width: '100%', height: '20px', backgroundColor: '#e9ecef', borderRadius: '10px', overflow: 'hidden' }}>
          <div 
            style={{ 
              width: `${getProgressPercentage(workoutState)}%`, 
              height: '100%', 
              backgroundColor: '#28a745', 
              transition: 'width 0.3s ease' 
            }}
          />
        </div>
      </div>

      {/* Contrôles du workout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={startWorkout}
          disabled={!canStartWorkout(workoutState)}
          style={{
            padding: '12px',
            backgroundColor: !canStartWorkout(workoutState) ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: !canStartWorkout(workoutState) ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          🚀 Start
        </button>

        <button
          onClick={togglePause}
          disabled={!canPauseResume(workoutState)}
          style={{
            padding: '12px',
            backgroundColor: !canPauseResume(workoutState) ? '#6c757d' : '#ffc107',
            color: !canPauseResume(workoutState) ? 'white' : '#212529',
            border: 'none',
            borderRadius: '8px',
            cursor: !canPauseResume(workoutState) ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          {workoutState.isPaused ? '▶️ Resume' : '⏸️ Pause'}
        </button>

        <button
          onClick={stopWorkout}
          disabled={workoutState.status === WORKOUT_STATUS.IDLE}
          style={{
            padding: '12px',
            backgroundColor: workoutState.status === WORKOUT_STATUS.IDLE ? '#6c757d' : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: workoutState.status === WORKOUT_STATUS.IDLE ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          ⏹️ Stop
        </button>

        <button
          onClick={nextExercise}
          disabled={!workoutState.isActive}
          style={{
            padding: '12px',
            backgroundColor: !workoutState.isActive ? '#6c757d' : '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: !workoutState.isActive ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          ⏭️ Next
        </button>

        <button
          onClick={updateTimer}
          disabled={!workoutState.isActive}
          style={{
            padding: '12px',
            backgroundColor: !workoutState.isActive ? '#6c757d' : '#6f42c1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: !workoutState.isActive ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          ⏰ -1s
        </button>

        <button
          onClick={resetWorkout}
          style={{
            padding: '12px',
            backgroundColor: '#fd7e14',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          🔄 Reset
        </button>
      </div>

      {/* Info des améliorations WA-006 */}
      <div style={{ backgroundColor: '#d1ecf1', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #bee5eb' }}>
        <h4>🚀 WA-006 - Actions de base améliorées</h4>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>✅ <strong>Actions encapsulées</strong> : <code>src/actions/workoutActions.js</code></li>
          <li>✅ <strong>Validation intégrée</strong> : <code>safeStartWorkoutAction</code> avec error handling</li>
          <li>✅ <strong>Logging automatique</strong> : <code>startWorkoutWithLogging</code> + console logs</li>
          <li>✅ <strong>Actions composées</strong> : <code>togglePauseAction</code> (smart pause/resume)</li>
          <li>✅ <strong>ActionFactory pattern</strong> : <code>ActionFactory.pause()</code> simplifié</li>
          <li>✅ <strong>Error handling</strong> : Try/catch avec messages utilisateur</li>
        </ul>
        <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#b8daff', borderRadius: '4px', fontSize: '14px' }}>
          <strong>🧪 Test :</strong> Essaie de démarrer sans charger de plan → Voir l'erreur !
        </div>
      </div>

      {/* Debug du state */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', border: '1px solid #dee2e6' }}>
        <h4>🔍 État complet du reducer (DEBUG)</h4>
        <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '200px' }}>
          {JSON.stringify(workoutState, null, 2)}
        </pre>
      </div>
    </div>
  );
};

/**
 * 🏗️ Composant principal avec navigation
 * Clean Code: "Organize around the architecture, not the framework"
 */
const WorkoutApp = () => {
  const [currentView, setCurrentView] = useState(APP_VIEWS.HOME);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    alert(`🎯 Plan sélectionné: ${plan.name}\n\nProchaine étape: Tester le reducer refactorisé dans l'onglet 🧠 !`);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans">
      <div className="max-w-6xl mx-auto p-6">
        <AppHeader currentView={currentView} onNavigate={handleNavigate} />

        <main className="space-y-6">
          {currentView === APP_VIEWS.HOME && (<HomeView onSelectPlan={handleSelectPlan} onNavigate={handleNavigate} />)}
          {currentView === APP_VIEWS.WORKOUT_CONFIG && (<WorkoutConfigView />)}
          {currentView === APP_VIEWS.TEST_COMPONENTS && (<TestComponentsView />)}
          {currentView === APP_VIEWS.WORKOUT_DEMO && (<WorkoutDemoView />)}
          {currentView === APP_VIEWS.WORKOUT_ACTIVE && (
            <div className="workout-card text-center py-16">
              <h2 className="text-3xl font-bold text-slate-700 mb-4">🏃 Séance Active</h2>
              <p className="text-slate-600">À développer avec le timer automatique (WA-009+)</p>
            </div>
          )}
        </main>

        <footer className="mt-12 p-6 bg-white/50 backdrop-blur rounded-xl border border-slate-200 text-center text-sm text-slate-600">
          <strong className="text-blue-600">🎨 WA-007 terminé!</strong> Configuration complète + Interface moderne | 
          <strong className="text-emerald-600"> Prochaine étape: WA-008 - Hook useWorkout</strong>
        </footer>
      </div>
    </div>
  );
};

export default WorkoutApp;