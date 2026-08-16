import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

import {
  View,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

import BottomTabs from "./BottomTabs";
import OnboardingNavigator from "./OnboardingNavigator";


const CLE_ONBOARDING_TERMINE =
  "onboarding_termine";


export default function AppNavigation() {

  const navigationRef =
    useNavigationContainerRef();


  const [isFirstLaunch, setIsFirstLaunch] =
    useState(null);


  const destinationEnAttente =
    useRef(null);


  // =======================================
  // TERMINER L'ONBOARDING
  // =======================================

  const terminerOnboarding = () => {

    setIsFirstLaunch(false);

  };


  // =======================================
  // NAVIGATION DEPUIS UNE NOTIFICATION
  // =======================================

const naviguerDepuisNotification = (
  destination
) => {

    if (!destination) {
      return;
    }


    /*
     * Si la navigation est déjà prête
     * et que l'onboarding est terminé,
     * on navigue immédiatement.
     */

    if (
      navigationRef.isReady() &&
      isFirstLaunch === false
    ) {

      if (destination === "menage") {

        navigationRef.navigate(
          "Maison",
          {
            screen: "MenageMaison",
          }
        );

      }

      destinationEnAttente.current = null;

      return;

    }


    /*
     * Si la navigation n'est pas encore prête,
     * on conserve la destination.
     */

    destinationEnAttente.current =
      destination;

  };


  // =======================================
  // VÉRIFICATION DE L'ONBOARDING
  // =======================================

  useEffect(() => {

    const verifierPremierLancement =
      async () => {

        try {

          const onboardingTermine =
            await AsyncStorage.getItem(
              CLE_ONBOARDING_TERMINE
            );


          setIsFirstLaunch(
            onboardingTermine !== "true"
          );

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


  // =======================================
  // ÉCOUTE DES CLICS SUR LES NOTIFICATIONS
  // =======================================

  useEffect(() => {

    const abonnement =
      Notifications
        .addNotificationResponseReceivedListener(
          (response) => {

            const destination =
              response
                .notification
                .request
                .content
                .data
                ?.destination;


            naviguerDepuisNotification(
              typeof destination === "string"
                ? destination
                : null
            );

          }
        );


    /*
     * Cas où l'application était complètement
     * fermée lorsque l'utilisateur a appuyé
     * sur la notification.
     */

    Notifications
      .getLastNotificationResponseAsync()
      .then((response) => {

        if (!response) {
          return;
        }


        const destination =
          response
            .notification
            .request
            .content
            .data
            ?.destination;


        naviguerDepuisNotification(
          typeof destination === "string"
            ? destination
            : null
        );

      });


    return () => {

      abonnement.remove();

    };

  }, [
    isFirstLaunch,
  ]);


  // =======================================
  // ATTENTE DE L'ONBOARDING
  // =======================================

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

        <ActivityIndicator
          color="#e6a7c4"
        />

      </View>

    );

  }


  // =======================================
  // NAVIGATION PRINCIPALE
  // =======================================

  return (

    <NavigationContainer
      ref={navigationRef}

      onReady={() => {

        /*
         * Si une notification a été reçue
         * avant que la navigation soit prête,
         * on effectue maintenant la navigation.
         */

        if (
          destinationEnAttente.current &&
          isFirstLaunch === false
        ) {

          const destination =
            destinationEnAttente.current;


          destinationEnAttente.current =
            null;


          if (
            destination === "menage"
          ) {

            navigationRef.navigate(
              "Maison",
              {
                screen: "MenageMaison",
              }
            );

          }

        }

      }}
    >

      {isFirstLaunch ? (

        <OnboardingNavigator
          onOnboardingTermine={
            terminerOnboarding
          }
        />

      ) : (

        <BottomTabs />

      )}

    </NavigationContainer>

  );

}