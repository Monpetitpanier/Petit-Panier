// utils/rayonCourses.ts

import { CategorieRayon } from '../types/maison';

// Un mot-clé est reconnu seulement s'il n'est pas précédé d'une lettre,
// pour limiter les faux positifs (même logique que analyseurMaison.js).
function contientMotCle(contenu: string, mots: string[]): boolean {
  return mots.some((mot) => {
    const motEchappe = mot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zàâäéèêëïîôöùûüç])${motEchappe}`, 'i');
    return regex.test(contenu);
  });
}

const MOTS_CLES_RAYON: { rayon: CategorieRayon; mots: string[] }[] = [
  {
    rayon: 'bebe',
    mots: ['couche', 'couches', 'lingette', 'lingettes', 'biberons', 'biberon', 'petit pot', 'petits pots', 'lait infantile', 'compote bébé', 'compotes bébé'],
  },
  {
    rayon: 'entretien',
    mots: ['lessive', 'liquide vaisselle', 'éponge', 'eponge', 'papier toilette', 'essuie-tout', 'essuie tout', 'javel', 'nettoyant', 'sac poubelle', 'sacs poubelle'],
  },
  {
    rayon: 'epices',
    mots: ['sel', 'poivre', 'épice', 'epice', 'curry', 'paprika', 'herbes', 'persil', 'basilic', 'cannelle', 'vinaigre'],
  },
  {
    rayon: 'conserves',
    mots: ['conserve', 'conserves', 'boîte de', 'boite de', 'thon', 'maïs', 'mais', 'petits pois', 'haricots verts', 'compote'],
  },
  {
    rayon: 'frais',
    mots: ['lait', 'yaourt', 'yaourts', 'fromage', 'beurre', 'crème', 'creme', 'œuf', 'oeuf', 'oeufs', 'jambon', 'viande', 'poulet', 'steak', 'saumon', 'poisson', 'charcuterie'],
  },
  {
    rayon: 'fruits',
    mots: ['pomme', 'pommes', 'banane', 'bananes', 'orange', 'oranges', 'fraise', 'fraises', 'raisin', 'poire', 'poires', 'kiwi', 'citron', 'pêche', 'peche', 'avocat'],
  },
  {
    rayon: 'legumes',
    mots: ['carotte', 'carottes', 'courgette', 'tomate', 'tomates', 'salade', 'oignon', 'oignons', 'pomme de terre', 'patate', 'poireau', 'brocoli', 'concombre'],
  },
  {
    rayon: 'epicerie',
    mots: ['pâtes', 'pates', 'riz', 'farine', 'sucre', 'huile', 'café', 'cafe', 'thé', 'the', 'biscuit', 'biscuits', 'chocolat', 'céréales', 'cereales', 'pain'],
  },
];

// Rayon par défaut si aucun mot-clé ne correspond
const RAYON_PAR_DEFAUT: CategorieRayon = 'epicerie';

export function devinerRayon(texte: string): CategorieRayon {
  const contenu = texte.toLowerCase();

  for (const { rayon, mots } of MOTS_CLES_RAYON) {
    if (contientMotCle(contenu, mots)) {
      return rayon;
    }
  }

  return RAYON_PAR_DEFAUT;
}