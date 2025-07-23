// src/components/ui/Card.jsx
// 🎨 WA-007.1: Composant Card réutilisable avec Tailwind
// Référence Clean Code: "Compose methods to tell a story"

import React from 'react';

/**
 * Variantes de cartes disponibles
 */
const cardVariants = {
  default: 'bg-white border border-slate-200 shadow-lg',
  elevated: 'bg-white border border-slate-200 shadow-xl',
  outlined: 'bg-white border-2 border-slate-300',
  gradient: 'bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-lg',
  success: 'bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 shadow-lg',
  warning: 'bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 shadow-lg',
  danger: 'bg-gradient-to-br from-red-50 to-red-100 border border-red-200 shadow-lg',
  info: 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-lg'
};

/**
 * Composant Card de base
 * @param {Object} props - Propriétés de la carte
 * @param {string} props.variant - Style de la carte
 * @param {boolean} props.hoverable - Carte avec effet hover
 * @param {boolean} props.clickable - Carte cliquable
 * @param {string} props.className - Classes CSS additionnelles
 * @param {React.ReactNode} props.children - Contenu de la carte
 */
const Card = ({
  variant = 'default',
  hoverable = false,
  clickable = false,
  className = '',
  children,
  onClick,
  ...props
}) => {
  const baseClasses = 'rounded-xl p-6 transition-all duration-200';
  const variantClasses = cardVariants[variant] || cardVariants.default;
  
  const hoverClasses = hoverable || clickable 
    ? 'hover:shadow-xl hover:scale-[1.02] cursor-pointer' 
    : '';
  
  const finalClasses = `${baseClasses} ${variantClasses} ${hoverClasses} ${className}`;

  const CardComponent = clickable || onClick ? 'button' : 'div';

  return (
    <CardComponent
      className={finalClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

/**
 * En-tête de carte avec titre et description
 */
export const CardHeader = ({ title, description, icon, action, className = '' }) => (
  <div className={`mb-6 ${className}`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {icon && <span className="text-2xl">{icon}</span>}
        <div>
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
          {description && (
            <p className="text-sm text-slate-600 mt-1">{description}</p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  </div>
);

/**
 * Corps de carte
 */
export const CardBody = ({ children, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {children}
  </div>
);

/**
 * Pied de carte avec actions
 */
export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-6 pt-4 border-t border-slate-200 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

/**
 * Composants de cartes pré-configurés pour WorkoutApp
 */
export const WorkoutCard = ({ children, ...props }) => (
  <Card variant="gradient" hoverable {...props}>
    {children}
  </Card>
);

export const StatsCard = ({ title, value, icon, trend, trendValue, ...props }) => (
  <Card variant="elevated" className="text-center" {...props}>
    <div className="space-y-2">
      {icon && <div className="text-3xl">{icon}</div>}
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      <div className="text-sm text-slate-600">{title}</div>
      {trend && (
        <div className={`text-xs flex items-center justify-center space-x-1 ${
          trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-600' : 'text-slate-600'
        }`}>
          <span>{trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '➡️'}</span>
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  </Card>
);

export const ExerciseCard = ({ exercise, selected, onSelect, ...props }) => (
  <Card 
    variant={selected ? 'info' : 'default'}
    clickable
    onClick={() => onSelect && onSelect(exercise.id)}
    className={selected ? 'ring-2 ring-blue-500' : ''}
    {...props}
  >
    <div className="flex items-center space-x-4">
      <div className="text-3xl">{exercise.images?.start || '🏋️'}</div>
      <div className="flex-1">
        <h4 className="font-medium text-slate-800">{exercise.name}</h4>
        <p className="text-sm text-slate-600">{exercise.muscleGroup}</p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
            {exercise.difficulty}
          </span>
          <span className="text-xs text-slate-500">
            {exercise.defaultDuration}s
          </span>
        </div>
      </div>
      {selected && (
        <div className="text-blue-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  </Card>
);

export const PlanCard = ({ plan, onSelect, ...props }) => (
  <WorkoutCard clickable onClick={() => onSelect && onSelect(plan)} {...props}>
    <CardHeader 
      title={plan.name}
      description={plan.description}
      icon="🏋️"
    />
    <CardBody>
      <div className="flex justify-between items-center text-sm">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          {plan.difficulty}
        </span>
        <span className="text-slate-600">⏱️ {plan.estimatedDuration} min</span>
      </div>
      <div className="text-xs text-slate-600">
        <strong>Exercices:</strong> {plan.exercises?.length || 0} mouvements
      </div>
    </CardBody>
    <CardFooter>
      <span></span>
      <button className="text-emerald-600 font-medium text-sm hover:text-emerald-700">
        🚀 Démarrer
      </button>
    </CardFooter>
  </WorkoutCard>
);

export default Card;