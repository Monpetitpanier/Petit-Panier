import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import {
  chargerGratitudes,
  sauvegarderGratitudes,
  chargerPenseesFavorites,
  sauvegarderPenseesFavorites,
} from "../services/bienEtreStorage";

const BienEtreContext = createContext(null);

export function BienEtreProvider({ children }) {

  const [respirations, setRespirations] = useState([]);
  const [gratitudes, setGratitudes] = useState([]);
  const [penseesFavorites, setPenseesFavorites] = useState([]);
  const [journal, setJournal] = useState([]);
  const [relaxations, setRelaxations] = useState([]);
  const [sommeil, setSommeil] = useState([]);

  const [chargementTermine, setChargementTermine] = useState(false);


  // =====================================
  // CHARGEMENT DES DONNÉES
  // =====================================

  useEffect(() => {

    async function chargerDonnees() {

      const [
        gratitudesChargees,
        penseesFavoritesChargees,
      ] = await Promise.all([
        chargerGratitudes(),
        chargerPenseesFavorites(),
      ]);

      setGratitudes(gratitudesChargees);

      setPenseesFavorites(
        penseesFavoritesChargees
      );

      setChargementTermine(true);

    }

    chargerDonnees();

  }, []);


  // =====================================
  // GRATITUDES
  // =====================================

  function ajouterGratitude(texte) {

    const nouvelleGratitude = {
      id: uuidv4(),
      texte,
      dateCreation: new Date().toISOString(),
      favori: false,
    };

    const nouvellesGratitudes = [
      nouvelleGratitude,
      ...gratitudes,
    ];

    setGratitudes(nouvellesGratitudes);

    sauvegarderGratitudes(
      nouvellesGratitudes
    );

  }


  function supprimerGratitude(id) {

    const nouvellesGratitudes =
      gratitudes.filter(
        (gratitude) =>
          gratitude.id !== id
      );

    setGratitudes(nouvellesGratitudes);

    sauvegarderGratitudes(
      nouvellesGratitudes
    );

  }


  function basculerFavori(id) {

    const nouvellesGratitudes =
      gratitudes.map((gratitude) =>
        gratitude.id === id
          ? {
              ...gratitude,
              favori: !gratitude.favori,
            }
          : gratitude
      );

    setGratitudes(nouvellesGratitudes);

    sauvegarderGratitudes(
      nouvellesGratitudes
    );

  }


  // =====================================
  // PENSÉES POSITIVES FAVORITES
  // =====================================

  function basculerPenseeFavorite(pensee) {

    const estDejaFavorite =
      penseesFavorites.includes(pensee);

    let nouvellesPenseesFavorites;

    if (estDejaFavorite) {

      nouvellesPenseesFavorites =
        penseesFavorites.filter(
          (item) => item !== pensee
        );

    } else {

      nouvellesPenseesFavorites = [
        ...penseesFavorites,
        pensee,
      ];

    }

    setPenseesFavorites(
      nouvellesPenseesFavorites
    );

    sauvegarderPenseesFavorites(
      nouvellesPenseesFavorites
    );

  }


  function estPenseeFavorite(pensee) {

    return penseesFavorites.includes(
      pensee
    );

  }


  // =====================================
  // PROVIDER
  // =====================================

  return (

    <BienEtreContext.Provider
      value={{

        chargementTermine,


        // RESPIRATION

        respirations,
        setRespirations,


        // GRATITUDES

        gratitudes,
        ajouterGratitude,
        supprimerGratitude,
        basculerFavori,


        // PENSÉES POSITIVES

        penseesFavorites,
        basculerPenseeFavorite,
        estPenseeFavorite,


        // JOURNAL

        journal,
        setJournal,


        // RELAXATION

        relaxations,
        setRelaxations,


        // SOMMEIL

        sommeil,
        setSommeil,

      }}
    >

      {children}

    </BienEtreContext.Provider>

  );

}


export function useBienEtre() {

  const context =
    useContext(BienEtreContext);

  if (!context) {

    throw new Error(
      "useBienEtre doit être utilisé à l'intérieur d'un BienEtreProvider"
    );

  }

  return context;

}