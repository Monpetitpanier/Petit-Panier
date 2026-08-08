import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { usePanier } from "../contexts/PanierContext";


// --------------------------------------------------
// SAISON
// --------------------------------------------------

function obtenirSaison() {
  const mois = new Date().getMonth() + 1;

  if (mois >= 3 && mois <= 5) return "printemps";
  if (mois >= 6 && mois <= 8) return "ete";
  if (mois >= 9 && mois <= 11) return "automne";

  return "hiver";
}

const paysages = {
  printemps: require("../assets/environment/printemps.png"),
  ete: require("../assets/environment/ete.png"),
  automne: require("../assets/environment/automne.png"),
  hiver: require("../assets/environment/hiver.png"),
};


// --------------------------------------------------
// RESPIRATION
// --------------------------------------------------

const RESPIRATION_REPOS = {
  inspire: 2200,
  expire: 2600,
  amplitude: 1.035,
};

const RESPIRATION_ANALYSE = {
  inspire: 1100,
  expire: 1300,
  amplitude: 1.06,
};


// --------------------------------------------------
// FIFI ACCUEIL
// --------------------------------------------------

export default function FifiAccueil() {

  const saison = obtenirSaison();

  const [prenom, setPrenom] = useState("");

  const { enAnalyse } = usePanier();


  // --------------------------------------------------
  // Prénom utilisateur
  // --------------------------------------------------

  useEffect(() => {

    const chargerPrenom = async () => {

      try {

        const prenomEnregistre =
          await AsyncStorage.getItem("prenom_utilisateur");

        if (prenomEnregistre) {
          setPrenom(prenomEnregistre);
        }

      } catch (erreur) {

        console.error(erreur);

      }

    };

    chargerPrenom();

  }, []);


  // --------------------------------------------------
  // Date du jour
  // --------------------------------------------------

  const dateDuJour = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  const dateFormatee =
    dateDuJour.charAt(0).toUpperCase() +
    dateDuJour.slice(1);


  // --------------------------------------------------
  // Respiration de Fifi
  // --------------------------------------------------

  const respiration =
    useRef(new Animated.Value(0)).current;

  useEffect(() => {

    const config = enAnalyse
      ? RESPIRATION_ANALYSE
      : RESPIRATION_REPOS;

    respiration.setValue(0);

    const animation = Animated.loop(

      Animated.sequence([

        Animated.timing(respiration, {
          toValue: 2,
          duration: config.inspire,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),

        Animated.timing(respiration, {
          toValue: 0,
          duration: config.expire,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),

      ])

    );

    animation.start();

    return () => {
      animation.stop();
    };

  }, [respiration, enAnalyse]);


  const configActuelle = enAnalyse
    ? RESPIRATION_ANALYSE
    : RESPIRATION_REPOS;


  const echelleRespiration =
    respiration.interpolate({

      inputRange: [0, 2],

      outputRange: [
        1,
        configActuelle.amplitude,
      ],

    });


  // --------------------------------------------------
  // NOTE QUI S'ENVOLE VERS LE PANIER
  // --------------------------------------------------

  const progressionNote =
    useRef(new Animated.Value(0)).current;

  const [noteVisible, setNoteVisible] =
    useState(false);

  const dejaJoueePour =
    useRef(false);


  useEffect(() => {

    if (
      enAnalyse &&
      !dejaJoueePour.current
    ) {

      dejaJoueePour.current = true;

      setNoteVisible(true);

      progressionNote.setValue(0);


      Animated.timing(progressionNote, {

        toValue: 1,

        duration: 850,

        easing: Easing.out(Easing.cubic),

        useNativeDriver: true,

      }).start(() => {

        setNoteVisible(false);

      });

    }


    if (!enAnalyse) {

      dejaJoueePour.current = false;

    }

  }, [enAnalyse, progressionNote]);


  const noteTranslateY =
    progressionNote.interpolate({

      inputRange: [0, 0.75, 1],

      outputRange: [0, -20, -45],

    });


  const noteTranslateX =
    progressionNote.interpolate({

      inputRange: [0, 0.5, 1],

      outputRange: [0, -5, 0],

    });


  const noteRotation =
    progressionNote.interpolate({

      inputRange: [0, 0.4, 0.7, 1],

      outputRange: [
        "0deg",
        "-4deg",
        "3deg",
        "0deg",
      ],

    });


  const noteOpacity =
    progressionNote.interpolate({

      inputRange: [0, 0.15, 0.8, 1],

      outputRange: [0, 1, 1, 0],

    });


  const noteEchelle =
    progressionNote.interpolate({

      inputRange: [0, 1],

      outputRange: [1, 0.75],

    });


  // --------------------------------------------------
  // AFFICHAGE
  // --------------------------------------------------

  return (

    <View style={styles.scene}>

      {/* ------------------------------------------ */}
      {/* Paysage */}
      {/* ------------------------------------------ */}

      <Image
        source={paysages[saison]}
        style={styles.paysage}
      />

      {/* Voile doux sur le paysage */}
      <View
        pointerEvents="none"
        style={styles.filtrePaysage}
      />


      {/* ------------------------------------------ */}
      {/* Maison */}
      {/* ------------------------------------------ */}

      <Image
        source={require(
          "../assets/environment/maison_fifi.png"
        )}
        style={styles.maison}
      />


      {/* ------------------------------------------ */}
      {/* Panier arrière */}
      {/* ------------------------------------------ */}

      <Image
        source={require(
          "../assets/furniture/panier_arriere_accueil.png"
        )}
        style={styles.panier}
      />


      {/* ------------------------------------------ */}
      {/* Fifi de base */}
      {/* ------------------------------------------ */}

      <Image
        source={require(
          "../assets/characters/Fifi/poses/curieuse_pattes_panier.png"
        )}
        style={styles.fifi}
      />


      {/* ------------------------------------------ */}
      {/* Poitrine — respiration */}
      {/* ------------------------------------------ */}

      <Animated.View
        style={[
          styles.fifiImageOverlay,
          {
            transform: [
              {
                scale: echelleRespiration,
              },
            ],
          },
        ]}
      >

        <Image
          source={require(
            "../assets/characters/Fifi/animations/respiration/poitrine_curieuse.png"
          )}
          style={styles.fifiImage}
        />

      </Animated.View>


      {/* ------------------------------------------ */}
      {/* NOTE */}
      {/* ------------------------------------------ */}

      {noteVisible && (

        <Animated.View
          style={[
            styles.note,
            {
              opacity: noteOpacity,

              transform: [

                {
                  translateX:
                    noteTranslateX,
                },

                {
                  translateY:
                    noteTranslateY,
                },

                {
                  rotate:
                    noteRotation,
                },

                {
                  scale:
                    noteEchelle,
                },

              ],

            },
          ]}
        >

          <View style={styles.notePapier}>

            <View
              style={styles.noteLigne}
            />

            <View
              style={[
                styles.noteLigne,
                {
                  width: "60%",
                },
              ]}
            />

          </View>

        </Animated.View>

      )}


      {/* ------------------------------------------ */}
      {/* Panier avant */}
      {/* ------------------------------------------ */}

      <Image
        source={require(
          "../assets/furniture/panier_avant_accueil.png"
        )}
        style={styles.panier}
      />


      {/* ------------------------------------------ */}
      {/* FONDU MAISON → BOUTON */}
      {/* ------------------------------------------ */}

      <LinearGradient
        pointerEvents="none"
        colors={[
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0.45)",
          "rgba(255,255,255,0.95)",
          "#FFFDF8",
        ]}
        style={styles.fonduMaison}
      />


      {/* ------------------------------------------ */}
      {/* NOTIFICATIONS */}
      {/* ------------------------------------------ */}

      <TouchableOpacity
        style={styles.boutonNotifications}
        activeOpacity={0.8}
        onPress={() => {}}
      >
        <MaterialCommunityIcons
          name="bell-outline"
          size={24}
          color="#5A4030"
        />
      </TouchableOpacity>


      {/* ------------------------------------------ */}
      {/* Tableau */}
      {/* ------------------------------------------ */}

      <View style={styles.tableau}>

        <Text
          style={styles.bonjour}
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          Bonjour
          {prenom ? ` ${prenom}` : ""}
        </Text>


        <Text
          style={styles.date}
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {dateFormatee}
        </Text>

      </View>

    </View>

  );

}


// --------------------------------------------------
// STYLES
// --------------------------------------------------

const styles = StyleSheet.create({

  // ------------------------------------------------
  // SCÈNE
  // ------------------------------------------------

  scene: {
    width: "100%",
    height: 370,
    position: "relative",
    overflow: "hidden",
    borderRadius: 24,
  },


  // ------------------------------------------------
  // PAYSAGE
  // ------------------------------------------------

  paysage: {
    position: "absolute",
    top: "0%",
    left: "40%",
    width: "55%",
    height: "89%",
    resizeMode: "cover",
  },


  filtrePaysage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "89%",
    backgroundColor: "rgba(255, 250, 240, 0.45)",
  },


  // ------------------------------------------------
  // MAISON
  // ------------------------------------------------

  maison: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 370,
    resizeMode: "cover",
  },


  // ------------------------------------------------
  // PANIER
  // ------------------------------------------------

  panier: {
    position: "absolute",
    width: 210,
    height: 135,
    left: "58%",
    bottom: -20,

    transform: [
      {
        translateX: -140,
      },
    ],

    resizeMode: "contain",
  },


  // ------------------------------------------------
  // FIFI
  // ------------------------------------------------

  fifi: {
    position: "absolute",
    width: 150,
    height: 165,
    left: "57%",
    bottom: 38,

    transform: [
      {
        translateX: -105,
      },
    ],

    resizeMode: "contain",
  },


  // ------------------------------------------------
  // CALQUE POITRINE
  // ------------------------------------------------

  fifiImageOverlay: {
    position: "absolute",
    width: 150,
    height: 165,
    left: "30%",
    bottom: 37,

    transform: [
      {
        translateX: -105,
      },
    ],
  },


  fifiImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },


  // ------------------------------------------------
  // NOTE
  // ------------------------------------------------

  note: {
    position: "absolute",
    top: "90%",
    left: "50%",
    zIndex: 5,
  },


  notePapier: {
    width: 34,
    height: 34,

    backgroundColor: "#FFF9F1",

    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E8DCCB",

    padding: 6,

    justifyContent: "center",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },


  noteLigne: {
    height: 2,
    backgroundColor: "#D4C7BB",
    borderRadius: 1,
    marginVertical: 2,
    width: "100%",
  },


  // ------------------------------------------------
  // FONDU
  // ------------------------------------------------

  fonduMaison: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 10,
    zIndex: 4,
  },


  // ------------------------------------------------
  // NOTIFICATIONS
  // ------------------------------------------------

  boutonNotifications: {
    position: "absolute",

    top: 15,
    right: 15,

    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: "#E8B7B7",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#6B4F45",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,

    zIndex: 10,
  },


  // ------------------------------------------------
  // TABLEAU
  // ------------------------------------------------

  tableau: {
    position: "absolute",

    left: "5%",
    top: "15%",

    width: "24%",
    height: "22%",

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 4,
    paddingVertical: 4,
  },


  bonjour: {
    fontSize: 25,
    fontWeight: "700",
    color: "#5A4030",
    textAlign: "center",
  },


  date: {
    marginTop: 5,
    fontSize: 20,
    color: "#8B7464",
    textAlign: "center",
  },

});