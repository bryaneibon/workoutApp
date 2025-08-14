// src/design-system/components/index.js
// 🗂️ WA-DESIGN-001.3: Components Index - Master Export System
// Référence Clean Code: "Organize code for readability"
// Référence Pragmatic Programmer: "Don't repeat yourself"

/**
 * 🎯 DESIGN COMPONENTS VECT - EXPORT CENTRAL
 * 
 * Point d'entrée unique pour tous les composants complexes
 * Combinaisons intelligentes de nos primitives V0-extracted
 * 
 * Clean Code: "Use meaningful names and organize logically"
 */
import React from 'react';
// ============================================================================
// 📦 IMPORTS (V0's Complex Components)
// ============================================================================

// Timer System (V0's circular timer mastery)
import TimerDisplay, {
  CircularTimer,
  CompactTimer,
  useTimerState,
  createTimerAnimation
} from './Timer.jsx';

// Progress System (V0's progress mastery)
import ProgressBar, {
  WorkoutProgress,
  CircularProgress,
  MultiProgress,
  ProgressCard,
  TimerProgress,
  useProgressState,
  createProgressSegments,
  calculateTimeRemaining,
  formatDuration
} from './Progress.jsx';

// Layout System (V0's layout enhanced)
import WorkoutContainer, {
  ResponsiveGrid,
  WorkoutSection,
  ControlPanelLayout,
  MobileStack,
  CardLayout,
  StickyHeader,
  useScreenSize,
  useScrollPosition,
  createResponsiveLayout
} from './Layout.jsx';

// ============================================================================
// 🎨 MASTER COMPONENTS OBJECT
// ============================================================================

/**
 * Objet principal contenant tous les composants complexes
 * Architecture: Timer | Progress | Layout | Compositions
 * @type {Object}
 */
export const DESIGN_COMPONENTS = {
  // V0's Timer System
  timer: {
    TimerDisplay,
    CircularTimer,
    CompactTimer,
    hooks: {
      useTimerState
    },
    utils: {
      createTimerAnimation
    }
  },
  
  // V0's Progress System
  progress: {
    ProgressBar,
    WorkoutProgress,
    CircularProgress,
    MultiProgress,
    ProgressCard,
    TimerProgress,
    hooks: {
      useProgressState
    },
    utils: {
      createProgressSegments,
      calculateTimeRemaining,
      formatDuration
    }
  },
  
  // V0's Layout System Enhanced
  layout: {
    WorkoutContainer,
    ResponsiveGrid,
    WorkoutSection,
    ControlPanelLayout,
    MobileStack,
    CardLayout,
    StickyHeader,
    hooks: {
      useScreenSize,
      useScrollPosition
    },
    utils: {
      createResponsiveLayout
    }
  },
  
  // Meta information
  meta: {
    version: '1.0.0',
    source: 'V0 Timer + Progress + Layout Extraction + Enhancement',
    lastUpdate: new Date().toISOString(),
    components: 15,
    hooks: 4,
    utilities: 8
  }
};

// ============================================================================
// 🚀 CONVENIENCE EXPORTS (Developer Experience)
// ============================================================================

/**
 * Exports directs pour faciliter l'utilisation
 * Pattern: import { TimerDisplay, ProgressBar, WorkoutContainer } from '@/design-system/components'
 */

// Timer exports
export {
  TimerDisplay,
  CircularTimer,
  CompactTimer,
  useTimerState,
  createTimerAnimation
};

// Progress exports
export {
  ProgressBar,
  WorkoutProgress,
  CircularProgress,
  MultiProgress,
  ProgressCard,
  TimerProgress,
  useProgressState,
  createProgressSegments,
  calculateTimeRemaining,
  formatDuration
};

// Layout exports
export {
  WorkoutContainer,
  ResponsiveGrid,
  WorkoutSection,
  ControlPanelLayout,
  MobileStack,
  CardLayout,
  StickyHeader,
  useScreenSize,
  useScrollPosition,
  createResponsiveLayout
};

// ============================================================================
// 🎯 COMPONENT RECIPES (V0 Patterns + Enhancements)
// ============================================================================

/**
 * Recettes prêtes à l'emploi basées sur les patterns V0
 * Leur insight + nos améliorations = compositions magiques
 * @type {Object}
 */
export const COMPONENT_RECIPES = {
  // V0's timer page layout - complete recipe
  timerPage: {
    container: WorkoutContainer,
    containerProps: { variant: 'warm', padding: 'responsive' },
    sections: [
      {
        component: WorkoutSection,
        props: { title: 'Current Exercise', spacing: 'default' },
        content: [
          { component: TimerDisplay, props: { size: 'large', showControls: true } }
        ]
      },
      {
        component: WorkoutSection,
        props: { title: 'Progress', spacing: 'tight' },
        content: [
          { component: WorkoutProgress, props: { showStats: true } }
        ]
      }
    ]
  },
  
  // V0's dashboard layout - enhanced
  dashboard: {
    container: WorkoutContainer,
    containerProps: { variant: 'warm' },
    layout: ResponsiveGrid,
    layoutProps: { cols: { xs: 1, sm: 2, lg: 3 }, gap: 'lg' },
    cards: [
      { component: ProgressCard, props: { title: 'Workout Progress', icon: '🏋️' } },
      { component: ProgressCard, props: { title: 'Weekly Goal', icon: '🎯' } },
      { component: ProgressCard, props: { title: 'Streak', icon: '🔥' } }
    ]
  },
  
  // Mobile workout view - notre innovation
  mobileWorkout: {
    container: MobileStack,
    containerProps: { maxWidth: 'lg', spacing: 'default' },
    components: [
      { component: CompactTimer, props: { showProgress: true } },
      { component: TimerProgress, props: { showTimeLabels: true } },
      { component: ControlPanelLayout, props: { orientation: 'horizontal' } }
    ]
  },
  
  // Stats overview - composition avancée
  statsOverview: {
    container: CardLayout,
    containerProps: { variant: 'grid', cardVariant: 'elevated' },
    sections: [
      {
        title: 'Today',
        components: [
          { component: CircularProgress, props: { label: 'Daily Goal' } },
          { component: MultiProgress, props: { showLegend: true } }
        ]
      },
      {
        title: 'Week',
        components: [
          { component: ProgressBar, props: { variant: 'workout', showLabel: true } }
        ]
      }
    ]
  }
};

// ============================================================================
// 🎨 COMPONENT COMBINATIONS (Smart Compositions)
// ============================================================================

/**
 * Composants combinés intelligents
 * V0 avait des patterns - on les automatise
 */

/**
 * Complete Timer View - V0's timer page automated
 */
export const CompleteTimerView = ({ 
  timeRemaining, 
  totalTime, 
  phase, 
  workoutProgress,
  motivationMessage,
  ...props 
}) => (
  <WorkoutContainer variant="warm" padding="responsive" {...props}>
    <MobileStack maxWidth="lg" spacing="default">
      {/* Main timer - V0's central piece */}
      <WorkoutSection spacing="default">
        <TimerDisplay
          timeRemaining={timeRemaining}
          totalTime={totalTime}
          phase={phase}
          size="large"
          motivationMessage={motivationMessage}
        />
      </WorkoutSection>
      
      {/* Progress section - V0's progress display */}
      <WorkoutSection spacing="tight">
        <WorkoutProgress {...workoutProgress} />
      </WorkoutSection>
      
      {/* Timer progress bar - our enhancement */}
      <TimerProgress
        timeRemaining={timeRemaining}
        totalTime={totalTime}
        phase={phase}
        showTimeLabels={true}
      />
    </MobileStack>
  </WorkoutContainer>
);

/**
 * Dashboard Grid - V0's stats enhanced
 */
export const DashboardGrid = ({ 
  cards = [],
  cols = { xs: 1, sm: 2, lg: 3 },
  ...props 
}) => (
  <ResponsiveGrid cols={cols} gap="lg" {...props}>
    {cards.map((card, index) => (
      <ProgressCard key={index} {...card} />
    ))}
  </ResponsiveGrid>
);

/**
 * Mobile Control Panel - notre création
 */
export const MobileControlPanel = ({ 
  timer,
  progress,
  controls,
  ...props 
}) => (
  <MobileStack maxWidth="lg" spacing="default" {...props}>
    {/* Compact timer */}
    <CompactTimer {...timer} />
    
    {/* Progress display */}
    <TimerProgress {...progress} />
    
    {/* Controls */}
    <ControlPanelLayout orientation="horizontal" spacing="default">
      {controls}
    </ControlPanelLayout>
  </MobileStack>
);

// ============================================================================
// 🛠️ COMPONENT UTILITIES (Advanced Helpers)
// ============================================================================

/**
 * Factory pour créer des compositions personnalisées
 * @param {Object} recipe - Recette de composition
 * @returns {React.Component} Composant composé
 */
import PropTypes from 'prop-types';

export const createComponentComposition = (recipe) => {
  const ComposedComponent = ({ children, ...props }) => {
    const Container = recipe.container;
    const containerProps = { ...recipe.containerProps, ...props };

    return (
      <Container {...containerProps}>
        {recipe.sections?.map((section, index) => {
          const SectionComponent = section.component;
          return (
            <SectionComponent key={index} {...section.props}>
              {section.content?.map((content, contentIndex) => {
                const ContentComponent = content.component;
                return (
                  <ContentComponent key={contentIndex} {...content.props} />
                );
              })}
            </SectionComponent>
          );
        })}
        {children}
      </Container>
    );
  };

  ComposedComponent.displayName = 'ComposedComponent';
  ComposedComponent.propTypes = {
    children: PropTypes.node
  };

  return ComposedComponent;
};

/**
 * Helper pour analyser les performances des composants
 * @param {React.Component} component - Composant à analyser
 * @returns {Object} Rapport de performance
 */
export const analyzeComponentPerformance = (component) => {
  const analysis = {
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0,
    memoryUsage: 0
  };
  
  // Wrapper pour mesurer les performances
  return React.memo(React.forwardRef((props, ref) => {
    const startTime = performance.now();
    
    React.useEffect(() => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      analysis.renderCount++;
      analysis.lastRenderTime = renderTime;
      analysis.averageRenderTime = (analysis.averageRenderTime + renderTime) / 2;
      
      console.debug(`Component ${component.name} rendered in ${renderTime.toFixed(2)}ms`);
    });
    
    return React.createElement(component, { ...props, ref });
  }));
};

/**
 * Hook pour optimiser les re-renders
 * @param {*} value - Valeur à mémoriser
 * @param {Array} deps - Dépendances
 * @returns {*} Valeur mémorisée
 */
export const useOptimizedRender = (value, deps = []) => {
  return React.useMemo(() => value, deps);
};

/**
 * Helper pour créer des layouts conditionnels
 * @param {Object} conditions - Conditions et layouts correspondants
 * @returns {React.Component} Layout conditionnel
 */
export const createConditionalLayout = (conditions) => {
  const ConditionalLayout = ({ children, ...props }) => {
    const { isMobile, isTablet, isDesktop } = useScreenSize();

    let LayoutComponent = WorkoutContainer;
    let layoutProps = {};

    if (isMobile && conditions.mobile) {
      LayoutComponent = conditions.mobile.component;
      layoutProps = conditions.mobile.props || {};
    } else if (isTablet && conditions.tablet) {
      LayoutComponent = conditions.tablet.component;
      layoutProps = conditions.tablet.props || {};
    } else if (isDesktop && conditions.desktop) {
      LayoutComponent = conditions.desktop.component;
      layoutProps = conditions.desktop.props || {};
    }

    return (
      <LayoutComponent {...layoutProps} {...props}>
        {children}
      </LayoutComponent>
    );
  };

  ConditionalLayout.displayName = 'ConditionalLayout';
  ConditionalLayout.propTypes = {
    children: PropTypes.node
  };

  return ConditionalLayout;
};

// ============================================================================
// 🎨 VALIDATION & TESTING UTILITIES
// ============================================================================

/**
 * Valide qu'une composition suit les patterns V0
 * @param {Object} composition - Composition à valider
 * @returns {Object} Rapport de validation
 */
export const validateV0Composition = (composition) => {
  const checks = {
    hasWorkoutContainer: false,
    hasGlassComponents: false,
    hasResponsiveDesign: false,
    hasTimerComponents: false,
    hasProgressComponents: false,
    followsSpacingRules: false
  };
  
  // Analyse basique de la composition
  const componentNames = JSON.stringify(composition).toLowerCase();
  
  checks.hasWorkoutContainer = componentNames.includes('workoutcontainer');
  checks.hasGlassComponents = componentNames.includes('glass');
  checks.hasResponsiveDesign = componentNames.includes('responsive') || componentNames.includes('mobile');
  checks.hasTimerComponents = componentNames.includes('timer');
  checks.hasProgressComponents = componentNames.includes('progress');
  checks.followsSpacingRules = componentNames.includes('spacing') || componentNames.includes('gap');
  
  const score = Object.values(checks).filter(Boolean).length;
  const maxScore = Object.keys(checks).length;
  
  return {
    score: `${score}/${maxScore}`,
    percentage: Math.round((score / maxScore) * 100),
    checks,
    isV0Compliant: score >= 4,
    recommendations: generateCompositionRecommendations(checks)
  };
};

/**
 * Génère des recommandations pour améliorer une composition
 * @param {Object} checks - Résultats des vérifications
 * @returns {Array} Liste de recommandations
 */
const generateCompositionRecommendations = (checks) => {
  const recommendations = [];
  
  if (!checks.hasWorkoutContainer) {
    recommendations.push('Use WorkoutContainer as the root layout component');
  }
  
  if (!checks.hasGlassComponents) {
    recommendations.push('Consider using Glass components for modern V0-style UI');
  }
  
  if (!checks.hasResponsiveDesign) {
    recommendations.push('Add responsive components like ResponsiveGrid or MobileStack');
  }
  
  if (!checks.hasTimerComponents) {
    recommendations.push('Include timer components for workout functionality');
  }
  
  if (!checks.hasProgressComponents) {
    recommendations.push('Add progress components to show workout advancement');
  }
  
  if (!checks.followsSpacingRules) {
    recommendations.push('Ensure consistent spacing using our spacing system');
  }
  
  return recommendations;
};

// ============================================================================
// 🚀 DEFAULT EXPORT
// ============================================================================

/**
 * Export par défaut pour usage simple
 * import components from '@/design-system/components'
 */
export default DESIGN_COMPONENTS;