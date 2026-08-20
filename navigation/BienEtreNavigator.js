import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BienEtre from "../screens/bienetre/BienEtre";
import Respiration from "../screens/bienetre/Respiration";
import Gratitude from "../screens/bienetre/Gratitude";
import Priere from "../screens/bienetre/Prière";
import PenseesPositives from "../screens/bienetre/PenseesPositives";
const Stack = createNativeStackNavigator();

export default function BienEtreNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BienEtreAccueil"
        component={BienEtre}
      />

      <Stack.Screen
        name="Respiration"
        component={Respiration}
      />

      <Stack.Screen
        name="Gratitude"
        component={Gratitude}
      />

      <Stack.Screen
  name="PenseesPositives"
  component={PenseesPositives}
/>

      <Stack.Screen
        name="Priere"
        component={Priere}
      />
    </Stack.Navigator>
  );
}