
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import * as DocumentPicker from "expo-document-picker";

import { usePanier } from "../contexts/PanierContext";
import {
  prendrePhoto,
  choisirDansGalerie,
} from "../services/imageService";

export default function BoutonPanier() {
  const [ouvert, setOuvert] = useState(false);
  const [texte, setTexte] = useState("");
  const [reconnaissanceActive, setReconnaissanceActive] =
    useState(false);
  const [texteProvisoire, setTexteProvisoire] =
    useState("");
  const [pieceJointe, setPieceJointe] = useState(null);

  const { ajouterNote } = usePanier();
  const { showActionSheetWithOptions } = useActionSheet();

  // Reconnaissance vocale
  useSpeechRecognitionEvent("start", () => {
    setReconnaissanceActive(true);
  });

  useSpeechRecognitionEvent("end", () => {
    setReconnaissanceActive(false);
    setTexteProvisoire("");
  });

  useSpeechRecognitionEvent("result", (event) => {
    const resultat = event.results[0]?.transcript;

    if (!resultat) return;

    if (event.isFinal) {
      setTexte((precedent) =>
        [precedent.trim(), resultat.trim()]
          .filter(Boolean)
          .join(" ")
      );
      setTexteProvisoire("");
    } else {
      setTexteProvisoire(resultat);
    }
  });

  useSpeechRecognitionEvent("error", () => {
    setReconnaissanceActive(false);
    setTexteProvisoire("");

    Alert.alert(
      "Reconnaissance vocale",
      "La dictée n'a pas pu démarrer. Vérifie l'autorisation du micro et réessaie."
    );
  });

  async function gererDictee() {
    if (reconnaissanceActive) {
      ExpoSpeechRecognitionModule.stop();
      return;
    }

    try {
      const permission =
        await ExpoSpeechRecognitionModule.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Autorisation nécessaire",
          "Autorise l'accès au micro pour dicter tes petits mots."
        );
        return;
      }

      setTexteProvisoire("");

      ExpoSpeechRecognitionModule.start({
        lang: "fr-FR",
        interimResults: true,
        continuous: false,
      });
    } catch (erreur) {
      Alert.alert(
        "Oups !",
        "Impossible de démarrer la dictée. Réessaie dans un instant."
      );
    }
  }

  // Appareil photo
  async function ouvrirCamera() {
    try {
      const image = await prendrePhoto();

      if (image) {
        setPieceJointe(image);
      }
    } catch (erreur) {
      Alert.alert("Photo", "Impossible de prendre la photo.");
    }
  }

  // Galerie photo
  async function ouvrirGalerie() {
    try {
      const image = await choisirDansGalerie();

      if (image) {
        setPieceJointe(image);
      }
    } catch (erreur) {
      Alert.alert(
        "Galerie",
        "Impossible d'ouvrir la galerie."
      );
    }
  }

  // Choisir un fichier
  async function choisirFichier() {
    try {
      const resultat = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!resultat.canceled && resultat.assets?.length > 0) {
        const fichier = resultat.assets[0];

        setPieceJointe({
          type: "fichier",
          uri: fichier.uri,
          nom: fichier.name,
          mimeType: fichier.mimeType,
          taille: fichier.size,
        });
      }
    } catch (erreur) {
      Alert.alert(
        "Fichier",
        "Impossible d'ouvrir les fichiers. Réessaie."
      );
    }
  }

  function supprimerPieceJointe() {
    setPieceJointe(null);
  }

  // Menu de la caméra
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

  // Déposer le petit mot
  function deposeDansLePanier() {
    if (!texte.trim() && !pieceJointe) return;

    ajouterNote(
      texte.trim(),
      "texte",
      pieceJointe
    );

    setTexte("");
    setTexteProvisoire("");
    setPieceJointe(null);
    setOuvert(false);
  }

  // Carte fermée
  if (!ouvert) {
    return (
      <TouchableOpacity
        style={styles.carteDepot}
        activeOpacity={0.85}
        onPress={() => setOuvert(true)}
      >
        <View style={styles.texteDepot}>
          <Text style={styles.titreDepot}>
            C'est par ici pour déposer ton petit mot!
          </Text>
        </View>

        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color="#B58A9A"
        />
      </TouchableOpacity>
    );
  }

  // Carte ouverte
  return (
    <View style={styles.postIt}>
      <View style={styles.entete}>
        <Text style={styles.titre}>
          Que souhaites-tu me confier ?
        </Text>

        <TouchableOpacity
          onPress={() => {
            setTexte("");
            setTexteProvisoire("");
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
        value={
          texte +
          (texteProvisoire
            ? (texte ? " " : "") + texteProvisoire
            : "")
        }
        onChangeText={setTexte}
        placeholder="Écris ici..."
        placeholderTextColor="#B7AAA0"
        textAlignVertical="top"
      />

      {/* Aperçu de la photo */}
      {pieceJointe?.type === "image" && (
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

      {/* Aperçu du fichier */}
      {pieceJointe?.type === "fichier" && (
        <View style={styles.apercuContainer}>
          <View style={styles.apercuFichier}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={28}
              color="#8B6B4A"
            />

            <View style={styles.nomFichierContainer}>
              <Text
                style={styles.nomFichier}
                numberOfLines={2}
              >
                {pieceJointe.nom}
              </Text>
            </View>

            <TouchableOpacity onPress={supprimerPieceJointe}>
              <MaterialCommunityIcons
                name="close-circle"
                size={24}
                color="#C97B7B"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Boutons d'action */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.icone}
          onPress={choisirFichier}
        >
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

        <TouchableOpacity
          style={styles.icone}
          onPress={gererDictee}
        >
          <MaterialCommunityIcons
            name={
              reconnaissanceActive
                ? "microphone"
                : "microphone-outline"
            }
            size={24}
            color={
              reconnaissanceActive
                ? "#C97B7B"
                : "#8B6B4A"
            }
          />
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          disabled={!texte.trim() && !pieceJointe}
          onPress={deposeDansLePanier}
        >
          <MaterialCommunityIcons
            name="paw"
            size={30}
            color={
              texte.trim() || pieceJointe
                ? "#eb8899"
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
    maxWidth: "100%",
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

  apercuFichier: {
    backgroundColor: "#FFFDF8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E8DCCB",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  nomFichierContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },

  nomFichier: {
    color: "#5A4A42",
    fontSize: 14,
  },

  carteDepot: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5c0c9",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginTop: -60,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#d4b5bf",
  },

  texteDepot: {
    flex: 1,
  },

  titreDepot: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5A4A42",
  },
});
