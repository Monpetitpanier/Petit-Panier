import React from "react";
import { View, FlatList, Text } from "react-native";

import { usePanier } from "../contexts/PanierContext";

import CartePensee from "../components/CartePensee";

export default function Journal() {
  const { notes } = usePanier();

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        paddingTop: 60,
        backgroundColor: "#F8F5EF",
      }}
    >
      {notes.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 25,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "600",
              color: "#555",
              marginBottom: 15,
            }}
          >
            Journal vide 📖
          </Text>

          <Text
            style={{
              textAlign: "center",
              color: "#777",
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            Les éléments déposés depuis l'Accueil
            apparaîtront ici.
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ marginTop: 20 }}
          data={notes}
          keyExtractor={(note) => note.id}
          renderItem={({ item }) => (
            <CartePensee pensee={item} />
          )}
        />
      )}
    </View>
  );
}