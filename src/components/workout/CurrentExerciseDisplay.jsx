// src/components/workout/CurrentExerciseDisplay.jsx
// 🎨 WA-012.2: Enhanced avec transitions d'exercice fluides
// Référence Clean Code: "User experience is part of clean code"

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody } from '../ui/Card.jsx';

/**
 * 🏋️ Composant CurrentExerciseDisplay Enhanced - Exercice avec animations
 * 
 * WA-012.2 Améliorations visuelles :
 * - Transitions fluides entre exercices
 * - Animations des images d'exercice
 * - Effets hover et focus améliorés
 * - Transitions de couleur contextuelles
 * 
 * Clean Code: "Make the code tell the story visually"
 */
const CurrentExerciseDisplay = ({ 
  currentExercise, 
  className = '' 
}) => {
  // 🎭 État pour animations de transition
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayExercise, setDisplayExercise] = useState(currentExercise);
  
  // 🔄 Gestion des transitions d'exercice
  useEffect(() => {
    if (currentExercise?.id !== displayExercise?.id) {
      setIsTransitioning(true);
      
      // Délai pour animation de sortie
      setTimeout(() => {
        setDisplayExercise(currentExercise);
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentExercise, displayExercise]);

  // 🛡️ Guard clause avec animation
  if (!displayExercise) {
    return (
      <Card 
        variant="outlined" 
        className={`text-center py-8 transition-all duration-500 hover:shadow-lg ${className}`}
      >
        <div className="text-slate-400 space-y-4">
          <div className="text-4xl mb-2 animate-pulse">🏋️</div>
          <p className="text-slate-600 animate-fade-in">Aucun exercice sélectionné</p>
          <p className="text-sm text-slate-500 mt-1 animate-fade-in delay-100">
            Chargez un workout pour commencer
          </p>
          
          {/* Animation de loading */}
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      variant="info" 
      className={`transition-all duration-500 hover:shadow-xl hover:scale-[1.02] ${
        isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      } ${className}`}
    >
      <CardHeader 
        title="Exercice actuel"
        icon={
          <span className="transition-transform duration-300 hover:scale-125 hover:rotate-12">
            {displayExercise.images.start}
          </span>
        }
      />
      
      <CardBody>
        <div className="text-center">
          {/* 🎭 Animation visuelle exercice - Images début/fin enhanced */}
          <div className="flex justify-center items-center space-x-8 mb-4">
            <div className={`text-6xl transition-all duration-500 hover:scale-125 cursor-pointer ${
              isTransitioning ? 'animate-pulse opacity-50' : 'hover:animate-bounce'
            }`}>
              {displayExercise.images.start}
            </div>
            
            {/* Flèche animée */}
            <div className="text-2xl text-slate-400 animate-pulse hover:animate-bounce transition-all duration-300 hover:text-blue-500">
              →
            </div>
            
            <div className={`text-6xl transition-all duration-500 hover:scale-125 cursor-pointer ${
              isTransitioning ? 'animate-pulse opacity-50' : 'hover:animate-bounce delay-100'
            }`}>
              {displayExercise.images.end}
            </div>
          </div>
          
          {/* 📛 Nom de l'exercice avec animation */}
          <h3 className={`text-2xl font-bold text-slate-800 mb-2 transition-all duration-500 ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          } hover:text-blue-600`}>
            {displayExercise.name}
          </h3>
          
          {/* 🏷️ Badges d'information enhanced */}
          <div className="flex justify-center items-center space-x-4 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 hover:bg-blue-200 cursor-pointer">
              {displayExercise.muscleGroup}
            </span>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 hover:bg-slate-200 cursor-pointer">
              {displayExercise.difficulty}
            </span>
            {displayExercise.defaultDuration && (
              <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 hover:bg-emerald-200 cursor-pointer">
                {displayExercise.defaultDuration}s
              </span>
            )}
          </div>
          
          {/* 💪 Muscles secondaires avec animation en cascade */}
          {displayExercise.secondaryMuscles && displayExercise.secondaryMuscles.length > 0 && (
            <div className="mb-4 animate-fade-in">
              <div className="text-xs text-slate-500 mb-2">Muscles secondaires:</div>
              <div className="flex justify-center flex-wrap gap-1">
                {displayExercise.secondaryMuscles.map((muscle, index) => (
                  <span 
                    key={index}
                    className="bg-slate-50 text-slate-600 px-2 py-1 rounded text-xs transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* 📋 Instructions d'exercice enhanced */}
          <div className={`bg-blue-50 p-4 rounded-lg border border-blue-200 text-left transition-all duration-500 hover:bg-blue-100 hover:border-blue-300 ${
            isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
          }`}>
            <h4 className="font-medium text-blue-800 mb-3 flex items-center group">
              <span className="text-lg mr-2 transition-transform duration-300 group-hover:scale-125">💡</span>
              <span className="transition-colors duration-300 group-hover:text-blue-900">Instructions</span>
            </h4>
            
            <ol className="text-sm text-blue-700 space-y-2">
              {displayExercise.instructions?.map((instruction, index) => (
                <li 
                  key={index} 
                  className="flex items-start transition-all duration-300 hover:bg-blue-100/50 p-1 rounded animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded-full mr-3 mt-0.5 flex-shrink-0 transition-all duration-300 hover:scale-110 hover:bg-blue-300">
                    {index + 1}
                  </span>
                  <span className="flex-1 transition-colors duration-300 hover:text-blue-800">
                    {instruction}
                  </span>
                </li>
              )) || (
                <li className="text-blue-600 italic animate-pulse">
                  Instructions par défaut : Maintenez une bonne forme et respirez régulièrement.
                </li>
              )}
            </ol>
          </div>
          
          {/* 🎯 Conseil technique contextuel enhanced */}
          <div className="mt-4 bg-amber-50 p-3 rounded-lg border border-amber-200 transition-all duration-300 hover:bg-amber-100 hover:scale-105">
            <div className="text-sm text-amber-700 flex items-center justify-center space-x-2 group">
              <span className="transition-transform duration-300 group-hover:rotate-12">🎯</span>
              <span className="font-medium transition-colors duration-300 group-hover:text-amber-800">
                Focus: Contrôlez le mouvement et maintenez la tension musculaire
              </span>
            </div>
          </div>
          
          {/* 🎊 Effet de célébration pour nouveau exercice */}
          {!isTransitioning && displayExercise && (
            <div className="absolute top-4 right-4 animate-bounce">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>
          )}
        </div>
      </CardBody>
      
      {/* ✨ Overlay de transition */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center pointer-events-none">
          <div className="text-blue-600 font-medium animate-pulse">
            Changement d'exercice...
          </div>
        </div>
      )}
    </Card>
  );
};

// 🎯 PropTypes inchangés
CurrentExerciseDisplay.propTypes = {
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
  className: PropTypes.string
};

CurrentExerciseDisplay.defaultProps = {
  currentExercise: null,
  className: ''
};

export default CurrentExerciseDisplay;