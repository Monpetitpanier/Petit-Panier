import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GabaritOnboarding from "../../components/onboarding/GabaritOnboarding";

export default function BirthdayScreen() {
  const navigation = useNavigation();
  const [dateNaissance, setDateNaissance] = useState("");

  return (
    <GabaritOnboarding
      etape={2}
      imageFifi={require("../../assets/characters/Fifi/poses/fifi_papillon.png")}
      echelleImage={1.5}
      titre="Ta date de naissance"
      sousTitre="Cela m'aide pour les anniversaires et pour personnaliser certains conseils."
      texteBouton="Suivant"
      onSuivant={() => navigation.navigate("Interests" as never)}
    >
      <TextInput
        style={styles.input}
        placeholder="JJ / MM / AAAA"
        placeholderTextColor="#9C8C7E"
        value={dateNaissance}
        onChangeText={setDateNaissance}
        keyboardType="numeric"
        maxLength={10}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Interests" as never)}
        style={styles.passer}
      >
        <Text style={styles.passerTexte}>Tu peux sauter cette étape si tu préfères.</Text>
      </TouchableOpacity>
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
  passer: {
    marginTop: 14,
    alignItems: "center",
  },
  passerTexte: {
    fontSize: 13,
    color: "#9C8C7E",
    textDecorationLine: "underline",
  },
});