import AsyncStorage from "@react-native-async-storage/async-storage";

const CLE_GRATITUDES = "@petit_panier_gratitudes";

export async function chargerGratitudes() {
  try {
    const donnees = await AsyncStorage.getItem(CLE_GRATITUDES);

    return donnees ? JSON.parse(donnees) : [];
  } catch (erreur) {
    console.log("Erreur chargement gratitudes :", erreur);
    return [];
  }
}

export async function sauvegarderGratitudes(gratitudes) {
  try {
    await AsyncStorage.setItem(
      CLE_GRATITUDES,
      JSON.stringify(gratitudes)
    );
  } catch (erreur) {
    console.log("Erreur sauvegarde gratitudes :", erreur);
  }
}