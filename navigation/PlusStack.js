import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaisonNavigator from "./MaisonNavigator";
import Plus from "../screens/Plus";
import BienEtreNavigator from "./BienEtreNavigator";
import UniversNavigator from "./UniversNavigator";
import SanteNavigator from "./SanteNavigator";

const Stack = createNativeStackNavigator();

export default function PlusStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="PlusAccueil"
        component={Plus}
      />

      <Stack.Screen
        name="Maison"
        component={MaisonNavigator}
      />

      <Stack.Screen
        name="BienEtre"
        component={BienEtreNavigator}
      />

      <Stack.Screen
        name="Sante"
        component={SanteNavigator}
      />

      <Stack.Screen
        name="Univers"
        component={UniversNavigator}
      />
    </Stack.Navigator>
  );
}