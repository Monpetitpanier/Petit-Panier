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
import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";

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
  const [rendezVousEnModification, setRendezVousEnModification] =
    useState(null);
  const [titre, setTitre] = useState("");
  const [dateRendezVous, setDateRendezVous] = useState(new Date());
  const [notification, setNotification] = useState(false);
  const [afficherSelecteurDate, setAfficherSelecteurDate] =
    useState(false);
  const [afficherSelecteurHeure, setAfficherSelecteurHeure] =
    useState(false);

  const rendezVousDuJour = rendezVous
    .filter((rdv) => rdv.date === date)
    .sort((a, b) => a.heure.localeCompare(b.heure));

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
          onPress: () => supprimerRendezVous(rdv.id),
        },
      ]
    );
  }

  function creerDateRendezVous(rdv) {
    const [annee, mois, jour] = rdv.date.split("-").map(Number);
    const [heures, minutes] = rdv.heure.split(":").map(Number);

    if ([annee, mois, jour].some(Number.isNaN)) {
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
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, "0");
    const jour = String(date.getDate()).padStart(2, "0");

    return `${annee}-${mois}-${jour}`;
  }

  function formaterHeure(date) {
    const heures = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${heures}:${minutes}`;
  }

  function ouvrirModification(rdv) {
    setRendezVousEnModification(rdv);
    setTitre(rdv.titre);
    setDateRendezVous(creerDateRendezVous(rdv));
    setNotification(rdv.notification);
  }

  function fermerModification() {
    setRendezVousEnModification(null);
    setAfficherSelecteurDate(false);
    setAfficherSelecteurHeure(false);
  }

  function enregistrerModification() {
    const titreNettoye = titre.trim();

    if (!titreNettoye || !rendezVousEnModification) {
      return;
    }

    modifierRendezVous(rendezVousEnModification.id, {
      titre: titreNettoye,
      date: formaterDate(dateRendezVous),
      heure: formaterHeure(dateRendezVous),
      notification,
    });

    fermerModification();
  }

  function gererChangementDate(event, nouvelleDate) {
    setAfficherSelecteurDate(false);

    if (nouvelleDate) {
      setDateRendezVous((dateActuelle) => {
        const dateMiseAJour = new Date(dateActuelle);

        dateMiseAJour.setFullYear(
          nouvelleDate.getFullYear(),
          nouvelleDate.getMonth(),
          nouvelleDate.getDate()
        );

        return dateMiseAJour;
      });
    }
  }

  function gererChangementHeure(event, nouvelleHeure) {
    setAfficherSelecteurHeure(false);

    if (nouvelleHeure) {
      setDateRendezVous((dateActuelle) => {
        const dateMiseAJour = new Date(dateActuelle);

        dateMiseAJour.setHours(
          nouvelleHeure.getHours(),
          nouvelleHeure.getMinutes(),
          0,
          0
        );

        return dateMiseAJour;
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>
        📅 Rendez-vous du {date}
      </Text>

      {rendezVousDuJour.length === 0 ? (
        <Text style={styles.aucun}>
          Aucun rendez-vous pour cette journée.
        </Text>
      ) : (
        rendezVousDuJour.map((rdv) => (
          <View
            key={rdv.id}
            style={[
              styles.carte,
              rdv.termine && styles.carteTerminee,
            ]}
          >
            <View style={styles.informations}>
              <Text
                style={[
                  styles.heure,
                  rdv.termine && styles.texteTermine,
                ]}
              >
                {rdv.heure}
              </Text>

              <Text
                style={[
                  styles.titreRdv,
                  rdv.termine && styles.texteTermine,
                ]}
              >
                {rdv.titre}
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() =>
                  basculerNotification(rdv.id)
                }
              >
                <MaterialCommunityIcons
                  name={
                    rdv.notification
                      ? "heart"
                      : "heart-outline"
                  }
                  size={22}
                  color="#D86A87"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => ouvrirModification(rdv)}
              >
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={22}
                  color={Colors.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  confirmerSuppression(rdv)
                }
              >
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={22}
                  color="#C95A5A"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  basculerTermine(rdv.id)
                }
              >
                <MaterialCommunityIcons
                  name={
                    rdv.termine
                      ? "check-circle"
                      : "check-circle-outline"
                  }
                  size={22}
                  color={
                    rdv.termine
                      ? "#63A76A"
                      : Colors.primary
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      <Modal
        visible={Boolean(rendezVousEnModification)}
        transparent
        animationType="fade"
        onRequestClose={fermerModification}
      >
        <View style={styles.fondModal}>
          <View style={styles.modal}>
            <Text style={styles.titreModal}>
              Modifier le rendez-vous
            </Text>

            <Text style={styles.libelle}>Titre</Text>
            <TextInput
              style={styles.input}
              value={titre}
              onChangeText={setTitre}
              placeholder="Titre du rendez-vous"
              placeholderTextColor={Colors.subtitle}
              autoFocus
            />

            <Text style={styles.libelle}>Date</Text>
            <TouchableOpacity
              style={styles.selecteur}
              onPress={() => setAfficherSelecteurDate(true)}
            >
              <Text style={styles.texteSelecteur}>
                {formaterDate(dateRendezVous)}
              </Text>
            </TouchableOpacity>

            <Text style={styles.libelle}>Heure</Text>
            <TouchableOpacity
              style={styles.selecteur}
              onPress={() => setAfficherSelecteurHeure(true)}
            >
              <Text style={styles.texteSelecteur}>
                {formaterHeure(dateRendezVous)}
              </Text>
            </TouchableOpacity>

            <View style={styles.ligneNotification}>
              <Text style={styles.libelle}>Notification</Text>
              <Switch
                value={notification}
                onValueChange={setNotification}
                trackColor={{ false: Colors.border, true: Colors.secondary }}
                thumbColor={Colors.white}
              />
            </View>

            {afficherSelecteurDate && (
              <DateTimePicker
                value={dateRendezVous}
                mode="date"
                onChange={gererChangementDate}
              />
            )}

            {afficherSelecteurHeure && (
              <DateTimePicker
                value={dateRendezVous}
                mode="time"
                is24Hour
                onChange={gererChangementHeure}
              />
            )}

            <View style={styles.actionsModal}>
              <TouchableOpacity
                style={styles.boutonAnnuler}
                onPress={fermerModification}
              >
                <Text style={styles.texteAnnuler}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.boutonEnregistrer,
                  !titre.trim() && styles.boutonDesactive,
                ]}
                onPress={enregistrerModification}
                disabled={!titre.trim()}
              >
                <Text style={styles.texteEnregistrer}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
    padding: Spacing.md,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
  },

  titre: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  aucun: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },

  carte: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  carteTerminee: {
    opacity: 0.6,
  },

  informations: {
    marginBottom: Spacing.sm,
  },

  heure: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.primary,
  },

  titreRdv: {
    marginTop: 4,
    fontSize: 16,
    color: Colors.text,
  },

  texteTermine: {
    color: Colors.textSecondary,
    textDecorationLine: "line-through",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },

  fondModal: {
    flex: 1,
    justifyContent: "center",
    padding: Spacing.lg,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },

  modal: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: Spacing.lg,
  },

  titreModal: {
    marginBottom: Spacing.lg,
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  libelle: {
    marginBottom: Spacing.xs,
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },

  input: {
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.white,
    color: Colors.text,
    fontSize: 16,
  },

  selecteur: {
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },

  texteSelecteur: {
    color: Colors.text,
    fontSize: 16,
  },

  ligneNotification: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  actionsModal: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Spacing.sm,
  },

  boutonAnnuler: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },

  texteAnnuler: {
    color: Colors.text,
    fontWeight: "600",
  },

  boutonEnregistrer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
    backgroundColor: Colors.primary,
  },

  boutonDesactive: {
    opacity: 0.5,
  },

  texteEnregistrer: {
    color: Colors.white,
    fontWeight: "700",
  },
});
