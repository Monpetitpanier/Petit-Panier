import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useOnboarding } from "../../contexts/OnboardingContext";
import GabaritOnboarding from "../../components/onboarding/GabaritOnboarding";

const CENTRES_INTERET = [
  { id: "agenda", label: "Agenda & Rappels", icone: "calendar-heart" as const },
  { id: "budget", label: "Budget & Dépenses", icone: "piggy-bank-outline" as const },
  { id: "ecriture", label: "Écriture & Projets", icone: "notebook-outline" as const },
  { id: "bienetre", label: "Bien-être & Émotions", icone: "flower-outline" as const },
  { id: "sante", label: "Santé", icone: "heart-pulse" as const },
  { id: "voyages", label: "Voyages & Vacances", icone: "airplane" as const },
  { id: "maison", label: "Maison & Organisation", icone: "home-heart" as const },
];

const MINIMUM_SELECTION = 3;

export default function InterestsScreen() {
  const navigation = useNavigation();

  const {
    centresInteret,
    setCentresInteret,
  } = useOnboarding();

  const [selection, setSelection] =
    useState<string[]>(centresInteret);

  const basculer = (id: string) => {
    setSelection((actuelle) =>
      actuelle.includes(id)
        ? actuelle.filter((item) => item !== id)
        : [...actuelle, id]
    );
  };

  const peutContinuer =
    selection.length >= MINIMUM_SELECTION;

  return (
    <GabaritOnboarding
      etape={3}
      titre="Qu'aimerais-tu trouver ici ?"
      sousTitre="Choisis ce qui t'intéresse. Tu pourras toujours en ajouter plus tard."
      texteBouton="Suivant"
      onSuivant={() => {
  if (!peutContinuer) return;

  setCentresInteret(selection as any);

  if (selection.includes("bienetre")) {
    navigation.navigate(
      "ChoixBienEtre" as never
    );
  } else {
    navigation.navigate(
      "Privacy" as never
    );
  }
}}
    >
      <View>
        {CENTRES_INTERET.map((item) => {
          const coche = selection.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.ligne}
              onPress={() => basculer(item.id)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name={item.icone} size={20} color="#e6a7c4" style={styles.icone} />
<Text style={styles.label}>{item.label}</Text>
<MaterialCommunityIcons
  name={coche ? "check-circle" : "circle-outline"}
  size={22}
  color={coche ? "#e6a7c4" : "#D8CFC2"}
/>
            </TouchableOpacity>
          );
        })}
      </View>

      {!peutContinuer && (
        <Text style={styles.aide}>
          Choisis au moins {MINIMUM_SELECTION} centres d'intérêt ({selection.length}/{MINIMUM_SELECTION})
        </Text>
      )}
    </GabaritOnboarding>
  );
}

const styles = StyleSheet.create({
  ligne: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EFE7DA",
  },
  icone: {
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: "#4B4036",
  },
  aide: {
    marginTop: 14,
    fontSize: 13,
    color: "#9C8C7E",
    textAlign: "center",
  },
});