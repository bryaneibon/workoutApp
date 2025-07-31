// src/components/workout/WorkoutControlPanel.jsx
// 🎯 WA-012.1: Composant Contrôles Workout extrait
// Référence Clean Code: "Separate concerns"

import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody } from '../ui/Card.jsx';
import Button, { StartButton, StopButton, NextButton, ResetButton } from '../ui/Button.jsx';

/**
 * 🎮 Composant WorkoutControlPanel - Contrôles enrichis
 * 
 * Responsabilité unique : Gestion des contrôles workout avec progression automatique
 * Clean Code: "Functions should do one thing and do it well"
 */
const WorkoutControlPanel = ({ 
  workout, 
  className = '' 
}) => {
  const { actions, capabilities, timer } = workout;

  return (
    <Card className={className}>
      <CardHeader 
        title="🎮 Contrôles avec Progression Automatique" 
        action={
          <div className="flex items-center space-x-4 text-sm">
            {/* Indicateur Timer Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full transition-colors ${
                timer.isRunning ? 'bg-green-500 animate-pulse' : 'bg-slate-300'
              }`}></div>
              <span className="text-slate-600">
                Timer {timer.isRunning ? 'actif' : 'arrêté'}
              </span>
            </div>
            
            {/* Compteur de ticks */}
            <div className="text-slate-600">
              Ticks: <span className="font-medium text-blue-600">{timer.tickCount}</span>
            </div>
            
            {/* Compteur notifications */}
            <div className="text-slate-600">
              Notifications: <span className="font-medium text-purple-600">{timer.notifications.count}</span>
            </div>
          </div>
        }
      />
      
      <CardBody>
        {/* Contrôles principaux */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
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

          {/* Bouton de progression forcée - WA-010 Feature */}
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
        
        {/* Section des notifications */}
        <div className="border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-slate-600">
              🔔 <span className="font-medium">Notifications actives:</span> {timer.notifications.count}
              {timer.notifications.latest && (
                <span className="ml-2 text-slate-500">
                  • {timer.notifications.latest.message.slice(0, 30)}
                  {timer.notifications.latest.message.length > 30 ? '...' : ''}
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
          
          {/* Historique récent des notifications */}
          {timer.notifications.history && timer.notifications.history.length > 0 && (
            <div className="bg-slate-50 p-3 rounded-lg">
              <div className="text-xs text-slate-500 mb-2">Dernières notifications:</div>
              <div className="space-y-1">
                {timer.notifications.history.slice(-3).map((notification, index) => (
                  <div key={notification.id || index} className="text-xs text-slate-600 flex items-center space-x-2">
                    <span className="text-slate-400">{notification.timestamp}</span>
                    <span className="flex-1 truncate">{notification.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Section debug pour développement */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border">
            <div className="text-xs text-slate-600 mb-2">
              <strong>🔧 WA-010 System Debug:</strong>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Timer Status:</span>
                <span className={timer.isRunning ? 'text-green-600' : 'text-red-600'}>
                  {timer.isRunning ? '✅ Running' : '❌ Stopped'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Auto-progression:</span>
                <span className={timer.progression?.isAutoProgressing ? 'text-green-600' : 'text-red-600'}>
                  {timer.progression?.isAutoProgressing ? '✅ Active' : '❌ Inactive'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Current Phase:</span>
                <span className="text-blue-600">{timer.progression?.currentPhase || 'Unknown'}</span>
              </div>
              <div className="flex justify-between">
                <span>Next Exercise:</span>
                <span className="text-purple-600">{timer.progression?.progressionInfo?.nextExercise || 'Fin'}</span>
              </div>
            </div>
            
            {/* Boutons de diagnostic */}
            <div className="mt-3 flex space-x-2">
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

// 🎯 PropTypes pour validation
WorkoutControlPanel.propTypes = {
  /** Instance complète du workout avec actions, capabilities et timer */
  workout: PropTypes.shape({
    actions: PropTypes.shape({
      startWorkout: PropTypes.func.isRequired,
      togglePause: PropTypes.func.isRequired,
      stopWorkout: PropTypes.func.isRequired,
      nextExercise: PropTypes.func.isRequired,
      forceNextPhase: PropTypes.func.isRequired,
      resetWorkout: PropTypes.func.isRequired,
      clearNotifications: PropTypes.func.isRequired
    }).isRequired,
    capabilities: PropTypes.shape({
      canStart: PropTypes.bool.isRequired,
      canPause: PropTypes.bool.isRequired,
      canResume: PropTypes.bool.isRequired,
      canStop: PropTypes.bool.isRequired,
      canNext: PropTypes.bool.isRequired
    }).isRequired,
    timer: PropTypes.shape({
      isRunning: PropTypes.bool.isRequired,
      tickCount: PropTypes.number.isRequired,
      notifications: PropTypes.shape({
        count: PropTypes.number.isRequired,
        latest: PropTypes.object,
        history: PropTypes.array
      }).isRequired,
      progression: PropTypes.object
    }).isRequired,
    utils: PropTypes.shape({
      getSystemDiagnostic: PropTypes.func.isRequired,
      systemHealthCheck: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  /** Classes CSS additionnelles */
  className: PropTypes.string
};

WorkoutControlPanel.defaultProps = {
  className: ''
};

export default WorkoutControlPanel;