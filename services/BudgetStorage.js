import AsyncStorage from "@react-native-async-storage/async-storage";

const CLE_CHARGES_FIXES = "petit_panier_charges_fixes";
const CLE_CHARGES_VARIABLES = "petit_panier_charges_variables";
const CLE_PRETS = "petit_panier_prets";
const CLE_REVENU = "petit_panier_revenu_mensuel";
const CLE_RESTE_DISPONIBLE = "petit_panier_reste_disponible";
const CLE_ANCIEN_SOLDE = "petit_panier_solde_actuel";
const CLE_EPARGNE = "petit_panier_epargne";
const CLE_JOUR_DE_PAIE = "petit_panier_jour_de_paie";

export async function chargerChargesFixes() {
  try {
    const donnees = await AsyncStorage.getItem(CLE_CHARGES_FIXES);
    return donnees ? JSON.parse(donnees) : [];
  } catch (erreur) {
    console.error("Erreur lors du chargement des charges fixes :", erreur);
    return [];
  }
}

export async function sauvegarderChargesFixes(chargesFixes) {
  try {
    await AsyncStorage.setItem(
      CLE_CHARGES_FIXES,
      JSON.stringify(chargesFixes)
    );
  } catch (erreur) {
    console.error("Erreur lors de la sauvegarde des charges fixes :", erreur);
  }
}

export async function chargerChargesVariables() {
  try {
    const donnees = await AsyncStorage.getItem(CLE_CHARGES_VARIABLES);
    return donnees ? JSON.parse(donnees) : [];
  } catch (erreur) {
    console.error("Erreur lors du chargement des charges variables :", erreur);
    return [];
  }
}

export async function sauvegarderChargesVariables(chargesVariables) {
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

export async function chargerPrets() {
  try {
    const donnees = await AsyncStorage.getItem(CLE_PRETS);
    return donnees ? JSON.parse(donnees) : [];
  } catch (erreur) {
    console.error("Erreur lors du chargement des prêts :", erreur);
    return [];
  }
}

export async function sauvegarderPrets(prets) {
  try {
    await AsyncStorage.setItem(CLE_PRETS, JSON.stringify(prets));
  } catch (erreur) {
    console.error("Erreur lors de la sauvegarde des prêts :", erreur);
  }
}

export async function chargerRevenuMensuel() {
  try {
    const donnees = await AsyncStorage.getItem(CLE_REVENU);
    return donnees ? JSON.parse(donnees) : 0;
  } catch (erreur) {
    console.error(
      "Erreur lors du chargement du revenu mensuel :",
      erreur
    );
    return 0;
  }
}

export async function sauvegarderRevenuMensuel(revenu) {
  try {
    await AsyncStorage.setItem(CLE_REVENU, JSON.stringify(revenu));
  } catch (erreur) {
    console.error(
      "Erreur lors de la sauvegarde du revenu mensuel :",
      erreur
    );
  }
}

// =======================================
// JOUR DE PAIE
// =======================================

export async function chargerJourDePaie() {
  try {
    const donnees = await AsyncStorage.getItem(
      CLE_JOUR_DE_PAIE
    );

    if (donnees === null) {
      return null;
    }

    return Number(
      JSON.parse(donnees)
    ) || null;

  } catch (erreur) {
    console.error(
      "Erreur lors du chargement du jour de paie :",
      erreur
    );

    return null;
  }
}


export async function sauvegarderJourDePaie(
  jourDePaie
) {
  try {
    await AsyncStorage.setItem(
      CLE_JOUR_DE_PAIE,
      JSON.stringify(jourDePaie)
    );

  } catch (erreur) {
    console.error(
      "Erreur lors de la sauvegarde du jour de paie :",
      erreur
    );
  }
}

export async function chargerResteDisponible() {
  try {
    const nouvelleValeur = await AsyncStorage.getItem(
      CLE_RESTE_DISPONIBLE
    );

    if (nouvelleValeur !== null) {
      return Number(JSON.parse(nouvelleValeur)) || 0;
    }

    // Migration douce depuis l'ancien "solde actuel".
    const ancienneValeur = await AsyncStorage.getItem(CLE_ANCIEN_SOLDE);

    if (ancienneValeur !== null) {
      return Number(JSON.parse(ancienneValeur)) || 0;
    }

    return 0;
  } catch (erreur) {
    console.error(
      "Erreur lors du chargement du reste disponible :",
      erreur
    );
    return 0;
  }
}

export async function sauvegarderResteDisponible(resteDisponible) {
  try {
    await AsyncStorage.setItem(
      CLE_RESTE_DISPONIBLE,
      JSON.stringify(Number(resteDisponible) || 0)
    );
  } catch (erreur) {
    console.error(
      "Erreur lors de la sauvegarde du reste disponible :",
      erreur
    );
  }
}

export async function chargerEpargne() {
  try {
    const donnees = await AsyncStorage.getItem(CLE_EPARGNE);
    return donnees ? JSON.parse(donnees) : 0;
  } catch (erreur) {
    console.error("Erreur lors du chargement de l'épargne :", erreur);
    return 0;
  }
}

export async function sauvegarderEpargne(epargne) {
  try {
    await AsyncStorage.setItem(CLE_EPARGNE, JSON.stringify(epargne));
  } catch (erreur) {
    console.error("Erreur lors de la sauvegarde de l'épargne :", erreur);
  }
}
