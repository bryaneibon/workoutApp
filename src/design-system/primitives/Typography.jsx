// src/design-system/primitives/Typography.jsx
// 🔤 WA-DESIGN-001.2: Typography Primitives - V0's Athletic Text System
// Référence Clean Code: "Use meaningful names"
// Référence Pragmatic Programmer: "Don't repeat yourself"

/**
 * 🎯 TYPOGRAPHY COMPONENTS VECT - EXTRACTED FROM V0's ATHLETIC SYSTEM
 * 
 * V0's GENIUS: Athletic typography with semantic components
 * font-timer-digits, font-exercise-header, font-body-athletic, font-ui-label
 * 
 * Clean Code: "Make meaningful distinctions"
 */

import React from 'react';
import PropTypes from 'prop-types';
import { typographyStyles, responsiveTypography, warmColors } from '../tokens/index.js';

// ============================================================================
// 🔤 TYPOGRAPHY COMPONENTS (V0's Athletic System)
// ============================================================================

/**
 * Timer Digits - V0's font-timer-digits extracted
 * Leur signature: text-7xl + font-timer-digits + text-warm-primary
 */
export const TimerDigits = ({
  children,
  size = 'default',
  color = 'primary',
  className = '',
  responsive = true,
  ...props
}) => {
  // V0's responsive sizing
  const responsiveClasses = responsive ? {
    default: 'text-5xl sm:text-6xl md:text-7xl',  // V0's responsive approach
    large: 'text-6xl sm:text-7xl md:text-8xl',
    small: 'text-4xl sm:text-5xl md:text-6xl'
  } : {
    default: 'text-7xl',  // V0's desktop size
    large: 'text-8xl',
    small: 'text-6xl'
  };
  
  // V0's color system
  const colorClasses = {
    primary: 'text-warm-primary',      // V0's text-warm-primary
    workout: 'text-work',              // workout colors
    rest: 'text-rest',
    success: 'text-emerald-600',
    danger: 'text-red-600'
  };
  
  const finalClasses = [
    'font-timer-digits',               // V0's class
    responsiveClasses[size],
    colorClasses[color] || colorClasses.primary,
    'font-extrabold',                  // V0's weight
    'leading-none',                    // V0's line-height: 1
    'tracking-tight',                  // V0's letter-spacing: -0.01em
    'tabular-nums',                    // V0's font-feature-settings
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={finalClasses}
      style={typographyStyles.timer_digits}
      {...props}
    >
      {children}
    </div>
  );
};

// PropTypes for TimerDigits
TimerDigits.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  color: PropTypes.oneOf(['primary', 'workout', 'rest', 'success', 'danger']),
  className: PropTypes.string,
  responsive: PropTypes.bool
};

/**
 * Exercise Header - V0's font-exercise-header extracted
 * Leur pattern: text-3xl + font-exercise-header + text-warm-primary
 */
export const ExerciseHeader = ({
  children,
  level = 1,
  size = 'default',
  color = 'primary',
  uppercase = true,
  className = '',
  ...props
}) => {
  // V0's heading levels
  const HeadingTag = `h${Math.min(6, Math.max(1, level))}`;
  
  // V0's size mapping
  const sizeClasses = {
    small: 'text-xl sm:text-2xl',
    default: 'text-2xl sm:text-3xl',     // V0's text-3xl
    large: 'text-3xl sm:text-4xl'
  };
  
  // V0's color system
  const colorClasses = {
    primary: 'text-warm-primary',
    secondary: 'text-warm-secondary',
    workout: 'text-work',
    white: 'text-white'
  };
  
  const finalClasses = [
    'font-exercise-header',            // V0's class
    sizeClasses[size],
    colorClasses[color] || colorClasses.primary,
    'font-bold',                       // V0's weight
    'leading-tight',                   // V0's line-height
    'tracking-tight',                  // V0's letter-spacing
    uppercase && 'uppercase',          // V0's pattern
    className
  ].filter(Boolean).join(' ');

  return (
    <HeadingTag 
      className={finalClasses}
      style={typographyStyles.exercise_header}
      {...props}
    >
      {children}
    </HeadingTag>
  );
};

// PropTypes for ExerciseHeader
ExerciseHeader.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'workout', 'white']),
  uppercase: PropTypes.bool,
  className: PropTypes.string
};

/**
 * Body Athletic - V0's font-body-athletic extracted
 * Leur pattern: text-lg + font-body-athletic + text-warm-primary
 */
export const BodyAthletic = ({
  children,
  size = 'default',
  color = 'primary',
  weight = 'semibold',
  className = '',
  as = 'p',
  ...props
}) => {
  // V0's size mapping
  const sizeClasses = {
    small: 'text-sm',
    default: 'text-lg',               // V0's choice
    large: 'text-xl'
  };
  
  // V0's color system
  const colorClasses = {
    primary: 'text-warm-primary',
    secondary: 'text-warm-secondary',
    muted: 'text-warm-muted',
    white: 'text-white'
  };
  
  // Weight options
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',        // V0's default
    bold: 'font-bold'
  };
  
  const Component = as;
  
  const finalClasses = [
    'font-body-athletic',             // V0's class
    sizeClasses[size],
    colorClasses[color] || colorClasses.primary,
    weightClasses[weight],
    'leading-relaxed',                // V0's line-height: 1.4
    'tracking-tight',                 // V0's letter-spacing
    className
  ].filter(Boolean).join(' ');

  return (
    <Component 
      className={finalClasses}
      style={typographyStyles.body_athletic}
      {...props}
    >
      {children}
    </Component>
  );
};

// PropTypes for BodyAthletic
BodyAthletic.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'muted', 'white']),
  weight: PropTypes.oneOf(['normal', 'medium', 'semibold', 'bold']),
  className: PropTypes.string,
  as: PropTypes.oneOf(['p', 'span', 'div', 'article', 'section'])
};

/**
 * UI Label - V0's font-ui-label extracted
 * Leur pattern: text-xs + font-ui-label + text-warm-muted + uppercase
 */
export const UILabel = ({
  children,
  size = 'default',
  color = 'muted',
  uppercase = true,
  className = '',
  as = 'span',
  ...props
}) => {
  // Size options
  const sizeClasses = {
    small: 'text-xs',                 // V0's choice
    default: 'text-sm',
    large: 'text-base'
  };
  
  // V0's color system for labels
  const colorClasses = {
    primary: 'text-warm-primary',
    secondary: 'text-warm-secondary',
    muted: 'text-warm-muted',         // V0's default
    white: 'text-white'
  };
  
  const Component = as;
  
  const finalClasses = [
    'font-ui-label',                  // V0's class
    sizeClasses[size],
    colorClasses[color],
    'font-semibold',                  // V0's weight
    'leading-tight',                  // V0's line-height: 1.2
    'tracking-tight',                 // V0's letter-spacing
    uppercase && 'uppercase',         // V0's text-transform
    className
  ].filter(Boolean).join(' ');

  return (
    <Component 
      className={finalClasses}
      style={typographyStyles.ui_label}
      {...props}
    >
      {children}
    </Component>
  );
};

// PropTypes for UILabel
UILabel.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'muted', 'white']),
  uppercase: PropTypes.bool,
  className: PropTypes.string,
  as: PropTypes.oneOf(['span', 'div', 'label', 'p'])
};

/**
 * Stats Number - V0's font-stats-number extracted
 * Leur pattern: text-xl + font-stats-number + tabular nums
 */
export const StatsNumber = ({
  children,
  size = 'default',
  color = 'primary',
  prefix,
  suffix,
  className = '',
  ...props
}) => {
  // Size options
  const sizeClasses = {
    small: 'text-lg',
    default: 'text-xl',               // V0's choice
    large: 'text-2xl',
    xlarge: 'text-3xl'
  };
  
  // V0's color system for stats
  const colorClasses = {
    primary: 'text-warm-primary',
    workout: 'text-work',
    success: 'text-emerald-600',
    warning: 'text-amber-500',
    danger: 'text-red-600'
  };
  
  const finalClasses = [
    'font-stats-number',              // V0's class
    sizeClasses[size],
    colorClasses[color] || colorClasses.primary,
    'font-bold',                      // V0's weight
    'leading-none',                   // V0's line-height: 1
    'tracking-tight',                 // V0's letter-spacing
    'tabular-nums',                   // V0's font-feature-settings
    className
  ].filter(Boolean).join(' ');

  return (
    <span 
      className={finalClasses}
      style={typographyStyles.stats_number}
      {...props}
    >
      {prefix && <span className="stats-prefix">{prefix}</span>}
      <span className="stats-value">{children}</span>
      {suffix && <span className="stats-suffix">{suffix}</span>}
    </span>
  );
};

// PropTypes for StatsNumber
StatsNumber.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.oneOf(['small', 'default', 'large', 'xlarge']),
  color: PropTypes.oneOf(['primary', 'workout', 'success', 'warning', 'danger']),
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  className: PropTypes.string
};

// ============================================================================
// 🎨 GRADIENT TEXT (V0's gradient-text System)
// ============================================================================

/**
 * Gradient Text - V0's gradient-text extracted
 * Leur pattern: bg-gradient-to-r + bg-clip-text + text-transparent
 */
export const GradientText = ({
  children,
  gradient = 'workout',
  size = 'default',
  weight = 'bold',
  className = '',
  as = 'span',
  ...props
}) => {
  // V0's gradient options
  const gradientClasses = {
    workout: 'bg-gradient-to-r from-orange-500 to-red-600',  // V0's signature
    primary: 'bg-gradient-to-r from-blue-600 to-blue-800',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-700',
    warm: 'bg-gradient-to-r from-amber-500 to-orange-600'
  };
  
  // Size mapping
  const sizeClasses = {
    small: 'text-sm',
    default: 'text-lg',
    large: 'text-xl',
    xlarge: 'text-2xl'
  };
  
  // Weight mapping
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',                // V0's default
    extrabold: 'font-extrabold'
  };
  
  const Component = as;
  
  const finalClasses = [
    'gradient-text',                  // V0's class
    gradientClasses[gradient] || gradientClasses.workout,
    'bg-clip-text text-transparent',  // V0's technique
    sizeClasses[size],
    weightClasses[weight],
    'leading-tight',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component 
      className={finalClasses}
      {...props}
    >
      {children}
    </Component>
  );
};

// PropTypes for GradientText
GradientText.propTypes = {
  children: PropTypes.node.isRequired,
  gradient: PropTypes.oneOf(['workout', 'primary', 'success', 'warm']),
  size: PropTypes.oneOf(['small', 'default', 'large', 'xlarge']),
  weight: PropTypes.oneOf(['normal', 'medium', 'semibold', 'bold', 'extrabold']),
  className: PropTypes.string,
  as: PropTypes.oneOf(['span', 'div', 'h1', 'h2', 'h3', 'p'])
};

// ============================================================================
// 🏷️ BADGE COMPONENT (V0's Badge Pattern)
// ============================================================================

/**
 * Badge - V0's badge/pill components
 * Leur usage: status indicators, tags, etc.
 */
export const Badge = ({
  children,
  variant = 'primary',
  size = 'default',
  className = '',
  ...props
}) => {
  // V0's badge variants
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800 border-blue-200',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    workout: 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-orange-300'
  };
  
  // Size options
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    default: 'px-3 py-1 text-sm',     // V0's pattern
    large: 'px-4 py-2 text-base'
  };
  
  const finalClasses = [
    'badge',
    'inline-flex items-center',
    'rounded-full',                   // V0's pill shape
    'border',
    'font-ui-label font-semibold',    // V0's typography
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <span 
      className={finalClasses}
      {...props}
    >
      {children}
    </span>
  );
};

// PropTypes for Badge
Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'success', 'warning', 'danger', 'workout']),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  className: PropTypes.string
};

// ============================================================================
// 🚀 UTILITY FUNCTIONS (Typography Helpers)
// ============================================================================

/**
 * Helper pour créer des classes typographiques responsive
 * @param {Object} config - Configuration responsive
 * @returns {string} Classes CSS responsive
 */
export const createResponsiveTypography = ({ mobile, tablet, desktop }) => {
  const classes = [];
  
  if (mobile) classes.push(mobile);
  if (tablet) classes.push(`sm:${tablet}`);
  if (desktop) classes.push(`md:${desktop}`);
  
  return classes.join(' ');
};

/**
 * Helper pour obtenir la configuration typographique V0
 * @param {string} component - Nom du composant
 * @returns {Object} Configuration V0
 */
export const getV0TypographyConfig = (component) => {
  const configs = {
    timer: {
      className: 'font-timer-digits text-7xl text-warm-primary',
      responsive: 'text-5xl sm:text-6xl md:text-7xl'
    },
    header: {
      className: 'font-exercise-header text-3xl text-warm-primary',
      responsive: 'text-2xl sm:text-3xl'
    },
    body: {
      className: 'font-body-athletic text-lg text-warm-primary',
      responsive: 'text-base sm:text-lg'
    },
    label: {
      className: 'font-ui-label text-xs text-warm-muted uppercase',
      responsive: 'text-xs'
    }
  };
  
  return configs[component] || null;
};