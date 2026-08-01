import React, { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GabaritOnboarding from "../../components/onboarding/GabaritOnboarding";
import { useOnboarding } from "../../contexts/OnboardingContext";

export default function PinSetupScreen() {
  const navigation = useNavigation();
  const { setCodePin } = useOnboarding();

  const [premierCode, setPremierCode] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [etapeConfirmation, setEtapeConfirmation] = useState(false);
  const [erreur, setErreur] = useState("");

  const valeurAffichee = etapeConfirmation ? confirmation : premierCode;
  const definirValeur = etapeConfirmation ? setConfirmation : setPremierCode;

  const continuer = () => {
    if (!etapeConfirmation) {
      if (premierCode.length < 4) {
        setErreur("Le code doit contenir au moins 4 chiffres.");
        return;
      }
      setErreur("");
      setEtapeConfirmation(true);
      return;
    }

    if (confirmation !== premierCode) {
      setErreur("Les deux codes ne correspondent pas, réessaie.");
      setConfirmation("");
      return;
    }

    setCodePin(premierCode);
    navigation.navigate("Backup" as never);
  };

  return (
    <GabaritOnboarding
      etape={4}
      titre={etapeConfirmation ? "Confirme ton code" : "Choisis ton code PIN"}
      sousTitre={
        etapeConfirmation
          ? "Retape le même code pour confirmer."
          : "4 à 6 chiffres, à retenir facilement."
      }
      texteBouton={etapeConfirmation ? "Confirmer" : "Continuer"}
      onSuivant={continuer}
    >
      <TextInput
        style={styles.input}
        placeholder="••••"
        placeholderTextColor="#D8CFC2"
        value={valeurAffichee}
        onChangeText={(texte) => {
          setErreur("");
          definirValeur(texte.replace(/[^0-9]/g, "").slice(0, 6));
        }}
        keyboardType="numeric"
        secureTextEntry
        maxLength={6}
        textAlign="center"
      />

      {erreur ? <Text style={styles.erreur}>{erreur}</Text> : null}
    </GabaritOnboarding>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 16,
    fontSize: 24,
    letterSpacing: 8,
    color: "#4B4036",
    borderWidth: 1,
    borderColor: "#E8DFD3",
  },
  erreur: { marginTop: 10, fontSize: 13, color: "#C97B63", textAlign: "center" },
});