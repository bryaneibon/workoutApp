// src/components/views/WorkoutActiveViewWithAutoTimer.jsx
// 🏃 WA-009: Vue de séance active avec timer automatique
// Référence Clean Code: "Separate concerns - UI reacts to business logic"

import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody, CardFooter, StatsCard } from '../ui/Card.jsx';
import Button, { StartButton, PauseButton, StopButton, NextButton, ResetButton } from '../ui/Button.jsx';
import ProgressBar, { CircularProgress, WorkoutProgress, TimerProgress } from '../ui/ProgressBar.jsx';

// 🚀 WA-009: Import du hook avec timer automatique
import { useWorkoutWithAutoTimer } from '../../hooks/useWorkoutWithTimer.js';
import { WORKOUT_PLANS } from '../../data/workoutPlans.js';

/**
 * Composant de sélection de workout pour timer auto
 */
const QuickWorkoutSelector = ({ workout }) => (
  <Card variant="gradient">
    <CardHeader 
      title="🚀 Démarrage rapide avec Timer Auto"
      description="Sélectionnez et démarrez un workout avec timer automatique"
    />
    <CardBody>
      <div className="grid md:grid-cols-2 gap-4">
        {Object.values(WORKOUT_PLANS).map(plan => (
          <Card
            key={plan.id}
            variant={workout.state.workoutPlan?.id === plan.id ? 'info' : 'outlined'}
            className="p-4 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => {
              // 🐛 FIX: Seulement charger, pas d'auto-start
              const result = workout.actions.loadWorkout(plan.id);
              if (result.success) {
                console.log(`✅ Plan ${plan.name} chargé - Cliquez Start Auto pour démarrer`);
              }
            }}
          >
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-600 mb-3">{plan.description}</p>
              <div className="flex justify-center items-center space-x-4 text-xs">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {plan.exercises.length} exercices
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  {plan.timing.rounds} rounds
                </span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  {plan.estimatedDuration}min
                </span>
              </div>
              {workout.state.workoutPlan?.id === plan.id && (
                <div className="mt-3 text-blue-600 font-semibold">
                  ✅ Plan sélectionné - Cliquez Start !
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </CardBody>
  </Card>
);

QuickWorkoutSelector.propTypes = {
  workout: PropTypes.object.isRequired
};

/**
 * Composant Timer circulaire principal avec informations de phase
 */
const MainTimerDisplay = ({ workout }) => {
  const { state, computed } = workout;
  const progressPercentage = computed.currentPhaseTime > 0 
    ? ((computed.currentPhaseTime - state.timeRemaining) / computed.currentPhaseTime) * 100 
    : 0;

  return (
    <Card variant="elevated" className="text-center">
      <CardBody>
        {/* Timer circulaire géant */}
        <div className="flex justify-center mb-6 relative">
          <CircularProgress
            value={progressPercentage}
            max={100}
            size={220}
            strokeWidth={15}
            variant={computed.statusInfo.color}
            showLabel={false}
          />
          
          {/* Contenu au centre du cercle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-slate-800 mb-2">
                {state.timeRemaining}
              </div>
              <div className="text-sm text-slate-600 mb-1">secondes</div>
              <div className={`text-xs px-3 py-1 rounded-full bg-${computed.statusInfo.color}-100 text-${computed.statusInfo.color}-800`}>
                {computed.statusInfo.icon} {computed.statusInfo.text}
              </div>
            </div>
          </div>
        </div>

        {/* Informations de la phase actuelle */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-slate-600">Phase actuelle</div>
              <div className="font-semibold text-slate-800">{computed.currentPhaseTime}s</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Progression</div>
              <div className="font-semibold text-blue-600">{Math.round(progressPercentage)}%</div>
            </div>
            <div>
              <div className="text-sm text-slate-600">Temps écoulé</div>
              <div className="font-semibold text-emerald-600">{computed.formattedTotalElapsed}</div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

MainTimerDisplay.propTypes = {
  workout: PropTypes.object.isRequired
};

/**
 * Composant d'informations sur l'exercice actuel
 */
const CurrentExerciseInfo = ({ workout }) => {
  const { computed } = workout;
  
  if (!computed.currentExercise) {
    return (
      <Card variant="outlined" className="text-center py-8">
        <div className="text-slate-400">
          <div className="text-4xl mb-2">🏋️</div>
          <p>Aucun exercice actuel</p>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="info">
      <CardHeader 
        title="Exercice actuel"
        icon={computed.currentExercise.images.start}
      />
      <CardBody>
        <div className="text-center">
          {/* Animation des images d'exercice */}
          <div className="flex justify-center items-center space-x-8 mb-4">
            <div className="text-6xl">{computed.currentExercise.images.start}</div>
            <div className="text-2xl text-slate-400">→</div>
            <div className="text-6xl">{computed.currentExercise.images.end}</div>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            {computed.currentExercise.name}
          </h3>
          
          <div className="flex justify-center items-center space-x-4 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {computed.currentExercise.muscleGroup}
            </span>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">
              {computed.currentExercise.difficulty}
            </span>
          </div>
          
          {/* Instructions d'exercice */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-left">
            <h4 className="font-medium text-blue-800 mb-2">💡 Instructions</h4>
            <ol className="text-sm text-blue-700 space-y-1">
              {computed.currentExercise.instructions?.map((instruction, index) => (
                <li key={index}>{index + 1}. {instruction}</li>
              )) || (
                <>
                  <li>1. Position correcte selon l'exercice</li>
                  <li>2. Mouvement contrôlé et précis</li>
                  <li>3. Respiration régulière</li>
                </>
              )}
            </ol>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

CurrentExerciseInfo.propTypes = {
  workout: PropTypes.object.isRequired
};

/**
 * Composant de contrôles principaux avec timer automatique
 */
const AutoTimerControls = ({ workout }) => {
  const { actions, capabilities, timer } = workout;

  return (
    <Card>
      <CardHeader 
        title="🎮 Contrôles avec Timer Automatique" 
        action={
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${timer.isRunning ? 'bg-green-500' : 'bg-slate-300'}`}></div>
            <span className="text-sm text-slate-600">
              Timer {timer.isRunning ? 'actif' : 'arrêté'} ({timer.tickCount} ticks)
            </span>
          </div>
        }
      />
      <CardBody>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StartButton
            onClick={actions.startWorkout}
            disabled={!capabilities.canStart}
            className="col-span-2 md:col-span-1"
          >
            🚀 Start Auto
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
            ⏭️ Skip
          </NextButton>

          <ResetButton
            onClick={actions.resetWorkout}
          >
            🔄 Reset
          </ResetButton>
        </div>
        
        {/* Debug du timer (dev only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-slate-50 rounded-lg">
            <div className="text-xs text-slate-600">
              <strong>Timer Debug:</strong> Running: {timer.isRunning.toString()}, 
              Ticks: {timer.tickCount}, 
              Healthy: {timer.utils.isHealthy().toString()}
            </div>
          </div>
        )}
        {process.env.NODE_ENV === 'development' && (
          <Button
            variant="outline"
            onClick={() => {
              console.log('🏥 Health Check:');
              workout.utils.timerHealthCheck();
              console.log('📊 Timer Stats:', timer.stats);
            }}
          >
            🏥 Debug Timer
          </Button>
      )}
      </CardBody>
    </Card>
  );
};

AutoTimerControls.propTypes = {
  workout: PropTypes.object.isRequired
};

/**
 * Composant principal - WorkoutActiveViewWithAutoTimer
 */
const WorkoutActiveViewWithAutoTimer = () => {
  // 🚀 WA-009: Une seule ligne pour avoir workout + timer automatique !
  const workout = useWorkoutWithAutoTimer();

  return (
    <div className="space-y-6">
      {/* Header avec indication timer automatique */}
      <Card variant="success">
        <CardHeader 
          title="⏰ Séance Active avec Timer Automatique - WA-009"
          description="Timer qui se met à jour automatiquement toutes les secondes"
          icon="🚀"
        />
        <CardBody>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-2">🎉 Timer Automatique Intégré!</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-emerald-700">
              <ul className="space-y-1">
                <li>✅ <strong>setInterval automatique:</strong> 1 sec précise</li>
                <li>✅ <strong>Pause/Resume intelligent:</strong> Timer suit l'état</li>
                <li>✅ <strong>Cleanup automatique:</strong> Pas de memory leaks</li>
              </ul>
              <ul className="space-y-1">
                <li>✅ <strong>Notifications de phase:</strong> work/rest/prep</li>
                <li>✅ <strong>Performance optimisée:</strong> useCallback/useRef</li>
                <li>✅ <strong>Interface enrichie:</strong> Actions + Timer</li>
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Sélection rapide de workout */}
      {!workout.state.workoutPlan && (
        <QuickWorkoutSelector workout={workout} />
      )}

      {/* Interface principale si un workout est chargé */}
      {workout.state.workoutPlan && (
        <>
          {/* Titre du workout */}
          <Card variant="gradient" className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              {workout.state.workoutPlan.name}
            </h1>
            <p className="text-slate-600">
              Round {workout.state.currentRound} sur {workout.state.totalRounds}
            </p>
          </Card>

          {/* Layout principal */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Timer principal */}
            <MainTimerDisplay workout={workout} />
            
            {/* Exercice actuel */}
            <CurrentExerciseInfo workout={workout} />
          </div>

          {/* Statistiques de progression */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              title="Exercice"
              value={`${workout.state.currentExerciseIndex + 1}/${workout.state.exercises.length}`}
              icon="🎯"
            />
            <StatsCard
              title="Round"
              value={`${workout.state.currentRound}/${workout.state.totalRounds}`}
              icon="🔁"
            />
            <StatsCard
              title="Progression"
              value={`${workout.computed.progressPercentage}%`}
              icon="📊"
              trend={workout.computed.progressPercentage > 0 ? 'up' : null}
            />
            <StatsCard
              title="Timer Ticks"
              value={workout.timer.tickCount}
              icon="⏰"
              trend={workout.timer.isRunning ? 'up' : null}
            />
          </div>

          {/* Barre de progression globale */}
          <Card>
            <CardHeader title="📊 Progression de la séance" />
            <CardBody>
              <WorkoutProgress
                completedExercises={workout.state.completedExercises}
                totalExercises={workout.state.totalExercises}
              />
              <div className="mt-4 text-sm text-slate-600 text-center">
                {workout.computed.progressPercentage}% complété • Timer: {workout.timer.isRunning ? '🟢 Actif' : '🔴 Arrêté'}
              </div>
            </CardBody>
          </Card>

          {/* Contrôles */}
          <AutoTimerControls workout={workout} />
        </>
      )}
    </div>
  );
};

// PropTypes pour le composant principal
WorkoutActiveViewWithAutoTimer.propTypes = {};

export default WorkoutActiveViewWithAutoTimer;