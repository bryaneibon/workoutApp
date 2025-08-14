// src/design-system/components/Progress.jsx
// 📊 WA-DESIGN-001.3: Progress Components - V0's Progress System Extracted
// Référence Clean Code: "Make it expressive"
// Référence Pragmatic Programmer: "Don't repeat yourself"

/**
 * 🎯 PROGRESS COMPONENTS VECT - EXTRACTED FROM V0's PROGRESS MASTERY
 * 
 * V0's GENIUS: warm-progress-gradient + workout progress + smooth transitions
 * Leur system: h-2 bg-black/5 rounded-full + transition-all duration-500
 * 
 * Clean Code: "Express the intent clearly"
 */

import React from 'react';
import PropTypes from 'prop-types';
import { GlassCard, UILabel, StatsNumber, BodyAthletic } from '../primitives/index.jsx';
import { gradients, warmColors, spacingScale } from '../tokens/index.js';

// ============================================================================
// 📊 BASE PROGRESS BAR (V0's Foundation)
// ============================================================================

/**
 * Progress Bar - V0's barre de progression extracted
 * Leur pattern: bg-black/5 + warm-progress-gradient + transition-all
 */
export const ProgressBar = ({
  value = 0,
  max = 100,
  variant = 'workout',
  size = 'default',
  animated = true,
  showLabel = false,
  label,
  className = '',
  ...props
}) => {
  // Calcul sécurisé du pourcentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  // V0's variant configurations
  const variantConfig = {
    workout: {
      background: gradients.warm_progress_gradient,    // V0's signature
      glow: 'rgba(249, 115, 22, 0.3)',
      className: 'warm-progress-gradient'
    },
    primary: {
      background: gradients.primary_button,
      glow: 'rgba(59, 130, 246, 0.3)',
      className: 'primary-progress'
    },
    success: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      glow: 'rgba(16, 185, 129, 0.3)',
      className: 'success-progress'
    },
    warning: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      glow: 'rgba(245, 158, 11, 0.3)',
      className: 'warning-progress'
    },
    danger: {
      background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      glow: 'rgba(220, 38, 38, 0.3)',
      className: 'danger-progress'
    }
  };
  
  // V0's size configurations
  const sizeConfig = {
    sm: { height: '4px', borderRadius: '2px' },
    default: { height: '8px', borderRadius: '4px' },    // V0's h-2
    lg: { height: '12px', borderRadius: '6px' },
    xl: { height: '16px', borderRadius: '8px' }
  };
  
  const config = variantConfig[variant] || variantConfig.workout;
  const sizing = sizeConfig[size] || sizeConfig.default;
  
  // V0's animation classes
  const animationClasses = animated ? 'transition-all duration-500 ease-out' : '';
  
  return (
    <div className={`progress-bar-container ${className}`} {...props}>
      {/* Label optionnel */}
      {showLabel && (label || percentage > 0) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <UILabel size="small" color="muted">
              {label}
            </UILabel>
          )}
          <UILabel size="small" color="primary">
            {Math.round(percentage)}%
          </UILabel>
        </div>
      )}
      
      {/* V0's progress container */}
      <div 
        className={`progress-track bg-black/5 rounded-full overflow-hidden backdrop-blur-sm leading-6 shadow-md ${animationClasses}`}
        style={{ 
          height: sizing.height,
          borderRadius: sizing.borderRadius
        }}
      >
        {/* V0's progress fill */}
        <div
          className={`progress-fill h-full rounded-full ${config.className} ${animationClasses}`}
          style={{
            width: `${percentage}%`,
            background: config.background,
            boxShadow: percentage > 0 ? `0 0 12px ${config.glow}` : 'none'
          }}
        />
      </div>
    </div>
  );
};

// PropTypes for ProgressBar
ProgressBar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  variant: PropTypes.oneOf(['workout', 'primary', 'success', 'warning', 'danger']),
  size: PropTypes.oneOf(['sm', 'default', 'lg', 'xl']),
  animated: PropTypes.bool,
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string
};

// ============================================================================
// 🏋️ WORKOUT PROGRESS (V0's Workout Pattern)
// ============================================================================

/**
 * Workout Progress - V0's workout progress system extracted
 * Leur pattern: exercises completed + overall progress + stats
 */
export const WorkoutProgress = ({
  completedExercises = 0,
  totalExercises = 1,
  currentRound = 1,
  totalRounds = 1,
  timeElapsed = 0,
  estimatedTimeRemaining = 0,
  showStats = true,
  className = '',
  ...props
}) => {
  // Calculs V0-style
  const exerciseProgress = (completedExercises / totalExercises) * 100;
  const roundProgress = ((currentRound - 1) / totalRounds) * 100;
  const overallProgress = ((currentRound - 1) * 100 + exerciseProgress) / totalRounds;
  
  // Format du temps (V0's formatTime)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <GlassCard 
      variant="light" 
      size="lg"
      className={`workout-progress ${className}`}
      {...props}
    >
      {/* Header avec titre */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <UILabel size="default" color="primary">
            WORKOUT PROGRESS
          </UILabel>
          <StatsNumber 
            size="default" 
            color="workout"
            suffix="%"
          >
            {Math.round(overallProgress)}
          </StatsNumber>
        </div>
        
        {/* V0's main progress bar */}
        <ProgressBar
          value={overallProgress}
          max={100}
          variant="workout"
          size="lg"
          animated={true}
        />
      </div>
      
      {/* V0's stats grid */}
      {showStats && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Exercices */}
          <div className="text-center">
            <UILabel size="small" color="muted" className="mb-1">
              EXERCISES
            </UILabel>
            <StatsNumber size="large" color="primary">
              {completedExercises}/{totalExercises}
            </StatsNumber>
          </div>
          
          {/* Rounds */}
          <div className="text-center">
            <UILabel size="small" color="muted" className="mb-1">
              ROUND
            </UILabel>
            <StatsNumber size="large" color="primary">
              {currentRound}/{totalRounds}
            </StatsNumber>
          </div>
        </div>
      )}
      
      {/* Temps stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <UILabel size="small" color="muted" className="mb-1">
            ELAPSED
          </UILabel>
          <BodyAthletic size="default" color="primary">
            {formatTime(timeElapsed)}
          </BodyAthletic>
        </div>
        
        <div className="text-center">
          <UILabel size="small" color="muted" className="mb-1">
            REMAINING
          </UILabel>
          <BodyAthletic size="default" color="secondary">
            {formatTime(estimatedTimeRemaining)}
          </BodyAthletic>
        </div>
      </div>
      
      {/* Exercise progress detail */}
      <div className="mt-4">
        <ProgressBar
          value={exerciseProgress}
          max={100}
          variant="primary"
          size="sm"
          label="Current Exercise"
          showLabel={true}
        />
      </div>
    </GlassCard>
  );
};

// PropTypes for WorkoutProgress
WorkoutProgress.propTypes = {
  completedExercises: PropTypes.number,
  totalExercises: PropTypes.number,
  currentRound: PropTypes.number,
  totalRounds: PropTypes.number,
  timeElapsed: PropTypes.number,
  estimatedTimeRemaining: PropTypes.number,
  showStats: PropTypes.bool,
  className: PropTypes.string
};

// ============================================================================
// 🎯 CIRCULAR PROGRESS (V0's Alternative)
// ============================================================================

/**
 * Circular Progress - Alternative circulaire au timer
 * Inspiré du timer V0 mais pour progress général
 */
export const CircularProgress = ({
  value = 0,
  max = 100,
  size = 'medium',
  variant = 'primary',
  thickness = 8,
  showLabel = true,
  label,
  children,
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  // Tailles
  const sizeMap = {
    small: 80,
    medium: 120,
    large: 160,
    xlarge: 200
  };
  
  const diameter = sizeMap[size] || sizeMap.medium;
  const radius = (diameter / 2) - thickness;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // V0's variant colors
  const variantColors = {
    primary: '#3b82f6',
    workout: '#f97316',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#dc2626'
  };
  
  const color = variantColors[variant] || variantColors.primary;
  
  return (
    <div 
      className={`circular-progress relative ${className}`}
      style={{ width: diameter, height: diameter }}
      {...props}
    >
      <svg
        className="transform -rotate-90"
        width={diameter}
        height={diameter}
      >
        {/* Background circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth={thickness}
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          stroke={color}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children || (
          <>
            <StatsNumber 
              size={size === 'small' ? 'small' : 'default'}
              color={variant}
              suffix="%"
            >
              {Math.round(percentage)}
            </StatsNumber>
            {showLabel && label && (
              <UILabel size="small" color="muted" className="mt-1">
                {label}
              </UILabel>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// PropTypes for CircularProgress
CircularProgress.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  variant: PropTypes.oneOf(['primary', 'workout', 'success', 'warning', 'danger']),
  thickness: PropTypes.number,
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string
};

// ============================================================================
// 📈 MULTI PROGRESS (Stacked Progress)
// ============================================================================

/**
 * Multi Progress - Barres de progression multiples
 * Pour afficher plusieurs métriques simultanement
 */
export const MultiProgress = ({
  segments = [],
  size = 'default',
  showLegend = true,
  className = '',
  ...props
}) => {
  // Calcul des pourcentages relatifs
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const normalizedSegments = segments.map(segment => ({
    ...segment,
    percentage: total > 0 ? (segment.value / total) * 100 : 0
  }));
  
  // V0's size configurations
  const sizeConfig = {
    sm: { height: '6px' },
    default: { height: '10px' },
    lg: { height: '14px' },
    xl: { height: '18px' }
  };
  
  const sizing = sizeConfig[size] || sizeConfig.default;

  return (
    <div className={`multi-progress ${className}`} {...props}>
      {/* Progress segments */}
      <div 
        className="flex rounded-full overflow-hidden bg-gray-100"
        style={{ height: sizing.height }}
      >
        {normalizedSegments.map((segment, index) => (
          <div
            key={segment.label || index}
            className="transition-all duration-500 ease-out first:rounded-l-full last:rounded-r-full"
            style={{
              width: `${segment.percentage}%`,
              backgroundColor: segment.color || '#3b82f6'
            }}
            title={`${segment.label}: ${segment.value} (${Math.round(segment.percentage)}%)`}
          />
        ))}
      </div>
      
      {/* Legend */}
      {showLegend && segments.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3">
          {segments.map((segment, index) => (
            <div key={segment.label || index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color || '#3b82f6' }}
              />
              <UILabel size="small" color="muted">
                {segment.label}: {segment.value}
              </UILabel>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// PropTypes for MultiProgress
MultiProgress.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    color: PropTypes.string
  })),
  size: PropTypes.oneOf(['sm', 'default', 'lg', 'xl']),
  showLegend: PropTypes.bool,
  className: PropTypes.string
};

// ============================================================================
// 🎯 PROGRESS CARD (V0's Card + Progress)
// ============================================================================

/**
 * Progress Card - Carte avec progress intégré
 * V0's pattern: card + progress + stats
 */
export const ProgressCard = ({
  title,
  value,
  max = 100,
  variant = 'primary',
  icon,
  subtitle,
  showPercentage = true,
  trend,
  className = '',
  children,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  // V0's icon colors
  const iconColors = {
    primary: 'text-blue-600',
    workout: 'text-orange-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600'
  };

  return (
    <GlassCard 
      variant="elevated"
      size="md"
      hoverable
      className={`progress-card ${className}`}
      {...props}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className={`text-2xl ${iconColors[variant]}`}>
              {icon}
            </div>
          )}
          <div>
            <UILabel size="small" color="muted" className="mb-1">
              {title}
            </UILabel>
            {subtitle && (
              <BodyAthletic size="small" color="secondary">
                {subtitle}
              </BodyAthletic>
            )}
          </div>
        </div>
        
        {/* Value display */}
        <div className="text-right">
          <StatsNumber 
            size="large" 
            color={variant}
            suffix={showPercentage ? '%' : ''}
          >
            {showPercentage ? Math.round(percentage) : value}
          </StatsNumber>
          
          {/* Trend indicator */}
          {trend && (
            <div className={`text-xs mt-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
            </div>
          )}
        </div>
      </div>
      
      {/* Progress bar */}
      <ProgressBar
        value={value}
        max={max}
        variant={variant}
        size="default"
        animated={true}
      />
      
      {/* Additional content */}
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </GlassCard>
  );
};

// PropTypes for ProgressCard
ProgressCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  variant: PropTypes.oneOf(['primary', 'workout', 'success', 'warning', 'danger']),
  icon: PropTypes.node,
  subtitle: PropTypes.string,
  showPercentage: PropTypes.bool,
  trend: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node
};

// ============================================================================
// ⏱️ TIMER PROGRESS (Specific to Timers)
// ============================================================================

/**
 * Timer Progress - Progress spécifique aux timers
 * Combine progress bar + temps restant
 */
export const TimerProgress = ({
  timeRemaining,
  totalTime,
  phase = 'work',
  showTimeLabels = true,
  className = '',
  ...props
}) => {
  const progress = totalTime > 0 ? ((totalTime - timeRemaining) / totalTime) * 100 : 0;
  
  // Format du temps
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // V0's phase variants
  const phaseVariants = {
    work: 'primary',
    rest: 'danger',
    preparation: 'warning',
    complete: 'success'
  };

  return (
    <div className={`timer-progress ${className}`} {...props}>
      {/* Time labels */}
      {showTimeLabels && (
        <div className="flex justify-between items-center mb-2">
          <UILabel size="small" color="primary">
            {formatTime(totalTime - timeRemaining)} elapsed
          </UILabel>
          <UILabel size="small" color="muted">
            {formatTime(timeRemaining)} remaining
          </UILabel>
        </div>
      )}
      
      {/* Progress bar */}
      <ProgressBar
        value={progress}
        max={100}
        variant={phaseVariants[phase]}
        size="lg"
        animated={true}
      />
      
      {/* Phase indicator */}
      <div className="flex justify-center mt-2">
        <UILabel 
          size="small" 
          className={`px-2 py-1 rounded-full ${
            phase === 'work' ? 'bg-blue-100 text-blue-800' :
            phase === 'rest' ? 'bg-red-100 text-red-800' :
            phase === 'preparation' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}
        >
          {phase.toUpperCase()}
        </UILabel>
      </div>
    </div>
  );
};

// PropTypes for TimerProgress
TimerProgress.propTypes = {
  timeRemaining: PropTypes.number.isRequired,
  totalTime: PropTypes.number.isRequired,
  phase: PropTypes.oneOf(['work', 'rest', 'preparation', 'complete']),
  showTimeLabels: PropTypes.bool,
  className: PropTypes.string
};

// ============================================================================
// 🛠️ PROGRESS UTILITIES (Helper Functions)
// ============================================================================

/**
 * Hook pour gérer l'état de progression
 * @param {number} initialValue - Valeur initiale
 * @param {number} max - Valeur maximale
 * @returns {Object} État et contrôles
 */
export const useProgressState = (initialValue = 0, max = 100) => {
  const [value, setValue] = React.useState(initialValue);
  const [isAnimating, setIsAnimating] = React.useState(false);
  
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  // Increment with animation
  const increment = (amount = 1) => {
    setIsAnimating(true);
    setValue(prev => Math.min(prev + amount, max));
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  // Decrement with animation
  const decrement = (amount = 1) => {
    setIsAnimating(true);
    setValue(prev => Math.max(prev - amount, 0));
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  // Set to specific value
  const setProgress = (newValue) => {
    setIsAnimating(true);
    setValue(Math.min(Math.max(newValue, 0), max));
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  // Reset to initial
  const reset = () => {
    setIsAnimating(true);
    setValue(initialValue);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  return {
    value,
    percentage,
    isAnimating,
    increment,
    decrement,
    setProgress,
    reset,
    isComplete: value >= max
  };
};

/**
 * Helper pour créer des segments colorés automatiquement
 * @param {Array} data - Données à transformer
 * @param {Array} colors - Couleurs à utiliser
 * @returns {Array} Segments formatés
 */
export const createProgressSegments = (data, colors = ['#3b82f6', '#10b981', '#f59e0b', '#dc2626']) => {
  return data.map((item, index) => ({
    label: item.label || `Segment ${index + 1}`,
    value: item.value || 0,
    color: item.color || colors[index % colors.length]
  }));
};

/**
 * Helper pour calculer le temps restant basé sur le progrès
 * @param {number} progress - Progrès actuel (0-100)
 * @param {number} totalTime - Temps total en secondes
 * @returns {number} Temps restant en secondes
 */
export const calculateTimeRemaining = (progress, totalTime) => {
  const elapsed = (progress / 100) * totalTime;
  return Math.max(totalTime - elapsed, 0);
};

/**
 * Helper pour formater les durées
 * @param {number} seconds - Secondes
 * @returns {string} Durée formatée
 */
export const formatDuration = (seconds) => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours}h ${minutes}m ${secs}s`;
};

export default ProgressBar;