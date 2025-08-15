// src/components/views/HomeView.jsx
// 🎨 WA-REDESIGN-004: HomeView ultra clean avec intégration ExerciseIcon
// Référence Clean Code: "Functions should be small and do one thing"
// Référence Pragmatic Programmer: "DRY - Don't Repeat Yourself"

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EXERCISES_DATABASE } from '@/data/exercices.js';
import { WORKOUT_PLANS } from '@/data/workoutPlans.js';
import { APP_VIEWS } from '@/constants/workoutStates';
import ExerciseIcon, { ExerciseIconPair } from '../ui/ExerciseIcon.jsx';

import { 
  Zap, 
  Target, 
  Users, 
  Infinity,
  Play,
  Settings,
  TrendingUp,
  Dumbbell,
  Clock,
  ChevronRight,
  Star,
  ArrowRight,
  Eye
} from 'lucide-react';

/**
 * Composant Card Premium réutilisable
 */
const PremiumCard = ({ children, className = '', hover = true, onClick }) => (
  <div 
    className={`
      bg-white border border-gray-200/60 rounded-xl p-6 shadow-lg
      transition-all duration-300 ease-out
      ${hover ? 'hover:shadow-xl hover:border-gray-300/60 hover:scale-[1.02]' : ''}
      ${onClick ? 'cursor-pointer' : ''}
      ${className}
    `}
    onClick={onClick}
  >
    {children}
  </div>
);

/**
 * Section de statistiques rapides avec design premium
 */
const QuickStats = () => {
  const exerciseCount = Object.keys(EXERCISES_DATABASE).length;
  const planCount = Object.keys(WORKOUT_PLANS).length;
  const muscleGroups = [...new Set(Object.values(EXERCISES_DATABASE).map(ex => ex.muscleGroup))];

  const stats = [
    {
      value: exerciseCount,
      label: 'Exercices',
      icon: Dumbbell,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      value: planCount,
      label: 'Plans',
      icon: Target,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      border: 'border-gray-200'
    },
    {
      value: muscleGroups.length,
      label: 'Groupes musculaires',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      value: '∞',
      label: 'Possibilités',
      icon: Infinity,
      color: 'text-gray-800',
      bg: 'bg-gray-50',
      border: 'border-gray-200'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map(({ value, label, icon: Icon, color, bg, border }, index) => (
        <PremiumCard 
          key={label}
          className={`text-center ${bg} ${border} hover:scale-105`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <Icon className={`w-6 h-6 mx-auto mb-3 ${color}`} />
          <div className={`text-2xl font-bold ${color} mb-1`}>
            {value}
          </div>
          <div className="text-xs text-gray-600 font-medium">
            {label}
          </div>
        </PremiumCard>
      ))}
    </div>
  );
};

/**
 * Composant PlanCard Premium avec ExerciseIcon
 */
const PlanCard = ({ plan, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const difficultyConfig = {
    'Débutant': { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    'Intermédiaire': { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    'Avancé': { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' }
  };

  const difficulty = difficultyConfig[plan.difficulty] || difficultyConfig['Débutant'];

  // Récupère les exercices du plan pour afficher leurs icônes
  const planExercises = plan.exercises
    .map(exerciseId => EXERCISES_DATABASE[exerciseId])
    .filter(Boolean)
    .slice(0, 3); // Limite à 3 exercices pour l'affichage

  return (
    <PremiumCard 
      className="group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(plan)}
    >
      {/* Badge difficulté */}
      <div className={`
        absolute top-4 right-4 px-2 py-1 rounded-lg text-xs font-semibold
        ${difficulty.bg} ${difficulty.border} ${difficulty.color} border
      `}>
        {plan.difficulty}
      </div>

      {/* Contenu principal */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {plan.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {plan.description}
        </p>
      </div>

      {/* Aperçu des exercices avec ExerciseIcon */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Aperçu des exercices :</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {planExercises.map((exercise, index) => (
            <div key={exercise.id} className="flex-shrink-0">
              <ExerciseIcon 
                iconName={exercise.images.start}
                exercise={exercise}
                size="sm"
                animated={isHovered}
                className="opacity-75 hover:opacity-100"
              />
            </div>
          ))}
          {plan.exercises.length > 3 && (
            <div className="flex-shrink-0 text-xs text-gray-500 ml-2">
              +{plan.exercises.length - 3} autres
            </div>
          )}
        </div>
      </div>

      {/* Métadonnées */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{plan.estimatedDuration} min</span>
        </div>
        <div className="flex items-center gap-1">
          <Dumbbell className="w-4 h-4" />
          <span>{plan.exercises.length} exercices</span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">4.0</span>
      </div>

      {/* Button d'action */}
      <button className={`
        w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg
        bg-blue-600 text-white font-semibold text-sm
        hover:bg-blue-700 transition-all duration-200
        ${isHovered ? 'scale-105' : 'scale-100'}
      `}>
        <Play className="w-4 h-4" />
        <span>Commencer</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </button>
    </PremiumCard>
  );
};

/**
 * Section de démarrage rapide redesignée
 */
const QuickStartSection = ({ onSelectPlan, onNavigate }) => (
  <PremiumCard className="mb-8">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Zap className="w-6 h-6 text-blue-600" />
          Démarrage rapide
        </h2>
        <p className="text-gray-600">
          Choisissez un plan d'entraînement prédéfini ou créez le vôtre
        </p>
      </div>
      <TrendingUp className="w-8 h-8 text-blue-600 opacity-20" />
    </div>
    
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {Object.values(WORKOUT_PLANS).map(plan => (
        <PlanCard
          key={plan.id}
          plan={plan}
          onSelect={onSelectPlan}
        />
      ))}
    </div>
    
    <div className="text-center pt-6 border-t border-gray-200">
      <button
        onClick={() => onNavigate(APP_VIEWS.WORKOUT_CONFIG)}
        className="
          inline-flex items-center gap-2 px-6 py-3 
          bg-gray-800 text-white font-semibold rounded-lg
          hover:bg-blue-600 hover:scale-105 
          transition-all duration-200 shadow-md hover:shadow-lg
        "
      >
        <Settings className="w-4 h-4" />
        <span>Créer un workout personnalisé</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </PremiumCard>
);

/**
 * Section d'aperçu des exercices avec ExerciseIconPair
 */
const ExercisePreview = () => {
  const exerciseEntries = Object.values(EXERCISES_DATABASE).slice(0, 12); // Limite à 8 pour le design
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <PremiumCard className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-blue-600" />
          Aperçu des exercices
        </h3>
        <div className="text-sm text-gray-600">
          {Object.keys(EXERCISES_DATABASE).length} exercices disponibles
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {exerciseEntries.map((exercise, index) => (
          <div
            key={exercise.id}
            className={`
              group p-4 border border-gray-200 rounded-lg 
              hover:border-blue-200 hover:bg-blue-50/50 hover:scale-[1.02]
              transition-all duration-300 cursor-pointer
              ${selectedExercise?.id === exercise.id ? 'border-blue-300 bg-blue-50' : 'bg-gray-50'}
            `}
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => setSelectedExercise(selectedExercise?.id === exercise.id ? null : exercise)}
          >
            {/* Header avec nom et difficulté */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  {exercise.name}
                </h4>
                <div className="text-xs text-gray-600 mb-2">
                  {exercise.muscleGroup}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-lg font-medium">
                  {exercise.difficulty}
                </span>
                <span className="text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {exercise.defaultDuration}s
                </span>
              </div>
            </div>

            {/* ExerciseIconPair - Le composant principal ! */}
            <div className="flex justify-center mb-3">
              <ExerciseIconPair 
                exercise={exercise}
                size="lg"
                animated={true}
                showArrow={true}
                className="scale-90 group-hover:scale-100 transition-transform duration-300"
              />
            </div>

            {/* Muscles secondaires */}
            <div className="text-xs text-gray-500">
              <span className="font-medium">Muscles secondaires : </span>
              {exercise.secondaryMuscles.join(', ')}
            </div>

            {/* Instructions en preview si sélectionné */}
            {selectedExercise?.id === exercise.id && (
              <div className="mt-4 pt-4 border-t border-gray-200 animate-in fade-in duration-300">
                <h5 className="font-medium text-gray-700 mb-2 text-sm">Instructions :</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  {exercise.instructions.map((instruction, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">{i + 1}.</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center mt-6 pt-6 border-t border-gray-200">
        <span className="text-sm text-gray-600">
          Cliquez sur un exercice pour voir les instructions détaillées
        </span>
      </div>
    </PremiumCard>
  );
};

/**
 * Composant principal HomeView redesigné
 * @param {Object} props - Propriétés du composant
 * @param {Function} props.onSelectPlan - Callback de sélection de plan
 * @param {Function} props.onNavigate - Callback de navigation
 */
const HomeView = ({ onSelectPlan, onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <QuickStats />
      <QuickStartSection 
        onSelectPlan={onSelectPlan} 
        onNavigate={onNavigate} 
      />
      <ExercisePreview />
    </div>
  );
};

// 🎯 PropTypes
HomeView.propTypes = {
  /** Fonction appelée lors de la sélection d'un plan d'entraînement */
  onSelectPlan: PropTypes.func.isRequired,
  /** Fonction de navigation vers une autre vue de l'application */
  onNavigate: PropTypes.func.isRequired
};

QuickStartSection.propTypes = {
  /** Fonction appelée lors de la sélection d'un plan */
  onSelectPlan: PropTypes.func.isRequired,
  /** Fonction de navigation vers une vue */
  onNavigate: PropTypes.func.isRequired
};

PlanCard.propTypes = {
  /** Plan d'entraînement à afficher */
  plan: PropTypes.object.isRequired,
  /** Fonction appelée lors de la sélection du plan */
  onSelect: PropTypes.func.isRequired
};

PremiumCard.propTypes = {
  /** Contenu de la card */
  children: PropTypes.node.isRequired,
  /** Classes CSS additionnelles */
  className: PropTypes.string,
  /** Active les effets de hover */
  hover: PropTypes.bool,
  /** Fonction appelée au clic */
  onClick: PropTypes.func
};

export default HomeView;