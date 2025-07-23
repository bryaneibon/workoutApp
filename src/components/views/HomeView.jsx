// src/components/views/HomeView.jsx
// 🎨 WA-007.1: Vue Accueil modernisée avec composants réutilisables
// Référence Clean Code: "Use meaningful names"

import React from 'react';
import { EXERCISES_DATABASE } from '../../data/exercices.js';
import { WORKOUT_PLANS } from '../../data/workoutPlans.js';
import { APP_VIEWS } from '../../constants/workoutStates.js';
import Card, { PlanCard } from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';

/**
 * Composant de statut du développement
 */
const DevelopmentStatus = () => {
  const completedTickets = [
    'WA-001: Setup', 
    'WA-002: Données', 
    'WA-003: Layout', 
    'WA-004: Tests', 
    'WA-005: useReducer', 
    'WA-005.1: Refactor', 
    'WA-006: Actions', 
    'WA-007: Config',
    'WA-007.1: Architecture'
  ];

  return (
    <Card variant="success" className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-emerald-800">📋 Status du développement</h3>
        <span className="text-sm text-emerald-600 font-medium">
          {completedTickets.length}/12 tickets
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {completedTickets.map((item, index) => (
          <span 
            key={index} 
            className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-xs font-medium"
          >
            ✅ {item}
          </span>
        ))}
        <span className="px-3 py-1 bg-slate-400 text-white rounded-lg text-xs font-medium">
          ⏳ WA-008: Hook useWorkout
        </span>
      </div>

      <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
        <p className="text-sm text-emerald-700">
          <strong>🏗️ Architecture modulaire réussie !</strong> De 969 lignes → Structure professionnelle
        </p>
      </div>
    </Card>
  );
};

/**
 * Section de démarrage rapide avec plans prédéfinis
 */
const QuickStartSection = ({ onSelectPlan, onNavigate }) => (
  <Card className="mb-6">
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">🚀 Démarrage rapide</h2>
      <p className="text-slate-600">
        Choisissez un plan d'entraînement prédéfini ou créez le vôtre
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {Object.values(WORKOUT_PLANS).map(plan => (
        <PlanCard
          key={plan.id}
          plan={plan}
          onSelect={onSelectPlan}
        />
      ))}
    </div>
    
    <div className="text-center">
      <Button
        variant="primary"
        size="lg"
        onClick={() => onNavigate(APP_VIEWS.WORKOUT_CONFIG)}
        className="px-8 py-4"
      >
        ⚙️ Créer un workout personnalisé
      </Button>
    </div>
  </Card>
);

/**
 * Section de statistiques rapides
 */
const QuickStats = () => {
  const exerciseCount = Object.keys(EXERCISES_DATABASE).length;
  const planCount = Object.keys(WORKOUT_PLANS).length;
  const muscleGroups = [...new Set(Object.values(EXERCISES_DATABASE).map(ex => ex.muscleGroup))];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card variant="info" className="text-center p-4">
        <div className="text-2xl font-bold text-blue-600">{exerciseCount}</div>
        <div className="text-sm text-slate-600">Exercices</div>
      </Card>
      
      <Card variant="success" className="text-center p-4">
        <div className="text-2xl font-bold text-emerald-600">{planCount}</div>
        <div className="text-sm text-slate-600">Plans</div>
      </Card>
      
      <Card variant="warning" className="text-center p-4">
        <div className="text-2xl font-bold text-amber-600">{muscleGroups.length}</div>
        <div className="text-sm text-slate-600">Groupes musculaires</div>
      </Card>
      
      <Card variant="gradient" className="text-center p-4">
        <div className="text-2xl font-bold text-purple-600">∞</div>
        <div className="text-sm text-slate-600">Possibilités</div>
      </Card>
    </div>
  );
};

/**
 * Section d'aperçu des exercices
 */
const ExercisePreview = () => (
  <Card className="mb-6">
    <h3 className="text-xl font-semibold text-slate-800 mb-4">💪 Aperçu des exercices</h3>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.values(EXERCISES_DATABASE).map(exercise => (
        <div
          key={exercise.id}
          className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200"
        >
          <div className="text-center">
            <div className="text-3xl mb-2">{exercise.images.start}</div>
            <div className="font-medium text-slate-800 text-sm">{exercise.name}</div>
            <div className="text-xs text-slate-600">{exercise.muscleGroup}</div>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded">
                {exercise.difficulty}
              </span>
              <span className="text-xs text-slate-500">
                {exercise.defaultDuration}s
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

/**
 * Actions rapides
 */
const QuickActions = ({ onNavigate }) => (
  <Card>
    <h3 className="text-xl font-semibold text-slate-800 mb-4">⚡ Actions rapides</h3>
    
    <div className="grid md:grid-cols-3 gap-4">
      <Button
        variant="outline"
        className="p-4 h-auto flex-col"
        onClick={() => onNavigate(APP_VIEWS.TEST_COMPONENTS)}
      >
        <div className="text-2xl mb-2">🧪</div>
        <div className="font-medium">Tests</div>
        <div className="text-xs text-slate-600 mt-1">Valider les composants</div>
      </Button>
      
      <Button
        variant="outline"
        className="p-4 h-auto flex-col"
        onClick={() => onNavigate(APP_VIEWS.WORKOUT_DEMO)}
      >
        <div className="text-2xl mb-2">🧠</div>
        <div className="font-medium">Démo</div>
        <div className="text-xs text-slate-600 mt-1">Tester le reducer</div>
      </Button>
      
      <Button
        variant="outline"
        className="p-4 h-auto flex-col"
        onClick={() => onNavigate(APP_VIEWS.WORKOUT_CONFIG)}
      >
        <div className="text-2xl mb-2">⚙️</div>
        <div className="font-medium">Config</div>
        <div className="text-xs text-slate-600 mt-1">Personnaliser</div>
      </Button>
    </div>
  </Card>
);

/**
 * Composant principal HomeView
 * @param {Object} props - Propriétés du composant
 * @param {Function} props.onSelectPlan - Callback de sélection de plan
 * @param {Function} props.onNavigate - Callback de navigation
 */
const HomeView = ({ onSelectPlan, onNavigate }) => {
  return (
    <div className="space-y-6">
      <DevelopmentStatus />
      <QuickStats />
      <QuickStartSection 
        onSelectPlan={onSelectPlan} 
        onNavigate={onNavigate} 
      />
      <ExercisePreview />
      <QuickActions onNavigate={onNavigate} />
    </div>
  );
};

export default HomeView;