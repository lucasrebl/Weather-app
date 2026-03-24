# 🚀 Dashboard Météo

Un tableau de bord météorologique moderne qui offre des informations météorologiques en temps réel et des prévisions détaillées en utilisant l'API Open-Meteo.

🌐 **[Voir la démo en ligne](http://localhost:5173)**

![Vue 3](https://img.shields.io/badge/Vue-3.4.38-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square&logo=vite&logoColor=white)

## 📖 Description

**Weather Dashboard** est une application web interactive qui vous permet de consulter les conditions météorologiques en temps réel et les prévisions pour n'importe quel endroit du monde. L'application offre une interface intuitive et réactive qui fonctionne parfaitement sur tous les appareils.

Cette application résout le besoin d'accéder rapidement aux données météorologiques complètes et à jour sans tracas, avec une cartographie interactive pour une exploration géographique.

## ✨ Fonctionnalités

### 🔍 Recherche de Ville Avancée
- Recherche en temps réel pour n'importe quelle ville du monde
- Autocomplétion des suggestions de villes
- Sélection facile et rapide de votre localité

### 🌡️ Météo Actuelle
- Température actuelle en temps réel
- Condition météorologique avec icônes
- Taux d'humidité
- Vitesse du vent
- Précipitations

### 📊 Prévisions sur 7 Jours
- Prévisions météorologiques détaillées pour la semaine
- Graphiques de tendance
- Données horaires et quotidiennes

### 🗺️ Carte Interactives
- Cliquez sur n'importe quel point de la carte pour obtenir la météo
- Navigation fluide et intuitive
- Localisation géographique en temps réel

### 📱 Design Responsive
- Interface adaptée aux écrans desktop, tablettes et mobiles
- Navigation fluide et performante

## 🚀 Installation

### Prérequis
- **Node.js** : v14 ou supérieur
- **npm** ou **yarn** : Gestionnaire de paquets

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/lucasrebl/Weather-app.git
cd Weather-app
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer en mode développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:5173
```

## 🛠️ Scripts Disponibles

```bash
# Démarrer le serveur de développement avec rechargement à chaud
npm run dev

# Compiler TypeScript et construire pour la production
npm run build

# Prévisualiser la version de production en local
npm run preview
```

## 🏗️ Architecture

### Structure du Projet
```
src/
├── components/           # Composants Vue réutilisables
│   ├── CitySearch.vue   # Barre de recherche de ville
│   ├── WeatherDisplay.vue # Affichage météo actuelle
│   ├── ForecastDisplay.vue # Prévisions 7 jours
│   ├── MapComponent.vue  # Carte interactive
│   └── HelloWorld.vue    # Composant d'exemple
├── services/            # Services API et logique métier
│   ├── weatherService.ts # Appels API météo
│   └── geocodingService.ts # Service de géolocalisation
├── views/              # Vues principales
│   └── Home.vue        # Page d'accueil
├── types/              # Définitions TypeScript
│   └── weather.ts      # Types des données météo
├── utils/              # Fonctions utilitaires
│   └── weatherUtils.ts # Utilitaires météo
├── App.vue            # Composant racine
└── main.ts            # Point d'entrée de l'application
```

### Séparation des Responsabilités
- **Composants** : Interface utilisateur et présentation des données
- **Services** : Communication avec les APIs externes (Open-Meteo)
- **Utilitaires** : Fonctions réutilisables et transformation de données

## 🎨 Technologies Utilisées

- **Frontend** : Vue 3 avec Composition API, TypeScript
- **Build Tool** : Vite pour un développement rapide et optimisé
- **Cartes** : Leaflet.js pour les cartes interactives
- **API Météo** : Open-Meteo API (gratuite sans clé d'API)
- **Requêtes HTTP** : Axios pour les appels API
- **Routage** : Vue Router pour la navigation
- **Type Safety** : TypeScript pour la sécurité des types

## 📝 Guide d'Utilisation

1. **Rechercher une ville** : Utilisez la barre de recherche pour trouver votre ville
2. **Consulter la météo actuelle** : Découvrez les conditions en temps réel
3. **Vérifier les prévisions** : Consultez les prévisions pour les 7 jours à venir
4. **Utiliser la carte** : Cliquez sur n'importe quel endroit de la carte pour connaître la météo

## 💡 Bonnes Pratiques

- Utilisation de la **Composition API** de Vue 3 pour une meilleure réutilisabilité du code
- **Typage fort** avec TypeScript pour éviter les erreurs
- **Séparation des préoccupations** avec des services dédiés pour les API
- **Composants réutilisables** pour maintenabilité et scalabilité
- **Gestion d'état efficace** avec les composables Vue

## 🤝 Contribution

Les contributions sont bienvenues ! Pour contribuer :

1. **Fork le projet** sur GitHub
2. **Créer une branche** pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalite`)
3. **Commit vos changements** (`git commit -m 'Ajoute une nouvelle fonctionnalité'`)
4. **Push vers la branche** (`git push origin feature/ma-fonctionnalite`)
5. **Ouvrir une Pull Request** avec une description détaillée

**Conventions** :
- Suivre le style de code existant
- Utiliser TypeScript partout
- Ajouter des commentaires pour le code complexe

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🔧 Configuration IDE Recommandée

**Visual Studio Code** avec les extensions suivantes :
- **Volar** : Support complet de Vue 3
- **TypeScript Vue Plugin** : Intellisense TypeScript dans les templates Vue
- **Prettier** : Formatage de code automatique
- **ESLint** : Linting pour la qualité du code

---

**Développé avec ❤️ par [Lucas Rebl](https://github.com/lucasrebl)**