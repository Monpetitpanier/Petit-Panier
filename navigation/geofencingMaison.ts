// services/geofencingMaison.ts
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { LieuMaison } from '../utils/planningMaison';
import { chargerPlanning } from '../utils/planningMaison';
import { chargerListes } from '../utils/storageMaison';

const NOM_TACHE_GEOFENCE = 'geofence-maison';
const PREFIXE_MAGASIN = 'magasin-';
const PREFIXE_BOULANGERIE = 'boulangerie-';

// Définie une seule fois, au chargement du module (importé depuis
// MaisonContext.tsx, donc dès le démarrage de l'app).
TaskManager.defineTask(NOM_TACHE_GEOFENCE, async ({ data, error }) => {
  if (error) {
    console.warn('Erreur geofencing', error);
    return;
  }

  const { eventType, region } = data as {
    eventType: Location.GeofencingEventType;
    region: Location.LocationRegion;
  };

  if (eventType !== Location.GeofencingEventType.Enter || !region.identifier) {
    return;
  }

  if (region.identifier.startsWith(PREFIXE_MAGASIN)) {
    await gererEntreeMagasin(region.identifier);
  } else if (region.identifier.startsWith(PREFIXE_BOULANGERIE)) {
    await gererEntreeBoulangerie(region.identifier);
  }
});

async function gererEntreeMagasin(identifiant: string) {
  const planning = await chargerPlanning();
  const lieu = planning.magasinsHabituels.find(
    (l) => `${PREFIXE_MAGASIN}${l.id}` === identifiant
  );
  if (!lieu) return;

  const listes = await chargerListes();
  const items = [
    ...listes.courses.filter((i) => !i.fait),
  ];

  if (items.length === 0) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Tu passes près de ${lieu.nom} 📍`,
      body: items.map((i) => i.texte).join(', '),
      data: { destination: 'courses' },
    },
    trigger: null, // immédiat
  });
}

async function gererEntreeBoulangerie(identifiant: string) {
  const planning = await chargerPlanning();
  const lieu = planning.boulangeriesHabituelles.find(
    (l) => `${PREFIXE_BOULANGERIE}${l.id}` === identifiant
  );
  if (!lieu) return;

  const listes = await chargerListes();
  const painEnAttente = listes.courses.some(
    (item) =>
      item.texte.trim().toLowerCase().includes('pain') &&
      !item.fait
  );

  if (!painEnAttente) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Tu passes près de ${lieu.nom} 🥖`,
      body: 'Pense à prendre du pain !',
      data: { destination: 'courses' },
    },
    trigger: null,
  });
}

export async function demanderPermissionLocalisation(): Promise<boolean> {
  const { status: statutPremierPlan } =
    await Location.requestForegroundPermissionsAsync();
  if (statutPremierPlan !== 'granted') return false;

  const { status: statutArrierePlan } =
    await Location.requestBackgroundPermissionsAsync();
  return statutArrierePlan === 'granted';
}

const RAYON_METRES = 150;

export async function demarrerGeofencing(
  magasins: LieuMaison[],
  boulangeries: LieuMaison[]
) {
  const dejaActif = await Location.hasStartedGeofencingAsync(
    NOM_TACHE_GEOFENCE
  ).catch(() => false);

  if (dejaActif) {
    await Location.stopGeofencingAsync(NOM_TACHE_GEOFENCE).catch(() => {});
  }

  const regions: Location.LocationRegion[] = [
    ...magasins.map((lieu) => ({
      identifier: `${PREFIXE_MAGASIN}${lieu.id}`,
      latitude: lieu.latitude,
      longitude: lieu.longitude,
      radius: RAYON_METRES,
      notifyOnEnter: true,
      notifyOnExit: false,
    })),
    ...boulangeries.map((lieu) => ({
      identifier: `${PREFIXE_BOULANGERIE}${lieu.id}`,
      latitude: lieu.latitude,
      longitude: lieu.longitude,
      radius: RAYON_METRES,
      notifyOnEnter: true,
      notifyOnExit: false,
    })),
  ];

  if (regions.length === 0) return;

  await Location.startGeofencingAsync(NOM_TACHE_GEOFENCE, regions);
}

export async function arreterGeofencing() {
  const dejaActif = await Location.hasStartedGeofencingAsync(
    NOM_TACHE_GEOFENCE
  ).catch(() => false);

  if (dejaActif) {
    await Location.stopGeofencingAsync(NOM_TACHE_GEOFENCE);
  }
}

export async function geocoderAdresse(
  adresse: string
): Promise<{ latitude: number; longitude: number } | null> {
  try {
    const resultats = await Location.geocodeAsync(adresse);
    if (resultats.length === 0) return null;
    return { latitude: resultats[0].latitude, longitude: resultats[0].longitude };
  } catch (e) {
    console.warn('Erreur géocodage adresse', e);
    return null;
  }
}