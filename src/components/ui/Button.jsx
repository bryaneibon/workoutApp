// src/components/ui/Button.jsx
// 🎨 WA-007.1: Composant Button réutilisable avec Tailwind
// Référence Clean Code: "Don't repeat yourself - create reusable components"

import React from 'react';

/**
 * Variantes de boutons disponibles
 */
const buttonVariants = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
  secondary: 'bg-slate-500 hover:bg-slate-600 text-white focus:ring-slate-500',
  success: 'bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-500',
  warning: 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-500',
  danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
  outline: 'border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 focus:ring-slate-500',
  ghost: 'text-slate-600 hover:bg-slate-100 focus:ring-slate-500'
};

/**
 * Tailles de boutons disponibles
 */
const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg'
};

/**
 * Composant Button réutilisable
 * @param {Object} props - Propriétés du bouton
 * @param {string} props.variant - Style du bouton (primary, secondary, etc.)
 * @param {string} props.size - Taille du bouton (sm, md, lg, xl)
 * @param {boolean} props.disabled - Bouton désactivé
 * @param {boolean} props.loading - État de chargement
 * @param {string} props.className - Classes CSS additionnelles
 * @param {React.ReactNode} props.children - Contenu du bouton
 * @param {Function} props.onClick - Fonction appelée au clic
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  children,
  onClick,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = buttonVariants[variant] || buttonVariants.primary;
  const sizeClasses = buttonSizes[size] || buttonSizes.md;
  
  const finalClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  return (
    <button
      className={finalClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

/**
 * Composants de boutons pré-configurés pour WorkoutApp
 */
export const WorkoutButton = (props) => (
  <Button variant="primary" {...props} />
);

export const StartButton = (props) => (
  <Button variant="success" size="lg" {...props}>
    🚀 {props.children || 'Démarrer'}
  </Button>
);

export const PauseButton = (props) => (
  <Button variant="warning" {...props}>
    ⏸️ {props.children || 'Pause'}
  </Button>
);

export const StopButton = (props) => (
  <Button variant="danger" {...props}>
    ⏹️ {props.children || 'Arrêter'}
  </Button>
);

export const NextButton = (props) => (
  <Button variant="primary" {...props}>
    ⏭️ {props.children || 'Suivant'}
  </Button>
);

export const ResetButton = (props) => (
  <Button variant="outline" {...props}>
    🔄 {props.children || 'Reset'}
  </Button>
);

export default Button;