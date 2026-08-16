// services/analyseurRecapSortie.js

const PHRASES_RECAP = [
  "je sors",
  "je pars",
  "je m'en vais",
  "je men vais",
  "qu'est-ce qu'il y a en attente",
  "qu est ce qu il y a en attente",
  "qu'y a-t-il en attente",
  "quoi en attente",
  "récap sortie",
  "recap sortie",
  "récap avant de sortir",
];

export function analyserRecapSortie(texte) {
  const contenu = texte.toLowerCase().trim();

  const estDeclencheur = PHRASES_RECAP.some((phrase) =>
    contenu.includes(phrase)
  );

  if (!estDeclencheur) {
    return null;
  }

  return {
    destination: "recapSortie",
    confiance: 90,
  };
}