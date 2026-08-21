import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useBienEtre } from "../../contexts/BienEtreContext";

import CarteGratitude from "../../components/CarteGratitude";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

export default function Gratitude() {

  const navigation = useNavigation();

const {
  gratitudes,
  supprimerGratitude,
  basculerFavori,
} = useBienEtre();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.boutonRetour}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={28}
          color={Colors.text}
        />
      </TouchableOpacity>

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

  boutonRetour: {
    alignSelf: "flex-start",
    padding: Spacing.xs,
    marginBottom: Spacing.sm,
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