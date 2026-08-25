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

  chargerSoldeActuel,
  sauvegarderSoldeActuel,

  chargerEpargne,
  sauvegarderEpargne,

} from "../services/BudgetStorage";


const BudgetContext = createContext();


export function BudgetProvider({ children }) {

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

  const [soldeActuel, setSoldeActuel] =
    useState(0);

  // ÉPARGNE RÉELLE ACTUELLE
  const [epargne, setEpargne] =
    useState(0);

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
          soldeCharge,
          epargneChargee,
        ] = await Promise.all([

          chargerChargesFixes(),

          chargerChargesVariables(),

          chargerPrets(),

          chargerRevenuMensuel(),

          chargerSoldeActuel(),

          chargerEpargne(),

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
          revenuCharge
        );

        setSoldeActuel(
          soldeCharge
        );

        setEpargne(
          epargneChargee
        );

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
  // SAUVEGARDE DU SOLDE ACTUEL
  // =======================================

  useEffect(() => {

    if (!chargement) {

      sauvegarderSoldeActuel(
        soldeActuel
      );

    }

  }, [
    soldeActuel,
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
  // CHARGES FIXES
  // =======================================

  function ajouterChargeFixe(charge) {

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
            charge.id === chargeModifiee.id
              ? chargeModifiee
              : charge
        )
    );

  }


  function supprimerChargeFixe(id) {

    setChargesFixes(
      (anciennesCharges) =>
        anciennesCharges.filter(
          (charge) => charge.id !== id
        )
    );

  }


  // =======================================
  // CHARGES VARIABLES
  // =======================================

  function ajouterChargeVariable(charge) {

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
            charge.id === chargeModifiee.id
              ? chargeModifiee
              : charge
        )
    );

  }


  function supprimerChargeVariable(id) {

    setChargesVariables(
      (anciennesCharges) =>
        anciennesCharges.filter(
          (charge) => charge.id !== id
        )
    );

  }


  // =======================================
  // PRÊTS & CRÉDITS
  // =======================================

  function ajouterPret(pret) {

    setPrets(
      (anciensPrets) => [
        ...anciensPrets,
        pret,
      ]
    );

  }


  function modifierPret(pretModifie) {

    setPrets(
      (anciensPrets) =>
        anciensPrets.map(
          (pret) =>
            pret.id === pretModifie.id
              ? pretModifie
              : pret
        )
    );

  }


  function soldePret(id) {

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


  function supprimerPret(id) {

    setPrets(
      (anciensPrets) =>
        anciensPrets.filter(
          (pret) => pret.id !== id
        )
    );

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
        soldeActuel,
        epargne,

        chargement,


        // ACTIONS DIRECTES

        setRevenuMensuel,
        setSoldeActuel,
        setEpargne,


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