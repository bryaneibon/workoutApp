// src/data/motivationMessages.js
// 🎯 WA-011.3: Messages motivationnels contextuels
// Référence Clean Code: "Use meaningful names for constants"

/**
 * @typedef {Object} MotivationMessage
 * @property {string} id - Identifiant unique du message
 * @property {number} trigger - Pourcentage de progression pour déclencher (0-100)
 * @property {string} message - Message motivationnel à afficher
 * @property {number} duration - Durée d'affichage en millisecondes
 * @property {string} type - Type de motivation (milestone, encouragement, celebration)
 * @property {string} color - Couleur du gradient pour l'affichage
 */

/**
 * 🎯 Messages motivationnels par étapes de progression
 * Clean Code: "Make meaningful distinctions"
 */
export const MOTIVATION_MESSAGES = {
  HALFWAY_POINT: {
    id: 'halfway',
    trigger: 50,
    message: "🔥 Excellent ! Vous êtes à mi-parcours !",
    duration: 3000,
    type: 'milestone',
    color: 'from-emerald-500 to-blue-500'
  },
  
  FINAL_PUSH: {
    id: 'final_push',
    trigger: 80,
    message: "💪 Plus qu'un effort ! Vous y êtes presque !",
    duration: 4000,
    type: 'encouragement',
    color: 'from-orange-500 to-red-500'
  },
  
  COMPLETION_READY: {
    id: 'completion',
    trigger: 95,
    message: "🚀 Dernier sprint ! La victoire est à portée !",
    duration: 3000,
    type: 'celebration',
    color: 'from-purple-500 to-pink-500'
  }
};

/**
 * 🎯 Messages motivationnels par contexte de phase
 * Pragmatic Programmer: "DRY - Don't Repeat Yourself"
 */
export const PHASE_MOTIVATION_MESSAGES = {
  FIRST_ROUND: {
    id: 'first_round',
    message: "🚀 Premier round ! Trouvez votre rythme !",
    duration: 2500,
    type: 'encouragement',
    color: 'from-blue-500 to-cyan-500'
  },
  
  FINAL_ROUND: {
    id: 'final_round',
    message: "🏁 Dernier round ! Donnez tout ce que vous avez !",
    duration: 3500,
    type: 'celebration',
    color: 'from-red-500 to-yellow-500'
  },
  
  MID_WORKOUT_BOOST: {
    id: 'mid_boost',
    message: "⚡ Vous gérez ! Gardez cette intensité !",
    duration: 2000,
    type: 'encouragement',
    color: 'from-green-500 to-emerald-500'
  }
};

/**
 * 🎯 Messages de récupération et technique
 * Clean Code: "Functions should be small"
 */
export const RECOVERY_MESSAGES = {
  BREATH_REMINDER: {
    id: 'breathing',
    message: "🫁 Respirez profondément pendant le repos",
    duration: 2500,
    type: 'technique',
    color: 'from-blue-400 to-indigo-400'
  },
  
  FORM_FOCUS: {
    id: 'form',
    message: "🎯 Qualité avant vitesse ! Concentrez-vous sur la forme",
    duration: 3000,
    type: 'technique',
    color: 'from-amber-500 to-orange-500'
  }
};

/**
 * 🔧 Utilitaires pour les messages motivationnels
 * Pragmatic Programmer: "Use intention-revealing names"
 */

/**
 * Récupère un message motivationnel selon la progression
 * @param {number} progressPercentage - Pourcentage de progression (0-100)
 * @param {Set} shownMessages - Set des IDs de messages déjà affichés
 * @returns {MotivationMessage|null} Message à afficher ou null
 */
export const getProgressMotivationMessage = (progressPercentage, shownMessages) => {
  // Parcourir les messages par ordre de trigger
  const sortedMessages = Object.values(MOTIVATION_MESSAGES)
    .sort((a, b) => a.trigger - b.trigger);
  
  for (const message of sortedMessages) {
    if (progressPercentage >= message.trigger && !shownMessages.has(message.id)) {
      return message;
    }
  }
  
  return null;
};

/**
 * Récupère un message selon le contexte de phase
 * @param {string} phaseContext - Contexte de la phase actuelle
 * @param {Object} workoutState - État du workout
 * @param {Set} shownMessages - Set des IDs de messages déjà affichés
 * @returns {MotivationMessage|null} Message contextuel ou null
 */
export const getPhaseMotivationMessage = (phaseContext, workoutState, shownMessages) => {
  // Messages contextuels selon la phase
  if (workoutState.currentRound === 1 && !shownMessages.has('first_round')) {
    return PHASE_MOTIVATION_MESSAGES.FIRST_ROUND;
  }
  
  if (workoutState.currentRound === workoutState.totalRounds && !shownMessages.has('final_round')) {
    return PHASE_MOTIVATION_MESSAGES.FINAL_ROUND;
  }
  
  // Message boost en milieu de workout (rounds intermédiaires)
  const isMidWorkout = workoutState.currentRound > 1 && 
                      workoutState.currentRound < workoutState.totalRounds &&
                      !shownMessages.has('mid_boost');
  
  if (isMidWorkout && Math.random() > 0.7) { // 30% de chance
    return PHASE_MOTIVATION_MESSAGES.MID_WORKOUT_BOOST;
  }
  
  return null;
};

/**
 * Récupère un message de récupération pendant les repos
 * @param {string} restPhase - Phase de repos
 * @param {Set} shownMessages - Messages déjà affichés
 * @returns {MotivationMessage|null} Message de récupération ou null
 */
export const getRecoveryMessage = (restPhase, shownMessages) => {
  const messages = Object.values(RECOVERY_MESSAGES);
  const availableMessages = messages.filter(msg => !shownMessages.has(msg.id));
  
  if (availableMessages.length === 0) return null;
  
  // Sélection aléatoire parmi les messages disponibles
  const randomIndex = Math.floor(Math.random() * availableMessages.length);
  return availableMessages[randomIndex];
};

/**
 * 📊 Statistiques des messages motivationnels
 * Clean Code: "Separate concerns"
 */
export const getMotivationStats = () => {
  const totalMessages = Object.keys(MOTIVATION_MESSAGES).length +
                       Object.keys(PHASE_MOTIVATION_MESSAGES).length +
                       Object.keys(RECOVERY_MESSAGES).length;
  
  return {
    totalMessages,
    progressMessages: Object.keys(MOTIVATION_MESSAGES).length,
    phaseMessages: Object.keys(PHASE_MOTIVATION_MESSAGES).length,
    recoveryMessages: Object.keys(RECOVERY_MESSAGES).length,
    types: ['milestone', 'encouragement', 'celebration', 'technique']
  };
};