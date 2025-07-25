// src/components/views/WorkoutActiveViewWithAutoTimer.jsx
// 🏃 WA-010: Vue de séance active avec progression automatique d'exercice
// Référence Clean Code: "Separate concerns - UI reacts to business logic"

import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody, CardFooter, StatsCard } from '../ui/Card.jsx';
import Button, { StartButton, PauseButton, StopButton, NextButton, ResetButton } from '../ui/Button.jsx';
import ProgressBar, { CircularProgress, WorkoutProgress, TimerProgress } from '../ui/ProgressBar.jsx';
import PhaseNotifications from '../ui/PhaseNotifications.jsx'; // 🆕 WA-010

// 🚀 WA-010: Import du hook avec progression automatique
import { useWorkoutWithAutoTimer } from '../../hooks/useWorkoutWithTimer.js';
import { WORKOUT_PLANS } from '../../data/workoutPlans.js';

// 🧠 WA-011.1: NOUVEAU - Intelligence contextuelle !
import { usePhaseContext } from '../../hooks/usePhaseContext.js';
import PhaseContextTestPanel from '../ui/PhaseContextTestPanel.jsx';

/**
 * Composant de sélection de workout pour timer auto
 */
const QuickWorkoutSelector = ({ workout }) => (
  <Card variant="gradient">
    <CardHeader 
      title="🚀 Démarrage rapide avec Progression Automatique - WA-010"
      description="Timer automatique + progression d'exercice + notifications de phase"
    />
    <CardBody>
      <div className="grid md:grid-cols-2 gap-4">
        {Object.values(WORKOUT_PLANS).map(plan => (
          <Card
            key={plan.id}
            variant={workout.state.workoutPlan?.id === plan.id ? 'info' : 'outlined'}
            className="p-4 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => {
              const result = workout.actions.loadWorkout(plan.id);
              if (result.success) {
                console.log(`✅ Plan ${plan.name} chargé - Prêt pour progression automatique`);
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
                  ✅ Plan sélectionné - Progression automatique prête !
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
 * 🆕 WA-010: Composant d'information sur la progression automatique
 */
const AutoProgressionInfo = ({ workout }) => {
  const { timer } = workout;
  const progressionInfo = timer.progression;

  return (
    <Card variant="success" className="mb-4">
      <CardHeader 
        title="🔄 Progression Automatique Active"
        icon="⚡"
        action={
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
            progressionInfo.isAutoProgressing 
              ? 'bg-green-100 text-green-800' 
              : 'bg-slate-100 text-slate-600'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              progressionInfo.isAutoProgressing ? 'bg-green-500' : 'bg-slate-400'
            }`}></div>
            <span>{progressionInfo.isAutoProgressing ? 'ACTIF' : 'INACTIF'}</span>
          </div>
        }
      />
      <CardBody>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="bg-emerald-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-emerald-600">
              {progressionInfo.nextPhaseIn}s
            </div>
            <div className="text-xs text-emerald-700">Prochaine phase</div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {progressionInfo.currentPhase}
            </div>
            <div className="text-xs text-blue-700">Phase actuelle</div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-purple-600">
              {progressionInfo.progressionInfo?.currentExercise || 'Aucun'}
            </div>
            <div className="text-xs text-purple-700">Exercice actuel</div>
          </div>
          
          <div className="bg-amber-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-amber-600">
              {progressionInfo.progressionInfo?.nextExercise || 'Terminé'}
            </div>
            <div className="text-xs text-amber-700">Prochain exercice</div>
          </div>
        </div>
        
        {/* Barre de progression vers prochaine phase */}
        <div className="mt-4">
          <ProgressBar
            value={workout.computed.currentPhaseTime - progressionInfo.nextPhaseIn}
            max={workout.computed.currentPhaseTime}
            variant="success"
            size="md"
            animated
            showLabel
            label="Progression vers prochaine phase"
          />
        </div>
      </CardBody>
    </Card>
  );
};

AutoProgressionInfo.propTypes = {
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
              {/* 🆕 WA-010: Indication de progression automatique */}
              {workout.timer.progression.isAutoProgressing && (
                <div className="text-xs text-emerald-600 mt-2 font-medium">
                  🔄 Auto-progression active
                </div>
              )}
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

// Ajout dans WorkoutActiveViewWithAutoTimer.jsx
// 🆕 WA-010.1: Composant d'information sur l'exercice suivant

/**
 * 🎯 Utilitaire pour récupérer l'exercice suivant
 */
const getNextExercise = (workout) => {
  const { state } = workout;
  
  if (!state.exercises.length) return null;
  
  const isLastExercise = state.currentExerciseIndex === state.exercises.length - 1;
  const isLastRound = state.currentRound === state.totalRounds;
  
  // Si c'est le dernier exercice du dernier round
  if (isLastExercise && isLastRound) {
    return null; // Workout terminé
  }
  
  // Si c'est le dernier exercice du round mais pas le dernier round
  if (isLastExercise) {
    return {
      exercise: state.exercises[0], // Premier exercice du prochain round
      context: `Round ${state.currentRound + 1}`
    };
  }
  
  // Exercice suivant dans le round actuel
  return {
    exercise: state.exercises[state.currentExerciseIndex + 1],
    context: `Round ${state.currentRound}`
  };
};

/**
 * 🆕 Composant d'information sur l'exercice suivant
 */
const NextExerciseInfo = ({ workout }) => {
  const nextExerciseData = getNextExercise(workout);
  
  if (!nextExerciseData) {
    // Dernier exercice - Afficher message de fin
    return (
      <Card variant="gradient" className="opacity-75 backdrop-blur-sm">
        <CardHeader 
          title="🎉 Dernier exercice !"
          icon="🏁"
        />
        <CardBody>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              Plus qu'un effort !
            </h3>
            <p className="text-slate-600">
              Vous terminez bientôt votre workout
            </p>
            <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-700 font-medium">
                🏆 Félicitations pour votre persévérance !
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  const { exercise, context } = nextExerciseData;
  
  return (
    <Card variant="outline" className="opacity-80 backdrop-blur-sm bg-slate-50/70 border-dashed border-slate-300">
      <CardHeader 
        title="⏭️ Exercice suivant"
        description={context}
        icon={exercise.images.start}
      />
      <CardBody>
        <div className="text-center">
          {/* Animation des images d'exercice - Version floutée */}
          <div className="flex justify-center items-center space-x-6 mb-4 opacity-75">
            <div className="text-5xl filter blur-[1px]">{exercise.images.start}</div>
            <div className="text-xl text-slate-400">→</div>
            <div className="text-5xl filter blur-[1px]">{exercise.images.end}</div>
          </div>
          
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            {exercise.name}
          </h3>
          
          <div className="flex justify-center items-center space-x-3 mb-4">
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm opacity-75">
              {exercise.muscleGroup}
            </span>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm opacity-75">
              {exercise.difficulty}
            </span>
          </div>
          
          {/* Instructions d'exercice - Version simplifiée */}
          <div className="bg-slate-100/50 p-3 rounded-lg border border-slate-200 text-left">
            <h4 className="font-medium text-slate-700 mb-2 flex items-center">
              <span className="opacity-75">💡</span>
              <span className="ml-2">Aperçu</span>
            </h4>
            <div className="text-sm text-slate-600 space-y-1 opacity-90">
              {exercise.instructions?.slice(0, 2).map((instruction, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-slate-400 mr-2">{index + 1}.</span>
                  <span>{instruction}</span>
                </div>
              )) || (
                <div className="text-slate-500 italic">
                  Instructions disponibles lors de l'exercice
                </div>
              )}
            </div>
          </div>
          
          {/* Indicateur de progression */}
          <div className="mt-4 bg-slate-50 p-2 rounded-lg">
            <div className="text-xs text-slate-500 flex items-center justify-center space-x-2">
              <span>🔜</span>
              <span>Se préparer mentalement...</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

// PropTypes pour NextExerciseInfo
NextExerciseInfo.propTypes = {
  workout: PropTypes.object.isRequired
};


/**
 * 🆕 WA-010: Composant de contrôles enrichis avec progression automatique
 */
const AutoTimerControls = ({ workout }) => {
  const { actions, capabilities, timer } = workout;

  return (
    <Card>
      <CardHeader 
        title="🎮 Contrôles avec Progression Automatique - WA-010" 
        action={
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${timer.isRunning ? 'bg-green-500' : 'bg-slate-300'}`}></div>
              <span className="text-sm text-slate-600">
                Timer {timer.isRunning ? 'actif' : 'arrêté'}
              </span>
            </div>
            <div className="text-sm text-slate-600">
              Ticks: {timer.tickCount}
            </div>
            <div className="text-sm text-slate-600">
              Notifications: {timer.notifications.count}
            </div>
          </div>
        }
      />
      <CardBody>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
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

          {/* 🆕 WA-010: Bouton de progression forcée */}
          <Button
            variant="secondary"
            onClick={actions.forceNextPhase}
            disabled={!capabilities.canNext}
            title="Force la progression vers la phase suivante"
          >
            ⚡ Force
          </Button>

          <ResetButton
            onClick={actions.resetWorkout}
          >
            🔄 Reset
          </ResetButton>
        </div>
        
        {/* 🆕 WA-010: Contrôles des notifications */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              🔔 Notifications actives: {timer.notifications.count}
              {timer.notifications.latest && (
                <span className="ml-2 text-slate-500">
                  • {timer.notifications.latest.message.slice(0, 30)}...
                </span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={actions.clearNotifications}
              disabled={timer.notifications.count === 0}
            >
              🗑️ Effacer notifications
            </Button>
          </div>
        </div>
        
        {/* Debug du système (dev only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-slate-50 rounded-lg">
            <div className="text-xs text-slate-600 mb-2">
              <strong>WA-010 System Debug:</strong>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div>Timer: {timer.isRunning ? '✅' : '❌'} | Ticks: {timer.tickCount}</div>
              <div>Auto-progression: {timer.progression.isAutoProgressing ? '✅' : '❌'}</div>
              <div>Notifications: {timer.notifications.count} actives</div>
              <div>Phase: {timer.progression.currentPhase} → {timer.progression.progressionInfo?.nextExercise || 'Fin'}</div>
            </div>
            <div className="mt-2 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const diagnostic = workout.utils.getSystemDiagnostic();
                  console.log('🏥 WA-010 System Diagnostic:', diagnostic);
                }}
              >
                🏥 System Check
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  workout.utils.systemHealthCheck();
                }}
              >
                🔍 Health Check
              </Button>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

AutoTimerControls.propTypes = {
  workout: PropTypes.object.isRequired
};

/**
 * Composant principal - WorkoutActiveViewWithAutoTimer Enhanced WA-010
 */
const WorkoutActiveViewWithAutoTimer = () => {
  // 🚀 WA-010: Hook avec timer + progression automatique !
  const workout = useWorkoutWithAutoTimer();

  // 🧠 WA-011.1: NOUVEAU - Intelligence contextuelle !
  const phaseContext = usePhaseContext(workout);

  return (
    <div className="space-y-6">
        {/* 🧪 WA-011.1: TEST PANEL - À ajouter après les notifications */}
        <PhaseContextTestPanel 
          phaseContext={phaseContext}
          workout={workout}
          expanded={true}
        />
        {/* 🆕 WA-010: Notifications de changement de phase */}
        <PhaseNotifications
          notifications={workout.notifications.history}
          maxVisible={3}
          position="top-right"
          showHistory={process.env.NODE_ENV === 'development'}
          onClearAll={workout.actions.clearNotifications}
        />

      {/* Header avec indication progression automatique */}
      <Card variant="success">
        <CardHeader 
          title="⚡ Séance Active avec Progression Automatique - WA-010 + WA-011.1 TEST!"
          description="Timer automatique + progression d'exercice + intelligence contextuelle"
          icon="🚀"
        />
        <CardBody>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-2">🎉 WA-011.1 Intelligence Contextuelle Intégrée!</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-emerald-700">
              <ul className="space-y-1">
                <li>✅ <strong>Détection contextuelle:</strong> 9+ contextes intelligents</li>
                <li>✅ <strong>Messages adaptatifs:</strong> Motivation selon progression</li>
                <li>✅ <strong>Suggestions audio:</strong> Sons, tempo, volume contextuels</li>
              </ul>
              <ul className="space-y-1">
                <li>🧠 <strong>Phase Context:</strong> {phaseContext.context || 'INITIALIZING'}</li>
                <li>🔥 <strong>Intensité:</strong> {phaseContext.intensity}</li>
                <li>⭐ <strong>Moment spécial:</strong> {phaseContext.isSpecialMoment ? 'OUI' : 'NON'}</li>
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

          {/* 🆕 WA-010: Informations sur la progression automatique */}
          <AutoProgressionInfo workout={workout} />

          {/* Layout principal MODIFIÉ */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Timer principal */}
            <div className="lg:col-span-1">
              <MainTimerDisplay workout={workout} />
            </div>
            
            {/* Exercice actuel */}
            <div className="lg:col-span-1">
              <CurrentExerciseInfo workout={workout} />
            </div>
            
            {/* 🆕 Exercice suivant */}
            <div className="lg:col-span-1">
              <NextExerciseInfo workout={workout} />
            </div>
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
              title="Auto-Ticks"
              value={workout.timer.tickCount}
              icon="⚡"
              trend={workout.timer.progression.isAutoProgressing ? 'up' : null}
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
                {workout.computed.progressPercentage}% complété • 
                Progression: {workout.timer.progression.isAutoProgressing ? '🟢 Automatique' : '🔴 Manuelle'} • 
                Notifications: {workout.notifications.count}
              </div>
            </CardBody>
          </Card>

          {/* Contrôles enrichis */}
          <AutoTimerControls workout={workout} />
        </>
      )}
    </div>
  );
};

// PropTypes pour le composant principal
WorkoutActiveViewWithAutoTimer.propTypes = {};

export default WorkoutActiveViewWithAutoTimer;