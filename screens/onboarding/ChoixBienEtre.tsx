import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import GabaritOnboarding from "../../components/onboarding/GabaritOnboarding";
import { useOnboarding } from "../../contexts/OnboardingContext";

export default function ChoixBienEtre() {
  const navigation = useNavigation();

  const {
    contenuBienEtre,
    setContenuBienEtre,
  } = useOnboarding();

  const continuer = () => {
    if (!contenuBienEtre) return;

    navigation.navigate("Privacy" as never);
  };

  return (
    <GabaritOnboarding
      etape={4}
      titre="Personnalise ton espace Bien-être"
      sousTitre="Choisis ce qui t'apportera le plus de douceur au quotidien."
      texteBouton="Suivant"
      onSuivant={continuer}
    >
      <View>

        {/* PENSÉES POSITIVES */}

        <TouchableOpacity
          style={[
            styles.carte,
            contenuBienEtre === "pensees" &&
              styles.carteSelectionnee,
          ]}
          onPress={() =>
            setContenuBienEtre("pensees")
          }
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="thought-bubble-outline"
            size={28}
            color="#e6a7c4"
            style={styles.icone}
          />

          <View style={styles.contenu}>
            <Text style={styles.titre}>
              Pensées positives
            </Text>

            <Text style={styles.description}>
              Des mots doux et encourageants
              pour accompagner tes journées.
            </Text>
          </View>

          <MaterialCommunityIcons
            name={
              contenuBienEtre === "pensees"
                ? "radiobox-marked"
                : "radiobox-blank"
            }
            size={24}
            color={
              contenuBienEtre === "pensees"
                ? "#e6a7c4"
                : "#D8CFC2"
            }
          />
        </TouchableOpacity>


        {/* PAROLES */}

        <TouchableOpacity
          style={[
            styles.carte,
            contenuBienEtre === "paroles" &&
              styles.carteSelectionnee,
          ]}
          onPress={() =>
            setContenuBienEtre("paroles")
          }
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="book-open-variant-outline"
            size={28}
            color="#8BA888"
            style={styles.icone}
          />

          <View style={styles.contenu}>
            <Text style={styles.titre}>
              Paroles
            </Text>

            <Text style={styles.description}>
              De courts extraits inspirants pour
              t'accompagner et t'inviter à retrouver
              ton livre ou ta tradition.
            </Text>
          </View>

          <MaterialCommunityIcons
            name={
              contenuBienEtre === "paroles"
                ? "radiobox-marked"
                : "radiobox-blank"
            }
            size={24}
            color={
              contenuBienEtre === "paroles"
                ? "#8BA888"
                : "#D8CFC2"
            }
          />
        </TouchableOpacity>

      </View>

      {!contenuBienEtre && (
        <Text style={styles.aide}>
          Choisis l'espace qui te ressemble le plus 🌿
        </Text>
      )}

    </GabaritOnboarding>
  );
}

const styles = StyleSheet.create({

  carte: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 16,
    paddingHorizontal: 14,

    borderRadius: 16,

    borderWidth: 1,
    borderColor: "#EFE7DA",

    marginBottom: 12,
  },

  carteSelectionnee: {
    backgroundColor: "#FBF3E9",
    borderColor: "#E6A7C4",
  },

  icone: {
    marginRight: 14,
  },

  contenu: {
    flex: 1,
  },

  titre: {
    fontSize: 17,
    fontWeight: "600",
    color: "#4B4036",

    marginBottom: 4,
  },

  description: {
    fontSize: 13,
    lineHeight: 19,
    color: "#9C8C7E",
  },

  aide: {
    marginTop: 10,
    fontSize: 13,
    color: "#9C8C7E",
    textAlign: "center",
  },

});