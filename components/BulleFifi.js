import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function BulleFifi({ texte }) {

  if (!texte) return null;

  return (

    <View style={styles.container}>

      <Text style={styles.texte}>
        {texte}
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    backgroundColor: Colors.white,

    borderRadius: Radius.large,

    paddingVertical: Spacing.sm,

    paddingHorizontal: Spacing.md,

    marginBottom: Spacing.md,

    alignSelf: "center",

    maxWidth: 280,

    ...Shadow.card,

  },

  texte: {

    textAlign: "center",

    color: Colors.text,

    fontSize: 16,

    lineHeight: 22,

  },

});