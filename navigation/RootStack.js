import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabs from "./BottomTabs";
import Parametres from "../screens/Parametres";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Onglets"
        component={BottomTabs}
      />

      <Stack.Screen
        name="Parametres"
        component={Parametres}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}