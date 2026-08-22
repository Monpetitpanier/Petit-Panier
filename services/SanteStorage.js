import AsyncStorage from "@react-native-async-storage/async-storage";

const CLE_TRAITEMENTS = "petit_panier_traitements";
const CLE_MEDICAMENTS = "petit_panier_medicaments";
const CLE_PHARMACIE = "petit_panier_pharmacie";


// =======================================
// TRAITEMENTS
// =======================================

export async function chargerTraitements() {
  try {
    const donnees = await AsyncStorage.getItem(
      CLE_TRAITEMENTS
    );

    return donnees
      ? JSON.parse(donnees)
      : [];

  } catch (erreur) {
    console.error(
      "Erreur lors du chargement des traitements :",
      erreur
    );

    return [];
  }
}


export async function sauvegarderTraitements(
  traitements
) {
  try {
    await AsyncStorage.setItem(
      CLE_TRAITEMENTS,
      JSON.stringify(traitements)
    );

  } catch (erreur) {
    console.error(
      "Erreur lors de la sauvegarde des traitements :",
      erreur
    );
  }
}


// =======================================
// MÉDICAMENTS
// =======================================

export async function chargerMedicaments() {
  try {
    const donnees = await AsyncStorage.getItem(
      CLE_MEDICAMENTS
    );

    return donnees
      ? JSON.parse(donnees)
      : [];

  } catch (erreur) {
    console.error(
      "Erreur lors du chargement des médicaments :",
      erreur
    );

    return [];
  }
}


export async function sauvegarderMedicaments(
  medicaments
) {
  try {
    await AsyncStorage.setItem(
      CLE_MEDICAMENTS,
      JSON.stringify(medicaments)
    );

  } catch (erreur) {
    console.error(
      "Erreur lors de la sauvegarde des médicaments :",
      erreur
    );
  }
}


// =======================================
// PHARMACIE
// =======================================

export async function chargerPharmacie() {
  try {
    const donnees = await AsyncStorage.getItem(
      CLE_PHARMACIE
    );

    return donnees
      ? JSON.parse(donnees)
      : [];

  } catch (erreur) {
    console.error(
      "Erreur lors du chargement de la pharmacie :",
      erreur
    );

    return [];
  }
}


export async function sauvegarderPharmacie(
  produits
) {
  try {
    await AsyncStorage.setItem(
      CLE_PHARMACIE,
      JSON.stringify(produits)
    );

  } catch (erreur) {
    console.error(
      "Erreur lors de la sauvegarde de la pharmacie :",
      erreur
    );
  }
}