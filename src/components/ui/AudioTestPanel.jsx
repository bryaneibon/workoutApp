// src/components/ui/AudioTestPanel.jsx
// 🧪 WA-011.2: Interface de test complète pour le système audio contextuel
// Référence Clean Code: "Test code is just as important as production code"

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody, CardFooter, StatsCard } from './Card.jsx';
import Button from './Button.jsx';

// 🎵 Import complet du système audio
import { 
  useWorkoutAudio, 
  useBasicWorkoutAudio 
} from '../../hooks/useWorkoutAudio.js';

import { 
  useAudioEngine,
  SOUND_TYPES,
  VOLUME_LEVELS,
  VIBRATION_PATTERNS
} from '../../hooks/useAudioEngine.js';

import { 
  PHASE_CONTEXTS, 
  INTENSITY_LEVELS 
} from '../../hooks/usePhaseContext.js';

/**
 * 🎯 Panel principal de test audio
 */
const AudioTestPanel = ({ workout, phaseContext, expanded = true }) => {
  // 🎵 Initialisation des hooks audio
  const workoutAudio = useWorkoutAudio(workout, phaseContext, {
    enableContextualAudio: true,
    enableMotivationalBoosts: true,
    enableCelebrations: true,
    enableProgressionSounds: true,
    enableRestingSounds: true,
    autoVolumeAdjustment: true
  });

  const basicAudio = useBasicWorkoutAudio(workout, phaseContext);
  
  const rawAudioEngine = useAudioEngine({
    enableSound: true,
    enableVibration: true,
    masterVolume: VOLUME_LEVELS.NORMAL
  });

  // 📊 État local pour les tests
  const [testResults, setTestResults] = useState([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [selectedTestType, setSelectedTestType] = useState('contextual');
  const [manualContext, setManualContext] = useState(PHASE_CONTEXTS.WORKOUT_START);
  const [manualIntensity, setManualIntensity] = useState(INTENSITY_LEVELS.NORMAL);

  // 🧪 Système de logging des tests
  const logTestResult = useCallback((testName, success, details, data = {}) => {
    const result = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      testName,
      success,
      details,
      data,
      context: phaseContext.context,
      intensity: phaseContext.intensity
    };

    setTestResults(prev => [...prev.slice(-19), result]); // Garde les 20 derniers
    console.log(`🧪 Audio Test: ${testName}`, result);
  }, [phaseContext.context, phaseContext.intensity]);

  // 🎯 Tests individuels du système audio

  // Test 1: Sons contextuels avec tous les contextes
  const testContextualSounds = async () => {
    logTestResult('Contextual Sounds Test', true, 'Starting contextual sounds test...');
    
    const contexts = Object.values(PHASE_CONTEXTS);
    const intensities = Object.values(INTENSITY_LEVELS);
    
    for (let i = 0; i < Math.min(contexts.length, 3); i++) {
      const context = contexts[i];
      const intensity = intensities[i % intensities.length];
      
      try {
        await workoutAudio.playContextualFeedback(context, intensity);
        logTestResult(
          `Context: ${context}`, 
          true, 
          `Sound played successfully at ${intensity} intensity`,
          { context, intensity }
        );
        
        // Délai entre les tests
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        logTestResult(
          `Context: ${context}`, 
          false, 
          `Error: ${error.message}`,
          { context, intensity, error: error.message }
        );
      }
    }
  };

  // Test 2: Types de sons directs
  const testDirectSoundTypes = async () => {
    logTestResult('Direct Sound Types Test', true, 'Testing direct sound generation...');
    
    const soundTypes = Object.values(SOUND_TYPES);
    
    for (let i = 0; i < Math.min(soundTypes.length, 4); i++) {
      const soundType = soundTypes[i];
      
      try {
        await workoutAudio.playContextualSound(soundType, INTENSITY_LEVELS.NORMAL);
        logTestResult(
          `Sound: ${soundType}`, 
          true, 
          'Direct sound played successfully',
          { soundType }
        );
        
        await new Promise(resolve => setTimeout(resolve, 800));
      } catch (error) {
        logTestResult(
          `Sound: ${soundType}`, 
          false, 
          `Error: ${error.message}`,
          { soundType, error: error.message }
        );
      }
    }
  };

  // Test 3: Vibrations avec tous les patterns
  const testVibrationPatterns = async () => {
    logTestResult('Vibration Patterns Test', true, 'Testing vibration patterns...');
    
    const patterns = Object.entries(VIBRATION_PATTERNS);
    
    for (let i = 0; i < Math.min(patterns.length, 5); i++) {
      const [patternName, pattern] = patterns[i];
      
      try {
        const result = rawAudioEngine.triggerVibration(pattern);
        logTestResult(
          `Vibration: ${patternName}`, 
          result, 
          result ? 'Vibration triggered' : 'Vibration not supported',
          { patternName, pattern, supported: result }
        );
        
        await new Promise(resolve => setTimeout(resolve, 600));
      } catch (error) {
        logTestResult(
          `Vibration: ${patternName}`, 
          false, 
          `Error: ${error.message}`,
          { patternName, error: error.message }
        );
      }
    }
  };

  // Test 4: Séquences audio complexes
  const testAudioSequences = async () => {
    logTestResult('Audio Sequences Test', true, 'Testing complex audio sequences...');
    
    const sequences = [
      {
        name: 'Workout Start Sequence',
        notes: [
          { frequency: 440, duration: 0.2, volume: VOLUME_LEVELS.NORMAL },
          { frequency: 554, duration: 0.2, volume: VOLUME_LEVELS.NORMAL, pause: 100 },
          { frequency: 659, duration: 0.3, volume: VOLUME_LEVELS.LOUD }
        ]
      },
      {
        name: 'Celebration Sequence',
        notes: [
          { frequency: 523, duration: 0.15, volume: VOLUME_LEVELS.MAXIMUM },
          { frequency: 659, duration: 0.15, volume: VOLUME_LEVELS.MAXIMUM, pause: 50 },
          { frequency: 784, duration: 0.2, volume: VOLUME_LEVELS.MAXIMUM }
        ]
      }
    ];

    for (const sequence of sequences) {
      try {
        await rawAudioEngine.playSequence(sequence.notes);
        logTestResult(
          sequence.name, 
          true, 
          `Sequence played: ${sequence.notes.length} notes`,
          { sequenceName: sequence.name, noteCount: sequence.notes.length }
        );
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        logTestResult(
          sequence.name, 
          false, 
          `Error: ${error.message}`,
          { sequenceName: sequence.name, error: error.message }
        );
      }
    }
  };

  // Test 5: Motivations et célébrations
  const testMotivationSystem = async () => {
    logTestResult('Motivation System Test', true, 'Testing motivation and celebration system...');
    
    const motivationTypes = ['struggle', 'halfway', 'final_push', 'pace_celebration'];
    const celebrationTypes = ['achievement', 'round_complete', 'workout_complete', 'epic_moment'];
    
    // Test motivations
    for (const motivationType of motivationTypes) {
      try {
        await workoutAudio.playMotivationalBoost(motivationType);
        logTestResult(
          `Motivation: ${motivationType}`, 
          true, 
          'Motivational boost played',
          { motivationType }
        );
        
        await new Promise(resolve => setTimeout(resolve, 700));
      } catch (error) {
        logTestResult(
          `Motivation: ${motivationType}`, 
          false, 
          `Error: ${error.message}`,
          { motivationType, error: error.message }
        );
      }
    }

    // Test célébrations
    for (const celebrationType of celebrationTypes) {
      try {
        await workoutAudio.playCelebration(celebrationType);
        logTestResult(
          `Celebration: ${celebrationType}`, 
          true, 
          'Celebration played',
          { celebrationType }
        );
        
        await new Promise(resolve => setTimeout(resolve, 900));
      } catch (error) {
        logTestResult(
          `Celebration: ${celebrationType}`, 
          false, 
          `Error: ${error.message}`,
          { celebrationType, error: error.message }
        );
      }
    }
  };

  // Test 6: Système complet avec workout simulation
  const testFullWorkoutSimulation = async () => {
    logTestResult('Full Workout Simulation', true, 'Simulating complete workout audio journey...');
    
    const workoutPhases = [
      { context: PHASE_CONTEXTS.WORKOUT_START, intensity: INTENSITY_LEVELS.LOW, delay: 1000 },
      { context: PHASE_CONTEXTS.FIRST_EXERCISE, intensity: INTENSITY_LEVELS.BUILDING, delay: 1500 },
      { context: PHASE_CONTEXTS.EXERCISE_TRANSITION, intensity: INTENSITY_LEVELS.PEAK, delay: 1000 },
      { context: PHASE_CONTEXTS.REST_RECOVERY, intensity: INTENSITY_LEVELS.RECOVERY, delay: 1000 },
      { context: PHASE_CONTEXTS.ROUND_TRANSITION, intensity: INTENSITY_LEVELS.SUSTAIN, delay: 1500 },
      { context: PHASE_CONTEXTS.FINAL_EXERCISE, intensity: INTENSITY_LEVELS.FINAL_PUSH, delay: 2000 },
      { context: PHASE_CONTEXTS.WORKOUT_COMPLETION, intensity: INTENSITY_LEVELS.RECOVERY, delay: 2000 }
    ];

    for (const phase of workoutPhases) {
      try {
        await workoutAudio.playContextualFeedback(phase.context, phase.intensity);
        logTestResult(
          `Simulation: ${phase.context}`, 
          true, 
          `Phase completed at ${phase.intensity} intensity`,
          { context: phase.context, intensity: phase.intensity }
        );
        
        await new Promise(resolve => setTimeout(resolve, phase.delay));
      } catch (error) {
        logTestResult(
          `Simulation: ${phase.context}`, 
          false, 
          `Error: ${error.message}`,
          { context: phase.context, error: error.message }
        );
      }
    }

    // Célébration finale
    try {
      await workoutAudio.playCelebration('workout_complete');
      logTestResult(
        'Simulation Complete', 
        true, 
        'Full workout simulation completed with final celebration',
        { totalPhases: workoutPhases.length }
      );
    } catch (error) {
      logTestResult(
        'Simulation Complete', 
        false, 
        `Final celebration error: ${error.message}`,
        { error: error.message }
      );
    }
  };

  // 🚀 Exécuteur de tests
  const runTestSuite = async (testType) => {
    setIsRunningTests(true);
    setTestResults([]);

    try {
      switch (testType) {
        case 'contextual':
          await testContextualSounds();
          break;
        case 'direct':
          await testDirectSoundTypes();
          break;
        case 'vibration':
          await testVibrationPatterns();
          break;
        case 'sequences':
          await testAudioSequences();
          break;
        case 'motivation':
          await testMotivationSystem();
          break;
        case 'simulation':
          await testFullWorkoutSimulation();
          break;
        case 'all':
          await testContextualSounds();
          await new Promise(resolve => setTimeout(resolve, 2000));
          await testDirectSoundTypes();
          await new Promise(resolve => setTimeout(resolve, 2000));
          await testVibrationPatterns();
          await new Promise(resolve => setTimeout(resolve, 2000));
          await testMotivationSystem();
          await new Promise(resolve => setTimeout(resolve, 3000));
          await testFullWorkoutSimulation();
          break;
        default:
          logTestResult('Unknown Test', false, `Unknown test type: ${testType}`);
      }
    } catch (error) {
      logTestResult('Test Suite Error', false, `Test suite failed: ${error.message}`, { error: error.message });
    } finally {
      setIsRunningTests(false);
    }
  };

  // Version compacte pour la production
  if (!expanded) {
    return (
      <div className="fixed bottom-20 right-4 bg-slate-800 text-white p-3 rounded-lg shadow-lg z-40">
        <div className="text-xs font-mono space-y-1">
          <div>🎵 Audio: {workoutAudio.supported.audio ? '✅' : '❌'}</div>
          <div>📳 Vibration: {workoutAudio.supported.vibration ? '✅' : '❌'}</div>
          <div>🔊 Plays: {workoutAudio.stats.contextualPlays}</div>
        </div>
      </div>
    );
  }

  return (
    <Card variant="gradient" className="mb-6 border-2 border-purple-300">
      <CardHeader 
        title="🎵 WA-011.2 - Audio System Test Interface"
        description="Test complet du système audio contextuel avec tous les hooks"
        action={
          <div className="flex items-center space-x-2">
            <Button
              variant={workoutAudio.supported.audio ? 'success' : 'danger'}
              size="sm"
              onClick={rawAudioEngine.utils.testAudio}
            >
              🔊 Test Audio
            </Button>
            <Button
              variant={workoutAudio.supported.vibration ? 'success' : 'danger'}
              size="sm"
              onClick={rawAudioEngine.utils.testVibration}
            >
              📳 Test Vibration
            </Button>
          </div>
        }
      />
      
      <CardBody>
        {/* Statistiques du système */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Audio Support"
            value={workoutAudio.supported.audio ? 'YES' : 'NO'}
            icon={workoutAudio.supported.audio ? '✅' : '❌'}
            trend={workoutAudio.supported.audio ? 'up' : 'down'}
          />
          <StatsCard
            title="Vibration Support"
            value={workoutAudio.supported.vibration ? 'YES' : 'NO'}
            icon={workoutAudio.supported.vibration ? '📳' : '❌'}
            trend={workoutAudio.supported.vibration ? 'up' : 'down'}
          />
          <StatsCard
            title="Contextual Plays"
            value={workoutAudio.stats.contextualPlays}
            icon="🎯"
            trend={workoutAudio.stats.contextualPlays > 0 ? 'up' : null}
          />
          <StatsCard
            title="Total Sounds"
            value={workoutAudio.stats.soundsPlayed}
            icon="🔊"
            trend={workoutAudio.stats.soundsPlayed > 0 ? 'up' : null}
          />
        </div>

        {/* Sélecteur de tests */}
        <Card variant="outlined" className="mb-6">
          <CardHeader title="🧪 Suite de Tests Audio" />
          <CardBody>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {[
                { key: 'contextual', name: 'Sons Contextuels', icon: '🎯' },
                { key: 'direct', name: 'Sons Directs', icon: '🔊' },
                { key: 'vibration', name: 'Vibrations', icon: '📳' },
                { key: 'sequences', name: 'Séquences', icon: '🎼' },
                { key: 'motivation', name: 'Motivations', icon: '💪' },
                { key: 'simulation', name: 'Simulation Complète', icon: '🏋️' }
              ].map(test => (
                <Button
                  key={test.key}
                  variant={selectedTestType === test.key ? 'primary' : 'outline'}
                  onClick={() => setSelectedTestType(test.key)}
                  className="h-auto p-3 flex-col space-y-1"
                >
                  <span className="text-xl">{test.icon}</span>
                  <span className="text-sm">{test.name}</span>
                </Button>
              ))}
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                variant="success"
                size="lg"
                loading={isRunningTests}
                onClick={() => runTestSuite(selectedTestType)}
                disabled={isRunningTests}
              >
                🚀 Lancer Test: {selectedTestType}
              </Button>
              <Button
                variant="warning"
                size="lg"
                loading={isRunningTests}
                onClick={() => runTestSuite('all')}
                disabled={isRunningTests}
              >
                🎯 TOUT Tester
              </Button>
              <Button
                variant="outline"
                onClick={() => setTestResults([])}
                disabled={isRunningTests}
              >
                🗑️ Clear
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Tests manuels contextuels */}
        <Card variant="warning" className="mb-6">
          <CardHeader title="🎮 Tests Manuels" />
          <CardBody>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">🎯 Contexte Manuel</label>
                <select
                  value={manualContext}
                  onChange={(e) => setManualContext(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                >
                  {Object.values(PHASE_CONTEXTS).map(context => (
                    <option key={context} value={context}>{context}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">🔥 Intensité Manuelle</label>
                <select
                  value={manualIntensity}
                  onChange={(e) => setManualIntensity(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                >
                  {Object.values(INTENSITY_LEVELS).map(intensity => (
                    <option key={intensity} value={intensity}>{intensity}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center space-x-4">
              <Button
                variant="primary"
                onClick={() => workoutAudio.playContextualFeedback(manualContext, manualIntensity)}
              >
                🎵 Play Contextuel
              </Button>
              <Button
                variant="secondary"
                onClick={() => workoutAudio.playMotivationalBoost('general')}
              >
                💪 Motivation
              </Button>
              <Button
                variant="success"
                onClick={() => workoutAudio.playCelebration('achievement')}
              >
                🎉 Célébration
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Contrôles système */}
        <Card variant="info" className="mb-6">
          <CardHeader title="🎛️ Contrôles Système Audio" />
          <CardBody>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">🔊 Contrôles Principal</h4>
                <div className="space-y-2">
                  <Button
                    variant="success"
                    onClick={workoutAudio.controls.unmute}
                    className="w-full"
                  >
                    🔊 Unmute All
                  </Button>
                  <Button
                    variant="danger"
                    onClick={workoutAudio.controls.mute}
                    className="w-full"
                  >
                    🔇 Mute All
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const health = workoutAudio.utils.healthCheck();
                      console.log('🏥 Audio Health:', health);
                      alert(`Audio Health:\n- Overall: ${health.overall ? '✅' : '❌'}\n- Web Audio: ${health.audioEngine.webAudio ? '✅' : '❌'}\n- Vibration: ${health.audioEngine.vibration ? '✅' : '❌'}`);
                    }}
                    className="w-full"
                  >
                    🏥 Health Check
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">📊 Utilitaires</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const history = workoutAudio.utils.getAudioHistory();
                      console.log('📜 Audio History:', history);
                    }}
                    className="w-full"
                  >
                    📜 Show History
                  </Button>
                  <Button
                    variant="outline"
                    onClick={workoutAudio.utils.clearHistory}
                    className="w-full"
                  >
                    🧹 Clear History
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => workoutAudio.utils.forceContextualFeedback(PHASE_CONTEXTS.WORKOUT_START, INTENSITY_LEVELS.PEAK)}
                    className="w-full"
                  >
                    ⚡ Force Feedback
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Résultats des tests */}
        <Card variant="outlined">
          <CardHeader 
            title={`📋 Résultats des Tests (${testResults.length})`}
            action={
              testResults.length > 0 && (
                <div className="text-sm text-slate-600">
                  Réussis: {testResults.filter(r => r.success).length} | 
                  Échoués: {testResults.filter(r => !r.success).length}
                </div>
              )
            }
          />
          <CardBody>
            {testResults.length === 0 ? (
              <div className="text-center text-slate-500 py-8">
                🧪 Aucun test exécuté. Sélectionnez un test et cliquez sur "Lancer Test".
              </div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {testResults.reverse().map(result => (
                  <div 
                    key={result.id}
                    className={`p-3 rounded-lg border ${
                      result.success 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {result.success ? '✅' : '❌'}
                        </span>
                        <span className="font-medium text-slate-800">
                          {result.testName}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {result.timestamp}
                      </span>
                    </div>
                    <div className={`text-sm ${
                      result.success ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {result.details}
                    </div>
                    {result.data && Object.keys(result.data).length > 0 && (
                      <div className="mt-1 text-xs text-slate-600">
                        Data: {JSON.stringify(result.data, null, 0)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Diagnostic technique */}
        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900">
            🔧 Diagnostic Technique Complet
          </summary>
          <div className="mt-3 p-4 bg-slate-50 rounded-lg border">
            <div className="grid md:grid-cols-2 gap-6 text-xs">
              <div>
                <h5 className="font-medium mb-2">🎵 WorkoutAudio Stats</h5>
                <pre className="text-slate-600 overflow-auto">
                  {JSON.stringify(workoutAudio.stats, null, 2)}
                </pre>
              </div>
              <div>
                <h5 className="font-medium mb-2">🔧 Raw Audio Engine</h5>
                <pre className="text-slate-600 overflow-auto">
                  {JSON.stringify(rawAudioEngine.stats, null, 2)}
                </pre>
              </div>
            </div>
            <div className="mt-4">
              <h5 className="font-medium mb-2">🎯 Configuration Actuelle</h5>
              <pre className="text-slate-600 overflow-auto text-xs">
                {JSON.stringify(workoutAudio.config, null, 2)}
              </pre>
            </div>
          </div>
        </details>
      </CardBody>

      <CardFooter>
        <div className="flex items-center justify-between w-full text-xs text-slate-500">
          <span>🎵 Audio Test Interface - WA-011.2 Complete System Validation</span>
          <span>Hooks: useWorkoutAudio + useAudioEngine + usePhaseContext</span>
        </div>
      </CardFooter>
    </Card>
  );
};

// PropTypes pour AudioTestPanel
AudioTestPanel.propTypes = {
  /** Instance du hook useWorkout */
  workout: PropTypes.object.isRequired,
  /** Instance du hook usePhaseContext */
  phaseContext: PropTypes.object.isRequired,
  /** Mode d'affichage étendu ou compact */
  expanded: PropTypes.bool
};

export default AudioTestPanel;