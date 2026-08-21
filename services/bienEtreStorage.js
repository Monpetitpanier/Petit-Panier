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
const CLE_PENSEES_FAVORITES =
  "@petit_panier_pensees_favorites";

export async function chargerPenseesFavorites() {
  try {
    const donnees = await AsyncStorage.getItem(
      CLE_PENSEES_FAVORITES
    );

    return donnees ? JSON.parse(donnees) : [];
  } catch (erreur) {
    console.log(
      "Erreur chargement pensées favorites :",
      erreur
    );

    return [];
  }
}

export async function sauvegarderPenseesFavorites(
  penseesFavorites
) {
  try {
    await AsyncStorage.setItem(
      CLE_PENSEES_FAVORITES,
      JSON.stringify(penseesFavorites)
    );
  } catch (erreur) {
    console.log(
      "Erreur sauvegarde pensées favorites :",
      erreur
    );
  }
}