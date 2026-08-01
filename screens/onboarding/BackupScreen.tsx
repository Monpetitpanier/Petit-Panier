import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GabaritOnboarding from "../../components/onboarding/GabaritOnboarding";
import { useOnboarding } from "../../contexts/OnboardingContext";

type Props = {
  onOnboardingTermine: () => void;
};

export default function BackupScreen({
  onOnboardingTermine,
}: Props) {
  const { prenom } = useOnboarding();

  const terminer = async () => {
    try {
      await AsyncStorage.setItem("onboarding_termine", "true");

      console.log("✅ Onboarding enregistré comme terminé");

      onOnboardingTermine();
    } catch (erreur) {
      console.error(
        "Erreur lors de l'enregistrement de l'onboarding :",
        erreur
      );
    }
  };

  return (
    <GabaritOnboarding
      etape={5}
      imageFifi={require("../../assets/characters/Fifi/poses/fifi_ecriteau.png")}
      echelleImage={1.7}
      decalageImage={120}
      overlayImage={
        <Text style={styles.texteEcriteau}>
          {prenom || "Petit Panier"}
        </Text>
      }
      titre="Sauvegarde (facultatif)"
      sousTitre="Pour ne rien perdre, tu peux sauvegarder ton panier sur le cloud."
      texteBouton="Terminer"
      onSuivant={terminer}
    >
      <TouchableOpacity style={styles.option} activeOpacity={0.7}>
        <MaterialCommunityIcons
          name="cloud-outline"
          size={22}
          color="#6B5D53"
          style={styles.icone}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Sauvegarder plus tard</Text>
          <Text style={styles.description}>
            Je m'en occupe plus tard
          </Text>
        </View>

        <MaterialCommunityIcons
          name="radiobox-marked"
          size={22}
          color="#e6a7c4"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} activeOpacity={0.7}>
        <MaterialCommunityIcons
          name="email-outline"
          size={22}
          color="#6B5D53"
          style={styles.icone}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>
            Créer un compte (facultatif)
          </Text>
          <Text style={styles.description}>
            Pour sauvegarder et retrouver ton panier sur un autre appareil
          </Text>
        </View>

        <MaterialCommunityIcons
          name="radiobox-blank"
          size={22}
          color="#D8CFC2"
        />
      </TouchableOpacity>

      <Text style={styles.aide}>
        Aucune adresse e-mail n'est obligatoire pour commencer. Ton panier, ton choix !
      </Text>
    </GabaritOnboarding>
  );
}

const styles = StyleSheet.create({
  texteEcriteau: {
    position: "absolute",
    top: "2%",
    left: "67%",
    width: 100,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "#3D2F26",
    transform: [{ translateX: -50 }, { rotate: "-3deg" }],
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#FBF3E9",
    marginBottom: 10,
  },

  icone: {
    marginRight: 10,
  },

  label: {
    fontSize: 15,
    color: "#4B4036",
    fontWeight: "500",
  },

  description: {
    fontSize: 12,
    color: "#9C8C7E",
    marginTop: 2,
  },

  aide: {
    marginTop: 10,
    fontSize: 12,
    color: "#9C8C7E",
    textAlign: "center",
  },
});