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

} from "../services/BudgetStorage";


const BudgetContext =
  createContext(null);


export function BudgetProvider({
  children,
}) {

  // =======================================
  // ÉTATS
  // =======================================

  const [chargesFixes, setChargesFixes] =
    useState([]);

  const [chargesVariables, setChargesVariables] =
    useState([]);

  const [prets, setPrets] =
    useState([]);

  const [revenuMensuel, setRevenuMensuel] =
    useState(0);


  /*
   * Le reste disponible représente
   * actuellement ce que l'utilisateur
   * considère comme disponible pour
   * ses dépenses variables.
   */
  const [
    resteDisponible,
    setResteDisponible,
  ] = useState(0);


  // ÉPARGNE RÉELLE ACTUELLE
  const [epargne, setEpargne] =
    useState(0);


  /*
   * Jour auquel l'utilisateur reçoit
   * habituellement son salaire.
   *
   * null = pas encore renseigné.
   */
  const [
    jourDePaie,
    setJourDePaie,
  ] = useState(null);


  const [chargement, setChargement] =
    useState(true);


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
        ] = await Promise.all([

          chargerChargesFixes(),

          chargerChargesVariables(),

          chargerPrets(),

          chargerRevenuMensuel(),

          chargerResteDisponible(),

          chargerEpargne(),

          chargerJourDePaie(),

        ]);


        setChargesFixes(
          chargesFixesChargees
        );

        setChargesVariables(
          chargesVariablesChargees
        );

        setPrets(
          pretsCharges
        );

        setRevenuMensuel(
          Number(revenuCharge) || 0
        );

        setResteDisponible(
          Number(
            resteDisponibleCharge
          ) || 0
        );

        setEpargne(
          Number(
            epargneChargee
          ) || 0
        );


        /*
         * On vérifie que la valeur chargée
         * est bien comprise entre 1 et 31.
         */
        if (
          jourDePaieCharge !== null &&
          Number.isFinite(
            Number(jourDePaieCharge)
          ) &&
          Number(jourDePaieCharge) >= 1 &&
          Number(jourDePaieCharge) <= 31
        ) {

          setJourDePaie(
            Number(jourDePaieCharge)
          );

        } else {

          setJourDePaie(null);

        }

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
  // SAUVEGARDE DES CHARGES FIXES
  // =======================================

  useEffect(() => {

    if (!chargement) {

      sauvegarderChargesFixes(
        chargesFixes
      );

    }

  }, [
    chargesFixes,
    chargement,
  ]);


  // =======================================
  // SAUVEGARDE DES CHARGES VARIABLES
  // =======================================

  useEffect(() => {

    if (!chargement) {

      sauvegarderChargesVariables(
        chargesVariables
      );

    }

  }, [
    chargesVariables,
    chargement,
  ]);


  // =======================================
  // SAUVEGARDE DES PRÊTS
  // =======================================

  useEffect(() => {

    if (!chargement) {

      sauvegarderPrets(
        prets
      );

    }

  }, [
    prets,
    chargement,
  ]);


  // =======================================
  // SAUVEGARDE DU REVENU MENSUEL
  // =======================================

  useEffect(() => {

    if (!chargement) {

      sauvegarderRevenuMensuel(
        revenuMensuel
      );

    }

  }, [
    revenuMensuel,
    chargement,
  ]);


  // =======================================
  // SAUVEGARDE DU RESTE DISPONIBLE
  // =======================================

  useEffect(() => {

    if (!chargement) {

      sauvegarderResteDisponible(
        resteDisponible
      );

    }

  }, [
    resteDisponible,
    chargement,
  ]);


  // =======================================
  // SAUVEGARDE DE L'ÉPARGNE
  // =======================================

  useEffect(() => {

    if (!chargement) {

      sauvegarderEpargne(
        epargne
      );

    }

  }, [
    epargne,
    chargement,
  ]);


  // =======================================
  // SAUVEGARDE DU JOUR DE PAIE
  // =======================================

  useEffect(() => {

    if (!chargement) {

      sauvegarderJourDePaie(
        jourDePaie
      );

    }

  }, [
    jourDePaie,
    chargement,
  ]);


  // =======================================
  // CHARGES FIXES
  // =======================================

  function ajouterChargeFixe(
    charge
  ) {

    setChargesFixes(
      (anciennesCharges) => [
        ...anciennesCharges,
        charge,
      ]
    );

  }


  function modifierChargeFixe(
    chargeModifiee
  ) {

    setChargesFixes(
      (anciennesCharges) =>
        anciennesCharges.map(
          (charge) =>
            charge.id ===
            chargeModifiee.id
              ? chargeModifiee
              : charge
        )
    );

  }


  function supprimerChargeFixe(
    id
  ) {

    setChargesFixes(
      (anciennesCharges) =>
        anciennesCharges.filter(
          (charge) =>
            charge.id !== id
        )
    );

  }


  // =======================================
  // CHARGES VARIABLES
  // =======================================

  function ajouterChargeVariable(
    charge
  ) {

    setChargesVariables(
      (anciennesCharges) => [
        ...anciennesCharges,
        charge,
      ]
    );

  }


  function modifierChargeVariable(
    chargeModifiee
  ) {

    setChargesVariables(
      (anciennesCharges) =>
        anciennesCharges.map(
          (charge) =>
            charge.id ===
            chargeModifiee.id
              ? chargeModifiee
              : charge
        )
    );

  }


  function supprimerChargeVariable(
    id
  ) {

    setChargesVariables(
      (anciennesCharges) =>
        anciennesCharges.filter(
          (charge) =>
            charge.id !== id
        )
    );

  }


  // =======================================
  // PRÊTS & CRÉDITS
  // =======================================

  function ajouterPret(
    pret
  ) {

    setPrets(
      (anciensPrets) => [
        ...anciensPrets,
        pret,
      ]
    );

  }


  function modifierPret(
    pretModifie
  ) {

    setPrets(
      (anciensPrets) =>
        anciensPrets.map(
          (pret) =>
            pret.id ===
            pretModifie.id
              ? pretModifie
              : pret
        )
    );

  }


  function soldePret(
    id
  ) {

    setPrets(
      (anciensPrets) =>
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


  function supprimerPret(
    id
  ) {

    setPrets(
      (anciensPrets) =>
        anciensPrets.filter(
          (pret) =>
            pret.id !== id
        )
    );

  }


  // =======================================
  // RESTE DISPONIBLE
  // =======================================

  function modifierResteDisponible(
    montant
  ) {

    const valeur =
      Number(montant);

    if (!Number.isFinite(valeur)) {
      return false;
    }

    setResteDisponible(
      valeur
    );

    return true;

  }


  function ajouterAuResteDisponible(
    montant
  ) {

    const valeur =
      Number(montant);

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


  function retirerDuResteDisponible(
    montant
  ) {

    const valeur =
      Number(montant);

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

  function utiliserEpargne(
    montant
  ) {

    const montantDemande =
      Number(montant);

    if (
      !Number.isFinite(
        montantDemande
      ) ||
      montantDemande <= 0 ||
      epargne <= 0
    ) {
      return false;
    }


    const montantUtilise =
      Math.min(
        montantDemande,
        epargne
      );


    setEpargne(
      (ancienneEpargne) =>
        ancienneEpargne -
        montantUtilise
    );


    setResteDisponible(
      (ancienReste) =>
        ancienReste +
        montantUtilise
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

        // DONNÉES

        chargesFixes,
        chargesVariables,
        prets,

        revenuMensuel,
        resteDisponible,
        epargne,

        jourDePaie,

        chargement,


        // REVENU

        setRevenuMensuel,


        // JOUR DE PAIE

        setJourDePaie,


        // RESTE DISPONIBLE

        setResteDisponible,
        modifierResteDisponible,
        ajouterAuResteDisponible,
        retirerDuResteDisponible,


        // ÉPARGNE

        setEpargne,
        utiliserEpargne,
        alimenterEpargne,


        // CHARGES FIXES

        ajouterChargeFixe,
        modifierChargeFixe,
        supprimerChargeFixe,


        // CHARGES VARIABLES

        ajouterChargeVariable,
        modifierChargeVariable,
        supprimerChargeVariable,


        // PRÊTS

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

  return useContext(
    BudgetContext
  );

}