import React from "react";
import { Image, StyleSheet, View, StyleProp, ViewStyle } from "react-native";

type Props = {
  size?: number; // hauteur cible ; la largeur est déduite du ratio réel de l'image
  style?: StyleProp<ViewStyle>;
};

// Dimensions réelles du visuel source (fifi_corps.png et calques associés)
export const FIFI_CANVAS_W = 1024;
export const FIFI_CANVAS_H = 1536;

export default function Fifi({ size = 260, style }: Props) {
  const largeur = size * (FIFI_CANVAS_W / FIFI_CANVAS_H);

  return (
    <View style={[styles.container, { width: largeur, height: size }, style]}>
      <Image
        source={require("../../assets/characters/Fifi/poses/assise.png")}
        resizeMode="contain"
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
});