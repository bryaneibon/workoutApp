// src/components/views/WorkoutDemoView.jsx
// 🧠 WA-008: Démo useReducer REFACTORISÉ avec useWorkout Hook
// Référence Clean Code: "Separate concerns - UI logic from business logic"

import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody, CardFooter, StatsCard } from '../ui/Card.jsx';
import Button, { StartButton, PauseButton, StopButton, NextButton, ResetButton } from '../ui/Button.jsx';
import ProgressBar, { CircularProgress, WorkoutProgress, TimerProgress } from '../ui/ProgressBar.jsx';

// 🚀 WA-008: Import du nouveau hook useWorkout
import { useWorkout } from '../../hooks/useWorkout.js';
import { WORKOUT_PLANS } from '../../data/workoutPlans.js';

/**
 * Composant de sélection de workout
 */
const WorkoutSelector = ({ currentPlan, onLoadWorkout }) => (
  <Card variant="outlined">
    <CardHeader 
      title="📋 Sélection du workout"
      description="Choisissez un plan d'entraînement pour tester le hook useWorkout"
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

// PropTypes pour WorkoutSelector
WorkoutSelector.propTypes = {
  currentPlan: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  onLoadWorkout: PropTypes.func.isRequired
};

/**
 * Composant d'affichage de l'état du workout - SIMPLIFIÉ avec le hook
 */
const WorkoutStatus = ({ workout }) => {
  const { state, computed } = workout;
  
  return (
    <Card variant="gradient">
      <CardHeader 
        title="🎯 État du workout"
        action={
          <div className={`px-3 py-1 rounded-full text-sm font-medium bg-${computed.statusInfo.color}-100 text-${computed.statusInfo.color}-800`}>
            {computed.statusInfo.icon} {computed.statusInfo.text}
          </div>
        }
      />
      <CardBody>
        {/* Stats Cards simplifiées */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Temps restant"
            value={computed.formattedTimeRemaining}
            icon="⏰"
          />
          <StatsCard
            title="Temps écoulé"
            value={computed.formattedTotalElapsed}
            icon="⏱️"
          />
          <StatsCard
            title="Exercice actuel"
            value={`${state.currentExerciseIndex + 1}/${state.exercises.length}`}
            icon="🏋️"
          />
          <StatsCard
            title="Round actuel"
            value={`${state.currentRound}/${state.totalRounds}`}
            icon="🔁"
          />
        </div>

        {/* Exercice actuel */}
        {computed.currentExercise && (
          <Card variant="info" className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{computed.currentExercise.images.start}</div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-slate-800">
                  {computed.currentExercise.name}
                </h4>
                <p className="text-slate-600">{computed.currentExercise.muscleGroup}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {computed.currentExercise.difficulty}
                  </span>
                  <span className="text-xs text-slate-500">
                    Durée par défaut: {computed.currentExercise.defaultDuration}s
                  </span>
                </div>
              </div>
              <div className="text-4xl">{computed.currentExercise.images.end}</div>
            </div>
          </Card>
        )}

        {/* Barres de progression - SIMPLIFIÉES */}
        <div className="space-y-4">
          <WorkoutProgress
            completedExercises={state.completedExercises}
            totalExercises={state.totalExercises}
          />
          
          {state.isActive && (
            <TimerProgress
              timeRemaining={state.timeRemaining}
              totalTime={computed.currentPhaseTime}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
};

// PropTypes pour WorkoutStatus
WorkoutStatus.propTypes = {
  workout: PropTypes.shape({
    state: PropTypes.object.isRequired,
    computed: PropTypes.object.isRequired
  }).isRequired
};

/**
 * Composant de contrôles du workout - ULTRA-SIMPLIFIÉ
 */
const WorkoutControls = ({ workout }) => {
  const { actions, capabilities } = workout;

  return (
    <Card>
      <CardHeader title="🎮 Contrôles du workout" />
      <CardBody>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          <StartButton
            onClick={actions.startWorkout}
            disabled={!capabilities.canStart}
            className="col-span-2 md:col-span-1"
          >
            🚀 Start
          </StartButton>

          <Button
            variant={capabilities.canResume ? 'success' : 'warning'}
            onClick={actions.togglePause}
            disabled={!capabilities.canPause && !capabilities.canResume}
          >
            {capabilities.canResume ? '▶️ Resume' : '⏸️ Pause'}
          </Button>

          <StopButton
            onClick={actions.stopWorkout}
            disabled={!capabilities.canStop}
          >
            ⏹️ Stop
          </StopButton>

          <NextButton
            onClick={actions.nextExercise}
            disabled={!capabilities.canNext}
          >
            ⏭️ Next
          </NextButton>

          <Button
            variant="secondary"
            onClick={actions.updateTimer}
            disabled={!capabilities.canNext}
          >
            ⏰ -1s
          </Button>

          <ResetButton
            onClick={actions.resetWorkout}
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
  workout: PropTypes.shape({
    actions: PropTypes.object.isRequired,
    capabilities: PropTypes.object.isRequired
  }).isRequired
};

/**
 * Composant principal WorkoutDemoView - RÉVOLUTIONNÉ !
 * Clean Code: "Main should be minimal and delegate to other functions"
 */
const WorkoutDemoView = () => {
  // 🚀 WA-008: Une seule ligne pour avoir TOUTE la logique !
  const workout = useWorkout();

  return (
    <div className="space-y-6">
      {/* Header informatif */}
      <Card variant="success">
        <CardHeader 
          title="🚀 Démo useWorkout Hook - WA-008 COMPLETED!"
          description="Hook personnalisé qui encapsule toute la logique métier"
          icon="🎯"
        />
        <CardBody>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-2">🎉 Révolution architecturale!</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-emerald-700">
              <ul className="space-y-1">
                <li>✅ <strong>useWorkout hook:</strong> Logique encapsulée</li>
                <li>✅ <strong>useCallback:</strong> Actions optimisées</li>
                <li>✅ <strong>useMemo:</strong> Calculs mémorisés</li>
              </ul>
              <ul className="space-y-1">
                <li>✅ <strong>Interface clean:</strong> Une ligne d'import</li>
                <li>✅ <strong>Réutilisable:</strong> Hook dans autres vues</li>
                <li>✅ <strong>Testable:</strong> Logique isolée du UI</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Sélection du workout */}
      <WorkoutSelector 
        currentPlan={workout.state.workoutPlan}
        onLoadWorkout={(planId) => {
          const result = workout.actions.loadWorkout(planId);
          if (!result.success) {
            alert(`Erreur: ${result.error}`);
          }
        }}
      />

      {/* État du workout */}
      <WorkoutStatus workout={workout} />

      {/* Contrôles */}
      <WorkoutControls workout={workout} />

      {/* Debug et diagnostics - SIMPLIFIÉ */}
      <Card variant="outlined">
        <CardHeader 
          title="🔍 Debug Hook useWorkout"
          description="État complet du hook pour debugging"
        />
        <CardBody>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Résumé de l'état */}
            <div>
              <h4 className="font-medium text-slate-800 mb-3">📊 État via Hook</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium">{workout.state.status}</span>
                </div>
                <div className="flex justify-between">
                  <span>Progression:</span>
                  <span className="font-medium text-blue-600">
                    {workout.computed.progressPercentage}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Exercice actuel:</span>
                  <span className="font-medium">
                    {workout.computed.currentExercise?.name || 'Aucun'}
                  </span>
                </div>
              </div>
            </div>

            {/* Capacités */}
            <div>
              <h4 className="font-medium text-slate-800 mb-3">🎮 Capacités</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(workout.capabilities).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span>{key}:</span>
                    <span className={value ? 'text-green-600' : 'text-slate-400'}>
                      {value ? '✅' : '❌'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
        
        <CardFooter>
          <div className="flex items-center justify-between w-full text-xs text-slate-500">
            <span>🚀 Hook useWorkout - Architecture Clean Code appliquée</span>
            <span>Hooks: useReducer + useCallback + useMemo</span>
          </div>
        </CardFooter>
      </Card>

      {/* Guide d'utilisation */}
      <Card variant="info">
        <CardHeader 
          title="📖 Guide useWorkout Hook"
          icon="🎯"
        />
        <CardBody>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-800 mb-3">🚀 Avantages du Hook:</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• <strong>Encapsulation:</strong> Toute la logique en une ligne</li>
                <li>• <strong>Réutilisable:</strong> Utilisable dans n'importe quel composant</li>
                <li>• <strong>Optimisé:</strong> useCallback + useMemo pour les performances</li>
                <li>• <strong>Testable:</strong> Logique séparée de l'UI</li>
                <li>• <strong>Interface claire:</strong> actions, computed, capabilities</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-800 mb-3">💡 Utilisation simple:</h4>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <pre className="text-xs text-blue-800">
                    {`const workout = useWorkout();

                    // Actions
                    workout.actions.startWorkout();
                    workout.actions.pauseWorkout();

                    // État calculé
                    workout.computed.progressPercentage;
                    workout.computed.currentExercise;

                    // Capacités UI
                    workout.capabilities.canStart;`}
                </pre>
              </div>
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