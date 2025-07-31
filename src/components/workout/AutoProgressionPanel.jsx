// src/components/workout/AutoProgressionPanel.jsx
// 🎯 WA-012.1: Composant Auto-Progression extrait
// Référence Clean Code: "Extract till you drop"

import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody } from '../ui/Card.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';

/**
 * ⚡ Composant AutoProgressionPanel - Informations progression automatique
 * 
 * Responsabilité unique : Afficher les infos de progression automatique WA-010
 * Pragmatic Programmer: "Organize around the architecture"
 */
const AutoProgressionPanel = ({ 
  workout, 
  className = '' 
}) => {
  const { timer } = workout;
  const progressionInfo = timer.progression;

  return (
    <Card variant="success" className={className}>
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
              progressionInfo.isAutoProgressing 
                ? 'bg-green-500 animate-pulse' 
                : 'bg-slate-400'
            }`}></div>
            <span>{progressionInfo.isAutoProgressing ? 'ACTIF' : 'INACTIF'}</span>
          </div>
        }
      />
      
      <CardBody>
        {/* Métriques principales de progression */}
        <div className="grid md:grid-cols-4 gap-4 text-center mb-6">
          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
            <div className="text-lg font-bold text-emerald-600">
              {progressionInfo.nextPhaseIn}s
            </div>
            <div className="text-xs text-emerald-700">Prochaine phase</div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="text-lg font-bold text-blue-600">
              {progressionInfo.currentPhase || 'N/A'}
            </div>
            <div className="text-xs text-blue-700">Phase actuelle</div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <div className="text-lg font-bold text-purple-600">
              {progressionInfo.progressionInfo?.currentExercise || 'Aucun'}
            </div>
            <div className="text-xs text-purple-700">Exercice actuel</div>
          </div>
          
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
            <div className="text-lg font-bold text-amber-600">
              {progressionInfo.progressionInfo?.nextExercise || 'Terminé'}
            </div>
            <div className="text-xs text-amber-700">Prochain exercice</div>
          </div>
        </div>
        
        {/* Barre de progression vers prochaine phase */}
        <div className="mb-4">
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
        
        {/* Informations détaillées de la progression */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* État du système */}
          <div className="bg-slate-50 p-3 rounded-lg border">
            <h4 className="font-medium text-slate-700 mb-2">📊 État du système</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Timer Running:</span>
                <span className={timer.isRunning ? 'text-green-600' : 'text-red-600'}>
                  {timer.isRunning ? '✅' : '❌'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tick Count:</span>
                <span className="text-blue-600 font-medium">{timer.tickCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Auto-Progression:</span>
                <span className={progressionInfo.isAutoProgressing ? 'text-green-600' : 'text-red-600'}>
                  {progressionInfo.isAutoProgressing ? '✅ Active' : '❌ Inactive'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Métriques workout */}
          <div className="bg-slate-50 p-3 rounded-lg border">
            <h4 className="font-medium text-slate-700 mb-2">🏋️ Métriques workout</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Round actuel:</span>
                <span className="text-blue-600 font-medium">
                  {workout.state.currentRound}/{workout.state.totalRounds}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Exercice actuel:</span>
                <span className="text-purple-600 font-medium">
                  {workout.state.currentExerciseIndex + 1}/{workout.state.exercises.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Progression globale:</span>
                <span className="text-emerald-600 font-medium">
                  {workout.computed.progressPercentage}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notifications récentes */}
        {timer.notifications && timer.notifications.count > 0 && (
          <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-700 mb-2 flex items-center">
              <span className="mr-2">🔔</span>
              Dernière notification
            </h4>
            {timer.notifications.latest && (
              <div className="text-sm text-blue-700">
                <div className="font-medium">{timer.notifications.latest.message}</div>
                <div className="text-xs text-blue-600 mt-1 opacity-75">
                  {timer.notifications.latest.timestamp}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Indicateur de santé du système */}
        <div className="mt-4 flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              progressionInfo.isAutoProgressing && timer.isRunning 
                ? 'bg-green-500 animate-pulse' 
                : 'bg-yellow-500'
            }`}></div>
            <span className="text-sm font-medium text-slate-700">
              Système {progressionInfo.isAutoProgressing && timer.isRunning ? 'Optimal' : 'En attente'}
            </span>
          </div>
          <div className="text-xs text-slate-500">
            WA-010 Auto-Progression System
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

// 🎯 PropTypes pour validation
AutoProgressionPanel.propTypes = {
  /** Instance complète du workout avec timer et progression */
  workout: PropTypes.shape({
    state: PropTypes.shape({
      currentRound: PropTypes.number.isRequired,
      totalRounds: PropTypes.number.isRequired,
      currentExerciseIndex: PropTypes.number.isRequired,
      exercises: PropTypes.array.isRequired
    }).isRequired,
    computed: PropTypes.shape({
      currentPhaseTime: PropTypes.number.isRequired,
      progressPercentage: PropTypes.number.isRequired
    }).isRequired,
    timer: PropTypes.shape({
      isRunning: PropTypes.bool.isRequired,
      tickCount: PropTypes.number.isRequired,
      progression: PropTypes.shape({
        isAutoProgressing: PropTypes.bool.isRequired,
        nextPhaseIn: PropTypes.number.isRequired,
        currentPhase: PropTypes.string,
        progressionInfo: PropTypes.object
      }).isRequired,
      notifications: PropTypes.shape({
        count: PropTypes.number.isRequired,
        latest: PropTypes.object
      })
    }).isRequired
  }).isRequired,
  /** Classes CSS additionnelles */
  className: PropTypes.string
};

AutoProgressionPanel.defaultProps = {
  className: ''
};

export default AutoProgressionPanel;