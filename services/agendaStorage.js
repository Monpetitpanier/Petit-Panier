import AsyncStorage from "@react-native-async-storage/async-storage";

const CLE_AGENDA = "PETIT_PANIER_AGENDA";

export async function chargerRendezVous() {
  try {
    const donnees = await AsyncStorage.getItem(CLE_AGENDA);

    if (donnees) {
      return JSON.parse(donnees);
    }

    return [];
  } catch (erreur) {
    console.error("Erreur lors du chargement de l'agenda :", erreur);
    return [];
  }
}

export async function sauvegarderRendezVous(rendezVous) {
  try {
    await AsyncStorage.setItem(
      CLE_AGENDA,
      JSON.stringify(rendezVous)
    );
  } catch (erreur) {
    console.error("Erreur lors de la sauvegarde :", erreur);
  }
}