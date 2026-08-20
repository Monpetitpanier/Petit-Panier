import React from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GabaritOnboarding from "../../components/onboarding/GabaritOnboarding";
import { useOnboarding } from "../../contexts/OnboardingContext";

export default function NameScreen() {
  const navigation = useNavigation();
  const { prenom, setPrenom } = useOnboarding();

  return (
    <GabaritOnboarding
      etape={1}
      imageFifi={require("../../assets/characters/Fifi/poses/curieuse_pattes_panier.png")}
      echelleImage={1.2}
      titre="Comment veux-tu que je t'appelle ?"
      sousTitre="Choisis le prénom ou le surnom que tu préfères, je l'utiliserai pour te parler."
      texteBouton="Suivant"
      onSuivant={() => navigation.navigate("Birthday" as never)}
      masquerRetour
    >
      <TextInput
        style={styles.input}
        placeholder="Ton prénom ou surnom"
        placeholderTextColor="#9C8C7E"
        value={prenom}
        onChangeText={setPrenom}
      />
      <Text style={styles.exemple}>ex. Jules, Marie, Maman...</Text>
    </GabaritOnboarding>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#4B4036",
    borderWidth: 1,
    borderColor: "#E8DFD3",
  },
  exemple: {
    fontSize: 13,
    color: "#9C8C7E",
    textAlign: "center",
    marginTop: 10,
  },
});