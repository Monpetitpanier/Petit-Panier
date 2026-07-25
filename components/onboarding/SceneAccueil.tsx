import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Fifi, { FIFI_CANVAS_W, FIFI_CANVAS_H } from "./Fifi";
import Panier from "./Panier";
import CarteBienvenue from "./CarteBienvenue";
import { usePanier } from "../../contexts/PanierContext";

const CLE_INTRO_VUE = "fifi_intro_vue";

const HAUTEUR_FIFI = 360;
const LARGEUR_FIFI = HAUTEUR_FIFI * (FIFI_CANVAS_W / FIFI_CANVAS_H);
const POSITION_FIFI = 55;
const LARGEUR_PANIER = 280;

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

// Dimensions réelles des images recadrées (marche/saut)
const MARCHE_RATIO = 885 / 1112;
const SAUT_RATIO = 899 / 713;

const HAUTEUR_MARCHE = 225;
const LARGEUR_MARCHE = HAUTEUR_MARCHE * MARCHE_RATIO;

const LARGEUR_SAUT = LARGEUR_MARCHE * 1.15;
const HAUTEUR_SAUT = LARGEUR_SAUT / SAUT_RATIO;

const DECALAGE_ENTREE = 400; // distance (px) hors-écran à gauche, point de départ de la marche
const MODE_DEVELOPPEMENT_INTRO = true;
type Props = {
  onTerminerOnboarding?: () => void;
};

export default function SceneAccueil({ onTerminerOnboarding }: Props) {
  const { enAnalyse } = usePanier();

  const [pretPourSequence, setPretPourSequence] = useState(false);
  const [jouerIntro, setJouerIntro] = useState(false);
  const [afficherCarte, setAfficherCarte] = useState(false);

  // --- Détermine si c'est la première ouverture ---
  useEffect(() => {
    AsyncStorage.getItem(CLE_INTRO_VUE).then((valeur) => {
  setJouerIntro(
    MODE_DEVELOPPEMENT_INTRO ? true : valeur !== "true"
  );
  setPretPourSequence(true);
});
  }, []);

  // --- Animations d'entrée (marche -> saut -> atterrissage -> dandinement) ---
  const translateXEntree = useRef(new Animated.Value(-DECALAGE_ENTREE)).current;
  const translateYSaut = useRef(new Animated.Value(0)).current;
  const opaciteMarche = useRef(new Animated.Value(0)).current;
  const opaciteSaut = useRef(new Animated.Value(0)).current;
  const opaciteCorpsGroupe = useRef(new Animated.Value(0)).current;
  const rebondCorps = useRef(new Animated.Value(1)).current;
  const dandinement = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!pretPourSequence) return;

    if (!jouerIntro) {
      // Pas la première fois : Fifi directement assise, pas d'animation d'entrée
      opaciteCorpsGroupe.setValue(1);
      setAfficherCarte(false);
      return;
    }

    opaciteMarche.setValue(1);

    Animated.sequence([
      // 1. Marche depuis le bord gauche
      Animated.timing(translateXEntree, {
        toValue: -50,
        duration: 1100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.delay(120),
      // 2. Saut : fondu marche -> saut + arc vers le haut, fin de la translation
      Animated.parallel([
        Animated.timing(opaciteMarche, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opaciteSaut, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translateXEntree, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(translateYSaut, {
            toValue: -55,
            duration: 250,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(translateYSaut, {
            toValue: 0,
            duration: 250,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]),
      // 3. Atterrissage : fondu saut -> assise + petit rebond
      Animated.parallel([
        Animated.timing(opaciteSaut, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(opaciteCorpsGroupe, {
          toValue: 1,
          duration: 150,
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
      ]),
      // 4. Dandinement (2 oscillations, elle s'installe)
      Animated.sequence([
        Animated.timing(dandinement, {
          toValue: 1,
          duration: 180,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(dandinement, {
          toValue: -1,
          duration: 360,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(dandinement, {
          toValue: 0,
          duration: 180,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      AsyncStorage.setItem(CLE_INTRO_VUE, "true");
      setTimeout(() => setAfficherCarte(true), 300);
    });
  }, [pretPourSequence, jouerIntro]);

  const rotationDandinement = dandinement.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-4deg", "0deg", "4deg"],
  });

  // --- Respiration (rythme dépendant de enAnalyse) ---
  const respiration = useRef(new Animated.Value(0)).current;
  const RESPIRATION_REPOS = { inspire: 2200, expire: 2600, amplitudeY: 1.035, amplitudeX: 1.015 };
  const RESPIRATION_ANALYSE = { inspire: 1100, expire: 1300, amplitudeY: 1.06, amplitudeX: 1.03 };

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

  const terminerOnboarding = () => {
    setAfficherCarte(false);
    onTerminerOnboarding?.();
  };

  return (
    <View style={styles.container}>
      <Panier width={LARGEUR_PANIER} style={styles.panier} />

      {/* Pose "marche" : visible uniquement pendant l'entrée */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          bottom: POSITION_FIFI,
          width: LARGEUR_MARCHE,
          height: HAUTEUR_MARCHE,
          opacity: opaciteMarche,
          transform: [{ translateX: translateXEntree }],
        }}
      >
        <Image
          source={require("../../assets/characters/fifi_marche.png")}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>

      {/* Pose "saut" : visible uniquement pendant le bond */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          bottom: POSITION_FIFI,
          width: LARGEUR_SAUT,
          height: HAUTEUR_SAUT,
          opacity: opaciteSaut,
          transform: [{ translateX: translateXEntree }, { translateY: translateYSaut }],
        }}
      >
        <Image
          source={require("../../assets/characters/fifi_saut.png")}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      </Animated.View>

      {/* Groupe "assise" (corps + poitrine + yeux + oreilles), avec rebond + dandinement */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: POSITION_FIFI,
          width: LARGEUR_FIFI,
          height: HAUTEUR_FIFI,
          opacity: opaciteCorpsGroupe,
          transform: [{ scale: rebondCorps }, { rotate: rotationDandinement }],
        }}
      >
        <Pressable onPress={faireClinOeil} hitSlop={20} style={{ width: "100%", height: "100%" }}>
          <Fifi size={HAUTEUR_FIFI} />

          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              { transform: [{ translateY: translateYCorps }, { scaleX }, { scaleY }] },
            ]}
          >
            <Image
              source={require("../../assets/characters/fifi_poitrine.png")}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </Animated.View>

          <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: clignement }]}>
            <Image
              source={require("../../assets/characters/fifi_yeux_fermes.png")}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </Animated.View>

          <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: clinOeil }]}>
            <Image
              source={require("../../assets/characters/fifi_clin_oeil_droit.png")}
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
              source={require("../../assets/characters/fifi_oreille_gauche.png")}
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
              source={require("../../assets/characters/fifi_oreille_droite.png")}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </Animated.View>
        </Pressable>
      </Animated.View>

      {afficherCarte && (
        <View style={styles.carteConteneur}>
          <CarteBienvenue onContinuer={terminerOnboarding} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 430,
    position: "relative",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  panier: { position: "absolute", bottom: 0 },
  carteConteneur: {
    position: "absolute",
    bottom: -260, // sous la scène ; ajuste selon la mise en page de ton écran
    width: "100%",
    paddingHorizontal: 20,
  },
});