// contexts/MaisonContext.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

import {
  MaisonListes,
  MaisonCategorie,
  LISTES_VIDES,
  TypeProduitCourse,
  FrequenceMenage,
} from '../types/maison';

import {
  chargerListes,
  sauvegarderListes,
  ajouterItem,
  basculerItem,
  basculerSelectionCourse,
  supprimerItem,
  terminerCourses,
} from '../utils/storageMaison';

import {
  PlanningMaison,
  chargerPlanning,
  sauvegarderPlanning,
  PLANNING_PAR_DEFAUT,
} from '../utils/planningMaison';

import {
  initialiserCanalNotifications,
  demanderPermissionNotifications,
  programmerRappelMenage,
  programmerRappelMenageDu,
  programmerRappelTodo,
  programmerRappelPain,
  annulerRappelMenage,
  annulerRappelTodo,
  annulerRappelPain,
} from '../services/notificationsMaison';

import {
  demanderPermissionLocalisation,
  demarrerGeofencing,
  arreterGeofencing,
} from '../navigation/geofencingMaison';


// =======================================
// TYPE DU CONTEXTE
// =======================================

interface MaisonContextType {

  listes: MaisonListes;

  chargement: boolean;

  ajouter: (
    categorie: MaisonCategorie,
    texte: string,
    source?: 'manuel' | 'fifi',
    typeProduit?: TypeProduitCourse,
    frequence?: FrequenceMenage
  ) => void;

  basculer: (
    categorie: MaisonCategorie,
    id: string
  ) => void;

  basculerSelectionCourse: (
    id: string
  ) => void;

  supprimer: (
    categorie: MaisonCategorie,
    id: string
  ) => void;

  terminerCourses: () => void;

  recapVisible: boolean;

  ouvrirRecap: () => void;

  fermerRecap: () => void;

  planning: PlanningMaison;

  mettreAJourPlanning: (
    nouveau: Partial<PlanningMaison>
  ) => Promise<void>;

}


// =======================================
// CONTEXTE
// =======================================

const MaisonContext =
  createContext<MaisonContextType | undefined>(
    undefined
  );


// =======================================
// CATÉGORIES DU RÉCAPITULATIF
// =======================================

export const CATEGORIES_RECAP_SORTIE: MaisonCategorie[] = [
  'courses',
];


// =======================================
// PROVIDER
// =======================================

export function MaisonProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [listes, setListes] =
    useState<MaisonListes>({
      ...LISTES_VIDES,
    });

  const [chargement, setChargement] =
    useState(true);

  const [recapVisible, setRecapVisible] =
    useState(false);

  const [planning, setPlanning] =
    useState<PlanningMaison>(
      PLANNING_PAR_DEFAUT
    );


  // =======================================
  // CHARGEMENT INITIAL
  // =======================================

  useEffect(() => {

    initialiserCanalNotifications();

    Promise.all([
      chargerListes(),
      chargerPlanning(),
    ])
      .then(
        ([
          listesChargees,
          planningCharge,
        ]) => {

          setListes(listesChargees);

          setPlanning(planningCharge);

          setChargement(false);

        }
      );

  }, []);


  // =======================================
  // SAUVEGARDE DES LISTES
  // =======================================

  useEffect(() => {

    if (!chargement) {

      sauvegarderListes(listes);

    }

  }, [
    listes,
    chargement,
  ]);


  // =======================================
  // RAPPEL MÉNAGE
  // =======================================

  useEffect(() => {

    if (chargement) return;

    const nbEnAttente =
      listes.menage.filter(
        (item) => !item.fait
      ).length;


    if (planning.menageActif) {

      programmerRappelMenage(
        planning.menageJours,
        planning.menageHeure,
        nbEnAttente
      );

    } else {

      annulerRappelMenage();

    }

  }, [
    chargement,
    listes.menage,
    planning.menageActif,
    planning.menageJours,
    planning.menageHeure,
  ]);

// =======================================
// RAPPEL INTELLIGENT DES TÂCHES DUES
// =======================================

useEffect(() => {

  if (chargement) {
    return;
  }

  const maintenant = new Date();

  const tachesDues =
    listes.menage.filter((tache) => {

      if (!tache.prochaineOccurrence) {
        return true;
      }

      return (
        new Date(
          tache.prochaineOccurrence
        ) <= maintenant
      );

    });


  programmerRappelMenageDu(
    tachesDues.length
  );

}, [
  chargement,
  listes.menage,
]);

  // =======================================
  // RAPPEL TO-DO
  // =======================================

  useEffect(() => {

    if (chargement) return;

    const nbEnAttente =
      listes.todo.filter(
        (item) => !item.fait
      ).length;


    if (planning.todoActif) {

      programmerRappelTodo(
        planning.todoHeure,
        nbEnAttente
      );

    } else {

      annulerRappelTodo();

    }

  }, [
    chargement,
    listes.todo,
    planning.todoActif,
    planning.todoHeure,
  ]);


  // =======================================
  // RAPPEL DU PAIN
  // =======================================

  useEffect(() => {

    if (chargement) return;


  const painEnAttente =
  listes.courses.some(
    (item) =>
      item.texte.trim().toLowerCase() === 'pain' &&
      item.selectionne &&
      !item.achete
  );

    if (planning.rappelPainActif) {

      programmerRappelPain(
        planning.rappelPainHeure,
        painEnAttente
      );

    } else {

      annulerRappelPain();

    }

  }, [
    chargement,
    listes.courses,
    planning.rappelPainActif,
    planning.rappelPainHeure,
  ]);


  // =======================================
  // GÉOFENCING (lieux favoris)
  // =======================================

  useEffect(() => {

    if (chargement) return;

    if (planning.geolocalisationActive) {

      demarrerGeofencing(
        planning.magasinsHabituels,
        planning.boulangeriesHabituelles
      );

    } else {

      arreterGeofencing();

    }

  }, [
    chargement,
    planning.geolocalisationActive,
    planning.magasinsHabituels,
    planning.boulangeriesHabituelles,
  ]);


  // =======================================
  // AJOUTER UN ÉLÉMENT
  // =======================================

  const ajouter = useCallback(
    (
      categorie: MaisonCategorie,
      texte: string,
      source: 'manuel' | 'fifi' = 'manuel',
      typeProduit?: TypeProduitCourse,
      frequence?: FrequenceMenage
    ) => {

      if (!texte.trim()) {
        return;
      }


      setListes((prev) =>
        ajouterItem(
          prev,
          categorie,
          texte,
          source,
          typeProduit,
          frequence
        )
      );

    },
    []
  );


  // =======================================
  // BASCULER UN ÉLÉMENT
  // =======================================

  const basculer = useCallback(
    (
      categorie: MaisonCategorie,
      id: string
    ) => {

      setListes((prev) =>
        basculerItem(
          prev,
          categorie,
          id
        )
      );

    },
    []
  );


  // =======================================
  // SÉLECTIONNER UN PRODUIT POUR LES COURSES
  // =======================================

  const selectionnerCourse = useCallback(
    (id: string) => {

      setListes((prev) =>
        basculerSelectionCourse(
          prev,
          id
        )
      );

    },
    []
  );


  // =======================================
  // SUPPRIMER UN ÉLÉMENT
  // =======================================

  const supprimer = useCallback(
    (
      categorie: MaisonCategorie,
      id: string
    ) => {

      setListes((prev) =>
        supprimerItem(
          prev,
          categorie,
          id
        )
      );

    },
    []
  );


  // =======================================
  // TERMINER LES COURSES
  // =======================================

  const terminerLesCourses =
    useCallback(() => {

      setListes((prev) =>
        terminerCourses(prev)
      );

    }, []);


  // =======================================
  // RÉCAPITULATIF
  // =======================================

  const ouvrirRecap =
    useCallback(() => {

      setRecapVisible(true);

    }, []);


  const fermerRecap =
    useCallback(() => {

      setRecapVisible(false);

    }, []);


  // =======================================
  // METTRE À JOUR LE PLANNING
  // =======================================

  const mettreAJourPlanning =
    useCallback(
      async (
        nouveau: Partial<PlanningMaison>
      ) => {

        if (
          nouveau.menageActif ||
          nouveau.todoActif ||
          nouveau.rappelPainActif
        ) {

          await demanderPermissionNotifications();

        }

        if (nouveau.geolocalisationActive) {

          const accorde =
            await demanderPermissionLocalisation();

          if (!accorde) {

            nouveau = {
              ...nouveau,
              geolocalisationActive: false,
            };

          }

        }


        setPlanning((prev) => {

          const fusionne = {
            ...prev,
            ...nouveau,
          };


          sauvegarderPlanning(
            fusionne
          );


          return fusionne;

        });

      },
      []
    );


  // =======================================
  // RENDU
  // =======================================

  return (

    <MaisonContext.Provider
      value={{

        listes,

        chargement,

        ajouter,

        basculer,

        basculerSelectionCourse:
          selectionnerCourse,

        supprimer,

        terminerCourses:
          terminerLesCourses,

        recapVisible,

        ouvrirRecap,

        fermerRecap,

        planning,

        mettreAJourPlanning,

      }}
    >

      {children}

    </MaisonContext.Provider>

  );

}


// =======================================
// HOOK
// =======================================

export function useMaison() {

  const ctx =
    useContext(MaisonContext);


  if (!ctx) {

    throw new Error(
      'useMaison doit être utilisé à l’intérieur de MaisonProvider'
    );

  }


  return ctx;

}
