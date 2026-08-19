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
// RAYON DU PRODUIT
// =======================================

export type CategorieRayon =
  | 'frais'
  | 'epicerie'
  | 'conserves'
  | 'epices'
  | 'fruits'
  | 'legumes'
  | 'entretien'
  | 'bebe';

export const RAYONS_INFO: Record<
  CategorieRayon,
  { label: string; icone: string; ordre: number }
> = {
  frais: { label: 'Frais', icone: '🧀', ordre: 1 },
  fruits: { label: 'Fruits', icone: '🍎', ordre: 2 },
  legumes: { label: 'Légumes', icone: '🥕', ordre: 3 },
  epicerie: { label: 'Épicerie', icone: '🍞', ordre: 4 },
  conserves: { label: 'Conserves', icone: '🥫', ordre: 5 },
  epices: { label: 'Épices', icone: '🧂', ordre: 6 },
  entretien: { label: 'Entretien', icone: '🧴', ordre: 7 },
  bebe: { label: 'Bébé', icone: '🍼', ordre: 8 },
};


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

  rayon: CategorieRayon;

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
// ENTRETIEN MAISON
// =======================================

export interface EntretienMaison {
  id: string;

  texte: string;

  categorie: 'entretien';

  dateCreation: string;

  /*
   * Date à laquelle l'entretien
   * a été effectué pour la dernière fois.
   */
  dateDernierEntretien?: string;

  /*
   * Fréquence exprimée en mois.
   *
   * Exemples :
   * 12 = 1 an
   * 24 = 2 ans
   * 60 = 5 ans
   */
  frequenceMois: number;

  /*
   * Date calculée de la prochaine échéance.
   */
  prochaineOccurrence?: string;

  /*
   * Permet de savoir si l'utilisateur
   * souhaite recevoir un rappel.
   */
  rappelActif: boolean;
}

// =======================================
// GARANTIE
// =======================================

export interface Garantie {
  id: string;

  produit: string;

  dateAchat: string;

  dateFin: string;

  magasin?: string;

  reference?: string;

  note?: string;

  dateCreation: string;
}

// =======================================
// LISTES MAISON
// =======================================

export interface MaisonListes {
  courses: ProduitCourse[];
  menage: TacheMenage[];
  entretien: EntretienMaison[];
  garanties: Garantie[];
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
    sousTitre: 'Petits travaux, entretien annuel',
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
      'À prévoir sur l’année (cadeaux, vacances, travaux...)',
    icone: '📌',
  },

};