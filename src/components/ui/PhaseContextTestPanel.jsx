// src/components/ui/PhaseContextTestPanel.jsx
// 🧪 WA-011.1: Composant de test visuel pour l'intelligence contextuelle
// Référence Clean Code: "Test code is just as important as production code"

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody, StatsCard } from './Card.jsx';
import Button from './Button.jsx';
import { PHASE_CONTEXTS, INTENSITY_LEVELS } from '../../hooks/usePhaseContext.js';

/**
 * 🎯 Composant de test pour visualiser l'intelligence contextuelle
 */
const PhaseContextTestPanel = ({ phaseContext, workout, expanded = true }) => {
  const [messageType, setMessageType] = useState('motivation');
  const [testHistory, setTestHistory] = useState([]);
  const [autoLog, setAutoLog] = useState(true);

  // 📊 Log automatique des changements de contexte
  useEffect(() => {
    if (autoLog && phaseContext.context) {
      const logEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        context: phaseContext.context,
        intensity: phaseContext.intensity,
        message: phaseContext.getContextualMessage(messageType),
        workoutState: {
          status: workout.state.status,
          round: workout.state.currentRound,
          exercise: workout.state.currentExerciseIndex + 1,
          timeRemaining: workout.state.timeRemaining,
          progress: workout.computed.progressPercentage
        }
      };

      setTestHistory(prev => [...prev.slice(-9), logEntry]); // Garde les 10 derniers
      
      console.log('🧠 Phase Context Change:', logEntry);
    }
  }, [phaseContext.context, phaseContext.intensity, autoLog, messageType, workout.state.status]);

  // 🎨 Couleurs par contexte
  const getContextColor = (context) => {
    const colors = {
      [PHASE_CONTEXTS.WORKOUT_START]: 'bg-green-500 text-white',
      [PHASE_CONTEXTS.FIRST_EXERCISE]: 'bg-blue-500 text-white',
      [PHASE_CONTEXTS.FINAL_EXERCISE]: 'bg-red-500 text-white',
      [PHASE_CONTEXTS.WORKOUT_COMPLETION]: 'bg-purple-500 text-white',
      [PHASE_CONTEXTS.ROUND_TRANSITION]: 'bg-orange-500 text-white',
      [PHASE_CONTEXTS.NEW_ROUND_START]: 'bg-cyan-500 text-white',
      [PHASE_CONTEXTS.REST_RECOVERY]: 'bg-blue-400 text-white',
      [PHASE_CONTEXTS.EXERCISE_TRANSITION]: 'bg-slate-500 text-white'
    };
    
    return colors[context] || 'bg-slate-300 text-slate-700';
  };

  // 🎯 Icônes par intensité
  const getIntensityIcon = (intensity) => {
    const icons = {
      [INTENSITY_LEVELS.LOW]: '🌱',
      [INTENSITY_LEVELS.BUILDING]: '📈',
      [INTENSITY_LEVELS.PEAK]: '🔥',
      [INTENSITY_LEVELS.SUSTAIN]: '💪',
      [INTENSITY_LEVELS.FINAL_PUSH]: '🚀',
      [INTENSITY_LEVELS.RECOVERY]: '😌'
    };
    
    return icons[intensity] || '⚡';
  };

  if (!expanded) {
    // Version compacte
    return (
      <div className="fixed bottom-4 left-4 bg-slate-800 text-white p-3 rounded-lg shadow-lg z-40">
        <div className="text-xs font-mono">
          🧠 {phaseContext.context || 'NO_CONTEXT'}
        </div>
        <div className="text-xs">
          {getIntensityIcon(phaseContext.intensity)} {phaseContext.intensity}
        </div>
      </div>
    );
  }

  return (
    <Card variant="gradient" className="mb-6 border-2 border-blue-300">
      <CardHeader 
        title="🧠 WA-011.1 - Test Intelligence Contextuelle"
        description="Validation temps réel de la détection des phases contextuelles"
        action={
          <div className="flex items-center space-x-2">
            <Button
              variant={autoLog ? 'success' : 'outline'}
              size="sm"
              onClick={() => setAutoLog(!autoLog)}
            >
              {autoLog ? '📊 Auto-Log ON' : '📊 Auto-Log OFF'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTestHistory([])}
            >
              🗑️ Clear
            </Button>
          </div>
        }
      />
      
      <CardBody>
        {/* État actuel du contexte */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Contexte Actuel"
            value={phaseContext.context || 'NONE'}
            icon="🎯"
          />
          <StatsCard
            title="Intensité"
            value={phaseContext.intensity}
            icon={getIntensityIcon(phaseContext.intensity)}
          />
          <StatsCard
            title="Moment Spécial"
            value={phaseContext.isSpecialMoment ? 'OUI' : 'NON'}
            icon={phaseContext.isSpecialMoment ? '⭐' : '⚪'}
          />
          <StatsCard
            title="Célébration"
            value={phaseContext.requiresCelebration ? 'OUI' : 'NON'}
            icon={phaseContext.requiresCelebration ? '🎉' : '⚪'}
          />
        </div>

        {/* Message contextuel en temps réel */}
        <Card variant="info" className="mb-6">
          <CardHeader 
            title="💬 Message Contextuel Temps Réel"
            action={
              <div className="flex space-x-2">
                {['motivation', 'transition', 'celebration'].map(type => (
                  <Button
                    key={type}
                    variant={messageType === type ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setMessageType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            }
          />
          <CardBody>
            <div className="text-lg font-medium text-blue-800 bg-blue-50 p-4 rounded-lg">
              {phaseContext.getContextualMessage(messageType) || '⚠️ Aucun message disponible'}
            </div>
          </CardBody>
        </Card>

        {/* Métadonnées détaillées */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Progression contextuelle */}
          <Card variant="outlined">
            <CardHeader title="📊 Progression Contextuelle" />
            <CardBody>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Round Progress:</span>
                  <span className="font-medium text-blue-600">
                    {phaseContext.metadata?.roundProgress || 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Exercise Progress:</span>
                  <span className="font-medium text-green-600">
                    {phaseContext.metadata?.exerciseProgress || 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Overall Progress:</span>
                  <span className="font-medium text-purple-600">
                    {phaseContext.metadata?.overallProgress || 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Exercises Remaining:</span>
                  <span className="font-medium text-orange-600">
                    {phaseContext.metadata?.exercisesRemaining || 0}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Détections spéciales */}
          <Card variant="outlined">
            <CardHeader title="🔍 Détections Spéciales" />
            <CardBody>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>Position:</span>
                  <div className="text-right">
                    {phaseContext.metadata?.isFirstRound && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-1">
                        Premier Round
                      </span>
                    )}
                    {phaseContext.metadata?.isLastRound && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs mr-1">
                        Dernier Round
                      </span>
                    )}
                    {phaseContext.metadata?.isMidWorkout && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        Mid-Workout
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span>Pace Quality:</span>
                  <span className={`font-medium ${
                    phaseContext.metadata?.paceQuality === 'excellent' ? 'text-green-600' :
                    phaseContext.metadata?.paceQuality === 'good' ? 'text-blue-600' :
                    phaseContext.metadata?.paceQuality === 'acceptable' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {phaseContext.metadata?.paceQuality || 'unknown'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Should Motivate:</span>
                  <span className={`font-medium ${
                    phaseContext.shouldMotivate ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {phaseContext.shouldMotivate ? 'OUI' : 'NON'}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Suggestions Audio */}
        <Card variant="warning" className="mb-6">
          <CardHeader title="🎵 Suggestions Audio Contextuelles" />
          <CardBody>
            {phaseContext.getAudioSuggestions() ? (
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="font-medium text-orange-800">Sound Type</div>
                  <div className="text-orange-600 mt-1">
                    {phaseContext.getAudioSuggestions().soundType}
                  </div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="font-medium text-orange-800">Music Tempo</div>
                  <div className="text-orange-600 mt-1">
                    {phaseContext.getAudioSuggestions().musicTempo} BPM
                  </div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="font-medium text-orange-800">Volume</div>
                  <div className="text-orange-600 mt-1">
                    {Math.round(phaseContext.getAudioSuggestions().volumeLevel * 100)}%
                  </div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="font-medium text-orange-800">Vibration</div>
                  <div className="text-orange-600 mt-1">
                    {phaseContext.getAudioSuggestions().vibrationPattern?.length || 0} pulses
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-orange-600 py-4">
                ⚠️ Aucune suggestion audio disponible
              </div>
            )}
          </CardBody>
        </Card>

        {/* Historique des changements */}
        <Card variant="outlined">
          <CardHeader 
            title={`📜 Historique des Changements (${testHistory.length})`}
            description="Log temps réel des transitions contextuelles"
          />
          <CardBody>
            {testHistory.length === 0 ? (
              <div className="text-center text-slate-500 py-6">
                🕐 Aucun changement détecté. Démarrez un workout pour voir l'intelligence !
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {testHistory.reverse().map(entry => (
                  <div 
                    key={entry.id}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getContextColor(entry.context)}`}>
                          {entry.context}
                        </span>
                        <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">
                          {getIntensityIcon(entry.intensity)} {entry.intensity}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {entry.timestamp}
                      </span>
                    </div>
                    
                    <div className="text-sm text-slate-700 mb-2">
                      {entry.message}
                    </div>
                    
                    <div className="text-xs text-slate-500 flex items-center space-x-4">
                      <span>Status: {entry.workoutState.status}</span>
                      <span>R{entry.workoutState.round}E{entry.workoutState.exercise}</span>
                      <span>{entry.workoutState.timeRemaining}s</span>
                      <span>{entry.workoutState.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Diagnostic technique */}
        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900">
            🔧 Diagnostic Technique (Debug)
          </summary>
          <div className="mt-3 p-4 bg-slate-50 rounded-lg border">
            <pre className="text-xs text-slate-600 overflow-auto">
              {JSON.stringify(phaseContext.diagnostic, null, 2)}
            </pre>
          </div>
        </details>
      </CardBody>
    </Card>
  );
};

PhaseContextTestPanel.propTypes = {
  /** Instance du hook usePhaseContext */
  phaseContext: PropTypes.shape({
    context: PropTypes.string,
    intensity: PropTypes.string,
    metadata: PropTypes.object,
    getContextualMessage: PropTypes.func.isRequired,
    getAudioSuggestions: PropTypes.func.isRequired,
    isSpecialMoment: PropTypes.bool,
    requiresCelebration: PropTypes.bool,
    shouldMotivate: PropTypes.bool,
    diagnostic: PropTypes.object
  }).isRequired,
  /** Instance du hook useWorkout */
  workout: PropTypes.object.isRequired,
  /** Affichage complet ou compact */
  expanded: PropTypes.bool
};

export default PhaseContextTestPanel;