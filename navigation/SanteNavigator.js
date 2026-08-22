import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Sante from "../screens/Sante";
import Traitements from "../screens/Traitements";

const Stack = createNativeStackNavigator();

export default function SanteNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SanteAccueil"
        component={Sante}
      />

      <Stack.Screen
        name="Traitements"
        component={Traitements}
      />
    </Stack.Navigator>
  );
}