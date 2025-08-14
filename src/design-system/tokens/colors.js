// src/design-system/tokens/colors.js
// 🎨 WA-DESIGN-001.1: Design Tokens - Colors System
// Référence Clean Code: "Use meaningful names"
// Référence Pragmatic Programmer: "Don't repeat yourself"

/**
 * 🎯 SYSTÈME DE COULEURS VECT - EXTRAIT DE V0
 * 
 * BRILLANTE DÉCOUVERTE de V0 : Warm gradient system + Glass morphism
 * Leur approche "fitness-first" avec orange→red pour l'action
 * 
 * Clean Code: "Constants should be meaningfully named"
 */

// ============================================================================
// 🌈 PALETTE PRINCIPALE VECT (Inspirée V0)
// ============================================================================

/**
 * Couleurs de base warm theme - V0's genius approach
 * @type {Object}
 */
export const WARM_COLORS = {
  // Texte hierarchy (V0's warm-primary system)
  primary: '#1e293b',        // text-warm-primary
  secondary: '#475569',      // text-warm-secondary  
  muted: '#64748b',          // text-warm-muted
  
  // Backgrounds
  surface: '#ffffff',
  background: '#fefefe',
  background_alt: '#fdfcfa', // V0's warm gradient end
  
  // Borders & dividers
  border: '#e2e8f0',
  border_light: 'rgba(255, 255, 255, 0.4)', // Glass border
  
  // States
  success: '#10b981',
  warning: '#f59e0b', 
  error: '#dc2626',
  info: '#3b82f6'
};

/**
 * Couleurs d'action workout - V0's signature
 * @type {Object}
 */
export const WORKOUT_COLORS = {
  // V0's brilliant workout→rest system
  work_primary: '#2563eb',     // Bleu intense pour WORK
  work_secondary: '#1e40af',
  
  rest_primary: '#dc2626',     // Rouge pour REST
  rest_secondary: '#b91c1c',
  
  // Phases (V0's phase system)
  preparation: '#f59e0b',      // Orange préparation
  active: '#10b981',           // Vert actif
  complete: '#10b981',         // Vert completion
  
  // Intensité (V0's heart rate zones)
  zone_1: '#10b981',  // Recovery
  zone_2: '#3b82f6',  // Aerobic  
  zone_3: '#f59e0b',  // Tempo
  zone_4: '#ef4444',  // Threshold
  zone_5: '#8b5cf6'   // VO2 Max
};

// ============================================================================
// 🎨 GRADIENTS SYSTÈME (V0's Premium System)
// ============================================================================

/**
 * Gradients premium extraits de V0
 * Leur approche: consistency + visual hierarchy
 * @type {Object}
 */
export const GRADIENTS = {
  // V0's signature workout gradient (orange→red)
  workout_active: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
  
  // V0's premium button gradients
  primary_button: 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)',
  primary_button_hover: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
  primary_button_active: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)',
  
  // V0's secondary button system
  secondary_button: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
  secondary_button_hover: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
  secondary_button_active: 'linear-gradient(135deg, #111827 0%, #0f172a 100%)',
  
  // V0's background gradients
  warm_background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #fdfcfa 100%)',
  premium_background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #000000 100%)',
  
  // V0's progress system
  progress_ring: 'linear-gradient(135deg, #3b82f6 0%, #f97316 100%)',
  progress_bar: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)'
};

// ============================================================================
// 🪟 GLASS MORPHISM COLORS (V0's Masterpiece)
// ============================================================================

/**
 * V0's brilliant glassmorphism system
 * Their discovery: Different opacity for light/dark themes
 * @type {Object}
 */
export const GLASS_COLORS = {
  // Light theme glass (V0's glass-card-light)
  light: {
    background: 'rgba(255, 255, 255, 0.85)',
    border: 'rgba(255, 255, 255, 0.4)',
    backdrop_blur: '24px'
  },
  
  // Dark theme glass (V0's glass-card)
  dark: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)',
    backdrop_blur: '16px'
  },
  
  // V0's elevated cards
  elevated: {
    background: 'rgba(255, 255, 255, 0.95)',
    border: 'rgba(255, 255, 255, 0.6)',
    backdrop_blur: '20px'
  }
};

// ============================================================================
// 🎯 SEMANTIC COLORS (V0 + Clean Architecture)
// ============================================================================

/**
 * Couleurs sémantiques pour composants
 * Clean Code: "Make meaningful distinctions"
 * @type {Object}
 */
export const SEMANTIC_COLORS = {
  // Timer states (inspired by V0's phase system)
  timer: {
    work: WORKOUT_COLORS.work_primary,
    rest: WORKOUT_COLORS.rest_primary,
    preparation: WORKOUT_COLORS.preparation,
    complete: WORKOUT_COLORS.complete
  },
  
  // Exercise categories
  exercise: {
    cardio: '#ef4444',        // Rouge cardio
    strength: '#3b82f6',      // Bleu strength  
    flexibility: '#10b981',   // Vert flexibility
    balance: '#8b5cf6'        // Violet balance
  },
  
  // Progress indicators
  progress: {
    low: '#10b981',           // 0-33%
    medium: '#f59e0b',        // 34-66%
    high: '#ef4444'           // 67-100%
  }
};

// ============================================================================
// 🔥 OPACITY & SHADOWS (V0's Depth System)
// ============================================================================

/**
 * V0's opacity system for depth
 * @type {Object}
 */
export const OPACITY = {
  // Glass levels
  glass_light: 0.85,
  glass_medium: 0.75,
  glass_dark: 0.05,
  
  // Overlay levels  
  overlay_light: 0.1,
  overlay_medium: 0.3,
  overlay_dark: 0.6,
  
  // Hover states
  hover: 0.8,
  active: 0.9,
  disabled: 0.4
};

/**
 * V0's shadow system - premium depth
 * @type {Object}
 */
export const SHADOWS = {
  // V0's glass shadows
  glass_light: '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
  glass_elevated: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
  
  // V0's button shadows
  button_default: '0 6px 20px rgba(30, 41, 59, 0.25), 0 2px 8px rgba(30, 41, 59, 0.15)',
  button_hover: '0 12px 32px rgba(30, 41, 59, 0.35), 0 4px 16px rgba(30, 41, 59, 0.2)',
  
  // V0's glow effects
  workout_glow: '0 0 20px rgba(249, 115, 22, 0.3)',
  timer_glow: '0 0 25px rgba(249, 115, 22, 0.4)'
};

// ============================================================================
// 🚀 EXPORT GROUPÉ (Clean Architecture)
// ============================================================================

/**
 * Export principal pour utilisation dans l'app
 * Pragmatic Programmer: "Don't repeat yourself"
 */
export const DESIGN_TOKENS_COLORS = {
  warm: WARM_COLORS,
  workout: WORKOUT_COLORS,
  gradients: GRADIENTS,
  glass: GLASS_COLORS,
  semantic: SEMANTIC_COLORS,
  opacity: OPACITY,
  shadows: SHADOWS
};

/**
 * Helper pour générer des classes CSS Tailwind
 * Clean Code: "Do one thing well"
 */
export const generateColorClasses = (prefix, colorObject) => {
  return Object.entries(colorObject).reduce((acc, [key, value]) => {
    acc[`${prefix}-${key}`] = value;
    return acc;
  }, {});
};

// ============================================================================
// 🎯 VALIDATION & TYPES (TypeScript ready)
// ============================================================================

/**
 * Validation des couleurs (future TypeScript migration)
 * @param {string} color - Couleur à valider
 * @returns {boolean}
 */
export const isValidColor = (color) => {
  return /^(#[0-9A-F]{6}|rgba?\([^)]+\)|linear-gradient\([^)]+\))$/i.test(color);
};

/**
 * Helper pour obtenir une couleur par chemin
 * @param {string} path - Chemin vers la couleur (ex: "warm.primary")
 * @returns {string|null}
 */
export const getColorByPath = (path) => {
  const keys = path.split('.');
  let current = DESIGN_TOKENS_COLORS;
  
  for (const key of keys) {
    current = current[key];
    if (!current) return null;
  }
  
  return current;
};