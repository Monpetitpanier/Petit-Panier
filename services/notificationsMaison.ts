// services/notificationsMaison.ts

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { JourSemaine } from '../utils/planningMaison';


// =======================================
// CONFIGURATION DES NOTIFICATIONS
// =======================================

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


// =======================================
// CANAL ANDROID
// =======================================

export async function initialiserCanalNotifications() {

  if (Platform.OS === 'android') {

    await Notifications.setNotificationChannelAsync(
      'default',
      {
        name: 'Rappels petit-panier',
        importance:
          Notifications.AndroidImportance.DEFAULT,
      }
    );

  }

}


// =======================================
// PERMISSIONS
// =======================================

export async function demanderPermissionNotifications(): Promise<boolean> {

  const {
    status: statutActuel,
  } =
    await Notifications.getPermissionsAsync();

  let statutFinal =
    statutActuel;


  if (statutActuel !== 'granted') {

    const { status } =
      await Notifications.requestPermissionsAsync();

    statutFinal = status;

  }


  return statutFinal === 'granted';

}


// =======================================
// IDENTIFIANTS
// =======================================

const ID_MENAGE =
  'rappel-menage-maison';

const ID_MENAGE_DU =
  'rappel-menage-taches-dues';

const ID_TODO =
  'rappel-todo-maison';

const ID_PAIN =
  'rappel-pain-maison';


// =======================================
// OUTIL HEURE
// =======================================

function heureVersParties(
  heure: string
) {

  const [h, m] =
    heure
      .split(':')
      .map(Number);


  return {

    heure:
      Number.isFinite(h)
        ? h
        : 0,

    minute:
      Number.isFinite(m)
        ? m
        : 0,

  };

}


// =======================================
// ANNULER RAPPEL MÉNAGE
// =======================================

export async function annulerRappelMenage() {

  /*
   * Un identifiant par jour de la semaine.
   */

  for (
    let jour = 0;
    jour <= 6;
    jour++
  ) {

    await Notifications
      .cancelScheduledNotificationAsync(
        `${ID_MENAGE}-${jour}`
      )
      .catch(() => {});

  }

}

// =======================================
// RAPPEL DES TÂCHES DE MÉNAGE DUES
// =======================================

export async function programmerRappelMenageDu(
  nbEnAttente: number
) {

  // On annule d'abord l'ancien rappel
  await Notifications
    .cancelScheduledNotificationAsync(
      ID_MENAGE_DU
    )
    .catch(() => {});


  /*
   * Aucune tâche en attente :
   * aucune notification ne doit être programmée.
   */

  if (nbEnAttente === 0) {
    return;
  }


  /*
   * Fifi prévient chaque matin à 09h00.
   *
   * La notification est volontairement générale :
   * elle ne détaille pas les tâches afin de ne
   * pas surcharger l'utilisateur.
   */

  await Notifications.scheduleNotificationAsync({

    identifier:
      ID_MENAGE_DU,

    content: {

      title:
        'Petit rappel 🧹',

      body:
        'Des tâches sont en attente. Reviens quand tu veux. 🌿',

      data: {
        destination: 'menage',
      },

    },

    trigger: {

      type:
        Notifications.SchedulableTriggerInputTypes.DAILY,

      hour: 9,

      minute: 0,

    },

  });

}

// =======================================
// ANNULER RAPPEL TO-DO
// =======================================

export async function annulerRappelTodo() {

  await Notifications
    .cancelScheduledNotificationAsync(
      ID_TODO
    )
    .catch(() => {});

}


// =======================================
// ANNULER RAPPEL PAIN
// =======================================

export async function annulerRappelPain() {

  await Notifications
    .cancelScheduledNotificationAsync(
      ID_PAIN
    )
    .catch(() => {});

}


// =======================================
// RAPPEL MÉNAGE
// =======================================

export async function programmerRappelMenage(
  jours: JourSemaine[],
  heure: string,
  nbEnAttente: number
) {

  await annulerRappelMenage();


  /*
   * Rien à rappeler :
   * aucune notification n'est programmée.
   */

  if (
    nbEnAttente === 0 ||
    jours.length === 0
  ) {

    return;

  }


  const {
    heure: h,
    minute,
  } =
    heureVersParties(heure);


  /*
   * Expo attend :
   *
   * 1 = dimanche
   * 2 = lundi
   * ...
   * 7 = samedi
   *
   * Notre JourSemaine utilise :
   *
   * 0 = dimanche
   * ...
   * 6 = samedi
   */

  for (const jour of jours) {

    await Notifications.scheduleNotificationAsync({

      identifier:
        `${ID_MENAGE}-${jour}`,

      content: {

        title:
          'Petit rappel ménage 🧹',

        body:
          `Tu as ${nbEnAttente} tâche${
            nbEnAttente > 1
              ? 's'
              : ''
          } ménagère${
            nbEnAttente > 1
              ? 's'
              : ''
          } en attente.`,

        data: {
          destination: 'menage',
        },

      },

      trigger: {
  type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
  weekday: jour + 1,
  hour: h,
  minute,
},

    });

  }

}


// =======================================
// RAPPEL TO-DO
// =======================================

export async function programmerRappelTodo(
  heure: string,
  nbEnAttente: number
) {

  await annulerRappelTodo();


  if (nbEnAttente === 0) {

    return;

  }


  const {
    heure: h,
    minute,
  } =
    heureVersParties(heure);


  await Notifications.scheduleNotificationAsync({

    identifier:
      ID_TODO,

    content: {

      title:
        'Petit rappel to-do 📌',

      body:
        `Tu as ${nbEnAttente} chose${
          nbEnAttente > 1
            ? 's'
            : ''
        } à prévoir dans ta to-do.`,

      data: {
        destination: 'todo',
      },

    },

 trigger: {
  type: Notifications.SchedulableTriggerInputTypes.DAILY,
  hour: h,
  minute,
},

  });

}


// =======================================
// RAPPEL DU PAIN
// =======================================

export async function programmerRappelPain(
  heure: string,
  painEnAttente: boolean
) {

  await annulerRappelPain();


  /*
   * Si le rappel est activé mais qu'il n'y
   * a pas de pain à prendre, aucune
   * notification n'est programmée.
   */

  if (!painEnAttente) {

    return;

  }


  const {
    heure: h,
    minute,
  } =
    heureVersParties(heure);


  await Notifications.scheduleNotificationAsync({

    identifier:
      ID_PAIN,

    content: {

      title:
        'Petit rappel 🥖',

      body:
        'Pense à prendre du pain!',

      data: {
        destination: 'courses',
      },

    },

    trigger: {
  type:
        Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: h,

      minute,
    },

  });

}