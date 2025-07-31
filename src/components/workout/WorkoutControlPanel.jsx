// src/components/workout/WorkoutControlPanel.jsx
// 🎨 WA-012.2: Enhanced avec micro-interactions et états visuels
// Référence Clean Code: "User interface is part of clean architecture"

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody } from '../ui/Card.jsx';
import Button, { StartButton, StopButton, NextButton, ResetButton } from '../ui/Button.jsx';

/**
 * 🎮 Composant WorkoutControlPanel Enhanced - Contrôles avec micro-interactions
 * 
 * WA-012.2 Améliorations visuelles :
 * - Micro-animations sur interactions boutons
 * - États visuels dynamiques selon capacités
 * - Transitions fluides entre états
 * - Feedback visuel immédiat sur actions
 * 
 * Pragmatic Programmer: "Invest in the tools you use"
 */
const WorkoutControlPanel = ({ 
  workout, 
  className = '' 
}) => {
  const { actions, capabilities, timer } = workout;
  
  // 🎭 État local pour animations de feedback
  const [recentAction, setRecentAction] = useState(null);
  
  // 🎯 Handler avec feedback visuel
  const handleActionWithFeedback = (action, actionName) => {
    setRecentAction(actionName);
    action();
    
    // Reset du feedback après animation
    setTimeout(() => setRecentAction(null), 1000);
  };

  // 🎨 Classes d'animation pour les indicateurs de statut
  const getStatusIndicatorClasses = (isActive, color = 'green') => {
    return `w-3 h-3 rounded-full transition-all duration-500 ${
      isActive 
        ? `bg-${color}-500 animate-pulse shadow-lg shadow-${color}-300` 
        : 'bg-slate-300'
    }`;
  };

  return (
    <Card className={`transition-all duration-500 hover:shadow-xl ${className}`}>
      <CardHeader 
        title="🎮 Contrôles avec Progression Automatique" 
        action={
          <div className="flex items-center space-x-4 text-sm">
            {/* 🟢 Indicateur Timer Status enhanced */}
            <div className="flex items-center space-x-2 transition-all duration-300 hover:scale-105">
              <div className={getStatusIndicatorClasses(timer.isRunning, 'green')}></div>
              <span className={`text-slate-600 transition-colors duration-300 ${
                timer.isRunning ? 'text-green-600 font-medium' : ''
              }`}>
                Timer {timer.isRunning ? 'actif' : 'arrêté'}
              </span>
            </div>
            
            {/* ⚡ Compteur de ticks avec animation */}
            <div className="text-slate-600 transition-all duration-300 hover:text-blue-600">
              Ticks: <span className={`font-medium text-blue-600 transition-all duration-300 ${
                timer.tickCount > 0 ? 'animate-pulse' : ''
              }`}>
                {timer.tickCount}
              </span>
            </div>
            
            {/* 🔔 Compteur notifications enhanced */}
            <div className="text-slate-600 transition-all duration-300 hover:text-purple-600">
              Notifications: <span className={`font-medium text-purple-600 transition-all duration-300 ${
                timer.notifications.count > 0 ? 'animate-bounce' : ''
              }`}>
                {timer.notifications.count}
              </span>
              {timer.notifications.count > 0 && (
                <span className="ml-1 animate-ping">🔔</span>
              )}
            </div>
          </div>
        }
      />
      
      <CardBody>
        {/* 🎮 Contrôles principaux enhanced */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          <StartButton
            onClick={() => handleActionWithFeedback(actions.startWorkout, 'start')}
            disabled={!capabilities.canStart}
            className={`col-span-2 md:col-span-1 transition-all duration-300 ${
              !capabilities.canStart 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105 hover:shadow-lg active:scale-95'
            } ${recentAction === 'start' ? 'animate-bounce' : ''}`}
          >
            🚀 Start Auto
          </StartButton>

          <Button
            variant={capabilities.canResume ? 'success' : 'warning'}
            onClick={() => handleActionWithFeedback(actions.togglePause, 'toggle')}
            disabled={!capabilities.canPause && !capabilities.canResume}
            className={`transition-all duration-300 ${
              (!capabilities.canPause && !capabilities.canResume) 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105 hover:shadow-lg active:scale-95'
            } ${recentAction === 'toggle' ? 'animate-pulse' : ''}`}
          >
            {capabilities.canResume ? '▶️ Resume' : '⏸️ Pause'}
          </Button>

          <StopButton
            onClick={() => handleActionWithFeedback(actions.stopWorkout, 'stop')}
            disabled={!capabilities.canStop}
            className={`transition-all duration-300 ${
              !capabilities.canStop 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105 hover:shadow-lg active:scale-95 hover:shadow-red-300'
            } ${recentAction === 'stop' ? 'animate-pulse' : ''}`}
          >
            ⏹️ Stop
          </StopButton>

          <NextButton
            onClick={() => handleActionWithFeedback(actions.nextExercise, 'next')}
            disabled={!capabilities.canNext}
            className={`transition-all duration-300 ${
              !capabilities.canNext 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105 hover:shadow-lg active:scale-95 hover:shadow-yellow-300'
            } ${recentAction === 'force' ? 'animate-pulse' : ''}`}
          >
            ⚡ Force
          </NextButton>

          <ResetButton
            onClick={() => handleActionWithFeedback(actions.resetWorkout, 'reset')}
            className={`transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 hover:shadow-slate-300 ${
              recentAction === 'reset' ? 'animate-spin' : ''
            }`}
          >
            🔄 Reset
          </ResetButton>
        </div>
        
        {/* 🔔 Section des notifications enhanced */}
        <div className="border-t border-slate-200 pt-4 transition-all duration-500">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-slate-600 transition-all duration-300 hover:text-slate-800">
              <span className="inline-flex items-center space-x-1">
                <span className={timer.notifications.count > 0 ? 'animate-bounce' : ''}>🔔</span>
                <span className="font-medium">Notifications actives:</span>
                <span className={`font-bold transition-colors duration-300 ${
                  timer.notifications.count > 0 ? 'text-blue-600' : 'text-slate-400'
                }`}>
                  {timer.notifications.count}
                </span>
              </span>
              
              {timer.notifications.latest && (
                <span className="ml-2 text-slate-500 animate-fade-in">
                  • {timer.notifications.latest.message.slice(0, 30)}
                  {timer.notifications.latest.message.length > 30 ? '...' : ''}
                </span>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleActionWithFeedback(actions.clearNotifications, 'clear')}
              disabled={timer.notifications.count === 0}
              className={`transition-all duration-300 ${
                timer.notifications.count === 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-105 active:scale-95'
              } ${recentAction === 'clear' ? 'animate-pulse' : ''}`}
            >
              🗑️ Effacer notifications
            </Button>
          </div>
          
          {/* 📜 Historique récent des notifications enhanced */}
          {timer.notifications.history && timer.notifications.history.length > 0 && (
            <div className="bg-slate-50 p-3 rounded-lg transition-all duration-500 hover:bg-slate-100">
              <div className="text-xs text-slate-500 mb-2 flex items-center space-x-1">
                <span>📜</span>
                <span>Dernières notifications:</span>
              </div>
              <div className="space-y-1">
                {timer.notifications.history.slice(-3).map((notification, index) => (
                  <div 
                    key={notification.id || index} 
                    className="text-xs text-slate-600 flex items-center space-x-2 transition-all duration-300 hover:bg-white p-1 rounded animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-slate-400 font-mono">{notification.timestamp}</span>
                    <span className="flex-1 truncate">{notification.message}</span>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* 🔧 Section debug enhanced pour développement */}
        {import.meta.env.MODE === 'development' && (
          <div className="mt-4 p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border transition-all duration-500 hover:shadow-lg">
            <div className="text-xs text-slate-600 mb-2 flex items-center space-x-1">
              <span className="animate-spin">🔧</span>
              <strong>WA-010 System Debug Enhanced:</strong>
            </div>
            
            <div className="text-xs text-slate-600 space-y-1">
              <div className="flex justify-between items-center transition-all duration-300 hover:bg-white p-1 rounded">
                <span>Timer Status:</span>
                <span className={`flex items-center space-x-1 ${
                  timer.isRunning ? 'text-green-600' : 'text-red-600'
                }`}>
                  <div className={getStatusIndicatorClasses(timer.isRunning, timer.isRunning ? 'green' : 'red')}></div>
                  <span>{timer.isRunning ? '✅ Running' : '❌ Stopped'}</span>
                </span>
              </div>
              
              <div className="flex justify-between items-center transition-all duration-300 hover:bg-white p-1 rounded">
                <span>Auto-progression:</span>
                <span className={`flex items-center space-x-1 ${
                  timer.progression?.isAutoProgressing ? 'text-green-600' : 'text-red-600'
                }`}>
                  <div className={getStatusIndicatorClasses(timer.progression?.isAutoProgressing, 
                    timer.progression?.isAutoProgressing ? 'green' : 'red')}></div>
                  <span>{timer.progression?.isAutoProgressing ? '✅ Active' : '❌ Inactive'}</span>
                </span>
              </div>
              
              <div className="flex justify-between transition-all duration-300 hover:bg-white p-1 rounded">
                <span>Current Phase:</span>
                <span className="text-blue-600 font-medium">
                  {timer.progression?.currentPhase || 'Unknown'}
                </span>
              </div>
              
              <div className="flex justify-between transition-all duration-300 hover:bg-white p-1 rounded">
                <span>Next Exercise:</span>
                <span className="text-purple-600 font-medium">
                  {timer.progression?.progressionInfo?.nextExercise || 'Fin'}
                </span>
              </div>
            </div>
            
            {/* 🔧 Boutons de diagnostic enhanced */}
            <div className="mt-3 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const diagnostic = workout.utils.getSystemDiagnostic();
                  console.log('🏥 WA-010 System Diagnostic:', diagnostic);
                }}
                className="transition-all duration-300 hover:scale-105 active:scale-95"
              >
                🏥 System Check
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  workout.utils.systemHealthCheck();
                }}
                className="transition-all duration-300 hover:scale-105 active:scale-95"
              >
                🔍 Health Check
              </Button>
            </div>
          </div>
        )}
        
        {/* ✨ Indicateur d'action récente */}
        {recentAction && (
          <div className="mt-2 flex justify-center">
            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium animate-fade-in">
              {`✅ Action "${recentAction}" exécutée`}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

// 🎯 PropTypes inchangés
WorkoutControlPanel.propTypes = {
  workout: PropTypes.shape({
    actions: PropTypes.shape({
      startWorkout: PropTypes.func.isRequired,
      togglePause: PropTypes.func.isRequired,
      stopWorkout: PropTypes.func.isRequired,
      nextExercise: PropTypes.func.isRequired,
      forceNextPhase: PropTypes.func.isRequired,
      resetWorkout: PropTypes.func.isRequired,
      clearNotifications: PropTypes.func.isRequired
    }).isRequired,
    capabilities: PropTypes.shape({
      canStart: PropTypes.bool.isRequired,
      canPause: PropTypes.bool.isRequired,
      canResume: PropTypes.bool.isRequired,
      canStop: PropTypes.bool.isRequired,
      canNext: PropTypes.bool.isRequired
    }).isRequired,
    timer: PropTypes.shape({
      isRunning: PropTypes.bool.isRequired,
      tickCount: PropTypes.number.isRequired,
      notifications: PropTypes.shape({
        count: PropTypes.number.isRequired,
        latest: PropTypes.object,
        history: PropTypes.array
      }).isRequired,
      progression: PropTypes.object
    }).isRequired,
    utils: PropTypes.shape({
      getSystemDiagnostic: PropTypes.func.isRequired,
      systemHealthCheck: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  className: PropTypes.string
};

WorkoutControlPanel.defaultProps = {
  className: ''
};

export default WorkoutControlPanel;