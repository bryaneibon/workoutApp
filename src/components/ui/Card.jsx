// src/components/ui/Card.jsx
// 🎨 WA-008.5: Composant Card avec PropTypes (Clean Code compliance)
// Référence Clean Code: "Compose methods to tell a story"

import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button.jsx';

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
 */
const Card = ({
  variant,
  hoverable,
  clickable,
  className,
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

// 🎯 PropTypes pour Card
Card.propTypes = {
  /** Style de la carte */
  variant: PropTypes.oneOf(Object.keys(cardVariants)),
  /** Carte avec effet hover */
  hoverable: PropTypes.bool,
  /** Carte cliquable */
  clickable: PropTypes.bool,
  /** Classes CSS additionnelles */
  className: PropTypes.string,
  /** Contenu de la carte */
  children: PropTypes.node.isRequired,
  /** Fonction appelée au clic */
  onClick: PropTypes.func
};

Card.defaultProps = {
  variant: 'default',
  hoverable: false,
  clickable: false,
  className: ''
};

/**
 * En-tête de carte avec titre et description
 */
export const CardHeader = ({ title, description, icon, action, className }) => (
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

CardHeader.propTypes = {
  /** Titre de la carte */
  title: PropTypes.string.isRequired,
  /** Description optionnelle */
  description: PropTypes.string,
  /** Icône optionnelle */
  icon: PropTypes.string,
  /** Action optionnelle (bouton, etc.) */
  action: PropTypes.node,
  /** Classes CSS additionnelles */
  className: PropTypes.string
};

CardHeader.defaultProps = {
  className: ''
};

/**
 * Corps de carte
 */
export const CardBody = ({ children, className }) => (
  <div className={`space-y-4 ${className}`}>
    {children}
  </div>
);

CardBody.propTypes = {
  /** Contenu du corps */
  children: PropTypes.node.isRequired,
  /** Classes CSS additionnelles */
  className: PropTypes.string
};

CardBody.defaultProps = {
  className: ''
};

/**
 * Pied de carte avec actions
 */
export const CardFooter = ({ children, className }) => (
  <div className={`mt-6 pt-4 border-t border-slate-200 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

CardFooter.propTypes = {
  /** Contenu du pied */
  children: PropTypes.node.isRequired,
  /** Classes CSS additionnelles */
  className: PropTypes.string
};

CardFooter.defaultProps = {
  className: ''
};

/**
 * Composants de cartes pré-configurés pour WorkoutApp
 */
export const WorkoutCard = ({ children, ...props }) => (
  <Card variant="gradient" hoverable {...props}>
    {children}
  </Card>
);

WorkoutCard.propTypes = {
  children: PropTypes.node.isRequired
};

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

StatsCard.propTypes = {
  /** Titre de la statistique */
  title: PropTypes.string.isRequired,
  /** Valeur de la statistique */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** Icône optionnelle */
  icon: PropTypes.string,
  /** Direction de la tendance */
  trend: PropTypes.oneOf(['up', 'down', 'neutral']),
  /** Valeur de la tendance */
  trendValue: PropTypes.string
};

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

// Type pour un exercice
const exerciseShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  muscleGroup: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  images: PropTypes.shape({
    start: PropTypes.string.isRequired,
    end: PropTypes.string
  }).isRequired,
  defaultDuration: PropTypes.number.isRequired
});

ExerciseCard.propTypes = {
  /** Données de l'exercice */
  exercise: exerciseShape.isRequired,
  /** Si l'exercice est sélectionné */
  selected: PropTypes.bool,
  /** Fonction appelée lors de la sélection */
  onSelect: PropTypes.func
};

ExerciseCard.defaultProps = {
  selected: false
};

export const PlanCard = ({ plan, onSelect, ...props }) => (
  <WorkoutCard {...props}>
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
      <Button
        variant="success"
        size="sm"
        onClick={() => onSelect && onSelect(plan)}
        className="text-sm"
      >
        🚀 Démarrer
      </Button>
    </CardFooter>
  </WorkoutCard>
);

// Type pour un plan de workout
const planShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  difficulty: PropTypes.string.isRequired,
  estimatedDuration: PropTypes.number.isRequired,
  exercises: PropTypes.arrayOf(PropTypes.string)
});

PlanCard.propTypes = {
  /** Données du plan */
  plan: planShape.isRequired,
  /** Fonction appelée lors de la sélection */
  onSelect: PropTypes.func
};

export default Card;