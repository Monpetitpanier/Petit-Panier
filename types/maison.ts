// types/maison.ts

export type MaisonCategorie =
  | 'courses'
  | 'produitsARacheter'
  | 'menage'
  | 'entretien'
  | 'garanties'
  | 'todo';

export interface MaisonItem {
  id: string;
  texte: string;
  fait: boolean;
  categorie: MaisonCategorie;
  dateCreation: string;
  dateFait?: string;
  source?: 'manuel' | 'fifi';
}

export type MaisonListes = Record<MaisonCategorie, MaisonItem[]>;

export const LISTES_VIDES: MaisonListes = {
  courses: [],
  produitsARacheter: [],
  menage: [],
  entretien: [],
  garanties: [],
  todo: [],
};

export const CATEGORIES_INFO: Record<
  MaisonCategorie,
  { label: string; sousTitre: string; icone: string }
> = {
  courses: { label: 'Liste de courses', sousTitre: 'Les essentiels à ne pas oublier', icone: '🛒' },
  produitsARacheter: { label: 'Produits à racheter', sousTitre: 'Les achats à renouveler', icone: '🛍️' },
  menage: { label: 'Ménage', sousTitre: 'Planifier mes tâches', icone: '🧹' },
  entretien: { label: 'Entretien', sousTitre: 'Petits travaux, entretien', icone: '🛠️' },
  garanties: { label: 'Garanties', sousTitre: 'Documents et garanties', icone: '📄' },
  todo: { label: 'To-do', sousTitre: 'À prévoir sur l’année (entretien, cadeaux, vacances...)', icone: '📌' },
};