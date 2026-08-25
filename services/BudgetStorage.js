import AsyncStorage from "@react-native-async-storage/async-storage";

const CLE_CHARGES_FIXES = "petit_panier_charges_fixes";
const CLE_CHARGES_VARIABLES = "petit_panier_charges_variables";
const CLE_PRETS = "petit_panier_prets";
const CLE_REVENU = "petit_panier_revenu_mensuel";

const CLE_SOLDE_ACTUEL = "petit_panier_solde_actuel";
const CLE_EPARGNE = "petit_panier_epargne";


// =======================================
// CHARGES FIXES
// =======================================

export async function chargerChargesFixes() {
  try {
    const donnees = await AsyncStorage.getItem(
      CLE_CHARGES_FIXES
    );

    return donnees ? JSON.parse(donnees) : [];

  } catch (erreur) {
    console.error(
      "Erreur lors du chargement des charges fixes :",
      erreur
    );

    return [];
  }
}

export async function sauvegarderChargesFixes(
  chargesFixes
) {
  try {
    await AsyncStorage.setItem(
      CLE_CHARGES_FIXES,
      JSON.stringify(chargesFixes)
    );

  } catch (erreur) {
    console.error(
      "Erreur lors de la sauvegarde des charges fixes :",
      erreur
    );
  }
}


// =======================================
// CHARGES VARIABLES
// =======================================

export async function chargerChargesVariables() {
  try {
    const donnees = await AsyncStorage.getItem(
      CLE_CHARGES_VARIABLES
    );

    return donnees ? JSON.parse(donnees) : [];

  } catch (erreur) {
    console.error(
      "Erreur lors du chargement des charges variables :",
      erreur
    );

    return [];
  }
}

export async function sauvegarderChargesVariables(
  chargesVariables
) {
  try {
    await AsyncStorage.setItem(
      CLE_CHARGES_VARIABLES,
      JSON.stringify(chargesVariables)
    );

  } catch (erreur) {
    console.error(
      "Erreur lors de la sauvegarde des charges variables :",
      erreur
    );
  }
}


// =======================================
// PRÊTS & CRÉDITS
// =======================================

export async function chargerPrets() {
  try {
    const donnees = await AsyncStorage.getItem(
      CLE_PRETS
    );

    return donnees ? JSON.parse(donnees) : [];

  } catch (erreur) {
    console.error(
      "Erreur lors du chargement des prêts :",
      erreur
    );

    return [];
  }
}

export async function sauvegarderPrets(prets) {
  try {
    await AsyncStorage.setItem(
      CLE_PRETS,
      JSON.stringify(prets)
    );

  } catch (erreur) {
    console.error(
      "Erreur lors de la sauvegarde des prêts :",
      erreur
    );
  }
}


// =======================================
// REVENU MENSUEL
// =======================================

export async function chargerRevenuMensuel() {
  try {
    const donnees = await AsyncStorage.getItem(
      CLE_REVENU
    );

    return donnees ? JSON.parse(donnees) : 0;

  } catch (erreur) {
    console.error(
      "Erreur lors du chargement du revenu mensuel :",
      erreur
    );

    return 0;
  }
}

export async function sauvegarderRevenuMensuel(
  revenu
) {
  try {
    await AsyncStorage.setItem(
      CLE_REVENU,
      JSON.stringify(revenu)
    );

  } catch (erreur) {
    console.error(
      "Erreur lors de la sauvegarde du revenu mensuel :",
      erreur
    );
  }
}


// =======================================
// SOLDE ACTUEL
// =======================================

export async function chargerSoldeActuel() {
  try {
    const donnees = await AsyncStorage.getItem(
      CLE_SOLDE_ACTUEL
    );

    return donnees ? JSON.parse(donnees) : 0;

  } catch (erreur) {
    console.error(
      "Erreur lors du chargement du solde actuel :",
      erreur
    );

    return 0;
  }
}

export async function sauvegarderSoldeActuel(
  solde
) {
  try {
    await AsyncStorage.setItem(
      CLE_SOLDE_ACTUEL,
      JSON.stringify(solde)
    );

  } catch (erreur) {
    console.error(
      "Erreur lors de la sauvegarde du solde actuel :",
      erreur
    );
  }
}


// =======================================
// ÉPARGNE
// =======================================

export async function chargerEpargne() {
  try {
    const donnees = await AsyncStorage.getItem(
      CLE_EPARGNE
    );

    return donnees ? JSON.parse(donnees) : 0;

  } catch (erreur) {
    console.error(
      "Erreur lors du chargement de l'épargne :",
      erreur
    );

    return 0;
  }
}

export async function sauvegarderEpargne(
  epargne
) {
  try {
    await AsyncStorage.setItem(
      CLE_EPARGNE,
      JSON.stringify(epargne)
    );

  } catch (erreur) {
    console.error(
      "Erreur lors de la sauvegarde de l'épargne :",
      erreur
    );
  }
}