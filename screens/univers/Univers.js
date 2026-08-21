import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Univers() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.boutonRetour}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={28}
          color="#4A5A4A"
        />
      </TouchableOpacity>

      <Text style={styles.titre}>🌍 Univers</Text>
      <Text style={styles.sousTitre}>
        Créez et retrouvez ici tous vos univers.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5F0",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  boutonRetour: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 4,
  },
  titre: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4A5A4A",
    marginBottom: 10,
  },
  sousTitre: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
