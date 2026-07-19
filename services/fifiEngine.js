import { PhrasesFifi } from "../data/phrasesFifi";

function phraseAleatoire(liste) {
  return liste[Math.floor(Math.random() * liste.length)];
}

export function obtenirEtatFifi() {
  const heure = new Date().getHours();

  if (heure >= 22 || heure < 7) {
    return {
      humeur: "dort",
      animation: "dormir",
      phrase: phraseAleatoire(PhrasesFifi.soir),
    };
  }

  if (heure < 12) {
    return {
      humeur: "heureuse",
      animation: "bonjour",
      phrase: phraseAleatoire(PhrasesFifi.bonjour),
    };
  }

  if (heure < 18) {
    return {
      humeur: "calme",
      animation: "assis",
      phrase: phraseAleatoire(PhrasesFifi.encouragement),
    };
  }

  return {
    humeur: "fatiguee",
    animation: "repos",
    phrase: phraseAleatoire(PhrasesFifi.soir),
  };
}