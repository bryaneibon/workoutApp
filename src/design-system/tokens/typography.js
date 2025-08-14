// src/design-system/tokens/typography.js
// 🔤 WA-DESIGN-001.1: Design Tokens - Typography System  
// Référence Clean Code: "Use meaningful names"
// Référence Pragmatic Programmer: "Make it easy to reuse"

/**
 * 🎯 SYSTÈME TYPOGRAPHIQUE VECT - EXTRAIT DE V0's GENIUS
 * 
 * V0's BREAKTHROUGH: Athletic typography with semantic naming
 * Leur découverte: font-timer-digits, font-exercise-header, font-body-athletic
 * 
 * Clean Code: "Use intention-revealing names"
 */

// ============================================================================
// 🎨 FONT FAMILIES (V0's Athletic System)
// ============================================================================

/**
 * V0's brilliant font stack - athletic and strong
 * Leur choix: Inter + Outfit + Manrope pour différents contextes
 * @type {Object}
 */
export const FONT_FAMILIES = {
  // V0's primary stack (Inter for body)
  primary: [
    'var(--font-inter)',
    'Inter', 
    'system-ui', 
    'sans-serif'
  ].join(', '),
  
  // V0's display fonts (Outfit for numbers/headers)  
  display: [
    'var(--font-outfit)',
    'Outfit',
    'var(--font-manrope)', 
    'Manrope',
    'system-ui',
    'sans-serif'
  ].join(', '),
  
  // V0 also imported Geist - backup system
  system: [
    'var(--font-sans)',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'sans-serif'
  ].join(', '),
  
  // Monospace for timers/code (V0 pattern)
  mono: [
    'var(--font-mono)',
    'JetBrains Mono',
    'SF Mono',
    'Monaco',
    'Consolas',
    'monospace'
  ].join(', ')
};

// ============================================================================
// ⚖️ FONT WEIGHTS (V0's Athletic Hierarchy) 
// ============================================================================

/**
 * V0's weight system - emphasizing bold and strong
 * Leur insight: fitness apps need confident typography
 * @type {Object}
 */
export const FONT_WEIGHTS = {
  light: 300,
  normal: 400,
  medium: 500,      // V0's base weight
  semibold: 600,    // V0's font-body-athletic
  bold: 700,        // V0's font-exercise-header
  extrabold: 800,   // V0's font-timer-digits
  black: 900
};

// ============================================================================
// 📏 FONT SIZES (V0's Scale + Mobile Optimization)
// ============================================================================

/**
 * Échelle typographique harmonieuse
 * V0 utilisait text-7xl pour timer - on systématise tout
 * @type {Object}
 */
export const FONT_SIZES = {
  // Micro text
  xs: {
    size: '0.75rem',    // 12px
    lineHeight: '1rem'  // 16px
  },
  sm: {
    size: '0.875rem',   // 14px  
    lineHeight: '1.25rem' // 20px
  },
  
  // Body text (V0's standard)
  base: {
    size: '1rem',       // 16px
    lineHeight: '1.5rem' // 24px
  },
  lg: {
    size: '1.125rem',   // 18px
    lineHeight: '1.75rem' // 28px
  },
  xl: {
    size: '1.25rem',    // 20px - V0's text-xl
    lineHeight: '1.75rem' // 28px
  },
  
  // Headers
  '2xl': {
    size: '1.5rem',     // 24px - V0's text-2xl
    lineHeight: '2rem'  // 32px
  },
  '3xl': {
    size: '1.875rem',   // 30px - V0's text-3xl
    lineHeight: '2.25rem' // 36px
  },
  '4xl': {
    size: '2.25rem',    // 36px - V0's text-4xl
    lineHeight: '2.5rem' // 40px
  },
  
  // Hero sizes (V0's timer text)
  '5xl': {
    size: '3rem',       // 48px
    lineHeight: '1'     // Tight for impact
  },
  '6xl': {
    size: '3.75rem',    // 60px
    lineHeight: '1'
  },
  '7xl': {
    size: '4.5rem',     // 72px - V0's timer size!
    lineHeight: '1'
  },
  '8xl': {
    size: '6rem',       // 96px
    lineHeight: '1'
  },
  '9xl': {
    size: '8rem',       // 128px
    lineHeight: '1'
  }
};

// ============================================================================
// 🎯 SEMANTIC TYPOGRAPHY (V0's Athletic Classes)
// ============================================================================

/**
 * V0's GENIUS: Semantic typography classes for fitness context
 * Leur système: font-timer-digits, font-exercise-header, etc.
 * @type {Object}
 */
export const TYPOGRAPHY_STYLES = {
  // V0's timer system - extrabold and powerful
  timer_digits: {
    fontFamily: FONT_FAMILIES.display,
    fontWeight: FONT_WEIGHTS.extrabold,  // 800
    fontSize: FONT_SIZES['7xl'].size,    // V0's choice
    lineHeight: FONT_SIZES['7xl'].lineHeight,
    letterSpacing: '-0.01em',            // V0's tight spacing
    fontFeatureSettings: '"tnum", "zero"' // Tabular numbers
  },
  
  // V0's exercise headers - bold and confident  
  exercise_header: {
    fontFamily: FONT_FAMILIES.primary,
    fontWeight: FONT_WEIGHTS.bold,       // 700
    fontSize: FONT_SIZES['3xl'].size,    // V0's pattern
    lineHeight: FONT_SIZES['3xl'].lineHeight,
    letterSpacing: '-0.01em'             // V0's approach
  },
  
  // V0's body athletic - semibold for readability
  body_athletic: {
    fontFamily: FONT_FAMILIES.primary,
    fontWeight: FONT_WEIGHTS.semibold,   // 600
    fontSize: FONT_SIZES.lg.size,        // V0's text-lg
    lineHeight: FONT_SIZES.lg.lineHeight,
    letterSpacing: '-0.01em'
  },
  
  // V0's UI labels - uppercase and strong
  ui_label: {
    fontFamily: FONT_FAMILIES.primary,
    fontWeight: FONT_WEIGHTS.semibold,   // 600
    fontSize: FONT_SIZES.xs.size,        // V0's text-xs
    lineHeight: FONT_SIZES.xs.lineHeight,
    letterSpacing: '-0.01em',
    textTransform: 'uppercase'           // V0's pattern
  },
  
  // V0's stats numbers - bold display
  stats_number: {
    fontFamily: FONT_FAMILIES.display,
    fontWeight: FONT_WEIGHTS.bold,       // 700
    fontSize: FONT_SIZES.xl.size,        // V0's text-xl
    lineHeight: FONT_SIZES.xl.lineHeight,
    letterSpacing: '-0.01em',
    fontFeatureSettings: '"tnum", "zero"'
  },
  
  // Display text for hero sections
  display_large: {
    fontFamily: FONT_FAMILIES.display,
    fontWeight: FONT_WEIGHTS.extrabold,
    fontSize: FONT_SIZES['4xl'].size,
    lineHeight: FONT_SIZES['4xl'].lineHeight,
    letterSpacing: '-0.02em'
  },
  
  // Button text
  button: {
    fontFamily: FONT_FAMILIES.primary,
    fontWeight: FONT_WEIGHTS.semibold,
    fontSize: FONT_SIZES.base.size,
    lineHeight: FONT_SIZES.base.lineHeight,
    letterSpacing: '-0.01em'
  },
  
  // Caption text
  caption: {
    fontFamily: FONT_FAMILIES.primary,
    fontWeight: FONT_WEIGHTS.medium,
    fontSize: FONT_SIZES.sm.size,
    lineHeight: FONT_SIZES.sm.lineHeight,
    letterSpacing: '0em'
  }
};

// ============================================================================
// 📱 RESPONSIVE TYPOGRAPHY (V0 + Mobile First)
// ============================================================================

/**
 * Typography responsive par composant
 * V0 manquait de responsive text - on l'améliore
 * @type {Object}
 */
export const RESPONSIVE_TYPOGRAPHY = {
  // Timer responsive (V0's central element)
  timer_digits: {
    mobile: {
      fontSize: FONT_SIZES['5xl'].size,    // 48px mobile
      lineHeight: FONT_SIZES['5xl'].lineHeight
    },
    tablet: {
      fontSize: FONT_SIZES['6xl'].size,    // 60px tablet
      lineHeight: FONT_SIZES['6xl'].lineHeight
    },
    desktop: {
      fontSize: FONT_SIZES['7xl'].size,    // 72px (V0's choice)
      lineHeight: FONT_SIZES['7xl'].lineHeight
    }
  },
  
  // Exercise headers responsive
  exercise_header: {
    mobile: {
      fontSize: FONT_SIZES.xl.size,        // 20px mobile
      lineHeight: FONT_SIZES.xl.lineHeight
    },
    tablet: {
      fontSize: FONT_SIZES['2xl'].size,    // 24px tablet
      lineHeight: FONT_SIZES['2xl'].lineHeight
    },
    desktop: {
      fontSize: FONT_SIZES['3xl'].size,    // 30px (V0's size)
      lineHeight: FONT_SIZES['3xl'].lineHeight
    }
  },
  
  // Display text responsive
  display_large: {
    mobile: {
      fontSize: FONT_SIZES['2xl'].size,
      lineHeight: FONT_SIZES['2xl'].lineHeight
    },
    tablet: {
      fontSize: FONT_SIZES['3xl'].size,
      lineHeight: FONT_SIZES['3xl'].lineHeight
    },
    desktop: {
      fontSize: FONT_SIZES['4xl'].size,
      lineHeight: FONT_SIZES['4xl'].lineHeight
    }
  }
};

// ============================================================================
// 🎨 LETTER SPACING SYSTEM (V0's Tight Approach)
// ============================================================================

/**
 * V0 utilisait beaucoup letter-spacing: -0.01em pour un look moderne
 * @type {Object}
 */
export const LETTER_SPACING = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
  
  // V0's semantic spacing
  display: '-0.02em',      // V0's display text
  heading: '-0.01em',      // V0's headers
  body: '-0.01em',         // V0's body text
  label: '-0.01em'         // V0's UI labels
};

// ============================================================================
// 📐 LINE HEIGHT SYSTEM (V0's Hierarchy)
// ============================================================================

/**
 * Système de line-height cohérent
 * V0 utilisait line-height: 1 pour les gros textes
 * @type {Object}
 */
export const LINE_HEIGHTS = {
  none: '1',              // V0's timer text
  tight: '1.25',          // Dense text
  snug: '1.375',          
  normal: '1.5',          // V0's body text
  relaxed: '1.625',
  loose: '2',
  
  // Semantic line heights
  display: '1',           // Hero text
  heading: '1.2',         // Headers
  body: '1.4',            // V0's body-athletic
  caption: '1.5'          // Small text
};

// ============================================================================
// 🚀 FONT LOADING OPTIMIZATION (Performance)
// ============================================================================

/**
 * Configuration pour le chargement des polices
 * Performance optimization inspired by V0's font loading
 * @type {Object}
 */
export const FONT_LOADING = {
  // Font display strategy
  display: 'swap',          // V0's approach
  
  // Preload critical fonts
  preload: [
    'var(--font-inter)',
    'var(--font-outfit)'
  ],
  
  // Font weights to load
  weights: {
    inter: ['500', '600', '700'],    // V0's loaded weights
    outfit: ['700', '800'],          // V0's pattern
    manrope: ['700', '800']          // V0's pattern
  },
  
  // Subsets
  subsets: ['latin']               // V0's choice
};

// ============================================================================
// 🚀 EXPORT GROUPÉ (Clean Architecture)
// ============================================================================

/**
 * Export principal pour utilisation dans l'app
 * Pragmatic Programmer: "Don't repeat yourself"
 */
export const DESIGN_TOKENS_TYPOGRAPHY = {
  families: FONT_FAMILIES,
  weights: FONT_WEIGHTS,
  sizes: FONT_SIZES,
  styles: TYPOGRAPHY_STYLES,
  responsive: RESPONSIVE_TYPOGRAPHY,
  letterSpacing: LETTER_SPACING,
  lineHeights: LINE_HEIGHTS,
  loading: FONT_LOADING
};

// ============================================================================
// 🛠️ UTILITY FUNCTIONS (Helper Methods)
// ============================================================================

/**
 * Génère les classes CSS pour un style typographique
 * @param {Object} style - Style typographique
 * @returns {Object} Classes CSS
 */
export const generateTypographyCSS = (style) => {
  return {
    fontFamily: style.fontFamily,
    fontWeight: style.fontWeight,
    fontSize: style.fontSize,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing || LETTER_SPACING.normal,
    ...(style.textTransform && { textTransform: style.textTransform }),
    ...(style.fontFeatureSettings && { fontFeatureSettings: style.fontFeatureSettings })
  };
};

/**
 * Helper pour obtenir typography responsive
 * @param {string} component - Type de composant
 * @returns {Object} Styles responsive
 */
export const getResponsiveTypography = (component) => {
  const typography = RESPONSIVE_TYPOGRAPHY[component];
  if (!typography) return null;
  
  return {
    mobile: generateTypographyCSS({ ...TYPOGRAPHY_STYLES[component], ...typography.mobile }),
    tablet: generateTypographyCSS({ ...TYPOGRAPHY_STYLES[component], ...typography.tablet }),
    desktop: generateTypographyCSS({ ...TYPOGRAPHY_STYLES[component], ...typography.desktop })
  };
};

/**
 * Convertit une taille de police en rem
 * @param {string} fontSize - Taille en px ou rem
 * @returns {string} Taille en rem
 */
export const fontSizeToRem = (fontSize) => {
  if (fontSize.includes('rem')) return fontSize;
  const pxValue = parseFloat(fontSize);
  return `${pxValue / 16}rem`;
};

/**
 * Helper pour créer une classe font custom
 * @param {string} name - Nom de la classe
 * @param {Object} style - Style typographique
 * @returns {string} Classe CSS
 */
export const createFontClass = (name, style) => {
  const css = generateTypographyCSS(style);
  return `.font-${name} { ${Object.entries(css).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`).join(' ')} }`;
};