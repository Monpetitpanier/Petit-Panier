import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";


type CentreInteret =
  | "agenda"
  | "budget"
  | "ecriture"
  | "bienetre"
  | "sante"
  | "voyages"
  | "maison";


type ContenuBienEtre =
  | "pensees"
  | "paroles"
  | null;

type LivreParoles =
  | "bible"
  | "coran"
  | "torah"
  | null;

type PreferencesContextType = {

  chargementTermine: boolean;

  prenom: string;
  modifierPrenom: (
    nouveauPrenom: string
  ) => Promise<void>;

  centresInteret: CentreInteret[];
  modifierCentresInteret: (
    nouveauxCentres: CentreInteret[]
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

};


const PreferencesContext =
  createContext<
    PreferencesContextType | undefined
  >(undefined);


export function PreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [chargementTermine, setChargementTermine] =
    useState(false);

  const [prenom, setPrenom] =
    useState("");

  const [centresInteret, setCentresInteret] =
    useState<CentreInteret[]>([]);

  const [contenuBienEtre, setContenuBienEtre] =
    useState<ContenuBienEtre>(null);

  const [livreParoles, setLivreParoles] =
  useState<LivreParoles>(null);

  // ==========================================
  // CHARGEMENT DES PRÉFÉRENCES
  // ==========================================

  useEffect(() => {

    async function chargerPreferences() {

      try {

       const [
  prenomSauvegarde,
  centresSauvegardes,
  contenuSauvegarde,
  livreSauvegarde,
] = await AsyncStorage.multiGet([
  "prenom_utilisateur",
  "centres_interet",
  "contenu_bien_etre",
  "livre_paroles",
]);


        // PRÉNOM

        setPrenom(
          prenomSauvegarde[1] ?? ""
        );


        // CENTRES D'INTÉRÊT

        if (centresSauvegardes[1]) {

          setCentresInteret(
            JSON.parse(
              centresSauvegardes[1]
            )
          );

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
  // MODIFIER LES CENTRES D'INTÉRÊT
  // ==========================================

  async function modifierCentresInteret(
    nouveauxCentres: CentreInteret[]
  ) {

    setCentresInteret(
      nouveauxCentres
    );

    await AsyncStorage.setItem(
      "centres_interet",
      JSON.stringify(
        nouveauxCentres
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

  return (

    <PreferencesContext.Provider
      value={{

        chargementTermine,

        prenom,
        modifierPrenom,

        centresInteret,
        modifierCentresInteret,

        contenuBienEtre,
        modifierContenuBienEtre,

        livreParoles,
        modifierLivreParoles,

      }}
    >

      {children}

    </PreferencesContext.Provider>

  );

}


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