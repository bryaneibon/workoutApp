# 🏋️ WorkoutApp - Application de Gestion d'Entraînement

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Application React complète de gestion d'entraînements** mettant l'accent sur la gestion d'état complexe, les hooks avancés et les patterns React professionnels.

---

## 📋 Vue d'ensemble

WorkoutApp est une application moderne de fitness développée avec **React 19** et **Vite**, suivant les principes du **Clean Code** et du **Pragmatic Programmer**. L'application permet de créer, personnaliser et exécuter des séances d'entraînement avec un timer automatique intelligent et une progression automatique d'exercices.

### ✨ Fonctionnalités principales

- 🎯 **Configuration de séance personnalisée** - Interface wizard en 3 étapes pour créer vos workouts
- ⏱️ **Timer automatique intelligent** - Système de minuteur en temps réel avec progression automatique
- 🏋️ **Base de données d'exercices étendue** - 7 exercices avec instructions détaillées et animations
- 📊 **Suivi de progression temps réel** - Barres de progression et statistiques live
- 🔔 **Notifications de phase** - Alertes sonores et visuelles pour les changements d'exercice
- 🎨 **Interface moderne** - Design responsive avec aperçu de l'exercice suivant
- 🧠 **Architecture propre** - Hooks personnalisés et gestion d'état avec useReducer

### 🏗️ Architecture technique

- **Frontend :** React 19 avec hooks avancés (useReducer, useCallback, useMemo, useLayoutEffect)
- **Build :** Vite pour un développement rapide et optimisé
- **Styling :** Tailwind CSS pour un design moderne et responsive
- **Gestion d'état :** Architecture Redux-like avec useReducer personnalisé
- **Timer System :** setInterval avec progression automatique et détection de phases
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
4. **Séance active :** Lancez votre workout avec timer automatique et progression

### Navigation principale

- 🏠 **Accueil** - Sélection de plans et démarrage rapide
- ⚙️ **Configuration** - Création de workouts personnalisés en 3 étapes
- ⏰ **Timer Auto** - Séance active avec minuteur automatique et exercice suivant
- 🧪 **Tests** - Validation des composants et architecture
- 🧠 **Démo** - Démonstration des hooks et reducers

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
│   ├── reducers/           # Reducers pour gestion d'état
│   ├── actions/            # Actions pour reducers
│   ├── data/               # Données statiques (7 exercices)
│   ├── constants/          # Constantes de l'application
│   ├── styles/             # Styles globaux
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

### 🎯 Ticket en cours 🔄

### ⏱️ Phase 3: Système de minuteur (EN COURS)
| Ticket | Priorité | Status | Description |
|--------|----------|--------|-------------|
| **WA-011** | 🟡 High | 🔄 **EN COURS** | Phases (préparation/travail/repos) - Gestion intelligente |
| **WA-012** | 🟢 Medium | ⏳ En attente | Affichage timer formaté avec animations |

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

## 🎯 Fonctionnalités actuelles

### ✅ Système de timer automatique complet
- Timer précis avec setInterval (1 seconde)
- Progression automatique exercice → repos → exercice suivant
- Détection intelligente de fin de workout
- Notifications de changement de phase avec sons et vibrations

### ✅ Interface utilisateur avancée
- Aperçu de l'exercice suivant avec effet flouté
- Notifications auto-disparition après 5 secondes
- Layout 3 colonnes : Timer / Exercice actuel / Exercice suivant
- Interface responsive mobile et desktop

### ✅ Base de données d'exercices étendue
- **7 exercices** : push-ups, squats, plank, jumping-jacks, burpees, shadow-boxing, explosive push-ups
- **5 groupes musculaires** : Pectoraux, Jambes, Abdominaux, Cardio, Full Body
- **3 niveaux de difficulté** : Débutant, Intermédiaire, Avancé
- Instructions détaillées et emojis pour chaque exercice

---

## 🔄 Prochaine milestone : WA-011

### 🎯 Objectif WA-011 : Gestion intelligente des phases
- **Phases automatiques** : PREP → WORK → REST → NEXT EXERCISE
- **Transitions fluides** avec animations et feedback visuel
- **Gestion des contextes** : Round transitions, workout completion
- **Smart timing** : Adaptation des temps selon la difficulté
- **Audio feedback** amélioré pour chaque transition de phase

---

## 🤝 Contribution

Ce projet est actuellement en **développement actif**. Je m'aide de *Claude Sonnet 4* au cours du développement!

### Standards de développement

- 📝 **Clean Code** : Fonctions courtes et expressives
- 🧪 **Testing** : Tests unitaires avec validation
- 📖 **Documentation** : PropTypes et commentaires JSDoc
- 🎨 **UI/UX** : Design moderne et responsive
- ⚡ **Performance** : Hooks optimisés avec useCallback et useMemo

---

## 📊 Métriques du projet

### 🎯 Progression générale
- **Tickets complétés** : 12/32 (37.5%)
- **Hooks avancés** : 5+ hooks personnalisés
- **Composants** : 15+ composants réutilisables
- **Architecture** : Clean Code + Pragmatic Programmer appliqués

### 🏋️ Données fitness
- **Exercices disponibles** : 7 mouvements
- **Groupes musculaires** : 5 catégories
- **Plans prédéfinis** : 2 workouts + 3 presets avancés
- **Timer précision** : ±50ms (setInterval optimisé)

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

Avec l'assistance de **Claude Sonnet 4** !!!

---

*WorkoutApp - Transformez vos séances d'entraînement* 🚀💪