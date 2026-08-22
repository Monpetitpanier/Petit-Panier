import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useOnboarding } from "../../contexts/OnboardingContext";
import GabaritOnboarding from "../../components/onboarding/GabaritOnboarding";

const ESPACES = [
  {
    id: "agenda",
    label: "Agenda",
    description: "Pour garder tes rendez-vous et les moments importants.",
    icone: "calendar-outline",
  },
  {
    id: "budget",
    label: "Budget",
    description: "Pour suivre simplement tes dépenses et ton budget.",
    icone: "wallet-outline",
  },
  {
    id: "bienEtre",
    label: "Bien-être",
    description: "Un espace pour prendre soin de toi et souffler un peu.",
    icone: "leaf",
  },
  {
    id: "sante",
    label: "Santé",
    description: "Pour garder une trace de ce qui concerne ta santé.",
    icone: "heart-outline",
  },
  {
    id: "maison",
    label: "Maison",
    description: "Pour t'aider à organiser ton chez-toi.",
    icone: "home-outline",
  },
  {
    id: "univers",
    label: "Univers",
    description:
      "Pour organiser un voyage, suivre tes lectures ou avancer dans un projet.",
    icone: "star-outline",
  },
];

export default function InterestsScreen() {
  const navigation = useNavigation();

  const {
    espaces,
    setEspaces,
  } = useOnboarding();

  const [selection, setSelection] =
    useState<string[]>(espaces);

  const basculer = (id: string) => {
    setSelection((actuelle) =>
      actuelle.includes(id)
        ? actuelle.filter((item) => item !== id)
        : [...actuelle, id]
    );
  };

  const continuer = () => {
    setEspaces(selection as any);

    if (selection.includes("univers")) {
      navigation.navigate("ChoixUnivers" as never);
      return;
    }

    if (selection.includes("bienEtre")) {
      navigation.navigate("ChoixBienEtre" as never);
      return;
    }

    navigation.navigate("Privacy" as never);
  };

  return (
    <GabaritOnboarding
      etape={3}
      titre="Quels espaces souhaites-tu utiliser ?"
      sousTitre="Choisis uniquement ce qui te sera utile. Tu pourras toujours modifier tes choix plus tard."
      texteBouton="Suivant"
      onSuivant={continuer}
    >
      <View>
        {ESPACES.map((item) => {
          const coche = selection.includes(item.id);

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.carte}
              onPress={() => basculer(item.id)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={item.icone as any}
                size={24}
                color="#e6a7c4"
                style={styles.icone}
              />

              <View style={styles.contenu}>
                <Text style={styles.label}>
                  {item.label}
                </Text>

                <Text style={styles.description}>
                  {item.description}
                </Text>
              </View>

              <MaterialCommunityIcons
                name={
                  coche
                    ? "check-circle"
                    : "circle-outline"
                }
                size={24}
                color={
                  coche
                    ? "#e6a7c4"
                    : "#D8CFC2"
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </GabaritOnboarding>
  );
}

const styles = StyleSheet.create({
  carte: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EFE7DA",
  },

  icone: {
    marginRight: 12,
  },

  contenu: {
    flex: 1,
    paddingRight: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B4036",
    marginBottom: 3,
  },

  description: {
    fontSize: 13,
    lineHeight: 18,
    color: "#9C8C7E",
  },
});