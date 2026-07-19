import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { useBienEtre } from "../../contexts/BienEtreContext";

import CarteGratitude from "../../components/CarteGratitude";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

export default function Gratitude() {
  const [texte, setTexte] = useState("");

  const {
    gratitudes,
    ajouterGratitude,
    supprimerGratitude,
    basculerFavori,
  } = useBienEtre();

  function enregistrer() {
    if (!texte.trim()) {
      return;
    }

    ajouterGratitude(texte.trim());
    setTexte("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titre}>
        Mes gratitudes
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Aujourd'hui je suis reconnaissante pour..."
        value={texte}
        onChangeText={setTexte}
        multiline
      />

      <TouchableOpacity
        style={styles.bouton}
        onPress={enregistrer}
      >
        <Text style={styles.texteBouton}>
          Ajouter
        </Text>
      </TouchableOpacity>

      <FlatList
        data={gratitudes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.liste}
        ListEmptyComponent={
          <Text style={styles.vide}>
            Aucune gratitude pour le moment 🌸
          </Text>
        }
        renderItem={({ item }) => (
          <CarteGratitude
            gratitude={item}
            onFavori={() => basculerFavori(item.id)}
            onSupprimer={() => supprimerGratitude(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },

  titre: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.lg,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: Spacing.md,
  },

  bouton: {
    backgroundColor: "#8BA888",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  texteBouton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  liste: {
    paddingBottom: 30,
  },

  vide: {
    textAlign: "center",
    color: Colors.textSecondary,
    marginTop: 40,
  },
});