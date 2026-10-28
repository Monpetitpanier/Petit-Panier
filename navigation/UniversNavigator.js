
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AjouterLecture from "../screens/univers/lectures/AjouterLecture";
import Univers from "../screens/univers/Univers";
import CreationUnivers from "../screens/univers/CreationUnivers";
import DetailUnivers from "../screens/univers/DetailUnivers";
import Bibliotheque from "../screens/univers/lectures/Bibliotheque";
import DetailLecture from "../screens/univers/lectures/DetailLecture";

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

      <Stack.Screen
        name="Bibliotheque"
        component={Bibliotheque}
      />

      <Stack.Screen
        name="AjouterLecture"
        component={AjouterLecture}
      />

      <Stack.Screen
        name="DetailLecture"
        component={DetailLecture}
      />
    </Stack.Navigator>
  );
}
