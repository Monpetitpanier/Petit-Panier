import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Sante from "../screens/Sante";

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
    </Stack.Navigator>
  );
}