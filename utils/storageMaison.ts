// utils/storageMaison.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  MaisonListes,
  MaisonItem,
  MaisonCategorie,
  ProduitCourse,
  TacheMenage,
  TypeProduitCourse,
  FrequenceMenage,
  Garantie,
  EntretienMaison,
  CategorieRayon,
  LISTES_VIDES,
} from '../types/maison';

import { devinerRayon } from './rayonCourses';


// =======================================
// CLÉ DE STOCKAGE
// =======================================

const STORAGE_KEY =
  '@petit_panier_maison';
const STORAGE_KEY_GARANTIES =
  '@petit_panier_garanties';  

// =======================================
// COURSES : PRODUITS ESSENTIELS PAR DÉFAUT
// =======================================

const COURSES_ESSENTIELLES = [
  'Lait',
  'Œufs',
  'Beurre',
  'Crème fraîche',
  'Fromage',
  'Yaourts',

  'Pain',

  'Pâtes',
  'Riz',
  'Farine',
  'Sucre',
  'Huile',
  'Vinaigre',
  'Sel',
  'Poivre',
  'Café',
  'Thé',

  'Banane',
  'Pomme',
  'Orange',
  'Poire',
  'Carotte',
  'Concombre',
  'Tomate',
  'Avocat',
  'Pêches',

  'Conserves de tomates',
  'Thon',
  'Légumes en conserve',
  'Compote',

  'Papier toilette',
  'Essuie-tout',
  'Sacs poubelle',
  'Produit vaisselle',
  'Lessive',

  'Couches',
  'Lingettes',
  'Biberons',
  'Lait infantile',
  'Petits pots',
  'Compotes bébé',
];

// =======================================
// MÉNAGE : TÂCHES DE BASE
// =======================================

const MENAGE_BASE: {
  texte: string;
  frequence: FrequenceMenage;
}[] = [

  // -------------------------------------
  // Tous les jours
  // -------------------------------------

  {
    texte: 'Faire les lits',
    frequence: 'quotidien',
  },

  {
    texte: 'Ranger les pièces de vie',
    frequence: 'quotidien',
  },

  {
    texte: 'Faire / vider la vaisselle',
    frequence: 'quotidien',
  },

  {
    texte: 'Essuyer le plan de travail',
    frequence: 'quotidien',
  },

  {
    texte: 'Nettoyer rapidement la table',
    frequence: 'quotidien',
  },

  {
    texte: 'Aérer les pièces',
    frequence: 'quotidien',
  },


  // -------------------------------------
  // Toutes les semaines
  // -------------------------------------

  {
    texte: 'Aspirer',
    frequence: 'hebdomadaire',
  },

  {
    texte: 'Laver les sols',
    frequence: 'hebdomadaire',
  },

  {
    texte: 'Nettoyer les WC',
    frequence: 'hebdomadaire',
  },

  {
    texte: 'Nettoyer la salle de bains',
    frequence: 'hebdomadaire',
  },

  {
    texte: 'Changer les draps',
    frequence: 'hebdomadaire',
  },

  {
    texte: 'Dépoussiérer les meubles',
    frequence: 'hebdomadaire',
  },

  {
    texte: 'Nettoyer les miroirs',
    frequence: 'hebdomadaire',
  },

  {
    texte: 'Nettoyer la cuisine en profondeur',
    frequence: 'hebdomadaire',
  },

  {
    texte: 'Sortir et nettoyer les poubelles',
    frequence: 'hebdomadaire',
  },


  // -------------------------------------
  // Tous les 6 mois
  // -------------------------------------

  {
    texte: 'Nettoyer les vitres',
    frequence: 'semestriel',
  },

  {
    texte: 'Nettoyer les placards de cuisine',
    frequence: 'semestriel',
  },

  {
    texte: 'Nettoyer / dégivrer le congélateur',
    frequence: 'semestriel',
  },

  {
    texte: 'Nettoyer derrière les gros appareils',
    frequence: 'semestriel',
  },

  {
    texte: 'Trier les produits ménagers',
    frequence: 'semestriel',
  },

  {
    texte: 'Nettoyer les grilles d’aération',
    frequence: 'semestriel',
  },


  // -------------------------------------
  // Tous les ans
  // -------------------------------------

  {
    texte: 'Nettoyer les murs et les plinthes',
    frequence: 'annuel',
  },

  {
    texte: 'Nettoyer le four en profondeur',
    frequence: 'annuel',
  },

  {
    texte: 'Nettoyer le lave-vaisselle en profondeur',
    frequence: 'annuel',
  },

  {
    texte: 'Nettoyer le lave-linge',
    frequence: 'annuel',
  },

  {
    texte: 'Nettoyer les rideaux',
    frequence: 'annuel',
  },

  {
    texte: 'Faire un grand tri des placards',
    frequence: 'annuel',
  },

];

// =======================================
// CHARGER LES LISTES
// =======================================

export async function chargerListes(): Promise<MaisonListes> {

  try {

    const json =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );


    // ===================================
    // PREMIÈRE INITIALISATION
    // ===================================

    if (!json) {

      const coursesEssentielles: ProduitCourse[] =
        COURSES_ESSENTIELLES.map((texte) => ({
          id: `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}-${texte}`,

          texte,

          fait: false,

          categorie: 'courses',

          dateCreation:
            new Date().toISOString(),

          source: 'manuel',

          typeProduit: 'essentiel',

          rayon: devinerRayon(texte),

          selectionne: false,

          achete: false,
        }));


      return {

        ...LISTES_VIDES,

        courses:
          coursesEssentielles,

      };

    }


    const donnees =
      JSON.parse(json);


    /*
     * On part toujours des catégories actuelles.
     *
     * Cela permet notamment de faire disparaître
     * proprement l'ancienne catégorie
     * "produitsARacheter".
     */

    const listes: MaisonListes = {
      ...LISTES_VIDES,
    };


   // ===================================
// COURSES
// ===================================

if (Array.isArray(donnees.courses)) {

  listes.courses =
    donnees.courses.map(
      (item: any): ProduitCourse => ({

        ...item,

        categorie: 'courses',

        typeProduit:
          item.typeProduit === 'ponctuel'
            ? 'ponctuel'
            : 'essentiel',

        selectionne:
          typeof item.selectionne === 'boolean'
            ? item.selectionne
            : false,

        achete:
          typeof item.achete === 'boolean'
            ? item.achete
            : false,

        rayon:
          item.rayon ||
          devinerRayon(item.texte),

      })
    );


  // ===================================
  // AJOUT DES ESSENTIELS MANQUANTS
  // ===================================

  const textesExistants =
    listes.courses.map(
      (item) =>
        item.texte.trim().toLowerCase()
    );


  const essentielsManquants =
    COURSES_ESSENTIELLES.filter(
      (texte) =>
        !textesExistants.includes(
          texte.trim().toLowerCase()
        )
    );


  const nouveauxEssentiels:
    ProduitCourse[] =
      essentielsManquants.map(
        (texte) => ({

          id:
            `${Date.now()}-${Math.random()
              .toString(36)
              .slice(2, 8)}-${texte}`,

          texte,

          fait: false,

          categorie: 'courses',

          dateCreation:
            new Date().toISOString(),

          source: 'manuel',

          typeProduit: 'essentiel',

          rayon:
            devinerRayon(texte),

          selectionne: false,

          achete: false,

        })
      );


  listes.courses = [
    ...listes.courses,
    ...nouveauxEssentiels,
  ];

}

// ===================================
// MÉNAGE
// ===================================

if (
  Array.isArray(donnees.menage) &&
  donnees.menage.length > 0
) {

  listes.menage =
  donnees.menage.map(
    (item: any): TacheMenage => {

      const prochaineOccurrence =
        item.prochaineOccurrence
          ? new Date(item.prochaineOccurrence)
          : new Date();


      const estDue =
        prochaineOccurrence <= new Date();


      return {

        ...item,

        categorie: 'menage',

        frequence:
          item.frequence === 'quotidien' ||
          item.frequence === 'hebdomadaire' ||
          item.frequence === 'semestriel' ||
          item.frequence === 'annuel'
            ? item.frequence
            : 'hebdomadaire',

        prochaineOccurrence:
          item.prochaineOccurrence ||
          new Date().toISOString(),

        /*
         * Si la tâche est arrivée à échéance,
         * elle redevient automatiquement
         * une tâche à faire.
         */

        fait:
          estDue
            ? false
            : item.fait,

        dateFait:
          estDue
            ? undefined
            : item.dateFait,

      };

    }
  );
} else{ 
  /*
   * Première utilisation :
   * on crée automatiquement le planning
   * de ménage de base.
   */

  listes.menage =
    creerMenageBase();

}

// =======================================
// CALCULER LA PROCHAINE OCCURRENCE
// =======================================

function calculerProchaineOccurrence(
  dateReference: Date,
  frequence: FrequenceMenage
): string {

  const prochaine = new Date(
    dateReference
  );


  switch (frequence) {

    // -----------------------------------
    // Tous les jours
    // -----------------------------------

    case 'quotidien':

      prochaine.setDate(
        prochaine.getDate() + 1
      );

      break;


    // -----------------------------------
    // Toutes les semaines
    // → prochain lundi
    // -----------------------------------

    case 'hebdomadaire': {

      const jour =
        prochaine.getDay();

      /*
       * getDay():
       * dimanche = 0
       * lundi = 1
       * ...
       * samedi = 6
       *
       * On cherche toujours
       * le lundi suivant.
       */

      const joursAvantLundi =
        jour === 0
          ? 1
          : 8 - jour;

      prochaine.setDate(
        prochaine.getDate() +
        joursAvantLundi
      );

      break;
    }


    // -----------------------------------
    // Tous les 6 mois
    // -----------------------------------

    case 'semestriel':

      prochaine.setMonth(
        prochaine.getMonth() + 6
      );

      break;


    // -----------------------------------
    // Tous les ans
    // -----------------------------------

    case 'annuel':

      prochaine.setFullYear(
        prochaine.getFullYear() + 1
      );

      break;

  }


  return prochaine.toISOString();

}

// =======================================
// CRÉER UNE TÂCHE DE MÉNAGE
// =======================================

function creerTacheMenage(
  texte: string,
  frequence: FrequenceMenage
): TacheMenage {

  return {
    id: `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}-${texte}`,

    texte,

    fait: false,

    categorie: 'menage',

    dateCreation: new Date().toISOString(),

    source: 'manuel',

    frequence,

    prochaineOccurrence:
      calculerProchaineOccurrence(
        new Date(),
        frequence
      ),
  };
}

// =======================================
// CRÉER LA LISTE DE MÉNAGE DE BASE
// =======================================

function creerMenageBase(): TacheMenage[] {

  return MENAGE_BASE.map(
    (tache) =>
      creerTacheMenage(
        tache.texte,
        tache.frequence
      )
  );

}

 // ===================================
// ENTRETIEN
// ===================================

if (Array.isArray(donnees.entretien)) {

  listes.entretien =
    donnees.entretien.map(
      (item: any): EntretienMaison => ({

        ...item,

        categorie: 'entretien',

        frequenceMois:
          typeof item.frequenceMois === 'number'
            ? item.frequenceMois
            : 12,

        rappelActif:
          typeof item.rappelActif === 'boolean'
            ? item.rappelActif
            : true,

      })
    );

}


    // ===================================
    // GARANTIES
    // ===================================

    if (Array.isArray(donnees.garanties)) {

      listes.garanties =
        donnees.garanties.map(
          (item: any): Garantie => ({

            ...item,

            categorie: 'garanties',

          })
        );

    }


    // ===================================
    // TO-DO
    // ===================================

    if (Array.isArray(donnees.todo)) {

      listes.todo =
        donnees.todo.map(
          (item: any): MaisonItem => ({

            ...item,

            categorie: 'todo',

          })
        );

    }


    return listes;

  } catch (e) {

    console.warn(
      'Erreur chargement listes Maison',
      e
    );

    return {
      ...LISTES_VIDES,
    };
  }
  }
// =======================================
// SAUVEGARDER LES LISTES
// =======================================

export async function sauvegarderListes(
  listes: MaisonListes
): Promise<void> {

  try {

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(listes)
    );

  } catch (e) {

    console.warn(
      'Erreur sauvegarde listes Maison',
      e
    );

  }

}


// =======================================
// AJOUTER UN ÉLÉMENT
// =======================================

export function ajouterItem(
  listes: MaisonListes,
  categorie: MaisonCategorie,
  texte: string,
  source: 'manuel' | 'fifi' = 'manuel',
  typeProduit?: TypeProduitCourse,
  frequence?: FrequenceMenage,
  rayon?: CategorieRayon
): MaisonListes {

  const nouvelId =
    `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;


  // ===================================
  // PRODUIT DE COURSE
  // ===================================

  if (categorie === 'courses') {

    const nouvelItem: ProduitCourse = {

      id: nouvelId,

      texte,

      fait: false,

      categorie: 'courses',

      dateCreation:
        new Date().toISOString(),

      source,

      typeProduit:
        typeProduit ?? 'ponctuel',

      rayon:
        rayon ?? devinerRayon(texte),

      /*
       * Lorsqu'un produit est ajouté à la
       * liste de préparation, il n'est pas
       * encore sélectionné.
       */

      selectionne: false,

      /*
       * Il n'est évidemment pas encore
       * dans le caddie.
       */

      achete: false,

    };


    return {

      ...listes,

      courses: [
        ...listes.courses,
        nouvelItem,
      ],

    };

  }


  // ===================================
  // TÂCHE DE MÉNAGE
  // ===================================

if (categorie === 'menage') {

  const nouvelItem: TacheMenage = {

    id: nouvelId,

    texte,

    fait: false,

    categorie: 'menage',

    dateCreation:
      new Date().toISOString(),

    source,

    frequence:
      frequence ?? 'hebdomadaire',

    prochaineOccurrence:
      undefined,

  };


  return {

    ...listes,

    menage: [
      ...listes.menage,
      nouvelItem,
    ],

  };

}


  // ===================================
  // AUTRES CATÉGORIES
  // ===================================

  const nouvelItem: MaisonItem = {

    id: nouvelId,

    texte,

    fait: false,

    categorie,

    dateCreation:
      new Date().toISOString(),

    source,

  };


  return {

    ...listes,

    [categorie]: [
      ...listes[categorie],
      nouvelItem,
    ],

  };

}

function calculerProchaineOccurrence(
  dateReference: Date,
  frequence: FrequenceMenage
): string {

  const prochaine = new Date(
    dateReference
  );

  switch (frequence) {

    case 'quotidien':

      prochaine.setDate(
        prochaine.getDate() + 1
      );

      break;


    case 'hebdomadaire': {

      const jour =
        prochaine.getDay();

      const joursAvantLundi =
        jour === 0
          ? 1
          : 8 - jour;

      prochaine.setDate(
        prochaine.getDate() +
        joursAvantLundi
      );

      break;
    }


    case 'semestriel':

      prochaine.setMonth(
        prochaine.getMonth() + 6
      );

      break;


    case 'annuel':

      prochaine.setFullYear(
        prochaine.getFullYear() + 1
      );

      break;

  }

  return prochaine.toISOString();

}

// =======================================
// BASCULER UN ÉLÉMENT
// =======================================

export function basculerItem(
  listes: MaisonListes,
  categorie: MaisonCategorie,
  id: string
): MaisonListes {

  // =====================================
  // MÉNAGE RÉCURRENT
  // =====================================

  if (categorie === 'menage') {

    return {

      ...listes,

      menage:
        listes.menage.map(
          (tache) => {

            if (tache.id !== id) {
              return tache;
            }


            // ---------------------------------
            // On termine la tâche
            // ---------------------------------

            if (!tache.fait) {

              const maintenant =
                new Date();

              return {

                ...tache,

                fait: true,

                dateFait:
                  maintenant.toISOString(),

                prochaineOccurrence:
                  calculerProchaineOccurrence(
                    maintenant,
                    tache.frequence
                  ),

              };

            }


            // ---------------------------------
            // Si on reclique sur une tâche déjà
            // faite, on l'annule.
            // ---------------------------------

            return {

              ...tache,

              fait: false,

              dateFait: undefined,

              prochaineOccurrence:
                new Date().toISOString(),

            };

          }
        ),

    };

  }

// ===================================
// COURSES
// ===================================

  if (categorie === 'courses') {

    return {
      ...listes,

      courses:
        listes.courses.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  achete: !item.achete,
                }
              : item
        ),

    };

  }

// ===================================
// GARANTIES
// ===================================

if (categorie === 'garanties') {
  return listes;
}

  // ===================================
  // AUTRES CATÉGORIES
  // ===================================
// ===================================
// ENTRETIEN ET GARANTIES
// ===================================

if (
  categorie === 'entretien') {
  return listes;
}
  return {

    ...listes,

    [categorie]:
      listes[categorie].map(
        (item) =>
          item.id === id
            ? {

                ...item,

                fait:
                  !item.fait,

                dateFait:
                  !item.fait
                    ? new Date().toISOString()
                    : undefined,

              }
            : item
      ),

  };

}

// =======================================
// TERMINER UN ENTRETIEN
// =======================================

export function terminerEntretien(
  listes: MaisonListes,
  id: string
): MaisonListes {

  const maintenant = new Date();

  return {

    ...listes,

    entretien:
      listes.entretien.map(
        (entretien) => {

          if (entretien.id !== id) {
            return entretien;
          }

          const prochaineOccurrence =
            new Date(maintenant);

          prochaineOccurrence.setMonth(
            prochaineOccurrence.getMonth() +
              entretien.frequenceMois
          );

          return {

            ...entretien,

            derniereRealisation:
              maintenant.toISOString(),

            prochaineOccurrence:
              prochaineOccurrence.toISOString(),

          };

        }
      ),

  };

}

// =======================================
// SÉLECTIONNER / DÉSÉLECTIONNER UN PRODUIT
// =======================================

export function basculerSelectionCourse(
  listes: MaisonListes,
  id: string
): MaisonListes {

  return {

    ...listes,

    courses:
      listes.courses.map(
        (item) => {

          if (item.id !== id) {
            return item;
          }


          const produit =
            item as ProduitCourse;


          return {

            ...produit,

            selectionne:
              !produit.selectionne,

          };

        }
      ),

  };

}


// =======================================
// MODIFIER LE RAYON D'UN PRODUIT
// =======================================

export function modifierRayon(
  listes: MaisonListes,
  id: string,
  nouveauRayon: CategorieRayon
): MaisonListes {

  return {

    ...listes,

    courses:
      listes.courses.map((item) =>
        item.id === id
          ? { ...item, rayon: nouveauRayon }
          : item
      ),

  };

}


// =======================================
// SUPPRIMER UN ÉLÉMENT
// =======================================

export function supprimerItem(
  listes: MaisonListes,
  categorie: MaisonCategorie,
  id: string
): MaisonListes {

  return {

    ...listes,

    [categorie]:
      listes[categorie].filter(
        (item) =>
          item.id !== id
      ),

  };

}


// =======================================
// TERMINER LES COURSES
// =======================================

export function terminerCourses(
  listes: MaisonListes
): MaisonListes {

  const courses =
    listes.courses as ProduitCourse[];


  const nouvellesCourses =
    courses
      .filter((produit) => {

        /*
         * Un produit ponctuel acheté
         * n'a plus besoin de rester.
         */

        if (
          produit.typeProduit === 'ponctuel' &&
          produit.achete
        ) {

          return false;

        }


        return true;

      })
      .map((produit) => {

        /*
         * Produit acheté :
         *
         * il revient dans la liste de préparation
         * mais n'est plus sélectionné.
         */

        if (produit.achete) {

          return {

            ...produit,

            selectionne: false,

            achete: false,

            fait: false,

            dateFait: undefined,

          };

        }


        /*
         * Produit sélectionné mais non acheté :
         *
         * on le conserve sélectionné pour
         * la prochaine course.
         */

        return {

          ...produit,

          achete: false,

          fait: false,

        };

      });


  return {

    ...listes,

    courses:
      nouvellesCourses,

  };

}


// =======================================
// ARTICLES EN ATTENTE
// =======================================

export function itemsEnAttente(
  listes: MaisonListes,
  categories?: MaisonCategorie[]
): MaisonListes {

  const cibles =
    categories ??
    (Object.keys(listes) as MaisonCategorie[]);


  const resultat: MaisonListes = {
    courses: [],
    menage: [],
    entretien: [],
    garanties: [],
    todo: [],
  };


  cibles.forEach((categorie) => {

    switch (categorie) {

      case 'courses':
        resultat.courses =
          listes.courses.filter(
            (item) => !item.achete
          );
        break;


      case 'menage':
        resultat.menage =
          listes.menage.filter(
            (item) => !item.fait
          );
        break;


     case 'entretien':

  resultat.entretien =
    listes.entretien;

  break;


     case 'garanties':
  resultat.garanties =
    listes.garanties;
  break;


      case 'todo':
        resultat.todo =
          listes.todo.filter(
            (item) => !item.fait
          );
        break;

    }

  });


  return resultat;
}