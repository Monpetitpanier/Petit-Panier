import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import GabaritOnboarding from "../../components/onboarding/GabaritOnboarding";
import { useOnboarding } from "../../contexts/OnboardingContext";

export default function ChoixUnivers() {
  const navigation = useNavigation();

  const {
    contenuUnivers,
    setContenuUnivers,
    espaces,
  } = useOnboarding();

  const basculer = (
    choix: "voyages" | "lectures" | "projets"
  ) => {
    setContenuUnivers({
      ...contenuUnivers,
      [choix]: !contenuUnivers[choix],
    });
  };

  const continuer = () => {
    if (espaces.includes("bienEtre")) {
      navigation.navigate("ChoixBienEtre" as never);
      return;
    }

    navigation.navigate("Privacy" as never);
  };

  const choix = [
    {
      id: "voyages" as const,
      titre: "Voyages",
      description:
        "Pour préparer tes voyages et garder tes idées d'évasion.",
      icone: "airplane",
    },
    {
      id: "lectures" as const,
      titre: "Lectures",
      description:
        "Pour garder une trace de tes lectures et de tes envies.",
      icone: "book-open-variant-outline",
    },
    {
      id: "projets" as const,
      titre: "Projets",
      description:
        "Pour organiser tes idées et faire avancer ce qui te tient à cœur.",
      icone: "lightbulb-outline",
    },
  ];

  return (
    <GabaritOnboarding
      etape={4}
      titre="Que veux-tu retrouver dans ton Univers ?"
      sousTitre="Choisis uniquement ce qui t'est utile."
      texteBouton="Suivant"
      onSuivant={continuer}
    >
      <View>
        {choix.map((item) => {
          const coche = contenuUnivers[item.id];

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.carte,
                coche && styles.carteSelectionnee,
              ]}
              onPress={() => basculer(item.id)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={item.icone as any}
                size={28}
                color="#e6a7c4"
                style={styles.icone}
              />

              <View style={styles.contenu}>
                <Text style={styles.titre}>
                  {item.titre}
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

    paddingVertical: 16,
    paddingHorizontal: 14,

    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EFE7DA",

    marginBottom: 12,
  },

  carteSelectionnee: {
    backgroundColor: "#FBF3E9",
    borderColor: "#E6A7C4",
  },

  icone: {
    marginRight: 14,
  },

  contenu: {
    flex: 1,
  },

  titre: {
    fontSize: 17,
    fontWeight: "600",
    color: "#4B4036",

    marginBottom: 4,
  },

  description: {
    fontSize: 13,
    lineHeight: 19,
    color: "#9C8C7E",
  },
});