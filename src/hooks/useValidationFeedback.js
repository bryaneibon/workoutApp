// src/hooks/useValidationFeedback.js
// 🎨 WA-013.2: Hook pour feedback validation utilisateur
// Référence Clean Code: "Functions should do one thing" - Feedback UI séparé
// Référence Pragmatic Programmer: "Make it easy to reuse" - Hook réutilisable

import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { VALIDATION_TYPES, VALIDATION_PRIORITIES } from './useWorkoutValidation.js';

/**
 * 🎨 Types de feedback pour l'interface utilisateur
 */
export const FEEDBACK_STYLES = {
  ERROR: {
    color: 'red',
    icon: '❌',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700'
  },
  WARNING: {
    color: 'orange', 
    icon: '⚠️',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700'
  },
  INFO: {
    color: 'blue',
    icon: 'ℹ️',
    bgColor: 'bg-blue-50', 
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700'
  },
  SUCCESS: {
    color: 'green',
    icon: '✅',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200', 
    textColor: 'text-green-700'
  }
};

/**
 * 🎯 Hook useValidationFeedback - Interface utilisateur pour validation
 * 
 * Ce hook gère l'affichage et l'interaction avec les résultats de validation :
 * - Formatage des messages pour l'UI
 * - Gestion des animations et transitions
 * - Regroupement intelligent des feedbacks
 * - Actions utilisateur (ignorer, corriger, etc.)
 * 
 * Clean Code: "Single Responsibility" - Seulement l'UI de validation
 * 
 * @param {Object} validationResults - Résultats de validation
 * @param {Object} options - Options d'affichage
 * @returns {Object} Interface feedback utilisateur
 */
export const useValidationFeedback = (validationResults, options = {}) => {
  const {
    maxVisible = 5,
    autoHideDelay = 5000,
    groupByField = true,
    showSuccessMessages = false,
    animationEnabled = true
  } = options;

  // 🔗 État local pour gestion UI
  const [dismissedMessages, setDismissedMessages] = useState(new Set());
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const [recentlyShown, setRecentlyShown] = useState(new Set());
  const autoHideTimers = useRef({});

  // 🎯 Formatage des messages pour l'affichage avec useCallback
  const formatMessage = useCallback((result) => {
    const style = FEEDBACK_STYLES[result.type.toUpperCase()] || FEEDBACK_STYLES.INFO;
    
    return {
      ...result,
      id: `${result.field}_${result.code}_${Date.now()}`,
      style,
      formattedMessage: `${style.icon} ${result.message}`,
      displayPriority: result.priority,
      canDismiss: result.type !== VALIDATION_TYPES.ERROR || result.priority > VALIDATION_PRIORITIES.CRITICAL,
      hasAction: Boolean(result.suggestion),
      actionLabel: getActionLabel(result),
      timestamp: Date.now()
    };
  }, []);

  // 🏗️ Regroupement des messages par champ avec useMemo
  const groupedMessages = useMemo(() => {
    if (!validationResults?.results) return {};
    
    const messages = validationResults.results
      .filter(result => {
        // Filtrage des messages selon options
        if (!showSuccessMessages && result.type === VALIDATION_TYPES.SUCCESS) return false;
        if (dismissedMessages.has(`${result.field}_${result.code}`)) return false;
        return true;
      })
      .map(formatMessage);

    if (!groupByField) {
      return { all: messages };
    }

    // Regroupement par champ
    return messages.reduce((groups, message) => {
      const field = message.field || 'general';
      if (!groups[field]) {
        groups[field] = [];
      }
      groups[field].push(message);
      return groups;
    }, {});
  }, [validationResults, dismissedMessages, showSuccessMessages, groupByField, formatMessage]);

  // 📊 Statistiques des messages pour interface
  const messageStats = useMemo(() => {
    const allMessages = Object.values(groupedMessages).flat();
    
    return {
      total: allMessages.length,
      errors: allMessages.filter(m => m.type === VALIDATION_TYPES.ERROR).length,
      warnings: allMessages.filter(m => m.type === VALIDATION_TYPES.WARNING).length,
      infos: allMessages.filter(m => m.type === VALIDATION_TYPES.INFO).length,
      critical: allMessages.filter(m => m.priority === VALIDATION_PRIORITIES.CRITICAL).length,
      dismissible: allMessages.filter(m => m.canDismiss).length,
      hasBlockingErrors: allMessages.some(m => 
        m.type === VALIDATION_TYPES.ERROR && m.priority <= VALIDATION_PRIORITIES.HIGH
      )
    };
  }, [groupedMessages]);

  // 🎨 Messages prioritaires pour affichage avec useMemo
  const priorityMessages = useMemo(() => {
    const allMessages = Object.values(groupedMessages).flat();
    
    return allMessages
      .sort((a, b) => {
        // Tri par priorité puis par timestamp
        if (a.priority !== b.priority) return a.priority - b.priority;
        return b.timestamp - a.timestamp;
      })
      .slice(0, maxVisible);
  }, [groupedMessages, maxVisible]);

  // 🎯 Actions utilisateur avec useCallback
  
  const dismissMessage = useCallback((messageId, permanent = false) => {
    console.log(`🚫 Message ignoré: ${messageId}`);
    
    if (permanent) {
      setDismissedMessages(prev => new Set([...prev, messageId]));
    }
    
    // Clear auto-hide timer si existant
    if (autoHideTimers.current[messageId]) {
      clearTimeout(autoHideTimers.current[messageId]);
      delete autoHideTimers.current[messageId];
    }
  }, []);

  const dismissAll = useCallback((type = null) => {
    const allMessages = Object.values(groupedMessages).flat();
    const messagesToDismiss = type 
      ? allMessages.filter(m => m.type === type)
      : allMessages.filter(m => m.canDismiss);
    
    const newDismissed = new Set(dismissedMessages);
    messagesToDismiss.forEach(msg => {
      newDismissed.add(`${msg.field}_${msg.code}`);
    });
    
    setDismissedMessages(newDismissed);
    console.log(`🧹 ${messagesToDismiss.length} messages ignorés`);
  }, [groupedMessages, dismissedMessages]);

  const toggleGroup = useCallback((groupName) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupName)) {
        newSet.delete(groupName);
      } else {
        newSet.add(groupName);
      }
      return newSet;
    });
  }, []);

  const clearDismissed = useCallback(() => {
    setDismissedMessages(new Set());
    console.log('🔄 Messages ignorés réinitialisés');
  }, []);

  // 🔧 Fonctions utilitaires d'interface
  
  const getMessagesForField = useCallback((fieldName) => {
    return groupedMessages[fieldName] || [];
  }, [groupedMessages]);

  const hasErrorsForField = useCallback((fieldName) => {
    const messages = getMessagesForField(fieldName);
    return messages.some(m => m.type === VALIDATION_TYPES.ERROR);
  }, [getMessagesForField]);

  const getFieldStatus = useCallback((fieldName) => {
    const messages = getMessagesForField(fieldName);
    
    if (messages.length === 0) {
      return { status: 'valid', color: 'green', icon: '✅' };
    }
    
    const hasErrors = messages.some(m => m.type === VALIDATION_TYPES.ERROR);
    const hasWarnings = messages.some(m => m.type === VALIDATION_TYPES.WARNING);
    
    if (hasErrors) {
      return { status: 'error', color: 'red', icon: '❌' };
    } else if (hasWarnings) {
      return { status: 'warning', color: 'orange', icon: '⚠️' };
    } else {
      return { status: 'info', color: 'blue', icon: 'ℹ️' };
    }
  }, [getMessagesForField]);

  const getProgressIndicator = useCallback(() => {
    const { total, errors, critical } = messageStats;
    
    if (critical > 0) {
      return {
        status: 'blocked',
        message: `${critical} problème(s) critique(s) à résoudre`,
        color: 'red',
        percentage: 0
      };
    }
    
    if (errors > 0) {
      return {
        status: 'errors',
        message: `${errors} erreur(s) à corriger`,
        color: 'orange', 
        percentage: 30
      };
    }
    
    if (total > 0) {
      return {
        status: 'warnings',
        message: `${total} suggestion(s) d'amélioration`,
        color: 'yellow',
        percentage: 70
      };
    }
    
    return {
      status: 'valid',
      message: 'Configuration valide ✨',
      color: 'green',
      percentage: 100
    };
  }, [messageStats]);

  // ⏰ Auto-hide pour messages non-critiques
  useEffect(() => {
    if (autoHideDelay > 0) {
      priorityMessages.forEach(message => {
        if (message.canDismiss && message.type !== VALIDATION_TYPES.ERROR) {
          const messageKey = `${message.field}_${message.code}`;
          
          // Éviter de redémarrer le timer si déjà actif
          if (!autoHideTimers.current[messageKey] && !recentlyShown.has(messageKey)) {
            autoHideTimers.current[messageKey] = setTimeout(() => {
              dismissMessage(messageKey, false);
              delete autoHideTimers.current[messageKey];
            }, autoHideDelay);
            
            // Marquer comme récemment affiché
            setRecentlyShown(prev => new Set([...prev, messageKey]));
          }
        }
      });
    }
  }, [priorityMessages, autoHideDelay, dismissMessage, recentlyShown]);

  // 🧹 Nettoyage des timers au démontage
  useEffect(() => {
    return () => {
      Object.values(autoHideTimers.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  // 🎨 Fonctions de rendu pour composants
  
  const renderMessage = useCallback((message, options = {}) => {
    const { showActions = true, compact = false } = options;
    
    return {
      id: message.id,
      content: message.formattedMessage,
      suggestion: message.suggestion,
      style: message.style,
      canDismiss: message.canDismiss,
      hasAction: message.hasAction && showActions,
      actionLabel: message.actionLabel,
      compact,
      onDismiss: message.canDismiss ? () => dismissMessage(`${message.field}_${message.code}`) : null,
      onAction: message.hasAction ? () => handleMessageAction(message) : null
    };
  }, [dismissMessage]);

  const renderGroup = useCallback((groupName, messages, options = {}) => {
    const { collapsible = true, expanded = false } = options;
    const isExpanded = expanded || expandedGroups.has(groupName);
    
    return {
      name: groupName,
      title: formatGroupTitle(groupName),
      count: messages.length,
      status: getFieldStatus(groupName),
      messages: messages.map(msg => renderMessage(msg, options)),
      isExpanded,
      collapsible,
      onToggle: collapsible ? () => toggleGroup(groupName) : null
    };
  }, [expandedGroups, toggleGroup, getFieldStatus, renderMessage]);

  // 🏗️ Interface publique du hook
  return {
    // Messages et groupes
    groupedMessages,
    priorityMessages,
    messageStats,
    
    // Actions utilisateur
    dismissMessage,
    dismissAll,
    toggleGroup,
    clearDismissed,
    
    // Utilitaires de champ
    getMessagesForField,
    hasErrorsForField,
    getFieldStatus,
    getProgressIndicator,
    
    // Rendu pour composants
    renderMessage,
    renderGroup,
    
    // État UI
    expandedGroups,
    dismissedMessages,
    
    // Constantes pour styling
    FEEDBACK_STYLES,
    
    // Méthodes de filtrage
    filterMessagesByType: useCallback((type) => {
      return Object.values(groupedMessages).flat().filter(m => m.type === type);
    }, [groupedMessages]),
    
    filterMessagesByPriority: useCallback((maxPriority) => {
      return Object.values(groupedMessages).flat().filter(m => m.priority <= maxPriority);
    }, [groupedMessages])
  };
};

/**
 * 🧮 Fonctions utilitaires pour le feedback
 * Clean Code: "Extract till you drop"
 */

/**
 * Détermine le label d'action selon le type de résultat
 */
const getActionLabel = (result) => {
  switch (result.type) {
    case VALIDATION_TYPES.ERROR:
      return 'Corriger';
    case VALIDATION_TYPES.WARNING:
      return 'Améliorer';
    case VALIDATION_TYPES.INFO:
      return 'Voir plus';
    default:
      return 'Action';
  }
};

/**
 * Formate le titre d'un groupe de messages
 */
const formatGroupTitle = (groupName) => {
  const titles = {
    'workTime': '⏱️ Temps de travail',
    'restTime': '😴 Temps de repos', 
    'prepTime': '🏃 Temps de préparation',
    'rounds': '🔄 Nombre de rounds',
    'exercises': '🏋️‍♀️ Exercices',
    'name': '📝 Nom du workout',
    'description': '📋 Description',
    'difficulty': '🎯 Difficulté',
    'duration': '⏰ Durée',
    'ratio': '⚖️ Équilibre travail/repos',
    'general': '⚙️ Configuration générale'
  };
  
  return titles[groupName] || `📌 ${groupName}`;
};

/**
 * Gère les actions sur les messages de validation
 */
const handleMessageAction = (message) => {
  console.log(`🔧 Action sur message: ${message.code}`);
  
  // Ici on pourrait déclencher des actions spécifiques selon le code d'erreur
  switch (message.code) {
    case 'WORK_TIME_TOO_LOW':
      // Proposer d'augmenter automatiquement
      console.log('💡 Suggestion: augmenter temps de travail');
      break;
    case 'NO_EXERCISES':
      // Rediriger vers sélection d'exercices
      console.log('💡 Suggestion: ouvrir sélection exercices');
      break;
    case 'WORK_REST_RATIO_HIGH':
      // Proposer ajustement automatique
      console.log('💡 Suggestion: équilibrer ratio travail/repos');
      break;
    default:
      console.log('💡 Action générique');
  }
};

/**
 * 🎯 Hook composé pour validation + feedback
 * Pragmatic Programmer: "DRY - Don't Repeat Yourself"
 */
export const useWorkoutValidationWithFeedback = (configState, validationOptions = {}, feedbackOptions = {}) => {
  // Utilisation du hook de validation principal (sera importé)
  // const validation = useWorkoutValidation(configState);
  // const validationResults = validation.validateComplete(configState, validationOptions);
  
  // Pour l'instant, on simule les résultats
  const mockValidationResults = {
    isValid: true,
    results: [],
    errors: [],
    warnings: [],
    infos: []
  };
  
  const feedback = useValidationFeedback(mockValidationResults, feedbackOptions);
  
  return {
    // Validation
    // ...validation,
    // validationResults,
    
    // Feedback
    ...feedback,
    
    // Interface unifiée
    isValid: mockValidationResults.isValid,
    canProceed: !feedback.messageStats.hasBlockingErrors,
    validationSummary: {
      score: 85, // mockValidationResults.summary?.completionScore || 0,
      issues: feedback.messageStats.total,
      critical: feedback.messageStats.critical
    }
  };
};

export default useValidationFeedback;