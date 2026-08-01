import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const HAUTEUR_FIFI = 170;
const LARGEUR_PANIER = 220;

type Props = {
  etape: number;
  totalEtapes?: number;
  titre: string;
  sousTitre?: string;
  children: React.ReactNode;
  texteBouton?: string;
  onSuivant: () => void;
  masquerRetour?: boolean;
  imageFifi?: any;
  echelleImage?: number;
  overlayImage?: React.ReactNode;
  decalageImage?: number;
};

export default function GabaritOnboarding({
  etape,
  totalEtapes = 6,
  titre,
  sousTitre,
  children,
  texteBouton = "Suivant",
  onSuivant,
  masquerRetour = false,
  imageFifi,
  echelleImage = 1,
  overlayImage,
  decalageImage = 0,
}: Props) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.entete}>
        {!masquerRetour ? (
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
            <Ionicons name="chevron-back" size={24} color="#4B4036" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 24 }} />
        )}
        <Text style={styles.progression}>
          {etape}/{totalEtapes}
        </Text>
      </View>

      <Text style={styles.coeur}>♥</Text>
      <Text style={styles.titre}>{titre} 💛</Text>
      {sousTitre ? <Text style={styles.sousTitre}>{sousTitre}</Text> : null}

      <View style={styles.contenu}>{children}</View>

      {imageFifi && (
  <View style={[styles.sceneDecorative, { marginTop: decalageImage }]}>
    <Image
      source={imageFifi}
      resizeMode="contain"
      style={{
        width: LARGEUR_PANIER * echelleImage,
        height: (HAUTEUR_FIFI + 60) * echelleImage,
      }}
    />
    {overlayImage}
  </View>
)}

      <TouchableOpacity style={styles.bouton} onPress={onSuivant} activeOpacity={0.8}>
        <Text style={styles.boutonTexte}>{texteBouton}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F4EE",
    paddingHorizontal: 24,
  },
  entete: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
  },
  progression: {
    fontSize: 14,
    color: "#6B5D53",
  },
  coeur: {
    textAlign: "center",
    fontSize: 18,
    color: "#e6a7c4",
    marginTop: 8,
  },
  titre: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4B4036",
    textAlign: "center",
    marginTop: 16,
  },
  sousTitre: {
    fontSize: 14,
    color: "#3D2F26",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },
  contenu: {
    flex: 1,
    marginTop: 24,
  },
  sceneDecorative: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: HAUTEUR_FIFI + 30,
    position: "relative",
  },
  bouton: {
    backgroundColor: "#e6a7c4",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 20,
  },
  boutonTexte: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});