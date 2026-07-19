export function traiterAnalyse(analyse, actions) {

  if (!analyse) return;

  switch (analyse.destination) {

    case "agenda":
case "agenda":

  console.log("Analyse reçue :", analyse);

  actions.ajouterRendezVous({
    titre: analyse.titre,
    date: analyse.date,
    heure: analyse.heure,
    categorie: analyse.categorie,
  });

  break;
      actions.ajouterRendezVous({
        titre: analyse.titre,
        date: analyse.date,
        heure: analyse.heure,
        categorie: analyse.categorie,
      });

      break;

    case "budget":

      // À venir
      break;

    case "sante":

      // À venir
      break;

    case "maison":

      // À venir
      break;

    case "univers":

      // À venir
      break;

    default:
      break;

  }

}