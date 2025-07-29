# 🏋️ WorkoutApp - Application de Gestion d'Entraînement

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Application React complète de gestion d'entraînements** avec système audio contextuel intelligent, progression automatique d'exercices et **messages motivationnels adaptatifs**.

---

## 📋 Vue d'ensemble

WorkoutApp est une application moderne de fitness développée avec **React 19** et **Vite**, suivant les principes du **Clean Code** et du **Pragmatic Programmer**. L'application permet de créer, personnaliser et exécuter des séances d'entraînement avec un timer automatique intelligent, une progression automatique d'exercices, un **système audio contextuel adaptatif** et des **messages motivationnels intelligents**.

### ✨ Fonctionnalités principales

- 🎯 **Configuration de séance personnalisée** - Interface wizard en 3 étapes pour créer vos workouts
- ⏱️ **Timer automatique intelligent** - Système de minuteur en temps réel avec progression automatique
- 🧠 **Intelligence contextuelle** - Détection automatique des phases et adaptation du feedback
- 🎵 **Audio contextuel adaptatif** - Sons, vibrations et motivations selon votre progression
- 💬 **Messages motivationnels intelligents** - Encouragements contextuels à 50%, 80%, 95% de progression
- 🏋️ **Base de données d'exercices étendue** - 7 exercices avec instructions détaillées et animations
- 📊 **Suivi de progression temps réel** - Barres de progression et statistiques live
- 🔔 **Notifications de phase intelligentes** - Alertes sonores et visuelles contextuelles
- 🎨 **Interface moderne** - Design responsive avec aperçu de l'exercice suivant

### 🏗️ Architecture technique

- **Frontend :** React 19 avec hooks avancés (useReducer, useCallback, useMemo, useLayoutEffect)
- **Build :** Vite pour un développement rapide et optimisé
- **Styling :** Tailwind CSS pour un design moderne et responsive
- **Gestion d'état :** Architecture Redux-like avec useReducer personnalisé
- **Timer System :** setInterval avec progression automatique et détection de phases
- **Audio Engine :** Web Audio API + Navigator Vibration API pour feedback contextuel
- **Motivation System :** Messages adaptatifs avec animations fluides et auto-hide
- **Patterns :** Clean Code, DRY, Single Responsibility Principle

---

## 🚀 Installation et démarrage

### Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js** (version 18 ou supérieure) - [Télécharger Node.js](https://nodejs.org/)
- **pnpm** (gestionnaire de paquets recommandé) - [Installer pnpm](https://pnpm.io/installation)

> **Alternative :** Vous pouvez utiliser `npm` ou `yarn`, mais `pnpm` est recommandé pour de meilleures performances.

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone <url-du-repository>
   cd workoutapp
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   ```
   
   Ou avec npm/yarn :
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   pnpm dev
   ```
   
   Ou avec npm/yarn :
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Ouvrir l'application**
   
   L'application sera accessible à l'adresse : **http://localhost:5173**

### Scripts disponibles

```bash
# Démarrage du serveur de développement
pnpm dev

# Build de production
pnpm build

# Aperçu du build de production
pnpm preview

# Linting du code
pnpm lint
```

---

## 🎮 Utilisation rapide

### Démarrage d'un workout

1. **Page d'accueil :** Sélectionnez un plan prédéfini ou créez le vôtre
2. **Configuration :** Personnalisez les temps de travail, repos et nombre de rounds
3. **Sélection d'exercices :** Choisissez parmi notre catalogue de 7 exercices
4. **Séance active :** Lancez votre workout avec timer automatique, audio contextuel et messages motivationnels

### Navigation principale

- 🏠 **Accueil** - Sélection de plans et démarrage rapide
- ⚙️ **Configuration** - Création de workouts personnalisés en 3 étapes
- ⏰ **Timer Auto** - Séance active avec minuteur automatique, audio contextuel et motivation
- 🧪 **Tests** - Validation des composants et architecture
- 🧠 **Démo** - Démonstration des hooks et reducers

---

## 💬 Système de Motivation Contextuelle (WA-011.3)

### Messages motivationnels intelligents

- **🎯 Messages de progression** - Encouragements automatiques à 50%, 80%, 95%
- **🔥 Messages contextuels** - Adaptés au premier/dernier round
- **💪 Conseils techniques** - Rappels de respiration et technique pendant les repos
- **🎨 Affichage discret** - Positionnement en bas d'écran sans interrompre le workout
- **⏱️ Auto-hide temporisé** - Disparition automatique après 3-4 secondes

### Types de messages

L'application génère automatiquement :
- **Messages milestone** - "🔥 Excellent ! Vous êtes à mi-parcours !" (50%)
- **Messages encouragement** - "💪 Plus qu'un effort ! Vous y êtes presque !" (80%)
- **Messages celebration** - "🚀 Dernier sprint ! La victoire est à portée !" (95%)
- **Messages technique** - "🫁 Respirez profondément pendant le repos"

---

## 🎵 Système Audio Contextuel (WA-011.2)

### Fonctionnalités audio avancées

- **🎯 Sons contextuels** - Audio adaptatif selon la phase du workout
- **📳 Vibrations intelligentes** - Patterns de vibration selon l'intensité
- **💪 Motivations automatiques** - Encouragements selon votre progression
- **🎉 Célébrations épiques** - Feedback spécial pour les achievements
- **🔊 Volume adaptatif** - Ajustement automatique selon l'effort

### Intelligence contextuelle

L'application détecte automatiquement :
- **Phase de démarrage** - Sons énergiques pour commencer
- **Transitions d'exercice** - Notifications fluides entre mouvements
- **Repos actif** - Audio apaisant pendant la récupération
- **Sprint final** - Intensification motivationnelle
- **Completion** - Célébration épique de fin de workout

---

## 🛠️ Technologies utilisées

### Dépendances principales

| Package | Version | Usage |
|---------|---------|-------|
| **React** | 19.1.0 | Framework frontend |
| **React DOM** | 19.1.0 | Rendu DOM |
| **Prop Types** | 15.8.1 | Validation des types |

### Outils de développement

| Package | Version | Usage |
|---------|---------|-------|
| **Vite** | 7.0.4 | Build tool et serveur dev |
| **Tailwind CSS** | 3.4.3 | Framework CSS utilitaire |
| **ESLint** | 9.31.0 | Linting JavaScript/React |
| **Prettier** | 3.6.2 | Formatage de code |
| **PostCSS** | 8.5.6 | Traitement CSS |

---

## 📁 Structure du projet

```
workoutapp/
├── public/                 # Assets statiques
├── src/
│   ├── components/         # Composants React
│   │   ├── layout/         # Composants de mise en page
│   │   ├── ui/             # Composants UI réutilisables
│   │   └── views/          # Vues principales
│   ├── hooks/              # Hooks personnalisés
│   │   ├── useWorkout.js           # Hook principal workout
│   │   ├── useWorkoutTimer.js      # Timer automatique
│   │   ├── usePhaseContext.js      # Intelligence contextuelle
│   │   ├── useAudioEngine.js       # Moteur audio Web API
│   │   ├── useWorkoutAudio.js      # Audio contextuel intégré
│   │   └── useMotivationMessages.js # Messages motivationnels
│   ├── reducers/           # Reducers pour gestion d'état
│   ├── actions/            # Actions pour reducers
│   ├── data/               # Données statiques (exercices + messages)
│   │   ├── exercices.js            # Base de données exercices
│   │   └── motivationMessages.js   # Messages motivationnels
│   ├── constants/          # Constantes de l'application
│   ├── styles/             # Styles globaux + animations
│   └── main.jsx            # Point d'entrée
├── tailwind.config.js      # Configuration Tailwind
├── vite.config.js          # Configuration Vite
└── package.json            # Dépendances et scripts
```

---

## 🧪 Développement et tests

### Validation des composants

L'application inclut une suite de tests intégrée accessible via l'onglet **Tests** :

- ✅ Tests d'état React avec useState
- ✅ Validation des structures de données
- ✅ Tests des calculs de workout
- ✅ Simulation d'opérations asynchrones
- ✅ Validation de l'intégrité des données
- ✅ Tests du système audio contextuel
- ✅ Tests des messages motivationnels

### Code Quality

Le projet suit les principes du **Clean Code** :

- 📖 **The Pragmatic Programmer** - Architecture pragmatique et évolutive
- 📚 **Clean Code** - Code lisible et maintenable
- 🏗️ **Architecture modulaire** - Composants réutilisables et testables
- 🎯 **PropTypes** - Validation des types pour la fiabilité

---

## 🚧 État du développement

### Tickets complétés ✅

- **WA-001** : Setup projet React + structure dossiers
- **WA-002** : Types JavaScript + données statiques  
- **WA-003** : Layout principal + navigation
- **WA-004** : Composant de test simple
- **WA-005** : Reducer principal du workout
- **WA-006** : Actions de base (start/pause/stop)
- **WA-007** : État de configuration du workout
- **WA-008** : Hook useWorkout personnalisé + PropTypes
- **WA-009** : Timer automatique avec setInterval
- **WA-010** : Progression automatique d'exercice + notifications de phase
- **WA-010.FIX_1** : Aperçu exercice suivant + fix notifications auto-hide
- **WA-010.FEAT_1** : Petite extension base de données exercices (7 exercices total)
- **WA-011.1** : Intelligence contextuelle des phases
- **WA-011.2** : Système audio contextuel complet
- **WA-011.3** : Messages motivationnels contextuels

### 🎯 Ticket en cours 🔄

### ⏱️ Phase 3: Système de minuteur (EN COURS)
| Ticket | Priorité | Status | Description |
|--------|----------|--------|-------------|
| **WA-012** | 🟢 Medium | ⏳ **PROCHAINE ÉTAPE** | Affichage timer formaté avec animations |

---

## 📋 Epic: Workout Configuration

### ⚙️ Phase 4: Interface de configuration
| Ticket | Priorité | Complexité | Description |
|--------|----------|------------|-------------|
| **WA-013** | 🟡 High | M | Formulaire de configuration avancé |
| **WA-014** | 🟡 High | S | Sélection d'exercices par catégorie |
| **WA-015** | 🟢 Medium | M | Validation des paramètres temps réel |
| **WA-016** | 🟢 Medium | S | Prévisualisation config avec estimations |

---

## 📋 Epic: Exercise Display

### 🏋️ Phase 5: Affichage des exercices
| Ticket | Priorité | Complexité | Description |
|--------|----------|------------|-------------|
| **WA-017** | 🟡 High | M | Composant ExerciseDisplay amélioré |
| **WA-018** | 🟡 High | S | Images d'exercices dynamiques |
| **WA-019** | 🟢 Medium | M | Animation entre images et transitions |
| **WA-020** | 🟢 Medium | S | Instructions textuelles contextuelles |

---

## 📋 Epic: Progress & Analytics

### 📊 Phase 6: Progression et feedback
| Ticket | Priorité | Complexité | Description |
|--------|----------|------------|-------------|
| **WA-021** | 🟡 High | M | Barre de progression globale avancée |
| **WA-022** | 🟡 High | S | Pourcentage d'avancement temps réel |
| **WA-023** | 🟢 Medium | M | Groupe musculaire actuel avec feedback |
| **WA-024** | 🟢 Medium | L | Résumé de séance avec statistiques |

---

## 📋 Epic: Performance & Polish

### 🚀 Phase 7: Optimisation et finitions
| Ticket | Priorité | Complexité | Description |
|--------|----------|------------|-------------|
| **WA-025** | 🟢 Medium | M | useCallback sur fonctions timer optimisé |
| **WA-026** | 🟢 Medium | S | Mémorisation calculs lourds avec useMemo |
| **WA-027** | 🟢 Medium | M | Context pour état global workout |
| **WA-028** | 🔵 Low | S | Styles et responsive mobile-first |

---

## 📋 Epic: Advanced Features

### 🎯 Phase 8: Fonctionnalités avancées
| Ticket | Priorité | Complexité | Description |
|--------|----------|------------|-------------|
| **WA-029** | 🔵 Low | M | Notifications audio avec Web Audio API |
| **WA-030** | 🔵 Low | L | Persistance localStorage workout history |
| **WA-031** | 🔵 Low | M | Mode plein écran immersif |
| **WA-032** | 🔵 Low | XL | API ExerciseDB integration externe |

---

## 💬 Fonctionnalités Motivation Actuelles (WA-011.3)

### ✅ Système de messages contextuels complet
- **Messages de progression** : Encouragements automatiques à 50%, 80%, 95%
- **Messages de phase** : Premier round, dernier round, transitions
- **Messages techniques** : Conseils respiration et forme pendant repos
- **Affichage intelligent** : Positionnement discret en bas d'écran
- **Animations fluides** : Entrée/sortie avec transitions CSS
- **Auto-hide temporisé** : Disparition automatique sans interaction

### ✅ Interface de test intégrée
- **Panel de développement** : Tests manuels des différents types de messages
- **Statistiques temps réel** : Nombre de messages affichés et historique
- **Contrôles debug** : Force show, hide, reset du système
- **Historique complet** : Log des messages avec timestamp et progression

### ✅ Architecture extensible
- **Base de données messages** : Structure modulaire pour nouveaux types
- **Hook réutilisable** : useMotivationMessages pour autres composants
- **Protection anti-spam** : Évite les répétitions et conflits
- **Performance optimisée** : Timeouts gérés et cleanup automatique

---

## 🎵 Fonctionnalités Audio Actuelles (WA-011.2)

### ✅ Système audio contextuel complet
- **9+ contextes intelligents** : Détection automatique des moments-clés
- **Sons adaptatifs** : Fréquences et volumes selon l'intensité
- **Vibrations contextuelles** : Patterns personnalisés par situation
- **Motivations automatiques** : Encouragements basés sur la progression
- **Célébrations épiques** : Feedback spécial pour achievements
- **Volume adaptatif** : Ajustement selon fatigue et effort

### ✅ Intégration workout complète
- **Déclenchement automatique** : Audio selon changements de phase
- **Fallback gracieux** : Fonctionnement sans audio si non supporté
- **Configuration flexible** : Enable/disable par type de feedback
- **Performance optimisée** : Pas d'impact sur le timer principal

---

## 🔄 Prochaines Étapes

### 🎯 **WA-012 : Timer Formaté avec Animations (IMMÉDIAT)**
- **Timer visuel amélioré** : Animations fluides et formatage professionnel
- **Transitions entre phases** : Effets visuels pour changements d'état
- **Indicateurs visuels** : Progression avec couleurs adaptatives
- **Responsive design** : Optimisation mobile et desktop

### ⚙️ **WA-013-016 : Interface de Configuration (COURT TERME)**
- **Formulaires avancés** : Configuration workout en 3 étapes
- **Sélection exercices** : Interface intuitive par catégorie
- **Validation temps réel** : Feedback immédiat sur paramètres
- **Prévisualisation** : Estimation durée et difficulté

### 🏋️ **WA-017-020 : Affichage Exercices (MOYEN TERME)**
- **Images dynamiques** : Affichage visuel des exercices
- **Animations transitions** : Fluidité entre mouvements
- **Instructions contextuelles** : Conseils adaptatifs
- **Composant ExerciseDisplay** : Module réutilisable

---

## 🤝 Contribution

Ce projet est actuellement en **développement actif**. Je m'aide de *Claude Sonnet 4* au cours du développement!

### Standards de développement

- 📝 **Clean Code** : Fonctions courtes et expressives
- 🧪 **Testing** : Tests unitaires avec validation
- 📖 **Documentation** : PropTypes et commentaires JSDoc
- 🎨 **UI/UX** : Design moderne et responsive
- ⚡ **Performance** : Hooks optimisés avec useCallback et useMemo
- 🎵 **Audio UX** : Feedback contextuel et adaptatif
- 💬 **Motivation UX** : Encouragements discrets et intelligents

---

## 📊 Métriques du projet

### 🎯 Progression générale
- **Tickets complétés** : 15/32 (46.87%)
- **Hooks avancés** : 9+ hooks personnalisés
- **Composants** : 25+ composants réutilisables
- **Architecture** : Clean Code + Pragmatic Programmer appliqués
- **Système audio** : 100% fonctionnel avec tests complets
- **Système motivation** : 100% fonctionnel avec messages contextuels

### 🏋️ Données fitness
- **Exercices disponibles** : 7 mouvements
- **Groupes musculaires** : 5 catégories
- **Plans prédéfinis** : 3 workouts + presets avancés
- **Timer précision** : ±50ms (setInterval optimisé)
- **Contextes audio** : 9+ situations intelligentes
- **Types de sons** : 7+ sons contextuels adaptatifs
- **Messages motivation** : 8+ messages contextuels

### 💬 Capacités motivationnelles
- **Messages de progression** : Déclenchement automatique à 50%, 80%, 95%
- **Messages contextuels** : Premier/dernier round, transitions
- **Messages techniques** : Conseils respiration et forme
- **Animations CSS** : Transitions fluides avec Tailwind
- **Auto-hide intelligent** : Disparition temporisée sans interruption
- **Tests intégrés** : Panel debug avec statistiques temps réel

### 🎵 Capacités audio
- **Web Audio API** : Génération de sons en temps réel
- **Vibration API** : Patterns adaptatifs selon contexte
- **Volume adaptatif** : Ajustement selon intensité
- **Fallback gracieux** : Fonctionnement sans audio
- **Tests automatisés** : 6 suites de validation complètes

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

**Bryan Diffo**
- 📧 Email : bryandiffo@gmail.com
---

## 🙏 Remerciements

Développé en suivant les principes des livres :
- 📖 **The Pragmatic Programmer: From Journeyman to Master**
- 📚 **Clean Code: A Handbook of Agile Software Craftsmanship**

Avec l'assistance de **Claude Sonnet 4** pour l'architecture et les systèmes audio/motivation contextuels !

---

*WorkoutApp - Transformez vos séances d'entraînement avec l'intelligence audio contextuelle et la motivation adaptative* 🚀💪🎵💬