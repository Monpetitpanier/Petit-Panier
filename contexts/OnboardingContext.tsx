import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type Verrouillage =
  | "aucun"
  | "pin"
  | "empreinte"
  | "visage";

type Espace =
  | "agenda"
  | "budget"
  | "bienEtre"
  | "sante"
  | "maison"
  | "univers";

type ContenuUnivers = {
  voyages: boolean;
  lectures: boolean;
  projets: boolean;
};

type ContenuBienEtre =
  | "pensees"
  | "paroles";

type OnboardingContextType = {
  prenom: string;
  setPrenom: (nom: string) => void;

  espaces: Espace[];
  setEspaces: (
    espaces: Espace[]
  ) => void;

  contenuUnivers: ContenuUnivers;
  setContenuUnivers: (
    contenu: ContenuUnivers
  ) => void;

  contenuBienEtre: ContenuBienEtre | null;
  setContenuBienEtre: (
    contenu: ContenuBienEtre
  ) => void;

  verrouillage: Verrouillage;
  setVerrouillage: (
    v: Verrouillage
  ) => void;

  codePin: string;
  setCodePin: (code: string) => void;
};

const OnboardingContext =
  createContext<
    OnboardingContextType | undefined
  >(undefined);

export function OnboardingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [prenom, setPrenom] =
    useState("");

  const [espaces, setEspaces] =
    useState<Espace[]>([]);

  const [
    contenuUnivers,
    setContenuUnivers,
  ] = useState<ContenuUnivers>({
    voyages: false,
    lectures: false,
    projets: false,
  });

  const [
    contenuBienEtre,
    setContenuBienEtre,
  ] = useState<ContenuBienEtre | null>(
    null
  );

  const [
    verrouillage,
    setVerrouillage,
  ] = useState<Verrouillage>(
    "aucun"
  );

  const [codePin, setCodePin] =
    useState("");

  return (
    <OnboardingContext.Provider
      value={{
        prenom,
        setPrenom,

        espaces,
        setEspaces,

        contenuUnivers,
        setContenuUnivers,

        contenuBienEtre,
        setContenuBienEtre,

        verrouillage,
        setVerrouillage,

        codePin,
        setCodePin,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context =
    useContext(OnboardingContext);

  if (!context) {
    throw new Error(
      "useOnboarding doit être utilisé à l'intérieur d'un OnboardingProvider"
    );
  }

  return context;
}