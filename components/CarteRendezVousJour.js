import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  Switch,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAgenda } from "../contexts/AgendaContext";


// --------------------------------------------------
// CARTE RENDEZ-VOUS D'UNE JOURNÉE
// --------------------------------------------------

export default function CarteRendezVousJour({
  date,
  rendezVous = [],
}) {

  const {
    supprimerRendezVous,
    basculerNotification,
    basculerTermine,
    modifierRendezVous,
  } = useAgenda();


  // ------------------------------------------------
  // MODIFICATION
  // ------------------------------------------------

  const [
    rendezVousEnModification,
    setRendezVousEnModification,
  ] = useState(null);

  const [titre, setTitre] = useState("");

  const [dateRendezVous, setDateRendezVous] =
    useState(new Date());

  const [notification, setNotification] =
    useState(false);

  const [afficherSelecteurDate, setAfficherSelecteurDate] =
    useState(false);

  const [afficherSelecteurHeure, setAfficherSelecteurHeure] =
    useState(false);


  // ------------------------------------------------
  // RENDEZ-VOUS DE LA JOURNÉE
  // ------------------------------------------------

  const rendezVousDuJour = rendezVous
    .filter((rdv) => rdv.date === date)
    .sort((a, b) =>
      a.heure.localeCompare(b.heure)
    );


  // ------------------------------------------------
  // SUPPRESSION
  // ------------------------------------------------

  function confirmerSuppression(rdv) {

    Alert.alert(
      "Supprimer le rendez-vous ?",

      `« ${rdv.titre} » sera supprimé définitivement.`,

      [
        {
          text: "Annuler",
          style: "cancel",
        },

        {
          text: "Supprimer",
          style: "destructive",

          onPress: () =>
            supprimerRendezVous(rdv.id),
        },
      ]
    );
  }


  // ------------------------------------------------
  // DATES
  // ------------------------------------------------

  function creerDateRendezVous(rdv) {

    const [annee, mois, jour] =
      rdv.date.split("-").map(Number);

    const [heures, minutes] =
      rdv.heure.split(":").map(Number);


    if (
      [annee, mois, jour].some(
        Number.isNaN
      )
    ) {
      return new Date();
    }


    return new Date(
      annee,
      mois - 1,
      jour,
      Number.isNaN(heures) ? 0 : heures,
      Number.isNaN(minutes) ? 0 : minutes
    );
  }


  function formaterDate(date) {

    const annee =
      date.getFullYear();

    const mois =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const jour =
      String(
        date.getDate()
      ).padStart(2, "0");


    return `${annee}-${mois}-${jour}`;
  }


  function formaterHeure(date) {

    const heures =
      String(
        date.getHours()
      ).padStart(2, "0");

    const minutes =
      String(
        date.getMinutes()
      ).padStart(2, "0");


    return `${heures}:${minutes}`;
  }


  // ------------------------------------------------
  // OUVERTURE MODIFICATION
  // ------------------------------------------------

  function ouvrirModification(rdv) {

    setRendezVousEnModification(rdv);

    setTitre(rdv.titre);

    setDateRendezVous(
      creerDateRendezVous(rdv)
    );

    setNotification(
      rdv.notification
    );
  }


  function fermerModification() {

    setRendezVousEnModification(null);

    setAfficherSelecteurDate(false);

    setAfficherSelecteurHeure(false);
  }


  // ------------------------------------------------
  // ENREGISTREMENT MODIFICATION
  // ------------------------------------------------

  function enregistrerModification() {

    const titreNettoye =
      titre.trim();


    if (
      !titreNettoye ||
      !rendezVousEnModification
    ) {
      return;
    }


    modifierRendezVous(
      rendezVousEnModification.id,
      {
        titre: titreNettoye,

        date:
          formaterDate(
            dateRendezVous
          ),

        heure:
          formaterHeure(
            dateRendezVous
          ),

        notification,
      }
    );


    fermerModification();
  }


  // ------------------------------------------------
  // CHANGEMENT DATE
  // ------------------------------------------------

  function gererChangementDate(
    event,
    nouvelleDate
  ) {

    setAfficherSelecteurDate(false);


    if (nouvelleDate) {

      setDateRendezVous(
        (dateActuelle) => {

          const dateMiseAJour =
            new Date(dateActuelle);


          dateMiseAJour.setFullYear(
            nouvelleDate.getFullYear(),
            nouvelleDate.getMonth(),
            nouvelleDate.getDate()
          );


          return dateMiseAJour;
        }
      );
    }
  }


  // ------------------------------------------------
  // CHANGEMENT HEURE
  // ------------------------------------------------

  function gererChangementHeure(
    event,
    nouvelleHeure
  ) {

    setAfficherSelecteurHeure(false);


    if (nouvelleHeure) {

      setDateRendezVous(
        (dateActuelle) => {

          const dateMiseAJour =
            new Date(dateActuelle);


          dateMiseAJour.setHours(
            nouvelleHeure.getHours(),
            nouvelleHeure.getMinutes(),
            0,
            0
          );


          return dateMiseAJour;
        }
      );
    }
  }


  // ------------------------------------------------
  // FORMAT JOUR
  // ------------------------------------------------

  function formaterTitreJour() {

    const dateObj =
      new Date(
        `${date}T12:00:00`
      );


    const aujourdHui =
      new Date();

    aujourdHui.setHours(
      0,
      0,
      0,
      0
    );


    const demain =
      new Date(aujourdHui);

    demain.setDate(
      demain.getDate() + 1
    );


    const dateComparee =
      new Date(dateObj);

    dateComparee.setHours(
      0,
      0,
      0,
      0
    );


    if (
      dateComparee.getTime() ===
      aujourdHui.getTime()
    ) {
      return "Aujourd'hui";
    }


    if (
      dateComparee.getTime() ===
      demain.getTime()
    ) {
      return "Demain";
    }


    return dateObj.toLocaleDateString(
      "fr-FR",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
      }
    );
  }


  // ------------------------------------------------
  // SI AUCUN RDV
  // ------------------------------------------------

  if (
    rendezVousDuJour.length === 0
  ) {
    return null;
  }


  // ------------------------------------------------
  // AFFICHAGE
  // ------------------------------------------------

  return (

    <View style={styles.jourContainer}>

      {/* ------------------------------------------ */}
      {/* JOUR */}
      {/* ------------------------------------------ */}

      <View style={styles.enteteJour}>

        <Text style={styles.titreJour}>
          {formaterTitreJour()}
        </Text>

      </View>


      {/* ------------------------------------------ */}
      {/* RENDEZ-VOUS */}
      {/* ------------------------------------------ */}

      {rendezVousDuJour.map(
        (rdv) => (

          <View
            key={rdv.id}
            style={[
              styles.carte,

              rdv.termine &&
                styles.carteTerminee,
            ]}
          >

            {/* Heure */}

            <Text
              style={[
                styles.heure,

                rdv.termine &&
                  styles.texteTermine,
              ]}
            >
              {rdv.heure}
            </Text>


            {/* Informations */}

            <View
              style={styles.informations}
            >

              <Text
                numberOfLines={1}
                style={[
                  styles.titreRdv,

                  rdv.termine &&
                    styles.texteTermine,
                ]}
              >
                {rdv.titre}
              </Text>

            </View>


            {/* Actions */}

            <View
              style={styles.actions}
            >

              {/* Notification */}

              <TouchableOpacity
                onPress={() =>
                  basculerNotification(
                    rdv.id
                  )
                }
                hitSlop={8}
              >

                <MaterialCommunityIcons
                  name={
                    rdv.notification
                      ? "heart"
                      : "heart-outline"
                  }
                  size={21}
                  color="#D86A87"
                />

              </TouchableOpacity>


              {/* Modifier */}

              <TouchableOpacity
                onPress={() =>
                  ouvrirModification(rdv)
                }
                hitSlop={8}
              >

                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={21}
                  color="#B8898C"
                />

              </TouchableOpacity>


              {/* Supprimer */}

              <TouchableOpacity
                onPress={() =>
                  confirmerSuppression(rdv)
                }
                hitSlop={8}
              >

                <MaterialCommunityIcons
                  name="delete-outline"
                  size={21}
                  color="#C95A5A"
                />

              </TouchableOpacity>


              {/* Terminé */}

              <TouchableOpacity
                onPress={() =>
                  basculerTermine(
                    rdv.id
                  )
                }
                hitSlop={8}
              >

                <MaterialCommunityIcons
                  name={
                    rdv.termine
                      ? "check-circle"
                      : "check-circle-outline"
                  }
                  size={21}
                  color={
                    rdv.termine
                      ? "#63A76A"
                      : "#B8898C"
                  }
                />

              </TouchableOpacity>

            </View>

          </View>

        )
      )}


      {/* ------------------------------------------ */}
      {/* MODALE MODIFICATION */}
      {/* ------------------------------------------ */}

      <Modal
        visible={
          Boolean(
            rendezVousEnModification
          )
        }
        transparent
        animationType="fade"
        onRequestClose={
          fermerModification
        }
      >

        <View
          style={styles.fondModal}
        >

          <View
            style={styles.modal}
          >

            <Text
              style={styles.titreModal}
            >
              Modifier le rendez-vous
            </Text>


            {/* Titre */}

            <Text
              style={styles.libelle}
            >
              Titre
            </Text>

            <TextInput
              style={styles.input}
              value={titre}
              onChangeText={setTitre}
              placeholder="Titre du rendez-vous"
              placeholderTextColor="#B7AAA0"
              autoFocus
            />


            {/* Date */}

            <Text
              style={styles.libelle}
            >
              Date
            </Text>

            <TouchableOpacity
              style={styles.selecteur}
              onPress={() =>
                setAfficherSelecteurDate(
                  true
                )
              }
            >

              <Text
                style={styles.texteSelecteur}
              >
                {formaterDate(
                  dateRendezVous
                )}
              </Text>

            </TouchableOpacity>


            {/* Heure */}

            <Text
              style={styles.libelle}
            >
              Heure
            </Text>

            <TouchableOpacity
              style={styles.selecteur}
              onPress={() =>
                setAfficherSelecteurHeure(
                  true
                )
              }
            >

              <Text
                style={styles.texteSelecteur}
              >
                {formaterHeure(
                  dateRendezVous
                )}
              </Text>

            </TouchableOpacity>


            {/* Notification */}

            <View
              style={styles.ligneNotification}
            >

              <Text
                style={styles.libelle}
              >
                Notification
              </Text>

              <Switch
                value={notification}
                onValueChange={
                  setNotification
                }
                trackColor={{
                  false: "#D8CEC5",
                  true: "#E8B7B7",
                }}
                thumbColor="#FFFFFF"
              />

            </View>


            {/* Sélecteur date */}

            {afficherSelecteurDate && (

              <DateTimePicker
                value={
                  dateRendezVous
                }
                mode="date"
                onChange={
                  gererChangementDate
                }
              />

            )}


            {/* Sélecteur heure */}

            {afficherSelecteurHeure && (

              <DateTimePicker
                value={
                  dateRendezVous
                }
                mode="time"
                is24Hour
                onChange={
                  gererChangementHeure
                }
              />

            )}


            {/* Boutons */}

            <View
              style={styles.actionsModal}
            >

              <TouchableOpacity
                style={
                  styles.boutonAnnuler
                }
                onPress={
                  fermerModification
                }
              >

                <Text
                  style={
                    styles.texteAnnuler
                  }
                >
                  Annuler
                </Text>

              </TouchableOpacity>


              <TouchableOpacity
                style={[
                  styles.boutonEnregistrer,

                  !titre.trim() &&
                    styles.boutonDesactive,
                ]}
                onPress={
                  enregistrerModification
                }
                disabled={
                  !titre.trim()
                }
              >

                <Text
                  style={
                    styles.texteEnregistrer
                  }
                >
                  Enregistrer
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

    </View>
  );
}


// --------------------------------------------------
// STYLES
// --------------------------------------------------

const styles = StyleSheet.create({

  // ------------------------------------------------
  // JOUR
  // ------------------------------------------------

  jourContainer: {
    marginBottom: 7,
  },


  enteteJour: {
    paddingHorizontal: 4,
    marginBottom: 4,
  },


  titreJour: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8B7464",
    textTransform: "capitalize",
  },


  // ------------------------------------------------
  // CARTE
  // ------------------------------------------------

  carte: {
    flexDirection: "row",
    alignItems: "center",

    minHeight: 45,

    paddingHorizontal: 10,
    paddingVertical: 7,

    marginBottom: 5,

    backgroundColor: "#FFFFFF",

    borderRadius: 13,

    borderWidth: 1,
    borderColor: "#F0E5DC",
  },


  carteTerminee: {
    opacity: 0.55,
  },


  // ------------------------------------------------
  // HEURE
  // ------------------------------------------------

  heure: {
    width: 48,

    fontSize: 13,
    fontWeight: "700",

    color: "#B8898C",
  },


  // ------------------------------------------------
  // INFORMATIONS
  // ------------------------------------------------

  informations: {
    flex: 1,

    paddingRight: 5,
  },


  titreRdv: {
    fontSize: 14,

    fontWeight: "600",

    color: "#5A4030",
  },


  texteTermine: {
    color: "#9B8B80",

    textDecorationLine:
      "line-through",
  },


  // ------------------------------------------------
  // ACTIONS
  // ------------------------------------------------

  actions: {
    flexDirection: "row",

    alignItems: "center",

    gap: 8,
  },


  // ------------------------------------------------
  // MODALE
  // ------------------------------------------------

  fondModal: {
    flex: 1,

    justifyContent: "center",

    padding: 20,

    backgroundColor:
      "rgba(0, 0, 0, 0.35)",
  },


  modal: {
    backgroundColor: "#FFFDF8",

    borderRadius: 20,

    padding: 20,
  },


  titreModal: {
    marginBottom: 18,

    fontSize: 22,

    fontWeight: "700",

    color: "#5A4030",
  },


  libelle: {
    marginBottom: 5,

    fontSize: 15,

    fontWeight: "600",

    color: "#5A4030",
  },


  input: {
    marginBottom: 14,

    paddingHorizontal: 14,
    paddingVertical: 10,

    borderWidth: 1,
    borderColor: "#E8DCCB",

    borderRadius: 12,

    backgroundColor: "#FFFFFF",

    color: "#5A4030",

    fontSize: 16,
  },


  selecteur: {
    marginBottom: 14,

    paddingHorizontal: 14,
    paddingVertical: 11,

    borderWidth: 1,
    borderColor: "#E8DCCB",

    borderRadius: 12,

    backgroundColor: "#FFFFFF",
  },


  texteSelecteur: {
    color: "#5A4030",

    fontSize: 16,
  },


  ligneNotification: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 18,
  },


  actionsModal: {
    flexDirection: "row",

    justifyContent: "flex-end",

    alignItems: "center",

    gap: 8,
  },


  boutonAnnuler: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },


  texteAnnuler: {
    color: "#5A4030",

    fontWeight: "600",
  },


  boutonEnregistrer: {
    paddingHorizontal: 16,
    paddingVertical: 10,

    borderRadius: 12,

    backgroundColor: "#E8B7B7",
  },


  boutonDesactive: {
    opacity: 0.5,
  },


  texteEnregistrer: {
    color: "#5A4030",

    fontWeight: "700",
  },

});