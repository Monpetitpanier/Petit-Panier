
import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { chargerUnivers } from "../../services/universStorage";

const COULEUR = "#e0aec0";
const FOND = "#F8F5F0";

const FIFI_IMAGES = {
  depart: require("../../assets/illustrations/univers/Fifi_depart.png"),
  marche: require("../../assets/illustrations/univers/Fifi_marche.png"),
  miChemin: require("../../assets/illustrations/univers/Fifi_mi_chemin.png"),
  presque: require("../../assets/illustrations/univers/Fifi_presque_arrivee.png"),
  panierVide: require("../../assets/illustrations/univers/Panier_vide.png"),
  panier: require("../../assets/illustrations/univers/Fifi_dans_panier.png"),
};

function choisirFifi(progression) {
  if (progression >= 75) return FIFI_IMAGES.presque;
  if (progression >= 50) return FIFI_IMAGES.miChemin;
  if (progression >= 25) return FIFI_IMAGES.marche;
  return FIFI_IMAGES.depart;
}

export default function Univers() {
  const navigation = useNavigation();
  const [univers, setUnivers] = useState([]);
  const [chargement, setChargement] = useState(true);

  const chargerObjectifs = useCallback(async () => {
    try {
      const donnees = await chargerUnivers();
      setUnivers(Array.isArray(donnees) ? donnees : []);
    } catch (erreur) {
      console.error("Erreur de chargement des univers :", erreur);
      setUnivers([]);
    } finally {
      setChargement(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      chargerObjectifs();
    }, [chargerObjectifs])
  );

  const afficherObjectif = ({ item }) => {
    const etapes = Array.isArray(item.etapes) ? item.etapes : [];
    const total = etapes.length;
    const terminees = etapes.filter((etape) => etape.terminee).length;
    const progression =
      total > 0 ? Math.round((terminees / total) * 100) : 0;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.carte}
        onPress={() =>
          navigation.navigate("DetailUnivers", {
            objectifId: item.id,
          })
        }
      >
        <View style={styles.enteteCarte}>
          <View style={styles.iconeCategorie}>
            <MaterialCommunityIcons
              name="flag-checkered"
              size={23}
              color={COULEUR}
            />
          </View>

          <View style={styles.infos}>
            <Text style={styles.titreCarte}>{item.titre}</Text>
            <Text style={styles.categorie}>
              {item.categorie || "Personnel"} · Priorité{" "}
              {(item.priorite || "moyenne").toLowerCase()}
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#8C9685"
          />
        </View>

        <View style={styles.ligneProgression}>
          <Text style={styles.labelProgression}>Mon avancée</Text>
          <Text style={styles.pourcentage}>{progression}%</Text>
        </View>

        <View style={styles.parcours}>
          {progression < 100 ? (
            <Image
              source={choisirFifi(progression)}
              style={styles.imageFifi}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.espaceFifi} />
          )}

          <View style={styles.barreFond}>
            <View
              style={[
                styles.barreRemplie,
                { width: `${progression}%` },
              ]}
            />
          </View>

          <Image
            source={
              progression >= 100
                ? FIFI_IMAGES.panier
                : FIFI_IMAGES.panierVide
            }
            style={styles.imagePanier}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.nombreEtapes}>
          {terminees} étape{terminees !== 1 ? "s" : ""} terminée
          {terminees !== 1 ? "s" : ""} sur {total}
        </Text>

        <Text style={styles.ouvrirDetail}>
          Appuie pour voir les étapes et modifier l’objectif
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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

        <Text style={styles.titre}>Mes univers</Text>
        <Text style={styles.sousTitre}>
          Chaque petit pas te rapproche de ton objectif.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.boutonAjouter}
        onPress={() => navigation.navigate("CreationUnivers")}
      >
        <MaterialCommunityIcons
          name="plus-circle"
          size={23}
          color="#FFFFFF"
        />
        <Text style={styles.texteBouton}>Créer un objectif</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.boutonAjouter}
        onPress={() => navigation.navigate("Bibliotheque")}
      >
        <MaterialCommunityIcons
          name="book-open-page-variant"
          size={23}
          color="#FFFFFF"
        />
        <Text style={styles.texteBouton}>Ajouter une lecture</Text>
      </TouchableOpacity>


      {chargement ? (
        <Text style={styles.message}>
          Chargement de tes univers…
        </Text>
      ) : univers.length === 0 ? (
        <View style={styles.vide}>
          <Image
            source={FIFI_IMAGES.depart}
            style={styles.fifiVide}
            resizeMode="contain"
          />
          <Text style={styles.titreVide}>
            Ton panier est prêt !
          </Text>
          <Text style={styles.message}>
            Crée ton premier objectif et avance à ton rythme.
          </Text>
        </View>
      ) : (
        <FlatList
          data={univers}
          keyExtractor={(item) => String(item.id)}
          renderItem={afficherObjectif}
          contentContainerStyle={styles.liste}
          ListFooterComponent={
            <Image
              source={require("../../assets/illustrations/univers/fifi_basdepage.png")}
              style={styles.imageFifiBas}
              resizeMode="contain"
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FOND,
  },
  entete: {
    alignItems: "center",
    paddingTop: 18,
    paddingHorizontal: 20,
  },
  boutonRetour: {
    position: "absolute",
    top: 12,
    left: 16,
    padding: 4,
    zIndex: 1,
  },
  titre: {
    fontSize: 27,
    fontWeight: "bold",
    color: COULEUR,
    marginBottom: 8,
  },
  sousTitre: {
    fontSize: 15,
    color: "#666666",
    textAlign: "center",
  },
  boutonAjouter: {
    backgroundColor: COULEUR,
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  texteBouton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  liste: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 30,
  },
  carte: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E9E5DC",
  },
  enteteCarte: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  iconeCategorie: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EEF1E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infos: {
    flex: 1,
  },
  titreCarte: {
    fontSize: 17,
    fontWeight: "bold",
    color: COULEUR,
  },
  categorie: {
    fontSize: 12,
    color: "#777777",
    marginTop: 5,
    textTransform: "capitalize",
  },
  ligneProgression: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  labelProgression: {
    fontSize: 13,
    color: "#666666",
  },
  pourcentage: {
    fontSize: 13,
    fontWeight: "bold",
    color: COULEUR,
  },
  parcours: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minHeight: 62,
  },
  imageFifi: {
    width: 58,
    height: 58,
  },
  espaceFifi: {
    width: 58,
    height: 58,
  },
  barreFond: {
    flex: 1,
    height: 9,
    backgroundColor: "#EAE8E0",
    borderRadius: 10,
    overflow: "hidden",
  },
  barreRemplie: {
    height: "100%",
    backgroundColor: "#9DB58B",
    borderRadius: 10,
  },
  imagePanier: {
    width: 58,
    height: 58,
  },
  nombreEtapes: {
    fontSize: 12,
    color: "#777777",
    marginTop: 8,
  },
  ouvrirDetail: {
    fontSize: 12,
    color: COULEUR,
    marginTop: 8,
  },
  vide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingBottom: 70,
  },
  fifiVide: {
    width: 130,
    height: 130,
    marginBottom: 12,
  },
  imageFifiBas: {
    width: "100%",
    height: 190,
    marginTop: 14,
    marginBottom: 18,
  },
  titreVide: {
    fontSize: 20,
    fontWeight: "bold",
    color: COULEUR,
    marginBottom: 8,
  },
  message: {
    color: "#777777",
    textAlign: "center",
    fontSize: 14,
    marginTop: 8,
    paddingHorizontal: 20,
  },
});
