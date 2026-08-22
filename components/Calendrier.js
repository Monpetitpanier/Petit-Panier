import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import {
  Calendar,
  LocaleConfig,
} from "react-native-calendars";

import { useAgenda } from "../contexts/AgendaContext";

import CarteRendezVousJour from "./CarteRendezVousJour";

import { Colors } from "../theme/colors";


// --------------------------------------------------
// CALENDRIER FRANÇAIS
// --------------------------------------------------

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],

  monthNamesShort: [
    "Jan.",
    "Fév.",
    "Mars",
    "Avr.",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],

  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],

  dayNamesShort: [
    "L",
    "M",
    "M",
    "J",
    "V",
    "S",
    "D",
  ],

  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = "fr";


// --------------------------------------------------
// CALENDRIER
// --------------------------------------------------

export default function Calendrier() {

  const {
    rendezVous,
  } = useAgenda();


  const [dateSelectionnee, setDateSelectionnee] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );


  // ------------------------------------------------
  // JOUR PERSONNALISÉ
  // ------------------------------------------------

  function JourAvecPatte({
    date,
    state,
    marking,
    onPress,
  }) {

    // La sélection est maintenant entièrement
    // gérée par NOUS.
    const estSelectionne =
      date.dateString === dateSelectionnee;

    const estAujourdhui =
      state === "today";

    const estInactif =
      state === "disabled";


    return (

      <TouchableOpacity
        style={styles.jour}
        onPress={() => onPress?.(date)}
        activeOpacity={0.7}
      >

        {/* Cercle du jour */}

        <View
          style={[
            styles.numeroJour,

            estSelectionne &&
              styles.numeroJourSelectionne,
          ]}
        >

          <Text
            style={[
              styles.texteJour,

              estSelectionne &&
                styles.texteJourSelectionne,

              estAujourdhui &&
                !estSelectionne &&
                styles.texteAujourdhui,

              estInactif &&
                styles.texteJourInactif,
            ]}
          >
            {date.day}
          </Text>

        </View>


        {/* Patte */}

        {marking?.aDesRendezVous && (

          <Text style={styles.patte}>
            🐾
          </Text>

        )}

      </TouchableOpacity>

    );
  }


  // ------------------------------------------------
  // JOURS AVEC RENDEZ-VOUS
  // ------------------------------------------------

  const datesMarquees = useMemo(() => {

    return rendezVous.reduce(
      (marquages, rdv) => {

        if (rdv.date) {

          marquages[rdv.date] = {
            aDesRendezVous: true,
          };

        }

        return marquages;

      },
      {}
    );

  }, [rendezVous]);


  // ------------------------------------------------
  // SEMAINE DU JOUR SÉLECTIONNÉ
  // ------------------------------------------------

  const debutSemaine =
    useMemo(() => {

      const date = new Date(
        `${dateSelectionnee}T12:00:00`
      );

      const jour =
        date.getDay();

      const difference =
        jour === 0
          ? -6
          : 1 - jour;

      date.setDate(
        date.getDate() + difference
      );

      return date;

    }, [dateSelectionnee]);


  const datesDeLaSemaine =
    useMemo(() => {

      return Array.from(
        { length: 7 },
        (_, index) => {

          const date =
            new Date(debutSemaine);

          date.setDate(
            debutSemaine.getDate() + index
          );

          return date
            .toISOString()
            .split("T")[0];

        }
      );

    }, [debutSemaine]);


  const rendezVousDeLaSemaine =
    rendezVous
      .filter((rdv) =>
        datesDeLaSemaine.includes(rdv.date)
      )
      .sort((a, b) =>
        `${a.date}${a.heure}`
          .localeCompare(
            `${b.date}${b.heure}`
          )
      );
const datesAvecRendezVous =
  [...new Set(
    rendezVousDeLaSemaine.map(
      (rdv) => rdv.date
    )
  )];

  // ------------------------------------------------
  // AFFICHAGE
  // ------------------------------------------------

  return (

    <View style={styles.container}>

      {/* ------------------------------------------ */}
      {/* Calendrier */}
      {/* ------------------------------------------ */}

      <View style={styles.blocCalendrier}>

        <Calendar

          firstDay={1}

          enableSwipeMonths

          current={dateSelectionnee}

          onDayPress={(day) =>
            setDateSelectionnee(
              day.dateString
            )
          }

          markedDates={datesMarquees}

          dayComponent={JourAvecPatte}

          hideExtraDays={false}

          theme={{

            calendarBackground:
              Colors.background,

            textSectionTitleColor:
              Colors.textSecondary,

            monthTextColor:
              Colors.text,

            textMonthFontSize: 20,

            textMonthFontWeight: "700",

            dayTextColor:
              Colors.text,

            todayTextColor:
              "#C47D8A",

            arrowColor:
              "#C47D8A",

            // AUCUNE sélection native
            selectedDayBackgroundColor:
              "transparent",

            selectedDayTextColor:
              "transparent",

            textDisabledColor:
              "#CFC6BE",
          }}

        />


        {/* -------------------------------------- */}
        {/* Fifi */}
        {/* -------------------------------------- */}

        <Image
          source={require(
            "../assets/illustrations/agenda/fifi_agenda.png"
          )}
          style={styles.fifiAgenda}
          resizeMode="contain"
          pointerEvents="none"
        />

      </View>


      {/* ------------------------------------------ */}
      {/* Semaine */}
      {/* ------------------------------------------ */}

      <View style={styles.semaine}>

        <Text style={styles.titreSemaine}>
          Cette semaine
        </Text>


        {rendezVousDeLaSemaine.length === 0 ? (

          <View style={styles.aucunRendezVous}>

            <Text style={styles.aucunTexte}>
              Aucun rendez-vous cette semaine 🐾
            </Text>

          </View>

        ) : (

         <View style={styles.listeSemaine}>

  {datesAvecRendezVous.map(
    (date) => (

      <CarteRendezVousJour
        key={date}
        date={date}
        rendezVous={rendezVous}
      />

    )
  )}

</View>

        )}

      </View>

    </View>

  );
}


// --------------------------------------------------
// STYLES
// --------------------------------------------------

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },


  blocCalendrier: {
    position: "relative",

    backgroundColor:
      Colors.background,

    borderRadius: 20,

    paddingTop: 4,
    paddingBottom: 2,

    overflow: "hidden",
  },


  jour: {
    width: 36,
    height: 38,

    alignItems: "center",
    justifyContent: "flex-start",

    backgroundColor: "transparent",
  },


  numeroJour: {
    width: 30,
    height: 30,

    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "transparent",
  },


  numeroJourSelectionne: {
    width: 30,
    height: 30,

    borderRadius: 15,

    backgroundColor: "#E8B7B7",
  },


  texteJour: {
    color: Colors.text,
    fontSize: 14,
  },


  texteJourSelectionne: {
    color: "#5A4030",
    fontWeight: "700",
  },


  texteAujourdhui: {
    color: "#C47D8A",
    fontWeight: "700",
  },


  texteJourInactif: {
    color: Colors.subtitle,
    opacity: 0.45,
  },


  patte: {
    position: "absolute",

    bottom: -2,

    fontSize: 17,
  },


  // ------------------------------------------------
  // FIFI
  // ------------------------------------------------

  fifiAgenda: {
    position: "absolute",

    width: 95,
    height: 95,

    right: 35,
    top: -18,

    zIndex: 5,
  },


  // ------------------------------------------------
  // SEMAINE
  // ------------------------------------------------

  semaine: {
    flex: 1,

    marginTop: 6,

    backgroundColor: "#FFFDF8",

    borderRadius: 20,

    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 6,
  },


  titreSemaine: {
    fontSize: 18,

    fontWeight: "700",

    color: "#5A4030",

    marginBottom: 6,
  },


  listeSemaine: {
    flex: 1,
  },


  aucunRendezVous: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingBottom: 15,
  },


  aucunTexte: {
    fontSize: 14,

    color: "#9B8B80",

    textAlign: "center",
  },

});