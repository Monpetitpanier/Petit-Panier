import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Maison from "../screens/Maison";
import EcranCategorieMaison from "../screens/maison/EcranCategorieMaison";
import ReglagesRappelsMaison from "../screens/maison/ReglagesRappelsMaison";
import LieuxGeolocalisationMaison from "../screens/maison/LieuxGeolocalisationMaison";

const Stack = createNativeStackNavigator();

export default function MaisonNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MaisonAccueil" component={Maison} />

      <Stack.Screen
        name="ListeCoursesMaison"
        component={EcranCategorieMaison}
        initialParams={{ categorie: "courses" }}
      />
      <Stack.Screen
        name="MenageMaison"
        component={EcranCategorieMaison}
        initialParams={{ categorie: "menage" }}
      />
      <Stack.Screen
        name="EntretienMaison"
        component={EcranCategorieMaison}
        initialParams={{ categorie: "entretien" }}
      />
      <Stack.Screen
        name="GarantiesMaison"
        component={EcranCategorieMaison}
        initialParams={{ categorie: "garanties" }}
      />
      <Stack.Screen
        name="ToDoMaison"
        component={EcranCategorieMaison}
        initialParams={{ categorie: "todo" }}
      />

      <Stack.Screen name="ReglagesRappelsMaison" component={ReglagesRappelsMaison} />
      <Stack.Screen name="LieuxGeolocalisationMaison" component={LieuxGeolocalisationMaison} />
    </Stack.Navigator>
  );
}