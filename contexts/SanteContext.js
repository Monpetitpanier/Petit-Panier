import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  chargerTraitements,
  sauvegarderTraitements,
  arreterTraitement,
  supprimerTraitement,
  chargerMedicaments,
  sauvegarderMedicaments,
  chargerPharmacie,
  sauvegarderPharmacie,
} from "../services/SanteStorage";

const SanteContext = createContext();

export function SanteProvider({ children }) {
  const [traitements, setTraitements] = useState([]);
  const [medicaments, setMedicaments] = useState([]);
  const [pharmacie, setPharmacie] = useState([]);

  const [chargement, setChargement] = useState(true);

  // =======================================
  // CHARGEMENT INITIAL
  // =======================================

  useEffect(() => {
    async function chargerDonnees() {
      const [
        traitementsCharges,
        medicamentsCharges,
        pharmacieChargee,
      ] = await Promise.all([
        chargerTraitements(),
        chargerMedicaments(),
        chargerPharmacie(),
      ]);

      setTraitements(traitementsCharges);
      setMedicaments(medicamentsCharges);
      setPharmacie(pharmacieChargee);

      setChargement(false);
    }

    chargerDonnees();
  }, []);

  // =======================================
  // SAUVEGARDE
  // =======================================

  useEffect(() => {
    if (!chargement) {
      sauvegarderTraitements(traitements);
    }
  }, [traitements, chargement]);

  useEffect(() => {
    if (!chargement) {
      sauvegarderMedicaments(medicaments);
    }
  }, [medicaments, chargement]);

  useEffect(() => {
    if (!chargement) {
      sauvegarderPharmacie(pharmacie);
    }
  }, [pharmacie, chargement]);

  // =======================================
  // TRAITEMENTS
  // =======================================

  function ajouterTraitement(traitement) {
    setTraitements((anciensTraitements) => [
      ...anciensTraitements,
      traitement,
    ]);
  }

  function modifierTraitement(traitementModifie) {
    setTraitements((anciensTraitements) =>
      anciensTraitements.map((traitement) =>
        traitement.id === traitementModifie.id
          ? traitementModifie
          : traitement
      )
    );
  }
  function renouvelerTraitement(id, nouveauStock, unitesParJour) {
  setTraitements((anciensTraitements) =>
    anciensTraitements.map((traitement) =>
      traitement.id === id
        ? {
            ...traitement,
            stock: nouveauStock,
            unitesParJour: unitesParJour ?? traitement.unitesParJour,
            dateMiseAJour: new Date().toISOString(),
            actif: true,
          }
        : traitement
    )
  );
}

function arreterTraitement(id) {
  setTraitements((anciensTraitements) =>
    anciensTraitements.map((traitement) =>
      traitement.id === id
        ? {
            ...traitement,
            actif: false,
            dateMiseAJour: new Date().toISOString(),
          }
        : traitement
    )
  );
}

  function supprimerTraitement(id) {
    setTraitements((anciensTraitements) =>
      anciensTraitements.filter(
        (traitement) => traitement.id !== id
      )
    );
  }

  // =======================================
  // MÉDICAMENTS
  // =======================================

  function ajouterMedicament(medicament) {
    setMedicaments((anciensMedicaments) => [
      ...anciensMedicaments,
      medicament,
    ]);
  }

  function modifierMedicament(medicamentModifie) {
    setMedicaments((anciensMedicaments) =>
      anciensMedicaments.map((medicament) =>
        medicament.id === medicamentModifie.id
          ? medicamentModifie
          : medicament
      )
    );
  }

  function supprimerMedicament(id) {
    setMedicaments((anciensMedicaments) =>
      anciensMedicaments.filter(
        (medicament) => medicament.id !== id
      )
    );
  }

  // =======================================
  // PHARMACIE
  // =======================================

  function ajouterProduitPharmacie(produit) {
    setPharmacie((anciensProduits) => [
      ...anciensProduits,
      produit,
    ]);
  }

  function modifierProduitPharmacie(produitModifie) {
    setPharmacie((anciensProduits) =>
      anciensProduits.map((produit) =>
        produit.id === produitModifie.id
          ? produitModifie
          : produit
      )
    );
  }

  function supprimerProduitPharmacie(id) {
    setPharmacie((anciensProduits) =>
      anciensProduits.filter(
        (produit) => produit.id !== id
      )
    );
  }

  return (
    <SanteContext.Provider
     value={{
  traitements,
  medicaments,
  pharmacie,

  chargement,

  ajouterTraitement,
  modifierTraitement,
  supprimerTraitement,
  renouvelerTraitement,
  arreterTraitement,

  ajouterMedicament,
  modifierMedicament,
  supprimerMedicament,

  ajouterProduitPharmacie,
  modifierProduitPharmacie,
  supprimerProduitPharmacie,
}}
    >
      {children}
    </SanteContext.Provider>
  );
}

export function useSante() {
  return useContext(SanteContext);
}