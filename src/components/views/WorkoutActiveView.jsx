// src/components/views/WorkoutActiveView.jsx
// 🏃 WA-008.4: Vue de séance active - Placeholder pour WA-009+
// Référence Clean Code: "Functions should do one thing" 

import React from 'react';
import Card, { CardHeader, CardBody, StatsCard } from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import ProgressBar, { CircularProgress } from '../ui/ProgressBar.jsx';

/**
 * Composant placeholder pour les séances actives
 * Cette vue sera développée avec le timer automatique dans WA-009+
 * 
 * Pragmatic Programmer: "Don't live with broken windows"
 * On crée une structure propre même pour un placeholder
 */
const WorkoutActiveView = () => {
  // Données de démonstration pour le design
  const mockWorkoutState = {
    workoutName: "Corps Complet Débutant",
    currentExercise: "Pompes",
    currentExerciseImage: "🤲",
    timeRemaining: 25,
    totalTime: 30,
    currentRound: 2,
    totalRounds: 3,
    currentExerciseIndex: 1,
    totalExercises: 3,
    status: "working", // working, resting, preparing
    muscleGroup: "Pectoraux",
    nextExercise: "Squats"
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      working: { text: "C'est parti !", color: "green", bgColor: "bg-green-50", textColor: "text-green-800", icon: "💪" },
      resting: { text: "Récupération", color: "blue", bgColor: "bg-blue-50", textColor: "text-blue-800", icon: "😴" },
      preparing: { text: "Préparez-vous !", color: "yellow", bgColor: "bg-yellow-50", textColor: "text-yellow-800", icon: "⚡" }
    };
    return statusMap[status] || statusMap.working;
  };

  const statusInfo = getStatusInfo(mockWorkoutState.status);
  const progressPercentage = ((mockWorkoutState.totalTime - mockWorkoutState.timeRemaining) / mockWorkoutState.totalTime) * 100;
  const globalProgress = ((mockWorkoutState.currentRound - 1) * mockWorkoutState.totalExercises + mockWorkoutState.currentExerciseIndex) / (mockWorkoutState.totalRounds * mockWorkoutState.totalExercises) * 100;

  return (
    <div className="space-y-6">
      {/* Header avec statut */}
      <Card variant="gradient" className="text-center">
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${statusInfo.bgColor} border border-current`}>
          <span className="text-lg">{statusInfo.icon}</span>
          <span className={`font-semibold ${statusInfo.textColor}`}>{statusInfo.text}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mt-4 mb-2">
          {mockWorkoutState.workoutName}
        </h1>
        <p className="text-slate-600">
          Round {mockWorkoutState.currentRound} sur {mockWorkoutState.totalRounds}
        </p>
      </Card>

      {/* Timer principal et exercice actuel */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Timer circulaire */}
        <Card variant="elevated" className="text-center">
          <CardBody>
            <div className="flex justify-center mb-6">
              <CircularProgress
                value={progressPercentage}
                max={100}
                size={180}
                strokeWidth={12}
                variant={statusInfo.color}
                showLabel={false}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-800 mb-2">
                  {mockWorkoutState.timeRemaining}
                </div>
                <div className="text-sm text-slate-600">secondes</div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Exercice actuel */}
        <Card variant="info">
          <CardHeader 
            title="Exercice actuel"
            icon="🏋️"
          />
          <CardBody>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{mockWorkoutState.currentExerciseImage}</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {mockWorkoutState.currentExercise}
              </h3>
              <p className="text-slate-600 bg-slate-100 inline-block px-3 py-1 rounded-full text-sm">
                {mockWorkoutState.muscleGroup}
              </p>
            </div>
            
            {/* Instructions d'exercice */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">💡 Instructions</h4>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Position planche, mains écartées largeur épaules</li>
                <li>2. Descendre en gardant le corps droit</li>
                <li>3. Remonter en poussant fort</li>
              </ol>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Statistiques de progression */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Exercice"
          value={`${mockWorkoutState.currentExerciseIndex + 1}/${mockWorkoutState.totalExercises}`}
          icon="🎯"
        />
        <StatsCard
          title="Round"
          value={`${mockWorkoutState.currentRound}/${mockWorkoutState.totalRounds}`}
          icon="🔁"
        />
        <StatsCard
          title="Temps total"
          value="12:34"
          icon="⏱️"
        />
        <StatsCard
          title="Calories"
          value="~45"
          icon="🔥"
        />
      </div>

      {/* Barre de progression globale */}
      <Card>
        <CardHeader title="📊 Progression globale" />
        <CardBody>
          <ProgressBar
            value={globalProgress}
            max={100}
            variant="gradient"
            size="lg"
            animated
            showLabel
            label="Progression de la séance"
          />
          <div className="mt-4 text-sm text-slate-600 text-center">
            {Math.round(globalProgress)}% complété • Prochain: {mockWorkoutState.nextExercise}
          </div>
        </CardBody>
      </Card>

      {/* Contrôles de la séance */}
      <Card>
        <CardHeader title="🎮 Contrôles" />
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="warning"
              size="lg"
              className="h-auto py-4 flex-col space-y-1"
            >
              <span className="text-xl">⏸️</span>
              <span>Pause</span>
            </Button>
            
            <Button
              variant="primary"
              size="lg"
              className="h-auto py-4 flex-col space-y-1"
            >
              <span className="text-xl">⏭️</span>
              <span>Suivant</span>
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              className="h-auto py-4 flex-col space-y-1"
            >
              <span className="text-xl">🔄</span>
              <span>Recommencer</span>
            </Button>
            
            <Button
              variant="danger"
              size="lg"
              className="h-auto py-4 flex-col space-y-1"
            >
              <span className="text-xl">⏹️</span>
              <span>Arrêter</span>
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Message de développement */}
      <Card variant="warning">
        <CardHeader 
          title="🚧 En développement"
          icon="⚠️"
        />
        <CardBody>
          <div className="text-center space-y-4">
            <p className="text-amber-800">
              Cette vue sera développée dans les prochaines phases avec :
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
              <ul className="space-y-2">
                <li>• <strong>WA-009:</strong> Timer automatique avec setInterval</li>
                <li>• <strong>WA-010:</strong> {`Progression automatique d'exercice`}</li>
                <li>• <strong>WA-011:</strong> Gestion des phases (travail/repos)</li>
              </ul>
              <ul className="space-y-2">
                <li>• <strong>WA-017:</strong> Affichage dynamique des exercices</li>
                <li>• <strong>WA-018:</strong>{`Images d'exercices réelles`}</li>
                <li>• <strong>WA-019:</strong> Animations entre exercices</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mt-4">
              <p className="text-xs text-amber-600">
                <strong>Clean Code:</strong>{`On crée d'abord une structure propre, puis on ajoute les fonctionnalités.`}
                <br />
                <strong>Pragmatic Programmer:</strong> {`"Don't live with broken windows" - même un placeholder doit être bien fait.`}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default WorkoutActiveView;