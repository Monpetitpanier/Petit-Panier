import React, { useEffect, useRef, useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Animated,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Shadow } from "../../theme/shadow";


const DUREE_INSPIRATION = 3000;
const DUREE_RETENUE = 1500;
const DUREE_EXPIRATION = 4000;


export default function Respiration() {
  const navigation = useNavigation();

  const [enCours, setEnCours] = useState(false);
  const [phase, setPhase] = useState("Prête à commencer");

  const echelle = useRef(
    new Animated.Value(1)
  ).current;

  const opaciteFifiOuverte = useRef(
    new Animated.Value(1)
  ).current;

  const opaciteFifiFermee = useRef(
    new Animated.Value(0)
  ).current;

  const animationActive = useRef(null);


  // =======================================
  // CYCLE DE RESPIRATION
  // =======================================

  useEffect(() => {
    if (!enCours) {
      return;
    }

    let annulee = false;

    async function lancerCycle() {
      while (!annulee) {

        // ==============================
        // INSPIRATION
        // ==============================

        setPhase("Inspire");

        await animer(
          1,
          1.07,
          DUREE_INSPIRATION
        );

        if (annulee) {
          break;
        }


        // ==============================
        // RETENUE
        // ==============================

        setPhase("Retient");

        await attendre(
          DUREE_RETENUE
        );

        if (annulee) {
          break;
        }


        // ==============================
        // EXPIRATION
        // ==============================

        setPhase("Expire");

        await animer(
          1.07,
          1,
          DUREE_EXPIRATION
        );
      }
    }


    lancerCycle();

    return () => {
      annulee = true;

      if (animationActive.current) {
        animationActive.current.stop();
      }

      echelle.setValue(1);
    };
  }, [enCours]);


  // =======================================
  // ANIMATION DU CERCLE
  // =======================================

  function animer(
    valeurDepart,
    valeurFin,
    duree
  ) {
    echelle.setValue(valeurDepart);

    return new Promise((resolve) => {

      animationActive.current =
        Animated.timing(
          echelle,
          {
            toValue: valeurFin,
            duration: duree,
            useNativeDriver: true,
          }
        );


      animationActive.current.start(
        ({ finished }) => {
          if (finished) {
            resolve();
          }
        }
      );
    });
  }


  function attendre(duree) {
    return new Promise((resolve) => {
      setTimeout(resolve, duree);
    });
  }


  // =======================================
  // COMMENCER
  // =======================================

  function commencer() {
    echelle.setValue(1);

    setPhase("Inspire");

    setEnCours(true);

    Animated.parallel([
      Animated.timing(
        opaciteFifiOuverte,
        {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }
      ),

      Animated.timing(
        opaciteFifiFermee,
        {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }
      ),
    ]).start();
  }


  // =======================================
  // ARRÊTER
  // =======================================

  function arreter() {
    setEnCours(false);

    setPhase("Prête à commencer");

    echelle.setValue(1);

    Animated.parallel([
      Animated.timing(
        opaciteFifiOuverte,
        {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }
      ),

      Animated.timing(
        opaciteFifiFermee,
        {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }
      ),
    ]).start();
  }


  return (
    <ImageBackground
      source={require(
        "../../assets/illustrations/bienetre/decor_respiration.png"
      )}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >

      <SafeAreaView
        style={styles.container}
      >

        {/* ================================= */}
        {/* RETOUR */}
        {/* ================================= */}

        <TouchableOpacity
          style={styles.boutonRetour}
          onPress={() =>
            navigation.goBack()
          }
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            color={Colors.text}
          />
        </TouchableOpacity>


        {/* ================================= */}
        {/* TITRE */}
        {/* ================================= */}

        <Text style={styles.titre}>
          Respiration
        </Text>


        {/* ================================= */}
        {/* SOUS-TITRE */}
        {/* ================================= */}

        <Text style={styles.sousTitre}>
          Prends un moment pour toi
          {"\n"}
          et respire en douceur.
        </Text>


        {/* ================================= */}
        {/* ZONE FIFI */}
        {/* ================================= */}

        <View style={styles.zoneFifi}>

          {/* Cercle respiratoire */}

          {enCours && (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.cercleRespiration,
                {
                  transform: [
                    {
                      scale: echelle,
                    },
                  ],
                },
              ]}
            />
          )}


          {/* Fifi yeux ouverts */}

          <Animated.Image
            source={require(
              "../../assets/illustrations/bienetre/fifi_accueil_respiration.png"
            )}
            style={[
              styles.fifi,
              {
                opacity: opaciteFifiOuverte,
              },
            ]}
            resizeMode="contain"
          />


          {/* Fifi yeux fermés */}

          <Animated.Image
            source={require(
              "../../assets/illustrations/bienetre/respiration_fifi.png"
            )}
            style={[
              styles.fifi,
              styles.fifiSuperposee,
              {
                opacity: opaciteFifiFermee,
              },
            ]}
            resizeMode="contain"
          />

        </View>


        {/* ================================= */}
        {/* PHASE */}
        {/* ================================= */}

        <View style={styles.zonePhase}>

          {enCours && (
            <>
              <Text style={styles.phase}>
                {phase}
              </Text>

              <Text style={styles.instruction}>
                Respire avec Fifi
              </Text>
            </>
          )}

        </View>


        {/* ================================= */}
        {/* BOUTON */}
        {/* ================================= */}

        <TouchableOpacity
          style={
            enCours
              ? styles.boutonArreter
              : styles.boutonCommencer
          }
          onPress={
            enCours
              ? arreter
              : commencer
          }
          activeOpacity={0.8}
        >

          <MaterialCommunityIcons
            name={
              enCours
                ? "stop"
                : "leaf"
            }
            size={21}
            color={
              enCours
                ? Colors.text
                : "#FFFFFF"
            }
          />

          <Text
            style={
              enCours
                ? styles.texteBoutonArreter
                : styles.texteBouton
            }
          >
            {enCours
              ? "Arrêter"
              : "Commencer"}
          </Text>

        </TouchableOpacity>


        {/* ================================= */}
        {/* BAS DE PAGE */}
        {/* ================================= */}

        <Text style={styles.basDePage}>
          🌿 Respire à ton rythme 🌿
        </Text>

      </SafeAreaView>

    </ImageBackground>
  );
}


const styles = StyleSheet.create({

  // =======================================
  // FOND
  // =======================================

  background: {
    flex: 1,
  },

  backgroundImage: {
    resizeMode: "cover",
  },


  // =======================================
  // CONTENEUR
  // =======================================

  container: {
    flex: 1,

    paddingHorizontal: Spacing.lg,

    alignItems: "center",
  },


  // =======================================
  // RETOUR
  // =======================================

  boutonRetour: {
    alignSelf: "flex-start",

    width: 44,
    height: 44,

    borderRadius: 22,

    alignItems: "center",
    justifyContent: "center",

    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },


  // =======================================
  // TITRE
  // =======================================

  titre: {
    fontSize: 30,
    fontWeight: "700",

    color: Colors.text,

    textAlign: "center",

    transform: [
      {
        translateY: 10,
      },
    ],
  },


  // =======================================
  // SOUS-TITRE
  // =======================================

  sousTitre: {
    marginTop: Spacing.xs,

    fontSize: 16,
    lineHeight: 23,

    color: Colors.subtitle,

    textAlign: "center",

    transform: [
      {
        translateY: 6,
      },
    ],
  },


  // =======================================
  // ZONE FIFI
  // =======================================

  zoneFifi: {
    width: "100%",
    height: 360,

    alignItems: "center",
    justifyContent: "center",

    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },

fifi: {
  width: 330,
  height: 330,

  position: "absolute",

  zIndex: 2,

  transform: [
    {
      translateY: 92,
    },
  ],
},


  // =======================================
  // CERCLE
  // =======================================

  cercleRespiration: {
    position: "absolute",

    width: 270,
    height: 270,

    borderRadius: 135,

    borderWidth: 2,

    borderColor:
      "rgba(139, 168, 136, 0.55)",

    zIndex: 1,
  },


  // =======================================
  // PHASE
  // =======================================

  zonePhase: {
    height: 55,

    alignItems: "center",
    justifyContent: "center",

    marginTop: -Spacing.xs,
    marginBottom: Spacing.xs,
  },


  phase: {
    fontSize: 23,

    fontWeight: "700",

    color: Colors.text,

    textAlign: "center",
  },


  instruction: {
    marginTop: 2,

    fontSize: 14,

    color: Colors.subtitle,

    textAlign: "center",
  },


  // =======================================
  // BOUTON COMMENCER
  // =======================================

  boutonCommencer: {
    width: "82%",

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    backgroundColor: "#8BA888",

    borderRadius: 28,

    paddingVertical: 14,

    marginTop: Spacing.xs,
    marginBottom: Spacing.md,

    ...Shadow.card,
  },


  texteBouton: {
    color: "#FFFFFF",

    fontSize: 17,

    fontWeight: "700",
  },


  // =======================================
  // BOUTON ARRÊTER
  // =======================================

  boutonArreter: {
    width: "82%",

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    backgroundColor: Colors.card,

    borderRadius: 28,

    paddingVertical: 14,

    marginTop: Spacing.xs,
    marginBottom: Spacing.md,

    ...Shadow.card,
  },


  texteBoutonArreter: {
    color: Colors.text,

    fontSize: 17,

    fontWeight: "700",
  },


  // =======================================
  // BAS DE PAGE
  // =======================================

  basDePage: {
    fontSize: 14,

    color: Colors.subtitle,

    textAlign: "center",

    marginTop: Spacing.xs,
  },

});