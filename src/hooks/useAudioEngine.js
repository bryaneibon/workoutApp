// src/hooks/useAudioEngine.js
// 🎵 WA-011.2: Hook Audio Engine pour feedback contextuel
// Référence Clean Code: "Single Responsibility Principle - Audio handling only"
// Référence Pragmatic Programmer: "Fail fast - graceful audio degradation"

import { useCallback, useRef, useState, useEffect } from 'react';
import { PHASE_CONTEXTS, INTENSITY_LEVELS } from './usePhaseContext.js';

/**
 * 🎵 Types de sons contextuels
 * Clean Code: "Use meaningful names for audio categories"
 */
export const SOUND_TYPES = {
  // Sons de transition
  ENERGETIC_START: 'energetic_start',       // Démarrage motivant
  EPIC_FINAL: 'epic_final',                 // Dernier exercice épique
  VICTORY_FANFARE: 'victory_fanfare',       // Victoire complète
  ACHIEVEMENT_UNLOCK: 'achievement_unlock', // Déblocage round
  
  // Sons de progression
  STANDARD_TRANSITION: 'standard_transition', // Transition normale
  GENTLE_RECOVERY: 'gentle_recovery',         // Repos doux
  FINAL_REST: 'final_rest',                   // Repos final intensifié
  
  // Sons motivationnels
  MOTIVATION_BOOST: 'motivation_boost',       // Coup de boost
  STRUGGLE_SUPPORT: 'struggle_support',       // Soutien en difficulté
  PACE_CELEBRATION: 'pace_celebration'        // Célébration du rythme
};

/**
 * 🔊 Niveaux de volume contextuels
 * Pragmatic Programmer: "Design for the extremes"
 */
export const VOLUME_LEVELS = {
  SILENT: 0.0,
  WHISPER: 0.2,
  SOFT: 0.4,
  NORMAL: 0.6,
  LOUD: 0.8,
  MAXIMUM: 1.0
};

/**
 * 📱 Patterns de vibration prédéfinis
 * Clean Code: "Make meaningful distinctions"
 */
export const VIBRATION_PATTERNS = {
  SINGLE_SHORT: [100],
  DOUBLE_SHORT: [100, 50, 100],
  TRIPLE_SHORT: [100, 50, 100, 50, 100],
  LONG_PULSE: [300],
  CELEBRATION: [200, 100, 200, 100, 200],
  EPIC_FINALE: [300, 100, 300, 100, 300, 100, 500],
  GENTLE_NUDGE: [50, 100, 50]
};

/**
 * 🎵 Hook useAudioEngine - Système audio contextuel complet
 * 
 * Fonctionnalités :
 * - Génération de sons contextuels via Web Audio API
 * - Gestion des vibrations adaptatives
 * - Contrôle du volume intelligent
 * - Fallback gracieux si audio non supporté
 * 
 * @param {Object} options - Configuration audio
 * @returns {Object} Interface audio complète
 */
export const useAudioEngine = (options = {}) => {
  // 🎛️ Configuration par défaut
  const defaultOptions = {
    enableSound: true,
    enableVibration: true,
    masterVolume: VOLUME_LEVELS.NORMAL,
    audioContext: null,
    gracefulFallback: true
  };
  
  const config = { ...defaultOptions, ...options };
  
  // 🔗 Références pour la gestion audio
  const audioContextRef = useRef(null);
  const oscillatorCacheRef = useRef(new Map());
  const lastSoundTimeRef = useRef(0);
  
  // 📊 État du système audio
  const [audioSupported, setAudioSupported] = useState(false);
  const [vibrationSupported, setVibrationSupported] = useState(false);
  const [audioStats, setAudioStats] = useState({
    soundsPlayed: 0,
    vibrationsTriggered: 0,
    errorsCount: 0,
    lastActivity: null
  });
  
  // 🔧 Initialisation du contexte audio
  const initializeAudioContext = useCallback(() => {
    // 🛡️ Éviter re-initialisation si déjà fait
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      return true;
    }
    
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      
      if (!AudioContext) {
        console.log('🔇 Web Audio API non supportée');
        return false;
      }
      
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
        console.log('🎵 Contexte audio initialisé');
      }
      
      // Vérifier l'état du contexte
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      
      return true;
    } catch (error) {
      console.error('❌ Erreur initialisation audio:', error);
      setAudioStats(prev => ({ ...prev, errorsCount: prev.errorsCount + 1 }));
      return false;
    }
  }, []);
  
  // 🔍 Vérification des capacités au montage
  useEffect(() => {
    // Test support Web Audio API
    const audioTest = initializeAudioContext();
    setAudioSupported(audioTest);
    
    // Test support vibrations
    const vibrationTest = 'vibrate' in navigator;
    setVibrationSupported(vibrationTest);
    
    console.log(`🔍 Audio Engine Capabilities:
      - Audio: ${audioTest ? '✅' : '❌'}
      - Vibration: ${vibrationTest ? '✅' : '❌'}
      - Master Volume: ${config.masterVolume}`);
  }, []);
  
  // 🎵 Génération de son par fréquence et durée
  const generateTone = useCallback((frequency, duration, volume = VOLUME_LEVELS.NORMAL, waveType = 'sine') => {
    if (!config.enableSound || !audioSupported || !audioContextRef.current) {
      console.log('🔇 Son désactivé ou non supporté');
      return Promise.resolve();
    }
    
    return new Promise((resolve) => {
      try {
        const audioContext = audioContextRef.current;
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Configuration de l'oscillateur
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = waveType;
        
        // Configuration du volume avec fade
        const finalVolume = Math.min(volume * config.masterVolume, VOLUME_LEVELS.MAXIMUM);
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(finalVolume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        // Lecture du son
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
        
        oscillator.onended = () => {
          gainNode.disconnect();
          oscillator.disconnect();
          resolve();
        };
        
        // Mise à jour des stats
        setAudioStats(prev => ({
          ...prev,
          soundsPlayed: prev.soundsPlayed + 1,
          lastActivity: new Date().toISOString()
        }));
        
      } catch (error) {
        console.error('❌ Erreur génération son:', error);
        setAudioStats(prev => ({ ...prev, errorsCount: prev.errorsCount + 1 }));
        resolve();
      }
    });
  }, [config.enableSound, config.masterVolume, audioSupported]);
  
  // 🎼 Séquences audio complexes
  const playSequence = useCallback(async (notes) => {
    if (!notes.length) return;
    
    for (const note of notes) {
      await generateTone(
        note.frequency,
        note.duration,
        note.volume || VOLUME_LEVELS.NORMAL,
        note.waveType || 'sine'
      );
      
      // Pause entre les notes si spécifiée
      if (note.pause) {
        await new Promise(resolve => setTimeout(resolve, note.pause));
      }
    }
  }, [generateTone]);
  
  // 📱 Gestion des vibrations contextuelles
  const triggerVibration = useCallback((pattern = VIBRATION_PATTERNS.SINGLE_SHORT) => {
    if (!config.enableVibration || !vibrationSupported) {
      console.log('📳 Vibration désactivée ou non supportée');
      return false;
    }
    
    try {
      // Éviter les vibrations trop fréquentes
      const now = Date.now();
      if (now - lastSoundTimeRef.current < 100) {
        console.log('📳 Vibration ignorée - trop fréquente');
        return false;
      }
      
      navigator.vibrate(pattern);
      lastSoundTimeRef.current = now;
      
      setAudioStats(prev => ({
        ...prev,
        vibrationsTriggered: prev.vibrationsTriggered + 1,
        lastActivity: new Date().toISOString()
      }));
      
      console.log(`📳 Vibration: [${pattern.join(', ')}]ms`);
      return true;
    } catch (error) {
      console.error('❌ Erreur vibration:', error);
      setAudioStats(prev => ({ ...prev, errorsCount: prev.errorsCount + 1 }));
      return false;
    }
  }, [config.enableVibration, vibrationSupported]);
  
  // 🎯 Sons contextuels prédéfinis basés sur WA-011.1
  const playContextualSound = useCallback(async (soundType, intensity = INTENSITY_LEVELS.NORMAL) => {
    console.log(`🎵 Playing contextual sound: ${soundType} (${intensity})`);
    
    // Définition des sons par type
    const soundDefinitions = {
      [SOUND_TYPES.ENERGETIC_START]: [
        { frequency: 523, duration: 0.2, volume: VOLUME_LEVELS.LOUD },
        { frequency: 659, duration: 0.2, volume: VOLUME_LEVELS.LOUD, pause: 50 },
        { frequency: 784, duration: 0.3, volume: VOLUME_LEVELS.MAXIMUM }
      ],
      
      [SOUND_TYPES.EPIC_FINAL]: [
        { frequency: 392, duration: 0.15, volume: VOLUME_LEVELS.MAXIMUM },
        { frequency: 523, duration: 0.15, volume: VOLUME_LEVELS.MAXIMUM, pause: 20 },
        { frequency: 659, duration: 0.15, volume: VOLUME_LEVELS.MAXIMUM, pause: 20 },
        { frequency: 784, duration: 0.4, volume: VOLUME_LEVELS.MAXIMUM }
      ],
      
      [SOUND_TYPES.VICTORY_FANFARE]: [
        { frequency: 523, duration: 0.2, volume: VOLUME_LEVELS.MAXIMUM },
        { frequency: 659, duration: 0.2, volume: VOLUME_LEVELS.MAXIMUM, pause: 30 },
        { frequency: 784, duration: 0.3, volume: VOLUME_LEVELS.MAXIMUM, pause: 50 },
        { frequency: 1047, duration: 0.5, volume: VOLUME_LEVELS.MAXIMUM }
      ],
      
      [SOUND_TYPES.ACHIEVEMENT_UNLOCK]: [
        { frequency: 440, duration: 0.1, volume: VOLUME_LEVELS.NORMAL },
        { frequency: 554, duration: 0.1, volume: VOLUME_LEVELS.NORMAL, pause: 20 },
        { frequency: 659, duration: 0.2, volume: VOLUME_LEVELS.LOUD }
      ],
      
      [SOUND_TYPES.STANDARD_TRANSITION]: [
        { frequency: 523, duration: 0.15, volume: VOLUME_LEVELS.NORMAL }
      ],
      
      [SOUND_TYPES.GENTLE_RECOVERY]: [
        { frequency: 349, duration: 0.3, volume: VOLUME_LEVELS.SOFT, waveType: 'sine' }
      ],
      
      [SOUND_TYPES.FINAL_REST]: [
        { frequency: 293, duration: 0.2, volume: VOLUME_LEVELS.NORMAL },
        { frequency: 349, duration: 0.3, volume: VOLUME_LEVELS.SOFT, pause: 100 }
      ],
   
    [SOUND_TYPES.PACE_CELEBRATION]: [
        { frequency: 440, duration: 0.1, volume: VOLUME_LEVELS.NORMAL },
        { frequency: 554, duration: 0.1, volume: VOLUME_LEVELS.NORMAL, pause: 20 },
        { frequency: 659, duration: 0.2, volume: VOLUME_LEVELS.LOUD }
      ],
      
      [SOUND_TYPES.MOTIVATION_BOOST]: [
        { frequency: 523, duration: 0.15, volume: VOLUME_LEVELS.NORMAL },
        { frequency: 659, duration: 0.15, volume: VOLUME_LEVELS.LOUD, pause: 50 }
      ],
      
      [SOUND_TYPES.STRUGGLE_SUPPORT]: [
        { frequency: 392, duration: 0.2, volume: VOLUME_LEVELS.SOFT },
        { frequency: 440, duration: 0.3, volume: VOLUME_LEVELS.NORMAL, pause: 100 }
      ]
    };
    
    const soundSequence = soundDefinitions[soundType];
    if (!soundSequence) {
      console.warn(`⚠️ Son contexte inconnu: ${soundType}`);
      return;
    }
    
    // Ajustement du volume selon l'intensité
    const intensityMultipliers = {
      [INTENSITY_LEVELS.LOW]: 0.7,
      [INTENSITY_LEVELS.BUILDING]: 0.8,
      [INTENSITY_LEVELS.PEAK]: 1.0,
      [INTENSITY_LEVELS.SUSTAIN]: 0.9,
      [INTENSITY_LEVELS.FINAL_PUSH]: 1.2,
      [INTENSITY_LEVELS.RECOVERY]: 0.6
    };
    
    const volumeMultiplier = intensityMultipliers[intensity] || 1.0;
    const adjustedSequence = soundSequence.map(note => ({
      ...note,
      volume: Math.min((note.volume || VOLUME_LEVELS.NORMAL) * volumeMultiplier, VOLUME_LEVELS.MAXIMUM)
    }));
    
    await playSequence(adjustedSequence);
  }, [playSequence]);
  
  // 🎯 Fonction principale de feedback contextuel
  const playContextualFeedback = useCallback(async (phaseContext, intensity) => {
    if (!phaseContext) return;
    
    console.log(`🎯 Contextual feedback: ${phaseContext} @ ${intensity}`);
    
    // Mapping phase context → sound + vibration
    const feedbackMap = {
      [PHASE_CONTEXTS.WORKOUT_START]: {
        sound: SOUND_TYPES.ENERGETIC_START,
        vibration: VIBRATION_PATTERNS.DOUBLE_SHORT
      },
      [PHASE_CONTEXTS.FIRST_EXERCISE]: {
        sound: SOUND_TYPES.ENERGETIC_START,
        vibration: VIBRATION_PATTERNS.SINGLE_SHORT
      },
      [PHASE_CONTEXTS.FINAL_EXERCISE]: {
        sound: SOUND_TYPES.EPIC_FINAL,
        vibration: VIBRATION_PATTERNS.EPIC_FINALE
      },
      [PHASE_CONTEXTS.WORKOUT_COMPLETION]: {
        sound: SOUND_TYPES.VICTORY_FANFARE,
        vibration: VIBRATION_PATTERNS.CELEBRATION
      },
      [PHASE_CONTEXTS.ROUND_TRANSITION]: {
        sound: SOUND_TYPES.ACHIEVEMENT_UNLOCK,
        vibration: VIBRATION_PATTERNS.TRIPLE_SHORT
      },
      [PHASE_CONTEXTS.REST_RECOVERY]: {
        sound: intensity === INTENSITY_LEVELS.FINAL_PUSH ? SOUND_TYPES.FINAL_REST : SOUND_TYPES.GENTLE_RECOVERY,
        vibration: VIBRATION_PATTERNS.GENTLE_NUDGE
      },
      [PHASE_CONTEXTS.EXERCISE_TRANSITION]: {
        sound: SOUND_TYPES.STANDARD_TRANSITION,
        vibration: VIBRATION_PATTERNS.SINGLE_SHORT
      }
    };
    
    const feedback = feedbackMap[phaseContext];
    if (!feedback) {
      console.log(`⚠️ Pas de feedback défini pour: ${phaseContext}`);
      return;
    }
    
    // Jouer son + vibration en parallèle
    const soundPromise = playContextualSound(feedback.sound, intensity);
    const vibrationPromise = triggerVibration(feedback.vibration);
    
    await Promise.all([soundPromise, vibrationPromise]);
  }, [playContextualSound, triggerVibration]);
  
  // 🔧 Utilitaires de contrôle
  const muteAll = useCallback(() => {
    config.enableSound = false;
    config.enableVibration = false;
    console.log('🔇 Audio Engine muted');
  }, [config]);
  
  const unmuteAll = useCallback(() => {
    config.enableSound = true;
    config.enableVibration = true;
    console.log('🔊 Audio Engine unmuted');
  }, [config]);
  
  // 📊 Interface publique du hook
  return {
    // 📊 État et capacités
    supported: {
      audio: audioSupported,
      vibration: vibrationSupported
    },
    
    // 📈 Statistiques
    stats: audioStats,
    
    // 🎵 Fonctions audio principales
    playContextualFeedback,
    playContextualSound,
    generateTone,
    playSequence,
    triggerVibration,
    
    // 🎛️ Contrôles
    mute: muteAll,
    unmute: unmuteAll,
    
    // 🔧 Utilitaires
    utils: {
      initializeAudioContext,
      getSupportInfo: () => ({
        audioContext: !!audioContextRef.current,
        webAudio: audioSupported,
        vibration: vibrationSupported,
        masterVolume: config.masterVolume
      }),
      
      // Test rapide des capacités
      testAudio: () => generateTone(440, 0.2, VOLUME_LEVELS.NORMAL),
      testVibration: () => triggerVibration(VIBRATION_PATTERNS.SINGLE_SHORT)
    }
  };
};

export default useAudioEngine;