import { analyserAgenda } from "./analyseurAgenda";
import { analyserBudget } from "./analyseurBudget";
import { analyserSante } from "./analyseurSante";
import { analyserUnivers } from "./analyseurUnivers";
import { analyserMaison } from "./analyseurMaison";

export function analyserPensee(texte) {

  let resultat = analyserAgenda(texte);
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