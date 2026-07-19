import AsyncStorage from '@react-native-async-storage/async-storage';

const CLE_STOCKAGE = '@petit_panier_notes';

export async function chargerNotes() {
  try {
    const donnees = await AsyncStorage.getItem(CLE_STOCKAGE);
    return donnees ? JSON.parse(donnees) : [];
  } catch (erreur) {
    console.error('Erreur lors du chargement des notes :', erreur);
    return [];
  }
}

export async function sauvegarderNotes(notes) {
  try {
    await AsyncStorage.setItem(CLE_STOCKAGE, JSON.stringify(notes));
  } catch (erreur) {
    console.error('Erreur lors de la sauvegarde des notes :', erreur);
  }
}