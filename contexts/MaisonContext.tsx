// contexts/MaisonContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { MaisonListes, MaisonCategorie, LISTES_VIDES } from '../types/maison';
import {
  chargerListes,
  sauvegarderListes,
  ajouterItem,
  basculerItem,
  supprimerItem,
} from '../utils/storageMaison';

interface MaisonContextType {
  listes: MaisonListes;
  chargement: boolean;
  ajouter: (categorie: MaisonCategorie, texte: string, source?: 'manuel' | 'fifi') => void;
  basculer: (categorie: MaisonCategorie, id: string) => void;
  supprimer: (categorie: MaisonCategorie, id: string) => void;
}

const MaisonContext = createContext<MaisonContextType | undefined>(undefined);

export function MaisonProvider({ children }: { children: React.ReactNode }) {
  const [listes, setListes] = useState<MaisonListes>({ ...LISTES_VIDES });
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    chargerListes().then((data) => {
      setListes(data);
      setChargement(false);
    });
  }, []);

  useEffect(() => {
    if (!chargement) {
      sauvegarderListes(listes);
    }
  }, [listes, chargement]);

  const ajouter = useCallback(
    (categorie: MaisonCategorie, texte: string, source: 'manuel' | 'fifi' = 'manuel') => {
      setListes((prev) => ajouterItem(prev, categorie, texte, source));
    },
    []
  );

  const basculer = useCallback((categorie: MaisonCategorie, id: string) => {
    setListes((prev) => basculerItem(prev, categorie, id));
  }, []);

  const supprimer = useCallback((categorie: MaisonCategorie, id: string) => {
    setListes((prev) => supprimerItem(prev, categorie, id));
  }, []);

  return (
    <MaisonContext.Provider value={{ listes, chargement, ajouter, basculer, supprimer }}>
      {children}
    </MaisonContext.Provider>
  );
}

export function useMaison() {
  const ctx = useContext(MaisonContext);
  if (!ctx) {
    throw new Error('useMaison doit être utilisé à l’intérieur de MaisonProvider');
  }
  return ctx;
}