export function obtenirStatutPeremption(datePeremption) {
  // Pas de date renseignée = affichage normal
  if (!datePeremption) {
    return "normal";
  }

  const aujourdHui = new Date();

  const datePeremptionMedicament = new Date(
    `${datePeremption}T23:59:59`
  );

  // On enlève l'heure pour comparer uniquement les jours
  aujourdHui.setHours(0, 0, 0, 0);

  const difference =
    datePeremptionMedicament - aujourdHui;

  const joursRestants = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );

  // Médicament déjà périmé
  if (joursRestants < 0) {
    return "perime";
  }

  // Médicament qui périme dans 7 jours ou moins
  if (joursRestants <= 7) {
    return "bientot_perime";
  }

  // Tout va bien
  return "normal";
}