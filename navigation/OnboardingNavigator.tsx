import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { OnboardingStackParamList } from "./OnboardingStackParamList";

import WelcomeScreen from "../screens/onboarding/WelcomeScreen";
import NameScreen from "../screens/onboarding/NameScreen";
import BirthdayScreen from "../screens/onboarding/BirthdayScreen";
import InterestsScreen from "../screens/onboarding/InterestsScreen";
import PrivacyScreen from "../screens/onboarding/PrivacyScreen";
import BackupScreen from "../screens/onboarding/BackupScreen";

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator() {
  return (
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
        name="Privacy"
        component={PrivacyScreen}
      />

      <Stack.Screen
        name="Backup"
        component={BackupScreen}
      />
    </Stack.Navigator>
  );
}