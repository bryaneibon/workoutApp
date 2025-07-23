// src/components/ui/ProgressBar.jsx
// 🎨 WA-007.1: Composant ProgressBar réutilisable avec Tailwind
// Référence Clean Code: "Make meaningful distinctions"

import React from 'react';

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
 * @param {Object} props - Propriétés de la barre de progression
 * @param {number} props.value - Valeur actuelle (0-100)
 * @param {number} props.max - Valeur maximale (défaut: 100)
 * @param {string} props.variant - Style de la barre
 * @param {string} props.size - Taille de la barre
 * @param {boolean} props.animated - Animation de la progression
 * @param {boolean} props.showLabel - Afficher le pourcentage
 * @param {string} props.label - Texte personnalisé
 * @param {string} props.className - Classes CSS additionnelles
 */
const ProgressBar = ({
  value = 0,
  max = 100,
  variant = 'default',
  size = 'md',
  animated = false,
  showLabel = false,
  label = '',
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
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
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className={`${baseClasses} ${sizeClasses}`}>
        <div 
          className={`${sizeClasses} ${variantClasses} ${animationClasses} rounded-full`}
          style={{ 
            width: `${percentage}%`,
            transition: animated ? 'width 0.5s ease-out' : 'none'
          }}
        />
      </div>
    </div>
  );
};

/**
 * Barre de progression circulaire
 */
export const CircularProgress = ({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'default',
  showLabel = true,
  label = '',
  className = ''
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
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
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-all duration-500 ease-out ${strokeColor}`}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-slate-800">
              {Math.round(percentage)}%
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

/**
 * Barre de progression avec étapes
 */
export const SteppedProgress = ({
  currentStep = 1,
  totalSteps = 3,
  steps = [],
  variant = 'default',
  className = ''
}) => {
  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
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
              
              {stepNumber < totalSteps && (
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
        value={((currentStep - 1) / (totalSteps - 1)) * 100}
        variant={variant}
        animated
        showLabel
        label={`Étape ${currentStep} sur ${totalSteps}`}
      />
    </div>
  );
};

/**
 * Composants pré-configurés pour WorkoutApp
 */
export const WorkoutProgress = ({ completedExercises, totalExercises, ...props }) => (
  <ProgressBar
    value={completedExercises}
    max={totalExercises}
    variant="gradient"
    size="lg"
    animated
    showLabel
    label="Progression du workout"
    {...props}
  />
);

export const TimerProgress = ({ timeRemaining, totalTime, ...props }) => (
  <ProgressBar
    value={totalTime - timeRemaining}
    max={totalTime}
    variant="success"
    size="md"
    animated
    showLabel
    label="Temps écoulé"
    {...props}
  />
);

export const RoundProgress = ({ currentRound, totalRounds, ...props }) => (
  <CircularProgress
    value={currentRound}
    max={totalRounds}
    variant="default"
    showLabel
    label="Rounds"
    {...props}
  />
);

export default ProgressBar;