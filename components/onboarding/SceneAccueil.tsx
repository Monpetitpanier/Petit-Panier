import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEventListener } from "expo";

import Fifi, { FIFI_CANVAS_W, FIFI_CANVAS_H } from "./Fifi";
import Panier from "./Panier";
import { usePanier } from "../../contexts/PanierContext";

const CLE_INTRO_VUE = "fifi_intro_vue";

const HAUTEUR_FIFI = 360;
const LARGEUR_FIFI = HAUTEUR_FIFI * (FIFI_CANVAS_W / FIFI_CANVAS_H);
const POSITION_FIFI = 318; // ancien 98, +220 pour compenser l'agrandissement du conteneur
const LARGEUR_PANIER = 420;

const OREILLE_GAUCHE = {
  left: (280 / FIFI_CANVAS_W) * 100,
  top: (200 / FIFI_CANVAS_H) * 100,
  width: (210 / FIFI_CANVAS_W) * 100,
  height: (210 / FIFI_CANVAS_H) * 100,
};
const OREILLE_DROITE = {
  left: (540 / FIFI_CANVAS_W) * 100,
  top: (200 / FIFI_CANVAS_H) * 100,
  width: (210 / FIFI_CANVAS_W) * 100,
  height: (210 / FIFI_CANVAS_H) * 100,
};

const MODE_DEVELOPPEMENT_INTRO = true;

const SOURCE_VIDEO_INTRO = require("../../assets/characters/Fifi/animations/arriveeFifi.mp4");

type Props = {
  onPretPourCarte?: () => void;
  jouerVideoIntro?: boolean; // false = Fifi directement assise, sans vidéo ni animation d'entrée
};

export default function SceneAccueil({ onPretPourCarte, jouerVideoIntro = true }: Props) {
  const { enAnalyse } = usePanier();

  const [pretPourSequence, setPretPourSequence] = useState(false);
  const [jouerIntro, setJouerIntro] = useState(false);
  const [videoTerminee, setVideoTerminee] = useState(false);

  // --- Détermine si c'est la première ouverture (uniquement pertinent si jouerVideoIntro) ---
  useEffect(() => {
    if (!jouerVideoIntro) {
      setPretPourSequence(true);
      return;
    }
    AsyncStorage.getItem(CLE_INTRO_VUE).then((valeur) => {
      setJouerIntro(MODE_DEVELOPPEMENT_INTRO ? true : valeur !== "true");
      setPretPourSequence(true);
    });
  }, [jouerVideoIntro]);

  // --- Lecteur vidéo de l'animation d'arrivée ---
  const playerIntro = useVideoPlayer(SOURCE_VIDEO_INTRO, (player) => {
    player.loop = false;
  });

  useEventListener(playerIntro, "playToEnd", () => {
    setVideoTerminee(true);
  });

  useEffect(() => {
    if (jouerVideoIntro && pretPourSequence && jouerIntro) {
      playerIntro.play();
    }
  }, [pretPourSequence, jouerIntro, jouerVideoIntro]);

  // --- Apparition de Fifi assise (groupe) ---
  const opaciteCorpsGroupe = useRef(new Animated.Value(0)).current;
  const rebondCorps = useRef(new Animated.Value(1)).current;

  // Cas où on ne joue pas la vidéo : Fifi apparaît directement, en fondu simple
  useEffect(() => {
    if (!pretPourSequence || jouerVideoIntro) return;

    Animated.timing(opaciteCorpsGroupe, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onPretPourCarte?.();
    });
  }, [pretPourSequence, jouerVideoIntro]);

  // Cas où c'est la vidéo qui joue, mais que ce n'est pas la première ouverture : Fifi directement assise
  useEffect(() => {
    if (!pretPourSequence || !jouerVideoIntro) return;

    if (!jouerIntro) {
      // Pas la première fois : Fifi directement assise, pas de vidéo
      opaciteCorpsGroupe.setValue(1);
      onPretPourCarte?.();
    }
  }, [pretPourSequence, jouerIntro, jouerVideoIntro]);

  // Cas où la vidéo vient de se terminer : Fifi apparaît avec le petit rebond d'atterrissage
  useEffect(() => {
    if (!videoTerminee) return;

    Animated.parallel([
      Animated.timing(opaciteCorpsGroupe, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(rebondCorps, {
          toValue: 0.9,
          duration: 90,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(rebondCorps, {
          toValue: 1.04,
          duration: 100,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(rebondCorps, {
          toValue: 1,
          duration: 110,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      AsyncStorage.setItem(CLE_INTRO_VUE, "true");
      setTimeout(() => onPretPourCarte?.(), 300);
    });
  }, [videoTerminee]);

  // --- Respiration (rythme dépendant de enAnalyse) ---
  const respiration = useRef(new Animated.Value(0)).current;
  const RESPIRATION_REPOS = { inspire: 2200, expire: 2600, amplitudeY: 1.06, amplitudeX: 1.025 };
  const RESPIRATION_ANALYSE = { inspire: 1100, expire: 1300, amplitudeY: 1.09, amplitudeX: 1.045 };

  useEffect(() => {
    const config = enAnalyse ? RESPIRATION_ANALYSE : RESPIRATION_REPOS;
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(respiration, {
          toValue: 1,
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
    return () => animation.stop();
  }, [respiration, enAnalyse]);

  const configActuelle = enAnalyse ? RESPIRATION_ANALYSE : RESPIRATION_REPOS;
  const scaleY = respiration.interpolate({ inputRange: [0, 1], outputRange: [1, configActuelle.amplitudeY] });
  const scaleX = respiration.interpolate({ inputRange: [0, 1], outputRange: [1, configActuelle.amplitudeX] });
  const translateYCorps = respiration.interpolate({ inputRange: [0, 1], outputRange: [0, -3] });

  // --- Clignement des yeux ---
  const clignement = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let annule = false;

    const faireUnClin = (): Promise<void> =>
      new Promise((resolve) => {
        Animated.sequence([
          Animated.timing(clignement, { toValue: 1, duration: 70, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          Animated.timing(clignement, { toValue: 1, duration: 50, useNativeDriver: true }),
          Animated.timing(clignement, { toValue: 0, duration: 110, easing: Easing.in(Easing.quad), useNativeDriver: true }),
        ]).start(() => resolve());
      });

    const planifierProchainClignement = () => {
      const delai = 2500 + Math.random() * 3500;
      timeoutId = setTimeout(async () => {
        if (annule) return;
        await faireUnClin();
        if (!annule && Math.random() < 0.15) {
          await new Promise((r) => setTimeout(r, 120));
          if (!annule) await faireUnClin();
        }
        if (!annule) planifierProchainClignement();
      }, delai);
    };

    planifierProchainClignement();
    return () => {
      annule = true;
      clearTimeout(timeoutId);
    };
  }, [clignement]);

  // --- Mouvement des oreilles ---
  const oreilleG = useRef(new Animated.Value(0)).current;
  const oreilleD = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animG = Animated.loop(
      Animated.sequence([
        Animated.timing(oreilleG, { toValue: 1, duration: 2600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(oreilleG, { toValue: 0, duration: 3100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    const animD = Animated.loop(
      Animated.sequence([
        Animated.timing(oreilleD, { toValue: 1, duration: 3400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(oreilleD, { toValue: 0, duration: 2900, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    animG.start();
    animD.start();
    return () => {
      animG.stop();
      animD.stop();
    };
  }, [oreilleG, oreilleD]);

  const rotationOreilleG = oreilleG.interpolate({ inputRange: [0, 1], outputRange: ["-2.5deg", "2.5deg"] });
  const rotationOreilleD = oreilleD.interpolate({ inputRange: [0, 1], outputRange: ["2.5deg", "-2.5deg"] });

  // --- Clin d'œil au tap ---
  const clinOeil = useRef(new Animated.Value(0)).current;
  const enClinOeil = useRef(false);
  const faireClinOeil = () => {
    if (enClinOeil.current) return;
    enClinOeil.current = true;
    Animated.sequence([
      Animated.timing(clinOeil, { toValue: 1, duration: 90, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.timing(clinOeil, { toValue: 1, duration: 180, useNativeDriver: true }),
      Animated.timing(clinOeil, { toValue: 0, duration: 130, easing: Easing.in(Easing.quad), useNativeDriver: true }),
    ]).start(() => {
      enClinOeil.current = false;
    });
  };

  const afficherVideo = jouerVideoIntro && jouerIntro && !videoTerminee;
  const afficherFifiAssise = !jouerVideoIntro || !jouerIntro || videoTerminee;

  return (
    <View style={styles.container}>
      {afficherVideo && (
        <Modal visible={afficherVideo} animationType="fade" transparent={false}>
          <VideoView
            player={playerIntro}
            style={styles.videoPleinEcran}
            contentFit="cover"
            nativeControls={false}
          />
        </Modal>
      )}

      {afficherFifiAssise && (
        <>
          <Panier partie="arriere" width={LARGEUR_PANIER} style={styles.panier} />

          <Animated.View
            style={{
              position: "absolute",
              bottom: POSITION_FIFI - 240,
              width: LARGEUR_FIFI,
              height: HAUTEUR_FIFI,
              opacity: opaciteCorpsGroupe,
              transform: [{ scale: rebondCorps }],
            }}
          >
            <Pressable onPress={faireClinOeil} hitSlop={20} style={{ width: "100%", height: "100%" }}>
              <Fifi size={HAUTEUR_FIFI} />

              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  { transform: [{ translateY: translateYCorps }, { scaleX }, { scaleY }] },
                ]}
              >
                <Image
                  source={require("../../assets/characters/Fifi/visage/poitrine.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </Animated.View>

              <Animated.View style={[StyleSheet.absoluteFill, { opacity: clignement }]}>
                <Image
                  source={require("../../assets/characters/Fifi/visage/yeux_fermes.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </Animated.View>

              <Animated.View style={[StyleSheet.absoluteFill, { opacity: clinOeil }]}>
                <Image
                  source={require("../../assets/characters/Fifi/visage/clin_oeil_droit.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </Animated.View>

              <Animated.View
                style={{
                  position: "absolute",
                  left: `${OREILLE_GAUCHE.left}%`,
                  top: `${OREILLE_GAUCHE.top}%`,
                  width: `${OREILLE_GAUCHE.width}%`,
                  height: `${OREILLE_GAUCHE.height}%`,
                  transformOrigin: ["50%", "82%", 0],
                  transform: [{ rotate: rotationOreilleG }],
                }}
              >
                <Image
                  source={require("../../assets/characters/Fifi/visage/oreille_gauche.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </Animated.View>

              <Animated.View
                style={{
                  position: "absolute",
                  left: `${OREILLE_DROITE.left}%`,
                  top: `${OREILLE_DROITE.top}%`,
                  width: `${OREILLE_DROITE.width}%`,
                  height: `${OREILLE_DROITE.height}%`,
                  transformOrigin: ["50%", "82%", 0],
                  transform: [{ rotate: rotationOreilleD }],
                }}
              >
                <Image
                  source={require("../../assets/characters/Fifi/visage/oreille_droite.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </Animated.View>
            </Pressable>
          </Animated.View>

          <Panier
            partie="avant"
            width={LARGEUR_PANIER}
            style={[styles.panier, { transform: [{ translateY: 7 }] }]}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  width: "100%",
  height: 520, // ancien 430
  position: "relative",
  justifyContent: "flex-end",
  alignItems: "center",
},
  videoPleinEcran: {
    flex: 1,
    backgroundColor: "#000",
  },
  panier: { position: "absolute", bottom: 0 }, // ancien -220
});