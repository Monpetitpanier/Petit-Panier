
import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  chargerLectures,
  sauvegarderLectures,
} from "../../../services/lecturesStorage";

const COULEUR = "#E0AEC0";
const FOND = "#F8F5F0";
const TRANCHES_LIVRES = [
  require("../../../assets/illustrations/univers/tranches/tranche01.png"),
  require("../../../assets/illustrations/univers/tranches/tranche02.png"),
  require("../../../assets/illustrations/univers/tranches/tranche03.png"),
  require("../../../assets/illustrations/univers/tranches/tranche04.png"),
  require("../../../assets/illustrations/univers/tranches/tranche05.png"),
  require("../../../assets/illustrations/univers/tranches/tranche06.png"),
  require("../../../assets/illustrations/univers/tranches/tranche07.png"),
  require("../../../assets/illustrations/univers/tranches/tranche08.png"),
];

const ONGLETS = [
  { id: "aLire", titre: "À lire", icone: "book-open-page-variant" },
  { id: "enCours", titre: "En cours", icone: "book-open-variant" },
  { id: "lu", titre: "Lu", icone: "book-check" },
];

export default function Bibliotheque() {
  const navigation = useNavigation();
  const route = useRoute();

  const [livres, setLivres] = useState([]);
  const [ongletActif, setOngletActif] = useState("aLire");
  const [tri, setTri] = useState("alphabetique");
  const [chargement, setChargement] = useState(true);

  const chargerDonnees = useCallback(async () => {
    try {
      let donnees = await chargerLectures();
      const nouveauLivre = route.params?.nouveauLivre;

      if (
        nouveauLivre &&
        !donnees.some((livre) => livre.id === nouveauLivre.id)
      ) {
        donnees = [...donnees, nouveauLivre];
        const sauvegardeOk = await sauvegarderLectures(donnees);

        if (!sauvegardeOk) {
          Alert.alert(
            "Sauvegarde impossible",
            "Le livre est affiché, mais n'a pas pu être enregistré durablement."
          );
        }

        setOngletActif(nouveauLivre.statut || "aLire");
        navigation.setParams({
          nouveauLivre: undefined,
          nouveauxGenres: undefined,
          retourAjout: undefined,
        });
      }

      setLivres(donnees);
    } catch (erreur) {
      console.error("Erreur de chargement de la bibliothèque :", erreur);
      Alert.alert(
        "Erreur",
        "Impossible de charger la bibliothèque pour le moment."
      );
    } finally {
      setChargement(false);
    }
  }, [navigation, route.params?.nouveauLivre]);

  useFocusEffect(
    useCallback(() => {
      chargerDonnees();
    }, [chargerDonnees])
  );

  const livresFiltres = livres
    .filter((livre) => livroStatut(livre) === ongletActif)
    .sort((a, b) => {
      if (tri === "date") {
        return new Date(b.dateAjout || 0) - new Date(a.dateAjout || 0);
      }

      if (tri === "groupe") {
        const comparaisonGenre = (a.genre || "Autre").localeCompare(
          b.genre || "Autre",
          "fr"
        );
        return comparaisonGenre || a.titre.localeCompare(b.titre, "fr");
      }

      return a.titre.localeCompare(b.titre, "fr");
    });
const rangeesLivres = [];

for (let i = 0; i < livresFiltres.length; i += 10) {
  rangeesLivres.push(livresFiltres.slice(i, i + 10));
}
  function ouvrirAjout() {
    navigation.navigate("AjouterLecture");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contenu}
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

          <Text style={styles.titre}>Ma bibliothèque</Text>
          <Text style={styles.sousTitre}>
            Un petit coin pour toutes tes histoires.
          </Text>
        </View>
{!chargement && livresFiltres.length > 0 && (
  <View>
    {rangeesLivres.map((rangee, indexRangee) => (
      <ImageBackground
        key={`etagere-${indexRangee}`}
        source={
          indexRangee === 0
            ? require("../../../assets/illustrations/univers/Fifi_etagere.png")
            : require("../../../assets/illustrations/univers/etagere.png")
        }
        style={styles.etagereIllustration}
        imageStyle={styles.imageEtagere}
        resizeMode="contain"
      >
        <View style={styles.zoneLivresSurEtagere}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rangeeSurEtagere}
          >
            {rangee.map((livre, indexLivre) => (
              <TouchableOpacity
                key={livre.id}
                accessibilityRole="button"
                accessibilityLabel={`Ouvrir ${livre.titre}`}
                style={[
                  styles.livreSurEtagere,
                  styles[styleLivre(livre.statut)],
                  { height: 88 + ((indexLivre % 3) * 10) },
                ]}
                onPress={() =>
                  navigation.navigate("DetailLecture", { livre })
                }
              >
                <ImageBackground
                  source={TRANCHES_LIVRES[choisirTranche(livre)]}
                  style={styles.imageTranche}
                  imageStyle={styles.imageTrancheFond}
                  resizeMode="stretch"
                >
                  <Text
                    style={styles.texteTrancheLivre}
                    numberOfLines={3}
                  >
                    {livre.titre}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    ))}
  </View>
)}

        {!chargement && livresFiltres.length === 0 && (
          <Text style={styles.texteEtagereVide}>
            Ton prochain coup de cœur trouvera bientôt sa place ici…
          </Text>
        )}

        <TouchableOpacity
          style={[styles.boutonAjouter, { marginTop: 40 }]}
          onPress={ouvrirAjout}
        >
          <MaterialCommunityIcons
            name="plus-circle"
            size={22}
            color="#FFFFFF"
          />
          <Text style={styles.texteBouton}>Ajouter un livre</Text>
        </TouchableOpacity>

        <View style={styles.onglets}>
          {ONGLETS.map((onglet) => {
            const actif = ongletActif === onglet.id;

            return (
              <TouchableOpacity
                key={onglet.id}
                style={[styles.onglet, actif && styles.ongletActif]}
                onPress={() => setOngletActif(onglet.id)}
              >
                <MaterialCommunityIcons
                  name={onglet.icone}
                  size={20}
                  color={actif ? "#FFFFFF" : "#8C827F"}
                />
                <Text
                  style={[
                    styles.texteOnglet,
                    actif && styles.texteOngletActif,
                  ]}
                >
                  {onglet.titre}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.titreSection}>
          {ONGLETS.find((onglet) => onglet.id === ongletActif)?.titre}
        </Text>

        {chargement ? (
          <Text style={styles.texteVide}>Chargement de tes livres…</Text>
        ) : livresFiltres.length === 0 ? (
          <View style={styles.vide}>
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={30}
              color={COULEUR}
            />
            <Text style={styles.texteVide}>
              Aucun livre dans cet onglet pour le moment.
            </Text>
            <Text style={styles.sousTexteVide}>
              Ajoute une lecture ou change le statut d’un livre.
            </Text>
          </View>
        ) : (
          <Text style={styles.aideLivres}>
            Appuie sur un livre pour consulter sa fiche.
          </Text>
        )}

        <View style={styles.blocTri}>
          <Text style={styles.titreTri}>Organiser ma bibliothèque</Text>

          {[
            { id: "alphabetique", titre: "Ordre alphabétique" },
            { id: "groupe", titre: "Par groupe ou genre" },
            { id: "date", titre: "Date d’ajout" },
          ].map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionTri}
              onPress={() => setTri(option.id)}
            >
              <MaterialCommunityIcons
                name={
                  tri === option.id
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={21}
                color={COULEUR}
              />
              <Text style={styles.texteTri}>{option.titre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function livroStatut(livre) {
  return livre.statut || "aLire";
}

function choisirTranche(livre) {
  const identifiant = String(livre.id || livre.titre || "livre");

  let total = 0;

  for (let i = 0; i < identifiant.length; i++) {
    total = (total + identifiant.charCodeAt(i)) % TRANCHES_LIVRES.length;
  }

  return total;
}

function styleLivre(statut) {
  if (statut === "lu") return "livreLu";
  if (statut === "enCours") return "livreEnCours";
  return "livreALire";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FOND,
  },
  contenu: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },
  entete: {
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 18,
  },
  boutonRetour: {
    position: "absolute",
    top: 12,
    left: 0,
    padding: 4,
    zIndex: 1,
  },
  titre: {
    fontSize: 27,
    fontWeight: "bold",
    color: COULEUR,
    marginTop: 7,
  },
  sousTitre: {
    fontSize: 14,
    color: "#77716F",
    textAlign: "center",
    marginTop: 5,
  },
  etagereIllustration: {
    width: "100%",
    aspectRatio: 1.5,
    marginBottom: -95,
    justifyContent: "flex-end",
  },
  imageEtagere: {
    resizeMode: "contain",
  },
  zoneLivresSurEtagere: {
  position: "absolute",
  left: "5%",
  bottom: "50%",
  width: "85%",
  height: "40%",
  justifyContent: "flex-end",
  alignItems: "flex-start",

  },
  rangeeSurEtagere: {
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-end",
  alignSelf: "flex-start",
  paddingHorizontal: 0,
  gap: 0,
},
livreSurEtagere: {
  width: 48,
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 0,
  paddingVertical: 0,
  marginHorizontal: -15,
  overflow: "hidden",
},
  imageTranche: {
  flex: 1,
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 2,
},

imageTrancheFond: {
  resizeMode: "stretch",
},
  texteEtagereVide: {
    color: "#8C827F",
    fontSize: 12,
    textAlign: "center",
    marginTop: -2,
    marginBottom: 12,
    fontStyle: "italic",
  },
  aideLivres: {
    color: "#918682",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 18,
    marginTop: -8,
  },
  boutonAjouter: {
    backgroundColor: COULEUR,
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  texteBouton: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  onglets: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 22,
  },
  onglet: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 12,
    borderRadius: 13,
    backgroundColor: "#EEEAE4",
  },
  ongletActif: {
    backgroundColor: COULEUR,
  },
  texteOnglet: {
    fontSize: 12,
    color: "#756C69",
    fontWeight: "600",
  },
  texteOngletActif: {
    color: "#FFFFFF",
  },
  titreSection: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#A8788B",
    marginBottom: 10,
  },
  vide: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 15,
    marginBottom: 24,
  },
  texteVide: {
    fontSize: 14,
    color: "#77716F",
    textAlign: "center",
    marginTop: 10,
  },
  sousTexteVide: {
    fontSize: 12,
    color: "#918682",
    textAlign: "center",
    marginTop: 6,
  },
  livreALire: {
    backgroundColor: "transparent",
    opacity: 0.88,
  },
  livreEnCours: {
    backgroundColor: "transparent",
  },
  livreLu: {
    backgroundColor: "transparent",
  },
 texteTrancheLivre: {
  fontSize: 9,
  fontWeight: "600",
  color: "#5E4550",
  textAlign: "center",
  writingDirection: "ltr",
  transform: [{ rotate: "-90deg" }],
  width: 78,
  height: 12,
  includeFontPadding: false,
},
  blocTri: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E9E5DC",
  },
  titreTri: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#A8788B",
    marginBottom: 12,
  },
  optionTri: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    gap: 10,
  },
  texteTri: {
    fontSize: 14,
    color: "#625C59",
  },
});
