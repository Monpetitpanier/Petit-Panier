
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const COULEUR = "#E0AEC0";
const FOND = "#F8F5F0";

const GENRES_PAR_DEFAUT = [
  "Romantasy",
  "Fantasy",
  "Romance",
  "Policier",
  "Science-fiction",
  "Classique",
  "Manga",
  "Développement personnel",
  "Autre",
];

export default function AjouterLecture({ navigation, route }) {
  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");
  const [pages, setPages] = useState("");
  const [genre, setGenre] = useState("Romantasy");
  const [genresPersonnalises, setGenresPersonnalises] = useState([]);
  const [nouveauGenre, setNouveauGenre] = useState("");

  const tousLesGenres = [...GENRES_PAR_DEFAUT, ...genresPersonnalises];

  const ajouterGenre = () => {
    const nom = nouveauGenre.trim();

    if (!nom) {
      Alert.alert("Genre manquant", "Saisis d'abord le nom du genre.");
      return;
    }

    if (tousLesGenres.some((g) => g.toLowerCase() === nom.toLowerCase())) {
      Alert.alert("Genre existant", "Ce genre est déjà dans la liste.");
      return;
    }

    setGenresPersonnalises((anciens) => [...anciens, nom]);
    setGenre(nom);
    setNouveauGenre("");
  };

  const valider = () => {
    if (!titre.trim()) {
      Alert.alert("Titre manquant", "Indique le titre du livre.");
      return;
    }

    if (pages.trim() && (!Number.isInteger(Number(pages)) || Number(pages) < 1)) {
      Alert.alert("Nombre de pages invalide", "Saisis un nombre de pages valide.");
      return;
    }

    const livre = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      titre: titre.trim(),
      auteur: auteur.trim(),
      pages: pages.trim() ? Number(pages) : null,
      genre,
      statut: "aLire",
      dateAjout: new Date().toISOString(),
      progression: 0,
      note: null,
      avis: "",
      dateFin: null,
    };

    navigation.navigate({
      name: "Bibliotheque",
      params: {
        nouveauLivre: livre,
        nouveauxGenres: genresPersonnalises,
        retourAjout: Date.now(),
      },
      merge: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contenu}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.entete}>
          <TouchableOpacity
            style={styles.boutonRetour}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={28}
              color={COULEUR}
            />
          </TouchableOpacity>

          <MaterialCommunityIcons
            name="book-plus"
            size={36}
            color={COULEUR}
          />
          <Text style={styles.titre}>Ajouter un livre</Text>
          <Text style={styles.sousTitre}>
            Une nouvelle histoire rejoint ta bibliothèque.
          </Text>
        </View>

        <View style={styles.carte}>
          <Text style={styles.label}>Titre du livre *</Text>
          <TextInput
            style={styles.champ}
            value={titre}
            onChangeText={setTitre}
            placeholder="Ex. : Le royaume des ombres"
            placeholderTextColor="#A59A97"
            maxLength={150}
          />

          <Text style={styles.label}>Auteur</Text>
          <TextInput
            style={styles.champ}
            value={auteur}
            onChangeText={setAuteur}
            placeholder="Nom de l'auteur"
            placeholderTextColor="#A59A97"
            maxLength={120}
          />

          <Text style={styles.label}>Nombre de pages</Text>
          <TextInput
            style={styles.champ}
            value={pages}
            onChangeText={setPages}
            placeholder="Ex. : 420"
            placeholderTextColor="#A59A97"
            keyboardType="number-pad"
          />

          <Text style={styles.label}>Genre ou groupe</Text>
          <View style={styles.genres}>
            {tousLesGenres.map((item) => {
              const actif = genre === item;

              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.pastilleGenre,
                    actif && styles.pastilleActive,
                  ]}
                  onPress={() => setGenre(item)}
                >
                  <Text
                    style={[
                      styles.texteGenre,
                      actif && styles.texteGenreActif,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Créer mon propre genre</Text>
          <View style={styles.ligneGenre}>
            <TextInput
              style={[styles.champ, styles.champGenre]}
              value={nouveauGenre}
              onChangeText={setNouveauGenre}
              placeholder="Ex. : Mes coups de cœur"
              placeholderTextColor="#A59A97"
              maxLength={50}
              onSubmitEditing={ajouterGenre}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={styles.boutonGenre}
              onPress={ajouterGenre}
              accessibilityLabel="Ajouter ce genre"
            >
              <MaterialCommunityIcons
                name="plus"
                size={25}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.note}>
            Tu pourras compléter ta progression, ta note et ton avis plus tard.
          </Text>
        </View>

        <TouchableOpacity style={styles.boutonValider} onPress={valider}>
          <MaterialCommunityIcons
            name="book-plus"
            size={22}
            color="#FFFFFF"
          />
          <Text style={styles.texteBouton}>Ajouter à ma bibliothèque</Text>
        </TouchableOpacity>
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
  entete: {
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 22,
  },
  boutonRetour: {
    position: "absolute",
    top: 12,
    left: 0,
    padding: 4,
    zIndex: 1,
  },
  titre: {
    fontSize: 26,
    fontWeight: "bold",
    color: COULEUR,
    marginTop: 8,
  },
  sousTitre: {
    fontSize: 14,
    color: "#77716F",
    textAlign: "center",
    marginTop: 5,
  },
  carte: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E9E5DC",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#806573",
    marginBottom: 8,
    marginTop: 14,
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
  genres: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pastilleGenre: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 18,
    backgroundColor: "#F1EEE8",
    borderWidth: 1,
    borderColor: "#E9E5DC",
  },
  pastilleActive: {
    backgroundColor: COULEUR,
    borderColor: COULEUR,
  },
  texteGenre: {
    fontSize: 12,
    color: "#756C69",
  },
  texteGenreActif: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  ligneGenre: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  champGenre: {
    flex: 1,
  },
  boutonGenre: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: COULEUR,
    alignItems: "center",
    justifyContent: "center",
  },
  note: {
    fontSize: 12,
    color: "#8A817D",
    lineHeight: 18,
    marginTop: 18,
  },
  boutonValider: {
    backgroundColor: COULEUR,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 14,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  texteBouton: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
