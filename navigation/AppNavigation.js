import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BottomTabs from "./BottomTabs";
import OnboardingNavigator from "./OnboardingNavigator";

const CLE_ONBOARDING_TERMINE = "onboarding_termine";

export default function AppNavigation() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const terminerOnboarding = () => {
  setIsFirstLaunch(false);
};

  useEffect(() => {
  
    const verifierPremierLancement = async () => {
      try {
       
        const onboardingTermine = await AsyncStorage.getItem(
          CLE_ONBOARDING_TERMINE
        );

        setIsFirstLaunch(onboardingTermine !== "true");
      } catch (erreur) {
        console.error(
          "Erreur lors de la vérification de l'onboarding :",
          erreur
        );

        setIsFirstLaunch(true);
      }
    };

    verifierPremierLancement();
  }, []);

  // On attend d'avoir lu AsyncStorage avant d'afficher un écran
  if (isFirstLaunch === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F8F4EE",
        }}
      >
        <ActivityIndicator color="#e6a7c4" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isFirstLaunch ? (
        <OnboardingNavigator
  onOnboardingTermine={terminerOnboarding}
/>
      ) : (
        <BottomTabs />
      )}
    </NavigationContainer>
  );
}