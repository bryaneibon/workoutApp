// src/design-system/primitives/index.js
// 🗂️ WA-DESIGN-001.2: Primitives Index - Clean Export System
// Référence Clean Code: "Organize code for readability"
// Référence Pragmatic Programmer: "Don't repeat yourself"

/**
 * 🎯 DESIGN PRIMITIVES VECT - EXPORT CENTRAL
 * 
 * Point d'entrée unique pour tous les composants primitifs
 * Extraits et améliorés depuis V0's glassmorphism & button system
 * 
 * Clean Code: "Use meaningful names and organize logically"
 */

// ============================================================================
// 📦 IMPORTS (V0's Extracted Primitives)
// ============================================================================
import React from 'react';
// Glass System (V0's glassmorphism mastery)
import Glass, {
  GlassCard,
  GlassStatCard,
  GlassControlPanel,
  GlassGradientOverlay,
  GLASS_VARIANTS,
  GLASS_SIZES,
  createGlassStyle,
  isGlassmorphismSupported
} from './Glass.jsx';

// Button System (V0's premium buttons)
import Button, {
  PlayButton,
  WorkoutButton,
  GlassButton,
  IconButton,
  ButtonGroup,
  StartButton,
  PauseButton,
  StopButton,
  NextButton,
  ResetButton,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  createButtonStyle,
  useButtonState
} from './Button.jsx';

// Typography System (V0's athletic typography)
import {
  TimerDigits,
  ExerciseHeader,
  BodyAthletic,
  UILabel,
  StatsNumber,
  GradientText,
  Badge,
  createResponsiveTypography,
  getV0TypographyConfig
} from './Typography.jsx';

// ============================================================================
// 🎨 MASTER PRIMITIVES OBJECT
// ============================================================================

/**
 * Objet principal contenant tous les primitives
 * Architecture: Glass | Button | Typography | Utils
 * @type {Object}
 */
export const DESIGN_PRIMITIVES = {
  // V0's Glass System
  glass: {
    Glass,
    GlassCard,
    GlassStatCard,
    GlassControlPanel,
    GlassGradientOverlay,
    variants: GLASS_VARIANTS,
    sizes: GLASS_SIZES,
    utils: {
      createGlassStyle,
      isGlassmorphismSupported
    }
  },
  
  // V0's Button System
  button: {
    Button,
    PlayButton,
    WorkoutButton,
    GlassButton,
    IconButton,
    ButtonGroup,
    StartButton,
    PauseButton,
    StopButton,
    NextButton,
    ResetButton,
    variants: BUTTON_VARIANTS,
    sizes: BUTTON_SIZES,
    utils: {
      createButtonStyle,
      useButtonState
    }
  },
  
  // V0's Typography System
  typography: {
    TimerDigits,
    ExerciseHeader,
    BodyAthletic,
    UILabel,
    StatsNumber,
    GradientText,
    Badge,
    utils: {
      createResponsiveTypography,
      getV0TypographyConfig
    }
  },
  
  // Meta information
  meta: {
    version: '1.0.0',
    source: 'V0 Glassmorphism + Button + Typography Extraction',
    lastUpdate: new Date().toISOString(),
    components: 25
  }
};

// ============================================================================
// 🚀 CONVENIENCE EXPORTS (Developer Experience)
// ============================================================================

/**
 * Exports directs pour faciliter l'utilisation
 * Pattern: import { Glass, Button, TimerDigits } from '@/design-system/primitives'
 */

// Glass exports
export {
  Glass,
  GlassCard,
  GlassStatCard,
  GlassControlPanel,
  GlassGradientOverlay
};

// Button exports
export {
  Button,
  PlayButton,
  WorkoutButton,
  GlassButton,
  IconButton,
  ButtonGroup,
  StartButton,
  PauseButton,
  StopButton,
  NextButton,
  ResetButton
};

// Typography exports
export {
  TimerDigits,
  ExerciseHeader,
  BodyAthletic,
  UILabel,
  StatsNumber,
  GradientText,
  Badge
};

// ============================================================================
// 🎯 COMPONENT GROUPS (Semantic Organization)
// ============================================================================

/**
 * Groupes sémantiques pour faciliter l'usage
 * V0 avait des patterns d'usage - on les systématise
 * @type {Object}
 */
export const COMPONENT_GROUPS = {
  // V0's timer components
  timer: {
    display: TimerDigits,
    controls: [PlayButton, PauseButton, StopButton],
    container: GlassCard
  },
  
  // V0's workout components
  workout: {
    header: ExerciseHeader,
    actions: [StartButton, NextButton, ResetButton],
    stats: GlassStatCard,
    body: BodyAthletic
  },
  
  // V0's layout components
  layout: {
    container: GlassGradientOverlay,
    card: GlassCard,
    panel: GlassControlPanel
  },
  
  // V0's interactive components
  interactive: {
    buttons: ButtonGroup,
    controls: [Button, IconButton],
    feedback: Badge
  },
  
  // V0's text components
  text: {
    display: [TimerDigits, ExerciseHeader],
    body: BodyAthletic,
    ui: UILabel,
    stats: StatsNumber,
    special: GradientText
  }
};

// ============================================================================
// 🎨 PRESET COMBINATIONS (V0 Patterns)
// ============================================================================

/**
 * Combinaisons prêtes à l'emploi basées sur les patterns V0
 * Leur insight: certaines combinaisons reviennent souvent
 * @type {Object}
 */
export const PRESET_COMBINATIONS = {
  // V0's timer display pattern
  timerDisplay: {
    container: { component: GlassCard, props: { variant: 'light', size: 'xl' } },
    digits: { component: TimerDigits, props: { size: 'large', responsive: true } },
    label: { component: UILabel, props: { color: 'muted' } }
  },
  
  // V0's workout control pattern
  workoutControls: {
    container: { component: GlassControlPanel, props: { variant: 'elevated' } },
    primary: { component: StartButton, props: { size: 'lg' } },
    secondary: { component: ButtonGroup, props: { gap: 'lg' } }
  },
  
  // V0's stat card pattern
  statDisplay: {
    container: { component: GlassStatCard, props: { variant: 'elevated' } },
    value: { component: StatsNumber, props: { size: 'large' } },
    label: { component: UILabel, props: { uppercase: true } }
  },
  
  // V0's exercise header pattern
  exerciseHeader: {
    title: { component: ExerciseHeader, props: { level: 2, uppercase: true } },
    subtitle: { component: BodyAthletic, props: { size: 'default', color: 'muted' } }
  }
};

// ============================================================================
// 🛠️ PRIMITIVE UTILITIES (Helper Functions)
// ============================================================================

/**
 * Utilitaires pour manipuler et composer les primitives
 * Clean Code: "Small functions do one thing well"
 */

/**
 * Crée un composant combiné basé sur un preset
 * @param {string} presetName - Nom du preset
 * @param {Object} overrides - Props à override
 * @returns {React.Component} Composant combiné
 */
export const createPresetComponent = (presetName, overrides = {}) => {
  const preset = PRESET_COMBINATIONS[presetName];
  if (!preset) {
    console.warn(`Preset not found: ${presetName}`);
    return null;
  }
  
  // Fonction factory pour créer le composant
  return ({ children, ...props }) => {
    return Object.entries(preset).map(([key, config]) => {
      const Component = config.component;
      const finalProps = { ...config.props, ...overrides[key], ...props };
      
      return (
        <Component key={key} {...finalProps}>
          {children}
        </Component>
      );
    });
  };
};

/**
 * Valide qu'un composant suit les patterns V0
 * @param {React.Component} component - Composant à valider
 * @returns {Object} Rapport de validation
 */
export const validateV0Pattern = (component) => {
  const checks = {
    hasGlassmorphism: false,
    hasAthlecticTypography: false,
    hasPremiumButtons: false,
    hasResponsiveDesign: false
  };
  
  // Analyse simple basée sur les props et className
  if (component.props?.variant && ['light', 'dark', 'elevated'].includes(component.props.variant)) {
    checks.hasGlassmorphism = true;
  }
  
  if (component.props?.className?.includes('font-timer-digits') || 
      component.props?.className?.includes('font-exercise-header')) {
    checks.hasAthlecticTypography = true;
  }
  
  if (component.type?.name?.includes('Button') || 
      component.props?.className?.includes('world-class-button')) {
    checks.hasPremiumButtons = true;
  }
  
  if (component.props?.responsive === true || 
      component.props?.className?.includes('sm:') || 
      component.props?.className?.includes('md:')) {
    checks.hasResponsiveDesign = true;
  }
  
  const score = Object.values(checks).filter(Boolean).length;
  
  return {
    score: `${score}/4`,
    checks,
    isV0Compliant: score >= 2,
    recommendations: generateRecommendations(checks)
  };
};

/**
 * Génère des recommandations pour améliorer un composant
 * @param {Object} checks - Résultats des vérifications
 * @returns {Array} Liste de recommandations
 */
const generateRecommendations = (checks) => {
  const recommendations = [];
  
  if (!checks.hasGlassmorphism) {
    recommendations.push('Consider using Glass components for modern V0-style UI');
  }
  
  if (!checks.hasAthlecticTypography) {
    recommendations.push('Use TimerDigits, ExerciseHeader, or BodyAthletic for consistent typography');
  }
  
  if (!checks.hasPremiumButtons) {
    recommendations.push('Replace basic buttons with WorkoutButton or PlayButton for premium feel');
  }
  
  if (!checks.hasResponsiveDesign) {
    recommendations.push('Add responsive props or classes for mobile-first design');
  }
  
  return recommendations;
};

/**
 * Helper pour générer les imports optimaux
 * @param {Array} components - Liste des composants utilisés
 * @returns {string} Code d'import optimisé
 */
export const generateOptimalImports = (components) => {
  const imports = {
    glass: [],
    button: [],
    typography: []
  };
  
  components.forEach(component => {
    if (['Glass', 'GlassCard', 'GlassStatCard', 'GlassControlPanel', 'GlassGradientOverlay'].includes(component)) {
      imports.glass.push(component);
    } else if (component.includes('Button')) {
      imports.button.push(component);
    } else if (['TimerDigits', 'ExerciseHeader', 'BodyAthletic', 'UILabel', 'StatsNumber', 'GradientText', 'Badge'].includes(component)) {
      imports.typography.push(component);
    }
  });
  
  const importLines = [];
  
  if (imports.glass.length > 0) {
    importLines.push(`import { ${imports.glass.join(', ')} } from '@/design-system/primitives/Glass';`);
  }
  
  if (imports.button.length > 0) {
    importLines.push(`import { ${imports.button.join(', ')} } from '@/design-system/primitives/Button';`);
  }
  
  if (imports.typography.length > 0) {
    importLines.push(`import { ${imports.typography.join(', ')} } from '@/design-system/primitives/Typography';`);
  }
  
  return importLines.join('\n');
};

// ============================================================================
// 🎨 CSS INTEGRATION (Tailwind + V0 Styles)
// ============================================================================

/**
 * Génère la configuration Tailwind pour les primitives
 * @returns {Object} Configuration Tailwind
 */
export const generatePrimitivesConfig = () => {
  return {
    // V0's custom classes
    components: {
      '.world-class-button': {
        'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'transform-origin': 'center',
        'border-radius': '12px'
      },
      
      '.glass-component': {
        'backdrop-filter': 'blur(24px)',
        '-webkit-backdrop-filter': 'blur(24px)'
      },
      
      '.font-timer-digits': {
        'font-feature-settings': '"tnum", "zero"',
        'letter-spacing': '-0.01em'
      },
      
      '.gradient-text': {
        'background-clip': 'text',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent'
      }
    },
    
    // Animation utilities
    utilities: {
      '.floating-element': {
        'animation': 'float-enhanced 6s ease-in-out infinite'
      },
      
      '.spring-hover:hover': {
        'transform': 'translateY(-3px) scale(1.02)'
      },
      
      '.haptic-feedback:active::after': {
        'transform': 'translate(-50%, -50%) scale(1.2)'
      }
    }
  };
};

// ============================================================================
// 🚀 DEFAULT EXPORT
// ============================================================================

/**
 * Export par défaut pour usage simple
 * import primitives from '@/design-system/primitives'
 */
export default DESIGN_PRIMITIVES;