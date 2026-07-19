import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EcranMaisonVide from "../screens/maison/EcranMaisonVide";

const Stack = createNativeStackNavigator();

export default function MaisonNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MaisonAccueil"
        component={EcranMaisonVide}
      />
    </Stack.Navigator>
  );
}