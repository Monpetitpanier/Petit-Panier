import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import EnteteCalendrier from "./EnteteCalendrier";
import GrilleCalendrier from "./GrilleCalendrier";
import CarteRendezVousJour from "./CarteRendezVousJour";

import { useAgenda } from "../contexts/AgendaContext";
import { genererCalendrier } from "../utils/genererCalendrier";

import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";

export default function CalendrierFifi() {
  const { rendezVous } = useAgenda();

  const aujourdHui = new Date();

  const [dateCourante, setDateCourante] = useState(
    new Date(
      aujourdHui.getFullYear(),
      aujourdHui.getMonth(),
      1
    )
  );

  const [dateSelectionnee, setDateSelectionnee] = useState(
    aujourdHui.toISOString().split("T")[0]
  );

  const calendrier = useMemo(() => {
    return genererCalendrier(
      dateCourante.getFullYear(),
      dateCourante.getMonth(),
      rendezVous,
      dateSelectionnee
    );
  }, [
    dateCourante,
    rendezVous,
    dateSelectionnee,
  ]);

  function precedent() {
    setDateCourante(
      new Date(
        dateCourante.getFullYear(),
        dateCourante.getMonth() - 1,
        1
      )
    );
  }

  function suivant() {
    setDateCourante(
      new Date(
        dateCourante.getFullYear(),
        dateCourante.getMonth() + 1,
        1
      )
    );
  }

  function revenirAujourdHui() {
    const maintenant = new Date();

    setDateCourante(
      new Date(
        maintenant.getFullYear(),
        maintenant.getMonth(),
        1
      )
    );

    setDateSelectionnee(
      maintenant.toISOString().split("T")[0]
    );
  }

  return (
    <View style={styles.container}>
      <EnteteCalendrier
        date={dateCourante}
        precedent={precedent}
        suivant={suivant}
        aujourdHui={revenirAujourdHui}
      />

      <GrilleCalendrier
        jours={calendrier.jours}
        dateSelectionnee={dateSelectionnee}
        onSelectionJour={setDateSelectionnee}
      />

      <CarteRendezVousJour
        date={dateSelectionnee}
        rendezVous={rendezVous}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: Spacing.md,
  },
});