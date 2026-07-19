// =======================================
// EXTRAIRE UNE HEURE
// =======================================

function extraireHeure(texte) {

  const resultat = texte.match(/([01]?\d|2[0-3])[h:]([0-5]\d)/i);

  if (!resultat) {
    return null;
  }

  return resultat[0]
    .replace("h", ":")
    .replace("H", ":");

}

// =======================================
// EXTRAIRE UNE DATE
// =======================================

function extraireDate(texte) {

  const contenu = texte.toLowerCase();

  const aujourdHui = new Date();

  // -------------------------
  // Aujourd'hui
  // -------------------------

  if (contenu.includes("aujourd")) {
    return aujourdHui.toISOString().split("T")[0];
  }

  // -------------------------
  // Après-demain
  // -------------------------

  if (
    contenu.includes("après-demain") ||
    contenu.includes("apres-demain")
  ) {

    const date = new Date(aujourdHui);
    date.setDate(date.getDate() + 2);

    return date.toISOString().split("T")[0];

  }

  // -------------------------
  // Demain
  // -------------------------

  if (contenu.includes("demain")) {

    const date = new Date(aujourdHui);
    date.setDate(date.getDate() + 1);

    return date.toISOString().split("T")[0];

  }

  // -------------------------
  // 22/07
  // 22-07
  // 22/07/2026
  // 22-07-2026
  // -------------------------

  let resultat = contenu.match(
    /(\d{1,2})[\/-](\d{1,2})(?:[\/-](\d{4}))?/
  );

  if (resultat) {

    const jour = resultat[1].padStart(2, "0");
    const mois = resultat[2].padStart(2, "0");
    const annee = resultat[3] || aujourdHui.getFullYear();

    return `${annee}-${mois}-${jour}`;

  }

  // -------------------------
  // 22 juillet
  // 22 juillet 2026
  // -------------------------

  const mois = {

    janvier: "01",
    février: "02",
    fevrier: "02",
    mars: "03",
    avril: "04",
    mai: "05",
    juin: "06",
    juillet: "07",
    août: "08",
    aout: "08",
    septembre: "09",
    octobre: "10",
    novembre: "11",
    décembre: "12",
    decembre: "12",

  };

  resultat = contenu.match(
    /(\d{1,2})\s+(janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|decembre)(?:\s+(\d{4}))?/i
  );

  if (resultat) {

    const jour = resultat[1].padStart(2, "0");
    const moisISO = mois[resultat[2].toLowerCase()];
    const annee = resultat[3] || aujourdHui.getFullYear();

    return `${annee}-${moisISO}-${jour}`;

  }

  return null;

}

// =======================================
// EXTRAIRE UN MONTANT
// =======================================

function extraireMontant() {
  return null;
}

// =======================================
// EXTRAIRE UNE PERSONNE
// =======================================

function extrairePersonne() {
  return null;
}

// =======================================
// EXTRAIRE UN LIEU
// =======================================

function extraireLieu() {
  return null;
}

// =======================================
// EXTRAIRE UN TÉLÉPHONE
// =======================================

function extraireTelephone() {
  return null;
}

// =======================================
// EXTRAIRE UN EMAIL
// =======================================

function extraireEmail() {
  return null;
}

// =======================================
// EXTRAIRE UNE URL
// =======================================

function extraireUrl() {
  return null;
}

// =======================================
// EXTRAIRE TOUTES LES INFORMATIONS
// =======================================

export function extraireInformations(texte) {

  return {

    texteOriginal: texte,

    date: extraireDate(texte),

    heure: extraireHeure(texte),

    montant: extraireMontant(texte),

    personne: extrairePersonne(texte),

    lieu: extraireLieu(texte),

    telephone: extraireTelephone(texte),

    email: extraireEmail(texte),

    url: extraireUrl(texte),

    motsCles: [],

    confiance: 1,

  };

}