// Modèle de données de Petit Panier
// Reflète les modules définis dans les issues : Panier, Univers, Santé,
// Coin Douillet, Mon Chemin, La Bourse.

export type NoteKind =
  | 'idee'
  | 'rendezvous'
  | 'depense'
  | 'inspiration'
  | 'emotion'
  | 'photo'
  | 'vocal'
  | 'document'
  | 'lien'
  | 'tache';

// Une pensée déposée dans Mon Panier — le point d'entrée universel
export interface Note {
  id: string;
  contenu: string;
  kind: NoteKind;
  createdAt: string; // ISO date
  universId?: string; // Univers auquel Fifi (ou l'utilisateur) l'a rattachée
  classee: boolean; // false tant qu'elle reste "en vrac" dans le Panier
  pieceJointeUri?: string; // photo, document, note vocale...
}

// Un Univers : espace personnalisable créé par l'utilisateur
export interface Univers {
  id: string;
  nom: string;
  couleur: string;
  icone: string; // nom d'emoji ou d'icône
  description?: string;
  archive: boolean;
  createdAt: string;
}

// Un profil du Carnet de Santé (utilisateur, proche, ou animal)
export interface ProfilSante {
  id: string;
  prenom: string;
  couleur: string;
  photoUri?: string;
  description?: string;
}

export interface RendezVousMedical {
  id: string;
  profilId: string;
  professionnel: string;
  date: string; // ISO
  adresse?: string;
  motif?: string;
  rappelActif: boolean;
}

export interface Traitement {
  id: string;
  profilId: string;
  nom: string;
  posologie: string;
  dureeJours?: number;
  heuresPrise: string[]; // ex: ["08:00", "20:00"]
  notes?: string;
}

// Une entrée du Coin Douillet (bien-être)
export interface EntreeEmotion {
  id: string;
  texte: string;
  humeur?: 'sereine' | 'neutre' | 'difficile'; // ressenti, jamais un diagnostic
  createdAt: string;
}

// Un événement de Mon Chemin (calendrier)
export interface Evenement {
  id: string;
  titre: string;
  date: string; // ISO
  type: 'rendezvous' | 'anniversaire' | 'rappel' | 'evenement-univers';
  recurrence?: 'unique' | 'quotidien' | 'hebdomadaire' | 'mensuel' | 'annuel';
  universId?: string;
}

// Une dépense de La Bourse
export interface Depense {
  id: string;
  montant: number;
  date: string; // ISO
  categorie: string;
  note?: string;
  ticketUri?: string;
  recurrente: boolean;
}
