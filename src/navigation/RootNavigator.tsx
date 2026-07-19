import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { colors } from '@/theme/colors';

import { PanierScreen } from '@/screens/Panier/PanierScreen';
import { UniversScreen } from '@/screens/Univers/UniversScreen';
import { SanteScreen } from '@/screens/Sante/SanteScreen';
import { CoinDouilletScreen } from '@/screens/CoinDouillet/CoinDouilletScreen';
import { MonCheminScreen } from '@/screens/MonChemin/MonCheminScreen';
import { BourseScreen } from '@/screens/Bourse/BourseScreen';

const Tab = createBottomTabNavigator();

// Un icône simple (emoji) par onglet — à remplacer plus tard par de vraies
// icônes illustrées, cohérentes avec l'univers visuel de Fifi.
const ICONES: Record<string, string> = {
  Panier: '🧺',
  'Mon Chemin': '📅',
  Univers: '🌍',
  Santé: '🩺',
  'Coin Douillet': '❤️',
  Bourse: '💰',
};

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.panierDark,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>{ICONES[route.name]}</Text>,
        })}
      >
        <Tab.Screen name="Panier" component={PanierScreen} />
        <Tab.Screen name="Mon Chemin" component={MonCheminScreen} />
        <Tab.Screen name="Univers" component={UniversScreen} />
        <Tab.Screen name="Santé" component={SanteScreen} />
        <Tab.Screen name="Coin Douillet" component={CoinDouilletScreen} />
        <Tab.Screen name="Bourse" component={BourseScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
