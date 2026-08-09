import { extraireInformations } from "./extraireInformations";

export function analyserAgenda(texte) {

  const contenu = texte.toLowerCase();

  const motsAgenda = [
    "rdv",
    "rendez-vous",
    "rendez vous",
    "consultation",
    "visite",
    "contrôle",
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
    "CAF",
    "CPAM",
    "Pôle emploi",
    "banque",
    "URSSAF",
    "notaire",
    "avocat",
    "huissier",
    "expert-comptable",
    "OPH",
    "tribunal",
    "justice",
    "SPIP",
    "gendarmerie",
    "police",
    "pompiers",
    "maison de retraite",
    "entreprise",
    "piscine",
    "bibliothèque",
    "musée",
    "théâtre",
    "CODECOM",
    "CCAS",
    "centre social",
    "restaurant",
    "cinéma",
    "salle de sport",
    "entretien d'embauche",

  ];

  const estRendezVous = motsAgenda.some((mot) =>
    contenu.includes(mot)
  );

  if (!estRendezVous) {
    return null;
  }

  // -------------------------
  // Extraction des informations
  // -------------------------

  const informations = extraireInformations(texte);

  // -------------------------
  // Titre
  // -------------------------

  let titre = "Rendez-vous";

  if (contenu.includes("orl")) titre = "ORL";
  else if (contenu.includes("dentiste")) titre = "Dentiste";
  else if (contenu.includes("médecin")) titre = "Médecin";
  else if (contenu.includes("kiné")) titre = "Kiné";
  else if (contenu.includes("ophtalmo")) titre = "Ophtalmologue";
  else if (contenu.includes("ostéo")) titre = "Ostéopathe";
  else if (contenu.includes("gynécologue")) titre = "Gynécologue";
  else if (contenu.includes("sage-femme")) titre = "Sage-femme";
  else if (contenu.includes("pédiatre")) titre = "Pédiatre";
  else if (contenu.includes("pneumologue"))titre = "Pneumologue";
  else if (contenu.includes("psychologue"))titre = "Psychologue";
  else if (contenu.includes("vétérinaire"))titre = "Vétérinaire";
  else if (contenu.includes("garage"))titre = "Garage";
  else if (contenu.includes("école"))titre = "École";
  else if (contenu.includes("écho"))titre = "Échographie";
  else if (contenu.includes("psychiatre"))titre = "Psychiatre";
  else if (contenu.includes("maison de retraite"))titre = "Maison de retraite";
  else if (contenu.includes("entreprise"))titre = "Entreprise";
  else if (contenu.includes("piscine"))titre = "Piscine";
  else if (contenu.includes("bibliothèque"))titre = "Bibliothèque";
  else if (contenu.includes("musée"))titre = "Musée";
  else if (contenu.includes("théâtre"))titre = "Théâtre";
  else if (contenu.includes("CODECOM"))titre = "CODECOM";
  else if (contenu.includes("CCAS"))titre = "CCAS";
  else if (contenu.includes("centre social"))titre = "Centre social";
  else if (contenu.includes("restaurant"))titre = "Restaurant";
  else if (contenu.includes("cinéma"))titre = "Cinéma";
  else if (contenu.includes("salle de sport"))titre = "Salle de sport";
  else if (contenu.includes("entretien d'embauche"))titre = "Entretien d'embauche";

  return {

    destination: "agenda",

    categorie: "rendez-vous",

    titre,

    date: informations.date,

    heure: informations.heure,

    confiance: informations.confiance,

  };

}