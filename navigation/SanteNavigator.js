import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Sante from "../screens/Sante";
import Traitements from "../screens/Traitements";
import Medicaments from "../screens/Medicaments";
import Pharmacie from "../screens/Pharmacie";
import DetailsTraitement from "../screens/DetailsTraitement";
import DetailsMedicament from "../screens/DetailsMedicament";
import DetailsPharmacie from "../screens/DetailsPharmacie";
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

      <Stack.Screen
        name="Medicaments"
        component={Medicaments}
      />

      <Stack.Screen
        name="Pharmacie"
        component={Pharmacie}
      />

    <Stack.Screen
    name="DetailsTraitement"
    component={DetailsTraitement}
    />
    
    <Stack.Screen
    name="DetailsMedicament"
    component={DetailsMedicament}
    />

    <Stack.Screen
    name="DetailsPharmacie"
    component={DetailsPharmacie}
    />

      </Stack.Navigator>

  );
}