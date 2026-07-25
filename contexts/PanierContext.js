import React, { createContext, useContext, useState, useEffect } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import {
  chargerNotes,
  sauvegarderNotes,
} from "../services/panierStorage";

import { analyserPensee } from "../services/analyseurPanier";

const PanierContext = createContext(null);

// Durée minimale (ms) pendant laquelle on affiche l'état "en analyse",
// même si le traitement réel est instantané — laisse le temps à l'animation d'être visible.
const DUREE_MIN_ANALYSE = 900;

export function PanierProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [chargementTermine, setChargementTermine] = useState(false);
  const [enAnalyse, setEnAnalyse] = useState(false);

  useEffect(() => {
    chargerNotes().then((notesChargees) => {
      setNotes(notesChargees);
      setChargementTermine(true);
    });
  }, []);

  function ajouterNote(
    contenu,
    type = "texte",
    pieceJointe = null
  ) {
    setEnAnalyse(true);

    const analyse = analyserPensee(contenu);

    const nouvelleNote = {
      id: uuidv4(),

      contenu,
      type,

      pieceJointe,

      dateCreation: new Date().toISOString(),
      dateModification: null,

      analyse,

      statut: "non_classee",
      univers: null,

      favori: false,
      archivee: false,
    };

    const nouvellesNotes = [nouvelleNote, ...notes];

    setNotes(nouvellesNotes);
    sauvegarderNotes(nouvellesNotes);

    setTimeout(() => setEnAnalyse(false), DUREE_MIN_ANALYSE);

    return analyse;
  }

  function supprimerNote(id) {
    const nouvellesNotes = notes.filter(
      (note) => note.id !== id
    );

    setNotes(nouvellesNotes);
    sauvegarderNotes(nouvellesNotes);
  }

  function modifierNote(id, modifications) {
    const nouvellesNotes = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            ...modifications,
            dateModification: new Date().toISOString(),
          }
        : note
    );

    setNotes(nouvellesNotes);
    sauvegarderNotes(nouvellesNotes);
  }

  return (
    <PanierContext.Provider
      value={{
        notes,
        chargementTermine,
        enAnalyse,
        ajouterNote,
        supprimerNote,
        modifierNote,
      }}
    >
      {children}
    </PanierContext.Provider>
  );
}

export function usePanier() {
  const context = useContext(PanierContext);

  if (!context) {
    throw new Error(
      "usePanier doit être utilisé à l'intérieur d'un PanierProvider"
    );
  }

  return context;
}