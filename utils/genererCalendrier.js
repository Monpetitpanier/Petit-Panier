export function genererCalendrier(dateReference, rendezVous = []) {
  const annee = dateReference.getFullYear();
  const mois = dateReference.getMonth();

  const premierJour = new Date(annee, mois, 1);
  const dernierJour = new Date(annee, mois + 1, 0);

  // Lundi = 0 ... Dimanche = 6
  const decalageDebut = (premierJour.getDay() + 6) % 7;

  const debutCalendrier = new Date(premierJour);
  debutCalendrier.setDate(premierJour.getDate() - decalageDebut);

  const aujourdHui = new Date();
  aujourdHui.setHours(0, 0, 0, 0);

  const jours = [];

  for (let i = 0; i < 42; i++) {
    const date = new Date(debutCalendrier);
    date.setDate(debutCalendrier.getDate() + i);

    const dateISO = date.toISOString().split("T")[0];

    const aDesRendezVous = rendezVous.some(
      (rdv) => rdv.date === dateISO
    );

    jours.push({
      date: dateISO,

      numero: date.getDate(),

      estDansLeMois:
        date.getMonth() === mois,

      estAujourdHui:
        date.getTime() === aujourdHui.getTime(),

      estSelectionne: false,

      aDesRendezVous,
    });
  }

  return {
    annee,
    mois,
    jours,
  };
}