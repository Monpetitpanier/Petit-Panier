
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
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { sauvegarderUnivers, chargerUnivers } from "../../services/universStorage";

const VERT = "#4A5A4A";
const FOND = "#F8F5F0";
const ROSE = "#E6A7C4";

const CATEGORIES = [
  "Finances",
  "Santé",
  "Sport",
  "Professionnel",
  "Voyage",
  "Maison",
  "Personnel",
  "Autre",
];

const PRIORITES = ["Basse", "Moyenne", "Haute"];

export default function CreationUnivers() {
  const navigation = useNavigation();

  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("Personnel");
  const [priorite, setPriorite] = useState("Moyenne");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [description, setDescription] = useState("");
  const [etapes, setEtapes] = useState([]);
  const [nouvelleEtape, setNouvelleEtape] = useState("");

  const ajouterEtape = () => {
    const texte = nouvelleEtape.trim();

    if (!texte) {
      Alert.alert("Étape vide", "Écris d'abord le nom de ton étape.");
      return;
    }

    setEtapes((actuelles) => [
      ...actuelles,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        titre: texte,
        terminee: false,
      },
    ]);
    setNouvelleEtape("");
  };

  const supprimerEtape = (id) => {
    setEtapes((actuelles) => actuelles.filter((etape) => etape.id !== id));
  };

  const enregistrer = async () => {
    if (!titre.trim()) {
      Alert.alert("Il manque un titre", "Donne un nom à ton objectif.");
      return;
    }

    const objectif = {
      id: `${Date.now()}`,
      titre: titre.trim(),
      categorie,
      priorite,
      dateDebut: dateDebut.trim(),
      dateFin: dateFin.trim(),
      description: description.trim(),
      etapes,
      dateCreation: new Date().toISOString(),
    };

    try {
      const existants = await chargerUnivers();
      await sauvegarderUnivers([...existants, objectif]);
      navigation.goBack();
    } catch (erreur) {
      console.error("Erreur lors de l'enregistrement de l'objectif :", erreur);
      Alert.alert(
        "Enregistrement impossible",
        "Ton objectif n'a pas pu être enregistré. Réessaie."
      );
    }
  };

  const afficherChoix = (options, selection, changer) => (
    <View style={styles.choixLigne}>
      {options.map((option) => {
        const actif = option === selection;

        return (
          <TouchableOpacity
            key={option}
            style={[styles.choix, actif && styles.choixActif]}
            onPress={() => changer(option)}
            activeOpacity={0.75}
          >
            <Text style={[styles.choixTexte, actif && styles.choixTexteActif]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.entete}>
        <TouchableOpacity
          style={styles.retour}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color={VERT} />
        </TouchableOpacity>

        <Text style={styles.titrePage}>Mon nouvel objectif</Text>
        <Text style={styles.sousTitre}>
          Chaque petit pas compte. 💗
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.contenu}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Nom de l'objectif *</Text>
        <TextInput
          style={styles.champ}
          value={titre}
          onChangeText={setTitre}
          placeholder="Ex. : Préparer mes prochaines vacances"
          placeholderTextColor="#A49A90"
          maxLength={100}
        />

        <Text style={styles.label}>Catégorie</Text>
        <View style={styles.categories}>
          {CATEGORIES.map((item) => {
            const actif = categorie === item;

            return (
              <TouchableOpacity
                key={item}
                onPress={() => setCategorie(item)}
                style={[styles.pastille, actif && styles.pastilleActive]}
              >
                <Text style={[styles.pastilleTexte, actif && styles.pastilleTexteActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Priorité</Text>
        {afficherChoix(PRIORITES, priorite, setPriorite)}

        <Text style={styles.label}>Date de début (facultative)</Text>
        <TextInput
          style={styles.champ}
          value={dateDebut}
          onChangeText={setDateDebut}
          placeholder="AAAA-MM-JJ"
          placeholderTextColor="#A49A90"
          maxLength={10}
        />

        <Text style={styles.label}>Date limite (facultative)</Text>
        <TextInput
          style={styles.champ}
          value={dateFin}
          onChangeText={setDateFin}
          placeholder="AAAA-MM-JJ"
          placeholderTextColor="#A49A90"
          maxLength={10}
        />

        <Text style={styles.label}>Description et notes</Text>
        <TextInput
          style={[styles.champ, styles.champMultiligne]}
          value={description}
          onChangeText={setDescription}
          placeholder="Décris ton objectif, tes idées ou ce qui te motive..."
          placeholderTextColor="#A49A90"
          multiline
          textAlignVertical="top"
          maxLength={2000}
        />

        <View style={styles.separation}>
          <Text style={styles.titreSection}>Mes étapes</Text>
          <Text style={styles.aide}>
            Ajoute les petites actions qui te permettront d'avancer.
          </Text>
        </View>

        <View style={styles.ajoutEtape}>
          <TextInput
            style={[styles.champ, styles.champEtape]}
            value={nouvelleEtape}
            onChangeText={setNouvelleEtape}
            placeholder="Ex. : Mettre de l'argent de côté"
            placeholderTextColor="#A49A90"
            maxLength={150}
            onSubmitEditing={ajouterEtape}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.boutonEtape}
            onPress={ajouterEtape}
            accessibilityLabel="Ajouter une étape"
          >
            <MaterialCommunityIcons name="plus" size={25} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {etapes.map((etape, index) => (
          <View key={etape.id} style={styles.etape}>
            <Text style={styles.numeroEtape}>{index + 1}.</Text>
            <Text style={styles.texteEtape}>{etape.titre}</Text>
            <TouchableOpacity
              onPress={() => supprimerEtape(etape.id)}
              accessibilityLabel={`Supprimer l'étape ${etape.titre}`}
            >
              <MaterialCommunityIcons name="close-circle-outline" size={23} color="#B77A87" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={styles.boutonEnregistrer}
          onPress={enregistrer}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="basket-check-outline" size={23} color="#FFFFFF" />
          <Text style={styles.texteEnregistrer}>Enregistrer mon objectif</Text>
        </TouchableOpacity>

        <Text style={styles.noteBas}>
          Tu pourras avancer à ton rythme, une étape après l'autre. 🐱
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FOND,
  },
  entete: {
    paddingTop: 12,
    paddingBottom: 16,
    alignItems: "center",
    paddingHorizontal: 48,
  },
  retour: {
    position: "absolute",
    left: 16,
    top: 8,
    padding: 4,
  },
  titrePage: {
    fontSize: 23,
    fontWeight: "bold",
    color: VERT,
    textAlign: "center",
  },
  sousTitre: {
    fontSize: 14,
    color: "#887D73",
    marginTop: 5,
  },
  contenu: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },
  label: {
    color: VERT,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 18,
    marginBottom: 8,
  },
  champ: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9E1D7",
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 13 : 10,
    fontSize: 15,
    color: "#4B4036",
  },
  champMultiligne: {
    minHeight: 105,
    paddingTop: 12,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pastille: {
    borderWidth: 1,
    borderColor: "#E6DDD2",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: "#FFFFFF",
  },
  pastilleActive: {
    backgroundColor: "#F9EAF1",
    borderColor: ROSE,
  },
  pastilleTexte: {
    color: "#74695F",
    fontSize: 13,
  },
  pastilleTexteActive: {
    color: VERT,
    fontWeight: "bold",
  },
  choixLigne: {
    flexDirection: "row",
    gap: 8,
  },
  choix: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E6DDD2",
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  choixActif: {
    backgroundColor: "#EEF1E9",
    borderColor: "#9DB58B",
  },
  choixTexte: {
    color: "#74695F",
    fontSize: 13,
  },
  choixTexteActif: {
    color: VERT,
    fontWeight: "bold",
  },
  separation: {
    marginTop: 28,
    marginBottom: 8,
  },
  titreSection: {
    color: VERT,
    fontSize: 20,
    fontWeight: "bold",
  },
  aide: {
    fontSize: 13,
    color: "#887D73",
    marginTop: 5,
    lineHeight: 19,
  },
  ajoutEtape: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  champEtape: {
    flex: 1,
  },
  boutonEtape: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: VERT,
    alignItems: "center",
    justifyContent: "center",
  },
  etape: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginTop: 9,
    gap: 10,
  },
  numeroEtape: {
    color: VERT,
    fontWeight: "bold",
  },
  texteEtape: {
    flex: 1,
    color: "#4B4036",
    fontSize: 14,
  },
  boutonEnregistrer: {
    marginTop: 28,
    borderRadius: 15,
    backgroundColor: VERT,
    paddingVertical: 15,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  texteEnregistrer: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  noteBas: {
    marginTop: 14,
    textAlign: "center",
    color: "#887D73",
    fontSize: 12,
    lineHeight: 18,
  },
});
