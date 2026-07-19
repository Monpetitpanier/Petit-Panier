import AsyncStorage from '@react-native-async-storage/async-storage';

// Toutes les données de Petit Panier restent sur l'appareil de l'utilisateur.
// Aucune donnée n'est envoyée à un serveur. Ce module centralise la lecture
// et l'écriture locale pour chaque type de donnée de l'appli.

const KEYS = {
  notes: 'petit-panier:notes',
  univers: 'petit-panier:univers',
  profilsSante: 'petit-panier:profils-sante',
  rendezVous: 'petit-panier:rendez-vous',
  traitements: 'petit-panier:traitements',
  emotions: 'petit-panier:emotions',
  evenements: 'petit-panier:evenements',
  depenses: 'petit-panier:depenses',
  onboardingVu: 'petit-panier:onboarding-vu',
} as const;

async function getAll<T>(key: string): Promise<T[]> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch (e) {
    console.warn(`Petit Panier — lecture impossible pour ${key}`, e);
    return [];
  }
}

async function saveAll<T>(key: string, items: T[]): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(items));
}

// API générique : ajouter / mettre à jour / supprimer un élément par id
export function createCollectionStore<T extends { id: string }>(key: string) {
  return {
    getAll: () => getAll<T>(key),
    add: async (item: T) => {
      const items = await getAll<T>(key);
      items.push(item);
      await saveAll(key, items);
      return item;
    },
    update: async (id: string, patch: Partial<T>) => {
      const items = await getAll<T>(key);
      const next = items.map((it) => (it.id === id ? { ...it, ...patch } : it));
      await saveAll(key, next);
    },
    remove: async (id: string) => {
      const items = await getAll<T>(key);
      await saveAll(key, items.filter((it) => it.id !== id));
    },
  };
}

export { KEYS };

export const onboarding = {
  aEteVu: async () => (await AsyncStorage.getItem(KEYS.onboardingVu)) === 'true',
  marquerVu: async () => AsyncStorage.setItem(KEYS.onboardingVu, 'true'),
  reinitialiser: async () => AsyncStorage.removeItem(KEYS.onboardingVu),
};
