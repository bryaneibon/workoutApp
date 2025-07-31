// src/components/workout/CurrentExerciseDisplay.jsx
// 🎯 WA-012.1: Composant Exercice Actuel extrait
// Référence Clean Code: "Functions should be small"

import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody } from '../ui/Card.jsx';

/**
 * 🏋️ Composant CurrentExerciseDisplay - Exercice actuel pur
 * 
 * Responsabilité unique : Afficher l'exercice en cours avec instructions
 * Pragmatic Programmer: "Orthogonality - components should be independent"
 */
const CurrentExerciseDisplay = ({ 
  currentExercise, 
  className = '' 
}) => {
  // 🛡️ Guard clause pour exercice manquant
  if (!currentExercise) {
    return (
      <Card variant="outlined" className={`text-center py-8 ${className}`}>
        <div className="text-slate-400">
          <div className="text-4xl mb-2">🏋️</div>
          <p className="text-slate-600">Aucun exercice sélectionné</p>
          <p className="text-sm text-slate-500 mt-1">Chargez un workout pour commencer</p>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="info" className={className}>
      <CardHeader 
        title="Exercice actuel"
        icon={currentExercise.images.start}
      />
      <CardBody>
        <div className="text-center">
          {/* Animation visuelle exercice - Images début/fin */}
          <div className="flex justify-center items-center space-x-8 mb-4">
            <div className="text-6xl transform transition-transform hover:scale-110">
              {currentExercise.images.start}
            </div>
            <div className="text-2xl text-slate-400 animate-pulse">→</div>
            <div className="text-6xl transform transition-transform hover:scale-110">
              {currentExercise.images.end}
            </div>
          </div>
          
          {/* Nom de l'exercice */}
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            {currentExercise.name}
          </h3>
          
          {/* Badges d'information */}
          <div className="flex justify-center items-center space-x-4 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {currentExercise.muscleGroup}
            </span>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
              {currentExercise.difficulty}
            </span>
            {currentExercise.defaultDuration && (
              <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                {currentExercise.defaultDuration}s
              </span>
            )}
          </div>
          
          {/* Muscles secondaires si disponibles */}
          {currentExercise.secondaryMuscles && currentExercise.secondaryMuscles.length > 0 && (
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-1">Muscles secondaires:</div>
              <div className="flex justify-center flex-wrap gap-1">
                {currentExercise.secondaryMuscles.map((muscle, index) => (
                  <span 
                    key={index}
                    className="bg-slate-50 text-slate-600 px-2 py-1 rounded text-xs"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Instructions d'exercice */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-left">
            <h4 className="font-medium text-blue-800 mb-3 flex items-center">
              <span className="text-lg mr-2">💡</span>
              Instructions
            </h4>
            <ol className="text-sm text-blue-700 space-y-2">
              {currentExercise.instructions?.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="flex-1">{instruction}</span>
                </li>
              )) || (
                <li className="text-blue-600 italic">
                  Instructions par défaut : Maintenez une bonne forme et respirez régulièrement.
                </li>
              )}
            </ol>
          </div>
          
          {/* Conseil technique contextuel */}
          <div className="mt-4 bg-amber-50 p-3 rounded-lg border border-amber-200">
            <div className="text-sm text-amber-700 flex items-center justify-center space-x-2">
              <span>🎯</span>
              <span className="font-medium">
                Focus: Contrôlez le mouvement et maintenez la tension musculaire
              </span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

// 🎯 PropTypes pour validation
CurrentExerciseDisplay.propTypes = {
  /** Exercice actuel à afficher */
  currentExercise: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    muscleGroup: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    images: PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired
    }).isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string),
    secondaryMuscles: PropTypes.arrayOf(PropTypes.string),
    defaultDuration: PropTypes.number
  }),
  /** Classes CSS additionnelles */
  className: PropTypes.string
};

CurrentExerciseDisplay.defaultProps = {
  currentExercise: null,
  className: ''
};

export default CurrentExerciseDisplay;