import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";

type Props = {
  children?: React.ReactNode;
};

export default function BackgroundMaison({ children }: Props) {
  return (
    <ImageBackground
      source={require("../../assets/environment/maison_fifi.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.content}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4EE",
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
});