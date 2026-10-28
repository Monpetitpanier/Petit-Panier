
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { sauvegarderLectures } from "../../../services/lecturesStorage";

const COULEUR = "#E0AEC0";
const FOND = "#F8F5F0";

const STATUTS = [
  { id: "aLire", titre: "À lire", icone: "book-open-page-variant" },
  { id: "enCours", titre: "En cours", icone: "book-open-variant" },
  { id: "lu", titre: "Lu", icone: "book-check" },
];

export default function DetailLecture({ navigation, route }) {
  const livreInitial = route.params?.livre;

  const [livre, setLivre] = useState(livreInitial);
  const [progression, setProgression] = useState(
    String(livreInitial?.progression || 0)
  );
  const [note, setNote] = useState(livreInitial?.note || 0);
  const [avis, setAvis] = useState(livreInitial?.avis || "");

  if (!livre) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titre}>Livre introuvable</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.texteRetour}>Retour à la bibliothèque</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const modifierStatut = async (nouveauStatut) => {
    const livreModifie = {
      ...livre,
      statut: nouveauStatut,
      progression:
        nouveauStatut === "aLire"
          ? 0
          : nouveauStatut === "lu"
            ? 100
            : Math.min(99, Math.max(0, Number(progression) || 0)),
      dateFin:
        nouveauStatut === "lu"
          ? livre.dateFin || new Date().toISOString()
          : null,
      note: nouveauStatut === "lu" ? note : null,
      avis: nouveauStatut === "lu" ? avis : "",
    };

    const sauvegardeOk = await mettreAJourLivre(livreModifie);

    if (sauvegardeOk) {
      setLivre(livreModifie);
      setProgression(String(livreModifie.progression));
      setNote(livreModifie.note || 0);
      setAvis(livreModifie.avis || "");
    }
  };

  const mettreAJourLivre = async (livreModifie) => {
    try {
      const { chargerLectures } = await import(
        "../../../services/lecturesStorage"
      );
      const livres = await chargerLectures();
      const livresMisAJour = livres.map((item) =>
        item.id === livreModifie.id ? livreModifie : item
      );

      const ok = await sauvegarderLectures(livresMisAJour);

      if (!ok) {
        Alert.alert(
          "Sauvegarde impossible",
          "Tes modifications n'ont pas pu être enregistrées."
        );
        return false;
      }

      return true;
    } catch (erreur) {
      console.error("Erreur de modification du livre :", erreur);
      Alert.alert("Erreur", "Impossible d'enregistrer les modifications.");
      return false;
    }
  };

  const enregistrerProgression = async () => {
    const valeur = Number(progression);

    if (!Number.isInteger(valeur) || valeur < 0 || valeur > 100) {
      Alert.alert(
        "Progression invalide",
        "Indique un pourcentage compris entre 0 et 100."
      );
      return;
    }

    const statut = valeur === 100 ? "lu" : valeur > 0 ? "enCours" : livre.statut;
    const livreModifie = {
      ...livre,
      progression: valeur,
      statut,
      dateFin:
        statut === "lu"
          ? livre.dateFin || new Date().toISOString()
          : null,
      note: statut === "lu" ? note : null,
      avis: statut === "lu" ? avis : "",
    };

    if (await mettreAJourLivre(livreModifie)) {
      setLivre(livreModifie);
      Alert.alert("C'est enregistré !", "Ta progression a été mise à jour.");
    }
  };

  const enregistrerAvis = async () => {
    const livreModifie = { ...livre, note, avis };

    if (await mettreAJourLivre(livreModifie)) {
      setLivre(livreModifie);
      Alert.alert("C'est enregistré !", "Ta note et ton avis sont sauvegardés.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contenu}>
        <TouchableOpacity
          style={styles.retour}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={25}
            color={COULEUR}
          />
          <Text style={styles.texteRetour}>Ma bibliothèque</Text>
        </TouchableOpacity>

        <View style={styles.entete}>
          <MaterialCommunityIcons
            name="book-open-page-variant"
            size={45}
            color={COULEUR}
          />
          <Text style={styles.titre}>{livre.titre}</Text>
          <Text style={styles.auteur}>
            {livre.auteur || "Auteur non renseigné"}
          </Text>
          {!!livre.pages && (
            <Text style={styles.pages}>{livre.pages} pages</Text>
          )}
          <Text style={styles.genre}>{livre.genre || "Autre"}</Text>
        </View>

        <View style={styles.carte}>
          <Text style={styles.titreSection}>Où en es-tu ?</Text>
          {STATUTS.map((statut) => {
            const actif = livre.statut === statut.id;

            return (
              <TouchableOpacity
                key={statut.id}
                style={[
                  styles.boutonStatut,
                  actif && styles.boutonStatutActif,
                ]}
                onPress={() => modifierStatut(statut.id)}
              >
                <MaterialCommunityIcons
                  name={statut.icone}
                  size={22}
                  color={actif ? "#FFFFFF" : COULEUR}
                />
                <Text
                  style={[
                    styles.texteStatut,
                    actif && styles.texteStatutActif,
                  ]}
                >
                  {statut.titre}
                </Text>
                {actif && (
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={20}
                    color="#FFFFFF"
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {livre.statut === "enCours" && (
          <View style={styles.carte}>
            <Text style={styles.titreSection}>Ma progression</Text>
            <Text style={styles.label}>Pourcentage lu (de 0 à 100)</Text>
            <TextInput
              style={styles.champ}
              value={progression}
              onChangeText={setProgression}
              keyboardType="number-pad"
              placeholder="Ex. : 35"
            />
            <TouchableOpacity
              style={styles.boutonPrincipal}
              onPress={enregistrerProgression}
            >
              <Text style={styles.texteBouton}>Enregistrer ma progression</Text>
            </TouchableOpacity>
          </View>
        )}

        {livre.statut === "lu" && (
          <View style={styles.carte}>
            <Text style={styles.titreSection}>Mon avis sur ce livre</Text>
            <Text style={styles.label}>Ma note</Text>
            <View style={styles.etoiles}>
              {[1, 2, 3, 4, 5].map((valeur) => (
                <TouchableOpacity
                  key={valeur}
                  onPress={() => setNote(valeur)}
                  accessibilityLabel={`Noter ${valeur} sur 5`}
                >
                  <MaterialCommunityIcons
                    name={valeur <= note ? "star" : "star-outline"}
                    size={32}
                    color="#D7B45D"
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Mon avis personnel</Text>
            <TextInput
              style={[styles.champ, styles.champAvis]}
              value={avis}
              onChangeText={setAvis}
              placeholder="Qu'as-tu pensé de cette histoire ?"
              placeholderTextColor="#A59A97"
              multiline
              textAlignVertical="top"
              maxLength={2000}
            />

            <TouchableOpacity
              style={styles.boutonPrincipal}
              onPress={enregistrerAvis}
            >
              <Text style={styles.texteBouton}>Enregistrer mon avis</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FOND,
  },
  contenu: {
    padding: 18,
    paddingBottom: 35,
  },
  retour: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
  },
  texteRetour: {
    color: COULEUR,
    fontSize: 15,
    fontWeight: "600",
  },
  entete: {
    alignItems: "center",
    paddingVertical: 24,
  },
  titre: {
    fontSize: 25,
    fontWeight: "bold",
    color: COULEUR,
    textAlign: "center",
    marginTop: 10,
  },
  auteur: {
    color: "#77716F",
    fontSize: 15,
    marginTop: 6,
  },
  pages: {
    color: "#8C827F",
    fontSize: 13,
    marginTop: 5,
  },
  genre: {
    color: "#8C827F",
    fontSize: 12,
    marginTop: 8,
    backgroundColor: "#EEEAE4",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    overflow: "hidden",
  },
  carte: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E9E5DC",
    marginBottom: 16,
  },
  titreSection: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#A8788B",
    marginBottom: 14,
  },
  boutonStatut: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 13,
    borderRadius: 12,
    backgroundColor: "#F8F5F0",
    marginBottom: 8,
  },
  boutonStatutActif: {
    backgroundColor: COULEUR,
  },
  texteStatut: {
    flex: 1,
    fontSize: 15,
    color: "#756C69",
  },
  texteStatutActif: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  label: {
    color: "#806573",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 8,
  },
  champ: {
    backgroundColor: "#FBF8F5",
    borderWidth: 1,
    borderColor: "#E9DFDB",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 15,
    color: "#554D4A",
  },
  champAvis: {
    minHeight: 110,
    marginTop: 4,
  },
  etoiles: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  boutonPrincipal: {
    backgroundColor: COULEUR,
    padding: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 14,
  },
  texteBouton: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
