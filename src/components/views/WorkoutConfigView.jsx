// src/components/views/WorkoutConfigView.jsx
// ⚙️ WA-008.5: Interface de configuration avec PropTypes (Clean Code compliance)
// Référence Clean Code: "Use meaningful names" + "Functions should be small"

import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody, CardFooter, ExerciseCard } from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import /* ProgressBar, */ { SteppedProgress } from '../ui/ProgressBar.jsx';

// Import des reducers et actions
import {
  configReducer,
  initialConfigState,
  configToWorkoutPlan,
//   canSaveConfig,
  getConfigSummary
} from '../../reducers/configReducer.js';

import {
  ConfigActionFactory,
  TIMING_PRESETS,
  applyTimingPresetAction
} from '../../actions/configActions.js';

import { EXERCISES_DATABASE } from '../../data/exercices.js';

/**
 * Configuration des étapes du wizard
 */
const CONFIG_STEPS = [
  {
    id: 1,
    label: 'Timing',
    description: 'Temps de travail et repos',
    icon: '⏱️'
  },
  {
    id: 2,
    label: 'Exercices',
    description: 'Sélection des mouvements',
    icon: '🏋️'
  },
  {
    id: 3,
    label: 'Validation',
    description: 'Vérification finale',
    icon: '✅'
  }
];

/**
 * Composant de configuration du timing (Étape 1)
 */
const TimingConfiguration = ({ configState, dispatch, onNext }) => {
  // 🎯 Validation spécifique au timing (sans exercices)
  const validateTimingOnly = (state) => {
    const errors = [];
    
    if (state.workTime < 10) errors.push('Temps de travail minimum: 10s');
    if (state.workTime > 180) errors.push('Temps de travail maximum: 180s');
    if (state.restTime < 5) errors.push('Temps de repos minimum: 5s');
    if (state.restTime > 120) errors.push('Temps de repos maximum: 120s');
    if (state.rounds < 1) errors.push('Au moins 1 round requis');
    if (state.rounds > 10) errors.push('Maximum 10 rounds');
    
    return errors;
  };

  const applyPreset = (presetName) => {
    const actions = applyTimingPresetAction(presetName);
    actions.forEach(action => dispatch(action));
  };

  return (
    <Card variant="gradient">
      <CardHeader 
        title="⏱️ Configuration des temps"
        description="Définissez les durées de travail, repos et nombre de rounds"
      />
      <CardBody>
        {/* Presets rapides */}
        <div className="mb-8">
          <h4 className="font-medium text-slate-700 mb-4">🚀 Presets populaires</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(TIMING_PRESETS).map(([key, preset]) => (
              <Button
                key={key}
                variant="outline"
                onClick={() => applyPreset(key)}
                className="h-auto p-3 flex-col space-y-1 hover:bg-blue-500 hover:text-white transition-all"
              >
                <div className="font-medium capitalize text-sm">{key}</div>
                <div className="text-xs opacity-75">
                  {preset.workTime}s / {preset.restTime}s
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Configuration manuelle */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Temps de travail */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              💪 Temps de travail
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="10"
                max="180"
                value={configState.workTime}
                onChange={(e) => dispatch(ConfigActionFactory.timing.work(parseInt(e.target.value)))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(configState.workTime - 10) / 170 * 100}%, #e2e8f0 ${(configState.workTime - 10) / 170 * 100}%, #e2e8f0 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>10s</span>
                <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {configState.workTime}s
                </span>
                <span>3min</span>
              </div>
            </div>
          </div>

          {/* Temps de repos */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              😴 Temps de repos
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="5"
                max="120"
                value={configState.restTime}
                onChange={(e) => dispatch(ConfigActionFactory.timing.rest(parseInt(e.target.value)))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${(configState.restTime - 5) / 115 * 100}%, #e2e8f0 ${(configState.restTime - 5) / 115 * 100}%, #e2e8f0 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>5s</span>
                <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                  {configState.restTime}s
                </span>
                <span>2min</span>
              </div>
            </div>
          </div>

          {/* Nombre de rounds */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              🔁 Nombre de rounds
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="10"
                value={configState.rounds}
                onChange={(e) => dispatch(ConfigActionFactory.structure.rounds(parseInt(e.target.value)))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(configState.rounds - 1) / 9 * 100}%, #e2e8f0 ${(configState.rounds - 1) / 9 * 100}%, #e2e8f0 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>1</span>
                <span className="font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  {configState.rounds} round{configState.rounds > 1 ? 's' : ''}
                </span>
                <span>10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Aperçu en temps réel */}
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-slate-800">📊 Aperçu de la configuration</h5>
              <p className="text-sm text-slate-600 mt-1">
                Durée estimée: <span className="font-semibold text-blue-600">{configState.estimatedDuration} minutes</span>
              </p>
              <div className="text-xs text-slate-500 mt-1">
                {configState.exercises.length} exercice{configState.exercises.length !== 1 ? 's' : ''} × {configState.rounds} round{configState.rounds > 1 ? 's' : ''}
              </div>
              {/* Indicateur de validation pour le timing */}
              {validateTimingOnly(configState).length > 0 && (
                <div className="text-xs text-red-600 mt-2">
                  ⚠️ {validateTimingOnly(configState).length} paramètre{validateTimingOnly(configState).length > 1 ? 's' : ''} invalide{validateTimingOnly(configState).length > 1 ? 's' : ''}
                </div>
              )}
              {validateTimingOnly(configState).length === 0 && (
                <div className="text-xs text-green-600 mt-2">
                  ✅ Paramètres de timing valides
                </div>
              )}
            </div>
            <Button
              variant="primary"
              onClick={onNext}
              disabled={validateTimingOnly(configState).length > 0}
              className={`transition-all duration-200 ${
                validateTimingOnly(configState).length > 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-105'
              }`}
            >
              {validateTimingOnly(configState).length > 0 ? (
                <>🚫 Paramètres invalides</>
              ) : (
                <>Suivant: Exercices →</>
              )}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
/**
 * Composant de sélection des exercices (Étape 2)
 */
const ExerciseSelection = ({ configState, dispatch, onNext, onPrevious }) => {
  const addExercise = (exerciseId) => {
    dispatch(ConfigActionFactory.exercises.add(exerciseId));
  };

  const removeExercise = (exerciseId) => {
    dispatch(ConfigActionFactory.exercises.remove(exerciseId));
  };

  // Groupement des exercices par muscle
  const exercisesByMuscle = Object.values(EXERCISES_DATABASE).reduce((acc, exercise) => {
    const muscle = exercise.muscleGroup;
    if (!acc[muscle]) acc[muscle] = [];
    acc[muscle].push(exercise);
    return acc;
  }, {});

  return (
    <Card variant="gradient">
      <CardHeader 
        title="🏋️ Sélection des exercices"
        description="Choisissez les exercices pour votre séance"
      />
      <CardBody>
        {/* Exercices sélectionnés */}
        <div className="mb-6">
          <h4 className="font-medium text-slate-700 mb-3">
            📋 Exercices sélectionnés ({configState.exercises.length})
          </h4>
          {configState.exercises.length === 0 ? (
            <div className="p-6 bg-slate-50 rounded-lg text-center text-slate-500 border-2 border-dashed border-slate-300">
              <div className="text-2xl mb-2">🎯</div>
              <p>Aucun exercice sélectionné</p>
              <p className="text-sm mt-1">Choisissez des exercices ci-dessous pour commencer</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {configState.exercises.map((exerciseId, index) => {
                const exercise = EXERCISES_DATABASE[exerciseId];
                return (
                  <div key={exerciseId} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {index + 1}
                      </span>
                      <span className="text-2xl">{exercise.images.start}</span>
                      <div>
                        <div className="font-medium text-slate-800">{exercise.name}</div>
                        <div className="text-sm text-slate-600">{exercise.muscleGroup}</div>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeExercise(exerciseId)}
                      className="px-3 py-1"
                    >
                      ✕ Retirer
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Exercices disponibles par groupe musculaire */}
        <div className="space-y-6">
          <h4 className="font-medium text-slate-700">💪 Exercices disponibles</h4>
          {Object.entries(exercisesByMuscle).map(([muscleGroup, exercises]) => (
            <div key={muscleGroup}>
              <h5 className="text-sm font-medium text-slate-600 mb-3 uppercase tracking-wide">
                {muscleGroup}
              </h5>
              <div className="grid md:grid-cols-2 gap-3">
                {exercises.map(exercise => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    selected={configState.exercises.includes(exercise.id)}
                    onSelect={addExercise}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
      
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            onClick={onPrevious}
          >
            ← Retour: Timing
          </Button>
          <Button
            variant="primary"
            onClick={onNext}
            disabled={configState.exercises.length === 0}
            className="disabled:opacity-50"
          >
            Suivant: Validation →
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

/**
 * Composant de validation finale (Étape 3)
 */
const ValidationStep = ({ configState, dispatch, onPrevious, onCreateWorkout }) => {
  const summary = getConfigSummary(configState);

  const resetConfig = () => {
    dispatch(ConfigActionFactory.workflow.reset());
  };

  return (
    <Card variant="gradient">
      <CardHeader 
        title="✅ Validation et création"
        description="Vérifiez votre configuration avant de créer le workout"
      />
      <CardBody>
        {/* Résumé du workout */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h4 className="font-medium text-slate-700">📊 Résumé du workout</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="flex items-center space-x-2">
                  <span>🏋️</span>
                  <span>Exercices:</span>
                </span>
                <span className="font-medium">{summary.totalExercises}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="flex items-center space-x-2">
                  <span>🔁</span>
                  <span>Rounds:</span>
                </span>
                <span className="font-medium">{summary.totalRounds}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="flex items-center space-x-2">
                  <span>⏱️</span>
                  <span>Durée estimée:</span>
                </span>
                <span className="font-medium text-blue-600">{summary.estimatedDuration} min</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="flex items-center space-x-2">
                  <span>💪</span>
                  <span>Groupes musculaires:</span>
                </span>
                <span className="font-medium">{summary.muscleGroups.length}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-slate-700">⚠️ État de validation</h4>
            <div className="space-y-3">
              {/* Erreurs */}
              {configState.errors.length > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-sm font-medium text-red-800 mb-2">
                    🚨 Erreurs à corriger:
                  </div>
                  {configState.errors.map((error, index) => (
                    <div key={index} className="text-xs text-red-600 mb-1">
                      • {error}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Avertissements */}
              {configState.warnings.length > 0 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-sm font-medium text-yellow-800 mb-2">
                    ⚠️ Avertissements:
                  </div>
                  {configState.warnings.map((warning, index) => (
                    <div key={index} className="text-xs text-yellow-600 mb-1">
                      • {warning}
                    </div>
                  ))}
                </div>
              )}

              {/* Validation réussie */}
              {configState.isValid && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm font-medium text-green-800 flex items-center space-x-2">
                    <span>✅</span>
                    <span>Configuration valide !</span>
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    Votre workout est prêt à être créé
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Aperçu des exercices */}
        <div className="mb-6">
          <h4 className="font-medium text-slate-700 mb-3">🎯 Aperçu de la séquence</h4>
          <div className="bg-slate-50 p-4 rounded-lg border">
            <div className="flex flex-wrap gap-2">
              {configState.exercises.map((exerciseId, index) => {
                const exercise = EXERCISES_DATABASE[exerciseId];
                return (
                  <div key={`${exerciseId}-${index}`} className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-slate-200">
                    <span className="text-xs font-medium text-slate-500">#{index + 1}</span>
                    <span className="text-lg">{exercise.images.start}</span>
                    <span className="text-sm font-medium">{exercise.name}</span>
                  </div>
                );
              })}
            </div>
            <div className="text-xs text-slate-500 mt-3">
              Séquence répétée {configState.rounds} fois • {configState.workTime}s travail / {configState.restTime}s repos
            </div>
          </div>
        </div>
      </CardBody>

      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <div className="space-x-3">
            <Button
              variant="outline"
              onClick={onPrevious}
            >
              ← Retour: Exercices
            </Button>
            <Button
              variant="danger"
              onClick={resetConfig}
            >
              🔄 Recommencer
            </Button>
          </div>
          
          <Button
            variant="success"
            size="lg"
            disabled={!configState.isValid}
            onClick={onCreateWorkout}
            className="disabled:opacity-50 px-8 py-3"
          >
            🚀 Créer le Workout
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

/**
 * Composant principal WorkoutConfigView
 * Pragmatic Programmer: "Orthogonality - components should be independent"
 */
const WorkoutConfigView = () => {
  const [configState, dispatchConfig] = useReducer(configReducer, initialConfigState);
  const [currentStep, setCurrentStep] = useState(1);

  const handleCreateWorkout = () => {
    const workoutPlan = configToWorkoutPlan(configState);
    
    // Simulation de création réussie
    alert(`🎉 Workout créé avec succès !

📋 Nom: ${workoutPlan.name}
⏱️ Durée: ${workoutPlan.estimatedDuration} minutes  
🏋️ Exercices: ${workoutPlan.exercises.length}
🔁 Rounds: ${workoutPlan.timing.rounds}

Le workout est maintenant disponible dans vos plans.`);
    
    console.log('🎯 Workout créé:', workoutPlan);
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 3) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec navigation par étapes */}
      <Card variant="outlined">
        <CardHeader 
          title="⚙️ Configuration du Workout"
          description="Créez votre entraînement personnalisé en 3 étapes"
        />
        <CardBody>
          <SteppedProgress
            currentStep={currentStep}
            totalSteps={CONFIG_STEPS.length}
            steps={CONFIG_STEPS}
            variant="gradient"
          />
        </CardBody>
      </Card>

      {/* Contenu de l'étape actuelle */}
      {currentStep === 1 && (
        <TimingConfiguration
          configState={configState}
          dispatch={dispatchConfig}
          onNext={() => goToStep(2)}
        />
      )}

      {currentStep === 2 && (
        <ExerciseSelection
          configState={configState}
          dispatch={dispatchConfig}
          onNext={() => goToStep(3)}
          onPrevious={() => goToStep(1)}
        />
      )}

      {currentStep === 3 && (
        <ValidationStep
          configState={configState}
          dispatch={dispatchConfig}
          onPrevious={() => goToStep(2)}
          onCreateWorkout={handleCreateWorkout}
        />
      )}

      {/* Debug panel (optionnel en dev) */}
      {import.meta.env.MODE === 'development' && (
        <Card variant="outlined">
          <CardHeader title="🔍 Debug Configuration (Dev only)" />
          <CardBody>
            <div className="bg-slate-50 p-4 rounded-lg">
              <pre className="text-xs text-slate-600 overflow-auto max-h-40">
                {JSON.stringify({ 
                  step: currentStep,
                  summary: getConfigSummary(configState),
                  state: configState 
                }, null, 2)}
              </pre>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

// 🎯 PropTypes pour WorkoutConfigView (pas de props requises)
WorkoutConfigView.propTypes = {};
// PropTypes pour ValidationStep
ValidationStep.propTypes = {
  /** État de configuration actuel */
  configState: PropTypes.shape({
    exercises: PropTypes.array.isRequired,
    rounds: PropTypes.number.isRequired,
    workTime: PropTypes.number.isRequired,
    restTime: PropTypes.number.isRequired,
    errors: PropTypes.array.isRequired,
    warnings: PropTypes.array.isRequired,
    isValid: PropTypes.bool.isRequired
  }).isRequired,
  /** Fonction dispatch du reducer */
  dispatch: PropTypes.func.isRequired,
  /** Fonction pour revenir à l'étape précédente */
  onPrevious: PropTypes.func.isRequired,
  /** Fonction pour créer le workout */
  onCreateWorkout: PropTypes.func.isRequired
};

// PropTypes pour ExerciseSelection
ExerciseSelection.propTypes = {
  /** État de configuration actuel */
  configState: PropTypes.shape({
    exercises: PropTypes.array.isRequired
  }).isRequired,
  /** Fonction dispatch du reducer */
  dispatch: PropTypes.func.isRequired,
  /** Fonction pour passer à l'étape suivante */
  onNext: PropTypes.func.isRequired,
  /** Fonction pour revenir à l'étape précédente */
  onPrevious: PropTypes.func.isRequired
};

// PropTypes pour TimingConfiguration
TimingConfiguration.propTypes = {
  /** État de configuration actuel */
  configState: PropTypes.shape({
    workTime: PropTypes.number.isRequired,
    restTime: PropTypes.number.isRequired,
    rounds: PropTypes.number.isRequired,
    exercises: PropTypes.array.isRequired,
    estimatedDuration: PropTypes.number.isRequired,
    errors: PropTypes.array.isRequired
  }).isRequired,
  /** Fonction dispatch du reducer */
  dispatch: PropTypes.func.isRequired,
  /** Fonction pour passer à l'étape suivante */
  onNext: PropTypes.func.isRequired
};


export default WorkoutConfigView;