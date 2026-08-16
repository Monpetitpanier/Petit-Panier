// utils/planningMaison.ts

import AsyncStorage from '@react-native-async-storage/async-storage';


// =======================================
// JOURS DE LA SEMAINE
// =======================================

// 0 = dimanche ... 6 = samedi
export type JourSemaine =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6;


// =======================================
// LIEUX HABITUELS
// =======================================

export interface LieuMaison {
  id: string;
  nom: string;
  adresse?: string;
  latitude: number;
  longitude: number;
}


// =======================================
// PLANNING / RÉGLAGES MAISON
// =======================================

export interface PlanningMaison {

  // -------------------------------------
  // Rappel ménage
  // -------------------------------------

  menageActif: boolean;

  /*
   * Conservé pour l'instant afin de rester
   * compatible avec le système actuel.
   *
   * Cette notion sera simplifiée lorsque
   * nous modifierons l'écran des rappels.
   */
  menageJours: JourSemaine[];

  menageHeure: string;


  // -------------------------------------
  // Rappel To-do
  // -------------------------------------

  todoActif: boolean;

  todoHeure: string;


  // -------------------------------------
  // Rappel du pain
  // -------------------------------------

  rappelPainActif: boolean;

  rappelPainHeure: string;


  // -------------------------------------
  // Géolocalisation
  // -------------------------------------

  geolocalisationActive: boolean;

  magasinsHabituels: LieuMaison[];

  boulangeriesHabituelles: LieuMaison[];

}


// =======================================
// STOCKAGE
// =======================================

const STORAGE_KEY =
  '@petit_panier_planning_maison';


// =======================================
// VALEURS PAR DÉFAUT
// =======================================

export const PLANNING_PAR_DEFAUT:
  PlanningMaison = {

  // -------------------------------------
  // Ménage
  // -------------------------------------

  menageActif: false,

  menageJours: [
    6,
    0,
  ],

  menageHeure: '18:30',


  // -------------------------------------
  // To-do
  // -------------------------------------

  todoActif: false,

  todoHeure: '12:30',


  // -------------------------------------
  // Pain
  // -------------------------------------

  rappelPainActif: false,

  rappelPainHeure: '17:00',


  // -------------------------------------
  // Géolocalisation
  // -------------------------------------

  geolocalisationActive: false,

  magasinsHabituels: [],

  boulangeriesHabituelles: [],

};


// =======================================
// CHARGER LE PLANNING
// =======================================

export async function chargerPlanning():
  Promise<PlanningMaison> {

  try {

    const json =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );


    if (!json) {

      return {
        ...PLANNING_PAR_DEFAUT,
      };

    }


    const donnees =
      JSON.parse(json);


    /*
     * Fusion avec les valeurs par défaut.
     *
     * Cela permet aux anciennes installations
     * de récupérer automatiquement les nouveaux
     * réglages sans perdre les réglages existants.
     */

    return {

      ...PLANNING_PAR_DEFAUT,

      ...donnees,

      magasinsHabituels:
        Array.isArray(
          donnees.magasinsHabituels
        )
          ? donnees.magasinsHabituels
          : [],

      boulangeriesHabituelles:
        Array.isArray(
          donnees.boulangeriesHabituelles
        )
          ? donnees.boulangeriesHabituelles
          : [],

    };

  } catch (e) {

    console.warn(
      'Erreur chargement planning Maison',
      e
    );

    return {
      ...PLANNING_PAR_DEFAUT,
    };

  }

}


// =======================================
// SAUVEGARDER LE PLANNING
// =======================================

export async function sauvegarderPlanning(
  planning: PlanningMaison
): Promise<void> {

  try {

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(planning)
    );

  } catch (e) {

    console.warn(
      'Erreur sauvegarde planning Maison',
      e
    );

  }

}