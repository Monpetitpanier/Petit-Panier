import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function ChampDepot({
  valeur,
  onChangeText,
  placeholder,
}) {
  return (
    <TextInput
      style={styles.input}
      value={valeur}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    minHeight: 90,
    fontSize: 16,
    marginBottom: 15,
  },
});