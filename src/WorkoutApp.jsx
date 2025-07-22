import './App.css'

import React from 'react';

// 🏗️ WA-001: Setup initial avec structure de dossiers
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
 * Composant de test pour WA-002
 */
const WorkoutDataTest = () => {
  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const [selectedExercise, setSelectedExercise] = React.useState(null);

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#2c3e50',
        color: 'white',
        borderRadius: '10px'
      }}>
        <h1>🏋️ WorkoutApp</h1>
        <p>WA-002: Test des données statiques</p>
      </header>

      {/* Status */}
      <div style={{
        backgroundColor: '#e8f5e8',
        border: '2px solid #4CAF50',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h3>📋 Status du développement</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>
            ✅ WA-001: Setup
          </span>
          <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>
            ✅ WA-002: Données
          </span>
          <span style={{ backgroundColor: '#9E9E9E', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>
            ⏳ WA-003: Layout
          </span>
        </div>
      </div>

      {/* Test des exercices */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h3>🏋️ Base de données d'exercices ({Object.keys(EXERCISES_DATABASE).length} exercices)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '15px' }}>
          {Object.values(EXERCISES_DATABASE).map(exercise => (
            <div 
              key={exercise.id}
              style={{
                border: selectedExercise?.id === exercise.id ? '2px solid #007bff' : '1px solid #ddd',
                borderRadius: '5px',
                padding: '10px',
                cursor: 'pointer',
                textAlign: 'center',
                backgroundColor: selectedExercise?.id === exercise.id ? '#f0f8ff' : 'white'
              }}
              onClick={() => setSelectedExercise(exercise)}
            >
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>
                {exercise.images.start} → {exercise.images.end}
              </div>
              <strong>{exercise.name}</strong>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {exercise.muscleGroup} • {exercise.defaultDuration}s
              </div>
            </div>
          ))}
        </div>

        {selectedExercise && (
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '5px',
            border: '1px solid #dee2e6'
          }}>
            <h4>📋 Détails: {selectedExercise.name}</h4>
            <p><strong>Groupe musculaire:</strong> {selectedExercise.muscleGroup}</p>
            <p><strong>Muscles secondaires:</strong> {selectedExercise.secondaryMuscles.join(', ')}</p>
            <p><strong>Difficulté:</strong> {selectedExercise.difficulty}</p>
            <p><strong>Instructions:</strong></p>
            <ol>
              {selectedExercise.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Test des plans d'entraînement */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h3>📋 Plans d'entraînement prédéfinis ({Object.keys(WORKOUT_PLANS).length} plans)</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '15px' }}>
          {Object.values(WORKOUT_PLANS).map(plan => (
            <div
              key={plan.id}
              style={{
                border: selectedPlan?.id === plan.id ? '2px solid #28a745' : '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                cursor: 'pointer',
                minWidth: '250px',
                backgroundColor: selectedPlan?.id === plan.id ? '#f0fff0' : 'white'
              }}
              onClick={() => setSelectedPlan(plan)}
            >
              <h4>{plan.name}</h4>
              <p style={{ fontSize: '14px', color: '#666' }}>{plan.description}</p>
              <div style={{ fontSize: '12px' }}>
                <span style={{ backgroundColor: '#007bff', color: 'white', padding: '2px 6px', borderRadius: '3px', marginRight: '5px' }}>
                  {plan.difficulty}
                </span>
                <span>{plan.estimatedDuration} min</span>
              </div>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '5px',
            border: '1px solid #dee2e6'
          }}>
            <h4>🎯 Configuration: {selectedPlan.name}</h4>
            <p><strong>Exercices:</strong> {selectedPlan.exercises.map(id => EXERCISES_DATABASE[id].name).join(' → ')}</p>
            <p><strong>Timing:</strong> {selectedPlan.timing.workTime}s travail / {selectedPlan.timing.restTime}s repos</p>
            <p><strong>Rounds:</strong> {selectedPlan.timing.rounds} tours</p>
          </div>
        )}
      </div>

      {/* Configuration par défaut */}
      <div style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '8px',
        padding: '15px'
      }}>
        <h3>⚙️ Configuration par défaut</h3>
        <pre style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '10px', 
          borderRadius: '5px',
          fontSize: '14px',
          overflow: 'auto'
        }}>
          {JSON.stringify(DEFAULT_WORKOUT_CONFIG, null, 2)}
        </pre>
        
        <div style={{ marginTop: '15px' }}>
          <strong>🎯 Prochaine étape:</strong> WA-003 - Layout principal avec navigation
        </div>
      </div>
    </div>
  );
};
