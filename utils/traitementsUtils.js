// =======================================
// CALCULS DES TRAITEMENTS
// =======================================

export function calculerJoursRestants(traitement) {
  const {
    stock,
    unitesParJour,
    dateMiseAJour,
  } = traitement;

  if (
    !stock ||
    !unitesParJour ||
    !dateMiseAJour
  ) {
    return null;
  }

  const dateMiseAJourTraitement = new Date(dateMiseAJour);
  const maintenant = new Date();

  const differenceEnMillisecondes =
    maintenant - dateMiseAJourTraitement;

  const joursEcoules = Math.floor(
    differenceEnMillisecondes /
      (1000 * 60 * 60 * 24)
  );

  const stockRestant =
    stock - joursEcoules * unitesParJour;

  const joursRestants = Math.ceil(
    stockRestant / unitesParJour
  );

  return Math.max(0, joursRestants);
}

// =======================================
// DATE ESTIMÉE DE FIN
// =======================================

export function calculerDateFin(traitement) {
  const joursRestants =
    calculerJoursRestants(traitement);

  if (joursRestants === null) {
    return null;
  }

  const dateFin = new Date();

  dateFin.setDate(
    dateFin.getDate() + joursRestants
  );

  return dateFin;
}

// =======================================
// ALERTE RENOUVELLEMENT
// =======================================

export function doitPrevenirRenouvellement(
  traitement
) {
  const joursRestants =
    calculerJoursRestants(traitement);

  if (joursRestants === null) {
    return false;
  }

  return joursRestants <= 4 && joursRestants > 0;
}