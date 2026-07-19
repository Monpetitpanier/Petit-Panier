import { View, Text, StyleSheet } from "react-native";

type Props = {
  humeur?: "dort" | "regarde" | "bouddha";
};

export default function Fifi({ humeur = "dort" }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.chat}>🐱</Text>

      <Text style={styles.humeur}>
        {humeur === "dort" && "😴 Fifi dort"}
        {humeur === "regarde" && "👀 Fifi te regarde"}
        {humeur === "bouddha" && "🧘 Fifi t'aide à respirer"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },

  chat: {
    fontSize: 70,
  },

  humeur: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
  },
});