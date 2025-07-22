import './App.css'

import React, { useState } from 'react';

// 🏗️ WA-003: Layout principal avec navigation
// Référence Clean Code: "The first rule of functions is that they should be small"

const WorkoutApp = () => {
  return (
    <WorkoutDataTest></WorkoutDataTest>
  );
};

export default WorkoutApp;


// 🏗️ WA-002: Données statiques et structures JavaScript
// Référence Pragmatic Programmer: "Don't Repeat Yourself (DRY)"

/**
 * @typedef {Object} Exercise
 * @property {string} id - Identifiant unique
 * @property {string} name - Nom de l'exercice
 * @property {string} muscleGroup - Groupe musculaire principal
 * @property {string[]} secondaryMuscles - Muscles secondaires
 * @property {string} difficulty - Niveau de difficulté
 * @property {string[]} instructions - Instructions étape par étape
 * @property {Object} images - URLs des images
 * @property {number} defaultDuration - Durée par défaut en secondes
 */

/**
 * Base de données d'exercices statiques
 * Clean Code: "Functions should do one thing" - Chaque exercice a une responsabilité claire
 */
const EXERCISES_DATABASE = {
  'push-up': {
    id: 'push-up',
    name: 'Pompes',
    muscleGroup: 'Pectoraux',
    secondaryMuscles: ['Triceps', 'Épaules'],
    difficulty: 'débutant',
    instructions: [
      'Position planche, mains écartées largeur épaules',
      'Descendre en gardant le corps droit',
      'Remonter en poussant fort'
    ],
    images: {
      start: '🤲', // Placeholder emoji
      end: '💪'
    },
    defaultDuration: 30
  },
  'squat': {
    id: 'squat',
    name: 'Squats',
    muscleGroup: 'Jambes',
    secondaryMuscles: ['Fessiers', 'Mollets'],
    difficulty: 'débutant',
    instructions: [
      'Pieds écartés largeur des hanches',
      'Descendre comme pour s\'asseoir',
      'Remonter en poussant sur les talons'
    ],
    images: {
      start: '🧍',
      end: '🤸'
    },
    defaultDuration: 45
  },
  'plank': {
    id: 'plank',
    name: 'Planche',
    muscleGroup: 'Abdominaux',
    secondaryMuscles: ['Dos', 'Épaules'],
    difficulty: 'intermédiaire',
    instructions: [
      'Position sur les avant-bras',
      'Corps parfaitement droit',
      'Contracter les abdominaux'
    ],
    images: {
      start: '🏃',
      end: '🏃'
    },
    defaultDuration: 60
  },
  'jumping-jacks': {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    muscleGroup: 'Cardio',
    secondaryMuscles: ['Jambes', 'Épaules'],
    difficulty: 'débutant',
    instructions: [
      'Position debout, pieds joints',
      'Sauter en écartant bras et jambes',
      'Revenir à la position initiale'
    ],
    images: {
      start: '🧍',
      end: '🤸'
    },
    defaultDuration: 30
  }
};

/**
 * @typedef {Object} WorkoutPlan
 * @property {string} id - Identifiant du plan
 * @property {string} name - Nom du plan
 * @property {string} description - Description du plan
 * @property {string} difficulty - Niveau requis
 * @property {number} estimatedDuration - Durée estimée en minutes
 * @property {string[]} exercises - Liste des IDs d'exercices
 * @property {Object} timing - Configuration temporelle
 */

/**
 * Plans d'entraînement prédéfinis
 * Pragmatic Programmer: "Good design is easier to change than bad design"
 */
const WORKOUT_PLANS = {
  'beginner-full-body': {
    id: 'beginner-full-body',
    name: 'Corps Complet Débutant',
    description: 'Entraînement complet pour débuter en douceur',
    difficulty: 'débutant',
    estimatedDuration: 15,
    exercises: ['push-up', 'squat', 'plank'],
    timing: {
      workTime: 30,
      restTime: 30,
      rounds: 3
    }
  },
  'cardio-burn': {
    id: 'cardio-burn',
    name: 'Cardio Intense',
    description: 'Brûlez des calories rapidement',
    difficulty: 'intermédiaire',
    estimatedDuration: 20,
    exercises: ['jumping-jacks', 'squat', 'push-up'],
    timing: {
      workTime: 45,
      restTime: 15,
      rounds: 4
    }
  }
};

/**
 * Configuration par défaut pour les workouts personnalisés
 * Clean Code: "Constants should be well-named"
 */
const DEFAULT_WORKOUT_CONFIG = {
  workTime: 30,        // secondes
  restTime: 30,        // secondes
  prepTime: 10,        // secondes de préparation
  rounds: 3,           // nombre de tours
  exercises: [],       // exercices sélectionnés
  difficulty: 'débutant'
};

/**
 * États possibles du workout
 * Pragmatic Programmer: "Use enums to document state"
 */
const WORKOUT_STATES = {
  IDLE: 'idle',
  PREPARING: 'preparing',
  WORKING: 'working',
  RESTING: 'resting',
  PAUSED: 'paused',
  COMPLETED: 'completed'
};

/**
 * Énumérations des vues de l'application
 * Pragmatic Programmer: "Use meaningful names"
 */
const APP_VIEWS = {
  HOME: 'home',
  WORKOUT_CONFIG: 'workout-config',
  WORKOUT_ACTIVE: 'workout-active',
  WORKOUT_SUMMARY: 'workout-summary'
};

/**
 * Header réutilisable
 * Clean Code: "Small functions are easier to understand"
 */
const AppHeader = ({ currentView, onNavigate }) => (
  <header style={{
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '10px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
    <div>
      <h1 style={{ margin: 0, fontSize: '24px' }}>🏋️ WorkoutApp</h1>
      <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
        {currentView === APP_VIEWS.HOME && 'Choisissez votre entraînement'}
        {currentView === APP_VIEWS.WORKOUT_CONFIG && 'Configuration de la séance'}
        {currentView === APP_VIEWS.WORKOUT_ACTIVE && 'Séance en cours'}
        {currentView === APP_VIEWS.WORKOUT_SUMMARY && 'Résumé de la séance'}
      </p>
    </div>
    
    {/* Navigation simple */}
    <nav style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
      <button
        onClick={() => onNavigate(APP_VIEWS.HOME)}
        style={{
          padding: '8px 15px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: currentView === APP_VIEWS.HOME ? '#3498db' : 'rgba(255,255,255,0.2)',
          color: 'white',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        🏠 Accueil
      </button>
      <button
        onClick={() => onNavigate(APP_VIEWS.WORKOUT_CONFIG)}
        style={{
          padding: '8px 15px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: currentView === APP_VIEWS.WORKOUT_CONFIG ? '#3498db' : 'rgba(255,255,255,0.2)',
          color: 'white',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        ⚙️ Configuration
      </button>
    </nav>
  </header>
);

/**
 * Vue Accueil - Sélection rapide
 */
const HomeView = ({ onSelectPlan, onNavigate }) => (
  <div>
    <div style={{
      backgroundColor: '#e8f5e8',
      border: '2px solid #4CAF50',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '20px'
    }}>
      <h3>📋 Status du développement</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {['WA-001: Setup', 'WA-002: Données', 'WA-003: Layout'].map((item, index) => (
          <span key={index} style={{ 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            padding: '5px 10px', 
            borderRadius: '5px',
            fontSize: '12px'
          }}>
            ✅ {item}
          </span>
        ))}
        <span style={{ 
          backgroundColor: '#9E9E9E', 
          color: 'white', 
          padding: '5px 10px', 
          borderRadius: '5px',
          fontSize: '12px'
        }}>
          ⏳ WA-004: Timer
        </span>
      </div>
    </div>

    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px'
    }}>
      <h2>🚀 Démarrage rapide</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Choisissez un plan d'entraînement prédéfini ou créez le vôtre
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
        {Object.values(WORKOUT_PLANS).map(plan => (
          <div
            key={plan.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: 'white'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
            onClick={() => onSelectPlan(plan)}
          >
            <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{plan.name}</h3>
            <p style={{ color: '#666', fontSize: '14px', margin: '0 0 15px 0' }}>
              {plan.description}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ 
                backgroundColor: '#007bff', 
                color: 'white', 
                padding: '4px 8px', 
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                {plan.difficulty}
              </span>
              <span style={{ fontSize: '14px', color: '#666' }}>
                ⏱️ {plan.estimatedDuration} min
              </span>
            </div>
            
            <div style={{ fontSize: '12px', color: '#666' }}>
              <strong>Exercices:</strong> {plan.exercises.map(id => EXERCISES_DATABASE[id].name).join(', ')}
            </div>
            
            <button style={{
              width: '100%',
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              🚀 Démarrer ce plan
            </button>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={() => onNavigate(APP_VIEWS.WORKOUT_CONFIG)}
          style={{
            padding: '15px 30px',
            fontSize: '16px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ⚙️ Créer un workout personnalisé
        </button>
      </div>
    </div>
  </div>
);

/**
 * Vue Configuration - Placeholder pour plus tard
 */
const WorkoutConfigView = () => (
  <div style={{
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '40px',
    textAlign: 'center'
  }}>
    <h2>⚙️ Configuration du Workout</h2>
    <p style={{ color: '#666', marginBottom: '30px' }}>
      Cette section sera développée dans les prochains tickets (WA-013 à WA-016)
    </p>
    
    <div style={{
      backgroundColor: '#fff3cd',
      border: '1px solid #ffc107',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px 0'
    }}>
      <h4>🎯 Fonctionnalités à venir :</h4>
      <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
        <li>Sélection des exercices</li>
        <li>Configuration des temps (travail/repos)</li>
        <li>Nombre de rounds</li>
        <li>Niveau de difficulté</li>
        <li>Prévisualisation en temps réel</li>
      </ul>
    </div>
    
    <div style={{ fontSize: '48px', margin: '20px 0' }}>🚧</div>
    <p style={{ fontStyle: 'italic', color: '#666' }}>
      "First make it work, then make it right" - Clean Code
    </p>
  </div>
);

/**
 * Composant principal avec navigation
 * Pragmatic Programmer: "Orthogonality - components should be independent"
 */
const WorkoutDataTest = () => {
  const [currentView, setCurrentView] = useState(APP_VIEWS.HOME);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    alert(`🎯 Plan sélectionné: ${plan.name}\n\nProchaine étape: Développer le timer (WA-009)`);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <AppHeader 
        currentView={currentView} 
        onNavigate={handleNavigate} 
      />

      <main>
        {currentView === APP_VIEWS.HOME && (
          <HomeView 
            onSelectPlan={handleSelectPlan}
            onNavigate={handleNavigate}
          />
        )}
        
        {currentView === APP_VIEWS.WORKOUT_CONFIG && (
          <WorkoutConfigView />
        )}
        
        {/* Autres vues à développer plus tard */}
        {currentView === APP_VIEWS.WORKOUT_ACTIVE && (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>🏃 Séance Active</h2>
            <p>À développer avec le timer (WA-009+)</p>
          </div>
        )}
      </main>

      {/* Footer informatif */}
      <footer style={{
        marginTop: '40px',
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #ddd',
        textAlign: 'center',
        fontSize: '14px',
        color: '#666'
      }}>
        <strong>🎯 Prochaine étape:</strong> WA-004 - Composant de test simple | 
        <strong> Puis:</strong> Phase 2 - useReducer et gestion d'état
      </footer>
    </div>
  );
};
