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
};

export default function Panier({
  width = 230,
  style,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require("../../assets/furniture/panier_officiel.png")}
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