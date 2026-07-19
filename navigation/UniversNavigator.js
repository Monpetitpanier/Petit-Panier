import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Univers from "../screens/univers/Univers";

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
    </Stack.Navigator>
  );
}