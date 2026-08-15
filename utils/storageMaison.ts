// utils/storageMaison.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MaisonListes,
  MaisonItem,
  MaisonCategorie,
  LISTES_VIDES,
} from '../types/maison';

const STORAGE_KEY = '@petit_panier_maison';

export async function chargerListes(): Promise<MaisonListes> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) return { ...LISTES_VIDES };
    // fusion avec LISTES_VIDES pour rester robuste si une catégorie
    // est ajoutée plus tard sans que les données existantes la contiennent
    return { ...LISTES_VIDES, ...JSON.parse(json) } as MaisonListes;
  } catch (e) {
    console.warn('Erreur chargement listes Maison', e);
    return { ...LISTES_VIDES };
  }
}

export async function sauvegarderListes(listes: MaisonListes): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(listes));
  } catch (e) {
    console.warn('Erreur sauvegarde listes Maison', e);
  }
}

export function ajouterItem(
  listes: MaisonListes,
  categorie: MaisonCategorie,
  texte: string,
  source: 'manuel' | 'fifi' = 'manuel'
): MaisonListes {
  const nouvelItem: MaisonItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    texte,
    fait: false,
    categorie,
    dateCreation: new Date().toISOString(),
    source,
  };
  return {
    ...listes,
    [categorie]: [...listes[categorie], nouvelItem],
  };
}

export function basculerItem(
  listes: MaisonListes,
  categorie: MaisonCategorie,
  id: string
): MaisonListes {
  return {
    ...listes,
    [categorie]: listes[categorie].map((item) =>
      item.id === id
        ? {
            ...item,
            fait: !item.fait,
            dateFait: !item.fait ? new Date().toISOString() : undefined,
          }
        : item
    ),
  };
}

export function supprimerItem(
  listes: MaisonListes,
  categorie: MaisonCategorie,
  id: string
): MaisonListes {
  return {
    ...listes,
    [categorie]: listes[categorie].filter((item) => item.id !== id),  
  };
}

// Utile pour le futur récap "je sors" : renvoie tout ce qui n'est pas fait,
// toutes catégories confondues ou filtré sur un sous-ensemble
// (ex: ["courses", "produitsARacheter"] avant le geofencing supermarché).
export function itemsEnAttente(
  listes: MaisonListes,
  categories?: MaisonCategorie[]
): MaisonListes {
  const cibles = categories ?? (Object.keys(listes) as MaisonCategorie[]);
  const resultat = { ...LISTES_VIDES };
  cibles.forEach((cat) => {
    resultat[cat] = listes[cat].filter((item) => !item.fait);
  });
  return resultat;
}