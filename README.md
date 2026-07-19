# 🧺 Petit Panier

Le compagnon qui veille sur ta charge mentale.

## Stack technique

- **React Native + Expo** (TypeScript) — un seul code pour iOS et Android
- **React Navigation** — navigation par onglets entre les modules
- **AsyncStorage** — tout est stocké localement sur l'appareil, rien n'est envoyé à un serveur
- **react-native-reanimated** — pour les animations douces de Fifi

## Structure du projet

```
src/
  screens/
    Onboarding/     → issue #1 : première apparition de Fifi
    Panier/         → issue #7 : dépôt rapide de pensées (cœur de l'appli)
    Univers/        → issue #2 : espaces personnalisables
    Sante/          → issue #3 : carnet de santé multi-profils
    CoinDouillet/   → issue #4 : bien-être, respirations guidées
    MonChemin/      → issue #5 : calendrier
    Bourse/         → issue #6 : suivi de dépenses
  components/
    Fifi/           → le composant Fifi et ses animations (issue #8)
  navigation/       → la navigation par onglets
  storage/          → lecture/écriture locale (AsyncStorage)
  theme/            → couleurs, espacements, typographie
  types/            → modèle de données partagé (Note, Univers, etc.)
```

## Installation

Il te faut Node.js installé, puis :

```bash
npm install
npx expo start
```

Scanne ensuite le QR code avec l'appli **Expo Go** (disponible sur l'App Store
et le Play Store) pour tester Petit Panier directement sur ton téléphone,
sans rien installer d'autre.

## État actuel

Les modules Univers, Santé, Coin Douillet, Mon Chemin et Bourse sont pour
l'instant des écrans "placeholder" — la structure et la navigation sont en
place, prêtes à accueillir le développement de chaque fonctionnalité une
par une.
