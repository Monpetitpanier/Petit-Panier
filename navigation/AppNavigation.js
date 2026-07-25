import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import BottomTabs from "./BottomTabs";
import OnboardingNavigator from "./OnboardingNavigator";

export default function AppNavigation() {

  const isFirstLaunch = true;

  return (
    <NavigationContainer>
      {isFirstLaunch ? (
        <OnboardingNavigator />
      ) : (
        <BottomTabs />
      )}
    </NavigationContainer>
  );
}