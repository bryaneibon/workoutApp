// src/design-system/tokens/index.js
// 🗂️ WA-DESIGN-001.1: Design Tokens - Central Export
// Référence Clean Code: "Organize code for readability"
// Référence Pragmatic Programmer: "Don't repeat yourself"

/**
 * 🎯 DESIGN TOKENS VECT - EXPORT CENTRAL
 * 
 * Point d'entrée unique pour tous les design tokens
 * Inspiré de V0 mais organisé selon Clean Architecture
 * 
 * Clean Code: "Use meaningful names and organize logically"
 */

// ============================================================================
// 📦 IMPORTS (V0's Extracted Tokens)
// ============================================================================

import { DESIGN_TOKENS_COLORS } from './colors.js';
import { DESIGN_TOKENS_SPACING } from './spacing.js';
import { DESIGN_TOKENS_TYPOGRAPHY } from './typography.js';

// ============================================================================
// 🎨 MASTER DESIGN TOKENS OBJECT
// ============================================================================

/**
 * Objet principal contenant tous les design tokens
 * Architecture: colors | spacing | typography | computed
 * @type {Object}
 */
export const DESIGN_TOKENS = {
  // V0's extracted color system
  colors: DESIGN_TOKENS_COLORS,
  
  // V0's extracted spacing system  
  spacing: DESIGN_TOKENS_SPACING,
  
  // V0's extracted typography system
  typography: DESIGN_TOKENS_TYPOGRAPHY,
  
  // Meta information
  meta: {
    version: '1.0.0',
    source: 'V0 Extraction + VECT Enhancement',
    lastUpdate: new Date().toISOString(),
    baseUnit: 8 // 8px design system
  }
};

// ============================================================================
// 🚀 CONVENIENCE EXPORTS (Developer Experience)
// ============================================================================

/**
 * Exports directs pour faciliter l'utilisation
 * Pattern: import { colors, spacing, typography } from '@/design-system/tokens'
 */

// Color system
export const colors = DESIGN_TOKENS_COLORS;
export const {
  warm: warmColors,
  workout: workoutColors, 
  gradients,
  glass: glassColors,
  semantic: semanticColors,
  opacity,
  shadows
} = DESIGN_TOKENS_COLORS;

// Spacing system
export const spacing = DESIGN_TOKENS_SPACING;
export const {
  scale: spacingScale,
  semantic: semanticSpacing,
  sizes: componentSizes,
  radius: borderRadius,
  semantic_radius: semanticRadius,
  breakpoints,
  responsive: responsiveSpacing,
  z_index: zIndex
} = DESIGN_TOKENS_SPACING;

// Typography system
export const typography = DESIGN_TOKENS_TYPOGRAPHY;
export const {
  families: fontFamilies,
  weights: fontWeights,
  sizes: fontSizes,
  styles: typographyStyles,
  responsive: responsiveTypography,
  letterSpacing,
  lineHeights,
  loading: fontLoading
} = DESIGN_TOKENS_TYPOGRAPHY;

// ============================================================================
// 🎯 COMPUTED TOKENS (V0 + Enhancements)
// ============================================================================

/**
 * Tokens calculés basés sur les tokens de base
 * V0 avait des patterns qu'on peut systématiser
 * @type {Object}
 */
export const COMPUTED_TOKENS = {
  // V0's button system systematized
  buttons: {
    primary: {
      background: gradients.primary_button,
      backgroundHover: gradients.primary_button_hover,
      backgroundActive: gradients.primary_button_active,
      color: warmColors.surface,
      padding: `${spacingScale.lg}px ${spacingScale['2xl']}px`,
      borderRadius: borderRadius.xl,
      fontSize: fontSizes.base.size,
      fontWeight: fontWeights.semibold,
      boxShadow: shadows.button_default
    },
    
    secondary: {
      background: gradients.secondary_button,
      backgroundHover: gradients.secondary_button_hover,
      backgroundActive: gradients.secondary_button_active,
      color: warmColors.surface,
      padding: `${spacingScale.lg}px ${spacingScale.xl}px`,
      borderRadius: borderRadius.xl,
      fontSize: fontSizes.base.size,
      fontWeight: fontWeights.medium,
      boxShadow: shadows.button_default
    }
  },
  
  // V0's card system
  cards: {
    default: {
      background: glassColors.light.background,
      border: `1px solid ${glassColors.light.border}`,
      borderRadius: borderRadius['2xl'],
      padding: spacingScale.xl,
      backdropFilter: `blur(${glassColors.light.backdrop_blur})`,
      boxShadow: shadows.glass_light
    },
    
    elevated: {
      background: glassColors.elevated.background,
      border: `1px solid ${glassColors.elevated.border}`,
      borderRadius: borderRadius['2xl'],
      padding: spacingScale.xl,
      backdropFilter: `blur(${glassColors.elevated.backdrop_blur})`,
      boxShadow: shadows.glass_elevated
    }
  },
  
  // V0's timer system
  timer: {
    ring: {
      size: componentSizes.timer.large,
      strokeWidth: 5,
      gradient: gradients.progress_ring,
      glow: shadows.timer_glow
    },
    
    digits: {
      ...typographyStyles.timer_digits,
      color: warmColors.primary
    }
  },
  
  // Layout containers (V0 patterns)
  containers: {
    main: {
      background: gradients.warm_background,
      padding: semanticSpacing.container.desktop,
      minHeight: '100vh'
    },
    
    workout: {
      maxWidth: componentSizes.card.large.max_width,
      margin: '0 auto',
      padding: semanticSpacing.layout.section_gap
    }
  }
};

// ============================================================================
// 🛠️ TOKEN UTILITIES (Helper Functions)
// ============================================================================

/**
 * Utilitaires pour manipuler les tokens
 * Clean Code: "Small functions do one thing well"
 */

/**
 * Récupère un token par chemin
 * @param {string} path - Chemin vers le token (ex: "colors.warm.primary")
 * @returns {any} Valeur du token
 */
export const getToken = (path) => {
  const keys = path.split('.');
  let current = DESIGN_TOKENS;
  
  for (const key of keys) {
    current = current[key];
    if (current === undefined) {
      console.warn(`Token not found: ${path}`);
      return null;
    }
  }
  
  return current;
};

/**
 * Génère les CSS variables à partir des tokens
 * @param {Object} tokens - Objet de tokens
 * @param {string} prefix - Préfixe pour les variables
 * @returns {Object} Variables CSS
 */
export const generateCSSVariables = (tokens, prefix = '--vect') => {
  const variables = {};
  
  const flatten = (obj, currentPath = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const path = currentPath ? `${currentPath}-${key}` : key;
      
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        flatten(value, path);
      } else {
        variables[`${prefix}-${path}`] = value;
      }
    });
  };
  
  flatten(tokens);
  return variables;
};

/**
 * Crée les classes Tailwind à partir des tokens
 * @param {Object} tokens - Tokens à convertir
 * @returns {Object} Configuration Tailwind
 */
export const generateTailwindConfig = () => {
  return {
    colors: {
      // V0's warm colors
      'warm-primary': warmColors.primary,
      'warm-secondary': warmColors.secondary,
      'warm-muted': warmColors.muted,
      
      // Workout colors
      'work': workoutColors.work_primary,
      'rest': workoutColors.rest_primary,
      'preparation': workoutColors.preparation,
      
      // Semantic colors
      ...semanticColors.timer,
      ...semanticColors.exercise
    },
    
    spacing: spacingScale,
    
    fontFamily: {
      'timer-digits': fontFamilies.display.split(', '),
      'exercise-header': fontFamilies.primary.split(', '),
      'body-athletic': fontFamilies.primary.split(', '),
      'ui-label': fontFamilies.primary.split(', ')
    },
    
    fontSize: Object.entries(fontSizes).reduce((acc, [key, value]) => {
      acc[key] = [value.size, { lineHeight: value.lineHeight }];
      return acc;
    }, {}),
    
    borderRadius: borderRadius,
    
    boxShadow: shadows,
    
    backdropBlur: {
      'glass-light': glassColors.light.backdrop_blur,
      'glass-dark': glassColors.dark.backdrop_blur,
      'glass-elevated': glassColors.elevated.backdrop_blur
    }
  };
};

/**
 * Valide la cohérence des tokens
 * @returns {Object} Rapport de validation
 */
export const validateTokens = () => {
  const warnings = [];
  const errors = [];
  
  // Vérifier que toutes les couleurs sont valides
  const checkColors = (obj, path = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'string' && value.startsWith('#')) {
        if (!/^#[0-9A-F]{6}$/i.test(value)) {
          errors.push(`Invalid color format: ${currentPath} = ${value}`);
        }
      } else if (typeof value === 'object' && value !== null) {
        checkColors(value, currentPath);
      }
    });
  };
  
  checkColors(colors);
  
  // Vérifier que les tailles sont cohérentes
  const spacingValues = Object.values(spacingScale);
  const invalidSpacing = spacingValues.filter(value => typeof value !== 'number' || value < 0);
  
  if (invalidSpacing.length > 0) {
    warnings.push(`Invalid spacing values found: ${invalidSpacing.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    summary: {
      colors: Object.keys(colors).length,
      spacing: Object.keys(spacingScale).length,
      typography: Object.keys(typographyStyles).length
    }
  };
};

// ============================================================================
// 🚀 DEFAULT EXPORT
// ============================================================================

/**
 * Export par défaut pour usage simple
 * import tokens from '@/design-system/tokens'
 */
export default DESIGN_TOKENS;