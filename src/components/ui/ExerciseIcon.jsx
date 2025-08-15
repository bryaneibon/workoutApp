// src/components/ui/ExerciseIcon.jsx
// 🎨 WA-REDESIGN-005: Composant pour afficher les icônes d'exercices Lucide
// Référence Clean Code: "Single Responsibility Principle"
// Référence Pragmatic Programmer: "DRY - Don't Repeat Yourself"

import React from 'react';
import PropTypes from 'prop-types';
import { 
  ArrowDown, 
  ArrowUp, 
  ArrowLeft, 
  ArrowRight,
  User, 
  UserCheck,
  ChevronDown,
  Minus,
  Shield,
  Zap,
  Sparkles,
  Mountain,
  Activity,
  TrendingUp,
  RotateCcw,
  RotateCw,
  Rocket,
  Dumbbell,
  HelpCircle
} from 'lucide-react';

/**
 * Mapping des noms d'icônes vers les composants Lucide
 * Clean Code: "Use intention-revealing names"
 */
const ICON_MAP = {
  // Mouvements de base
  'ArrowDown': ArrowDown,
  'ArrowUp': ArrowUp,
  'ArrowLeft': ArrowLeft,
  'ArrowRight': ArrowRight,
  
  // Positions humaines
  'User': User,
  'UserCheck': UserCheck,
  'ChevronDown': ChevronDown,
  
  // États et actions
  'Minus': Minus,
  'Shield': Shield,
  'Zap': Zap,
  'Sparkles': Sparkles,
  'Mountain': Mountain,
  'Activity': Activity,
  'TrendingUp': TrendingUp,
  'RotateCcw': RotateCcw,
  'RotateCw': RotateCw,
  'Rocket': Rocket,
  'Dumbbell': Dumbbell,
  
  // Fallback
  'HelpCircle': HelpCircle
};

/**
 * Configuration des couleurs par type d'exercice
 */
const getColorConfig = (exerciseType, phase = 'start') => {
  const configs = {
    // Exercices cardio - tons bleus/verts
    cardio: {
      start: 'text-blue-600',
      end: 'text-green-600',
      bg: 'bg-blue-50',
      hover: 'hover:text-blue-700'
    },
    
    // Exercices force - tons gris/noirs
    strength: {
      start: 'text-gray-600',
      end: 'text-gray-800',
      bg: 'bg-gray-50',
      hover: 'hover:text-gray-900'
    },
    
    // Exercices explosifs - tons oranges/rouges
    explosive: {
      start: 'text-orange-500',
      end: 'text-red-600',
      bg: 'bg-orange-50',
      hover: 'hover:text-orange-700'
    },
    
    // Default - tons bleus cohérents avec le thème
    default: {
      start: 'text-blue-600',
      end: 'text-blue-700',
      bg: 'bg-blue-50',
      hover: 'hover:text-blue-800'
    }
  };
  
  return configs[exerciseType] || configs.default;
};

/**
 * Détermine le type d'exercice basé sur les caractéristiques
 */
const getExerciseType = (exercise) => {
  if (!exercise) return 'default';
  
  const { muscleGroup, difficulty, name } = exercise;
  
  if (muscleGroup === 'Cardio') return 'cardio';
  if (name.toLowerCase().includes('explosive') || name.toLowerCase().includes('burpees')) return 'explosive';
  if (difficulty === 'avancé' && muscleGroup !== 'Cardio') return 'explosive';
  if (['Pectoraux', 'Jambes', 'Dos'].includes(muscleGroup)) return 'strength';
  
  return 'default';
};

/**
 * Composant ExerciseIcon
 * @param {Object} props - Propriétés du composant
 * @param {string} props.iconName - Nom de l'icône Lucide
 * @param {Object} props.exercise - Objet exercice pour la contextualisation
 * @param {string} props.phase - Phase de l'exercice ('start' ou 'end')
 * @param {string} props.size - Taille de l'icône ('sm', 'md', 'lg', 'xl')
 * @param {string} props.className - Classes CSS additionnelles
 * @param {boolean} props.animated - Active les animations
 * @param {Function} props.onClick - Fonction appelée au clic
 */
const ExerciseIcon = ({ 
  iconName, 
  exercise, 
  phase = 'start', 
  size = 'md', 
  className = '', 
  animated = true,
  onClick 
}) => {
  // Récupère le composant d'icône
  const IconComponent = ICON_MAP[iconName] || ICON_MAP['HelpCircle'];
  
  // Détermine le type d'exercice et les couleurs
  const exerciseType = getExerciseType(exercise);
  const colorConfig = getColorConfig(exerciseType, phase);
  
  // Configuration des tailles
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  
  // Classes d'animation conditionnelles
  const animationClasses = animated ? 
    'transition-all duration-300 hover:scale-110 hover:rotate-3' : 
    'transition-colors duration-200';
  
  // Classes de base
  const baseClasses = `
    ${sizeClasses[size]}
    ${colorConfig[phase]}
    ${colorConfig.hover}
    ${animationClasses}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div 
      className={`inline-flex items-center justify-center ${colorConfig.bg} rounded-lg p-2 ${animated ? 'hover:scale-105' : ''} transition-all duration-300`}
      onClick={onClick}
      title={exercise ? `${exercise.name} - ${phase === 'start' ? 'Position de départ' : 'Position finale'}` : iconName}
    >
      <IconComponent className={baseClasses} />
    </div>
  );
};

/**
 * Composant ExerciseIconPair pour afficher start/end ensemble
 */
export const ExerciseIconPair = ({ 
  exercise, 
  size = 'lg', 
  animated = true, 
  showArrow = true,
  className = '',
  onStartClick,
  onEndClick
}) => {
  if (!exercise || !exercise.images) {
    return (
      <div className="flex items-center gap-4 opacity-50">
        <ExerciseIcon iconName="HelpCircle" size={size} animated={false} />
        {showArrow && <ArrowRight className="w-4 h-4 text-gray-400" />}
        <ExerciseIcon iconName="HelpCircle" size={size} animated={false} />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <ExerciseIcon 
        iconName={exercise.images.start}
        exercise={exercise}
        phase="start"
        size={size}
        animated={animated}
        onClick={onStartClick}
      />
      
      {showArrow && (
        <ArrowRight className={`w-4 h-4 text-gray-400 ${animated ? 'animate-pulse' : ''}`} />
      )}
      
      <ExerciseIcon 
        iconName={exercise.images.end}
        exercise={exercise}
        phase="end"
        size={size}
        animated={animated}
        onClick={onEndClick}
      />
    </div>
  );
};

// PropTypes
ExerciseIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  exercise: PropTypes.object,
  phase: PropTypes.oneOf(['start', 'end']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  animated: PropTypes.bool,
  onClick: PropTypes.func
};

ExerciseIconPair.propTypes = {
  exercise: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  animated: PropTypes.bool,
  showArrow: PropTypes.bool,
  className: PropTypes.string,
  onStartClick: PropTypes.func,
  onEndClick: PropTypes.func
};

export default ExerciseIcon;