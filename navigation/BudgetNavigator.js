import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Budget from "../screens/Budget";
import ChargesFixes from "../screens/ChargesFixes";
import ChargesVariables from "../screens/ChargesVariables";
import PretsCredits from "../screens/PretsCredits";
import DetailsChargeFixe from "../screens/DetailsChargeFixe";
import DetailsChargeVariable from "../screens/DetailsChargeVariable";
import DetailsPretCredit from "../screens/DetailsPretCredit";

const Stack = createNativeStackNavigator();

export default function BudgetNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="BudgetAccueil"
        component={Budget}
      />

      <Stack.Screen
        name="ChargesFixes"
        component={ChargesFixes}
      />

      <Stack.Screen
        name="ChargesVariables"
        component={ChargesVariables}
      />

      <Stack.Screen
        name="PretsCredits"
        component={PretsCredits}
      />

      <Stack.Screen
        name="DetailsChargeFixe"
        component={DetailsChargeFixe}
      />

      <Stack.Screen
        name="DetailsChargeVariable"
        component={DetailsChargeVariable}
      />

      <Stack.Screen
        name="DetailsPretCredit"
        component={DetailsPretCredit}
      />
    </Stack.Navigator>
  );
}
