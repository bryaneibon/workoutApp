// src/design-system/primitives/Glass.jsx
// 💎 WA-DESIGN-001.2: Glass Primitives - Glassmorphism Components
// Référence Clean Code: "Do one thing and do it well"
// Référence Pragmatic Programmer: "Don't repeat yourself"

/**
 * 🎯 GLASS COMPONENTS VECT - EXTRACTED FROM V0's GLASSMORPHISM MASTERY
 * 
 * V0's GENIUS: Different glass effects for different contexts
 * glass-card-light, glass-card, elevated-stat-card
 * 
 * Clean Code: "Make meaningful distinctions"
 */

import React from 'react';
import PropTypes from 'prop-types';
import { glassColors, shadows, borderRadius } from '../tokens/index.js';

// ============================================================================
// 💎 GLASS VARIANTS (V0's Extracted System)
// ============================================================================

/**
 * V0's brilliant glass variants systematized
 * Leur découverte: opacity + backdrop-blur + borders + shadows
 * @type {Object}
 */
export const GLASS_VARIANTS = {
  // V0's glass-card-light - leur signature !
  light: {
    background: glassColors.light.background,      // rgba(255, 255, 255, 0.85)
    backdropFilter: `blur(${glassColors.light.backdrop_blur})`, // 24px
    border: `1px solid ${glassColors.light.border}`,            // rgba(255, 255, 255, 0.4)
    boxShadow: shadows.glass_light,
    className: 'glass-light'
  },
  
  // V0's glass-card - dark theme variant
  dark: {
    background: glassColors.dark.background,       // rgba(255, 255, 255, 0.05)
    backdropFilter: `blur(${glassColors.dark.backdrop_blur})`,  // 16px
    border: `1px solid ${glassColors.dark.border}`,             // rgba(255, 255, 255, 0.1)
    boxShadow: shadows.glass_light,
    className: 'glass-dark'
  },
  
  // V0's elevated-stat-card - leur masterpiece !
  elevated: {
    background: glassColors.elevated.background,   // rgba(255, 255, 255, 0.95)
    backdropFilter: `blur(${glassColors.elevated.backdrop_blur})`, // 20px
    border: `1px solid ${glassColors.elevated.border}`,            // rgba(255, 255, 255, 0.6)
    boxShadow: shadows.glass_elevated,
    transform: 'translateY(-2px)',                 // V0's floating effect
    className: 'glass-elevated'
  },
  
  // Subtle variant for backgrounds
  subtle: {
    background: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
    className: 'glass-subtle'
  },
  
  // Strong variant for modals
  strong: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(32px)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    boxShadow: shadows.glass_elevated,
    className: 'glass-strong'
  }
};

/**
 * Sizes pour les glass components (V0 patterns)
 * @type {Object}
 */
export const GLASS_SIZES = {
  sm: {
    padding: '12px',
    borderRadius: borderRadius.lg
  },
  md: {
    padding: '16px',
    borderRadius: borderRadius.xl
  },
  lg: {
    padding: '24px',                    // V0's p-6
    borderRadius: borderRadius['2xl']   // V0's rounded-2xl
  },
  xl: {
    padding: '32px',
    borderRadius: borderRadius['2xl']
  }
};

// ============================================================================
// 💎 BASE GLASS COMPONENT (V0's Foundation)
// ============================================================================

/**
 * Composant Glass de base
 * V0's insight: Glassmorphism needs consistent API
 * 
 * @param {Object} props - Properties
 * @param {'light'|'dark'|'elevated'|'subtle'|'strong'} props.variant - Glass variant
 * @param {'sm'|'md'|'lg'|'xl'} props.size - Component size
 * @param {boolean} props.floating - V0's floating animation
 * @param {boolean} props.interactive - Hover effects
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Content
 */
export const Glass = ({
  variant = 'light',
  size = 'lg',
  floating = false,
  interactive = false,
  className = '',
  children,
  style = {},
  ...props
}) => {
  // V0's glass configuration
  const glassConfig = GLASS_VARIANTS[variant] || GLASS_VARIANTS.light;
  const sizeConfig = GLASS_SIZES[size] || GLASS_SIZES.lg;
  
  // V0's animation classes
  const animationClasses = [
    floating && 'floating-element',           // V0's float animation
    interactive && 'spring-hover',            // V0's hover effect
    'transition-all duration-300 ease-out'   // Smooth transitions
  ].filter(Boolean).join(' ');
  
  // Combined styles (V0's approach)
  const combinedStyle = {
    background: glassConfig.background,
    backdropFilter: glassConfig.backdropFilter,
    WebkitBackdropFilter: glassConfig.backdropFilter, // Safari support
    border: glassConfig.border,
    boxShadow: glassConfig.boxShadow,
    borderRadius: sizeConfig.borderRadius,
    padding: sizeConfig.padding,
    transform: glassConfig.transform || 'none',
    ...style
  };
  
  // Final CSS classes
  const finalClasses = [
    'glass-component',
    glassConfig.className,
    animationClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={finalClasses}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  );
};

// PropTypes for Glass
Glass.propTypes = {
  variant: PropTypes.oneOf(['light', 'dark', 'elevated', 'subtle', 'strong']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  floating: PropTypes.bool,
  interactive: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.object
};

// ============================================================================
// 🃏 GLASS CARD (V0's Card System)
// ============================================================================

/**
 * Glass Card - V0's card pattern systematized
 * Leur approche: glass + padding + hover effects
 */
export const GlassCard = ({
  variant = 'light',
  size = 'lg',
  hoverable = false,
  clickable = false,
  className = '',
  children,
  onClick,
  ...props
}) => {
  // Interactive behavior (V0 pattern)
  const isInteractive = hoverable || clickable || onClick;
  
  // V0's hover classes
  const hoverClasses = isInteractive ? [
    'cursor-pointer',
    'hover:scale-[1.02]',                    // V0's scale effect
    'hover:shadow-xl',                       // Enhanced shadow
    'active:scale-[0.98]'                    // Press effect
  ].join(' ') : '';
  
  const Component = clickable || onClick ? 'button' : 'div';
  
  return (
    <Glass
      as={Component}
      variant={variant}
      size={size}
      floating={hoverable}
      interactive={isInteractive}
      className={`glass-card ${hoverClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Glass>
  );
};

// PropTypes for GlassCard
GlassCard.propTypes = {
  ...Glass.propTypes,
  hoverable: PropTypes.bool,
  clickable: PropTypes.bool,
  onClick: PropTypes.func
};

// ============================================================================
// 📊 GLASS STAT CARD (V0's elevated-stat-card)
// ============================================================================

/**
 * Glass Stat Card - V0's elevated-stat-card extracted
 * Leur pattern: elevated glass + icon + value + label
 */
export const GlassStatCard = ({
  icon,
  value,
  label,
  trend,
  color = 'blue',
  variant = 'elevated',
  className = '',
  ...props
}) => {
  // V0's color mapping
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
    red: 'text-red-600',
    purple: 'text-purple-600'
  };
  
  const colorClass = colorClasses[color] || colorClasses.blue;

  return (
    <GlassCard
      variant={variant}
      size="md"
      hoverable
      className={`glass-stat-card text-center ${className}`}
      {...props}
    >
      {/* Icon */}
      {icon && (
        <div className={`flex items-center justify-center mb-2 ${colorClass}`}>
          {typeof icon === 'string' ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            icon
          )}
        </div>
      )}
      
      {/* Value */}
      <div className={`font-stats-number text-2xl mb-1 ${colorClass}`}>
        {value}
      </div>
      
      {/* Label */}
      <div className="font-ui-label text-warm-muted text-xs">
        {label}
      </div>
      
      {/* Trend (optional) */}
      {trend && (
        <div className={`text-xs mt-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
        </div>
      )}
    </GlassCard>
  );
};

// PropTypes for GlassStatCard
GlassStatCard.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  trend: PropTypes.number,
  color: PropTypes.oneOf(['blue', 'green', 'orange', 'red', 'purple']),
  variant: PropTypes.oneOf(['light', 'dark', 'elevated', 'subtle', 'strong']),
  className: PropTypes.string
};

// ============================================================================
// 🎛️ GLASS CONTROL PANEL (V0's Control System)
// ============================================================================

/**
 * Glass Control Panel - V0's control areas systematized
 * Leur usage: controls avec glass background
 */
export const GlassControlPanel = ({
  title,
  description,
  children,
  variant = 'light',
  className = '',
  ...props
}) => {
  return (
    <GlassCard
      variant={variant}
      size="lg"
      className={`glass-control-panel ${className}`}
      {...props}
    >
      {/* Header */}
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h3 className="font-exercise-header text-lg text-warm-primary mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="font-body-athletic text-sm text-warm-muted">
              {description}
            </p>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="glass-control-content">
        {children}
      </div>
    </GlassCard>
  );
};

// PropTypes for GlassControlPanel
GlassControlPanel.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['light', 'dark', 'elevated', 'subtle', 'strong']),
  className: PropTypes.string
};

// ============================================================================
// 🎨 GLASS GRADIENT OVERLAY (V0's Background System)
// ============================================================================

/**
 * Glass Gradient Overlay - V0's warm-gradient system
 * Leur pattern: gradient background + glass overlay
 */
export const GlassGradientOverlay = ({
  gradient = 'warm',
  children,
  className = '',
  ...props
}) => {
  // V0's gradient backgrounds
  const gradientClasses = {
    warm: 'warm-gradient',                    // V0's signature
    premium: 'premium-gradient',
    custom: ''
  };
  
  const gradientClass = gradientClasses[gradient] || gradientClasses.warm;

  return (
    <div
      className={`glass-gradient-overlay relative ${gradientClass} ${className}`}
      {...props}
    >
      {/* V0's grain texture */}
      <div className="absolute inset-0 grain-texture pointer-events-none" />
      
      {/* V0's warm lighting */}
      <div className="relative z-10 warm-lighting">
        {children}
      </div>
    </div>
  );
};

// PropTypes for GlassGradientOverlay
GlassGradientOverlay.propTypes = {
  gradient: PropTypes.oneOf(['warm', 'premium', 'custom']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

// ============================================================================
// 🚀 UTILITY FUNCTIONS
// ============================================================================

/**
 * Helper pour créer un glass style custom
 * @param {Object} config - Configuration du glass
 * @returns {Object} Style CSS
 */
export const createGlassStyle = ({
  opacity = 0.85,
  blur = 24,
  borderOpacity = 0.4,
  shadowIntensity = 'light'
}) => {
  return {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
    boxShadow: shadows[`glass_${shadowIntensity}`] || shadows.glass_light
  };
};

/**
 * Helper pour vérifier si glassmorphism est supporté
 * @returns {boolean}
 */
export const isGlassmorphismSupported = () => {
  if (typeof window === 'undefined') return false;
  
  const testElement = document.createElement('div');
  testElement.style.backdropFilter = 'blur(1px)';
  
  return testElement.style.backdropFilter !== '';
};

// ============================================================================
// 🚀 EXPORTS
// ============================================================================

export default Glass;