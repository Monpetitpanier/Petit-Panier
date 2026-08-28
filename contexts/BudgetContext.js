import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  chargerChargesFixes,
  sauvegarderChargesFixes,
  chargerChargesVariables,
  sauvegarderChargesVariables,
  chargerPrets,
  sauvegarderPrets,
  chargerRevenuMensuel,
  sauvegarderRevenuMensuel,
  chargerResteDisponible,
  sauvegarderResteDisponible,
  chargerEpargne,
  sauvegarderEpargne,
  chargerJourDePaie,
  sauvegarderJourDePaie,
  chargerDernierCycle,
  sauvegarderDernierCycle,

  chargerRemboursements,
  sauvegarderRemboursements,
} from "../services/BudgetStorage";

const BudgetContext = createContext(null);

function nombreDeJoursDansLeMois(annee, mois) {
  return new Date(annee, mois + 1, 0).getDate();
}

function dateDePaiePourMois(annee, mois, jourDePaie) {
  const dernierJour = nombreDeJoursDansLeMois(annee, mois);
  const jour = Math.min(jourDePaie, dernierJour);

  return new Date(annee, mois, jour, 0, 0, 0, 0);
}

function formaterCleCycle(date) {
  const annee = date.getFullYear();
  const mois = String(date.getMonth() + 1).padStart(2, "0");
  const jour = String(date.getDate()).padStart(2, "0");

  return `${annee}-${mois}-${jour}`;
}

function calculerCycleActuel(jourDePaie, dateReference = new Date()) {
  if (
    !Number.isInteger(jourDePaie) ||
    jourDePaie < 1 ||
    jourDePaie > 31
  ) {
    return null;
  }

  const annee = dateReference.getFullYear();
  const mois = dateReference.getMonth();

  const paieCeMois = dateDePaiePourMois(
    annee,
    mois,
    jourDePaie
  );

  if (dateReference.getTime() >= paieCeMois.getTime()) {
    return formaterCleCycle(paieCeMois);
  }

  const moisPrecedent = mois === 0 ? 11 : mois - 1;
  const anneePrecedente = mois === 0 ? annee - 1 : annee;

  const paieMoisPrecedent = dateDePaiePourMois(
    anneePrecedente,
    moisPrecedent,
    jourDePaie
  );

  return formaterCleCycle(paieMoisPrecedent);
}

function calculerCyclePrecedent(jourDePaie, dateReference = new Date()) {
  const cycleActuel = calculerCycleActuel(
    jourDePaie,
    dateReference
  );

  if (!cycleActuel) {
    return null;
  }

  const [annee, mois, jour] = cycleActuel.split("-").map(Number);

  const dateCycleActuel = new Date(
    annee,
    mois - 1,
    jour,
    0,
    0,
    0,
    0
  );

  const moisPrecedent =
    dateCycleActuel.getMonth() === 0
      ? 11
      : dateCycleActuel.getMonth() - 1;

  const anneePrecedente =
    dateCycleActuel.getMonth() === 0
      ? dateCycleActuel.getFullYear() - 1
      : dateCycleActuel.getFullYear();

  const dateCyclePrecedent = dateDePaiePourMois(
    anneePrecedente,
    moisPrecedent,
    jourDePaie
  );

  return formaterCleCycle(dateCyclePrecedent);
}

function estChargeEpargne(charge) {
  const nom = String(charge?.nom || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return nom === "epargne";
}

export function BudgetProvider({ children }) {
  const [chargesFixes, setChargesFixes] = useState([]);
  const [chargesVariables, setChargesVariables] = useState([]);
  const [prets, setPrets] = useState([]);
  const [revenuMensuel, setRevenuMensuel] = useState(0);
  const [resteDisponible, setResteDisponible] = useState(0);
  const [epargne, setEpargne] = useState(0);
  const [jourDePaie, setJourDePaie] = useState(null);
  const [dernierCycle, setDernierCycle] = useState(null);

  const [remboursements, setRemboursements] =
    useState([]);

  const [chargement, setChargement] = useState(true);

  // =======================================
  // CHARGEMENT INITIAL
  // =======================================

  useEffect(() => {
    async function chargerDonnees() {
      try {
        const [
          chargesFixesChargees,
          chargesVariablesChargees,
          pretsCharges,
          revenuCharge,
          resteDisponibleCharge,
          epargneChargee,
          jourDePaieCharge,
          dernierCycleCharge,
          remboursementsCharges,
        ] = await Promise.all([
          chargerChargesFixes(),
          chargerChargesVariables(),
          chargerPrets(),
          chargerRevenuMensuel(),
          chargerResteDisponible(),
          chargerEpargne(),
          chargerJourDePaie(),
          chargerDernierCycle(),
          chargerRemboursements(),
        ]);

        setChargesFixes(chargesFixesChargees);
        setChargesVariables(chargesVariablesChargees);
        setPrets(pretsCharges);
        setRevenuMensuel(Number(revenuCharge) || 0);
        setResteDisponible(Number(resteDisponibleCharge) || 0);
        setEpargne(Number(epargneChargee) || 0);

        const jour = Number(jourDePaieCharge);
        setJourDePaie(
          Number.isInteger(jour) && jour >= 1 && jour <= 31
            ? jour
            : null
        );

        setDernierCycle(dernierCycleCharge);
        setRemboursements(remboursementsCharges || []);
      } catch (erreur) {
        console.error(
          "Erreur lors du chargement du budget :",
          erreur
        );
      } finally {
        setChargement(false);
      }
    }

    chargerDonnees();
  }, []);

  // =======================================
  // SAUVEGARDES
  // =======================================

  useEffect(() => {
    if (!chargement) sauvegarderChargesFixes(chargesFixes);
  }, [chargesFixes, chargement]);

  useEffect(() => {
    if (!chargement) sauvegarderChargesVariables(chargesVariables);
  }, [chargesVariables, chargement]);

  useEffect(() => {
    if (!chargement) sauvegarderPrets(prets);
  }, [prets, chargement]);

  useEffect(() => {
    if (!chargement) sauvegarderRevenuMensuel(revenuMensuel);
  }, [revenuMensuel, chargement]);

  useEffect(() => {
    if (!chargement) sauvegarderResteDisponible(resteDisponible);
  }, [resteDisponible, chargement]);

  useEffect(() => {
    if (!chargement) sauvegarderEpargne(epargne);
  }, [epargne, chargement]);

  useEffect(() => {
    if (!chargement) sauvegarderJourDePaie(jourDePaie);
  }, [jourDePaie, chargement]);

  useEffect(() => {
    if (!chargement) sauvegarderDernierCycle(dernierCycle);
  }, [dernierCycle, chargement]);

  useEffect(() => {
    if (!chargement) sauvegarderRemboursements(remboursements);
  }, [remboursements, chargement]);

  // =======================================
  // CYCLE BUDGÉTAIRE
  // =======================================

  useEffect(() => {
    if (chargement || !jourDePaie) {
      return;
    }

    const maintenant = new Date();
    const cycleActuel = calculerCycleActuel(
      jourDePaie,
      maintenant
    );

    if (!cycleActuel) {
      return;
    }

    /*
     * PREMIÈRE INITIALISATION
     *
     * Les montants déjà présents représentent
     * la situation réelle saisie par l'utilisateur.
     * On ne rejoue donc aucune charge.
     *
     * Cas particulier : si aujourd'hui est le jour
     * de paie, le salaire du jour peut être ajouté.
     */
    if (dernierCycle === null) {
      const paieCeMois = dateDePaiePourMois(
        maintenant.getFullYear(),
        maintenant.getMonth(),
        jourDePaie
      );

      const paieEstAujourdHui =
        maintenant.getFullYear() === paieCeMois.getFullYear() &&
        maintenant.getMonth() === paieCeMois.getMonth() &&
        maintenant.getDate() === paieCeMois.getDate();

      if (
        paieEstAujourdHui &&
        Number(revenuMensuel) > 0
      ) {
        setResteDisponible(
          (ancienReste) =>
            ancienReste + Number(revenuMensuel)
        );
      }

      if (paieEstAujourdHui) {
        setDernierCycle(cycleActuel);
      } else if (maintenant.getTime() < paieCeMois.getTime()) {
        setDernierCycle(
          calculerCyclePrecedent(
            jourDePaie,
            maintenant
          )
        );
      } else {
        /*
         * La paie du cycle actuel est déjà passée.
         * Le solde saisi est considéré comme réel
         * et on n'ajoute rien rétroactivement.
         */
        setDernierCycle(cycleActuel);
      }

      return;
    }

    /* Même cycle : rien à faire. */
    if (dernierCycle === cycleActuel) {
      return;
    }

    // ===================================
    // NOUVEAU CYCLE
    // ===================================

    const salaire = Number(revenuMensuel) || 0;

    let totalChargesFixes = 0;
    let montantEpargne = 0;

    chargesFixes.forEach((charge) => {
      const montant = Number(charge?.montant) || 0;

      if (montant <= 0) {
        return;
      }

      if (estChargeEpargne(charge)) {
        montantEpargne += montant;
      } else {
        totalChargesFixes += montant;
      }
    });

    /*
     * Les charges variables de la liste sont
     * reconduites au nouveau cycle.
     */
    const totalChargesVariables =
      chargesVariables.reduce(
        (total, charge) =>
          total + (Number(charge?.montant) || 0),
        0
      );

    /* Prêts / crédits actifs. */
    const totalMensualitesPrets =
      prets
        .filter((pret) => pret?.actif)
        .reduce(
          (total, pret) =>
            total + (Number(pret?.mensualite) || 0),
          0
        );

    /*
     * Nouveau cycle :
     * + salaire
     * - charges fixes
     * - charges variables
     * - prêts
     * - épargne mensuelle
     */
    const variationReste =
      salaire -
      totalChargesFixes -
      totalChargesVariables -
      totalMensualitesPrets -
      montantEpargne;

    if (variationReste !== 0) {
      setResteDisponible(
        (ancienReste) =>
          ancienReste + variationReste
      );
    }

    if (montantEpargne > 0) {
      setEpargne(
        (ancienneEpargne) =>
          ancienneEpargne + montantEpargne
      );
    }

    setDernierCycle(cycleActuel);
  }, [
    chargement,
    jourDePaie,
    dernierCycle,
  ]);

  // =======================================
  // CHARGES FIXES
  // =======================================

  function ajouterChargeFixe(charge) {
    const montant = Number(charge.montant) || 0;

    setChargesFixes((anciennesCharges) => [
      ...anciennesCharges,
      charge,
    ]);

    if (montant !== 0) {
      setResteDisponible(
        (ancienReste) =>
          ancienReste - montant
      );

      if (estChargeEpargne(charge)) {
        setEpargne(
          (ancienneEpargne) =>
            ancienneEpargne + montant
        );
      }
    }
  }

  function modifierChargeFixe(chargeModifiee) {
    setChargesFixes((anciennesCharges) => {
      const ancienneCharge = anciennesCharges.find(
        (charge) =>
          charge.id === chargeModifiee.id
      );

      const ancienMontant = ancienneCharge
        ? Number(ancienneCharge.montant) || 0
        : 0;

      const nouveauMontant =
        Number(chargeModifiee.montant) || 0;

      const ancienneEstEpargne = ancienneCharge
        ? estChargeEpargne(ancienneCharge)
        : false;

      const nouvelleEstEpargne =
        estChargeEpargne(chargeModifiee);

      if (
        ancienneEstEpargne ===
        nouvelleEstEpargne
      ) {
        const difference =
          nouveauMontant - ancienMontant;

        if (difference !== 0) {
          setResteDisponible(
            (ancienReste) =>
              ancienReste - difference
          );

          if (nouvelleEstEpargne) {
            setEpargne(
              (ancienneEpargne) =>
                ancienneEpargne + difference
            );
          }
        }
      } else if (
        !ancienneEstEpargne &&
        nouvelleEstEpargne
      ) {
        setResteDisponible(
          (ancienReste) =>
            ancienReste +
            ancienMontant -
            nouveauMontant
        );

        setEpargne(
          (ancienneEpargne) =>
            ancienneEpargne + nouveauMontant
        );
      } else if (
        ancienneEstEpargne &&
        !nouvelleEstEpargne
      ) {
        setResteDisponible(
          (ancienReste) =>
            ancienReste +
            ancienMontant -
            nouveauMontant
        );

        setEpargne(
          (ancienneEpargne) =>
            Math.max(
              0,
              ancienneEpargne -
              ancienMontant
            )
        );
      }

      return anciennesCharges.map(
        (charge) =>
          charge.id === chargeModifiee.id
            ? chargeModifiee
            : charge
      );
    });
  }

  function supprimerChargeFixe(id) {
    setChargesFixes((anciennesCharges) => {
      const chargeSupprimee = anciennesCharges.find(
        (charge) =>
          charge.id === id
      );

      const montant = chargeSupprimee
        ? Number(chargeSupprimee.montant) || 0
        : 0;

      if (montant !== 0) {
        setResteDisponible(
          (ancienReste) =>
            ancienReste + montant
        );

        if (
          chargeSupprimee &&
          estChargeEpargne(chargeSupprimee)
        ) {
          setEpargne(
            (ancienneEpargne) =>
              Math.max(
                0,
                ancienneEpargne - montant
              )
          );
        }
      }

      return anciennesCharges.filter(
        (charge) =>
          charge.id !== id
      );
    });
  }

  // =======================================
  // CHARGES VARIABLES
  // =======================================

  function ajouterChargeVariable(charge) {
    const montant = Number(charge.montant) || 0;

    setChargesVariables((anciennesCharges) => [
      ...anciennesCharges,
      charge,
    ]);

    if (montant !== 0) {
      setResteDisponible(
        (ancienReste) =>
          ancienReste - montant
      );
    }
  }

  function modifierChargeVariable(chargeModifiee) {
    setChargesVariables((anciennesCharges) => {
      const ancienneCharge = anciennesCharges.find(
        (charge) =>
          charge.id === chargeModifiee.id
      );

      const ancienMontant = ancienneCharge
        ? Number(ancienneCharge.montant) || 0
        : 0;

      const nouveauMontant =
        Number(chargeModifiee.montant) || 0;

      const difference =
        nouveauMontant - ancienMontant;

      if (difference !== 0) {
        setResteDisponible(
          (ancienReste) =>
            ancienReste - difference
        );
      }

      return anciennesCharges.map(
        (charge) =>
          charge.id === chargeModifiee.id
            ? chargeModifiee
            : charge
      );
    });
  }

  function supprimerChargeVariable(id) {
    setChargesVariables((anciennesCharges) => {
      const chargeSupprimee = anciennesCharges.find(
        (charge) =>
          charge.id === id
      );

      const montant = chargeSupprimee
        ? Number(chargeSupprimee.montant) || 0
        : 0;

      if (montant !== 0) {
        setResteDisponible(
          (ancienReste) =>
            ancienReste + montant
        );
      }

      return anciennesCharges.filter(
        (charge) =>
          charge.id !== id
      );
    });
  }

  // =======================================
  // PRÊTS & CRÉDITS
  // =======================================

  function ajouterPret(pret) {
    setPrets((anciensPrets) => [
      ...anciensPrets,
      pret,
    ]);
  }

  function modifierPret(pretModifie) {
    setPrets((anciensPrets) =>
      anciensPrets.map(
        (pret) =>
          pret.id === pretModifie.id
            ? pretModifie
            : pret
      )
    );
  }

  function soldePret(id) {
    setPrets((anciensPrets) =>
      anciensPrets.map(
        (pret) =>
          pret.id === id
            ? {
                ...pret,
                actif: false,
              }
            : pret
      )
    );
  }

  function supprimerPret(id) {
    setPrets((anciensPrets) =>
      anciensPrets.filter(
        (pret) =>
          pret.id !== id
      )
    );
  }

  // =======================================
  // REMBOURSEMENTS
  // =======================================

  function ajouterRemboursement(
    remboursement
  ) {

    const montant =
      Number(
        remboursement.montant
      ) || 0;


    setRemboursements(
      (anciensRemboursements) => [
        ...anciensRemboursements,
        remboursement,
      ]
    );


    if (
      montant !== 0
    ) {

      setResteDisponible(
        (ancienReste) =>
          ancienReste + montant
      );

    }

  }


  function modifierRemboursement(
    remboursementModifie
  ) {

    setRemboursements(
      (anciensRemboursements) => {

        const ancienRemboursement =
          anciensRemboursements.find(
            (remboursement) =>
              remboursement.id ===
              remboursementModifie.id
          );


        const ancienMontant =
          ancienRemboursement
            ? Number(
                ancienRemboursement.montant
              ) || 0
            : 0;


        const nouveauMontant =
          Number(
            remboursementModifie.montant
          ) || 0;


        const difference =
          nouveauMontant -
          ancienMontant;


        if (
          difference !== 0
        ) {

          setResteDisponible(
            (ancienReste) =>
              ancienReste + difference
          );

        }


        return anciensRemboursements.map(
          (remboursement) =>
            remboursement.id ===
            remboursementModifie.id
              ? remboursementModifie
              : remboursement
        );

      }
    );

  }


  function supprimerRemboursement(
    id
  ) {

    setRemboursements(
      (anciensRemboursements) => {

        const remboursementSupprime =
          anciensRemboursements.find(
            (remboursement) =>
              remboursement.id === id
          );


        const montant =
          remboursementSupprime
            ? Number(
                remboursementSupprime.montant
              ) || 0
            : 0;


        if (
          montant !== 0
        ) {

          setResteDisponible(
            (ancienReste) =>
              ancienReste - montant
          );

        }


        return anciensRemboursements.filter(
          (remboursement) =>
            remboursement.id !== id
        );

      }
    );

  }


  // =======================================
  // RESTE DISPONIBLE
  // =======================================

  function modifierResteDisponible(montant) {
    const valeur = Number(montant);

    if (!Number.isFinite(valeur)) {
      return false;
    }

    setResteDisponible(valeur);
    return true;
  }

  function ajouterAuResteDisponible(montant) {
    const valeur = Number(montant);

    if (
      !Number.isFinite(valeur) ||
      valeur === 0
    ) {
      return false;
    }

    setResteDisponible(
      (ancienReste) =>
        ancienReste + valeur
    );

    return true;
  }

  function retirerDuResteDisponible(montant) {
    const valeur = Number(montant);

    if (
      !Number.isFinite(valeur) ||
      valeur === 0
    ) {
      return false;
    }

    setResteDisponible(
      (ancienReste) =>
        ancienReste - valeur
    );

    return true;
  }

  // =======================================
  // ÉPARGNE
  // =======================================

  function modifierEpargne(montant) {
    const valeur = Number(montant);

    if (
      !Number.isFinite(valeur) ||
      valeur < 0
    ) {
      return false;
    }

    setEpargne(valeur);
    return true;
  }

  function utiliserEpargne(montant) {
    const montantDemande = Number(montant);

    if (
      !Number.isFinite(montantDemande) ||
      montantDemande <= 0 ||
      epargne <= 0
    ) {
      return false;
    }

    const montantUtilise = Math.min(
      montantDemande,
      epargne
    );

    setEpargne(
      (ancienneEpargne) =>
        ancienneEpargne - montantUtilise
    );

    setResteDisponible(
      (ancienReste) =>
        ancienReste + montantUtilise
    );

    return true;
  }

  function alimenterEpargne(montant) {
    const montantDemande = Number(montant);

    if (
      !Number.isFinite(montantDemande) ||
      montantDemande <= 0
    ) {
      return false;
    }

    setResteDisponible(
      (ancienReste) =>
        ancienReste - montantDemande
    );

    setEpargne(
      (ancienneEpargne) =>
        ancienneEpargne + montantDemande
    );

    return true;
  }

  // =======================================
  // CONTEXTE
  // =======================================

  return (
    <BudgetContext.Provider
      value={{
        chargesFixes,
        chargesVariables,
        prets,

        revenuMensuel,
        resteDisponible,
        epargne,

        jourDePaie,
        dernierCycle,

        remboursements,

        chargement,

        setRevenuMensuel,
        setJourDePaie,

        setResteDisponible,
        modifierResteDisponible,
        ajouterAuResteDisponible,
        retirerDuResteDisponible,

        setEpargne,
        modifierEpargne,
        utiliserEpargne,
        alimenterEpargne,

        ajouterChargeFixe,
        modifierChargeFixe,
        supprimerChargeFixe,

        ajouterRemboursement,
        modifierRemboursement,
        supprimerRemboursement,

        ajouterChargeVariable,
        modifierChargeVariable,
        supprimerChargeVariable,

        ajouterPret,
        modifierPret,
        soldePret,
        supprimerPret,

      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  return useContext(BudgetContext);
}
