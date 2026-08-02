import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Accueil from "../screens/Accueil";
import Agenda from "../screens/Agenda";
import MaisonNavigator from "./MaisonNavigator";
import BienEtreNavigator from "./BienEtreNavigator";
import PlusStack from "./PlusStack";

import { Colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: Colors.subtitle,

        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          backgroundColor: Colors.card,
          elevation: 12,
        },

        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name={iconesOnglets[route.name]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Accueil"
        component={Accueil}
      />

      <Tab.Screen
        name="Agenda"
        component={Agenda}
      />

      <Tab.Screen
        name="Maison"
        component={MaisonNavigator}
      />

      <Tab.Screen
        name="Bien-être"
        component={BienEtreNavigator}
      />

      <Tab.Screen
        name="Plus"
        component={PlusStack}
      />
    </Tab.Navigator>
  );
}

const iconesOnglets = {
  Accueil: "home-outline",
  Agenda: "calendar-month-outline",
  Maison: "home-variant-outline",
  "Bien-être": "flower-tulip-outline",
  Plus: "dots-horizontal-circle-outline",
};