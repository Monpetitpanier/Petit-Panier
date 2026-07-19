import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

import { useAgenda } from "../contexts/AgendaContext";

import CarteRendezVousJour from "./CarteRendezVousJour";

import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";

// Configuration en français
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
  dayNamesShort: ["D", "L", "M", "M", "J", "V", "S"],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = "fr";

function JourAvecPatte({ date, state, marking, onPress }) {
  const estSelectionne = marking?.selected;
  const estAujourdhui = state === "today";
  const estInactif = state === "disabled";

  return (
    <TouchableOpacity
      style={styles.jour}
      onPress={() => onPress?.(date)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.numeroJour,
          estSelectionne && styles.numeroJourSelectionne,
        ]}
      >
        <Text
          style={[
            styles.texteJour,
            estSelectionne && styles.texteJourSelectionne,
            estAujourdhui && !estSelectionne && styles.texteAujourdhui,
            estInactif && styles.texteJourInactif,
          ]}
        >
          {date.day}
        </Text>
      </View>

      {marking?.aDesRendezVous && (
        <Text style={styles.patte}>🐾</Text>
      )}
    </TouchableOpacity>
  );
}

export default function Calendrier() {

  const { rendezVous } = useAgenda();

  const [dateSelectionnee, setDateSelectionnee] = useState(
    new Date().toISOString().split("T")[0]
  );
  const datesMarquees = useMemo(() => {
    const dates = rendezVous.reduce((marquages, rdv) => {
      if (rdv.date) {
        marquages[rdv.date] = {
          aDesRendezVous: true,
        };
      }

      return marquages;
    }, {});

    dates[dateSelectionnee] = {
      ...dates[dateSelectionnee],
      selected: true,
    };

    return dates;
  }, [dateSelectionnee, rendezVous]);

  return (
    <View style={styles.container}>
      <Calendar
        firstDay={1}
        enableSwipeMonths
        current={dateSelectionnee}
        onDayPress={(day) => setDateSelectionnee(day.dateString)}
        markedDates={datesMarquees}
        dayComponent={JourAvecPatte}
        theme={{
          backgroundColor: Colors.background,
          calendarBackground: Colors.background,

          textSectionTitleColor: Colors.textSecondary,

          monthTextColor: Colors.text,
          textMonthFontSize: 22,
          textMonthFontWeight: "700",

          dayTextColor: Colors.text,
          todayTextColor: Colors.primary,

          arrowColor: Colors.primary,

          selectedDayBackgroundColor: Colors.primary,
          selectedDayTextColor: "#FFFFFF",
        }}
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
    padding: Spacing.md,
  },

  jour: {
    width: 38,
    height: 46,
    alignItems: "center",
  },

  numeroJour: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  numeroJourSelectionne: {
    backgroundColor: Colors.primary,
    borderRadius: 999,
  },

  texteJour: {
    color: Colors.text,
    fontSize: 16,
  },

  texteJourSelectionne: {
    color: Colors.white,
    fontWeight: "700",
  },

  texteAujourdhui: {
    color: Colors.primary,
    fontWeight: "700",
  },

  texteJourInactif: {
    color: Colors.subtitle,
    opacity: 0.45,
  },

  patte: {
    marginTop: -2,
    fontSize: 11,
  },

});
