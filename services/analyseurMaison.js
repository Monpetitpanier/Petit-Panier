// services/analyseurMaison.js

// Un mot-clé est reconnu seulement s'il n'est pas précédé d'une lettre,
// pour éviter par exemple que "racheter" ne déclenche le mot-clé "acheter".
function contientMotCle(contenu, mots) {
  return mots.some((mot) => {
    const motEchappe = mot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(^|[^a-zàâäéèêëïîôöùûüç])${motEchappe}`, "i");
    return regex.test(contenu);
  });
}

// Ordre volontaire : du plus spécifique au plus général, pour que "courses"
// (très générique avec "acheter") ne rafle pas les notes qui appartiennent
// en fait à une catégorie plus précise.
const CATEGORIES_MOTS_CLES = [
  {
    categorie: "garanties",
    mots: ["garantie", "facture", "ticket de caisse", "sav"],
  },
  {
    categorie: "entretien",
    mots: [
      "entretien",
      "réparer",
      "reparer",
      "chaudière",
      "chaudiere",
      "révision",
      "revision",
      "plombier",
      "électricien",
      "electricien",
    ],
  },
  {
    categorie: "menage",
    mots: [
      "ménage",
      "menage",
      "nettoyer",
      "aspirateur",
      "lessive",
      "vaisselle",
      "poussière",
      "poussiere",
      "repasser",
    ],
  },
  {
    categorie: "produitsARacheter",
    mots: [
      "racheter",
      "recharger",
      "il ne reste plus",
      "stock bas",
      "à racheter",
      "presque vide",
      "presque fini",
    ],
  },
  {
    categorie: "todo",
    mots: [
      "prévoir",
      "prevoir",
      "réserver",
      "reserver",
      "penser à",
      "ne pas oublier",
      "reflechir",
      "réfléchir",
      "reflechir à",
      "réfléchir à",
      "réflechir aux",
      "réfléchir aux",
      "vacances",
      "voyage",
      "week-end",
      "weekend",
      "sortie",
      "activité",
      "activités",
      "noel",
      "noël",
      "anniversaire",
      "Noël",
      "cadeau",
      "cadeaux",
      "entretien",
      "réparation",
      "reparation",
      "élagage",
      "déménagement",
      
    ],
  },
  {
    categorie: "courses",
    mots: [
      "acheter",
      "course",
      "courses",
      "supermarché",
      "supermarche",
      "épicerie",
      "epicerie",
      "pain",
      "lait",
    ],
  },
];

export function analyserMaison(texte) {
  const contenu = texte.toLowerCase();

  for (const { categorie, mots } of CATEGORIES_MOTS_CLES) {
    if (contientMotCle(contenu, mots)) {
      return {
        destination: "maison",
        categorie,
        texte: texte.trim(),
        confiance: 80,
      };
    }
  }

  return null;
}