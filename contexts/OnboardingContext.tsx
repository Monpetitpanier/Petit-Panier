import React, { createContext, useContext, useState, ReactNode } from "react";

type Verrouillage = "aucun" | "pin" | "empreinte" | "visage";

type OnboardingContextType = {
  prenom: string;
  setPrenom: (nom: string) => void;
  verrouillage: Verrouillage;
  setVerrouillage: (v: Verrouillage) => void;
  codePin: string;
  setCodePin: (code: string) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [prenom, setPrenom] = useState("");
  const [verrouillage, setVerrouillage] = useState<Verrouillage>("aucun");
  const [codePin, setCodePin] = useState("");

  return (
    <OnboardingContext.Provider
      value={{ prenom, setPrenom, verrouillage, setVerrouillage, codePin, setCodePin }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding doit être utilisé à l'intérieur d'un OnboardingProvider");
  }
  return context;
}