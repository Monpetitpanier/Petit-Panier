import { createCollectionStore, KEYS } from './storage';
import type {
  Note,
  Univers,
  ProfilSante,
  RendezVousMedical,
  Traitement,
  EntreeEmotion,
  Evenement,
  Depense,
} from '@/types';

export const notesStore = createCollectionStore<Note>(KEYS.notes);
export const universStore = createCollectionStore<Univers>(KEYS.univers);
export const profilsSanteStore = createCollectionStore<ProfilSante>(KEYS.profilsSante);
export const rendezVousStore = createCollectionStore<RendezVousMedical>(KEYS.rendezVous);
export const traitementsStore = createCollectionStore<Traitement>(KEYS.traitements);
export const emotionsStore = createCollectionStore<EntreeEmotion>(KEYS.emotions);
export const evenementsStore = createCollectionStore<Evenement>(KEYS.evenements);
export const depensesStore = createCollectionStore<Depense>(KEYS.depenses);
