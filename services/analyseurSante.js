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
    "medicament",
    "vitamine",
    "analyse",
    "traitement",
    "symptôme",
    "blessure",
    "grossesse",
    "bébé",
    "fertilité",
    "fiv",
    "pansement",
    "compresses",
    "compresse",
    "désinfectant",
    "desinfectant",
  ];

  const estSante = motsSante.some((mot) =>
    contenu.includes(mot)
  );

  // =======================================
  // LISTE DES MÉDICAMENTS
  // =======================================

  const motsMedicaments = [
    "doliprane",
    "dafalgan",
    "efferalgan",
    "advil",
    "nurofen",
    "ibuprofène",
    "ibuprofene",
    "aspirine",
    "spasfon",
    "smecta",
    "imodium",
    "vogalene",
    "gaviscon",
    "maalox",
    "forlax",
    "microlax",
    "lactulose",
    "tiorfan",
    "carbocisteine",
    "mucomyst",
    "hextril",
    "strepsils",
    "lysopaïne",
    "lysopaine",
    "maxilase",
    "actifed",
    "dolirhume",
    "humex",
    "cetirizine",
    "cétirizine",
    "aerius",
    "clarityne",
    "zyrtec",
    "loxens",
    "izalgy",
    "lumirelax",
    "polysilane",
    "amoxiciline",
    "bysoprolol",
    "ventolyne",
    "stresam",
    "tramadol",
    "spedifen",
    "ritaline",
    "spifen",
    "xanax",
    "oxomemazine",
    "helicidine",
    "duphaston",
    "clomid",
    "letrozole",
    "orgalutran",
    "progiron",
    "provames",
    "ovitrelle",
    "gonal",
    "menopur",
    "fostimon",
    "puregon",
    "decapeptyl",
    "cetrotide",
    "celesten",
    "ixprim",
    "codeine",
    "dalfeine",
    "niflugel",
    "apranax",
    "antadys",
    "antaren",
    "solupred",
    "atepadene",
    "anxemil",
    "depakine",
    "paroxetine",
    "prozac",
    "levothyrox",
    "fluoxetine",
    "seroplex",
    "zoloft",
    "citalopram",
    "diazepam",
    "adderall",
    "atomoxetin",
  ];

  // =======================================
  // RECHERCHE D'UN MÉDICAMENT DANS LA LISTE
  // =======================================

  const medicamentTrouve = motsMedicaments.find((mot) =>
    contenu.includes(mot)
  );

  // Si un médicament connu est trouvé,
  // on considère automatiquement le message comme lié à la santé.
  const estVraimentSante =
    estSante || !!medicamentTrouve;

  if (!estVraimentSante) {
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

  // Si aucun nom n'a été trouvé mais qu'un médicament
  // connu est présent dans la phrase, on l'utilise.
  if (!nomTraitement && medicamentTrouve) {
    nomTraitement = medicamentTrouve;
  }

  // =======================================
  // EXTRACTION DES UNITÉS PAR JOUR
  // =======================================

  const parJourMatch = contenu.match(
    /(\d+)\s*(comprimés|comprimes|comprimé|comprime|cachets|cachet|gélules|gelules|unité|unites|unités)?\s*par\s*jour/
  );

  const unitesParJour = parJourMatch
    ? Number(parJourMatch[1])
    : null;

  // =======================================
  // EXTRACTION DU STOCK
  // =======================================

  // Cherche en priorité :
  // "une boîte de 30 cachets"
  // ou "boîte de 30 comprimés"

  const stockBoiteMatch = contenu.match(
    /bo[iî]te\s+(?:de\s+)?(\d+)\s*(comprimés|comprimes|comprimé|comprime|cachets|cachet|gélules|gelules|unités|unites)/
  );

  // Sinon cherche simplement :
  // "30 cachets"

  const stockSimpleMatch = contenu.match(
    /(\d+)\s*(comprimés|comprimes|comprimé|comprime|cachets|cachet|gélules|gelules|unités|unites|boîtes|boites|boîte|boite)/
  );

  const stock = stockBoiteMatch
    ? Number(stockBoiteMatch[1])
    : stockSimpleMatch
      ? Number(stockSimpleMatch[1])
      : null;

  // =======================================
  // DÉTECTION D'UN MÉDICAMENT
  // =======================================

  const estMedicament =
    contenu.includes("médicament") ||
    contenu.includes("medicament") ||
    !!medicamentTrouve;

  // =======================================
  // EXTRACTION DU NOM DU MÉDICAMENT
  // =======================================

  let nomMedicament = null;

  const nomMedicamentMatch =
    contenu.match(
      /médicament\s+(?:de\s+)?([a-zA-ZÀ-ÿ0-9-]+)/
    ) ||
    contenu.match(
      /medicament\s+(?:de\s+)?([a-zA-ZÀ-ÿ0-9-]+)/
    ) ||
    contenu.match(
      /médicament\s*:\s*([a-zA-ZÀ-ÿ0-9-]+)/
    ) ||
    contenu.match(
      /medicament\s*:\s*([a-zA-ZÀ-ÿ0-9-]+)/
    );

  if (nomMedicamentMatch) {
    nomMedicament = nomMedicamentMatch[1];
  } else if (medicamentTrouve) {
    nomMedicament = medicamentTrouve;
  }

  // =======================================
  // EXTRACTION DE LA QUANTITÉ
  // =======================================

  const quantiteMatch = contenu.match(
    /(\d+)\s*(boîtes|boites|boîte|boite|flacons|flacon|tubes|tube)/
  );

  const quantite = quantiteMatch
    ? Number(quantiteMatch[1])
    : null;

  // =======================================
  // EXTRACTION DE LA DATE DE PÉREMPTION
  // =======================================

  const datePeremptionMatch = contenu.match(
    /(?:périme\s*(?:le)?|perime\s*(?:le)?|péremption\s*:?)\s*(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})/
  );

  let datePeremption = null;

  if (datePeremptionMatch) {
    const jour = datePeremptionMatch[1].padStart(2, "0");
    const mois = datePeremptionMatch[2].padStart(2, "0");
    const annee = datePeremptionMatch[3];

    datePeremption = `${annee}-${mois}-${jour}`;
  }

  // =======================================
  // DÉTECTION D'UN PRODUIT DE PHARMACIE
  // =======================================

  const motsPharmacie = [
    "pansement",
    "compresses",
    "compresse",
    "désinfectant",
    "desinfectant",
    "sparadrap",
    "bandage",
    "bande",
    "thermomètre",
    "thermometre",
    "sérum physiologique",
    "serum physiologique",
    "sérum phy",
    "antiseptique",
    "pommade",
    "arnica",
    "biafine",
    "osmosoft",
    "biseptine",
    "liniment",
    "mytosil",
    "apaisyl",
    "mustela",
    "arnigel",
    "dexeryl",
    "flector",
    "bepanthen",
    "oxyplastine",
    "vicks",
    "baume du tigre",
    "strips",
    "gants",
    "gel hydroalcolique",
    "préservatifs",
    "garot",
    "aspivenin",
  ];

  const estProduitPharmacie =
    contenu.includes("produit de pharmacie") ||
    contenu.includes("produit pharmacie") ||
    motsPharmacie.some((mot) =>
      contenu.includes(mot)
    );

  // =======================================
  // EXTRACTION DU NOM DU PRODUIT
  // =======================================

  let nomProduit = null;

  const nomProduitMatch = contenu.match(
    /(?:produit de pharmacie|produit pharmacie|pharmacie)\s*:\s*([a-zA-ZÀ-ÿ0-9 -]+)/
  );

  if (nomProduitMatch) {
    nomProduit = nomProduitMatch[1].trim();
  } else {
    const produitTrouve = motsPharmacie.find((mot) =>
      contenu.includes(mot)
    );

    if (produitTrouve) {
      nomProduit = produitTrouve;
    }
  }

  // =======================================
  // 1. PRODUIT DE PHARMACIE
  // =======================================

  if (estProduitPharmacie) {
    return {
      destination: "pharmacie",
      categorie: "sante",
      type: "nouveau_produit_pharmacie",

      nom: nomProduit,
      quantite,
      datePeremption,

      confiance:
        nomProduit &&
        quantite !== null &&
        datePeremption
          ? 95
          : 85,
    };
  }

  // =======================================
  // 2. TRAITEMENT
  // =======================================

  const estTraitement =
    contenu.includes("traitement") ||
    contenu.includes("je commence") ||
    contenu.includes("nouveau traitement") ||
    contenu.includes("je prends") ||
    contenu.includes("je prend");

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
        stock !== null &&
        unitesParJour !== null
          ? 95
          : 85,
    };
  }

  // =======================================
  // 3. MÉDICAMENT
  // =======================================

  if (estMedicament) {
    return {
      destination: "medicaments",
      categorie: "sante",
      type: "nouveau_medicament",

      nom: nomMedicament,
      quantite,
      datePeremption,

      confiance:
        nomMedicament &&
        quantite !== null &&
        datePeremption
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