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
} from "../services/bienEtreStorage";

const BienEtreContext = createContext(null);

export function BienEtreProvider({ children }) {
  const [respirations, setRespirations] = useState([]);
  const [gratitudes, setGratitudes] = useState([]);
  const [journal, setJournal] = useState([]);
  const [relaxations, setRelaxations] = useState([]);
  const [sommeil, setSommeil] = useState([]);

  const [chargementTermine, setChargementTermine] = useState(false);

  useEffect(() => {
    chargerGratitudes().then((gratitudesChargees) => {
      setGratitudes(gratitudesChargees);
      setChargementTermine(true);
    });
  }, []);

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
    sauvegarderGratitudes(nouvellesGratitudes);
  }

  function supprimerGratitude(id) {
    const nouvellesGratitudes = gratitudes.filter(
      (gratitude) => gratitude.id !== id
    );

    setGratitudes(nouvellesGratitudes);
    sauvegarderGratitudes(nouvellesGratitudes);
  }

  function basculerFavori(id) {
    const nouvellesGratitudes = gratitudes.map((gratitude) =>
      gratitude.id === id
        ? {
            ...gratitude,
            favori: !gratitude.favori,
          }
        : gratitude
    );

    setGratitudes(nouvellesGratitudes);
    sauvegarderGratitudes(nouvellesGratitudes);
  }

  return (
    <BienEtreContext.Provider
      value={{
        chargementTermine,

        respirations,
        setRespirations,

        gratitudes,
        ajouterGratitude,
        supprimerGratitude,
        basculerFavori,

        journal,
        setJournal,

        relaxations,
        setRelaxations,

        sommeil,
        setSommeil,
      }}
    >
      {children}
    </BienEtreContext.Provider>
  );
}

export function useBienEtre() {
  const context = useContext(BienEtreContext);

  if (!context) {
    throw new Error(
      "useBienEtre doit être utilisé à l'intérieur d'un BienEtreProvider"
    );
  }

  return context;
}