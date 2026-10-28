
import React, { useCallback, useState } from "react";
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
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { chargerUnivers, sauvegarderUnivers } from "../../services/universStorage";

const VERT = "#4A5A4A";
const FOND = "#F8F5F0";

export default function DetailUnivers() {
  const navigation = useNavigation();
  const route = useRoute();
  const { objectifId } = route.params || {};

  const [objectif, setObjectif] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [edition, setEdition] = useState(false);
  const [nouvelleEtape, setNouvelleEtape] = useState("");

  const chargerObjectif = useCallback(async () => {
    try {
      const univers = await chargerUnivers();
      const trouve = univers.find(
        (item) => String(item.id) === String(objectifId)
      );
      setObjectif(trouve || null);
    } catch (erreur) {
      console.error("Erreur de chargement de l'objectif :", erreur);
      Alert.alert("Erreur", "Impossible de charger cet objectif.");
    } finally {
      setChargement(false);
    }
  }, [objectifId]);

  useFocusEffect(
    useCallback(() => {
      chargerObjectif();
    }, [chargerObjectif])
  );

  const enregistrerObjectif = async (modifie) => {
    try {
      const univers = await chargerUnivers();
      const misAJour = univers.map((item) =>
        String(item.id) === String(objectifId) ? modifie : item
      );
      await sauvegarderUnivers(misAJour);
      setObjectif(modifie);
    } catch (erreur) {
      console.error("Erreur de sauvegarde :", erreur);
      Alert.alert("Erreur", "Les modifications n'ont pas été enregistrées.");
    }
  };

  const modifierChamp = (champ, valeur) => {
    setObjectif((actuel) => ({ ...actuel, [champ]: valeur }));
  };

  const basculerEtape = async (idEtape) => {
    const modifie = {
      ...objectif,
      etapes: (objectif.etapes || []).map((etape) =>
        etape.id === idEtape
          ? { ...etape, terminee: !etape.terminee }
          : etape
      ),
    };
    await enregistrerObjectif(modifie);
  };

  const ajouterEtape = async () => {
    const texte = nouvelleEtape.trim();
    if (!texte) return;

    const modifie = {
      ...objectif,
      etapes: [
        ...(objectif.etapes || []),
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          titre: texte,
          terminee: false,
        },
      ],
    };

    await enregistrerObjectif(modifie);
    setNouvelleEtape("");
  };

  const supprimerEtape = (idEtape) => {
    Alert.alert("Supprimer cette étape ?", "Cette action est définitive.", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          await enregistrerObjectif({
            ...objectif,
            etapes: (objectif.etapes || []).filter(
              (etape) => etape.id !== idEtape
            ),
          });
        },
      },
    ]);
  };


  const supprimerObjectif = () => {
    Alert.alert(
      "Supprimer cet objectif ?",
      "Toutes les étapes de cet objectif seront supprimées. Cette action est définitive.",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              const univers = await chargerUnivers();
              const restants = univers.filter(
                (item) => String(item.id) !== String(objectifId)
              );

              await sauvegarderUnivers(restants);
              navigation.goBack();
            } catch (erreur) {
              console.error("Erreur lors de la suppression :", erreur);
              Alert.alert(
                "Erreur",
                "Impossible de supprimer cet objectif. Réessaie."
              );
            }
          },
        },
      ]
    );
  };



  const sauvegarderModifications = async () => {
    await enregistrerObjectif(objectif);
    setEdition(false);
    Alert.alert("Objectif enregistré", "Tes modifications ont été sauvegardées.");
  };

  if (chargement) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>Chargement de ton objectif…</Text>
      </SafeAreaView>
    );
  }

  if (!objectif) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>Objectif introuvable.</Text>
        <TouchableOpacity style={styles.bouton} onPress={() => navigation.goBack()}>
          <Text style={styles.texteBouton}>Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const etapes = objectif.etapes || [];
  const terminees = etapes.filter((etape) => etape.terminee).length;
  const progression = etapes.length
    ? Math.round((terminees / etapes.length) * 100)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.entete}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.retour}>
          <MaterialCommunityIcons name="chevron-left" size={28} color={VERT} />
        </TouchableOpacity>
        <Text style={styles.titrePage}>Mon objectif</Text>
        <TouchableOpacity onPress={() => setEdition(!edition)} style={styles.boutonModifier}>
          <MaterialCommunityIcons
            name={edition ? "close" : "pencil"}
            size={21}
            color={VERT}
          />
          <Text style={styles.texteModifier}>{edition ? "Annuler" : "Modifier"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contenu} keyboardShouldPersistTaps="handled">
        {edition ? (
          <>
            <Text style={styles.label}>Titre</Text>
            <TextInput
              style={styles.champ}
              value={objectif.titre}
              onChangeText={(v) => modifierChamp("titre", v)}
            />

            <Text style={styles.label}>Catégorie</Text>
            <TextInput
              style={styles.champ}
              value={objectif.categorie || ""}
              onChangeText={(v) => modifierChamp("categorie", v)}
            />

            <Text style={styles.label}>Priorité</Text>
            <TextInput
              style={styles.champ}
              value={objectif.priorite || ""}
              onChangeText={(v) => modifierChamp("priorite", v)}
            />

            <Text style={styles.label}>Date de début</Text>
            <TextInput
              style={styles.champ}
              value={objectif.dateDebut || ""}
              placeholder="AAAA-MM-JJ"
              onChangeText={(v) => modifierChamp("dateDebut", v)}
            />

            <Text style={styles.label}>Date limite</Text>
            <TextInput
              style={styles.champ}
              value={objectif.dateFin || ""}
              placeholder="AAAA-MM-JJ"
              onChangeText={(v) => modifierChamp("dateFin", v)}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.champ, styles.multiligne]}
              value={objectif.description || ""}
              multiline
              textAlignVertical="top"
              onChangeText={(v) => modifierChamp("description", v)}
            />

            <TouchableOpacity style={styles.bouton} onPress={sauvegarderModifications}>
              <Text style={styles.texteBouton}>Enregistrer les modifications</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.titreObjectif}>{objectif.titre}</Text>
            <Text style={styles.sousTitre}>
              {objectif.categorie || "Personnel"} · Priorité {objectif.priorite || "Moyenne"}
            </Text>
            {!!objectif.description && (
              <Text style={styles.description}>{objectif.description}</Text>
            )}
            {!!objectif.dateDebut && (
              <Text style={styles.date}>Début : {objectif.dateDebut}</Text>
            )}
            {!!objectif.dateFin && (
              <Text style={styles.date}>Date limite : {objectif.dateFin}</Text>
            )}
          </>
        )}

        <View style={styles.progressionLigne}>
          <Text style={styles.section}>Mes étapes</Text>
          <Text style={styles.pourcentage}>{progression}%</Text>
        </View>

        <View style={styles.barreFond}>
          <View style={[styles.barreRemplie, { width: `${progression}%` }]} />
        </View>

        <Text style={styles.compteur}>
          {terminees} étape{terminees !== 1 ? "s" : ""} terminée
          {terminees !== 1 ? "s" : ""} sur {etapes.length}
        </Text>

        {etapes.map((etape, index) => (
          <View key={etape.id} style={styles.etape}>
            <TouchableOpacity
              style={styles.caseEtape}
              onPress={() => basculerEtape(etape.id)}
            >
              <MaterialCommunityIcons
                name={etape.terminee ? "checkbox-marked" : "checkbox-blank-outline"}
                size={27}
                color={etape.terminee ? "#7E9A70" : VERT}
              />
            </TouchableOpacity>

            <Text
              style={[
                styles.texteEtape,
                etape.terminee && styles.etapeTerminee,
              ]}
            >
              {etape.titre}
            </Text>

            {edition && (
              <TouchableOpacity onPress={() => supprimerEtape(etape.id)}>
                <MaterialCommunityIcons name="trash-can-outline" size={22} color="#B77A87" />
              </TouchableOpacity>
            )}
          </View>
        ))}

        {edition && (
          <View style={styles.ajoutEtape}>
            <TextInput
              style={[styles.champ, styles.champEtape]}
              value={nouvelleEtape}
              onChangeText={setNouvelleEtape}
              placeholder="Nouvelle étape"
              onSubmitEditing={ajouterEtape}
              returnKeyType="done"
            />
            <TouchableOpacity style={styles.boutonPlus} onPress={ajouterEtape}>
              <MaterialCommunityIcons name="plus" size={25} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {progression === 100 && etapes.length > 0 && (
          <View style={styles.reussite}>
            <Text style={styles.emojiReussite}>🐱🧺</Text>
            <Text style={styles.titreReussite}>Objectif atteint !</Text>
            <Text style={styles.messageReussite}>Bravo, tu as accompli toutes les étapes !</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.boutonSupprimer}
          onPress={supprimerObjectif}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={21}
            color="#C0394B"
          />
          <Text style={styles.texteBoutonSupprimer}>
            Supprimer l’objectif
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: FOND },
  entete: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  retour: { padding: 3 },
  titrePage: { fontSize: 21, fontWeight: "bold", color: VERT },
  boutonModifier: { flexDirection: "row", alignItems: "center", gap: 5 },
  texteModifier: { color: VERT, fontWeight: "600" },
  contenu: { paddingHorizontal: 20, paddingBottom: 35 },
  titreObjectif: { fontSize: 25, fontWeight: "bold", color: VERT, marginTop: 12 },
  sousTitre: { color: "#777", marginTop: 6, textTransform: "capitalize" },
  description: { color: "#4B4036", fontSize: 15, lineHeight: 22, marginTop: 18 },
  date: { color: "#777", marginTop: 8 },
  label: { color: VERT, fontSize: 14, fontWeight: "600", marginTop: 16, marginBottom: 7 },
  champ: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9E1D7",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
    color: "#4B4036",
    fontSize: 15,
  },
  multiligne: { minHeight: 95 },
  bouton: {
    backgroundColor: VERT,
    borderRadius: 13,
    padding: 14,
    alignItems: "center",
    marginTop: 20,
  },
  texteBouton: { color: "#FFFFFF", fontWeight: "bold" },
  progressionLigne: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 10,
  },
  section: { color: VERT, fontSize: 20, fontWeight: "bold" },
  pourcentage: { color: VERT, fontWeight: "bold" },
  barreFond: { height: 9, backgroundColor: "#EAE8E0", borderRadius: 10, overflow: "hidden" },
  barreRemplie: { height: "100%", backgroundColor: "#9DB58B", borderRadius: 10 },
  compteur: { color: "#777", fontSize: 12, marginTop: 8, marginBottom: 8 },
  etape: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginTop: 9,
    gap: 9,
  },
  caseEtape: { padding: 1 },
  texteEtape: { flex: 1, color: "#4B4036", fontSize: 14 },
  etapeTerminee: { textDecorationLine: "line-through", color: "#929292" },
  ajoutEtape: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 12 },
  champEtape: { flex: 1 },
  boutonPlus: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: VERT,
    alignItems: "center",
    justifyContent: "center",
  },
  reussite: {
    alignItems: "center",
    backgroundColor: "#EEF1E9",
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
  },
  emojiReussite: { fontSize: 42, marginBottom: 8 },
  titreReussite: { color: VERT, fontSize: 20, fontWeight: "bold" },
  messageReussite: { color: "#666", textAlign: "center", marginTop: 6 },
  message: { color: "#777", textAlign: "center", marginTop: 20 },


  boutonSupprimer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FCEBEC",
    borderRadius: 13,
    padding: 14,
    marginTop: 28,
  },
  texteBoutonSupprimer: {
    color: "#C0394B",
    fontWeight: "bold",
  },


});
