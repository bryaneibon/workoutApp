// src/design-system/primitives/Button.jsx
// 🔘 WA-DESIGN-001.2: Button Primitives - V0's Button System Extracted
// Référence Clean Code: "Functions should do one thing"
// Référence Pragmatic Programmer: "Don't repeat yourself"

/**
 * 🎯 BUTTON SYSTEM VECT - EXTRACTED FROM V0's PREMIUM BUTTONS
 * 
 * V0's GENIUS: Gradient buttons with perfect hover/active states
 * enhanced-play-button, btn-primary, btn-secondary, world-class-button
 * 
 * Clean Code: "Make meaningful distinctions"
 */

import React from 'react';
import PropTypes from 'prop-types';
import { gradients, shadows, borderRadius, spacingScale, fontWeights } from '../tokens/index.js';

// ============================================================================
// 🔘 BUTTON VARIANTS (V0's Premium System)
// ============================================================================

/**
 * V0's button variants systematized
 * Leur breakthrough: gradient backgrounds + world-class interactions
 * @type {Object}
 */
export const BUTTON_VARIANTS = {
  // V0's enhanced-play-button - leur signature !
  primary: {
    background: gradients.primary_button,           // linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)
    backgroundHover: gradients.primary_button_hover, // V0's hover state
    backgroundActive: gradients.primary_button_active,
    color: '#ffffff',
    border: 'none',
    boxShadow: shadows.button_default,
    className: 'btn-primary'
  },
  
  // V0's btn-secondary
  secondary: {
    background: gradients.secondary_button,         // linear-gradient(135deg, #374151 0%, #1f2937 100%)
    backgroundHover: gradients.secondary_button_hover,
    backgroundActive: gradients.secondary_button_active,
    color: '#ffffff',
    border: 'none',
    boxShadow: shadows.button_default,
    className: 'btn-secondary'
  },
  
  // V0's glass button style
  glass: {
    background: 'rgba(255, 255, 255, 0.85)',
    backgroundHover: 'rgba(255, 255, 255, 0.95)',
    backgroundActive: 'rgba(255, 255, 255, 0.75)',
    color: '#1e293b',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(24px)',
    boxShadow: shadows.glass_light,
    className: 'btn-glass'
  },
  
  // Workout specific buttons
  workout: {
    background: gradients.workout_active,           // V0's orange→red gradient
    backgroundHover: 'linear-gradient(135deg, #ea580c 0%, #b91c1c 100%)',
    backgroundActive: 'linear-gradient(135deg, #c2410c 0%, #991b1b 100%)',
    color: '#ffffff',
    border: 'none',
    boxShadow: shadows.workout_glow,
    className: 'btn-workout'
  },
  
  // Destructive actions
  danger: {
    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    backgroundHover: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)',
    backgroundActive: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
    color: '#ffffff',
    border: 'none',
    boxShadow: '0 6px 20px rgba(220, 38, 38, 0.25)',
    className: 'btn-danger'
  },
  
  // Outline variant
  outline: {
    background: 'transparent',
    backgroundHover: 'rgba(30, 64, 175, 0.1)',
    backgroundActive: 'rgba(30, 64, 175, 0.2)',
    color: '#1e40af',
    border: '2px solid #1e40af',
    boxShadow: 'none',
    className: 'btn-outline'
  },
  
  // Ghost variant
  ghost: {
    background: 'transparent',
    backgroundHover: 'rgba(30, 64, 175, 0.1)',
    backgroundActive: 'rgba(30, 64, 175, 0.15)',
    color: '#1e40af',
    border: 'none',
    boxShadow: 'none',
    className: 'btn-ghost'
  }
};

/**
 * V0's button sizes (px-10 py-4 pattern)
 * @type {Object}
 */
export const BUTTON_SIZES = {
  sm: {
    padding: `${spacingScale.sm}px ${spacingScale.lg}px`,    // 8px 16px
    fontSize: '0.875rem',                                     // 14px
    borderRadius: borderRadius.lg,                            // 8px
    minHeight: '32px'
  },
  md: {
    padding: `${spacingScale.md}px ${spacingScale.xl}px`,    // 12px 24px
    fontSize: '1rem',                                         // 16px
    borderRadius: borderRadius.xl,                            // 12px
    minHeight: '40px'
  },
  lg: {
    padding: `${spacingScale.lg}px ${spacingScale['2xl']}px`, // 16px 32px (V0's px-10 py-4)
    fontSize: '1.125rem',                                      // 18px
    borderRadius: borderRadius.xl,                             // 12px (V0's rounded-2xl)
    minHeight: '48px'
  },
  xl: {
    padding: `${spacingScale.xl}px ${spacingScale['3xl']}px`, // 24px 48px
    fontSize: '1.25rem',                                       // 20px
    borderRadius: borderRadius['2xl'],                         // 16px
    minHeight: '56px'
  }
};

// ============================================================================
// 🔘 BASE BUTTON COMPONENT (V0's Foundation)
// ============================================================================

/**
 * Composant Button de base
 * V0's insight: world-class-button + haptic-feedback + smooth transitions
 * 
 * @param {Object} props - Properties
 * @param {'primary'|'secondary'|'glass'|'workout'|'danger'|'outline'|'ghost'} props.variant - Button variant
 * @param {'sm'|'md'|'lg'|'xl'} props.size - Button size
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {React.ReactNode} props.icon - Icon element
 * @param {'left'|'right'} props.iconPosition - Icon position
 * @param {boolean} props.fullWidth - Full width button
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  children,
  style = {},
  onClick,
  ...props
}) => {
  // V0's button configuration
  const variantConfig = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary;
  const sizeConfig = BUTTON_SIZES[size] || BUTTON_SIZES.md;
  
  // V0's world-class-button classes
  const baseClasses = [
    'world-class-button',                    // V0's premium animation
    'haptic-feedback',                       // V0's press effect
    'font-body-athletic',                    // V0's typography
    'inline-flex items-center justify-center',
    'relative overflow-hidden',
    'transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)', // V0's easing
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'cursor-wait'
  ].filter(Boolean).join(' ');
  
  // Combined styles (V0's approach)
  const combinedStyle = {
    background: disabled ? '#e5e7eb' : variantConfig.background,
    color: disabled ? '#9ca3af' : variantConfig.color,
    border: variantConfig.border,
    borderRadius: sizeConfig.borderRadius,
    padding: sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    minHeight: sizeConfig.minHeight,
    fontWeight: fontWeights.semibold,         // V0's font-body-athletic
    boxShadow: disabled ? 'none' : variantConfig.boxShadow,
    backdropFilter: variantConfig.backdropFilter || 'none',
    ...style
  };
  
  // Final CSS classes
  const finalClasses = [
    baseClasses,
    variantConfig.className,
    className
  ].filter(Boolean).join(' ');
  
  // Handle click with loading state
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      className={finalClasses}
      style={combinedStyle}
      disabled={disabled || loading}
      onClick={handleClick}
      // V0's hover/active styles via CSS-in-JS
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.target.style.background = variantConfig.backgroundHover;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.target.style.background = variantConfig.background;
        }
      }}
      onMouseDown={(e) => {
        if (!disabled && !loading) {
          e.target.style.background = variantConfig.backgroundActive;
        }
      }}
      onMouseUp={(e) => {
        if (!disabled && !loading) {
          e.target.style.background = variantConfig.backgroundHover;
        }
      }}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content wrapper */}
      <div className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Icon left */}
        {icon && iconPosition === 'left' && (
          <span className="button-icon button-icon-left">
            {icon}
          </span>
        )}
        
        {/* Text content */}
        {children && (
          <span className="button-text">
            {children}
          </span>
        )}
        
        {/* Icon right */}
        {icon && iconPosition === 'right' && (
          <span className="button-icon button-icon-right">
            {icon}
          </span>
        )}
      </div>
    </button>
  );
};

// PropTypes for Button
Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'glass', 'workout', 'danger', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  onClick: PropTypes.func
};

// ============================================================================
// 🎮 SPECIALIZED BUTTONS (V0's Specific Use Cases)
// ============================================================================

/**
 * Play Button - V0's enhanced-play-button extracted
 */
export const PlayButton = ({ children = '▶️', ...props }) => (
  <Button 
    variant="primary" 
    size="lg" 
    className="enhanced-play-button" 
    {...props}
  >
    {children}
  </Button>
);

/**
 * Workout Action Button - V0's workout controls
 */
export const WorkoutButton = ({ children, ...props }) => (
  <Button 
    variant="workout" 
    size="lg" 
    {...props}
  >
    {children}
  </Button>
);

/**
 * Glass Button - V0's glass-card-light button
 */
export const GlassButton = ({ children, ...props }) => (
  <Button 
    variant="glass" 
    size="md" 
    {...props}
  >
    {children}
  </Button>
);

/**
 * Icon Button - Bouton avec seulement une icône
 */
export const IconButton = ({ 
  icon, 
  size = 'md',
  variant = 'ghost',
  'aria-label': ariaLabel,
  ...props 
}) => (
  <Button 
    variant={variant}
    size={size}
    aria-label={ariaLabel}
    className="icon-button aspect-square"
    {...props}
  >
    {icon}
  </Button>
);

// PropTypes for specialized buttons
PlayButton.propTypes = {
  children: PropTypes.node
};

WorkoutButton.propTypes = {
  children: PropTypes.node.isRequired
};

GlassButton.propTypes = {
  children: PropTypes.node.isRequired
};

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'glass', 'workout', 'danger', 'outline', 'ghost']),
  'aria-label': PropTypes.string.isRequired
};

// ============================================================================
// 🎯 BUTTON GROUPS (V0's Control Patterns)
// ============================================================================

/**
 * Button Group - V0's control panel patterns
 * Leur usage: gap-6 entre les boutons de contrôle
 */
export const ButtonGroup = ({
  orientation = 'horizontal',
  size = 'md',
  variant = 'primary',
  gap = 'md',
  children,
  className = '',
  ...props
}) => {
  // Gap mapping (V0's gap-6 = 24px)
  const gapClasses = {
    sm: 'gap-2',    // 8px
    md: 'gap-4',    // 16px
    lg: 'gap-6',    // 24px (V0's choice)
    xl: 'gap-8'     // 32px
  };
  
  // Orientation classes
  const orientationClasses = {
    horizontal: 'flex-row',
    vertical: 'flex-col'
  };
  
  const baseClasses = [
    'button-group',
    'flex',
    orientationClasses[orientation],
    gapClasses[gap],
    'items-center',
    className
  ].join(' ');

  return (
    <div className={baseClasses} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Button) {
          return React.cloneElement(child, {
            size: child.props.size || size,
            variant: child.props.variant || variant
          });
        }
        return child;
      })}
    </div>
  );
};

// PropTypes for ButtonGroup
ButtonGroup.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'glass', 'workout', 'danger', 'outline', 'ghost']),
  gap: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

// ============================================================================
// 🎮 WORKOUT CONTROL BUTTONS (V0's Specific Actions)
// ============================================================================

/**
 * Start Button - V0's workout start pattern
 */
export const StartButton = ({ children = '🚀 Start', ...props }) => (
  <PlayButton 
    className="start-button" 
    {...props}
  >
    {children}
  </PlayButton>
);

/**
 * Pause Button - V0's pause control
 */
export const PauseButton = ({ children = '⏸️ Pause', ...props }) => (
  <Button 
    variant="secondary" 
    size="lg" 
    className="pause-button"
    {...props}
  >
    {children}
  </Button>
);

/**
 * Stop Button - V0's stop control with danger styling
 */
export const StopButton = ({ children = '⏹️ Stop', ...props }) => (
  <Button 
    variant="danger" 
    size="lg" 
    className="stop-button"
    {...props}
  >
    {children}
  </Button>
);

/**
 * Next Button - V0's skip forward
 */
export const NextButton = ({ children = '⏭️ Next', ...props }) => (
  <Button 
    variant="secondary" 
    size="lg" 
    className="next-button"
    {...props}
  >
    {children}
  </Button>
);

/**
 * Reset Button - V0's reset control
 */
export const ResetButton = ({ children = '🔄 Reset', ...props }) => (
  <Button 
    variant="outline" 
    size="lg" 
    className="reset-button"
    {...props}
  >
    {children}
  </Button>
);

// PropTypes for workout buttons
StartButton.propTypes = {
  children: PropTypes.node
};

PauseButton.propTypes = {
  children: PropTypes.node
};

StopButton.propTypes = {
  children: PropTypes.node
};

NextButton.propTypes = {
  children: PropTypes.node
};

ResetButton.propTypes = {
  children: PropTypes.node
};

// ============================================================================
// 🛠️ UTILITY FUNCTIONS (Button Helpers)
// ============================================================================

/**
 * Helper pour créer un button style custom
 * @param {Object} config - Configuration du bouton
 * @returns {Object} Style CSS
 */
export const createButtonStyle = ({
  baseColor = '#1e40af',
  hoverIntensity = 0.9,
  activeIntensity = 0.8,
  gradient = true
}) => {
  const lighterColor = adjustColor(baseColor, 1.1);
  const darkerColor = adjustColor(baseColor, hoverIntensity);
  const darkestColor = adjustColor(baseColor, activeIntensity);
  
  if (gradient) {
    return {
      background: `linear-gradient(135deg, ${baseColor} 0%, ${lighterColor} 100%)`,
      backgroundHover: `linear-gradient(135deg, ${darkerColor} 0%, ${baseColor} 100%)`,
      backgroundActive: `linear-gradient(135deg, ${darkestColor} 0%, ${darkerColor} 100%)`
    };
  }
  
  return {
    background: baseColor,
    backgroundHover: darkerColor,
    backgroundActive: darkestColor
  };
};

/**
 * Helper pour ajuster la luminosité d'une couleur
 * @param {string} color - Couleur hex
 * @param {number} factor - Facteur de modification
 * @returns {string} Couleur modifiée
 */
const adjustColor = (color, factor) => {
  // Simple color adjustment (peut être amélioré avec une lib de couleurs)
  const hex = color.replace('#', '');
  const r = Math.min(255, Math.max(0, parseInt(hex.slice(0, 2), 16) * factor));
  const g = Math.min(255, Math.max(0, parseInt(hex.slice(2, 4), 16) * factor));
  const b = Math.min(255, Math.max(0, parseInt(hex.slice(4, 6), 16) * factor));
  
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
};

/**
 * Hook pour gérer l'état des boutons
 * @param {Object} config - Configuration initiale
 * @returns {Object} État et actions
 */
export const useButtonState = (config = {}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(config.disabled || false);
  
  const withLoading = async (asyncFn) => {
    setIsLoading(true);
    try {
      await asyncFn();
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    isDisabled,
    setIsLoading,
    setIsDisabled,
    withLoading
  };
};

// ============================================================================
// 🎨 CSS CLASSES GENERATION (Tailwind Integration)
// ============================================================================

/**
 * Génère les classes CSS pour intégration Tailwind
 * @returns {Object} Classes CSS
 */
export const generateButtonCSS = () => {
  const css = {};
  
  // V0's button base classes
  css['.world-class-button'] = {
    'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    'transform-origin': 'center',
    'border-radius': '12px'
  };
  
  css['.world-class-button:hover'] = {
    'transform': 'scale(1.05) translateY(-1px)',
    'box-shadow': '0 12px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.08)'
  };
  
  css['.world-class-button:active'] = {
    'transform': 'scale(0.98) translateY(0px)',
    'transition': 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
  };
  
  // V0's haptic feedback
  css['.haptic-feedback'] = {
    'position': 'relative'
  };
  
  css['.haptic-feedback::after'] = {
    'content': '""',
    'position': 'absolute',
    'top': '50%',
    'left': '50%',
    'width': '100%',
    'height': '100%',
    'border-radius': 'inherit',
    'background': 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
    'transform': 'translate(-50%, -50%) scale(0)',
    'transition': 'transform 0.2s ease',
    'pointer-events': 'none'
  };
  
  css['.haptic-feedback:active::after'] = {
    'transform': 'translate(-50%, -50%) scale(1.2)'
  };
  
  return css;
};

// ============================================================================
// 🚀 EXPORTS
// ============================================================================

export default Button;