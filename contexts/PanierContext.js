
import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import {
  chargerNotes,
  sauvegarderNotes,
} from "../services/panierStorage";

import { analyserPensee } from "../services/analyseurPanier";
import {
  chargerUnivers,
  sauvegarderUnivers,
} from "../services/universStorage";
import {
  chargerLectures,
  sauvegarderLectures,
} from "../services/lecturesStorage";
import { useAgenda } from "./AgendaContext";
import { useMaison } from "./MaisonContext";
import { useSante } from "./SanteContext";

const PanierContext = createContext(null);
const DUREE_MIN_ANALYSE = 900;

function normaliserTexte(texte) {
  return texte
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function extraireCommandeObjectif(contenu) {
  const correspondance = contenu.match(
    /^\s*pour l['’]objectif\s+(?:"([^"]+)"|'([^']+)'|([^,]+?))\s*,\s*(.+)$/i
  );

  if (!correspondance) return null;

  return {
    titre: (
      correspondance[1] ||
      correspondance[2] ||
      correspondance[3]
    ).trim(),
    texte: correspondance[4].trim(),
  };
}

// Reconnaît les formulations explicites d'achat d'un livre.
function extraireCommandeLivre(contenu) {
  const correspondance = contenu.match(
    /\b(?:je viens d['’]acheter|j['’]ai acheté)\s+(?:le|un|ce)\s+livre\b\s*(?:[:,-]\s*)?([\s\S]*)$/i
  );

  if (!correspondance) return null;

  const titre = (correspondance[1] || "")
    .trim()
    .replace(/^[\s"'«»]+|[\s"'«»]+$/g, "")
    .replace(/[.!?]+$/g, "")
    .trim();

  return { titre };
}

export function PanierProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [chargementTermine, setChargementTermine] = useState(false);
  const [enAnalyse, setEnAnalyse] = useState(false);

  const { ajouterRendezVous } = useAgenda();

  const {
    ajouter: ajouterDansMaison,
    ouvrirRecap,
  } = useMaison();

  const {
    traitements,
    medicaments,
    ajouterTraitement,
    renouvelerTraitement,
    ajouterMedicament,
    ajouterProduitPharmacie,
  } = useSante();

  useEffect(() => {
    let actif = true;

    async function charger() {
      try {
        const notesChargees = await chargerNotes();
        if (actif) setNotes(notesChargees);
      } catch (erreur) {
        console.error("Erreur lors du chargement des notes :", erreur);
      } finally {
        if (actif) setChargementTermine(true);
      }
    }

    charger();

    return () => {
      actif = false;
    };
  }, []);

  async function ajouterNote(contenu, type = "texte", pieceJointe = null) {
    setEnAnalyse(true);

    try {
      // 1. Une commande explicite pour un objectif est prioritaire.
      const commandeObjectif =
        typeof contenu === "string"
          ? extraireCommandeObjectif(contenu)
          : null;

      if (commandeObjectif) {
        const univers = await chargerUnivers();

        const objectif = univers.find(
          (item) =>
            normaliserTexte(item.titre || "") ===
            normaliserTexte(commandeObjectif.titre)
        );

        if (objectif) {
          const noteObjectif = {
            id: uuidv4(),
            texte: commandeObjectif.texte,
            dateCreation: new Date().toISOString(),
          };

          const objectifMisAJour = {
            ...objectif,
            notes: [
              ...(Array.isArray(objectif.notes) ? objectif.notes : []),
              noteObjectif,
            ],
          };

          const universMisAJour = univers.map((item) =>
            String(item.id) === String(objectif.id)
              ? objectifMisAJour
              : item
          );

          await sauvegarderUnivers(universMisAJour);

          Alert.alert(
            "Note ajoutée !",
            `Fifi a rangé ta note dans l’objectif « ${objectif.titre} ».`
          );

          return {
            destination: "objectif",
            objectifId: objectif.id,
            note: noteObjectif,
          };
        }

        Alert.alert(
          "Objectif introuvable",
          `Fifi n’a pas trouvé l’objectif « ${commandeObjectif.titre} ». La pensée restera dans ton panier.`
        );
      }

      // 2. Achat d'un livre : ajout direct dans « À lire ».
      const commandeLivre =
        typeof contenu === "string"
          ? extraireCommandeLivre(contenu)
          : null;

      if (commandeLivre) {
        if (!commandeLivre.titre) {
          Alert.alert(
            "Quel est le titre du livre ?",
            "Indique le titre après « Je viens d'acheter le livre », et Fifi pourra l'ajouter à ta bibliothèque."
          );
        } else {
          const livres = await chargerLectures();

          const livreExistant = livres.find(
            (livre) =>
              normaliserTexte(livre.titre || "") ===
              normaliserTexte(commandeLivre.titre)
          );

          if (livreExistant) {
            Alert.alert(
              "Livre déjà présent",
              `« ${livreExistant.titre} » est déjà dans ta bibliothèque.`
            );

            return {
              destination: "bibliotheque",
              livreId: livreExistant.id,
              dejaPresent: true,
            };
          }

          const nouveauLivre = {
            id: uuidv4(),
            titre: commandeLivre.titre,
            auteur: "",
            pages: null,
            genre: "Autre",
            statut: "aLire",
            dateAjout: new Date().toISOString(),
            progression: 0,
            note: null,
            avis: "",
            dateFin: null,
          };

          const sauvegardeOk = await sauvegarderLectures([
            ...livres,
            nouveauLivre,
          ]);

          if (sauvegardeOk) {
            Alert.alert(
              "Livre ajouté ! 📚",
              `Fifi a ajouté « ${nouveauLivre.titre} » dans ta bibliothèque, onglet « À lire ». Tu pourras compléter sa fiche plus tard.`
            );

            return {
              destination: "bibliotheque",
              livreId: nouveauLivre.id,
              livre: nouveauLivre,
            };
          }

          Alert.alert(
            "Sauvegarde impossible",
            "Fifi n'a pas pu enregistrer ce livre dans ta bibliothèque. Ta pensée sera conservée dans le panier."
          );
        }
      }

      // 3. Analyse habituelle des autres pensées.
      const analyse = analyserPensee(contenu, medicaments);

      // Rendez-vous dans l'agenda
      if (analyse?.destination === "agenda") {
        if (
          Array.isArray(analyse.rendezVous) &&
          analyse.rendezVous.length > 0
        ) {
          analyse.rendezVous.forEach((rdv) => {
            ajouterRendezVous({
              titre: rdv.titre,
              date: rdv.date,
              heure: rdv.heure,
              categorie: rdv.categorie || "rendez-vous",
            });
          });
        } else if (analyse.date) {
          ajouterRendezVous({
            titre: analyse.titre,
            date: analyse.date,
            heure: analyse.heure,
            categorie: analyse.categorie || "rendez-vous",
          });
        }
      }

      // Produits à ajouter à la pharmacie
      if (analyse?.destination === "pharmacie") {
        ajouterProduitPharmacie({
          id: uuidv4(),
          nom: analyse.nom,
          quantite: analyse.quantite,
          datePeremption: analyse.datePeremption,
        });
      }

      // Récapitulatif de sortie
      if (analyse?.destination === "recapSortie") {
        ouvrirRecap();
      }

      // Éléments à ajouter dans la maison
      if (analyse?.destination === "maison") {
        ajouterDansMaison(
          analyse.categorie,
          analyse.texte || contenu,
          "fifi"
        );
      }

      // Nouveau médicament
      if (analyse?.destination === "medicaments") {
        ajouterMedicament({
          id: uuidv4(),
          nom: analyse.nom,
          quantite: analyse.quantite,
          datePeremption: analyse.datePeremption,
        });
      }

      // Nouveau traitement
      if (
        analyse?.destination === "traitements" &&
        analyse.type === "nouveau_traitement"
      ) {
        ajouterTraitement({
          id: uuidv4(),
          nom: analyse.nom,
          dosage: null,
          stock: analyse.stock,
          unitesParJour: analyse.unitesParJour,
          dureeJours: analyse.dureeJours,
          dateMiseAJour: new Date().toISOString(),
          actif: true,
        });
      }

      // Renouvellement d'un traitement existant
      if (
        analyse?.destination === "traitements" &&
        analyse.type === "renouvellement"
      ) {
        const traitementExistant = traitements.find(
          (traitement) =>
            traitement.nom?.toLowerCase() ===
            analyse.nom?.toLowerCase()
        );

        if (traitementExistant) {
          renouvelerTraitement(
            traitementExistant.id,
            analyse.stock,
            analyse.unitesParJour
          );
        }
      }

      // Enregistrement de la pensée dans le panier
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
      await sauvegarderNotes(nouvellesNotes);

      return analyse;
    } catch (erreur) {
      console.error("Erreur lors de l'ajout de la note :", erreur);
      Alert.alert(
        "Oups !",
        "Fifi n’a pas réussi à enregistrer cette pensée. Réessaie."
      );
      return null;
    } finally {
      setTimeout(() => {
        setEnAnalyse(false);
      }, DUREE_MIN_ANALYSE);
    }
  }

  function supprimerNote(id) {
    const nouvellesNotes = notes.filter((note) => note.id !== id);
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
