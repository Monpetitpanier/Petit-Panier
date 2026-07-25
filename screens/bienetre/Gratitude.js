import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";

import { useBienEtre } from "../../contexts/BienEtreContext";

import CarteGratitude from "../../components/CarteGratitude";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

export default function Gratitude() {


const {
  gratitudes,
  supprimerGratitude,
  basculerFavori,
} = useBienEtre();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titre}>
        Mes gratitudes
      </Text>

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

  liste: {
    paddingBottom: 30,
  },

  vide: {
    textAlign: "center",
    color: Colors.textSecondary,
    marginTop: 40,
  },
});