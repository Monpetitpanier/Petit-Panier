import { extraireInformations } from "./extraireInformations";


// =======================================
// MOTS-CLÉS AGENDA
// =======================================

const motsAgenda = [
  "rdv",
  "rendez-vous",
  "rendez vous",
  "consultation",
  "visite",
  "contrôle technique",
  "doctolib",
  "médecin",
  "dentiste",
  "orl",
  "kiné",
  "ostéo",
  "ophtalmo",
  "gynécologue",
  "sage-femme",
  "pédiatre",
  "vaccin",
  "radio",
  "scanner",
  "pneumologue",
  "psychologue",
  "vétérinaire",
  "garage",
  "irm",
  "prise de sang",
  "école",
  "écho",
  "psychiatre",
  "mairie",
  "église",
  "diacre",
  "mosquée",
  "synagogue",
  "chapelle",
  "temple",
  "france services",
  "centre des impôts",
  "préfecture",
  "sous-préfecture",
  "caf",
  "cpam",
  "france travail",
  "banque",
  "urssaf",
  "notaire",
  "avocat",
  "huissier",
  "expert-comptable",
  "oph",
  "tribunal",
  "justice",
  "spip",
  "gendarmerie",
  "police",
  "pompiers",
  "maison de retraite",
  "entreprise",
  "piscine",
  "bibliothèque",
  "musée",
  "théâtre",
  "codecom",
  "ccas",
  "centre social",
  "restaurant",
  "cinéma",
  "salle de sport",
  "entretien d'embauche",
  "réparateur",
  "entraînement",
  "podologue",
];


// =======================================
// DÉTERMINER LE TITRE
// =======================================

function determinerTitre(texte) {

  const contenu = texte.toLowerCase();

  let titre = "Rendez-vous";

  if (contenu.includes("orl"))
    titre = "ORL";

  else if (contenu.includes("dentiste"))
    titre = "Dentiste";

  else if (contenu.includes("médecin"))
    titre = "Médecin";

  else if (contenu.includes("kiné"))
    titre = "Kiné";

  else if (contenu.includes("ophtalmo"))
    titre = "Ophtalmologue";

  else if (contenu.includes("ostéo"))
    titre = "Ostéopathe";

  else if (contenu.includes("gynécologue"))
    titre = "Gynécologue";

  else if (contenu.includes("sage-femme"))
    titre = "Sage-femme";

  else if (contenu.includes("pédiatre"))
    titre = "Pédiatre";

  else if (contenu.includes("pneumologue"))
    titre = "Pneumologue";

  else if (contenu.includes("psychologue"))
    titre = "Psychologue";

  else if (contenu.includes("vétérinaire"))
    titre = "Vétérinaire";

  else if (contenu.includes("garage"))
    titre = "Garage";

  else if (contenu.includes("école"))
    titre = "École";

  else if (
    contenu.includes("écho") ||
    contenu.includes("echo")
  )
    titre = "Échographie";

  else if (contenu.includes("psychiatre"))
    titre = "Psychiatre";

  else if (contenu.includes("maison de retraite"))
    titre = "Maison de retraite";

  else if (contenu.includes("entreprise"))
    titre = "Entreprise";

  else if (contenu.includes("piscine"))
    titre = "Piscine";

  else if (contenu.includes("bibliothèque"))
    titre = "Bibliothèque";

  else if (contenu.includes("musée"))
    titre = "Musée";

  else if (contenu.includes("théâtre"))
    titre = "Théâtre";

  else if (contenu.includes("codecom"))
    titre = "CODECOM";

  else if (contenu.includes("ccas"))
    titre = "CCAS";

  else if (contenu.includes("centre social"))
    titre = "Centre social";

  else if (contenu.includes("restaurant"))
    titre = "Restaurant";

  else if (contenu.includes("cinéma"))
    titre = "Cinéma";

  else if (contenu.includes("salle de sport"))
    titre = "Salle de sport";

  else if (contenu.includes("entretien d'embauche"))
    titre = "Entretien d'embauche";

  else if (contenu.includes("réparateur"))
    titre = "Réparateur";

  else if (contenu.includes("entraînement"))
    titre = "Entraînement";

  else if (contenu.includes("caf"))
    titre = "CAF";

  else if (contenu.includes("cpam"))
    titre = "CPAM";

  else if (contenu.includes("france travail"))
    titre = "France Travail";

  else if (contenu.includes("banque"))
    titre = "banque";

  else if (contenu.includes("urssaf"))
    titre = "URSSAF";

  else if (contenu.includes("notaire"))
    titre = "notaire";

  else if (contenu.includes("avocat"))
    titre = "avocat";

  else if (contenu.includes("huissier"))
    titre = "huissier";

  else if (contenu.includes("expert-comptable"))
    titre = "expert-comptable";

  else if (contenu.includes("oph"))
    titre = "OPH";

  else if (contenu.includes("tribunal"))
    titre = "Tribunal";

  else if (contenu.includes("justice"))
    titre = "Justice";

  else if (contenu.includes("spip"))
    titre = " SPIP";

  else if (contenu.includes("gendarmerie"))
    titre = "gendarmerie";

  else if (contenu.includes("police"))
    titre = "police";

  else if (contenu.includes("pompiers"))
    titre = "pompiers";

  else if (contenu.includes("mairie"))
    titre = "mairie";

  else if (contenu.includes("préfecture"))
    titre = "préfecture";

  else if (contenu.includes("sous-préfecture"))
    titre = "sous-préfecture";

  else if (contenu.includes("église"))
    titre = "église";

  else if (contenu.includes("diacre"))
    titre = "diacre";

  else if (contenu.includes("mosquée"))
    titre = "mosquée";

  else if (contenu.includes("synagogue"))
    titre = "synagogue";

  else if (contenu.includes("chapelle"))
    titre = "chapelle";

  else if (contenu.includes("temple"))
    titre = "temple";

  else if (contenu.includes("france services"))
    titre = "France Services";

  else if (contenu.includes("centre des impôts") ||
    contenu.includes("impots"))
    titre = "centre des impôts";

  else if (contenu.includes("contrôle technique"))
    titre = "contrôle technique";

  else if (contenu.includes("vaccin"))
    titre = "vaccin";

  else if (contenu.includes("radio"))
    titre = "radio";

  else if (contenu.includes("scanner"))
    titre = "Scanner";
  else if (contenu.includes("irm"))
    titre = "IRM";

  else if (contenu.includes("prise de sang"))
    titre = "Prise de sang";
  else if (contenu.includes("podologue"))
    titre = "Podologue";


  return titre;
}


// =======================================
// DÉCOUPER LES DIFFÉRENTS RENDEZ-VOUS
// =======================================

function decouperRendezVous(texte) {

  const contenu = texte.trim();

  /*
   * On coupe sur :
   *
   * - " et rdv "
   * - " et rendez-vous "
   * - " et rendez vous "
   *
   * Chaque rendez-vous est ainsi analysé
   * indépendamment.
   */

  const morceaux = contenu.split(
    /\s+et\s+(?=(?:rdv|rendez[- ]vous)\b)/i
  );

  return morceaux
    .map((morceau) => morceau.trim())
    .filter(Boolean);
}


// =======================================
// ANALYSER UN RENDEZ-VOUS
// =======================================

function analyserUnRendezVous(texte) {

  const informations =
    extraireInformations(texte);

  return {

    titre: determinerTitre(texte),

    date: informations.date,

    heure: informations.heure,

    categorie: "rendez-vous",

    confiance: informations.confiance,

  };
}


// =======================================
// ANALYSER L'AGENDA
// =======================================

export function analyserAgenda(texte) {

  const contenu =
    texte.toLowerCase();


  // ---------------------------------------
  // Vérifier si le texte concerne l'agenda
  // ---------------------------------------

  const estRendezVous =
    motsAgenda.some((mot) =>
      contenu.includes(mot)
    );


  if (!estRendezVous) {
    return null;
  }


  // ---------------------------------------
  // Découper les rendez-vous
  // ---------------------------------------

  const morceaux =
    decouperRendezVous(texte);


  // ---------------------------------------
  // Analyser chaque morceau
  // ---------------------------------------

  const rendezVous =
    morceaux
      .map((morceau) =>
        analyserUnRendezVous(morceau)
      )
      .filter((rdv) =>
        rdv.date !== null
      );


  // ---------------------------------------
  // Aucun rendez-vous valide
  // ---------------------------------------

  if (rendezVous.length === 0) {

    return {

      destination: "agenda",

      categorie: "rendez-vous",

      rendezVous: [],

      confiance: 0,

    };
  }


  // ---------------------------------------
  // Un seul rendez-vous
  // ---------------------------------------

  if (rendezVous.length === 1) {

    return {

      destination: "agenda",

      categorie: "rendez-vous",

      titre:
        rendezVous[0].titre,

      date:
        rendezVous[0].date,

      heure:
        rendezVous[0].heure,

      confiance:
        rendezVous[0].confiance,

    };
  }


  // ---------------------------------------
  // Plusieurs rendez-vous
  // ---------------------------------------

  return {

    destination: "agenda",

    categorie: "rendez-vous",

    rendezVous,

    confiance: Math.min(
      ...rendezVous.map(
        (rdv) => rdv.confiance
      )
    ),

  };
}