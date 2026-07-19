export function analyserUnivers(texte) {

  const contenu = texte.toLowerCase();

  const univers = {

    roman: [
      "roman",
      "chapitre",
      "personnage",
      "royaume",
      "histoire",
      "livre"
    ],

    maison: [
      "maison",
      "bricolage",
      "travaux",
      "jardin",
      "cuisine",
      "salon"
    ],

    vacances: [
      "vacances",
      "voyage",
      "hôtel",
      "avion",
      "camping"
    ],

    voiture: [
      "voiture",
      "garage",
      "contrôle technique",
      "vidange",
      "pneu"
    ]

  };

  for (const nomUnivers in univers) {

    const trouve = univers[nomUnivers].some(mot =>
      contenu.includes(mot)
    );

    if (trouve) {

      return {

        destination: "univers",

        categorie: nomUnivers,

        confiance: 85

      };

    }

  }

  return null;

}