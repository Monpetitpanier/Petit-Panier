import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import FifiAccueil from "./FifiAccueil";

export default function CarteFifi() {
  return (
    <View style={styles.scene}>
      <FifiAccueil />
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 12,
  },
});