# 🏋️ WorkoutApp - Application de Gestion d'Entraînement

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Application React complète de gestion d'entraînements** mettant l'accent sur la gestion d'état complexe, les hooks avancés et les patterns React professionnels.

---

## 📋 Vue d'ensemble

WorkoutApp est une application moderne de fitness développée avec **React 19** et **Vite**, suivant les principes du **Clean Code** et du **Pragmatic Programmer**. L'application permet de créer, personnaliser et exécuter des séances d'entraînement avec un timer automatique intelligent.

### ✨ Fonctionnalités principales

- 🎯 **Configuration de séance personnalisée** - Interface intuitive pour créer vos workouts
- ⏱️ **Timer automatique intelligent** - Système de minuteur en temps réel avec gestion des phases
- 🏋️ **Base de données d'exercices** - Catalogue complet avec instructions et groupes musculaires
- 📊 **Suivi de progression** - Barres de progression et statistiques en temps réel
- 🎨 **Interface moderne** - Design responsive avec Tailwind CSS
- 🧠 **Architecture propre** - Hooks personnalisés et gestion d'état avec useReducer

### 🏗️ Architecture technique

- **Frontend :** React 19 avec hooks avancés (useReducer, useCallback, useMemo)
- **Build :** Vite pour un développement rapide et optimisé
- **Styling :** Tailwind CSS pour un design moderne et responsive
- **Gestion d'état :** Architecture Redux-like avec useReducer personnalisé
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
3. **Sélection d'exercices :** Choisissez parmi notre catalogue d'exercices
4. **Séance active :** Lancez votre workout avec timer automatique

### Navigation principale

- 🏠 **Accueil** - Sélection de plans et démarrage rapide
- ⚙️ **Configuration** - Création de workouts personnalisés
- ⏰ **Timer Auto** - Séance active avec minuteur automatique
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
│   ├── data/               # Données statiques
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

### Prochaines étapes 🔄

### ⏱️ Phase 3: Système de minuteur
| Ticket | Priorité | Complexité | Description |
|--------|----------|------------|-------------|
| **WA-009** | 🔴 Critical | L | Hook useTimer avec setInterval |
| **WA-010** | 🔴 Critical | M | Logique de progression d'exercice |
| **WA-011** | 🟡 High | M | Phases (préparation/travail/repos) |
| **WA-012** | 🟢 Medium | S | Affichage timer formaté |

---

## 📋 Epic: Workout Configuration

### ⚙️ Phase 4: Interface de configuration
| Ticket | Priorité | Complexité | Description |
|--------|----------|------------|-------------|
| **WA-013** | 🟡 High | M | Formulaire de configuration |
| **WA-014** | 🟡 High | S | Sélection d'exercices |
| **WA-015** | 🟢 Medium | M | Validation des paramètres |
| **WA-016** | 🟢 Medium | S | Prévisualisation config |

---

## 📋 Epic: Exercise Display

### 🏋️ Phase 5: Affichage des exercices
| Ticket | Priorité | Complexité | Description |
|--------|----------|------------|-------------|
| **WA-017** | 🟡 High | M | Composant ExerciseDisplay |
| **WA-018** | 🟡 High | S | Images d'exercices (statiques) |
| **WA-019** | 🟢 Medium | M | Animation entre images |
| **WA-020** | 🟢 Medium | S | Instructions textuelles |

---

## 📋 Epic: Progress & Analytics

### 📊 Phase 6: Progression et feedback
| Ticket | Priorité | Complexité | Description |
|--------|----------|------------|-------------|
| **WA-021** | 🟡 High | M | Barre de progression globale |
| **WA-022** | 🟡 High | S | Pourcentage d'avancement |
| **WA-023** | 🟢 Medium | M | Groupe musculaire actuel |
| **WA-024** | 🟢 Medium | L | Résumé de séance |

---

## 📋 Epic: Performance & Polish

### 🚀 Phase 7: Optimisation et finitions
| Ticket | Priorité | Complexité | Description |
|--------|----------|------------|-------------|
| **WA-025** | 🟢 Medium | M | useCallback sur fonctions timer |
| **WA-026** | 🟢 Medium | S | Mémorisation calculs lourds |
| **WA-027** | 🟢 Medium | M | Context pour état global |
| **WA-028** | 🔵 Low | S | Styles et responsive |

---

## 📋 Epic: Advanced Features

### 🎯 Phase 8: Fonctionnalités avancées
| Ticket | Priorité | Complexité | Description |
|--------|----------|------------|-------------|
| **WA-029** | 🔵 Low | M | Notifications audio |
| **WA-030** | 🔵 Low | L | Persistance localStorage |
| **WA-031** | 🔵 Low | M | Mode plein écran |
| **WA-032** | 🔵 Low | XL | API ExerciseDB integration |

---

## 🤝 Contribution

Ce projet est actuellement en **développement actif**. Je m'aide de *Claude Sonnet 4* au cours du développement!

### Standards de développement

- 📝 **Clean Code** : Fonctions courtes et expressives
- 🧪 **Testing** : Tests unitaires avec validation
- 📖 **Documentation** : PropTypes et commentaires JSDoc
- 🎨 **UI/UX** : Design moderne et responsive

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

**Bryan Diffo**
- 📧 Email : bryandiffo@gmail.com
- 📱 Téléphone : xxx-xxx-xxxx
- 📍 Localisation : xxxxxxxxx, QC

---

## 🙏 Remerciements

Développé en suivant les principes des livres :
- 📖 **The Pragmatic Programmer: From Journeyman to Master**
- 📚 **Clean Code: A Handbook of Agile Software Craftsmanship**

---

*WorkoutApp - Transformez vos séances d'entraînement* 🚀