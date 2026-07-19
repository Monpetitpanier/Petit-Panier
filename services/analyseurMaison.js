export function analyserMaison(texte) {

  const contenu = texte.toLowerCase();

  const motsMaison = [
    "penser à",
    "ne pas oublier",
    "à faire",
    "todo",
    "to do",
    "liste",
    "appel",
    "envoyer",
    "acheter",
    "préparer",
    "organiser"
  ];

  const estMaison = motsMaison.some(mot =>
    contenu.includes(mot)
  );

  if (!estMaison) {
    return null;
  }

  return {
    destination: "maison",
    categorie: "tache",
    confiance: 80
  };

}