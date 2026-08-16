// types/maison.ts

// =======================================
// CATÉGORIES MAISON
// =======================================

export type MaisonCategorie =
  | 'courses'
  | 'menage'
  | 'entretien'
  | 'garanties'
  | 'todo';


// =======================================
// SOURCE
// =======================================

export type MaisonSource =
  | 'manuel'
  | 'fifi';


// =======================================
// TYPE DE PRODUIT
// =======================================

export type TypeProduitCourse =
  | 'essentiel'
  | 'ponctuel';


// =======================================
// FRÉQUENCE MÉNAGE
// =======================================

export type FrequenceMenage =
  | 'quotidien'
  | 'hebdomadaire'
  | 'semestriel'
  | 'annuel';


// =======================================
// ÉLÉMENT MAISON
// =======================================

export interface MaisonItem {
  id: string;
  texte: string;
  fait: boolean;
  categorie: MaisonCategorie;
  dateCreation: string;
  dateFait?: string;
  source?: MaisonSource;
}


// =======================================
// PRODUIT DE COURSE
// =======================================

export interface ProduitCourse extends MaisonItem {
  categorie: 'courses';

  typeProduit: TypeProduitCourse;

  /*
   * Étape 1 :
   * l'utilisateur souhaite acheter
   * ce produit lors de ses prochaines courses.
   */
  selectionne: boolean;

  /*
   * Étape 2 :
   * l'utilisateur a effectivement pris
   * le produit dans le magasin.
   */
  achete: boolean;
}


// =======================================
// TÂCHE DE MÉNAGE
// =======================================

export interface TacheMenage extends MaisonItem {
  categorie: 'menage';

  frequence: FrequenceMenage;

  prochaineOccurrence?: string;
}


// =======================================
// LISTES MAISON
// =======================================

export interface MaisonListes {
  courses: ProduitCourse[];
  menage: TacheMenage[];
  entretien: MaisonItem[];
  garanties: MaisonItem[];
  todo: MaisonItem[];
}


// =======================================
// LISTES VIDES
// =======================================

export const LISTES_VIDES: MaisonListes = {
  courses: [],
  menage: [],
  entretien: [],
  garanties: [],
  todo: [],
};


// =======================================
// INFORMATIONS DES CATÉGORIES
// =======================================

export const CATEGORIES_INFO: Record<
  MaisonCategorie,
  {
    label: string;
    sousTitre: string;
    icone: string;
  }
> = {

  courses: {
    label: 'Liste de courses',
    sousTitre: 'Les essentiels à ne pas oublier',
    icone: '🛒',
  },

  menage: {
    label: 'Ménage',
    sousTitre: 'Planifier mes tâches',
    icone: '🧹',
  },

  entretien: {
    label: 'Entretien',
    sousTitre: 'Petits travaux, entretien',
    icone: '🛠️',
  },

  garanties: {
    label: 'Garanties',
    sousTitre: 'Documents et garanties',
    icone: '📄',
  },

  todo: {
    label: 'To-do',
    sousTitre:
      'À prévoir sur l’année (entretien, cadeaux, vacances...)',
    icone: '📌',
  },

};