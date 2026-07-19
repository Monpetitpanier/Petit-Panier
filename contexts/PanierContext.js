import React, { createContext, useContext, useState, useEffect } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import {
  chargerNotes,
  sauvegarderNotes,
} from "../services/panierStorage";

import { analyserPensee } from "../services/analyseurPanier";

const PanierContext = createContext(null);

export function PanierProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [chargementTermine, setChargementTermine] = useState(false);

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
    const analyse = analyserPensee(contenu);

    const nouvelleNote = {
      id: uuidv4(),

      contenu,
      type,

      // ⭐ Nouveau
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