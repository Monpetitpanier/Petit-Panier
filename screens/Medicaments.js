import React, { useState } from "react";

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useSante } from "../contexts/SanteContext";

import {
  obtenirStatutPeremption,
} from "../utils/medicamentUtils";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function Medicaments() {
  const navigation = useNavigation();

  const { medicaments, ajouterMedicament } = useSante();

const [formulaireVisible, setFormulaireVisible] = useState(false);
const [nom, setNom] = useState("");
const [dosage, setDosage] = useState("");
const [quantite, setQuantite] = useState("");
const [datePeremption, setDatePeremption] = useState("");

function enregistrerMedicament() {
  if (!nom.trim()) {
    Alert.alert(
      "Nom obligatoire",
      "Indique le nom du médicament."
    );
    return;
  }

  ajouterMedicament({
    id: `${Date.now()}`,
    nom: nom.trim(),
    dosage: dosage.trim() || null,
    quantite: quantite.trim()
      ? Number(quantite)
      : undefined,
    datePeremption: datePeremption.trim() || null,
  });

  setNom("");
  setDosage("");
  setQuantite("");
  setDatePeremption("");
  setFormulaireVisible(false);

  Alert.alert(
    "Médicament enregistré",
    "Fifi pourra désormais le reconnaître dans le Panier."
  );
}

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity
        style={styles.boutonRetour}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={28}
          color={Colors.text}
        />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <Text style={styles.titre}>
          Médicaments
        </Text>

        <Text style={styles.sousTitre}>
          Garder un œil sur la pharmacie de la maison.
        </Text>
<TouchableOpacity
  style={styles.boutonAjouter}
  onPress={() => setFormulaireVisible(!formulaireVisible)}
>
  <MaterialCommunityIcons
    name={formulaireVisible ? "close" : "plus"}
    size={22}
    color={Colors.text}
  />
  <Text style={styles.texteBoutonAjouter}>
    {formulaireVisible
      ? "Annuler"
      : "Ajouter un médicament"}
  </Text>
</TouchableOpacity>

{formulaireVisible && (
  <View style={styles.formulaire}>
    <Text style={styles.labelChamp}>
      Nom du médicament *
    </Text>
    <TextInput
      style={styles.champ}
      placeholder="Ex. : Mon médicament"
      placeholderTextColor={Colors.subtitle}
      value={nom}
      onChangeText={setNom}
    />

    <Text style={styles.labelChamp}>
      Dosage (facultatif)
    </Text>
    <TextInput
      style={styles.champ}
      placeholder="Ex. : 500 mg"
      placeholderTextColor={Colors.subtitle}
      value={dosage}
      onChangeText={setDosage}
    />

    <Text style={styles.labelChamp}>
      Quantité disponible (facultatif)
    </Text>
    <TextInput
      style={styles.champ}
      placeholder="Ex. : 20"
      placeholderTextColor={Colors.subtitle}
      value={quantite}
      onChangeText={setQuantite}
      keyboardType="numeric"
    />

    <Text style={styles.labelChamp}>
      Date de péremption (facultatif)
    </Text>
    <TextInput
      style={styles.champ}
      placeholder="Ex. : 31/12/2027"
      placeholderTextColor={Colors.subtitle}
      value={datePeremption}
      onChangeText={setDatePeremption}
    />

    <TouchableOpacity
      style={styles.boutonEnregistrer}
      onPress={enregistrerMedicament}
    >
      <Text style={styles.texteEnregistrer}>
        Enregistrer le médicament
      </Text>
    </TouchableOpacity>
  </View>
)}
        <View style={styles.resume}>
          <Text style={styles.nombre}>
            {medicaments.length}
          </Text>

          <Text style={styles.texteResume}>
            médicament
            {medicaments.length > 1 ? "s" : ""} enregistré
            {medicaments.length > 1 ? "s" : ""}
          </Text>
        </View>

        {medicaments.length === 0 ? (

          <View style={styles.carteVide}>
            <Text style={styles.emoji}>
              💊
            </Text>

            <Text style={styles.titreVide}>
              Aucun médicament enregistré
            </Text>

            <Text style={styles.texteVide}>
              Les médicaments de votre pharmacie apparaîtront ici,
              avec leur quantité et leur date de péremption.
            </Text>
          </View>

        ) : (

          medicaments.map((medicament) => {
            const statutPeremption =
              obtenirStatutPeremption(
                medicament.datePeremption
              );

            return (
              <TouchableOpacity
                key={medicament.id}
               style={[
  styles.carteMedicament,

  statutPeremption === "bientot_perime" &&
    styles.carteBientotPerime,

  statutPeremption === "perime" &&
    styles.cartePerime,
]} 
                onPress={() =>
                  navigation.navigate("DetailsMedicament", {
                    medicamentId: medicament.id,
                  })
                }
              >

                <View style={styles.iconeMedicament}>
                  <Text style={styles.emojiCarte}>
                    💊
                  </Text>
                </View>

                <View style={styles.texteMedicament}>

                  <Text style={styles.nomMedicament}>
                    {medicament.nom}
                  </Text>

                  {medicament.quantite !== undefined && (
                    <Text style={styles.details}>
                      Quantité : {medicament.quantite}
                    </Text>
                  )}

                  {medicament.datePeremption && (
                    <Text style={styles.peremption}>
                      Péremption : {medicament.datePeremption}
                    </Text>
                  )}

                </View>

              </TouchableOpacity>
            );
          })

        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  boutonRetour: {
    marginLeft: Spacing.md,
    marginTop: Spacing.sm,

    width: 44,
    height: 44,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 22,
  },

  titre: {
    marginTop: Spacing.md,
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
  },

  sousTitre: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
    fontSize: 16,
    lineHeight: 23,
    color: Colors.subtitle,
  },

  resume: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: Spacing.lg,
  },

  nombre: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.text,
  },

  texteResume: {
    marginLeft: Spacing.sm,
    fontSize: 16,
    color: Colors.subtitle,
  },

  carteVide: {
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.xl,
    ...Shadow.card,
  },

  emoji: {
    fontSize: 42,
    marginBottom: Spacing.md,
  },

  titreVide: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  texteVide: {
    marginTop: Spacing.sm,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: Colors.subtitle,
  },

  carteMedicament: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.card,
  },

  carteBientotPerime: {
  borderWidth: 2,
  borderColor: "orange",
},

cartePerime: {
  borderWidth: 2,
  borderColor: "red",
},

  iconeMedicament: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    marginRight: Spacing.md,
  },

  emojiCarte: {
    fontSize: 25,
  },

  texteMedicament: {
    flex: 1,
  },

  nomMedicament: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
  },

  details: {
    marginTop: 3,
    fontSize: 14,
    color: Colors.subtitle,
  },

  peremption: {
    marginTop: 2,
    fontSize: 13,
    color: Colors.subtitle,
  },

    boutonAjouter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadow.card,
  },

  texteBoutonAjouter: {
    marginLeft: Spacing.sm,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  formulaire: {
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow.card,
  },

  labelChamp: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.xs,
    marginTop: Spacing.sm,
  },

  champ: {
    borderWidth: 1,
    borderColor: Colors.subtitle,
    borderRadius: Radius.large,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 16,
    color: Colors.text,
  },

  boutonEnregistrer: {
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: Radius.large,
    padding: Spacing.md,
    marginTop: Spacing.lg,
  },

  texteEnregistrer: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },

});