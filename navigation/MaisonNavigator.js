import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GarantiesMaison from "../screens/maison/GarantiesMaison";
import EntretienMaison from "../screens/maison/EntretienMaison";
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
        component={EntretienMaison}
    
      />
      <Stack.Screen
        name="GarantiesMaison"
        component={GarantiesMaison}
        
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