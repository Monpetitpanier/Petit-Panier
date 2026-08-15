import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  chargerRendezVous,
  sauvegarderRendezVous,
} from "../services/agendaStorage";

const AgendaContext = createContext(null);

export function AgendaProvider({ children }) {
  const [rendezVous, setRendezVous] = useState([]);
  const [chargementTermine, setChargementTermine] = useState(false);

  useEffect(() => {
    chargerRendezVous().then((donnees) => {
      setRendezVous(donnees);
      setChargementTermine(true);
    });
  }, []);

 function ajouterRendezVous(rendezVousData) {
  const nouveauRendezVous = {
    id: Date.now().toString(),

    titre: rendezVousData.titre || "Rendez-vous",

    date: rendezVousData.date || "À définir",

    heure: rendezVousData.heure || "--:--",

    categorie:
      rendezVousData.categorie || "rendez-vous",

    notification: false,

    termine: false,

    dateCreation:
      new Date().toISOString(),
  };

  setRendezVous((rendezVousActuels) => {

    const nouveaux = [
      nouveauRendezVous,
      ...rendezVousActuels,
    ];

    sauvegarderRendezVous(nouveaux);

    return nouveaux;
  });
}

  function modifierRendezVous(id, modifications) {
    const nouveaux = rendezVous.map((rdv) =>
      rdv.id === id
        ? {
            ...rdv,
            ...modifications,
          }
        : rdv
    );

    setRendezVous(nouveaux);
    sauvegarderRendezVous(nouveaux);
  }

  function supprimerRendezVous(id) {
    const nouveaux = rendezVous.filter(
      (rdv) => rdv.id !== id
    );

    setRendezVous(nouveaux);
    sauvegarderRendezVous(nouveaux);
  }

  function basculerNotification(id) {
    const nouveaux = rendezVous.map((rdv) =>
      rdv.id === id
        ? {
            ...rdv,
            notification: !rdv.notification,
          }
        : rdv
    );

    setRendezVous(nouveaux);
    sauvegarderRendezVous(nouveaux);
  }

  function basculerTermine(id) {
    const nouveaux = rendezVous.map((rdv) =>
      rdv.id === id
        ? {
            ...rdv,
            termine: !rdv.termine,
          }
        : rdv
    );

    setRendezVous(nouveaux);
    sauvegarderRendezVous(nouveaux);
  }

  function recupererRendezVousParDate(date) {
    return rendezVous.filter(
      (rdv) => rdv.date === date
    );
  }

  return (
    <AgendaContext.Provider
      value={{
        rendezVous,
        chargementTermine,

        ajouterRendezVous,
        modifierRendezVous,
        supprimerRendezVous,

        basculerNotification,
        basculerTermine,

        recupererRendezVousParDate,
      }}
    >
      {children}
    </AgendaContext.Provider>
  );
}

export function useAgenda() {
  const context = useContext(AgendaContext);

  if (!context) {
    throw new Error(
      "useAgenda doit être être utilisé dans AgendaProvider."
    );
  }

  return context;
}