// src/design-system/tokens/spacing.js
// 📏 WA-DESIGN-001.1: Design Tokens - Spacing & Sizing System
// Référence Clean Code: "Use meaningful names"  
// Référence Pragmatic Programmer: "Make it easy to reuse"

/**
 * 📐 SYSTÈME D'ESPACEMENT VECT - EXTRAIT & AMÉLIORÉ DE V0
 * 
 * V0's INSIGHT: Consistent spacing creates visual harmony
 * Leur approche: 8px base unit + semantic naming
 * 
 * Clean Code: "Use intention-revealing names"
 */

// ============================================================================
// 📏 BASE SPACING SYSTEM (V0 + Design System Best Practices)
// ============================================================================

/**
 * Unité de base pour l'espacement (8px system)
 * Standard industry + V0's consistent approach
 * @type {number}
 */
export const BASE_UNIT = 8; // 8px base unit

/**
 * Échelle d'espacement harmonieuse
 * V0 utilisait beaucoup de px-6, py-4, etc. - on systématise
 * @type {Object}
 */
export const SPACING_SCALE = {
  // Micro spacing
  xs: BASE_UNIT * 0.5,      // 4px
  sm: BASE_UNIT * 1,        // 8px
  md: BASE_UNIT * 1.5,      // 12px
  lg: BASE_UNIT * 2,        // 16px
  xl: BASE_UNIT * 3,        // 24px
  
  // Standard spacing (V0's most used)
  '2xl': BASE_UNIT * 4,     // 32px - V0's p-6 = 24px, on améliore
  '3xl': BASE_UNIT * 6,     // 48px
  '4xl': BASE_UNIT * 8,     // 64px
  '5xl': BASE_UNIT * 12,    // 96px
  
  // Large spacing
  '6xl': BASE_UNIT * 16,    // 128px
  '7xl': BASE_UNIT * 20,    // 160px
  '8xl': BASE_UNIT * 24     // 192px
};

/**
 * Spacing sémantique pour composants spécifiques
 * Based on V0's usage patterns in their fitness timer
 * @type {Object}
 */
export const SEMANTIC_SPACING = {
  // Container padding (V0 used p-8 = 32px)
  container: {
    mobile: SPACING_SCALE.lg,     // 16px
    tablet: SPACING_SCALE.xl,     // 24px  
    desktop: SPACING_SCALE['2xl'] // 32px
  },
  
  // Card spacing (V0's card pattern)
  card: {
    padding: SPACING_SCALE.xl,    // 24px (V0's p-6)
    gap: SPACING_SCALE.xl,        // 24px between cards
    margin: SPACING_SCALE.lg      // 16px margin
  },
  
  // Timer component (V0's central timer)
  timer: {
    margin_bottom: SPACING_SCALE['3xl'], // 48px (V0's mb-12)
    ring_padding: SPACING_SCALE['2xl'],  // 32px around ring
    text_spacing: SPACING_SCALE.lg      // 16px between elements
  },
  
  // Button spacing (V0's button system)
  button: {
    padding_x: SPACING_SCALE['2xl'],     // 32px (V0's px-10)
    padding_y: SPACING_SCALE.lg,        // 16px (V0's py-4)
    gap: SPACING_SCALE.xl,              // 24px between buttons
    icon_gap: SPACING_SCALE.sm          // 8px icon spacing
  },
  
  // Grid/Layout spacing (V0's grid system)
  layout: {
    section_gap: SPACING_SCALE['3xl'],   // 48px between sections
    column_gap: SPACING_SCALE.xl,       // 24px between columns
    row_gap: SPACING_SCALE.xl           // 24px between rows
  }
};

// ============================================================================
// 📐 SIZING SYSTEM (V0's Component Sizes)
// ============================================================================

/**
 * Système de tailles pour composants
 * Extrait des patterns V0: leur timer était w-80 h-80 (320px)
 * @type {Object}
 */
export const COMPONENT_SIZES = {
  // Timer sizes (V0's signature circular timer)
  timer: {
    small: 200,      // 200px - mobile
    medium: 280,     // 280px - tablet  
    large: 320,      // 320px - V0's choice (w-80)
    xlarge: 400      // 400px - desktop large
  },
  
  // Button sizes (semantic sizing)
  button: {
    small: {
      height: 32,
      padding_x: SPACING_SCALE.lg,
      padding_y: SPACING_SCALE.sm
    },
    medium: {
      height: 40,
      padding_x: SPACING_SCALE.xl,
      padding_y: SPACING_SCALE.md
    },
    large: {
      height: 48,           // V0's large buttons
      padding_x: SPACING_SCALE['2xl'],
      padding_y: SPACING_SCALE.lg
    }
  },
  
  // Card sizes (V0's card system)
  card: {
    small: {
      min_width: 280,
      max_width: 320
    },
    medium: {
      min_width: 320,
      max_width: 480
    },
    large: {
      min_width: 480,
      max_width: 640       // V0's max-w-lg
    }
  },
  
  // Icon sizes (consistent with V0's w-5 h-5 pattern)
  icon: {
    xs: 12,    // w-3 h-3
    sm: 16,    // w-4 h-4  
    md: 20,    // w-5 h-5 (V0's standard)
    lg: 24,    // w-6 h-6
    xl: 32,    // w-8 h-8
    xxl: 48    // w-12 h-12
  }
};

// ============================================================================
// 🎯 BORDER RADIUS SYSTEM (V0's Rounded Approach)
// ============================================================================

/**
 * Système de border radius
 * V0 utilisait beaucoup rounded-2xl (16px) - on systématise
 * @type {Object}
 */
export const BORDER_RADIUS = {
  none: 0,
  xs: 2,         // rounded-sm
  sm: 4,         // rounded
  md: 6,         // rounded-md
  lg: 8,         // rounded-lg
  xl: 12,        // rounded-xl  
  '2xl': 16,     // rounded-2xl (V0's favorite)
  '3xl': 24,     // rounded-3xl
  full: 9999     // rounded-full
};

/**
 * Border radius sémantique par composant
 * Based on V0's usage patterns
 * @type {Object}
 */
export const SEMANTIC_RADIUS = {
  // V0's patterns
  button: BORDER_RADIUS.xl,        // 12px (rounded-xl)
  card: BORDER_RADIUS['2xl'],      // 16px (rounded-2xl) - V0's signature
  timer_ring: BORDER_RADIUS.full,  // Circle
  input: BORDER_RADIUS.lg,         // 8px
  badge: BORDER_RADIUS.full,       // Pill shape
  
  // Interactive elements
  hover_card: BORDER_RADIUS['2xl'],
  modal: BORDER_RADIUS['2xl'],
  tooltip: BORDER_RADIUS.lg
};

// ============================================================================
// 📱 RESPONSIVE BREAKPOINTS (V0 + Mobile First)
// ============================================================================

/**
 * Breakpoints responsive
 * V0 était plutôt desktop-first, on améliore avec mobile-first
 * @type {Object}
 */
export const BREAKPOINTS = {
  // Mobile first approach
  xs: 320,    // Small mobile
  sm: 640,    // Mobile landscape  
  md: 768,    // Tablet
  lg: 1024,   // Desktop
  xl: 1280,   // Large desktop
  '2xl': 1536 // XL desktop
};

/**
 * Spacing adaptatif par breakpoint
 * V0 manquait de responsive spacing - on l'ajoute
 * @type {Object}
 */
export const RESPONSIVE_SPACING = {
  container: {
    xs: SPACING_SCALE.lg,     // 16px mobile
    sm: SPACING_SCALE.xl,     // 24px tablet
    md: SPACING_SCALE['2xl'], // 32px (V0's p-8)
    lg: SPACING_SCALE['3xl']  // 48px large
  },
  
  timer: {
    xs: COMPONENT_SIZES.timer.small,   // 200px mobile
    sm: COMPONENT_SIZES.timer.medium,  // 280px tablet
    md: COMPONENT_SIZES.timer.large,   // 320px (V0's size)
    lg: COMPONENT_SIZES.timer.xlarge   // 400px desktop
  }
};

// ============================================================================
// 🚀 Z-INDEX SYSTEM (V0's Depth Management)
// ============================================================================

/**
 * Système z-index cohérent
 * V0 utilisait z-10 - on systématise tous les niveaux
 * @type {Object}
 */
export const Z_INDEX = {
  base: 0,
  raised: 1,       // Slightly above base
  floating: 10,    // V0's z-10 for main content
  overlay: 100,    // Modals, dropdowns
  modal: 1000,     // Important modals
  tooltip: 1100,   // Tooltips above modals
  notification: 1200  // System notifications
};

// ============================================================================
// 🚀 EXPORT GROUPÉ (Clean Architecture)
// ============================================================================

/**
 * Export principal pour utilisation dans l'app
 * Pragmatic Programmer: "Don't repeat yourself"
 */
export const DESIGN_TOKENS_SPACING = {
  base_unit: BASE_UNIT,
  scale: SPACING_SCALE,
  semantic: SEMANTIC_SPACING,
  sizes: COMPONENT_SIZES,
  radius: BORDER_RADIUS,
  semantic_radius: SEMANTIC_RADIUS,
  breakpoints: BREAKPOINTS,
  responsive: RESPONSIVE_SPACING,
  z_index: Z_INDEX
};

// ============================================================================
// 🛠️ UTILITY FUNCTIONS (Helper Methods)
// ============================================================================

/**
 * Convertit les valeurs de spacing en rem
 * @param {number} pxValue - Valeur en pixels
 * @returns {string} Valeur en rem
 */
export const pxToRem = (pxValue) => `${pxValue / 16}rem`;

/**
 * Génère les classes spacing pour Tailwind
 * @param {string} property - Type de propriété (p, m, pt, etc.)
 * @param {Object} scale - Échelle de valeurs
 * @returns {Object}
 */
export const generateSpacingClasses = (property, scale = SPACING_SCALE) => {
  return Object.entries(scale).reduce((acc, [key, value]) => {
    acc[`${property}-${key}`] = `${value}px`;
    return acc;
  }, {});
};

/**
 * Helper pour obtenir un spacing responsive
 * @param {string} component - Type de composant
 * @param {string} property - Propriété spacing
 * @returns {Object} Classes responsive
 */
export const getResponsiveSpacing = (component, property) => {
  const spacing = RESPONSIVE_SPACING[component];
  if (!spacing) return null;
  
  return Object.entries(spacing).reduce((acc, [breakpoint, value]) => {
    acc[breakpoint] = `${value}px`;
    return acc;
  }, {});
};