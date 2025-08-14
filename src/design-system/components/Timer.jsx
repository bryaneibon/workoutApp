// src/design-system/components/Timer.jsx
// ⏱️ WA-DESIGN-001.3: Timer Component - V0's Circular Timer Extracted
// Référence Clean Code: "Compose methods to tell a story"
// Référence Pragmatic Programmer: "Don't repeat yourself"

/**
 * 🎯 TIMER COMPONENTS VECT - EXTRACTED FROM V0's CIRCULAR TIMER MASTERY
 * 
 * V0's GENIUS: Circular SVG timer with gradient + glow effects
 * w-80 h-80 + strokeDasharray + strokeDashoffset + gradient
 * 
 * Clean Code: "Functions should do one thing and do it well"
 */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { GlassCard, TimerDigits, UILabel, BodyAthletic } from '../primitives/index.jsx';
import { gradients, shadows, componentSizes } from '../tokens/index.js';

// ============================================================================
// ⏱️ CIRCULAR TIMER (V0's SVG Masterpiece)
// ============================================================================

/**
 * Circular Timer - V0's timer circulaire extracted et amélioré
 * Leur breakthrough: SVG + linear gradient + stroke-dasharray animation
 */
export const CircularTimer = ({
  timeRemaining,
  totalTime,
  size = 'large',
  variant = 'work',
  showGlow = true,
  animated = true,
  className = '',
  ...props
}) => {
  // V0's size system (w-80 h-80 = 320px)
  const sizeMap = {
    small: componentSizes.timer.small,    // 200px
    medium: componentSizes.timer.medium,  // 280px
    large: componentSizes.timer.large,    // 320px (V0's choice)
    xlarge: componentSizes.timer.xlarge   // 400px
  };
  
  const timerSize = sizeMap[size] || sizeMap.large;
  const radius = (timerSize / 2) - 20;  // V0's radius calculation
  const circumference = 2 * Math.PI * radius;
  
  // V0's progress calculation
  const progress = totalTime > 0 ? ((totalTime - timeRemaining) / totalTime) * 100 : 0;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  // V0's variant colors
  const variantConfig = {
    work: {
      gradient: gradients.progress_ring,           // V0's blue→orange
      glowColor: 'rgba(59, 130, 246, 0.6)',      // V0's blue-work-glow
      className: 'blue-work-glow'
    },
    rest: {
      gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      glowColor: 'rgba(220, 38, 38, 0.6)',
      className: 'red-rest-glow'
    },
    preparation: {
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      glowColor: 'rgba(245, 158, 11, 0.6)',
      className: 'orange-prep-glow'
    },
    complete: {
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      glowColor: 'rgba(16, 185, 129, 0.6)',
      className: 'green-complete-glow'
    }
  };
  
  const config = variantConfig[variant] || variantConfig.work;
  
  // V0's animation classes
  const animationClasses = [
    animated && 'transition-all duration-1000 ease-linear',
    showGlow && config.className,
    'world-class-ring'                              // V0's premium ring class
  ].filter(Boolean).join(' ');
  
  // Gradient ID unique pour éviter les conflits
  const gradientId = `timer-gradient-${variant}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div 
      className={`circular-timer relative ${className}`}
      style={{ width: timerSize, height: timerSize }}
      {...props}
    >
      <svg
        className={`transform -rotate-90 ${animationClasses}`}
        width={timerSize}
        height={timerSize}
        viewBox={`0 0 ${timerSize} ${timerSize}`}
      >
        {/* V0's gradient definition */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
        
        {/* V0's background circle */}
        <circle
          cx={timerSize / 2}
          cy={timerSize / 2}
          r={radius}
          stroke="rgba(30, 41, 59, 0.1)"          // V0's background color
          strokeWidth="2"
          fill="none"
        />
        
        {/* V0's progress circle */}
        <circle
          cx={timerSize / 2}
          cy={timerSize / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth="5"                          // V0's stroke width
          fill="none"
          strokeLinecap="round"                    // V0's rounded caps
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="smooth-transition"            // V0's transition class
          style={{
            filter: showGlow ? `drop-shadow(0 0 15px ${config.glowColor})` : 'none'
          }}
        />
      </svg>
    </div>
  );
};

// PropTypes for CircularTimer
CircularTimer.propTypes = {
  timeRemaining: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  variant: PropTypes.oneOf(['work', 'rest', 'preparation', 'complete']),
  showGlow: PropTypes.bool,
  animated: PropTypes.bool,
  className: PropTypes.string
};

// ============================================================================
// 🎯 TIMER DISPLAY (V0's Complete Timer System)
// ============================================================================

/**
 * Timer Display - V0's timer complet avec digits + status
 * Leur pattern: circular timer + digits centrés + status badge
 */
export const TimerDisplay = ({
  timeRemaining,
  totalTime,
  phase = 'work',
  size = 'large',
  showControls = false,
  motivationMessage,
  className = '',
  ...props
}) => {
  // Format du temps (V0's formatTime function)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // V0's phase configuration
  const phaseConfig = {
    work: { 
      label: 'WORK', 
      variant: 'work',
      labelColor: 'text-blue-600',
      bgColor: 'bg-blue-100 border-blue-200'
    },
    rest: { 
      label: 'REST', 
      variant: 'rest',
      labelColor: 'text-red-600',
      bgColor: 'bg-red-100 border-red-200'
    },
    preparation: { 
      label: 'PREPARE', 
      variant: 'preparation',
      labelColor: 'text-orange-600',
      bgColor: 'bg-orange-100 border-orange-200'
    },
    complete: { 
      label: 'COMPLETE', 
      variant: 'complete',
      labelColor: 'text-green-600',
      bgColor: 'bg-green-100 border-green-200'
    }
  };
  
  const config = phaseConfig[phase] || phaseConfig.work;
  
  // V0's breathing animation for active states
  const isActive = phase === 'work' && timeRemaining > 0;
  const breathingClass = isActive ? 'enhanced-breathing' : '';

  return (
    <div className={`timer-display relative ${className}`} {...props}>
      {/* V0's timer container avec breathing */}
      <div className={`relative ${breathingClass}`}>
        <CircularTimer
          timeRemaining={timeRemaining}
          totalTime={totalTime}
          variant={config.variant}
          size={size}
          animated={true}
          showGlow={isActive}
        />
        
        {/* V0's centered content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {phase === 'complete' ? (
            // V0's completion state
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <TimerDigits size="default" color="success">
                DONE!
              </TimerDigits>
            </div>
          ) : (
            // V0's active timer state
            <>
              <TimerDigits 
                size={size === 'large' ? 'default' : 'small'}
                color={config.variant}
                responsive={false}
                className="mb-2"
              >
                {formatTime(timeRemaining)}
              </TimerDigits>
              
              {/* V0's phase badge */}
              <UILabel
                size="small"
                className={`px-3 py-1 rounded-full backdrop-blur-sm border ${config.bgColor} ${config.labelColor}`}
              >
                {config.label}
              </UILabel>
            </>
          )}
        </div>
      </div>
      
      {/* V0's motivation message */}
      {motivationMessage && (
        <div className="text-center mt-6">
          <BodyAthletic 
            size="large" 
            className="gradient-text"
          >
            {motivationMessage}
          </BodyAthletic>
        </div>
      )}
    </div>
  );
};

// PropTypes for TimerDisplay
TimerDisplay.propTypes = {
  timeRemaining: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
  phase: PropTypes.oneOf(['work', 'rest', 'preparation', 'complete']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  showControls: PropTypes.bool,
  motivationMessage: PropTypes.string,
  className: PropTypes.string
};

// ============================================================================
// 📱 COMPACT TIMER (V0's Mobile Variant)
// ============================================================================

/**
 * Compact Timer - Version compacte pour espaces restreints
 * Inspiré de V0 mais optimisé pour mobile
 */
export const CompactTimer = ({
  timeRemaining,
  totalTime,
  phase = 'work',
  showProgress = true,
  className = '',
  ...props
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progress = totalTime > 0 ? ((totalTime - timeRemaining) / totalTime) * 100 : 0;
  
  // V0's phase colors simplified
  const phaseColors = {
    work: 'text-blue-600',
    rest: 'text-red-600',
    preparation: 'text-orange-600',
    complete: 'text-green-600'
  };

  return (
    <GlassCard 
      variant="light" 
      size="sm" 
      className={`compact-timer ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        {/* Timer digits */}
        <div className="flex items-center space-x-3">
          <TimerDigits 
            size="small" 
            className={phaseColors[phase]}
            responsive={false}
          >
            {formatTime(timeRemaining)}
          </TimerDigits>
          
          <UILabel 
            size="small"
            className={phaseColors[phase]}
          >
            {phase.toUpperCase()}
          </UILabel>
        </div>
        
        {/* Compact progress */}
        {showProgress && (
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

// PropTypes for CompactTimer
CompactTimer.propTypes = {
  timeRemaining: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
  phase: PropTypes.oneOf(['work', 'rest', 'preparation', 'complete']),
  showProgress: PropTypes.bool,
  className: PropTypes.string
};

// ============================================================================
// 🛠️ TIMER UTILITIES (Helper Functions)
// ============================================================================

/**
 * Hook pour gérer l'état du timer
 * @param {number} initialTime - Temps initial
 * @returns {Object} État et contrôles du timer
 */
export const useTimerState = (initialTime = 0) => {
  const [timeRemaining, setTimeRemaining] = React.useState(initialTime);
  const [totalTime, setTotalTime] = React.useState(initialTime);
  const [isRunning, setIsRunning] = React.useState(false);
  const [phase, setPhase] = React.useState('preparation');
  
  // Reset timer
  const resetTimer = (newTime = initialTime) => {
    setTimeRemaining(newTime);
    setTotalTime(newTime);
    setIsRunning(false);
    setPhase('preparation');
  };
  
  // Start/Stop controls
  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const pauseTimer = () => setIsRunning(false);
  
  return {
    timeRemaining,
    totalTime,
    isRunning,
    phase,
    setTimeRemaining,
    setTotalTime,
    setPhase,
    resetTimer,
    startTimer,
    stopTimer,
    pauseTimer
  };
};

/**
 * Helper pour créer des animations personnalisées
 * @param {string} variant - Type d'animation
 * @returns {Object} Configuration CSS
 */
export const createTimerAnimation = (variant = 'pulse') => {
  const animations = {
    pulse: {
      animation: 'breathing 4s ease-in-out infinite'
    },
    glow: {
      filter: 'drop-shadow(0 0 20px currentColor)',
      animation: 'glow 2s ease-in-out infinite alternate'
    },
    rotate: {
      animation: 'spin 2s linear infinite'
    },
    bounce: {
      animation: 'bounce 1s infinite'
    }
  };
  
  return animations[variant] || animations.pulse;
};

// ============================================================================
// 🚀 EXPORTS
// ============================================================================

export default TimerDisplay;