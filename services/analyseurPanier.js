import { analyserAgenda } from "./analyseurAgenda";
import { analyserBudget } from "./analyseurBudget";
import { analyserSante } from "./analyseurSante";
import { analyserUnivers } from "./analyseurUnivers";
import { analyserMaison } from "./analyseurMaison";
import { analyserRecapSortie } from "./analyseurRecapSortie";

export function analyserPensee(texte) {

  // Vérifié en premier : une phrase comme "je sors" est une commande,
  // pas une note à ranger dans une catégorie.
  let resultat = analyserRecapSortie(texte);
  if (resultat) return resultat;

  resultat = analyserAgenda(texte);
  if (resultat) return resultat;

  resultat = analyserBudget(texte);
  if (resultat) return resultat;

  resultat = analyserSante(texte);
  if (resultat) return resultat;

  resultat = analyserUnivers(texte);
  if (resultat) return resultat;

  resultat = analyserMaison(texte);
  if (resultat) return resultat;

  return {
    destination: "panier",
    categorie: "libre",
    confiance: 0,
  };
}