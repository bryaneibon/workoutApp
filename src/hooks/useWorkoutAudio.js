// src/hooks/useWorkoutAudio.js
// 🎵 WA-011.2: Hook d'intégration Audio Engine + Phase Context
// Référence Clean Code: "Compose methods to tell a story"
// Référence Pragmatic Programmer: "DRY - Don't Repeat Yourself"

import { useEffect, useCallback, useRef, useMemo } from 'react';
import { useAudioEngine, SOUND_TYPES, VOLUME_LEVELS, VIBRATION_PATTERNS } from './useAudioEngine.js';
import { PHASE_CONTEXTS, INTENSITY_LEVELS } from './usePhaseContext.js';
import { WORKOUT_STATUS } from '../constants/workoutStates.js';

/**
 * 🎯 Mapping Contexte → Audio Feedback
 * Clean Code: "Make meaningful distinctions"
 */
const AUDIO_CONTEXT_MAP = {
  // 🚀 Démarrages énergiques
  [PHASE_CONTEXTS.WORKOUT_START]: {
    sound: SOUND_TYPES.ENERGETIC_START,
    vibration: VIBRATION_PATTERNS.DOUBLE_SHORT,
    volume: VOLUME_LEVELS.LOUD,
    motivationalBoost: true
  },
  
  [PHASE_CONTEXTS.FIRST_EXERCISE]: {
    sound: SOUND_TYPES.ENERGETIC_START,
    vibration: VIBRATION_PATTERNS.SINGLE_SHORT,
    volume: VOLUME_LEVELS.NORMAL,
    motivationalBoost: true
  },
  
  // 🏁 Fins épiques
  [PHASE_CONTEXTS.FINAL_EXERCISE]: {
    sound: SOUND_TYPES.EPIC_FINAL,
    vibration: VIBRATION_PATTERNS.EPIC_FINALE,
    volume: VOLUME_LEVELS.MAXIMUM,
    motivationalBoost: true,
    epic: true
  },
  
  [PHASE_CONTEXTS.WORKOUT_COMPLETION]: {
    sound: SOUND_TYPES.VICTORY_FANFARE,
    vibration: VIBRATION_PATTERNS.CELEBRATION,
    volume: VOLUME_LEVELS.MAXIMUM,
    celebration: true,
    epic: true
  },
  
  // 🔁 Progressions et transitions
  [PHASE_CONTEXTS.ROUND_TRANSITION]: {
    sound: SOUND_TYPES.ACHIEVEMENT_UNLOCK,
    vibration: VIBRATION_PATTERNS.TRIPLE_SHORT,
    volume: VOLUME_LEVELS.LOUD,
    achievement: true
  },
  
  [PHASE_CONTEXTS.NEW_ROUND_START]: {
    sound: SOUND_TYPES.ACHIEVEMENT_UNLOCK,
    vibration: VIBRATION_PATTERNS.DOUBLE_SHORT,
    volume: VOLUME_LEVELS.NORMAL,
    motivationalBoost: true
  },
  
  // 😴 Récupérations
  [PHASE_CONTEXTS.REST_RECOVERY]: {
    sound: SOUND_TYPES.GENTLE_RECOVERY,
    vibration: VIBRATION_PATTERNS.GENTLE_NUDGE,
    volume: VOLUME_LEVELS.SOFT,
    gentle: true
  },
  
  [PHASE_CONTEXTS.FINAL_REST]: {
    sound: SOUND_TYPES.FINAL_REST,
    vibration: VIBRATION_PATTERNS.GENTLE_NUDGE,
    volume: VOLUME_LEVELS.NORMAL,
    gentle: true
  },
  
  // 🔄 Transitions normales
  [PHASE_CONTEXTS.EXERCISE_TRANSITION]: {
    sound: SOUND_TYPES.STANDARD_TRANSITION,
    vibration: VIBRATION_PATTERNS.SINGLE_SHORT,
    volume: VOLUME_LEVELS.NORMAL,
    standard: true
  }
};

/**
 * 🎵 Hook useWorkoutAudio - Intégration complète Audio + Phases
 * 
 * Ce hook connecte intelligemment :
 * - useAudioEngine (génération de sons/vibrations)
 * - usePhaseContext (intelligence contextuelle)
 * - Système de workout (états et transitions)
 * 
 * @param {Object} workout - Instance du hook useWorkout
 * @param {Object} phaseContext - Instance du hook usePhaseContext
 * @param {Object} options - Configuration audio
 * @returns {Object} Interface audio workout complète
 */
export const useWorkoutAudio = (workout, phaseContext, options = {}) => {
  // 🎛️ Configuration par défaut
  const defaultOptions = {
    enableContextualAudio: true,
    enableMotivationalBoosts: true,
    enableCelebrations: true,
    enableProgressionSounds: true,
    enableRestingSounds: true,
    autoVolumeAdjustment: true,
    respectUserPreferences: true,
    ...options
  };
  
  // 🎵 Audio Engine principal
  const audioEngine = useAudioEngine({
    enableSound: defaultOptions.enableContextualAudio,
    enableVibration: defaultOptions.enableContextualAudio,
    masterVolume: VOLUME_LEVELS.NORMAL,
    gracefulFallback: true
  });
  
  // 🔗 Références pour éviter les répétitions
  const lastPlayedContextRef = useRef(null);
  const lastPlayedTimestampRef = useRef(0);
  const audioHistoryRef = useRef([]);
  
  // 🎯 Fonction principale de feedback contextuel
  const playContextualFeedback = useCallback(async (context, intensity, forcePlay = false) => {
    if (!context || !defaultOptions.enableContextualAudio) {
      console.log('🔇 Audio contextuel désactivé ou contexte vide');
      return;
    }
    
    // 🛡️ Protection contre les répétitions (sauf si forcé)
    const now = Date.now();
    const timeSinceLastPlay = now - lastPlayedTimestampRef.current;
    const sameContext = lastPlayedContextRef.current === context;
    
    if (!forcePlay && sameContext && timeSinceLastPlay < 1000) {
      console.log(`🔇 Audio ignoré - même contexte dans les 1000ms: ${context}`);
      return;
    }
    
    // 📊 Récupérer la configuration audio pour ce contexte
    const audioConfig = AUDIO_CONTEXT_MAP[context];
    if (!audioConfig) {
      console.log(`⚠️ Pas de configuration audio pour: ${context}`);
      return;
    }
    
    console.log(`🎵 Playing contextual feedback: ${context} @ ${intensity}`);
    
    // 🔊 Ajustement du volume selon l'intensité et les préférences
    let adjustedVolume = audioConfig.volume;
    
    if (defaultOptions.autoVolumeAdjustment) {
      const intensityMultipliers = {
        [INTENSITY_LEVELS.LOW]: 0.7,
        [INTENSITY_LEVELS.BUILDING]: 0.8,
        [INTENSITY_LEVELS.PEAK]: 1.0,
        [INTENSITY_LEVELS.SUSTAIN]: 0.9,
        [INTENSITY_LEVELS.FINAL_PUSH]: 1.2,
        [INTENSITY_LEVELS.RECOVERY]: 0.6
      };
      
      adjustedVolume = Math.min(
        audioConfig.volume * (intensityMultipliers[intensity] || 1.0),
        VOLUME_LEVELS.MAXIMUM
      );
    }
    
    // 🎯 Jouer le feedback avec le Audio Engine
    try {
      await audioEngine.playContextualFeedback(context, intensity);
      
      // 📝 Enregistrer dans l'historique
      const historyEntry = {
        id: now,
        timestamp: new Date().toISOString(),
        context,
        intensity,
        audioConfig,
        adjustedVolume,
        workoutState: {
          status: workout.state.status,
          round: workout.state.currentRound,
          exercise: workout.state.currentExerciseIndex,
          progress: workout.computed.progressPercentage
        }
      };
      
      audioHistoryRef.current = [...audioHistoryRef.current.slice(-19), historyEntry];
      
      // 🔄 Mettre à jour les références
      lastPlayedContextRef.current = context;
      lastPlayedTimestampRef.current = now;
      
      console.log(`✅ Audio contextuel joué avec succès: ${context}`);
      
    } catch (error) {
      console.error(`❌ Erreur audio contextuel pour ${context}:`, error);
    }
  }, [
    audioEngine, 
    defaultOptions.enableContextualAudio,
    defaultOptions.autoVolumeAdjustment,
    workout.state.status,
    workout.state.currentRound,
    workout.state.currentExerciseIndex,
    workout.computed.progressPercentage
  ]);
  
  // 🎵 Feedback motivationnel intelligent
  const playMotivationalBoost = useCallback(async (reason = 'general') => {
    if (!defaultOptions.enableMotivationalBoosts) return;
    
    const motivationSounds = {
      struggle: SOUND_TYPES.MOTIVATION_BOOST,
      halfway: SOUND_TYPES.ACHIEVEMENT_UNLOCK,
      final_push: SOUND_TYPES.EPIC_FINAL,
      pace_celebration: SOUND_TYPES.PACE_CELEBRATION
    };
    
    const soundType = motivationSounds[reason] || SOUND_TYPES.MOTIVATION_BOOST;
    
    console.log(`💪 Motivation boost: ${reason} → ${soundType}`);
    await audioEngine.playContextualSound(soundType, phaseContext.intensity);
  }, [audioEngine, phaseContext.intensity, defaultOptions.enableMotivationalBoosts]);
  
  // 🎉 Célébrations épiques
  const playCelebration = useCallback(async (celebrationType = 'achievement') => {
    if (!defaultOptions.enableCelebrations) return;
    
    const celebrations = {
      achievement: SOUND_TYPES.ACHIEVEMENT_UNLOCK,
      round_complete: SOUND_TYPES.ACHIEVEMENT_UNLOCK,
      workout_complete: SOUND_TYPES.VICTORY_FANFARE,
      epic_moment: SOUND_TYPES.EPIC_FINAL
    };
    
    const soundType = celebrations[celebrationType];
    if (!soundType) return;
    
    console.log(`🎉 Célébration: ${celebrationType} → ${soundType}`);
    await audioEngine.playContextualSound(soundType, INTENSITY_LEVELS.PEAK);
    
    // Vibration spéciale pour les célébrations
    if (celebrationType === 'workout_complete') {
      audioEngine.triggerVibration(VIBRATION_PATTERNS.CELEBRATION);
    }
  }, [audioEngine, defaultOptions.enableCelebrations]);
  
  // 🔄 Auto-détection des changements de contexte de phase
  useEffect(() => {
    if (!phaseContext.context) return;
    
    // 🎯 Jouer automatiquement le feedback contextuel
    playContextualFeedback(phaseContext.context, phaseContext.intensity);
    
    // 🎉 Détecter les moments spéciaux pour célébrations
    if (phaseContext.requiresCelebration) {
      const celebrationType = phaseContext.context === PHASE_CONTEXTS.WORKOUT_COMPLETION 
        ? 'workout_complete' 
        : 'achievement';
      
      // Délai pour que le son contextuel se joue d'abord
      setTimeout(() => {
        playCelebration(celebrationType);
      }, 300);
    }
    
    // 💪 Motivation automatique si nécessaire
    if (phaseContext.shouldMotivate) {
      setTimeout(() => {
        playMotivationalBoost('final_push');
      }, 600);
    }
    
  }, [
    phaseContext.context,
    phaseContext.intensity,
    phaseContext.requiresCelebration,
    phaseContext.shouldMotivate,
    playContextualFeedback,
    playCelebration,
    playMotivationalBoost
  ]);
  
  // 📊 Détection de progression pour motivations intelligentes
  useEffect(() => {
    const progress = workout.computed.progressPercentage;
    
    // 🎯 Motivation à 50%
    if (progress === 50) {
      playMotivationalBoost('halfway');
    }
    
    // 🔥 Motivation dans les 20% finaux
    if (progress >= 80 && progress < 100 && phaseContext.intensity === INTENSITY_LEVELS.FINAL_PUSH) {
      playMotivationalBoost('final_push');
    }
    
    // 🎊 Célébration de rythme parfait
    if (phaseContext.metadata?.paceQuality === 'excellent') {
      playMotivationalBoost('pace_celebration');
    }
    
  }, [
    workout.computed.progressPercentage,
    phaseContext.intensity,
    phaseContext.metadata?.paceQuality,
    playMotivationalBoost
  ]);
  
  // 🎵 Sons de progression personnalisés
  const playProgressionSound = useCallback(async (progressionType) => {
    if (!defaultOptions.enableProgressionSounds) return;
    
    const progressionSounds = {
      exercise_start: SOUND_TYPES.STANDARD_TRANSITION,
      exercise_complete: SOUND_TYPES.ACHIEVEMENT_UNLOCK,
      rest_start: SOUND_TYPES.GENTLE_RECOVERY,
      round_complete: SOUND_TYPES.ACHIEVEMENT_UNLOCK,
      workout_start: SOUND_TYPES.ENERGETIC_START
    };
    
    const sound = progressionSounds[progressionType];
    if (sound) {
      await audioEngine.playContextualSound(sound, phaseContext.intensity);
    }
  }, [audioEngine, phaseContext.intensity, defaultOptions.enableProgressionSounds]);
  
  // 🔧 Contrôles audio dédiés workout
  const workoutAudioControls = useMemo(() => ({
    // 🎵 Contrôles de base
    mute: audioEngine.mute,
    unmute: audioEngine.unmute,
    
    // 🎯 Fonctions contextuelles
    playForContext: playContextualFeedback,
    playMotivation: playMotivationalBoost,
    playCelebration,
    playProgression: playProgressionSound,
    
    // 🧪 Tests audio
    testAudio: audioEngine.utils.testAudio,
    testVibration: audioEngine.utils.testVibration,
    
    // 🎚️ Réglages
    adjustVolume: (level) => {
      // TODO: Implémenter ajustement dynamique
      console.log(`🔊 Volume ajusté: ${level}`);
    }
  }), [
    audioEngine.mute,
    audioEngine.unmute,
    audioEngine.utils.testAudio,
    audioEngine.utils.testVibration,
    playContextualFeedback,
    playMotivationalBoost,
    playCelebration,
    playProgressionSound
  ]);
  
  // 📊 Statistiques audio workout
  const audioStats = useMemo(() => ({
    // 📈 Stats du Audio Engine
    ...audioEngine.stats,
    
    // 📊 Stats spécifiques workout
    contextualPlays: audioHistoryRef.current.length,
    lastContextPlayed: lastPlayedContextRef.current,
    audioHistory: audioHistoryRef.current.slice(-10), // 10 derniers
    
    // 🎯 Répartition par type de contexte
    contextBreakdown: audioHistoryRef.current.reduce((acc, entry) => {
      acc[entry.context] = (acc[entry.context] || 0) + 1;
      return acc;
    }, {}),
    
    // 🔊 Support système
    systemSupport: audioEngine.supported
  }), [audioEngine.stats, audioEngine.supported]);
  
  // 📊 Interface publique du hook
  return {
    // 🎵 Fonctions principales
    playContextualFeedback,
    playMotivationalBoost,
    playCelebration,
    playProgressionSound,
    
    // 🎮 Contrôles
    controls: workoutAudioControls,
    
    // 📊 État et statistiques
    stats: audioStats,
    supported: audioEngine.supported,
    
    // ⚙️ Configuration
    config: defaultOptions,
    
    // 🔧 Utilitaires
    utils: {
      // 📜 Historique complet
      getAudioHistory: () => audioHistoryRef.current,
      
      // 🧹 Reset de l'historique
      clearHistory: () => {
        audioHistoryRef.current = [];
        lastPlayedContextRef.current = null;
        lastPlayedTimestampRef.current = 0;
      },
      
      // 🏥 Health check du système audio
      healthCheck: () => {
        const audioHealth = audioEngine.utils.getSupportInfo();
        const workoutAudioHealth = {
          contextualAudioActive: defaultOptions.enableContextualAudio,
          lastPlayTime: new Date(lastPlayedTimestampRef.current).toISOString(),
          historySize: audioHistoryRef.current.length,
          currentContext: phaseContext.context
        };
        
        return {
          audioEngine: audioHealth,
          workoutAudio: workoutAudioHealth,
          overall: audioHealth.webAudio && defaultOptions.enableContextualAudio
        };
      },
      
      // 🎯 Forcer un feedback (pour tests)
      forceContextualFeedback: (context, intensity) => {
        return playContextualFeedback(context, intensity, true);
      }
    }
  };
};

/**
 * 🚀 Hook simplifié pour usage basique
 * Clean Code: "Provide a simple interface for common cases"
 */
export const useBasicWorkoutAudio = (workout, phaseContext) => {
  const audio = useWorkoutAudio(workout, phaseContext, {
    enableContextualAudio: true,
    enableMotivationalBoosts: true,
    enableCelebrations: true,
    enableProgressionSounds: false, // Simplifié
    enableRestingSounds: true
  });
  
  return {
    playFeedback: audio.playContextualFeedback,
    mute: audio.controls.mute,
    unmute: audio.controls.unmute,
    stats: {
      supported: audio.supported,
      playsCount: audio.stats.contextualPlays
    }
  };
};

export default useWorkoutAudio;