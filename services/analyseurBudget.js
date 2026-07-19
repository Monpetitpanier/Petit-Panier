export function analyserBudget(texte) {

  const contenu = texte.toLowerCase();

  const motsBudget = [
    "€",
    "euro",
    "euros",
    "payer",
    "paiement",
    "facture",
    "courses",
    "essence",
    "carburant",
    "edf",
    "eau",
    "gaz",
    "amazon",
    "action",
    "virement",
    "cb",
    "carte bancaire",
    "remboursement",
    "achat",
    "acheté",
    "dépense",
    "prix",
    "coût"
  ];

  const estBudget = motsBudget.some(mot =>
    contenu.includes(mot)
  );

  if (!estBudget) {
    return null;
  }

  return {
    destination: "budget",
    categorie: "depense",
    confiance: 90
  };

}