
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Univers from "../screens/univers/Univers";
import CreationUnivers from "../screens/univers/CreationUnivers";
import DetailUnivers from "../screens/univers/DetailUnivers";

const Stack = createNativeStackNavigator();

export default function UniversNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="UniversAccueil"
        component={Univers}
      />

      <Stack.Screen
        name="CreationUnivers"
        component={CreationUnivers}
      />

      <Stack.Screen
        name="DetailUnivers"
        component={DetailUnivers}
      />
    </Stack.Navigator>
  );
}
