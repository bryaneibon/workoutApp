// src/components/views/WorkoutDemoView.jsx
// 🧠 WA-008.5: Démo useReducer avec PropTypes (Clean Code compliance)
// Référence Clean Code: "Separate concerns - UI logic from business logic"

import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody, CardFooter, StatsCard } from '../ui/Card.jsx';
import Button, { StartButton, PauseButton, StopButton, NextButton, ResetButton } from '../ui/Button.jsx';
import ProgressBar, { CircularProgress, WorkoutProgress, TimerProgress } from '../ui/ProgressBar.jsx';

// Imports du business logic
import { 
  workoutReducer, 
  initialWorkoutState,
  getCurrentExercise,
  getProgressPercentage,
  formatTime,
  canStartWorkout,
  canPauseResume,
  getCurrentPhaseTime // 🐛 FIX: Import de la nouvelle fonction
} from '../../reducers/workoutReducer.js';

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
} from '../../actions/workoutActions.js';

import { WORKOUT_PLANS } from '../../data/workoutPlans.js';
import { WORKOUT_STATUS } from '../../constants/workoutStates.js';

/**
 * Messages d'état pour l'UI
 */
const STATUS_MESSAGES = {
  [WORKOUT_STATUS.IDLE]: { text: 'Prêt à commencer', color: 'slate', icon: '⭕' },
  [WORKOUT_STATUS.PREPARING]: { text: 'Préparez-vous !', color: 'yellow', icon: '⚡' },
  [WORKOUT_STATUS.WORKING]: { text: 'C\'est parti !', color: 'green', icon: '💪' },
  [WORKOUT_STATUS.RESTING]: { text: 'Récupération', color: 'blue', icon: '😴' },
  [WORKOUT_STATUS.PAUSED]: { text: 'En pause', color: 'orange', icon: '⏸️' },
  [WORKOUT_STATUS.COMPLETED]: { text: 'Bravo, terminé !', color: 'purple', icon: '🎉' }
};

/**
 * Composant de sélection de workout
 */
const WorkoutSelector = ({ currentPlan, onLoadWorkout }) => (
  <Card variant="outlined">
    <CardHeader 
      title="📋 Sélection du workout"
      description="Choisissez un plan d'entraînement pour tester le reducer"
    />
    <CardBody>
      <div className="grid md:grid-cols-2 gap-4">
        {Object.values(WORKOUT_PLANS).map(plan => (
          <Button
            key={plan.id}
            variant={currentPlan?.id === plan.id ? 'primary' : 'outline'}
            onClick={() => onLoadWorkout(plan.id)}
            className="h-auto p-4 text-left flex-col items-start space-y-2"
          >
            <div className="font-semibold">{plan.name}</div>
            <div className="text-xs opacity-75">{plan.description}</div>
            <div className="flex items-center space-x-4 text-xs">
              <span>🏋️ {plan.exercises.length} exercices</span>
              <span>🔁 {plan.timing.rounds} rounds</span>
              <span>⏱️ {plan.estimatedDuration}min</span>
            </div>
          </Button>
        ))}
      </div>
    </CardBody>
  </Card>
);
WorkoutSelector.propTypes = {
    currentPlan: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        exercises: PropTypes.array.isRequired,
        timing: PropTypes.shape({
            rounds: PropTypes.number.isRequired,
        }),
        estimatedDuration: PropTypes.number,
    }),
    onLoadWorkout: PropTypes.func.isRequired,
};

/**
 * Composant d'affichage de l'état du workout
 */
const WorkoutStatus = ({ workoutState }) => {
  const statusInfo = STATUS_MESSAGES[workoutState.status] || STATUS_MESSAGES[WORKOUT_STATUS.IDLE];
  const currentExercise = getCurrentExercise(workoutState);
  const progressPercentage = getProgressPercentage(workoutState);

  return (
    <Card variant="gradient">
      <CardHeader 
        title="🎯 État du workout"
        action={
          <div className={`px-3 py-1 rounded-full text-sm font-medium bg-${statusInfo.color}-100 text-${statusInfo.color}-800`}>
            {statusInfo.icon} {statusInfo.text}
          </div>
        }
      />
      <CardBody>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Temps restant"
            value={formatTime(workoutState.timeRemaining)}
            icon="⏰"
          />
          <StatsCard
            title="Temps écoulé"
            value={formatTime(workoutState.totalElapsed)}
            icon="⏱️"
          />
          <StatsCard
            title="Exercice actuel"
            value={`${workoutState.currentExerciseIndex + 1}/${workoutState.exercises.length}`}
            icon="🏋️"
          />
          <StatsCard
            title="Round actuel"
            value={`${workoutState.currentRound}/${workoutState.totalRounds}`}
            icon="🔁"
          />
        </div>

        {/* Exercice actuel */}
        {currentExercise && (
          <Card variant="info" className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{currentExercise.images.start}</div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-slate-800">
                  {currentExercise.name}
                </h4>
                <p className="text-slate-600">{currentExercise.muscleGroup}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {currentExercise.difficulty}
                  </span>
                  <span className="text-xs text-slate-500">
                    Durée par défaut: {currentExercise.defaultDuration}s
                  </span>
                </div>
              </div>
              <div className="text-4xl">{currentExercise.images.end}</div>
            </div>
          </Card>
        )}

        {/* Barres de progression */}
        <div className="space-y-4">
          <WorkoutProgress
            completedExercises={workoutState.completedExercises}
            totalExercises={workoutState.totalExercises}
          />
          
          {workoutState.isActive && (
            <TimerProgress
              timeRemaining={workoutState.timeRemaining}
              totalTime={getCurrentPhaseTime(workoutState)} // 🐛 FIX: Utilisation de currentPhaseTime
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
};

// PropTypes pour WorkoutStatus
WorkoutStatus.propTypes = {
  /** État actuel du workout depuis le reducer */
  workoutState: PropTypes.shape({
    status: PropTypes.string.isRequired,
    timeRemaining: PropTypes.number.isRequired,
    totalElapsed: PropTypes.number.isRequired,
    currentExerciseIndex: PropTypes.number.isRequired,
    exercises: PropTypes.array.isRequired,
    currentRound: PropTypes.number.isRequired,
    totalRounds: PropTypes.number.isRequired,
    completedExercises: PropTypes.number.isRequired,
    totalExercises: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool,
    completedExercises: PropTypes.number,
    workTime: PropTypes.number.isRequired,
    restTime: PropTypes.number.isRequired,
    startTime: PropTypes.number.isRequired,
    currentPhaseTime: PropTypes.number // 🐛 FIX: Ajout de currentPhaseTime
  }).isRequired
};

/**
 * Composant de contrôles du workout
 */
const WorkoutControls = ({ workoutState, actions }) => {
  const canStart = canStartWorkout(workoutState);
  const canControlWorkout = canPauseResume(workoutState);
  const canControl = workoutState.status !== WORKOUT_STATUS.IDLE && workoutState.status !== WORKOUT_STATUS.COMPLETED;

  return (
    <Card>
      <CardHeader title="🎮 Contrôles du workout" />
      <CardBody>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <StartButton
            onClick={actions.start}
            disabled={!canStart}
            className="col-span-2 md:col-span-1"
          >
            🚀 Start
          </StartButton>

          <Button
            variant={workoutState.isPaused ? 'success' : 'warning'}
            onClick={actions.togglePause}
            disabled={!canControlWorkout}
          >
            {workoutState.isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </Button>

          <StopButton
            onClick={actions.stop}
            disabled={workoutState.status === WORKOUT_STATUS.IDLE}
          >
            ⏹️ Stop
          </StopButton>

          <NextButton
            onClick={actions.next}
            disabled={!workoutState.isActive}
          >
            ⏭️ Next
          </NextButton>

          <Button
            variant="secondary"
            onClick={actions.updateTimer}
            disabled={!workoutState.isActive}
          >
            ⏰ -1s
          </Button>

          <ResetButton
            onClick={actions.reset}
          >
            🔄 Reset
          </ResetButton>
        </div>
      </CardBody>
    </Card>
  );
};
// PropTypes pour WorkoutControls
WorkoutControls.propTypes = {
  /** État actuel du workout */
  workoutState: PropTypes.shape({
    status: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isPaused: PropTypes.bool.isRequired
  }).isRequired,
  /** Actions disponibles pour contrôler le workout */
  actions: PropTypes.shape({
    start: PropTypes.func.isRequired,
    togglePause: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    updateTimer: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }).isRequired
};

/**
 * Composant principal WorkoutDemoView
 * Clean Code: "Organize around the architecture, not the framework"
 */
const WorkoutDemoView = () => {
  const [workoutState, dispatchWorkout] = useReducer(workoutReducer, initialWorkoutState);

  // 🎯 Actions encapsulées avec gestion d'erreur
  const actions = {
    loadWorkout: (planId) => {
      try {
        const plan = WORKOUT_PLANS[planId];
        if (!plan) throw new Error(`Plan ${planId} introuvable`);
        
        dispatchWorkout(loadWorkoutAction(plan));
        console.log(`📋 Workout chargé:`, plan);
      } catch (error) {
        console.error('❌ Erreur lors du chargement:', error.message);
        alert(`Erreur: ${error.message}`);
      }
    },

    start: () => {
      try {
        dispatchWorkout(safeStartWorkoutAction(workoutState));
        dispatchWorkout(startWorkoutWithLogging(workoutState.workoutPlan));
        console.log('🚀 Workout démarré avec succès');
      } catch (error) {
        console.error('❌ Erreur lors du démarrage:', error.message);
        alert(`Erreur: ${error.message}`);
      }
    },

    togglePause: () => {
      try {
        dispatchWorkout(togglePauseAction(workoutState.isPaused));
        console.log(`⏸️ Workout ${workoutState.isPaused ? 'repris' : 'mis en pause'}`);
      } catch (error) {
        console.error('❌ Erreur toggle pause:', error.message);
      }
    },

    stop: () => {
      dispatchWorkout(stopWorkoutWithLogging(workoutState));
      console.log('⏹️ Workout arrêté');
    },

    next: () => {
      dispatchWorkout(ActionFactory.next());
      console.log('⏭️ Exercice suivant');
    },

    updateTimer: () => {
      dispatchWorkout(ActionFactory.update());
    },

    reset: () => {
      dispatchWorkout(ActionFactory.reset());
      console.log('🔄 Workout réinitialisé');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header informatif */}
      <Card variant="info">
        <CardHeader 
          title="🧠 Démo useReducer - WA-008"
          description="Test du reducer principal avec actions encapsulées et UI moderne"
          icon="🔬"
        />
        <CardBody>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">🚀 Améliorations WA-006 → WA-008</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <ul className="space-y-1">
                <li>✅ <strong>Actions encapsulées</strong> avec error handling</li>
                <li>✅ <strong>UI modulaire</strong> avec composants réutilisables</li>
                <li>✅ <strong>Logging automatique</strong> dans la console</li>
              </ul>
              <ul className="space-y-1">
                <li>✅ <strong>Validation intégrée</strong> (safeStartWorkoutAction)</li>
                <li>✅ <strong>Design system</strong> uniforme</li>
                <li>✅ <strong>Séparation des responsabilités</strong></li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Sélection du workout */}
      <WorkoutSelector 
        currentPlan={workoutState.workoutPlan}
        onLoadWorkout={actions.loadWorkout}
      />

      {/* État du workout */}
      <WorkoutStatus workoutState={workoutState} />

      {/* Contrôles */}
      <WorkoutControls 
        workoutState={workoutState}
        actions={actions}
      />

      {/* Debug et diagnostics */}
      <Card variant="outlined">
        <CardHeader 
          title="🔍 Debug & Diagnostics"
          description="État complet du reducer pour debugging"
        />
        <CardBody>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Résumé de l'état */}
            <div>
              <h4 className="font-medium text-slate-800 mb-3">📊 Résumé de l'état</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>En pause:</span>
                  <span className={workoutState.isPaused ? 'text-yellow-600' : 'text-slate-600'}>
                    {workoutState.isPaused ? '⏸️ Oui' : '▶️ Non'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Progression:</span>
                  <span className="font-medium text-blue-600">
                    {getProgressPercentage(workoutState)}%
                  </span>
                </div>
                {workoutState.startTime && (
                  <div className="flex justify-between">
                    <span>Démarré à:</span>
                    <span className="font-medium text-xs">
                      {new Date(workoutState.startTime).toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions disponibles */}
            <div>
              <h4 className="font-medium text-slate-800 mb-3">🎮 Actions disponibles</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Peut démarrer:</span>
                  <span className={canStartWorkout(workoutState) ? 'text-green-600' : 'text-slate-400'}>
                    {canStartWorkout(workoutState) ? '✅' : '❌'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Peut contrôler:</span>
                  <span className={canPauseResume(workoutState) ? 'text-green-600' : 'text-slate-400'}>
                    {canPauseResume(workoutState) ? '✅' : '❌'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Plan chargé:</span>
                  <span className={workoutState.workoutPlan ? 'text-green-600' : 'text-slate-400'}>
                    {workoutState.workoutPlan ? '✅' : '❌'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* État complet en JSON */}
          <div className="mt-6">
            <h4 className="font-medium text-slate-800 mb-3">🗂️ État complet (JSON)</h4>
            <div className="bg-slate-50 p-4 rounded-lg border overflow-auto max-h-64">
              <pre className="text-xs text-slate-600">
                {JSON.stringify(workoutState, null, 2)}
              </pre>
            </div>
          </div>
        </CardBody>
        
        <CardFooter>
          <div className="flex items-center justify-between w-full text-xs text-slate-500">
            <span>Architecture basée sur Clean Code et Pragmatic Programmer</span>
            <span>Reducer: {Object.keys(workoutState).length} propriétés d'état</span>
          </div>
        </CardFooter>
      </Card>

      {/* Instructions d'utilisation */}
      <Card variant="success">
        <CardHeader 
          title="📖 Guide d'utilisation"
          icon="🎯"
        />
        <CardBody>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-emerald-800 mb-3">🚀 Pour tester le reducer:</h4>
              <ol className="space-y-2 text-sm text-emerald-700">
                <li><strong>1.</strong> Sélectionnez un plan d'entraînement ci-dessus</li>
                <li><strong>2.</strong> Cliquez sur "🚀 Start" pour démarrer</li>
                <li><strong>3.</strong> Utilisez "⏸️ Pause" / "▶️ Resume" pour tester</li>
                <li><strong>4.</strong> Essayez "⏰ -1s" pour voir la progression</li>
                <li><strong>5.</strong> Observez les changements d'état en temps réel</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-semibold text-emerald-800 mb-3">🧪 Tests spéciaux:</h4>
              <ul className="space-y-2 text-sm text-emerald-700">
                <li>• <strong>Error handling:</strong> Essayez Start sans plan chargé</li>
                <li>• <strong>Validation:</strong> Actions désactivées selon l'état</li>
                <li>• <strong>Logging:</strong> Ouvrez la console pour voir les logs</li>
                <li>• <strong>Progression:</strong> Observez les barres en temps réel</li>
                <li>• <strong>State management:</strong> JSON mis à jour automatiquement</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

// 🎯 PropTypes pour WorkoutDemoView (pas de props requises)
WorkoutDemoView.propTypes = {};

export default WorkoutDemoView;