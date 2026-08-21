import React from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { usePreferences } from "../../contexts/PreferencesContext";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";


export default function ChoixLivreParoles() {
  const navigation = useNavigation();
  const {
    livreParoles,
    modifierLivreParoles,
  } = usePreferences();


  const choisirLivre = async (
    livre: "bible" | "coran" | "torah"
  ) => {

    await modifierLivreParoles(
      livre
    );

  };


  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

<TouchableOpacity
          style={styles.boutonRetour}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            color={Colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.titre}>
          Tes Paroles
        </Text>


        <Text style={styles.sousTitre}>
          Choisis le livre dans lequel tu souhaites
          retrouver des paroles inspirantes.
        </Text>


        {/* BIBLE */}

        <TouchableOpacity
          style={[
            styles.carte,

            livreParoles === "bible" &&
              styles.carteSelectionnee,
          ]}
          onPress={() =>
            choisirLivre("bible")
          }
          activeOpacity={0.7}
        >

          <MaterialCommunityIcons
            name="cross"
            size={30}
            color="#B58B55"
            style={styles.icone}
          />


          <View style={styles.texteCarte}>

            <Text style={styles.nomLivre}>
              La Bible
            </Text>

            <Text style={styles.description}>
              Retrouver des paroles issues
              de la tradition biblique.
            </Text>

          </View>


          <MaterialCommunityIcons
            name={
              livreParoles === "bible"
                ? "radiobox-marked"
                : "radiobox-blank"
            }
            size={24}
            color={
              livreParoles === "bible"
                ? "#B58B55"
                : "#D8CFC2"
            }
          />

        </TouchableOpacity>


        {/* CORAN */}

        <TouchableOpacity
          style={[
            styles.carte,

            livreParoles === "coran" &&
              styles.carteSelectionnee,
          ]}
          onPress={() =>
            choisirLivre("coran")
          }
          activeOpacity={0.7}
        >

          <MaterialCommunityIcons
            name="star-crescent"
            size={30}
            color="#8BA888"
            style={styles.icone}
          />


          <View style={styles.texteCarte}>

            <Text style={styles.nomLivre}>
              Le Coran
            </Text>

            <Text style={styles.description}>
              Retrouver des paroles issues
              de la tradition coranique.
            </Text>

          </View>


          <MaterialCommunityIcons
            name={
              livreParoles === "coran"
                ? "radiobox-marked"
                : "radiobox-blank"
            }
            size={24}
            color={
              livreParoles === "coran"
                ? "#8BA888"
                : "#D8CFC2"
            }
          />

        </TouchableOpacity>


        {/* TORAH */}

        <TouchableOpacity
          style={[
            styles.carte,

            livreParoles === "torah" &&
              styles.carteSelectionnee,
          ]}
          onPress={() =>
            choisirLivre("torah")
          }
          activeOpacity={0.7}
        >

          <MaterialCommunityIcons
            name="star-david"
            size={30}
            color="#6F91B5"
            style={styles.icone}
          />


          <View style={styles.texteCarte}>

            <Text style={styles.nomLivre}>
              La Torah
            </Text>

            <Text style={styles.description}>
              Retrouver des paroles issues
              de la tradition juive.
            </Text>

          </View>


          <MaterialCommunityIcons
            name={
              livreParoles === "torah"
                ? "radiobox-marked"
                : "radiobox-blank"
            }
            size={24}
            color={
              livreParoles === "torah"
                ? "#6F91B5"
                : "#D8CFC2"
            }
          />

        </TouchableOpacity>


        <Text style={styles.aide}>
          Tu pourras modifier ce choix à tout moment
          dans les paramètres 🌿
        </Text>

      </View>

    </SafeAreaView>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  boutonRetour: {
    alignSelf: "flex-start",
    padding: Spacing.xs,
    marginBottom: Spacing.sm,
  },

  content: {
    flex: 1,
    padding: Spacing.lg,
  },


  titre: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },


  sousTitre: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.subtitle,
    marginBottom: Spacing.xl,
  },


  carte: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Colors.card,

    borderRadius: 18,

    paddingVertical: 18,
    paddingHorizontal: 16,

    marginBottom: 14,

    borderWidth: 1,
    borderColor: "#EFE7DA",
  },


  carteSelectionnee: {
    backgroundColor: "#FBF3E9",
    borderColor: "#E6A7C4",
  },


  icone: {
    marginRight: 14,
  },


  texteCarte: {
    flex: 1,
  },


  nomLivre: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },


  description: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.subtitle,
  },


  aide: {
    marginTop: Spacing.md,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.subtitle,
    textAlign: "center",
  },

});