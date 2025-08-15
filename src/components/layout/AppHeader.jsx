// src/components/layout/AppHeader.jsx
// 🎨 WA-REDESIGN-001: Header ultra clean avec responsive et hamburger menu
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { APP_VIEWS } from '@/constants/workoutStates';
import { 
  Home, 
  Settings, 
  TestTube, 
  Timer, 
  Zap,
  SquareActivity,
  Menu,
  X
} from 'lucide-react';

/**
 * Navigation items configuration avec priorités d'affichage
 * Clean Code: "Use intention-revealing names"
 */
const navigationItems = [
  { 
    view: APP_VIEWS.HOME, 
    icon: Home, 
    label: 'Accueil', 
    shortLabel: 'Home',
    priority: 1 // Toujours visible
  },
  { 
    view: APP_VIEWS.WORKOUT_CONFIG, 
    icon: Settings, 
    label: 'Configuration', 
    shortLabel: 'Config',
    priority: 2 // Visible sur tablet+
  },
  { 
    view: APP_VIEWS.TEST_COMPONENTS, 
    icon: TestTube, 
    label: 'Tests', 
    shortLabel: 'Tests',
    priority: 3
  },
  { 
    view: APP_VIEWS.WORKOUT_ACTIVE, 
    icon: Timer, 
    label: 'Auto Timer', 
    shortLabel: 'Timer',
    priority: 2
  },
  { 
    view: APP_VIEWS.WORKOUT_ACTIVE_V2, 
    icon: Zap, 
    label: 'Auto Timer - V2', 
    shortLabel: 'Timer V2',
    priority: 1
  }
];

/**
 * Hook pour gérer le responsive
 */
const useResponsiveNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Items toujours visibles (priority 1)
  const alwaysVisible = navigationItems.filter(item => item.priority === 1);
  
  // Items visibles sur tablet+ (priority 1-2)
  const tabletVisible = navigationItems.filter(item => item.priority <= 2);
  
  // Items visibles sur desktop+ (priority 1-3)
  const desktopVisible = navigationItems.filter(item => item.priority <= 3);
  
  // Items dans le hamburger menu
  const hamburgerItems = navigationItems.filter(item => item.priority >= 3);
  
  return {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    alwaysVisible,
    tabletVisible,
    desktopVisible,
    hamburgerItems
  };
};

/**
 * Composant NavButton réutilisable
 */
const NavButton = ({ view, icon: Icon, label, shortLabel, isActive, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`
      relative group px-3 py-2 rounded-lg font-medium text-sm
      transition-all duration-200 ease-out flex items-center gap-2
      ${isActive 
        ? `bg-blue-200 border border-blue-200 shadow-sm text-blue-900` 
        : `bg-blue-50 border border-blue-200 shadow-sm text-blue-600
           hover:bg-blue-300 hover:shadow-md hover:shadow-blue-600/25`
      }
      hover:scale-105 ${className}
    `}
  >
    <Icon className="w-4 h-4 flex-shrink-0" />
    <span className="font-semibold whitespace-nowrap">
      {label}
    </span>
  </button>
);

/**
 * Composant AppHeader - Responsive avec Hamburger Menu
 * @param {Object} props - Propriétés du header
 * @param {string} props.currentView - Vue actuelle
 * @param {Function} props.onNavigate - Fonction de navigation
 */
const AppHeader = ({ currentView, onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    alwaysVisible,
    tabletVisible,
    desktopVisible,
    hamburgerItems
  } = useResponsiveNavigation();

  const handleNavigate = (view) => {
    onNavigate(view);
    setIsMobileMenuOpen(false); // Ferme le menu mobile après navigation
  };

  return (
    <>
      {/* 🎯 Header Ultra Clean Responsive */}
      <header 
        className="sticky top-0 z-50 mb-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background harmonisé */}
        <div className={`
          bg-white border border-gray-200/60 rounded-2xl p-4 sm:p-6 
          shadow-lg transition-all duration-300 ease-out
          ${isHovered ? 'shadow-xl border-gray-300/60' : ''}
        `}>
          
          {/* Contenu principal du header */}
          <div className="flex justify-between items-center">
            
            {/* 🏋️ Logo optimisé responsive */}
            <div className="flex-shrink-0 group">
              <div className="flex items-center gap-1 bg-blue-50 border border-blue-200 px-2 py-1 rounded-lg">
                <SquareActivity className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-600 animate-pulse group-hover:rotate-6 transition-transform duration-300" />
                <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-blue-600 tracking-tight group-hover:scale-105 transition-all duration-200">
                  VECT
                </h1>
              </div>
            </div>
            
            {/* 🎯 Navigation Responsive */}
            <div className="flex items-center gap-2">
              
              {/* Navigation Mobile (xs-sm) - Items essentiels seulement */}
              <nav className="flex gap-1 sm:hidden" role="navigation">
                {alwaysVisible.map(({ view, icon: Icon, shortLabel }) => (
                  <button
                    key={view}
                    onClick={() => handleNavigate(view)}
                    className={`
                      p-2 rounded-lg transition-all duration-200 ease-out
                      ${currentView === view 
                        ? 'bg-blue-200 text-blue-900' 
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-300'
                      }
                    `}
                    title={shortLabel}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </nav>

              {/* Navigation Tablet (sm-lg) - Items prioritaires */}
              <nav className="hidden sm:flex lg:hidden gap-2" role="navigation">
                {tabletVisible.map((item) => (
                  <NavButton
                    key={item.view}
                    {...item}
                    isActive={currentView === item.view}
                    onClick={() => handleNavigate(item.view)}
                    className="text-xs px-2 py-1.5"
                  />
                ))}
              </nav>

              {/* Navigation Desktop (lg+) - Tous les items principaux */}
              <nav className="hidden lg:flex gap-2" role="navigation">
                {desktopVisible.map((item) => (
                  <NavButton
                    key={item.view}
                    {...item}
                    isActive={currentView === item.view}
                    onClick={() => handleNavigate(item.view)}
                  />
                ))}
              </nav>

              {/* 🍔 Hamburger Menu Button */}
              {hamburgerItems.some(item => item.priority >= 3) && (
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-300 transition-all duration-200 hover:scale-105"
                  aria-label="Menu"
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 🍔 Mobile/Tablet Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-white border border-gray-200/60 rounded-xl shadow-lg p-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2" role="navigation">
              {navigationItems
                .filter(item => !alwaysVisible.includes(item) || window.innerWidth >= 640)
                .map((item) => (
                <NavButton
                  key={item.view}
                  {...item}
                  isActive={currentView === item.view}
                  onClick={() => handleNavigate(item.view)}
                  className="w-full justify-start"
                />
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

// 🎯 PropTypes pour validation stricte
AppHeader.propTypes = {
  /** Vue actuelle de l'application */
  currentView: PropTypes.oneOf(Object.values(APP_VIEWS)).isRequired,
  /** Fonction appelée lors de la navigation vers une nouvelle vue */
  onNavigate: PropTypes.func.isRequired
};

NavButton.propTypes = {
  view: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  shortLabel: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default AppHeader;