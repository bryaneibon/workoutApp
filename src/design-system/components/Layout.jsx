// src/design-system/components/Layout.jsx
// 🏗️ WA-DESIGN-001.3: Layout Components - V0's Layout System Extracted
// Référence Clean Code: "Organize around the architecture"
// Référence Pragmatic Programmer: "Don't repeat yourself"

/**
 * 🎯 LAYOUT COMPONENTS VECT - EXTRACTED FROM V0's LAYOUT MASTERY
 * 
 * V0's GENIUS: warm-gradient + warm-lighting + grain-texture + responsive
 * min-h-screen + warm-gradient + relative z-10 + padding responsive
 * 
 * Clean Code: "Make the architecture obvious"
 */

import React from 'react';
import PropTypes from 'prop-types';
import { GlassGradientOverlay, GlassCard } from '../primitives/index.jsx';
import { semanticSpacing, responsiveSpacing, zIndex } from '../tokens/index.js';

// ============================================================================
// 🏗️ WORKOUT CONTAINER (V0's Main Layout)
// ============================================================================

/**
 * Workout Container - V0's main layout extracted
 * Leur pattern: min-h-screen + warm-gradient + warm-lighting + responsive padding
 */
export const WorkoutContainer = ({
  children,
  variant = 'warm',
  padding = 'responsive',
  className = '',
  ...props
}) => {
  // V0's padding system
  const paddingConfig = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',                        // V0's choice (p-8)
    responsive: 'p-4 sm:p-6 md:p-8'   // Notre amélioration mobile-first
  };
  
  const paddingClass = paddingConfig[padding] || paddingConfig.responsive;

  return (
    <GlassGradientOverlay
      gradient={variant}
      className={`workout-container min-h-screen ${className}`}
      {...props}
    >
      <div className={`${paddingClass} flex flex-col min-h-screen`}>
        {children}
      </div>
    </GlassGradientOverlay>
  );
};

// PropTypes for WorkoutContainer
WorkoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['warm', 'premium', 'custom']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'responsive']),
  className: PropTypes.string
};

// ============================================================================
// 📱 RESPONSIVE GRID (V0's Grid System Enhanced)
// ============================================================================

/**
 * Responsive Grid - V0's grid patterns systematized
 * Leur usage: grid grid-cols-2 gap-6 (responsive enhancement)
 */
export const ResponsiveGrid = ({
  children,
  cols = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 'lg',
  className = '',
  ...props
}) => {
  // V0's gap system (gap-6 = 24px)
  const gapClasses = {
    sm: 'gap-3',      // 12px
    md: 'gap-4',      // 16px
    lg: 'gap-6',      // 24px (V0's choice)
    xl: 'gap-8'       // 32px
  };
  
  // Responsive columns
  const colClasses = [
    `grid-cols-${cols.xs || 1}`,                    // Mobile
    cols.sm && `sm:grid-cols-${cols.sm}`,           // Tablet
    cols.md && `md:grid-cols-${cols.md}`,           // Desktop
    cols.lg && `lg:grid-cols-${cols.lg}`,           // Large
    cols.xl && `xl:grid-cols-${cols.xl}`            // XL
  ].filter(Boolean).join(' ');
  
  const gapClass = gapClasses[gap] || gapClasses.lg;

  return (
    <div 
      className={`responsive-grid grid ${colClasses} ${gapClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// PropTypes for ResponsiveGrid
ResponsiveGrid.propTypes = {
  children: PropTypes.node.isRequired,
  cols: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number
  }),
  gap: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string
};

// ============================================================================
// 📋 WORKOUT SECTION (V0's Section Pattern)
// ============================================================================

/**
 * Workout Section - V0's sections with consistent spacing
 * Leur pattern: spacing entre sections + titles + optional description
 */
export const WorkoutSection = ({
  title,
  description,
  icon,
  action,
  children,
  spacing = 'default',
  className = '',
  ...props
}) => {
  // V0's section spacing
  const spacingClasses = {
    tight: 'mb-6',
    default: 'mb-12',              // V0's mb-12
    loose: 'mb-16',
    none: ''
  };
  
  const spacingClass = spacingClasses[spacing] || spacingClasses.default;

  return (
    <section 
      className={`workout-section ${spacingClass} ${className}`}
      {...props}
    >
      {/* Section header */}
      {(title || description || action) && (
        <div className="section-header mb-6">
          <div className="flex items-start justify-between">
            {/* Title area */}
            <div className="flex items-center space-x-3">
              {icon && (
                <span className="section-icon text-2xl">
                  {icon}
                </span>
              )}
              <div>
                {title && (
                  <h2 className="font-exercise-header text-2xl sm:text-3xl text-warm-primary mb-2">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="font-body-athletic text-warm-secondary text-base sm:text-lg">
                    {description}
                  </p>
                )}
              </div>
            </div>
            
            {/* Action area */}
            {action && (
              <div className="section-action">
                {action}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Section content */}
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

// PropTypes for WorkoutSection
WorkoutSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
  action: PropTypes.node,
  children: PropTypes.node.isRequired,
  spacing: PropTypes.oneOf(['tight', 'default', 'loose', 'none']),
  className: PropTypes.string
};

// ============================================================================
// 🎛️ CONTROL PANEL LAYOUT (V0's Control Areas)
// ============================================================================

/**
 * Control Panel Layout - V0's control areas systematized
 * Leur pattern: glass cards + button groups + responsive layout
 */
export const ControlPanelLayout = ({
  children,
  orientation = 'vertical',
  spacing = 'default',
  className = '',
  ...props
}) => {
  // Orientation classes
  const orientationClasses = {
    vertical: 'flex flex-col',
    horizontal: 'flex flex-row flex-wrap',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };
  
  // V0's spacing between controls
  const spacingClasses = {
    tight: 'gap-3',
    default: 'gap-6',              // V0's gap-6
    loose: 'gap-8'
  };
  
  const orientationClass = orientationClasses[orientation] || orientationClasses.vertical;
  const spacingClass = spacingClasses[spacing] || spacingClasses.default;

  return (
    <div 
      className={`control-panel-layout ${orientationClass} ${spacingClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// PropTypes for ControlPanelLayout
ControlPanelLayout.propTypes = {
  children: PropTypes.node.isRequired,
  orientation: PropTypes.oneOf(['vertical', 'horizontal', 'grid']),
  spacing: PropTypes.oneOf(['tight', 'default', 'loose']),
  className: PropTypes.string
};

// ============================================================================
// 📱 MOBILE STACK (Mobile-First Layout)
// ============================================================================

/**
 * Mobile Stack - Layout optimisé mobile
 * V0 manquait de mobile-first - on l'ajoute
 */
export const MobileStack = ({
  children,
  spacing = 'default',
  maxWidth = 'lg',
  centered = true,
  className = '',
  ...props
}) => {
  // Max width options
  const maxWidthClasses = {
    sm: 'max-w-sm',    // 384px
    md: 'max-w-md',    // 448px
    lg: 'max-w-lg',    // 512px (V0's pattern)
    xl: 'max-w-xl',    // 576px
    '2xl': 'max-w-2xl', // 672px
    full: 'max-w-full'
  };
  
  // Stack spacing
  const spacingClasses = {
    tight: 'space-y-4',
    default: 'space-y-6',
    loose: 'space-y-8'
  };
  
  const maxWidthClass = maxWidthClasses[maxWidth] || maxWidthClasses.lg;
  const spacingClass = spacingClasses[spacing] || spacingClasses.default;
  const centeredClass = centered ? 'mx-auto' : '';

  return (
    <div 
      className={`mobile-stack ${maxWidthClass} ${centeredClass} w-full ${className}`}
      {...props}
    >
      <div className={`flex flex-col ${spacingClass}`}>
        {children}
      </div>
    </div>
  );
};

// PropTypes for MobileStack
MobileStack.propTypes = {
  children: PropTypes.node.isRequired,
  spacing: PropTypes.oneOf(['tight', 'default', 'loose']),
  maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', 'full']),
  centered: PropTypes.bool,
  className: PropTypes.string
};

// ============================================================================
// 🏷️ CARD LAYOUT (V0's Card Compositions)
// ============================================================================

/**
 * Card Layout - Compositions de cartes V0
 * Leur pattern: cards en grid avec spacing cohérent
 */
export const CardLayout = ({
  children,
  variant = 'grid',
  cardSpacing = 'default',
  cardVariant = 'light',
  className = '',
  ...props
}) => {
  // Layout variants
  const variantClasses = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    stack: 'flex flex-col',
    row: 'flex flex-row flex-wrap',
    masonry: 'columns-1 md:columns-2 lg:columns-3'
  };
  
  // Card spacing (V0's patterns)
  const spacingClasses = {
    tight: 'gap-4',
    default: 'gap-6',              // V0's gap-6
    loose: 'gap-8'
  };
  
  const variantClass = variantClasses[variant] || variantClasses.grid;
  const spacingClass = spacingClasses[cardSpacing] || spacingClasses.default;

  return (
    <div 
      className={`card-layout ${variantClass} ${spacingClass} ${className}`}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        // Auto-wrap non-card children in GlassCard
        if (React.isValidElement(child) && child.type !== GlassCard) {
          return (
            <GlassCard key={index} variant={cardVariant}>
              {child}
            </GlassCard>
          );
        }
        return child;
      })}
    </div>
  );
};

// PropTypes for CardLayout
CardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['grid', 'stack', 'row', 'masonry']),
  cardSpacing: PropTypes.oneOf(['tight', 'default', 'loose']),
  cardVariant: PropTypes.oneOf(['light', 'dark', 'elevated', 'subtle', 'strong']),
  className: PropTypes.string
};

// ============================================================================
// 🎯 STICKY HEADER (V0's Header Pattern)
// ============================================================================

/**
 * Sticky Header - Header qui reste visible
 * V0 n'en avait pas - on l'ajoute pour l'expérience
 */
export const StickyHeader = ({
  children,
  blur = true,
  shadow = true,
  className = '',
  ...props
}) => {
  const blurClass = blur ? 'backdrop-blur-md bg-white/80' : 'bg-white';
  const shadowClass = shadow ? 'shadow-lg' : '';

  return (
    <header 
      className={`sticky-header sticky top-0 ${blurClass} ${shadowClass} z-50 transition-all duration-300 ${className}`}
      style={{ zIndex: zIndex.floating }}
      {...props}
    >
      {children}
    </header>
  );
};

// PropTypes for StickyHeader
StickyHeader.propTypes = {
  children: PropTypes.node.isRequired,
  blur: PropTypes.bool,
  shadow: PropTypes.bool,
  className: PropTypes.string
};

// ============================================================================
// 🛠️ LAYOUT UTILITIES (Helper Functions)
// ============================================================================

/**
 * Hook pour gérer la taille d'écran
 * @returns {Object} Informations sur la taille d'écran
 */
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Breakpoints detection
  const isMobile = screenSize.width < 640;
  const isTablet = screenSize.width >= 640 && screenSize.width < 1024;
  const isDesktop = screenSize.width >= 1024;
  const isLarge = screenSize.width >= 1280;
  
  return {
    ...screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isLarge
  };
};

/**
 * Hook pour détecter le scroll
 * @param {number} threshold - Seuil de scroll
 * @returns {boolean} True si scrollé au-delà du seuil
 */
export const useScrollPosition = (threshold = 100) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);
  
  return isScrolled;
};

/**
 * Helper pour créer des layouts responsive
 * @param {Object} config - Configuration du layout
 * @returns {string} Classes CSS
 */
export const createResponsiveLayout = ({ 
  mobile = 'stack', 
  tablet = 'grid-2', 
  desktop = 'grid-3' 
}) => {
  const layouts = {
    stack: 'flex flex-col',
    'grid-2': 'grid grid-cols-2',
    'grid-3': 'grid grid-cols-3',
    'grid-4': 'grid grid-cols-4',
    row: 'flex flex-row'
  };
  
  return [
    layouts[mobile] || 'flex flex-col',
    tablet && `md:${layouts[tablet]?.replace('grid ', '') || 'grid-cols-2'}`,
    desktop && `lg:${layouts[desktop]?.replace('grid ', '') || 'grid-cols-3'}`
  ].filter(Boolean).join(' ');
};

// ============================================================================
// 🚀 EXPORTS
// ============================================================================

export default WorkoutContainer;