// src/components/views/WorkoutConfigView.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useWorkoutCalculations } from '@/hooks/useWorkoutCalculations.js';
import { useWorkoutValidation } from '@/hooks/useWorkoutValidation.js';
import { useValidationFeedback } from '@/hooks/useValidationFeedback.js';
import { EXERCISES_DATABASE } from '@/data/exercices';
import ExerciseIcon, { ExerciseIconPair } from '../ui/ExerciseIcon.jsx';
import { 
  Settings, 
  Clock, 
  Target, 
  Zap, 
  TrendingUp,
  Activity,
  Flame,
  Award,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Timer,
  Users,
  Dumbbell,
  Play,
  RotateCcw,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Gauge,
  Heart,
  Crosshair
} from 'lucide-react';

/**
 * Composant PremiumCard avec effets ultra raffinés
 */
const PremiumCard = ({ children, className = '', gradient = false, glow = false }) => (
  <div className={`
    bg-white border border-gray-200/60 rounded-xl shadow-lg
    transition-all duration-500 ease-out hover:shadow-xl hover:border-gray-300/60
    ${gradient ? 'bg-gradient-to-br from-white to-blue-50/30' : ''}
    ${glow ? 'hover:shadow-blue-500/10 hover:shadow-2xl' : ''}
    ${className}
  `}>
    {children}
  </div>
);

/**
 * Composant StatCard ultra premium
 */
const StatCard = ({ icon: Icon, label, value, color = 'blue', trend, onClick, animated = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const colorConfig = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', icon: 'text-blue-600' },
    green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', icon: 'text-green-600' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', icon: 'text-orange-600' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', icon: 'text-purple-600' },
    gray: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', icon: 'text-gray-600' }
  };
  
  const config = colorConfig[color] || colorConfig.blue;

  return (
    <div 
      className={`
        ${config.bg} ${config.border} border rounded-xl p-4 
        transition-all duration-300 ease-out cursor-pointer
        hover:scale-105 hover:shadow-lg hover:shadow-${color}-500/20
        ${animated ? 'animate-in fade-in duration-500' : ''}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 ${config.icon} ${isHovered ? 'scale-110' : ''} transition-transform duration-200`} />
        {trend && (
          <div className={`text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
            {trend > 0 ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className={`text-2xl font-bold ${config.text} mb-1`}>
        {value}
      </div>
      <div className="text-xs text-gray-600 font-medium">
        {label}
      </div>
    </div>
  );
};

/**
 * Composant SliderInput premium avec feedback visuel
 */
const SliderInput = ({ label, value, min, max, step = 1, unit = '', onChange, icon: Icon, color = 'blue' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;
  
  const colorConfig = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          {Icon && <Icon className="w-4 h-4 text-blue-600" />}
          {label}
        </label>
        <div className={`
          px-3 py-1 rounded-lg text-sm font-bold
          bg-gradient-to-r ${colorConfig[color]} text-white
          ${isDragging ? 'scale-110' : 'scale-100'} transition-transform duration-200
        `}>
          {value}{unit}
        </div>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-premium"
          style={{
            background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${percentage}%, rgb(229 231 235) ${percentage}%, rgb(229 231 235) 100%)`
          }}
        />
        
        {/* Marqueurs de valeurs */}
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Composant ExerciseSelector ultra premium
 */
const ExerciseSelector = ({ exercises, selectedExercises, onToggle }) => {
  const [expandedGroups, setExpandedGroups] = useState(new Set(['Cardio', 'Pectoraux']));
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  
  // Grouper par muscle
  const exercisesByGroup = Object.values(exercises).reduce((acc, exercise) => {
    if (!acc[exercise.muscleGroup]) acc[exercise.muscleGroup] = [];
    acc[exercise.muscleGroup].push(exercise);
    return acc;
  }, {});

  const toggleGroup = (group) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(group)) {
      newExpanded.delete(group);
    } else {
      newExpanded.add(group);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <PremiumCard className="p-6" gradient>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-blue-600" />
          Sélection d'exercices
        </h3>
        
        <div className="flex items-center gap-2">
          <div className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg text-sm font-semibold text-blue-600">
            {selectedExercises.length} sélectionnés
          </div>
          
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            {viewMode === 'grid' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(exercisesByGroup).map(([group, groupExercises]) => {
          const isExpanded = expandedGroups.has(group);
          const selectedInGroup = groupExercises.filter(ex => selectedExercises.includes(ex.id)).length;
          
          return (
            <div key={group} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleGroup(group)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="text-lg font-semibold text-gray-800">{group}</div>
                  <div className="bg-white border border-gray-200 px-2 py-1 rounded-lg text-xs font-medium text-gray-600">
                    {selectedInGroup}/{groupExercises.length}
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              {isExpanded && (
                <div className={`p-4 bg-white ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-3' : 'space-y-3'}`}>
                  {groupExercises.map((exercise) => {
                    const isSelected = selectedExercises.includes(exercise.id);
                    
                    return (
                      <div
                        key={exercise.id}
                        onClick={() => onToggle(exercise.id)}
                        className={`
                          p-3 border rounded-lg cursor-pointer transition-all duration-200
                          ${isSelected 
                            ? 'border-blue-300 bg-blue-50 scale-[1.02]' 
                            : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <ExerciseIcon 
                            iconName={exercise.images.start}
                            exercise={exercise}
                            size="sm"
                            animated={true}
                          />
                          
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-800 text-sm truncate">
                              {exercise.name}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span>{exercise.difficulty}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {exercise.defaultDuration}s
                              </span>
                            </div>
                          </div>
                          
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PremiumCard>
  );
};

/**
 * Composant principal WorkoutConfigView - LE STRAVA KILLER
 */
const WorkoutConfigView = () => {
  // États de configuration
  const [configState, setConfigState] = useState({
    workTime: 30,
    restTime: 15,
    prepTime: 10,
    rounds: 3,
    exercises: Object.keys(EXERCISES_DATABASE).slice(0, 3),
    difficulty: 'intermédiaire',
    name: 'Mon Workout HIIT',
    description: 'Configuration VECT',
    currentStep: 1,
    isDirty: false
  });

  // Hooks de calculs et validation
  const calculations = useWorkoutCalculations(configState);
  const validation = useWorkoutValidation(configState);
  const [validationResults, setValidationResults] = useState(null);
  const feedback = useValidationFeedback(validationResults, {
    maxVisible: 3,
    autoHideDelay: 5000,
    groupByField: true
  });

  // États UI
  const [activeSection, setActiveSection] = useState('timing');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const renderCountRef = useRef(0);
  renderCountRef.current++;

  // Validation en temps réel
  useEffect(() => {
    const performValidation = async () => {
      const results = await validation.validateComplete(configState, { debounceMs: 200 });
      setValidationResults(results);
    };
    performValidation();
  }, [configState, validation]);

  // Mise à jour optimisée
  const updateConfig = useCallback((field, value) => {
    setConfigState(prev => ({
      ...prev,
      [field]: value,
      isDirty: true
    }));
  }, []);

  // Toggle exercice
  const toggleExercise = useCallback((exerciseId) => {
    setConfigState(prev => {
      const isSelected = prev.exercises.includes(exerciseId);
      const newExercises = isSelected
        ? prev.exercises.filter(id => id !== exerciseId)
        : [...prev.exercises, exerciseId];
      
      return {
        ...prev,
        exercises: newExercises,
        isDirty: true
      };
    });
  }, []);

  const sections = [
    { id: 'timing', label: 'Timing', icon: Timer, color: 'blue' },
    { id: 'exercises', label: 'Exercices', icon: Dumbbell, color: 'green' },
    { id: 'analysis', label: 'Analyse', icon: BarChart3, color: 'purple' },
    { id: 'validation', label: 'Validation', icon: CheckCircle, color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Premium */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">

            <div className="group">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl group-hover:bg-blue-100 transition-colors duration-300">
                  <Settings className="w-8 h-8 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div>
                  <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-blue-600 to-gray-800 bg-clip-text text-transparent">
                    Configuration
                  </h1>
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Créez votre workout parfait personnalisé
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
                  ${isPreviewMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-800 text-white hover:bg-blue-600'
                  }
                `}
              >
                {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {isPreviewMode ? 'Édition' : 'Aperçu'}
              </button>
              
              <button className="btn-secondary flex items-center gap-2 px-6 py-3">
                <Play className="w-4 h-4" />
                Démarrer
              </button>
            </div>
          </div>

          {/* Statistiques en temps réel */}
          <div className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-4 mb-6">
            <StatCard 
              icon={Clock} 
              label="Durée totale" 
              value={calculations.durationCalculations.formattedDuration} 
              color="blue"
              trend={5}
            />
            <StatCard 
              icon={Flame} 
              label="Calories" 
              value={calculations.calorieCalculations.estimatedCalories} 
              color="orange"
              trend={12}
            />
            <StatCard 
              icon={Target} 
              label="Exercices" 
              value={configState.exercises.length} 
              color="green"
            />
            <StatCard 
              icon={RotateCcw} 
              label="Rounds" 
              value={configState.rounds} 
              color="purple"
            />
            <StatCard 
              icon={Award} 
              label="Score" 
              value={`${calculations.performanceMetrics.qualityScore}%`} 
              color="blue"
              trend={8}
            />
          </div>

          {/* Navigation sections */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {sections.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap
                  transition-all duration-200 hover:scale-105
                  ${activeSection === id
                    ? `bg-${color}-50 border border-${color}-200 text-${color}-700 shadow-md`
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Colonne de configuration */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Section Timing */}
            {activeSection === 'timing' && (
              <PremiumCard className="p-6" gradient glow>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Timer className="w-6 h-6 text-blue-600" />
                  Configuration temporelle
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <SliderInput
                    label="Temps de travail"
                    value={configState.workTime}
                    min={15}
                    max={60}
                    unit="s"
                    onChange={(value) => updateConfig('workTime', value)}
                    icon={Zap}
                    color="blue"
                  />
                  
                  <SliderInput
                    label="Temps de repos"
                    value={configState.restTime}
                    min={5}
                    max={45}
                    unit="s"
                    onChange={(value) => updateConfig('restTime', value)}
                    icon={Heart}
                    color="green"
                  />
                  
                  <SliderInput
                    label="Temps de préparation"
                    value={configState.prepTime}
                    min={5}
                    max={30}
                    unit="s"
                    onChange={(value) => updateConfig('prepTime', value)}
                    icon={Crosshair}
                    color="orange"
                  />
                  
                  <SliderInput
                    label="Nombre de rounds"
                    value={configState.rounds}
                    min={1}
                    max={8}
                    onChange={(value) => updateConfig('rounds', value)}
                    icon={RotateCcw}
                    color="purple"
                  />
                </div>

                {/* Visualisation temporelle */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <Gauge className="w-5 h-5" />
                    Répartition temporelle
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Travail ({calculations.durationCalculations.workPercentage}%)</span>
                      <span className="font-semibold">{calculations.durationCalculations.totalWorkTime}s</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
                        style={{ width: `${calculations.durationCalculations.workPercentage}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>Repos ({calculations.durationCalculations.restPercentage}%)</span>
                      <span className="font-semibold">{calculations.durationCalculations.totalRestTime}s</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                        style={{ width: `${calculations.durationCalculations.restPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </PremiumCard>
            )}

            {/* Section Exercices */}
            {activeSection === 'exercises' && (
              <ExerciseSelector 
                exercises={EXERCISES_DATABASE}
                selectedExercises={configState.exercises}
                onToggle={toggleExercise}
              />
            )}

            {/* Section Analyse */}
            {activeSection === 'analysis' && (
              <PremiumCard className="p-6" gradient>
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                  Analyse avancée
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Analyse calorique */}
                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                      <Flame className="w-5 h-5" />
                      Analyse calorique
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Estimation:</span>
                        <span className="font-bold">{calculations.calorieCalculations.estimatedCalories} cal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Par minute:</span>
                        <span className="font-bold">{calculations.calorieCalculations.caloriesPerMinute} cal/min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fourchette:</span>
                        <span className="font-bold">
                          {calculations.calorieCalculations.calorieRange.min}-{calculations.calorieCalculations.calorieRange.max}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Analyse musculaire */}
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Groupes musculaires
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Groupes ciblés:</span>
                        <span className="font-bold">{calculations.muscleGroupAnalysis.targetedGroups.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Couverture:</span>
                        <span className="font-bold">{calculations.muscleGroupAnalysis.coverage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Équilibre:</span>
                        <span className="font-bold">{calculations.muscleGroupAnalysis.balanceScore}%</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${calculations.muscleGroupAnalysis.balanceScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score global */}
                <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <div className="text-center">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                      <Award className="w-6 h-6 text-blue-600" />
                      Score de qualité global
                    </h4>
                    <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {calculations.performanceMetrics.qualityScore}%
                    </div>
                    <div className="text-lg font-semibold text-gray-700 mb-4">
                      {calculations.performanceMetrics.overallRating}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${calculations.performanceMetrics.qualityScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </PremiumCard>
            )}

            {/* Section Validation */}
            {activeSection === 'validation' && (
              <PremiumCard className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  Validation et feedback
                </h3>

                {validationResults && (
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <StatCard 
                      icon={AlertTriangle} 
                      label="Erreurs" 
                      value={validationResults.errors.length} 
                      color="orange"
                    />
                    <StatCard 
                      icon={Info} 
                      label="Avertissements" 
                      value={validationResults.warnings.length} 
                      color="blue"
                    />
                    <StatCard 
                      icon={CheckCircle} 
                      label="Infos" 
                      value={validationResults.infos.length} 
                      color="green"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  {feedback.priorityMessages.slice(0, 5).map((message, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${message.style.bgColor} ${message.style.borderColor}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{message.style.icon}</span>
                        <div className="flex-1">
                          <div className={`font-semibold ${message.style.textColor} mb-1`}>
                            {message.message}
                          </div>
                          {message.suggestion && (
                            <div className="text-sm text-gray-600 flex items-start gap-2">
                              <Sparkles className="w-4 h-4 mt-0.5 text-blue-500" />
                              {message.suggestion}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {feedback.priorityMessages.length === 0 && (
                    <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center">
                      <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <div className="text-lg font-bold text-green-800 mb-2">
                        Configuration parfaite ! 🎉
                      </div>
                      <div className="text-green-600">
                        Votre workout est optimisé et prêt à être utilisé
                      </div>
                    </div>
                  )}
                </div>
              </PremiumCard>
            )}
          </div>

          {/* Colonne de preview et actions */}
          <div className="space-y-6">
            
            {/* Preview du workout */}
            <PremiumCard className="p-6 sticky top-6" gradient glow>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                Aperçu du workout
              </h3>
              
              <div className="space-y-4">
                {/* Métadonnées */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {calculations.durationCalculations.formattedDuration}
                    </div>
                    <div className="text-sm text-blue-700">
                      Durée totale estimée
                    </div>
                  </div>
                </div>

                {/* Exercices sélectionnés */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Dumbbell className="w-4 h-4" />
                    Exercices ({configState.exercises.length})
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {configState.exercises.map((exerciseId, index) => {
                      const exercise = EXERCISES_DATABASE[exerciseId];
                      if (!exercise) return null;
                      
                      return (
                        <div 
                          key={exerciseId}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors duration-200"
                        >
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          
                          <ExerciseIcon 
                            iconName={exercise.images.start}
                            exercise={exercise}
                            size="sm"
                            animated={false}
                          />
                          
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-800 text-sm truncate">
                              {exercise.name}
                            </div>
                            <div className="text-xs text-gray-600">
                              {exercise.muscleGroup} • {exercise.defaultDuration}s
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Difficulté */}
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Difficulté</span>
                    <div className={`
                      px-3 py-1 rounded-lg text-xs font-bold
                      ${configState.difficulty === 'débutant' ? 'bg-green-100 text-green-700' :
                        configState.difficulty === 'intermédiaire' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'}
                    `}>
                      {configState.difficulty}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions principales */}
              <div className="mt-6 space-y-3">
                <button className="w-full btn-secondary flex items-center justify-center gap-2 py-3">
                  <Play className="w-4 h-4" />
                  <span className="font-semibold">Démarrer le workout</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors duration-200">
                    <Settings className="w-4 h-4" />
                    Sauvegarder
                  </button>
                  
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors duration-200">
                    <RotateCcw className="w-4 h-4" />
                    Réinitialiser
                  </button>
                </div>
              </div>
            </PremiumCard>
          </div>
        </div>

        {/* Footer avec call-to-action premium */}
        <div className="mt-12 text-center">
          <PremiumCard className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200" glow>
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                🚀 Prêt à révolutionner votre fitness ?
              </h3>
              <p className="text-gray-600 mb-6">
                Cette interface premium utilise une architecture de hooks avancée pour vous offrir 
                une expérience de configuration inégalée dans l'industrie du fitness.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-secondary flex items-center gap-2 px-8 py-4 text-lg font-semibold">
                  <Sparkles className="w-5 h-5" />
                  Découvrir les fonctionnalités
                </button>
                
                <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:scale-105 transition-transform duration-200">
                  <TrendingUp className="w-5 h-5" />
                  Commencer maintenant
                </button>
              </div>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

// PropTypes
PremiumCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  gradient: PropTypes.bool,
  glow: PropTypes.bool
};

StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string,
  trend: PropTypes.number,
  onClick: PropTypes.func,
  animated: PropTypes.bool
};

SliderInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  unit: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.elementType,
  color: PropTypes.string
};

ExerciseSelector.propTypes = {
  exercises: PropTypes.object.isRequired,
  selectedExercises: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default WorkoutConfigView;