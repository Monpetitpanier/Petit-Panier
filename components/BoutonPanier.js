import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

import { usePanier } from "../contexts/PanierContext";

import {
  prendrePhoto,
  choisirDansGalerie,
} from "../services/imageService";

import BoutonPrincipal from "./BoutonPrincipal";
 
export default function BoutonPanier() {
  const [ouvert, setOuvert] = useState(false);
  const [texte, setTexte] = useState("");

  // Une seule pièce jointe pour le moment
  const [pieceJointe, setPieceJointe] = useState(null);

  const { ajouterNote } = usePanier();

  const { showActionSheetWithOptions } =
    useActionSheet();

  async function ouvrirCamera() {
    const image = await prendrePhoto();

    if (image) {
      setPieceJointe(image);
    }
  }

  async function ouvrirGalerie() {
    const image = await choisirDansGalerie();

    if (image) {
      setPieceJointe(image);
    }
  }

  function supprimerPieceJointe() {
    setPieceJointe(null);
  }

  function ouvrirMenuPhoto() {
    showActionSheetWithOptions(
      {
        options: [
          "📸 Prendre une photo",
          "🖼️ Choisir dans la galerie",
          "Annuler",
        ],
        cancelButtonIndex: 2,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            ouvrirCamera();
            break;

          case 1:
            ouvrirGalerie();
            break;

          default:
            break;
        }
      }
    );
  }

  function deposeDansLePanier() {
    ajouterNote(
      texte.trim(),
      "texte",
      pieceJointe
    );

    setTexte("");
    setPieceJointe(null);
    setOuvert(false);
  }

  if (!ouvert) {
    return (
      <BoutonPrincipal
        titre="🧺 Dépose dans mon Petit Panier"
        onPress={() => setOuvert(true)}
      />
    );
  }

  return (
    <View style={styles.postIt}>

      <View style={styles.entete}>

        <Text style={styles.titre}>
          Que souhaites-tu me confier ?
        </Text>

        <TouchableOpacity
          onPress={() => {
            setTexte("");
            setPieceJointe(null);
            setOuvert(false);
          }}
        >
          <MaterialCommunityIcons
            name="close"
            size={24}
            color="#8B6B4A"
          />
        </TouchableOpacity>

      </View>

      <TextInput
        style={styles.zoneTexte}
        multiline
        value={texte}
        onChangeText={setTexte}
        placeholder="Écris ici..."
        placeholderTextColor="#B7AAA0"
        textAlignVertical="top"
      />

      {pieceJointe && pieceJointe.type === "image" && (

        <View style={styles.apercuContainer}>

          <Image
            source={{ uri: pieceJointe.uri }}
            style={styles.apercuImage}
          />

          <TouchableOpacity
            style={styles.boutonSupprimer}
            onPress={supprimerPieceJointe}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={24}
              color="#C97B7B"
            />
          </TouchableOpacity>

        </View>

      )}

      <View style={styles.actions}>

        <TouchableOpacity>
          <MaterialCommunityIcons
            name="paperclip"
            size={24}
            color="#8B6B4A"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icone}
          onPress={ouvrirMenuPhoto}
        >
          <MaterialCommunityIcons
            name="camera-outline"
            size={24}
            color="#8B6B4A"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icone}>
          <MaterialCommunityIcons
            name="microphone-outline"
            size={24}
            color="#8B6B4A"
          />
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          disabled={
            !texte.trim() && !pieceJointe
          }
          onPress={deposeDansLePanier}
        >
          <MaterialCommunityIcons
            name="paw"
            size={30}
            color={
              texte.trim() || pieceJointe
                ? "#8B6B4A"
                : "#D4C7BB"
            }
          />
        </TouchableOpacity>

      </View>

    </View>
  );
}
const styles = StyleSheet.create({  

  postIt: {
    backgroundColor: "#FFF9F1",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8DCCB",
    padding: 18,
    marginVertical: 10,
  },

  entete: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  titre: {
    fontSize: 18,
    fontWeight: "600",
    color: "#5A4A42",
  },

  zoneTexte: {
    backgroundColor: "#FFFDF8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8DCCB",
    minHeight: 140,
    padding: 15,
    fontSize: 16,
    color: "#4D4038",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  icone: {
    marginLeft: 18,
  },

  apercuContainer: {
    marginTop: 16,
    alignSelf: "flex-start",
    position: "relative",
  },

  apercuImage: {
    width: 120,
    height: 120,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E8DCCB",
  },

  boutonSupprimer: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FFF9F1",
    borderRadius: 12,
  },
});