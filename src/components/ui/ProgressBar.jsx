// src/components/ui/ProgressBar.jsx
// 🎨 WA-008.5: Composant ProgressBar avec PropTypes (Clean Code compliance)
// Référence Clean Code: "Make meaningful distinctions"

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Variantes de barres de progression
 */
const progressVariants = {
  default: 'bg-blue-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  gradient: 'bg-gradient-to-r from-blue-500 to-emerald-500'
};

/**
 * Tailles de barres de progression
 */
const progressSizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
  xl: 'h-4'
};

/**
 * Composant ProgressBar
 */
const ProgressBar = ({
  value,
  max,
  variant,
  size,
  animated,
  showLabel,
  label,
  className,
  ...props
}) => {
  // 🐛 FIX: Gestion des valeurs invalides et NaN
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  const safeMax = typeof max === 'number' && !isNaN(max) && max > 0 ? max : 100;
  
  const percentage = Math.min(Math.max((safeValue / safeMax) * 100, 0), 100);
  
  // 🐛 FIX: Vérification supplémentaire pour éviter NaN
  const displayPercentage = isNaN(percentage) ? 0 : Math.round(percentage);
  
  const baseClasses = 'w-full bg-slate-200 rounded-full overflow-hidden';
  const sizeClasses = progressSizes[size] || progressSizes.md;
  const variantClasses = progressVariants[variant] || progressVariants.default;
  
  const animationClasses = animated ? 'transition-all duration-500 ease-out' : '';
  
  return (
    <div className={`${className}`} {...props}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-700">
            {label || 'Progression'}
          </span>
          <span className="text-sm text-slate-600">
            {displayPercentage}%
          </span>
        </div>
      )}
      
      <div className={`${baseClasses} ${sizeClasses}`}>
        <div 
          className={`${sizeClasses} ${variantClasses} ${animationClasses} rounded-full`}
          style={{ 
            width: `${displayPercentage}%`,
            transition: animated ? 'width 0.5s ease-out' : 'none'
          }}
        />
      </div>
    </div>
  );
};

// 🎯 PropTypes pour ProgressBar
ProgressBar.propTypes = {
  /** Valeur actuelle de la progression */
  value: PropTypes.number,
  /** Valeur maximale */
  max: PropTypes.number,
  /** Style de la barre de progression */
  variant: PropTypes.oneOf(Object.keys(progressVariants)),
  /** Taille de la barre */
  size: PropTypes.oneOf(Object.keys(progressSizes)),
  /** Animation de la progression */
  animated: PropTypes.bool,
  /** Afficher le pourcentage */
  showLabel: PropTypes.bool,
  /** Texte personnalisé du label */
  label: PropTypes.string,
  /** Classes CSS additionnelles */
  className: PropTypes.string
};

ProgressBar.defaultProps = {
  value: 0,
  max: 100,
  variant: 'default',
  size: 'md',
  animated: false,
  showLabel: false,
  label: '',
  className: ''
};

/**
 * Barre de progression circulaire
 */
export const CircularProgress = ({
  value,
  max,
  size,
  strokeWidth,
  variant,
  showLabel,
  label,
  className
}) => {
  // 🐛 FIX: Gestion des valeurs invalides
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  const safeMax = typeof max === 'number' && !isNaN(max) && max > 0 ? max : 100;
  
  const percentage = Math.min(Math.max((safeValue / safeMax) * 100, 0), 100);
  const displayPercentage = isNaN(percentage) ? 0 : Math.round(percentage);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const colorClasses = {
    default: 'stroke-blue-500',
    success: 'stroke-emerald-500',
    warning: 'stroke-amber-500',
    danger: 'stroke-red-500'
  };
  
  const strokeColor = colorClasses[variant] || colorClasses.default;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-slate-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={isNaN(strokeDashoffset) ? circumference : strokeDashoffset}
          strokeLinecap="round"
          className={`transition-all duration-500 ease-out ${strokeColor}`}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-slate-800">
              {displayPercentage}%
            </div>
            {label && (
              <div className="text-xs text-slate-600">{label}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// PropTypes pour CircularProgress
CircularProgress.propTypes = {
  /** Valeur actuelle */
  value: PropTypes.number,
  /** Valeur maximale */
  max: PropTypes.number,
  /** Taille du cercle */
  size: PropTypes.number,
  /** Épaisseur du trait */
  strokeWidth: PropTypes.number,
  /** Variante de couleur */
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  /** Afficher le label */
  showLabel: PropTypes.bool,
  /** Texte du label */
  label: PropTypes.string,
  /** Classes CSS additionnelles */
  className: PropTypes.string
};

CircularProgress.defaultProps = {
  value: 0,
  max: 100,
  size: 120,
  strokeWidth: 8,
  variant: 'default',
  showLabel: true,
  label: '',
  className: ''
};

/**
 * Barre de progression avec étapes
 */
export const SteppedProgress = ({
  currentStep,
  totalSteps,
  steps,
  variant,
  className
}) => {
  // 🐛 FIX: Gestion des valeurs invalides
  const safeCurrent = typeof currentStep === 'number' && !isNaN(currentStep) && currentStep >= 1 ? currentStep : 1;
  const safeTotal = typeof totalSteps === 'number' && !isNaN(totalSteps) && totalSteps > 0 ? totalSteps : 3;
  const safeSteps = Array.isArray(steps) ? steps : [];
  
  // Assurer que currentStep ne dépasse pas totalSteps
  const clampedCurrent = Math.min(safeCurrent, safeTotal);
  
  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-4">
        {safeSteps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < clampedCurrent;
          const isCurrent = stepNumber === clampedCurrent;
          
          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                  ${isCompleted 
                    ? 'bg-emerald-500 text-white' 
                    : isCurrent 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-200 text-slate-600'
                  }
                `}>
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <div className="mt-2 text-xs text-center max-w-16">
                  <div className={`font-medium ${isCurrent ? 'text-blue-600' : 'text-slate-600'}`}>
                    {step.label || `Étape ${stepNumber}`}
                  </div>
                  {step.description && (
                    <div className="text-slate-500 mt-1">{step.description}</div>
                  )}
                </div>
              </div>
              
              {stepNumber < safeTotal && (
                <div className={`
                  flex-1 h-1 mx-2 rounded-full transition-all duration-300
                  ${isCompleted ? 'bg-emerald-500' : 'bg-slate-200'}
                `} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      <ProgressBar 
        value={safeTotal > 1 ? ((clampedCurrent - 1) / (safeTotal - 1)) * 100 : 0}
        max={100}
        variant={variant}
        animated
        showLabel
        label={`Étape ${clampedCurrent} sur ${safeTotal}`}
      />
    </div>
  );
};

// Type pour une étape
const stepShape = PropTypes.shape({
  id: PropTypes.number,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.string
});

SteppedProgress.propTypes = {
  /** Étape actuelle */
  currentStep: PropTypes.number,
  /** Nombre total d'étapes */
  totalSteps: PropTypes.number,
  /** Configuration des étapes */
  steps: PropTypes.arrayOf(stepShape),
  /** Variante de couleur */
  variant: PropTypes.oneOf(Object.keys(progressVariants)),
  /** Classes CSS additionnelles */
  className: PropTypes.string
};

SteppedProgress.defaultProps = {
  currentStep: 1,
  totalSteps: 3,
  steps: [],
  variant: 'default',
  className: ''
};

/**
 * Composants pré-configurés pour WorkoutApp
 */
export const WorkoutProgress = ({ completedExercises, totalExercises, ...props }) => {
  // 🐛 FIX: Gestion des valeurs invalides et division par zéro
  const safeCompleted = typeof completedExercises === 'number' && !isNaN(completedExercises) ? completedExercises : 0;
  const safeTotal = typeof totalExercises === 'number' && !isNaN(totalExercises) && totalExercises > 0 ? totalExercises : 1;
  
  return (
    <ProgressBar
      value={safeCompleted}
      max={safeTotal}
      variant="gradient"
      size="lg"
      animated
      showLabel
      label="Progression du workout"
      {...props}
    />
  );
};

WorkoutProgress.propTypes = {
  /** Nombre d'exercices complétés */
  completedExercises: PropTypes.number.isRequired,
  /** Nombre total d'exercices */
  totalExercises: PropTypes.number.isRequired
};

export const TimerProgress = ({ timeRemaining, totalTime, ...props }) => {
  // 🐛 FIX: Gestion des valeurs invalides
  const safeTimeRemaining = typeof timeRemaining === 'number' && !isNaN(timeRemaining) ? timeRemaining : 0;
  const safeTotalTime = typeof totalTime === 'number' && !isNaN(totalTime) && totalTime > 0 ? totalTime : 1;
  
  // Le temps écoulé = temps total - temps restant
  const timeElapsed = Math.max(0, safeTotalTime - safeTimeRemaining);
  
  return (
    <ProgressBar
      value={timeElapsed}
      max={safeTotalTime}
      variant="success"
      size="md"
      animated
      showLabel
      label="Temps écoulé"
      {...props}
    />
  );
};

TimerProgress.propTypes = {
  /** Temps restant en secondes */
  timeRemaining: PropTypes.number.isRequired,
  /** Temps total en secondes */
  totalTime: PropTypes.number.isRequired
};

export const RoundProgress = ({ currentRound, totalRounds, ...props }) => {
  // 🐛 FIX: Gestion des valeurs invalides
  const safeCurrent = typeof currentRound === 'number' && !isNaN(currentRound) ? currentRound : 1;
  const safeTotal = typeof totalRounds === 'number' && !isNaN(totalRounds) && totalRounds > 0 ? totalRounds : 1;
  
  return (
    <CircularProgress
      value={safeCurrent}
      max={safeTotal}
      variant="default"
      showLabel
      label="Rounds"
      {...props}
    />
  );
};

RoundProgress.propTypes = {
  /** Round actuel */
  currentRound: PropTypes.number.isRequired,
  /** Nombre total de rounds */
  totalRounds: PropTypes.number.isRequired
};

export default ProgressBar;