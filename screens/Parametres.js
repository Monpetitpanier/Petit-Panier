import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { usePreferences } from "../contexts/PreferencesContext";

import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";


const LIVRES = [
  { id: "bible", label: "La Bible" },
  { id: "coran", label: "Le Coran" },
  { id: "torah", label: "La Torah" },
];

const OPTIONS_VERROUILLAGE = [
  { id: "aucun", label: "Aucun", icone: "lock-open-outline", disponible: true },
  { id: "pin", label: "Code PIN", icone: "dialpad", disponible: true },
  { id: "empreinte", label: "Empreinte", icone: "fingerprint", disponible: false },
  { id: "visage", label: "Visage", icone: "face-recognition", disponible: false },
];

const ONGLETS_CONFIGURABLES = [
  { id: "agenda", label: "Agenda", description: "Onglet du bas" },
  { id: "budget", label: "Budget", description: "Onglet du bas" },
  { id: "maison", label: "Maison", description: "Catégorie de l'onglet Plus" },
  { id: "bienEtre", label: "Bien-être", description: "Catégorie de l'onglet Plus" },
  { id: "sante", label: "Santé", description: "Catégorie de l'onglet Plus" },
  { id: "univers", label: "Univers", description: "Catégorie de l'onglet Plus" },
];


export default function Parametres() {

  const navigation = useNavigation();

  const {
    prenom,
    modifierPrenom,

    dateNaissance,
    modifierDateNaissance,

    contenuUnivers,
    modifierContenuUnivers,

    contenuBienEtre,
    modifierContenuBienEtre,

    livreParoles,
    modifierLivreParoles,

    notificationsActives,
    modifierNotificationsActives,

    rappelsCategories,
    modifierRappelsCategories,

    verrouillage,
    modifierVerrouillage,

    codePin,
    modifierCodePin,

    onglets,
    modifierOnglets,

  } = usePreferences();

  const [prenomLocal, setPrenomLocal] = useState(prenom);
  const [dateLocale, setDateLocale] = useState(dateNaissance);
  const [pinLocal, setPinLocal] = useState(codePin);

 const basculerContenuUnivers = (id) => {
  modifierContenuUnivers({
    [id]: !contenuUnivers[id],
  });
};

  const basculerOnglet = (id) => {
    modifierOnglets({ [id]: !onglets[id] });
  };

  const basculerRappel = (id) => {
    modifierRappelsCategories({ [id]: !rappelsCategories[id] });
  };

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
              color={Colors.text}
            />
          </TouchableOpacity>

          <Text style={styles.titre}>Paramètres</Text>
        </View>

        {/* ============================= */}
        {/* MON PROFIL */}
        {/* ============================= */}

        <Text style={styles.titreSection}>👤 Mon profil</Text>

        <View style={styles.carte}>
          <Text style={styles.label}>Prénom</Text>
          <TextInput
            style={styles.champ}
            value={prenomLocal}
            onChangeText={setPrenomLocal}
            onBlur={() => modifierPrenom(prenomLocal)}
            placeholder="Ton prénom"
            placeholderTextColor={Colors.subtitle}
          />

          <Text style={[styles.label, styles.labelEspace]}>
            Date d'anniversaire
          </Text>
          <TextInput
            style={styles.champ}
            value={dateLocale}
            onChangeText={setDateLocale}
            onBlur={() => modifierDateNaissance(dateLocale)}
            placeholder="JJ / MM / AAAA"
            placeholderTextColor={Colors.subtitle}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <View style={styles.carte}>
  <Text style={styles.label}>Mon Univers</Text>

  <Text style={styles.description}>
    Choisis ce que tu souhaites retrouver dans ton espace Univers.
  </Text>

  {[
    {
      id: "voyages",
      emoji: "✈️",
      label: "Voyages",
    },
    {
      id: "lectures",
      emoji: "📚",
      label: "Lectures",
    },
    {
      id: "projets",
      emoji: "✍️",
      label: "Projets",
    },
  ].map((item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.ligneCentreInteret}
      onPress={() =>
        basculerContenuUnivers(item.id)
      }
      activeOpacity={0.7}
    >
      <Text style={{ fontSize: 20, marginRight: 12 }}>
        {item.emoji}
      </Text>

      <Text style={styles.labelCentreInteret}>
        {item.label}
      </Text>

      <MaterialCommunityIcons
        name={
          contenuUnivers[item.id]
            ? "check-circle"
            : "circle-outline"
        }
        size={22}
        color={
          contenuUnivers[item.id]
            ? "#aabbb3"
            : Colors.border
        }
      />
    </TouchableOpacity>
  ))}
</View>

        <View style={styles.carte}>
          <Text style={styles.label}>Contenu Bien-être</Text>
          <Text style={styles.description}>
            Ce que la carte d'accueil te propose chaque jour.
          </Text>

          <View style={styles.ligneChoix}>
            <TouchableOpacity
              style={[
                styles.choix,
                contenuBienEtre === "pensees" && styles.choixActif,
              ]}
              onPress={() => modifierContenuBienEtre("pensees")}
            >
              <Text
                style={[
                  styles.choixTexte,
                  contenuBienEtre === "pensees" && styles.choixTexteActif,
                ]}
              >
                💭 Pensées positives
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.choix,
                contenuBienEtre === "paroles" && styles.choixActif,
              ]}
              onPress={() => modifierContenuBienEtre("paroles")}
            >
              <Text
                style={[
                  styles.choixTexte,
                  contenuBienEtre === "paroles" && styles.choixTexteActif,
                ]}
              >
                📖 Paroles
              </Text>
            </TouchableOpacity>
          </View>

          {contenuBienEtre === "paroles" && (
            <View style={styles.sousChoixContainer}>
              <Text style={styles.labelPetit}>Livre choisi</Text>
              <View style={styles.ligneChoix}>
                {LIVRES.map((livre) => (
                  <TouchableOpacity
                    key={livre.id}
                    style={[
                      styles.chipLivre,
                      livreParoles === livre.id && styles.chipLivreActif,
                    ]}
                    onPress={() => modifierLivreParoles(livre.id)}
                  >
                    <Text
                      style={[
                        styles.chipLivreTexte,
                        livreParoles === livre.id &&
                          styles.chipLivreTexteActif,
                      ]}
                    >
                      {livre.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* ============================= */}
        {/* NOTIFICATIONS */}
        {/* ============================= */}

        <Text style={styles.titreSection}>🔔 Notifications</Text>

        <View style={styles.carte}>
          <View style={styles.ligneSwitch}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Activer les notifications</Text>
              <Text style={styles.description}>
                Fifi peut t'envoyer des rappels
              </Text>
            </View>
            <Switch
              value={notificationsActives}
              onValueChange={modifierNotificationsActives}
              trackColor={{ false: Colors.border, true: Colors.secondary }}
            />
          </View>

          {notificationsActives && (
            <View style={styles.sousChoixContainer}>
              <LigneRappel
                emoji="📅"
                titre="Rendez-vous"
                valeur={rappelsCategories.rdv}
                onValueChange={() => basculerRappel("rdv")}
              />
              <LigneRappel
                emoji="🏡"
                titre="Entretien de la maison"
                valeur={rappelsCategories.entretien}
                onValueChange={() => basculerRappel("entretien")}
              />
              <LigneRappel
                emoji="💧"
                titre="Factures / échéances"
                valeur={rappelsCategories.factures}
                onValueChange={() => basculerRappel("factures")}
              />
              <LigneRappel
                emoji="🌿"
                titre="Petits rappels bien-être"
                valeur={rappelsCategories.bienEtre}
                onValueChange={() => basculerRappel("bienEtre")}
                dernier
              />
            </View>
          )}
        </View>

        {/* ============================= */}
        {/* CONFIDENTIALITÉ */}
        {/* ============================= */}

        <Text style={styles.titreSection}>🔒 Confidentialité</Text>

        <View style={styles.carte}>
          <Text style={styles.label}>Verrouillage de l'application</Text>

          {OPTIONS_VERROUILLAGE.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.ligneVerrouillage,
                !option.disponible && styles.ligneDesactivee,
              ]}
              disabled={!option.disponible}
              onPress={() => modifierVerrouillage(option.id)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={option.icone}
                size={20}
                color={option.disponible ? Colors.secondary : Colors.border}
                style={{ marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.labelCentreInteret,
                    !option.disponible && styles.texteDesactive,
                  ]}
                >
                  {option.label}
                </Text>
                {!option.disponible && (
                  <Text style={styles.description}>Bientôt disponible</Text>
                )}
              </View>
              <MaterialCommunityIcons
                name={
                  verrouillage === option.id
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                size={22}
                color={verrouillage === option.id ? Colors.secondary : Colors.border}
              />
            </TouchableOpacity>
          ))}

          {verrouillage === "pin" && (
            <View style={styles.sousChoixContainer}>
              <Text style={styles.labelPetit}>Code PIN (4 à 6 chiffres)</Text>
              <TextInput
                style={styles.champ}
                value={pinLocal}
                onChangeText={(texte) =>
                  setPinLocal(texte.replace(/[^0-9]/g, "").slice(0, 6))
                }
                onBlur={() => modifierCodePin(pinLocal)}
                placeholder="••••"
                placeholderTextColor={Colors.subtitle}
                keyboardType="numeric"
                secureTextEntry
                maxLength={6}
              />
            </View>
          )}
        </View>

        {/* ============================= */}
        {/* SAUVEGARDE */}
        {/* ============================= */}

        <Text style={styles.titreSection}>☁️ Sauvegarde</Text>

        <View style={styles.carte}>
          <View style={styles.ligneSwitch}>
            <MaterialCommunityIcons
              name="cloud-outline"
              size={22}
              color={Colors.subtitle}
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Gérer la sauvegarde</Text>
              <Text style={styles.description}>
                Cette fonctionnalité arrivera plus tard
              </Text>
            </View>
          </View>
        </View>

        {/* ============================= */}
        {/* ONGLETS À AFFICHER */}
        {/* ============================= */}

        <Text style={styles.titreSection}>📱 Onglets à afficher</Text>

        <View style={styles.carte}>
          <Text style={styles.description}>
            Masque les onglets dont tu ne te sers pas encore.
          </Text>

          <View style={styles.sousChoixContainer}>
            {ONGLETS_CONFIGURABLES.map((item) => (
              <View key={item.id} style={styles.ligneSwitch}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <Switch
                  value={onglets[item.id]}
                  onValueChange={() => basculerOnglet(item.id)}
                  trackColor={{ false: Colors.border, true: Colors.secondary }}
                />
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


function LigneRappel({ emoji, titre, valeur, onValueChange, dernier }) {
  return (
    <View style={[styles.ligneSwitch, !dernier && styles.ligneAvecMarge]}>
      <Text style={styles.labelCentreInteret}>
        {emoji} {titre}
      </Text>
      <Switch
        value={valeur}
        onValueChange={onValueChange}
        trackColor={{ false: Colors.border, true: Colors.secondary }}
      />
    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  contenu: {
    padding: Spacing.lg,
    paddingBottom: 60,
  },

  entete: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  boutonRetour: {
    padding: Spacing.xs,
    marginRight: Spacing.xs,
  },

  titre: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.text,
  },

  titreSection: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.subtitle,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },

  carte: {
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow.card,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },

  labelPetit: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.subtitle,
    marginBottom: Spacing.sm,
  },

  labelEspace: {
    marginTop: Spacing.md,
  },

  description: {
    fontSize: 13,
    color: Colors.subtitle,
    marginTop: 2,
  },

  champ: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    fontSize: 15,
    color: Colors.text,
    marginTop: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  ligneCentreInteret: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  labelCentreInteret: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },

  ligneChoix: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },

  choix: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.large,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },

  choixActif: {
    backgroundColor: "#FBF3E9",
    borderColor: Colors.secondary,
  },

  choixTexte: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "600",
  },

  choixTexteActif: {
    color: Colors.secondary,
  },

  sousChoixContainer: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  chipLivre: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },

  chipLivreActif: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },

  chipLivreTexte: {
    fontSize: 13,
    color: Colors.text,
    fontWeight: "600",
  },

  chipLivreTexteActif: {
    color: "#FFFFFF",
  },

  ligneSwitch: {
    flexDirection: "row",
    alignItems: "center",
  },

  ligneAvecMarge: {
    marginBottom: Spacing.md,
  },

  ligneVerrouillage: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  ligneDesactivee: {
    opacity: 0.55,
  },

  texteDesactive: {
    color: Colors.subtitle,
  },

});