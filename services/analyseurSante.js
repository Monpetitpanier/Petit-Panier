export function analyserSante(texte) {
  const contenu = texte.toLowerCase();

  // =======================================
  // VÉRIFICATION : EST-CE UN SUJET SANTÉ ?
  // =======================================

  const motsSante = [
    "malade",
    "fièvre",
    "fatigue",
    "douleur",
    "migraine",
    "psoriasis",
    "tension",
    "prise de sang",
    "ordonnance",
    "pharmacie",
    "médicament",
    "vitamine",
    "analyse",
    "traitement",
    "symptôme",
    "blessure",
    "grossesse",
    "bébé",
    "fertilité",
    "fiv",
  ];

  const estSante = motsSante.some((mot) =>
    contenu.includes(mot)
  );

  if (!estSante) {
    return null;
  }

  // =======================================
  // DÉTECTION D'UN RENOUVELLEMENT
  // =======================================

  const estRenouvellement =
    contenu.includes("renouvelé") ||
    contenu.includes("renouvele") ||
    contenu.includes("renouvellement");

  // =======================================
  // EXTRACTION DU NOM DU TRAITEMENT
  // =======================================

  let nomTraitement = null;

  const nomMatch =
    contenu.match(
      /traitement\s+(?:de\s+)?([a-zA-ZÀ-ÿ0-9-]+)/
    ) ||
    contenu.match(
      /traitement\s*:\s*([a-zA-ZÀ-ÿ0-9-]+)/
    );

  if (nomMatch) {
    nomTraitement = nomMatch[1];
  }

  // =======================================
  // EXTRACTION DU STOCK
  // =======================================

  const stockMatch = contenu.match(
    /(\d+)\s*(comprimés|comprime|cachets|cachet|gélules|gelules|unités|unites)/
  );

  const stock = stockMatch
    ? Number(stockMatch[1])
    : null;

  // =======================================
  // EXTRACTION DES UNITÉS PAR JOUR
  // =======================================

  const parJourMatch = contenu.match(
    /(\d+)\s*(comprimés|comprime|cachets|cachet|gélules|gelules|unités|unites)?\s*par\s*jour/
  );

  const unitesParJour = parJourMatch
    ? Number(parJourMatch[1])
    : null;

  // =======================================
  // DÉTECTION D'UN TRAITEMENT
  // =======================================

  const estTraitement =
    contenu.includes("traitement") ||
    contenu.includes("je commence") ||
    contenu.includes("nouveau traitement");

  if (estTraitement || estRenouvellement) {
    return {
      destination: "traitements",
      categorie: "sante",

      type: estRenouvellement
        ? "renouvellement"
        : "nouveau_traitement",

      nom: nomTraitement,
      stock,
      unitesParJour,

      confiance:
        nomTraitement &&
        stock &&
        unitesParJour
          ? 95
          : 85,
    };
  }

  // =======================================
  // SANTÉ GÉNÉRALE
  // =======================================

  return {
    destination: "sante",
    categorie: "sante",
    confiance: 85,
  };
}