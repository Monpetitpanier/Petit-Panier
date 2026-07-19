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
    "irm",
    "prise de sang",
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

  return {

    destination: "agenda",

    categorie: "rendez-vous",

    titre,

    date: informations.date,

    heure: informations.heure,

    confiance: informations.confiance,

  };

}