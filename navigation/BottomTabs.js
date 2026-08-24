import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import Accueil from "../screens/Accueil";
import Agenda from "../screens/Agenda";
import Budget from "../screens/Budget";
import PlusStack from "./PlusStack";

import { usePreferences } from "../contexts/PreferencesContext";
import { Colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {

  const { onglets } = usePreferences();

  return (

    <Tab.Navigator

      screenOptions={({ route }) => ({

        headerShown: false,

        // On enlève les textes sous les icônes
        tabBarShowLabel: false,

        tabBarStyle: {

          height: 70,

          paddingBottom: 10,

          paddingTop: 8,

          borderTopWidth: 1,

          borderTopColor: Colors.border,

          backgroundColor: Colors.card,

          elevation: 12,

        },


        tabBarIcon: ({ focused }) => {

          // =================================
          // ACCUEIL — Fifi réveillée / endormie
          // =================================

          if (route.name === "Accueil") {

            return (

              <Image
                source={
                  focused
                    ? require("../assets/illustrations/accueil/bouton_accueil.png")
                    : require("../assets/illustrations/accueil/bouton_dort_accueil.png")
                }

                style={{
                  width: 63,
                  height: 63,
                  resizeMode: "contain",
                  opacity: focused ? 1 : 0.8,
                }}
              />

            );

          }


          // =================================
          // AGENDA
          // =================================

          if (route.name === "Agenda") {

            return (

              <Image
                source={require(
                  "../assets/illustrations/agenda/bouton_agenda.png"
                )}

                style={{
                  width: 75,
                  height: 75,
                  resizeMode: "contain",
                }}
              />

            );

          }


          // =================================
          // BUDGET
          // =================================

          if (route.name === "Budget") {

            return (

              <Image
                source={require(
                  "../assets/illustrations/budget/bouton_budget.png"
                )}

                style={{
                  width: 65,
                  height: 65,
                  resizeMode: "contain",
                }}
              />

            );

          }


          // =================================
          // PLUS
          // =================================

          if (route.name === "Plus") {

            return (

              <Image
                source={require(
                  "../assets/illustrations/accueil/plus.png"
                )}

                style={{
                  width: 60,
                  height: 60,
                  resizeMode: "contain",
                }}
              />

            );

          }

        },

      })}

    >

      <Tab.Screen
        name="Accueil"
        component={Accueil}
      />

      {onglets.agenda && (
        <Tab.Screen
          name="Agenda"
          component={Agenda}
        />
      )}

      {onglets.budget && (
        <Tab.Screen
          name="Budget"
          component={Budget}
        />
      )}

      <Tab.Screen
        name="Plus"
        component={PlusStack}
      />

    </Tab.Navigator>

  );

}