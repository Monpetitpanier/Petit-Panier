import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { OnboardingStackParamList } from "./OnboardingStackParamList";

import WelcomeScreen from "../screens/onboarding/WelcomeScreen";
import IntroScreen from "../screens/onboarding/IntroScreen";
import NameScreen from "../screens/onboarding/NameScreen";
import BirthdayScreen from "../screens/onboarding/BirthdayScreen";
import InterestsScreen from "../screens/onboarding/InterestsScreen";
import ChoixUnivers from "../screens/onboarding/ChoixUnivers";
import ChoixBienEtre from "../screens/onboarding/ChoixBienEtre";
import PrivacyScreen from "../screens/onboarding/PrivacyScreen";
import BackupScreen from "../screens/onboarding/BackupScreen";
import PinSetupScreen from "../screens/onboarding/PinSetupScreen";

import { OnboardingProvider } from "../contexts/OnboardingContext";

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

type Props = {
  onOnboardingTermine: () => void;
};

export default function OnboardingNavigator({
  onOnboardingTermine,
}: Props) {
  return (
    <OnboardingProvider>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: "fade",
          contentStyle: {
            backgroundColor: "#F8F4EE",
          },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />

        <Stack.Screen
          name="Intro"
          component={IntroScreen}
        />

        <Stack.Screen
          name="Name"
          component={NameScreen}
        />

        <Stack.Screen
          name="Birthday"
          component={BirthdayScreen}
        />

        <Stack.Screen
          name="Interests"
          component={InterestsScreen}
        />

        <Stack.Screen
          name="ChoixUnivers"
          component={ChoixUnivers}
        />

        <Stack.Screen
          name="ChoixBienEtre"
          component={ChoixBienEtre}
        />

        <Stack.Screen
          name="Privacy"
          component={PrivacyScreen}
        />

        <Stack.Screen
          name="PinSetup"
          component={PinSetupScreen}
        />

        <Stack.Screen name="Backup">
          {(props) => (
            <BackupScreen
              {...props}
              onOnboardingTermine={onOnboardingTermine}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </OnboardingProvider>
  );
}