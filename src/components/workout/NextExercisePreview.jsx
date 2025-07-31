// src/components/workout/NextExercisePreview.jsx
// 🎨 WA-012.2: Enhanced avec anticipation visuelle et micro-interactions
// Référence Clean Code: "Make the invisible visible"

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody } from '../ui/Card.jsx';

/**
 * 🎯 Utilitaire pour récupérer l'exercice suivant avec contexte enhanced
 */
const getNextExerciseData = (workout) => {
  const { state } = workout;
  
  if (!state.exercises.length) return null;
  
  const isLastExercise = state.currentExerciseIndex === state.exercises.length - 1;
  const isLastRound = state.currentRound === state.totalRounds;
  
  if (isLastExercise && isLastRound) {
    return { isComplete: true };
  }
  
  if (isLastExercise) {
    return {
      exercise: state.exercises[0],
      context: `Round ${state.currentRound + 1}`,
      isNewRound: true,
      anticipation: 'high' // Nouveau round = haute anticipation
    };
  }
  
  return {
    exercise: state.exercises[state.currentExerciseIndex + 1],
    context: `Round ${state.currentRound}`,
    isNewRound: false,
    anticipation: 'normal'
  };
};

/**
 * 🔮 Composant NextExercisePreview Enhanced - Anticipation visuelle
 * 
 * WA-012.2 Améliorations visuelles :
 * - Animations d'anticipation selon proximité
 * - Effets de countdown visuel
 * - Transitions d'état fluides
 * - Micro-interactions sur hover
 * 
 * Pragmatic Programmer: "Anticipate the user's needs"
 */
const NextExercisePreview = ({ 
  workout, 
  className = '' 
}) => {
  const [isNearTransition, setIsNearTransition] = useState(false);
  const [anticipationLevel, setAnticipationLevel] = useState('low');
  
  const nextExerciseData = getNextExerciseData(workout);
  
  // 🎯 Effet d'anticipation basé sur le temps restant
  useEffect(() => {
    const timeRemaining = workout.state.timeRemaining;
    
    if (timeRemaining <= 10 && timeRemaining > 5) {
      setAnticipationLevel('medium');
      setIsNearTransition(true);
    } else if (timeRemaining <= 5 && timeRemaining > 0) {
      setAnticipationLevel('high');
      setIsNearTransition(true);
    } else {
      setAnticipationLevel('low');
      setIsNearTransition(false);
    }
  }, [workout.state.timeRemaining]);
  
  // 🏁 Cas spécial : Dernier exercice enhanced
  if (!nextExerciseData || nextExerciseData.isComplete) {
    return (
      <Card 
        variant="gradient" 
        className={`opacity-90 backdrop-blur-sm transition-all duration-700 hover:opacity-100 hover:scale-105 ${className}`}
      >
        <CardHeader 
          title="🎉 Dernier exercice !"
          icon={
            <span className="animate-bounce text-2xl">🏁</span>
          }
        />
        <CardBody>
          <div className="text-center py-8">
            {/* 🎊 Animation de victoire */}
            <div className="relative mb-4">
              <div className="text-6xl animate-victory-bounce">🎉</div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-confetti">⭐</div>
              <div className="absolute top-2 left-1/4 transform -translate-x-1/2 animate-confetti delay-200">✨</div>
              <div className="absolute top-2 right-1/4 transform translate-x-1/2 animate-confetti delay-500">🌟</div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-700 mb-2 animate-fade-in">
              {`Plus qu'un effort !`}
            </h3>
            <p className="text-slate-600 mb-4 animate-fade-in delay-200">
              Vous terminez bientôt votre workout
            </p>
            
            {/* 🏆 Message motivationnel final enhanced */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200 animate-glow-pulse">
              <p className="text-sm text-purple-700 font-medium flex items-center justify-center space-x-2 animate-fade-in delay-300">
                <span className="animate-bounce">🏆</span>
                <span>Félicitations pour votre persévérance !</span>
                <span className="animate-bounce delay-200">🏆</span>
              </p>
            </div>
            
            {/* 📊 Statistiques finales enhanced */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/50 p-2 rounded border transition-all duration-300 hover:bg-white hover:scale-105 animate-slide-up">
                <div className="font-medium text-slate-700">Round Final</div>
                <div className="text-purple-600 font-bold">
                  {workout.state.currentRound}/{workout.state.totalRounds}
                </div>
              </div>
              <div className="bg-white/50 p-2 rounded border transition-all duration-300 hover:bg-white hover:scale-105 animate-slide-up delay-100">
                <div className="font-medium text-slate-700">Progression</div>
                <div className="text-emerald-600 font-bold">
                  {workout.computed.progressPercentage}%
                </div>
              </div>
            </div>
            
            {/* 🎯 Countdown final si très proche */}
            {workout.state.timeRemaining <= 10 && workout.state.timeRemaining > 0 && (
              <div className="mt-4 bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-lg border-2 border-red-200 animate-critical-time">
                <div className="text-red-700 font-bold flex items-center justify-center space-x-2">
                  <span className="animate-pulse">⏰</span>
                  <span>FIN dans {workout.state.timeRemaining}s !</span>
                  <span className="animate-pulse">⏰</span>
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    );
  }

  const { exercise, context, isNewRound } = nextExerciseData;
  
  // 🎨 Classes d'animation selon le niveau d'anticipation
  const getAnticipationClasses = () => {
    switch (anticipationLevel) {
      case 'high':
        return 'animate-timer-pulse ring-2 ring-yellow-300 bg-yellow-50/80';
      case 'medium':
        return 'animate-glow-pulse bg-blue-50/60';
      default:
        return 'bg-slate-50/70';
    }
  };
  
  return (
    <Card 
      variant="outline" 
      className={`opacity-80 backdrop-blur-sm border-dashed border-slate-300 transition-all duration-700 hover:opacity-100 hover:scale-105 ${
        getAnticipationClasses()
      } ${className}`}
    >
      <CardHeader 
        title={isNewRound ? "🆕 Nouveau round" : "⏭️ Exercice suivant"}
        description={
          <span className={isNearTransition ? 'animate-pulse font-bold text-blue-600' : ''}>
            {context}
          </span>
        }
        icon={
          <span className={`transition-all duration-500 ${
            anticipationLevel === 'high' ? 'animate-bounce text-2xl' : 
            anticipationLevel === 'medium' ? 'animate-pulse text-xl' : ''
          }`}>
            {exercise.images.start}
          </span>
        }
      />
      
      <CardBody>
        <div className="text-center">
          {/* 🏋️ Images d'exercice - Version avec anticipation */}
          <div className="flex justify-center items-center space-x-6 mb-4 opacity-75">
            <div className={`text-5xl transition-all duration-700 hover:blur-none cursor-pointer ${
              anticipationLevel === 'high' ? 'blur-none animate-bounce' : 
              anticipationLevel === 'medium' ? 'blur-[0.5px] animate-pulse' : 
              'blur-[1px]'
            }`}>
              {exercise.images.start}
            </div>
            
            <div className={`text-xl text-slate-400 transition-all duration-500 ${
              isNearTransition ? 'animate-pulse text-blue-500' : ''
            }`}>
              →
            </div>
            
            <div className={`text-5xl transition-all duration-700 hover:blur-none cursor-pointer ${
              anticipationLevel === 'high' ? 'blur-none animate-bounce delay-100' : 
              anticipationLevel === 'medium' ? 'blur-[0.5px] animate-pulse delay-200' : 
              'blur-[1px]'
            }`}>
              {exercise.images.end}
            </div>
          </div>
          
          {/* 📛 Nom de l'exercice avec anticipation */}
          <h3 className={`text-xl font-semibold text-slate-700 mb-2 transition-all duration-500 ${
            anticipationLevel === 'high' ? 'text-blue-700 animate-pulse' : ''
          }`}>
            {exercise.name}
          </h3>
          
          {/* 🏷️ Badges informatifs enhanced */}
          <div className="flex justify-center items-center space-x-3 mb-4">
            <span className={`bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-110 ${
              anticipationLevel === 'high' ? 'bg-blue-100 text-blue-700 animate-pulse' : 'opacity-75'
            }`}>
              {exercise.muscleGroup}
            </span>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm opacity-75 transition-all duration-300 hover:scale-110">
              {exercise.difficulty}
            </span>
            {isNewRound && (
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium animate-shimmer">
                Nouveau Round!
              </span>
            )}
          </div>
          
          {/* 📋 Instructions aperçu enhanced */}
          <div className={`bg-slate-100/50 p-3 rounded-lg border border-slate-200 text-left transition-all duration-500 ${
            anticipationLevel === 'high' ? 'bg-blue-50 border-blue-200' : ''
          }`}>
            <h4 className="font-medium text-slate-700 mb-2 flex items-center">
              <span className={`opacity-75 mr-2 transition-all duration-300 ${
                anticipationLevel === 'high' ? 'animate-bounce' : ''
              }`}>💡</span>
              <span>Aperçu des instructions</span>
            </h4>
            
            <div className="text-sm text-slate-600 space-y-1 opacity-90">
              {exercise.instructions?.slice(0, 2).map((instruction, index) => (
                <div 
                  key={index} 
                  className={`flex items-start transition-all duration-300 hover:bg-white/50 p-1 rounded animate-fade-in ${
                    anticipationLevel === 'high' ? 'text-blue-700' : ''
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <span className={`text-slate-400 mr-2 flex-shrink-0 transition-colors duration-300 ${
                    anticipationLevel === 'high' ? 'text-blue-500' : ''
                  }`}>
                    {index + 1}.
                  </span>
                  <span>{instruction}</span>
                </div>
              )) || (
                <div className="text-slate-500 italic animate-pulse">
                  {`Instructions complètes disponibles lors de l'exercice`}
                </div>
              )}
              
              {exercise.instructions && exercise.instructions.length > 2 && (
                <div className="text-slate-400 text-xs mt-2 animate-fade-in delay-500">
                  +{exercise.instructions.length - 2} étape(s) supplémentaire(s)
                </div>
              )}
            </div>
          </div>
          
          {/* 🧠 Indicateur de préparation mentale enhanced */}
          <div className={`mt-4 p-2 rounded-lg border transition-all duration-500 ${
            anticipationLevel === 'high' ? 'bg-yellow-50 border-yellow-200' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`text-xs text-slate-500 flex items-center justify-center space-x-2 ${
              anticipationLevel === 'high' ? 'text-yellow-700 animate-pulse' : ''
            }`}>
              <span className={anticipationLevel === 'high' ? 'animate-bounce' : ''}>🧠</span>
              <span>Préparez-vous mentalement...</span>
              {isNewRound && <span>• Nouveau round en approche!</span>}
            </div>
          </div>
          
          {/* ⚡ Countdown visuel enhanced selon proximité */}
          {workout.state.timeRemaining <= 10 && workout.state.timeRemaining > 0 && (
            <div className={`mt-3 p-2 rounded border-2 transition-all duration-300 ${
              workout.state.timeRemaining <= 5 
                ? 'bg-red-50 border-red-300 animate-critical-time' 
                : 'bg-yellow-50 border-yellow-300 animate-timer-pulse'
            }`}>
              <div className={`text-sm font-medium flex items-center justify-center space-x-2 ${
                workout.state.timeRemaining <= 5 ? 'text-red-700' : 'text-yellow-700'
              }`}>
                <span className="animate-pulse text-lg">
                  {workout.state.timeRemaining <= 5 ? '🚨' : '⚡'}
                </span>
                <span className="animate-bounce">
                  Dans {workout.state.timeRemaining}s
                </span>
                <span className="animate-pulse text-lg">
                  {workout.state.timeRemaining <= 5 ? '🚨' : '⚡'}
                </span>
              </div>
              
              {/* 📊 Barre de countdown visuelle */}
              <div className="mt-2 h-1 bg-white/50 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    workout.state.timeRemaining <= 5 ? 'bg-red-500' : 'bg-yellow-500'
                  }`}
                  style={{ 
                    width: `${(workout.state.timeRemaining / 10) * 100}%`,
                    transition: 'width 1s linear'
                  }}
                ></div>
              </div>
            </div>
          )}
          
          {/* 🎯 Indicateur d'intensité selon anticipation */}
          {anticipationLevel === 'high' && (
            <div className="absolute top-2 right-2 animate-bounce">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
          )}
          
          {/* ✨ Effet de transition imminente */}
          {anticipationLevel === 'high' && (
            <div className="absolute -top-1 -right-1 text-yellow-500 animate-bounce">
              <span className="text-xs">⚡ Bientôt!</span>
            </div>
          )}
        </div>
      </CardBody>
      
      {/* 🌟 Overlay d'anticipation */}
      {isNearTransition && (
        <div className={`absolute inset-0 rounded-xl pointer-events-none transition-all duration-500 ${
          anticipationLevel === 'high' 
            ? 'bg-gradient-to-br from-yellow-200/20 to-orange-200/20 animate-pulse' 
            : 'bg-gradient-to-br from-blue-200/10 to-purple-200/10'
        }`}></div>
      )}
    </Card>
  );
};

// 🎯 PropTypes inchangés
NextExercisePreview.propTypes = {
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
  className: PropTypes.string
};

NextExercisePreview.defaultProps = {
  className: ''
};

export default NextExercisePreview;