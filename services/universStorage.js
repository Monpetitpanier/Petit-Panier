
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLE_UNIVERS = "PETIT_PANIER_UNIVERS";

export async function chargerUnivers() {
  try {
    const donnees = await AsyncStorage.getItem(CLE_UNIVERS);

    if (donnees) {
      return JSON.parse(donnees);
    }

    return [];
  } catch (erreur) {
    console.error("Erreur lors du chargement des univers :", erreur);
    return [];
  }
}

export async function sauvegarderUnivers(univers) {
  try {
    await AsyncStorage.setItem(
      CLE_UNIVERS,
      JSON.stringify(univers)
    );
  } catch (erreur) {
    console.error("Erreur lors de la sauvegarde des univers :", erreur);
    throw erreur;
  }
}
