import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";


// ==========================================
// TYPES
// ==========================================

type ContenuUnivers = {
  voyages: boolean;
  lectures: boolean;
  projets: boolean;
};

type ContenuBienEtre =
  | "pensees"
  | "paroles"
  | null;

type LivreParoles =
  | "bible"
  | "coran"
  | "torah"
  | null;

type Verrouillage =
  | "aucun"
  | "pin"
  | "empreinte"
  | "visage";

type RappelsCategories = {
  rdv: boolean;
  entretien: boolean;
  factures: boolean;
  bienEtre: boolean;
};

type OngletsAffiches = {
  agenda: boolean;
  budget: boolean;
  maison: boolean;
  bienEtre: boolean;
  sante: boolean;
  univers: boolean;
};


// ==========================================
// VALEURS PAR DÉFAUT
// ==========================================

const RAPPELS_PAR_DEFAUT: RappelsCategories = {
  rdv: true,
  entretien: true,
  factures: true,
  bienEtre: true,
};

const ONGLETS_PAR_DEFAUT: OngletsAffiches = {
  agenda: true,
  budget: true,
  maison: true,
  bienEtre: true,
  sante: true,
  univers: true,
};

const CONTENU_UNIVERS_PAR_DEFAUT: ContenuUnivers = {
  voyages: false,
  lectures: false,
  projets: false,
};


// ==========================================
// TYPE DU CONTEXTE
// ==========================================

type PreferencesContextType = {

  chargementTermine: boolean;

  prenom: string;
  modifierPrenom: (
    nouveauPrenom: string
  ) => Promise<void>;

  dateNaissance: string;
  modifierDateNaissance: (
    nouvelleDate: string
  ) => Promise<void>;

  contenuUnivers: ContenuUnivers;
  modifierContenuUnivers: (
    nouveauContenu: Partial<ContenuUnivers>
  ) => Promise<void>;

  contenuBienEtre: ContenuBienEtre;
  modifierContenuBienEtre: (
    nouveauContenu: Exclude<
      ContenuBienEtre,
      null
    >
  ) => Promise<void>;

  livreParoles: LivreParoles;
  modifierLivreParoles: (
    nouveauLivre: Exclude<
      LivreParoles,
      null
    >
  ) => Promise<void>;

  notificationsActives: boolean;
  modifierNotificationsActives: (
    valeur: boolean
  ) => Promise<void>;

  rappelsCategories: RappelsCategories;
  modifierRappelsCategories: (
    nouveauxRappels: Partial<RappelsCategories>
  ) => Promise<void>;

  verrouillage: Verrouillage;
  modifierVerrouillage: (
    valeur: Verrouillage
  ) => Promise<void>;

  codePin: string;
  modifierCodePin: (
    code: string
  ) => Promise<void>;

  onglets: OngletsAffiches;
  modifierOnglets: (
    nouveauxOnglets: Partial<OngletsAffiches>
  ) => Promise<void>;
};


// ==========================================
// CRÉATION DU CONTEXTE
// ==========================================

const PreferencesContext =
  createContext<
    PreferencesContextType | undefined
  >(undefined);


// ==========================================
// PROVIDER
// ==========================================

export function PreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [
    chargementTermine,
    setChargementTermine,
  ] = useState(false);

  const [prenom, setPrenom] =
    useState("");

  const [
    dateNaissance,
    setDateNaissance,
  ] = useState("");

  const [
    contenuUnivers,
    setContenuUnivers,
  ] = useState<ContenuUnivers>(
    CONTENU_UNIVERS_PAR_DEFAUT
  );

  const [
    contenuBienEtre,
    setContenuBienEtre,
  ] = useState<ContenuBienEtre>(
    null
  );

  const [
    livreParoles,
    setLivreParoles,
  ] = useState<LivreParoles>(
    null
  );

  const [
    notificationsActives,
    setNotificationsActives,
  ] = useState<boolean>(true);

  const [
    rappelsCategories,
    setRappelsCategories,
  ] = useState<RappelsCategories>(
    RAPPELS_PAR_DEFAUT
  );

  const [
    verrouillage,
    setVerrouillage,
  ] = useState<Verrouillage>(
    "aucun"
  );

  const [
    codePin,
    setCodePin,
  ] = useState("");

  const [
    onglets,
    setOnglets,
  ] = useState<OngletsAffiches>(
    ONGLETS_PAR_DEFAUT
  );


  // ==========================================
  // CHARGEMENT DES PRÉFÉRENCES
  // ==========================================

  useEffect(() => {

    async function chargerPreferences() {

      try {

        const [
          prenomSauvegarde,
          dateNaissanceSauvegardee,
          contenuUniversSauvegarde,
          contenuSauvegarde,
          livreSauvegarde,
          notificationsSauvegardees,
          rappelsSauvegardes,
          verrouillageSauvegarde,
          codePinSauvegarde,
          ongletsSauvegardes,
        ] = await AsyncStorage.multiGet([
          "prenom_utilisateur",
          "date_naissance",
          "contenu_univers",
          "contenu_bien_etre",
          "livre_paroles",
          "notifications_actives",
          "rappels_categories",
          "verrouillage",
          "code_pin",
          "onglets_affiches",
        ]);


        // PRÉNOM

        setPrenom(
          prenomSauvegarde[1] ?? ""
        );


        // DATE DE NAISSANCE

        setDateNaissance(
          dateNaissanceSauvegardee[1] ?? ""
        );


        // CONTENU UNIVERS

        if (contenuUniversSauvegarde[1]) {

          setContenuUnivers({
            ...CONTENU_UNIVERS_PAR_DEFAUT,
            ...JSON.parse(
              contenuUniversSauvegarde[1]
            ),
          });

        }


        // CONTENU BIEN-ÊTRE

        if (
          contenuSauvegarde[1] === "pensees" ||
          contenuSauvegarde[1] === "paroles"
        ) {

          setContenuBienEtre(
            contenuSauvegarde[1]
          );

        }


        // LIVRE PAROLES

        if (
          livreSauvegarde[1] === "bible" ||
          livreSauvegarde[1] === "coran" ||
          livreSauvegarde[1] === "torah"
        ) {

          setLivreParoles(
            livreSauvegarde[1]
          );

        }


        // NOTIFICATIONS ACTIVES

        if (
          notificationsSauvegardees[1] !== null
        ) {

          setNotificationsActives(
            notificationsSauvegardees[1] === "true"
          );

        }


        // RAPPELS PAR CATÉGORIE

        if (rappelsSauvegardes[1]) {

          setRappelsCategories({
            ...RAPPELS_PAR_DEFAUT,
            ...JSON.parse(
              rappelsSauvegardes[1]
            ),
          });

        }


        // VERROUILLAGE

        if (
          verrouillageSauvegarde[1] === "aucun" ||
          verrouillageSauvegarde[1] === "pin" ||
          verrouillageSauvegarde[1] === "empreinte" ||
          verrouillageSauvegarde[1] === "visage"
        ) {

          setVerrouillage(
            verrouillageSauvegarde[1]
          );

        }


        // CODE PIN

        setCodePin(
          codePinSauvegarde[1] ?? ""
        );


        // ONGLETS AFFICHÉS

        if (ongletsSauvegardes[1]) {

          setOnglets({
            ...ONGLETS_PAR_DEFAUT,
            ...JSON.parse(
              ongletsSauvegardes[1]
            ),
          });

        }

      } catch (erreur) {

        console.error(
          "Erreur lors du chargement des préférences :",
          erreur
        );

      } finally {

        setChargementTermine(true);

      }

    }

    chargerPreferences();

  }, []);


  // ==========================================
  // MODIFIER LE PRÉNOM
  // ==========================================

  async function modifierPrenom(
    nouveauPrenom: string
  ) {

    const prenomNettoye =
      nouveauPrenom.trim();

    setPrenom(prenomNettoye);

    await AsyncStorage.setItem(
      "prenom_utilisateur",
      prenomNettoye
    );

  }


  // ==========================================
  // MODIFIER LA DATE DE NAISSANCE
  // ==========================================

  async function modifierDateNaissance(
    nouvelleDate: string
  ) {

    const dateNettoyee =
      nouvelleDate.trim();

    setDateNaissance(dateNettoyee);

    await AsyncStorage.setItem(
      "date_naissance",
      dateNettoyee
    );

  }


  // ==========================================
  // MODIFIER LE CONTENU UNIVERS
  // ==========================================

  async function modifierContenuUnivers(
    nouveauContenu: Partial<ContenuUnivers>
  ) {

    const contenuMisAJour = {
      ...contenuUnivers,
      ...nouveauContenu,
    };

    setContenuUnivers(
      contenuMisAJour
    );

    await AsyncStorage.setItem(
      "contenu_univers",
      JSON.stringify(
        contenuMisAJour
      )
    );

  }


  // ==========================================
  // MODIFIER LE CONTENU BIEN-ÊTRE
  // ==========================================

  async function modifierContenuBienEtre(
    nouveauContenu: Exclude<
      ContenuBienEtre,
      null
    >
  ) {

    setContenuBienEtre(
      nouveauContenu
    );

    await AsyncStorage.setItem(
      "contenu_bien_etre",
      nouveauContenu
    );

  }


  // ==========================================
  // MODIFIER LE LIVRE DES PAROLES
  // ==========================================

  async function modifierLivreParoles(
    nouveauLivre: Exclude<
      LivreParoles,
      null
    >
  ) {

    setLivreParoles(
      nouveauLivre
    );

    await AsyncStorage.setItem(
      "livre_paroles",
      nouveauLivre
    );

  }


  // ==========================================
  // MODIFIER L'ACTIVATION DES NOTIFICATIONS
  // ==========================================

  async function modifierNotificationsActives(
    valeur: boolean
  ) {

    setNotificationsActives(valeur);

    await AsyncStorage.setItem(
      "notifications_actives",
      valeur ? "true" : "false"
    );

  }


  // ==========================================
  // MODIFIER LES RAPPELS PAR CATÉGORIE
  // ==========================================

  async function modifierRappelsCategories(
    nouveauxRappels: Partial<RappelsCategories>
  ) {

    const rappelsMisAJour = {
      ...rappelsCategories,
      ...nouveauxRappels,
    };

    setRappelsCategories(
      rappelsMisAJour
    );

    await AsyncStorage.setItem(
      "rappels_categories",
      JSON.stringify(
        rappelsMisAJour
      )
    );

  }


  // ==========================================
  // MODIFIER LE VERROUILLAGE
  // ==========================================

  async function modifierVerrouillage(
    valeur: Verrouillage
  ) {

    setVerrouillage(valeur);

    await AsyncStorage.setItem(
      "verrouillage",
      valeur
    );

  }


  // ==========================================
  // MODIFIER LE CODE PIN
  // ==========================================

  async function modifierCodePin(
    code: string
  ) {

    setCodePin(code);

    await AsyncStorage.setItem(
      "code_pin",
      code
    );

  }


  // ==========================================
  // MODIFIER LES ONGLETS AFFICHÉS
  // ==========================================

  async function modifierOnglets(
    nouveauxOnglets: Partial<OngletsAffiches>
  ) {

    const ongletsMisAJour = {
      ...onglets,
      ...nouveauxOnglets,
    };

    setOnglets(
      ongletsMisAJour
    );

    await AsyncStorage.setItem(
      "onglets_affiches",
      JSON.stringify(
        ongletsMisAJour
      )
    );

  }


  // ==========================================
  // PROVIDER
  // ==========================================

  return (

    <PreferencesContext.Provider
      value={{

        chargementTermine,

        prenom,
        modifierPrenom,

        dateNaissance,
        modifierDateNaissance,

        contenuUnivers,
        modifierContenuUnivers,

        contenuBienEtre,
        modifierContenuBienEtre,

        livreParoles,
        modifierLivreParoles,

        notificationsActives,
        modifierNotificationsActives,

        rappelsCategories,
        modifierRappelsCategories,

        verrouillage,
        modifierVerrouillage,

        codePin,
        modifierCodePin,

        onglets,
        modifierOnglets,

      }}
    >

      {children}

    </PreferencesContext.Provider>

  );

}


// ==========================================
// HOOK
// ==========================================

export function usePreferences() {

  const context =
    useContext(
      PreferencesContext
    );

  if (!context) {

    throw new Error(
      "usePreferences doit être utilisé à l'intérieur d'un PreferencesProvider"
    );

  }

  return context;

}