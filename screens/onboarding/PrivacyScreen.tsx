import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import GabaritOnboarding from "../../components/onboarding/GabaritOnboarding";
import { useOnboarding } from "../../contexts/OnboardingContext";

const OPTIONS = [
  { id: "aucun" as const, label: "Aucun verrou", description: "Accès libre à l'application", icone: "lock-open-outline" as const },
  { id: "pin" as const, label: "Code PIN", description: "Un code à 4 ou 6 chiffres", icone: "dialpad" as const },
  { id: "empreinte" as const, label: "Empreinte digitale", description: "Rapide et sécurisé", icone: "fingerprint" as const },
  { id: "visage" as const, label: "Reconnaissance du visage", description: "Si ton téléphone le permet", icone: "face-recognition" as const },
];

export default function PrivacyScreen() {
  const navigation = useNavigation();
  const { verrouillage, setVerrouillage } = useOnboarding();

  const continuer = () => {
    if (verrouillage === "pin") {
      navigation.navigate("PinSetup" as never);
    } else {
      navigation.navigate("Backup" as never);
    }
  };

  return (
    <GabaritOnboarding
      etape={4}
      titre="Ta confidentialité"
      sousTitre="Ce que tu me confieras restera chez toi, en sécurité. Choisis comment protéger ton Petit Panier."
      texteBouton="Suivant"
      onSuivant={continuer}
    >
      <View>
        {OPTIONS.map((option) => {
          const selectionne = verrouillage === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              style={[styles.ligne, selectionne && styles.ligneSelectionnee]}
              onPress={() => setVerrouillage(option.id)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={option.icone}
                size={22}
                color={selectionne ? "#e6a7c4" : "#6B5D53"}
                style={styles.icone}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>{option.label}</Text>
                <Text style={styles.description}>{option.description}</Text>
              </View>
              <MaterialCommunityIcons
                name={selectionne ? "radiobox-marked" : "radiobox-blank"}
                size={22}
                color={selectionne ? "#e6a7c4" : "#D8CFC2"}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.aide}>Tu pourras changer d'avis quand tu voudras. 💛</Text>
    </GabaritOnboarding>
  );
}

const styles = StyleSheet.create({
  ligne: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 6,
  },
  ligneSelectionnee: { backgroundColor: "#FBF3E9" },
  icone: { marginRight: 12 },
  label: { fontSize: 15, color: "#4B4036", fontWeight: "500" },
  description: { fontSize: 12, color: "#9C8C7E", marginTop: 2 },
  aide: { marginTop: 16, fontSize: 13, color: "#9C8C7E", textAlign: "center" },
});