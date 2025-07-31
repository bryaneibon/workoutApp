// src/components/workout/NextExercisePreview.jsx
// 🎯 WA-012.1: Composant Aperçu Exercice Suivant extrait
// Référence Clean Code: "Make meaningful distinctions"

import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody } from '../ui/Card.jsx';

/**
 * 🎯 Utilitaire pour récupérer l'exercice suivant avec contexte
 * Clean Code: "Functions should have descriptive names"
 */
const getNextExerciseData = (workout) => {
  const { state } = workout;
  
  if (!state.exercises.length) return null;
  
  const isLastExercise = state.currentExerciseIndex === state.exercises.length - 1;
  const isLastRound = state.currentRound === state.totalRounds;
  
  // Dernier exercice du dernier round
  if (isLastExercise && isLastRound) {
    return { isComplete: true };
  }
  
  // Dernier exercice du round mais pas le dernier round
  if (isLastExercise) {
    return {
      exercise: state.exercises[0],
      context: `Round ${state.currentRound + 1}`,
      isNewRound: true
    };
  }
  
  // Exercice suivant dans le round actuel
  return {
    exercise: state.exercises[state.currentExerciseIndex + 1],
    context: `Round ${state.currentRound}`,
    isNewRound: false
  };
};

/**
 * 🔮 Composant NextExercisePreview - Aperçu exercice suivant
 * 
 * Responsabilité unique : Montrer le prochain exercice de façon discrète
 * Pragmatic Programmer: "DRY - Don't Repeat Yourself"
 */
const NextExercisePreview = ({ 
  workout, 
  className = '' 
}) => {
  const nextExerciseData = getNextExerciseData(workout);
  
  // 🏁 Cas spécial : Dernier exercice
  if (!nextExerciseData || nextExerciseData.isComplete) {
    return (
      <Card variant="gradient" className={`opacity-75 backdrop-blur-sm ${className}`}>
        <CardHeader 
          title="🎉 Dernier exercice !"
          icon="🏁"
        />
        <CardBody>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              {`Plus qu'un effort !`}
            </h3>
            <p className="text-slate-600 mb-4">
              Vous terminez bientôt votre workout
            </p>
            
            {/* Message motivationnel final */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-700 font-medium flex items-center justify-center space-x-2">
                <span>🏆</span>
                <span>Félicitations pour votre persévérance !</span>
              </p>
            </div>
            
            {/* Statistiques finales */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/50 p-2 rounded border">
                <div className="font-medium text-slate-700">Round</div>
                <div className="text-purple-600">{workout.state.currentRound}/{workout.state.totalRounds}</div>
              </div>
              <div className="bg-white/50 p-2 rounded border">
                <div className="font-medium text-slate-700">Progression</div>
                <div className="text-emerald-600">{workout.computed.progressPercentage}%</div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  const { exercise, context, isNewRound } = nextExerciseData;
  
  return (
    <Card 
      variant="outline" 
      className={`opacity-80 backdrop-blur-sm bg-slate-50/70 border-dashed border-slate-300 ${className}`}
    >
      <CardHeader 
        title={isNewRound ? "🆕 Nouveau round" : "⏭️ Exercice suivant"}
        description={context}
        icon={exercise.images.start}
      />
      <CardBody>
        <div className="text-center">
          {/* Images d'exercice - Version floutée pour différencier */}
          <div className="flex justify-center items-center space-x-6 mb-4 opacity-75">
            <div className="text-5xl filter blur-[1px] transition-all hover:blur-none">
              {exercise.images.start}
            </div>
            <div className="text-xl text-slate-400">→</div>
            <div className="text-5xl filter blur-[1px] transition-all hover:blur-none">
              {exercise.images.end}
            </div>
          </div>
          
          {/* Nom de l'exercice */}
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            {exercise.name}
          </h3>
          
          {/* Badges informatifs */}
          <div className="flex justify-center items-center space-x-3 mb-4">
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm opacity-75">
              {exercise.muscleGroup}
            </span>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm opacity-75">
              {exercise.difficulty}
            </span>
            {isNewRound && (
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                Nouveau Round!
              </span>
            )}
          </div>
          
          {/* Instructions aperçu - Version simplifiée */}
          <div className="bg-slate-100/50 p-3 rounded-lg border border-slate-200 text-left">
            <h4 className="font-medium text-slate-700 mb-2 flex items-center">
              <span className="opacity-75 mr-2">💡</span>
              <span>Aperçu des instructions</span>
            </h4>
            <div className="text-sm text-slate-600 space-y-1 opacity-90">
              {exercise.instructions?.slice(0, 2).map((instruction, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-slate-400 mr-2 flex-shrink-0">{index + 1}.</span>
                  <span>{instruction}</span>
                </div>
              )) || (
                <div className="text-slate-500 italic">
                  {`Instructions complètes disponibles lors de l'exercice`}
                </div>
              )}
              {exercise.instructions && exercise.instructions.length > 2 && (
                <div className="text-slate-400 text-xs mt-2">
                  +{exercise.instructions.length - 2} étape(s) supplémentaire(s)
                </div>
              )}
            </div>
          </div>
          
          {/* Indicateur de préparation mentale */}
          <div className="mt-4 bg-slate-50 p-2 rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500 flex items-center justify-center space-x-2">
              <span>🧠</span>
              <span>Préparez-vous mentalement...</span>
              {isNewRound && <span>• Nouveau round en approche!</span>}
            </div>
          </div>
          
          {/* Countdown visuel si proche */}
          {workout.state.timeRemaining <= 10 && workout.state.timeRemaining > 0 && (
            <div className="mt-3 bg-yellow-50 p-2 rounded border border-yellow-200">
              <div className="text-sm text-yellow-700 font-medium flex items-center justify-center space-x-2">
                <span>⚡</span>
                <span>Dans {workout.state.timeRemaining}s</span>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

// 🎯 PropTypes pour validation
NextExercisePreview.propTypes = {
  /** Instance complète du workout avec state et computed */
  workout: PropTypes.shape({
    state: PropTypes.shape({
      exercises: PropTypes.array.isRequired,
      currentExerciseIndex: PropTypes.number.isRequired,
      currentRound: PropTypes.number.isRequired,
      totalRounds: PropTypes.number.isRequired,
      timeRemaining: PropTypes.number.isRequired
    }).isRequired,
    computed: PropTypes.shape({
      progressPercentage: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  /** Classes CSS additionnelles */
  className: PropTypes.string
};

NextExercisePreview.defaultProps = {
  className: ''
};

export default NextExercisePreview;