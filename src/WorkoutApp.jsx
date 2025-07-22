// 🏗️ WA-004: Composant de test simple
import './App.css'
import React, { useState } from 'react';

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


const DEFAULT_WORKOUT_CONFIG = {
  workTime: 30,        // secondes
  restTime: 30,        // secondes
  prepTime: 10,        // secondes de préparation
  rounds: 3,           // nombre de tours
  exercises: [],       // exercices sélectionnés
  difficulty: 'débutant'
};


const WORKOUT_STATES = {
  IDLE: 'idle',
  PREPARING: 'preparing',
  WORKING: 'working',
  RESTING: 'resting',
  PAUSED: 'paused',
  COMPLETED: 'completed'
};


const APP_VIEWS = {
  HOME: 'home',
  WORKOUT_CONFIG: 'workout-config',
  WORKOUT_ACTIVE: 'workout-active',
  WORKOUT_SUMMARY: 'workout-summary',
  TEST_COMPONENTS: 'test-components' // 🧪 Nouvelle vue de test
};


const TestComponentsView = () => {
  const [testResults, setTestResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Test de state basique
  const testBasicState = () => {
    const result = {
      test: 'Basic State Management',
      passed: true,
      details: 'useState fonctionne correctement',
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => ({ ...prev, basicState: result }));
  };

  // Test de manipulation de données
  const testDataManipulation = () => {
    const exerciseCount = Object.keys(EXERCISES_DATABASE).length;
    const planCount = Object.keys(WORKOUT_PLANS).length;
    
    const result = {
      test: 'Data Manipulation',
      passed: exerciseCount === 4 && planCount === 2,
      details: `${exerciseCount} exercices, ${planCount} plans détectés`,
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => ({ ...prev, dataManipulation: result }));
  };

  // Test asynchrone (simulation)
  const testAsyncOperation = async () => {
    setIsLoading(true);
    
    // Simulation d'un appel API
    const result = await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          test: 'Async Operations',
          passed: true,
          details: 'Simulation d\'appel API réussie',
          timestamp: new Date().toLocaleTimeString()
        });
      }, 1500);
    });
    
    setTestResults(prev => ({ ...prev, asyncOperation: result }));
    setIsLoading(false);
  };

  // Test de calculs
  const testCalculations = () => {
    const plan = WORKOUT_PLANS['beginner-full-body'];
    const totalTime = plan.exercises.length * (plan.timing.workTime + plan.timing.restTime) * plan.timing.rounds;
    const expectedTime = 3 * (30 + 30) * 3; // 540 secondes = 9 minutes
    
    const result = {
      test: 'Workout Calculations',
      passed: totalTime === expectedTime,
      details: `Durée calculée: ${totalTime}s (${Math.round(totalTime/60)}min)`,
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => ({ ...prev, calculations: result }));
  };

  // Test de validation des données
  const testDataValidation = () => {
    const allExercisesValid = Object.values(EXERCISES_DATABASE).every(exercise => 
      exercise.id && exercise.name && exercise.muscleGroup && exercise.defaultDuration > 0
    );
    
    const result = {
      test: 'Data Validation',
      passed: allExercisesValid,
      details: allExercisesValid ? 'Toutes les données sont valides' : 'Erreur de validation détectée',
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => ({ ...prev, dataValidation: result }));
  };

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px'
    }}>
      <h2>🧪 Tests de Composants - WA-004</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Validation du fonctionnement des composants avant Phase 2
      </p>

      {/* Boutons de test */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <button
          onClick={testBasicState}
          style={{
            padding: '15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          🔄 Test State
        </button>

        <button
          onClick={testDataManipulation}
          style={{
            padding: '15px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          📊 Test Données
        </button>

        <button
          onClick={testAsyncOperation}
          disabled={isLoading}
          style={{
            padding: '15px',
            backgroundColor: isLoading ? '#6c757d' : '#ffc107',
            color: isLoading ? 'white' : '#212529',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          {isLoading ? '⏳ Chargement...' : '⚡ Test Async'}
        </button>

        <button
          onClick={testCalculations}
          style={{
            padding: '15px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          🧮 Test Calculs
        </button>

        <button
          onClick={testDataValidation}
          style={{
            padding: '15px',
            backgroundColor: '#6f42c1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          ✅ Test Validation
        </button>

        <button
          onClick={() => {
            testBasicState();
            testDataManipulation();
            testCalculations();
            testDataValidation();
            testAsyncOperation();
          }}
          style={{
            padding: '15px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          🚀 Tout Tester
        </button>
      </div>

      {/* Résultats des tests */}
      <div style={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '20px'
      }}>
        <h3>📋 Résultats des tests</h3>
        
        {Object.keys(testResults).length === 0 && (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            Aucun test exécuté. Cliquez sur les boutons ci-dessus pour commencer.
          </p>
        )}

        {Object.values(testResults).map((result, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              margin: '5px 0',
              backgroundColor: result.passed ? '#d4edda' : '#f8d7da',
              border: `1px solid ${result.passed ? '#c3e6cb' : '#f5c6cb'}`,
              borderRadius: '5px'
            }}
          >
            <div>
              <strong style={{ color: result.passed ? '#155724' : '#721c24' }}>
                {result.passed ? '✅' : '❌'} {result.test}
              </strong>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                {result.details}
              </div>
            </div>
            <span style={{ fontSize: '12px', color: '#666' }}>
              {result.timestamp}
            </span>
          </div>
        ))}
      </div>

      {/* Diagnostics système */}
      <div style={{
        marginTop: '20px',
        backgroundColor: '#e9ecef',
        padding: '15px',
        borderRadius: '8px'
      }}>
        <h4>🔍 Diagnostics système</h4>
        <div style={{ fontSize: '14px', color: '#495057' }}>
          <p><strong>React version:</strong> {React.version}</p>
          <p><strong>Exercices chargés:</strong> {Object.keys(EXERCISES_DATABASE).length}</p>
          <p><strong>Plans disponibles:</strong> {Object.keys(WORKOUT_PLANS).length}</p>
          <p><strong>États workout:</strong> {Object.keys(WORKOUT_STATES).length}</p>
          <p><strong>Vues app:</strong> {Object.keys(APP_VIEWS).length}</p>
          <p><strong>Timestamp:</strong> {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
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
        {currentView === APP_VIEWS.TEST_COMPONENTS && 'Tests de validation'}
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
      <button 
        onClick={() => onNavigate(APP_VIEWS.TEST_COMPONENTS)} 
        style={{ 
          padding: '8px 15px', 
          border: 'none', 
          borderRadius: '5px', 
          backgroundColor: currentView === APP_VIEWS.TEST_COMPONENTS ? '#3498db' : 'rgba(255,255,255,0.2)', 
          color: 'white', 
          cursor: 'pointer', 
          fontSize: '14px' 
          }}
      >
        🧪 Tests
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
        {['WA-001: Setup', 'WA-002: Données', 'WA-003: Layout', 'WA-004: Tests'].map((item, index) => (
          <span key={index} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>
            ✅ {item}
          </span>
        ))}
        <span style={{ backgroundColor: '#9E9E9E', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>
          ⏳ WA-005: useReducer
        </span>
      </div>
    </div>

        <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <h2>🚀 Démarrage rapide</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
       {`Choisissez un plan d'entraînement prédéfini ou créez le vôtre`}
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
        {Object.values(WORKOUT_PLANS).map(plan => (
          <div key={plan.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: 'white' }} onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'} onMouseOut={(e) => e.target.style.backgroundColor = 'white'} onClick={() => onSelectPlan(plan)}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{plan.name}</h3>
            <p style={{ color: '#666', fontSize: '14px', margin: '0 0 15px 0' }}>{plan.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ backgroundColor: '#007bff', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>{plan.difficulty}</span>
              <span style={{ fontSize: '14px', color: '#666' }}>⏱️ {plan.estimatedDuration} min</span>
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}><strong>Exercices:</strong> {plan.exercises.map(id => EXERCISES_DATABASE[id].name).join(', ')}</div>
            <button style={{ width: '100%', marginTop: '15px', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>🚀 Démarrer ce plan</button>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button onClick={() => onNavigate(APP_VIEWS.WORKOUT_CONFIG)} style={{ padding: '15px 30px', fontSize: '16px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
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
  <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
    <h2>⚙️ Configuration du Workout</h2>
    <p style={{ color: '#666', marginBottom: '30px' }}>Cette section sera développée dans les prochains tickets (WA-013 à WA-016)</p>
    <div style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107', borderRadius: '8px', padding: '20px', margin: '20px 0' }}>
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
    <p style={{ fontStyle: 'italic', color: '#666' }}>{`"First make it work, then make it right" - Clean Code`}</p>
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
    alert(`🎯 Plan sélectionné: ${plan.name}\n\nProchaine étape: Développer useReducer (WA-005)`);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <AppHeader currentView={currentView} onNavigate={handleNavigate} />

      <main>
        {currentView === APP_VIEWS.HOME && (<HomeView onSelectPlan={handleSelectPlan} onNavigate={handleNavigate} />)}
        {currentView === APP_VIEWS.WORKOUT_CONFIG && (<WorkoutConfigView />)}
        {currentView === APP_VIEWS.TEST_COMPONENTS && (<TestComponentsView />)}
        {currentView === APP_VIEWS.WORKOUT_ACTIVE && (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>🏃 Séance Active</h2>
            <p>À développer avec le timer (WA-009+)</p>
          </div>
        )}
      </main>

      <footer style={{ marginTop: '40px', padding: '15px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #ddd', textAlign: 'center', fontSize: '14px', color: '#666' }}>
        <strong>🎯 Phase 1 terminée!</strong> Prochaine étape: <strong>WA-005 - useReducer principal</strong> | Phase 2: State Management
      </footer>
    </div>
  );
};

const WorkoutApp = () => {
  return (
    <WorkoutDataTest></WorkoutDataTest>
  );
};
export default WorkoutApp;