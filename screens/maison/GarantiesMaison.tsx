import React, { useMemo, useState } from "react";

import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useMaison } from "../../contexts/MaisonContext";
import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";


const DUREES = [
  { label: "1 an", value: 1 },
  { label: "2 ans", value: 2 },
  { label: "3 ans", value: 3 },
  { label: "5 ans", value: 5 },
  { label: "10 ans", value: 10 },
];


function formaterDate(date) {
  return date.toLocaleDateString("fr-FR");
}


function calculerDateFin(dateAchat, dureeAnnees) {
  const date = new Date(dateAchat);
  date.setFullYear(date.getFullYear() + dureeAnnees);
  return formaterDate(date);
}


function estExpiree(dateFin) {
  return new Date(dateFin).getTime() < Date.now();
}


function calculerJoursRestants(dateFin) {
  const difference =
    new Date(dateFin).getTime() - Date.now();

  return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );
}


export default function GarantiesMaison() {
  const navigation = useNavigation();

  const { listes, ajouterGarantie, supprimer } = useMaison();

  const [formulaireVisible, setFormulaireVisible] = useState(false);

  const [produit, setProduit] = useState("");
  const [dateAchat, setDateAchat] = useState(new Date());
  const [dureeAnnees, setDureeAnnees] = useState(2);
  const [magasin, setMagasin] = useState("");
  const [reference, setReference] = useState("");
  const [note, setNote] = useState("");
  const [afficherDate, setAfficherDate] = useState(false);

  const garanties = useMemo(
    () => [...listes.garanties].sort(
      (a, b) =>
        new Date(a.dateFin).getTime() -
        new Date(b.dateFin).getTime()
    ),
    [listes.garanties]
  );


  function reinitialiserFormulaire() {
    setProduit("");
    setDateAchat(new Date());
    setDureeAnnees(2);
    setMagasin("");
    setReference("");
    setNote("");
    setAfficherDate(false);
  }


  function enregistrer() {
    if (!produit.trim()) {
      Alert.alert(
        "Information manquante",
        "Indique le nom du produit."
      );
      return;
    }

    ajouterGarantie(
      produit,
      dateAchat.toISOString(),
      dureeAnnees,
      magasin,
      reference,
      note
    );

    reinitialiserFormulaire();
    setFormulaireVisible(false);
  }


  function supprimerGarantie(id, nom) {
    Alert.alert(
      "Supprimer cette garantie ?",
      `Voulez-vous supprimer la garantie de « ${nom} » ?`,
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () =>
            supprimer("garanties", id),
        },
      ]
    );
  }


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      {/* ======================================= */}
      {/* EN-TÊTE */}
      {/* ======================================= */}

      <View style={styles.entete}>

        <TouchableOpacity
          style={styles.boutonRetour}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={30}
            color={Colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.titre}>
          Garanties
        </Text>

        <Text style={styles.sousTitre}>
          Garde un œil sur tes achats,
          {"\n"}
          Fifi pense aux échéances.
        </Text>

      </View>


      {/* ======================================= */}
      {/* ILLUSTRATION */}
      {/* ======================================= */}

      <View style={styles.zoneIllustration}>
        <Image
          source={require(
            "../../assets/illustrations/maison/garanties.png"
          )}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>


      {/* ======================================= */}
      {/* FORMULAIRE */}
      {/* ======================================= */}

      {formulaireVisible && (
        <View style={styles.formulaire}>

          <Text style={styles.titreFormulaire}>
            Ajouter une garantie
          </Text>

          <Text style={styles.label}>
            Produit
          </Text>

          <TextInput
            value={produit}
            onChangeText={setProduit}
            placeholder="Ex. Télévision Samsung"
            placeholderTextColor={Colors.subtitle}
            style={styles.input}
          />


          <Text style={styles.label}>
            Date d'achat
          </Text>

          <TouchableOpacity
            style={styles.selecteur}
            onPress={() => setAfficherDate(true)}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="calendar-outline"
              size={21}
              color={Colors.subtitle}
            />

            <Text style={styles.texteSelecteur}>
              {formaterDate(dateAchat)}
            </Text>
          </TouchableOpacity>

          {afficherDate && (
            <DateTimePicker
              value={dateAchat}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, date) => {
                if (Platform.OS !== "ios") {
                  setAfficherDate(false);
                }

                if (date) {
                  setDateAchat(date);
                }
              }}
            />
          )}


          <Text style={styles.label}>
            Durée de la garantie
          </Text>

          <View style={styles.durees}>
            {DUREES.map((duree) => (
              <TouchableOpacity
                key={duree.value}
                style={[
                  styles.boutonDuree,
                  dureeAnnees === duree.value &&
                    styles.boutonDureeActif,
                ]}
                onPress={() =>
                  setDureeAnnees(duree.value)
                }
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.texteDuree,
                    dureeAnnees === duree.value &&
                      styles.texteDureeActif,
                  ]}
                >
                  {duree.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.apercuFin}>
            Fin de garantie prévue le {" "}
            <Text style={styles.apercuFinFort}>
              {calculerDateFin(dateAchat, dureeAnnees)}
            </Text>
          </Text>


          <Text style={styles.label}>
            Magasin (facultatif)
          </Text>

          <TextInput
            value={magasin}
            onChangeText={setMagasin}
            placeholder="Ex. Darty"
            placeholderTextColor={Colors.subtitle}
            style={styles.input}
          />


          <Text style={styles.label}>
            Référence / n° de facture (facultatif)
          </Text>

          <TextInput
            value={reference}
            onChangeText={setReference}
            placeholder="Ex. FAC-2026-12345"
            placeholderTextColor={Colors.subtitle}
            style={styles.input}
          />


          <Text style={styles.label}>
            Note (facultatif)
          </Text>

          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Une information à conserver..."
            placeholderTextColor={Colors.subtitle}
            style={[styles.input, styles.inputMultiline]}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />


          <View style={styles.actionsFormulaire}>

            <TouchableOpacity
              style={styles.boutonAnnuler}
              onPress={() => {
                reinitialiserFormulaire();
                setFormulaireVisible(false);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.texteAnnuler}>
                Annuler
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.boutonEnregistrer}
              onPress={enregistrer}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons
                name="content-save-outline"
                size={20}
                color="#FFFFFF"
              />

              <Text style={styles.texteBouton}>
                Enregistrer
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      )}


      {/* ======================================= */}
      {/* LISTE DES GARANTIES */}
      {/* ======================================= */}

      {!formulaireVisible && garanties.length === 0 && (
        <View style={styles.etatVide}>

          <Text style={styles.titreVide}>
            Aucune garantie pour le moment
          </Text>

          <Text style={styles.texteVide}>
            Tu peux ajouter ici les achats que tu
            souhaites garder à l'œil.
          </Text>

        </View>
      )}


      {!formulaireVisible && garanties.length > 0 && (
        <View style={styles.liste}>

          {garanties.map((garantie) => {
            const expiree = estExpiree(garantie.dateFin);
            const joursRestants =
              calculerJoursRestants(garantie.dateFin);

            return (
              <View
                key={garantie.id}
                style={styles.carteGarantie}
              >

                <View style={styles.enteteCarte}>

                  <View style={styles.iconeGarantie}>
                    <MaterialCommunityIcons
                      name="shield-check-outline"
                      size={24}
                      color={Colors.secondary}
                    />
                  </View>

                  <View style={styles.infosCarte}>
                    <Text style={styles.produit}>
                      {garantie.produit}
                    </Text>

                    <Text style={styles.detail}>
                      Acheté le {" "}
                      {formaterDate(
                        new Date(garantie.dateAchat)
                      )}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      supprimerGarantie(
                        garantie.id,
                        garantie.produit
                      )
                    }
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={21}
                      color={Colors.subtitle}
                    />
                  </TouchableOpacity>

                </View>


                <View style={styles.ligneFin}>
                  <MaterialCommunityIcons
                    name="calendar-clock-outline"
                    size={19}
                    color={expiree ? "#B85C5C" : Colors.secondary}
                  />

                  <Text
                    style={[
                      styles.dateFin,
                      expiree && styles.dateExpiree,
                    ]}
                  >
                    {expiree
                      ? "Garantie expirée"
                      : `Garantie jusqu'au ${formaterDate(
                          new Date(garantie.dateFin)
                        )}`}
                  </Text>
                </View>

                {!expiree && (
                  <Text style={styles.joursRestants}>
                    {joursRestants <= 30
                      ? `Plus que ${joursRestants} jour${joursRestants > 1 ? "s" : ""}`
                      : `${Math.ceil(joursRestants / 30)} mois environ restants`}
                  </Text>
                )}

                {garantie.magasin && (
                  <Text style={styles.detail}>
                    Magasin : {garantie.magasin}
                  </Text>
                )}

                {garantie.reference && (
                  <Text style={styles.detail}>
                    Référence : {garantie.reference}
                  </Text>
                )}

                {garantie.note && (
                  <Text style={styles.note}>
                    {garantie.note}
                  </Text>
                )}

              </View>
            );
          })}

        </View>
      )}


      {/* ======================================= */}
      {/* BOUTON AJOUTER */}
      {/* ======================================= */}

      {!formulaireVisible && (
        <TouchableOpacity
          style={styles.boutonAjouter}
          activeOpacity={0.85}
          onPress={() => {
            setFormulaireVisible(true);
          }}
        >
          <MaterialCommunityIcons
            name="plus"
            size={24}
            color="#FFFFFF"
          />

          <Text style={styles.texteBouton}>
            Ajouter une garantie
          </Text>
        </TouchableOpacity>
      )}

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: 50,
  },

  entete: {
    alignItems: "center",
    marginBottom: Spacing.sm,
  },

  boutonRetour: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.card,
  },

  titre: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
  },

  sousTitre: {
    marginTop: Spacing.sm,
    fontSize: 16,
    lineHeight: 23,
    color: Colors.subtitle,
    textAlign: "center",
  },

  zoneIllustration: {
    alignItems: "center",
    marginVertical: Spacing.lg,
  },

  illustration: {
    width: 150,
    height: 150,
  },

  formulaire: {
    backgroundColor: Colors.card,
    borderRadius: 22,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  titreFormulaire: {
    fontSize: 21,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.lg,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.xs,
  },

  input: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingHorizontal: Spacing.md,
    paddingVertical: 13,
    fontSize: 16,
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  inputMultiline: {
    minHeight: 84,
  },

  selecteur: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingHorizontal: Spacing.md,
    paddingVertical: 13,
    marginBottom: Spacing.md,
  },

  texteSelecteur: {
    fontSize: 16,
    color: Colors.text,
  },

  durees: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: Spacing.sm,
  },

  boutonDuree: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: Colors.background,
  },

  boutonDureeActif: {
    backgroundColor: Colors.secondary,
  },

  texteDuree: {
    fontSize: 14,
    color: Colors.text,
  },

  texteDureeActif: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  apercuFin: {
    fontSize: 14,
    color: Colors.subtitle,
    marginBottom: Spacing.lg,
  },

  apercuFinFort: {
    color: Colors.text,
    fontWeight: "700",
  },

  actionsFormulaire: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },

  boutonAnnuler: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },

  texteAnnuler: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  boutonEnregistrer: {
    flex: 1.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 18,
    paddingVertical: 14,
    backgroundColor: Colors.secondary,
  },

  etatVide: {
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 22,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  titreVide: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },

  texteVide: {
    marginTop: Spacing.sm,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.subtitle,
    textAlign: "center",
  },

  liste: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },

  carteGarantie: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: Spacing.md,
  },

  enteteCarte: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconeGarantie: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    marginRight: Spacing.sm,
  },

  infosCarte: {
    flex: 1,
  },

  produit: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
  },

  detail: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.subtitle,
  },

  ligneFin: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: Spacing.md,
  },

  dateFin: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.secondary,
  },

  dateExpiree: {
    color: "#B85C5C",
  },

  joursRestants: {
    marginTop: 4,
    marginLeft: 26,
    fontSize: 13,
    color: Colors.subtitle,
  },

  note: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text,
  },

  boutonAjouter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    borderRadius: 18,
    paddingVertical: 15,
    gap: 8,
  },

  texteBouton: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
