
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLE_LECTURES = "PETIT_PANIER_LECTURES";

export async function chargerLectures() {
  try {
    const donnees = await AsyncStorage.getItem(CLE_LECTURES);
    return donnees ? JSON.parse(donnees) : [];
  } catch (erreur) {
    console.error("Erreur lors du chargement des lectures :", erreur);
    return [];
  }
}

export async function sauvegarderLectures(lectures) {
  try {
    await AsyncStorage.setItem(
      CLE_LECTURES,
      JSON.stringify(lectures)
    );
    return true;
  } catch (erreur) {
    console.error("Erreur lors de la sauvegarde des lectures :", erreur);
    return false;
  }
}
