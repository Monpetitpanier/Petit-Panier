// =======================================
// UTILITAIRES BUDGET
// =======================================

/**
 * Calcule le nombre de mois restants (arrondi au supérieur)
 * entre aujourd'hui et une date de fin (format "YYYY-MM-DD").
 * Retourne 0 si la date est dépassée, null si pas de date de fin.
 */
export function calculerMoisRestants(dateFin) {
  if (!dateFin) {
    return null;
  }

  const aujourdHui = new Date();
  const fin = new Date(dateFin);

  if (isNaN(fin.getTime())) {
    return null;
  }

  if (fin <= aujourdHui) {
    return 0;
  }

  const moisAujourdHui =
    aujourdHui.getFullYear() * 12 + aujourdHui.getMonth();

  const moisFin =
    fin.getFullYear() * 12 + fin.getMonth();

  let difference = moisFin - moisAujourdHui;

  // On ajoute un mois si le jour de fin n'est pas encore passé dans le mois en cours
  if (fin.getDate() >= aujourdHui.getDate()) {
    difference += 1;
  }

  return Math.max(difference, 0);
}

/**
 * Calcule le reste à rembourser d'un prêt/crédit.
 * Se base sur la mensualité × le nombre de mois restants.
 * Si un montant emprunté est renseigné, le reste ne peut pas le dépasser.
 * Retourne null si le calcul n'est pas possible (pas de date de fin).
 */
export function calculerResteARembourser(pret) {
  if (!pret || !pret.actif) {
    return 0;
  }

  const moisRestants = calculerMoisRestants(pret.dateFin);

  if (moisRestants === null) {
    return null;
  }

  const mensualite = Number(pret.mensualite) || 0;

  let reste = moisRestants * mensualite;

  if (pret.montantEmprunte !== undefined && pret.montantEmprunte !== null) {
    reste = Math.min(reste, Number(pret.montantEmprunte));
  }

  return Math.round(reste * 100) / 100;
}

/**
 * Additionne un tableau d'objets sur leur champ "montant".
 */
export function totaliserMontants(liste, champ = "montant") {
  return liste.reduce((total, item) => {
    const valeur = Number(item[champ]) || 0;
    return total + valeur;
  }, 0);
}

/**
 * Total des mensualités des prêts/crédits actifs.
 */
export function totaliserMensualites(prets) {
  return prets
    .filter((pret) => pret.actif)
    .reduce((total, pret) => total + (Number(pret.mensualite) || 0), 0);
}

/**
 * Total du reste à rembourser sur tous les prêts/crédits actifs
 * dont la date de fin est connue.
 */
export function totaliserResteARembourser(prets) {
  return prets
    .filter((pret) => pret.actif)
    .reduce((total, pret) => {
      const reste = calculerResteARembourser(pret);
      return total + (reste || 0);
    }, 0);
}

/**
 * Calcule le reste disponible du mois :
 * revenus - charges fixes - charges variables - mensualités des prêts.
 */
export function calculerResteDisponible({
  revenuMensuel,
  chargesFixes,
  chargesVariables,
  prets,
}) {
  const revenu = Number(revenuMensuel) || 0;

  const totalFixes = totaliserMontants(chargesFixes);
  const totalVariables = totaliserMontants(chargesVariables);
  const totalMensualites = totaliserMensualites(prets);

  return (
    revenu - totalFixes - totalVariables - totalMensualites
  );
}

/**
 * Formate un nombre en euros, ex: 1234.5 -> "1 234,50 €"
 */
export function formaterMontant(montant) {
  const valeur = Number(montant) || 0;

  return (
    valeur.toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €"
  );
}
