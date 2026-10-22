import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import { useBienEtre } from "../../contexts/BienEtreContext";
import CarteGratitude from "../../components/CarteGratitude";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

// =======================================
// OUTILS POUR LE PDF
// =======================================

function echapperHtml(texte) {
  return String(texte ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formaterDate(dateTexte) {
  const date = new Date(dateTexte);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function genererHtmlRecueil(annee, gratitudes) {
  const gratitudesTriees = [...gratitudes].sort(
    (a, b) =>
      new Date(a.dateCreation).getTime() -
      new Date(b.dateCreation).getTime()
  );

  const groupesParMois = new Map();

  gratitudesTriees.forEach((gratitude) => {
    const date = new Date(gratitude.dateCreation);
    const mois = date.getMonth();

    if (!groupesParMois.has(mois)) {
      groupesParMois.set(mois, []);
    }

    groupesParMois.get(mois).push(gratitude);
  });

  const contenu = [...groupesParMois.entries()]
    .map(([numeroMois, entrees]) => {
      const nomMois = new Intl.DateTimeFormat("fr-FR", {
        month: "long",
      }).format(new Date(annee, numeroMois, 1));

      const titreMois =
        nomMois.charAt(0).toUpperCase() + nomMois.slice(1);

      const cartes = entrees
        .map(
          (gratitude) => `
            <article class="gratitude">
              <div class="date">
                ${echapperHtml(formaterDate(gratitude.dateCreation))}
              </div>

              <div class="texte">
                ${echapperHtml(gratitude.texte).replace(/\n/g, "<br>")}
              </div>
            </article>
          `
        )
        .join("");

      return `
        <section class="mois">
          <h2>${echapperHtml(titreMois)}</h2>
          ${cartes}
        </section>
      `;
    })
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="UTF-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <title>Mon année en gratitudes - ${annee}</title>

        <style>
          @page {
            size: A4;
            margin: 18mm;
          }

          * {
            box-sizing: border-box;
          }

          body {
            font-family: Arial, Helvetica, sans-serif;
            color: #4F4F4F;
            font-size: 12pt;
            line-height: 1.6;
            margin: 0;
            background: #FFFFFF;
          }

          .couverture {
            min-height: 245mm;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            page-break-after: always;
            padding: 15mm;
            border: 2px solid #E9D7DC;
            background: #FBF6EF;
          }

          .coeur {
            color: #D29B4A;
            font-size: 42pt;
            margin-bottom: 20px;
          }

          .petit-titre {
            color: #8A9F84;
            text-transform: uppercase;
            letter-spacing: 3px;
            font-size: 10pt;
            font-weight: bold;
          }

          h1 {
            font-size: 30pt;
            line-height: 1.2;
            color: #596B57;
            margin: 20px 0;
          }

          .annee {
            font-size: 42pt;
            font-weight: bold;
            color: #D29B4A;
            margin: 15px 0;
          }

          .description {
            font-size: 13pt;
            color: #777777;
            max-width: 350px;
          }

          .signature {
            color: #8A9F84;
            font-style: italic;
            margin-top: 55px;
          }

          h2 {
            color: #596B57;
            font-size: 19pt;
            border-bottom: 2px solid #E9D7DC;
            padding-bottom: 7px;
            margin-top: 25px;
            margin-bottom: 10px;
            page-break-after: avoid;
          }

          .gratitude {
            padding: 13px 15px;
            margin: 12px 0;
            background: #FBF8F3;
            border-left: 4px solid #DFA8A8;
            border-radius: 5px;
            page-break-inside: avoid;
          }

          .date {
            font-size: 9pt;
            color: #8A9F84;
            font-weight: bold;
            margin-bottom: 5px;
          }

          .texte {
            font-size: 12pt;
            overflow-wrap: break-word;
            white-space: pre-wrap;
          }

          .mois {
            page-break-inside: auto;
          }

          .fin {
            text-align: center;
            margin-top: 35px;
            padding: 20px;
            border-top: 1px solid #E9D7DC;
            color: #777777;
            font-style: italic;
            page-break-inside: avoid;
          }
        </style>
      </head>

      <body>
        <div class="couverture">
          <div class="coeur">♡</div>

          <div class="petit-titre">
            Mes souvenirs précieux
          </div>

          <h1>Mon année<br />en gratitudes</h1>

          <div class="annee">${annee}</div>

          <p class="description">
            Un recueil de petits bonheurs, de belles rencontres
            et de moments que je souhaite garder dans mon cœur.
          </p>

          <div class="signature">
            Avec douceur, Fifi 🐾
          </div>
        </div>

        <main>
          ${contenu}

          <div class="fin">
            « N'oublie pas tous les petits bonheurs qui ont
            rendu cette année unique. »<br /><br />
            Avec tendresse, Fifi 🐱
          </div>
        </main>
      </body>
    </html>
  `;
}

// =======================================
// ÉCRAN GRATITUDE
// =======================================

export default function Gratitude() {
  const navigation = useNavigation();

  const [texte, setTexte] = useState("");
  const [exportEnCours, setExportEnCours] = useState(false);

  const anneeActuelle = new Date().getFullYear();
  const [anneeSelectionnee, setAnneeSelectionnee] =
    useState(anneeActuelle);

  const {
    gratitudes,
    ajouterGratitude,
    supprimerGratitude,
    basculerFavori,
  } = useBienEtre();

  // Années disponibles, de l'année actuelle
  // jusqu'à la plus ancienne gratitude conservée.
  const anneesDisponibles = useMemo(() => {
    const anneesEnregistrees = gratitudes
      .map((item) => new Date(item.dateCreation).getFullYear())
      .filter(
        (annee) =>
          Number.isInteger(annee) &&
          annee >= 1900 &&
          annee <= anneeActuelle
      );

    const plusAncienne = anneesEnregistrees.length
      ? Math.min(...anneesEnregistrees)
      : anneeActuelle;

    return Array.from(
      { length: anneeActuelle - plusAncienne + 1 },
      (_, index) => anneeActuelle - index
    );
  }, [gratitudes, anneeActuelle]);

  const gratitudesDeLAnnee = useMemo(
    () =>
      gratitudes.filter((gratitude) => {
        const date = new Date(gratitude.dateCreation);

        return (
          !Number.isNaN(date.getTime()) &&
          date.getFullYear() === anneeSelectionnee
        );
      }),
    [gratitudes, anneeSelectionnee]
  );

  function enregistrerGratitude() {
    const textePropre = texte.trim();

    if (!textePropre) {
      return;
    }

    ajouterGratitude(textePropre);
    setTexte("");
  }

  function changerAnnee(direction) {
    const index = anneesDisponibles.indexOf(anneeSelectionnee);
    const nouvelIndex = index + direction;

    if (
      nouvelIndex >= 0 &&
      nouvelIndex < anneesDisponibles.length
    ) {
      setAnneeSelectionnee(anneesDisponibles[nouvelIndex]);
    }
  }

  async function exporterRecueil() {
    if (gratitudesDeLAnnee.length === 0) {
      Alert.alert(
        "Aucune gratitude",
        `Tu n'as pas encore de gratitude enregistrée en ${anneeSelectionnee}.`
      );
      return;
    }

    setExportEnCours(true);

    try {
      const html = genererHtmlRecueil(
        anneeSelectionnee,
        gratitudesDeLAnnee
      );

      const fichier = await Print.printToFileAsync({
        html,
        base64: false,
        margins: {
          top: 18,
          bottom: 18,
          left: 18,
          right: 18,
        },
      });

      const partageDisponible = await Sharing.isAvailableAsync();

      if (!partageDisponible) {
        Alert.alert(
          "PDF créé",
          "Le recueil a été généré, mais le partage n'est pas disponible sur cet appareil."
        );
        return;
      }

      await Sharing.shareAsync(fichier.uri, {
        mimeType: "application/pdf",
        dialogTitle: `Mon année en gratitudes ${anneeSelectionnee}`,
        UTI: "com.adobe.pdf",
      });
    } catch (erreur) {
      console.error("Erreur lors de la création du recueil :", erreur);

      Alert.alert(
        "Impossible de créer le PDF",
        "Une erreur est survenue pendant la création du recueil. Réessaie dans un instant."
      );
    } finally {
      setExportEnCours(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.boutonRetour}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={28}
          color={Colors.text}
        />
      </TouchableOpacity>

      <FlatList
        data={gratitudes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.liste}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <Text style={styles.titre}>
              Mes gratitudes
            </Text>

            <Text style={styles.sousTitre}>
              Les petits bonheurs méritent aussi leur place.
            </Text>

            <View style={styles.formulaire}>
              <Text style={styles.question}>
                Aujourd'hui, je suis reconnaissante pour…
              </Text>

              <TextInput
                style={styles.champTexte}
                value={texte}
                onChangeText={setTexte}
                placeholder="Un moment, une personne, une petite joie..."
                placeholderTextColor={Colors.subtitle}
                multiline
                textAlignVertical="top"
                maxLength={2000}
              />

              <TouchableOpacity
                style={[
                  styles.boutonEnregistrer,
                  !texte.trim() && styles.boutonDesactive,
                ]}
                onPress={enregistrerGratitude}
                disabled={!texte.trim()}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name="heart-outline"
                  size={21}
                  color={Colors.white}
                />

                <Text style={styles.texteBouton}>
                  Enregistrer ma gratitude
                </Text>
              </TouchableOpacity>
            </View>

            {/* ================================= */}
            {/* RECCUEIL PDF */}
            {/* ================================= */}

            <View style={styles.carteExport}>
              <View style={styles.enteteExport}>
                <View style={styles.iconeExport}>
                  <MaterialCommunityIcons
                    name="book-open-page-variant-outline"
                    size={25}
                    color="#B58A5A"
                  />
                </View>

                <View style={styles.texteExport}>
                  <Text style={styles.titreExport}>
                    Mon recueil de gratitudes
                  </Text>

                  <Text style={styles.descriptionExport}>
                    Garde une trace de tes petits bonheurs.
                  </Text>
                </View>
              </View>

              <View style={styles.selecteurAnnee}>
                <TouchableOpacity
                  onPress={() => changerAnnee(1)}
                  disabled={
                    anneesDisponibles.indexOf(anneeSelectionnee) ===
                    anneesDisponibles.length - 1
                  }
                  style={styles.boutonAnnee}
                  accessibilityLabel="Année précédente"
                >
                  <MaterialCommunityIcons
                    name="chevron-left"
                    size={27}
                    color={Colors.text}
                  />
                </TouchableOpacity>

                <Text style={styles.annee}>
                  {anneeSelectionnee}
                </Text>

                <TouchableOpacity
                  onPress={() => changerAnnee(-1)}
                  disabled={anneeSelectionnee === anneeActuelle}
                  style={styles.boutonAnnee}
                  accessibilityLabel="Année suivante"
                >
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={27}
                    color={Colors.text}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.compteur}>
                {gratitudesDeLAnnee.length}{" "}
                {gratitudesDeLAnnee.length > 1
                  ? "gratitudes enregistrées"
                  : "gratitude enregistrée"}
              </Text>

              <TouchableOpacity
                style={[
                  styles.boutonPdf,
                  (gratitudesDeLAnnee.length === 0 ||
                    exportEnCours) &&
                    styles.boutonDesactive,
                ]}
                onPress={exporterRecueil}
                disabled={
                  gratitudesDeLAnnee.length === 0 ||
                  exportEnCours
                }
                activeOpacity={0.8}
              >
                {exportEnCours ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <MaterialCommunityIcons
                    name="file-pdf-box"
                    size={23}
                    color={Colors.white}
                  />
                )}

                <Text style={styles.texteBouton}>
                  {exportEnCours
                    ? "Création du PDF..."
                    : "Créer mon recueil PDF"}
                </Text>
              </TouchableOpacity>

              <Text style={styles.noteExport}>
                Tes gratitudes resteront dans l'application.
              </Text>
            </View>

            <Text style={styles.titreListe}>
              Mes petits bonheurs conservés
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.vide}>
            Aucune gratitude pour le moment. 🌸
            {"\n\n"}
            Tu peux commencer par un tout petit bonheur.
          </Text>
        }
        renderItem={({ item }) => (
          <CarteGratitude
            gratitude={item}
            onFavori={() => basculerFavori(item.id)}
            onSupprimer={() => supprimerGratitude(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

// =======================================
// STYLES
// =======================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },

  boutonRetour: {
    alignSelf: "flex-start",
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },

  liste: {
    paddingBottom: Spacing.xl,
    flexGrow: 1,
  },

  titre: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.xs,
  },

  sousTitre: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.subtitle,
    marginBottom: Spacing.lg,
  },

  formulaire: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  question: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  champTexte: {
    minHeight: 120,
    maxHeight: 220,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    padding: Spacing.md,
    fontSize: 16,
    lineHeight: 23,
    color: Colors.text,
    backgroundColor: Colors.background,
  },

  boutonEnregistrer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.md,
  },

  boutonDesactive: {
    opacity: 0.5,
  },

  texteBouton: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.white,
  },

  carteExport: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  enteteExport: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },

  iconeExport: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8EDE2",
  },

  texteExport: {
    flex: 1,
  },

  titreExport: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
  },

  descriptionExport: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.subtitle,
    marginTop: 3,
  },

  selecteurAnnee: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.lg,
    marginTop: Spacing.md,
  },

  boutonAnnee: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },

  annee: {
    minWidth: 75,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "700",
    color: Colors.text,
  },

  compteur: {
    fontSize: 13,
    textAlign: "center",
    color: Colors.subtitle,
    marginBottom: Spacing.md,
  },

  boutonPdf: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: "#8A9F84",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
  },

  noteExport: {
    color: Colors.subtitle,
    fontSize: 12,
    textAlign: "center",
    marginTop: Spacing.sm,
  },

  titreListe: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  vide: {
    textAlign: "center",
    color: Colors.subtitle,
    fontSize: 15,
    lineHeight: 23,
    paddingVertical: Spacing.lg,
  },
});