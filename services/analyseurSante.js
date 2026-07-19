export function analyserSante(texte) {

  const contenu = texte.toLowerCase();

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
    "fiv"
  ];

  const estSante = motsSante.some(mot =>
    contenu.includes(mot)
  );

  if (!estSante) {
    return null;
  }

  return {
    destination: "sante",
    categorie: "sante",
    confiance: 85
  };

}