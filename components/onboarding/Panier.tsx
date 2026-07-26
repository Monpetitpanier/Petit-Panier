import React from "react";
import {
  Image,
  StyleSheet,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  width?: number;
  style?: StyleProp<ViewStyle>;
  partie?: "complet" | "avant" | "arriere";
};

export default function Panier({
  width = 230,
  style,
  partie = "complet",
}: Props) {
  let source;

  switch (partie) {
  case "avant":
  source = require("../../assets/furniture/panier_avant.png");
  break;

    case "arriere":
      source = require("../../assets/furniture/panier_arriere.png");
      break;

    default:
      source = require("../../assets/furniture/panier_officiel.png");
      break;
  }

  return (
    <View style={[styles.container, style]}>
      <Image
        source={source}
        resizeMode="contain"
        style={{
          width,
          height: width * 0.65,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});