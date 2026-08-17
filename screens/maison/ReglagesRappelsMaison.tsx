// screens/maison/ReglagesRappelsMaison.tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Switch,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMaison } from '../../contexts/MaisonContext';
import { JourSemaine } from '../../utils/planningMaison';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

const JOURS_AFFICHAGE: { label: string; valeur: JourSemaine }[] = [
  { label: 'Lun', valeur: 1 },
  { label: 'Mar', valeur: 2 },
  { label: 'Mer', valeur: 3 },
  { label: 'Jeu', valeur: 4 },
  { label: 'Ven', valeur: 5 },
  { label: 'Sam', valeur: 6 },
  { label: 'Dim', valeur: 0 },
];

export default function ReglagesRappelsMaison() {
  const navigation = useNavigation();
  const { planning, mettreAJourPlanning } = useMaison();

  const basculerJourMenage = (jour: JourSemaine) => {
    const dejaChoisi = planning.menageJours.includes(jour);
    const nouveauxJours = dejaChoisi
      ? planning.menageJours.filter((j) => j !== jour)
      : [...planning.menageJours, jour];
    mettreAJourPlanning({ menageJours: nouveauxJours });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contenu}>
        <View style={styles.entete}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.retour}>
            <MaterialCommunityIcons name="chevron-left" size={28} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.titre}>Rappels</Text>
          <Text style={styles.sousTitre}>
            Fifi ne te dérange que s'il y a vraiment quelque chose en attente.
          </Text>
        </View>

        {/* To-do */}
        <View style={styles.carte}>
          <View style={styles.ligneSwitch}>
            <View style={{ flex: 1 }}>
              <Text style={styles.titreCarte}>📌 To-do</Text>
              <Text style={styles.description}>Un rappel en milieu de journée</Text>
            </View>
            <Switch
              value={planning.todoActif}
              onValueChange={(val) => mettreAJourPlanning({ todoActif: val })}
              trackColor={{ false: Colors.border, true: Colors.secondary }}
            />
          </View>

          {planning.todoActif && (
            <View style={styles.ligneHeure}>
              <Text style={styles.labelHeure}>Heure du rappel</Text>
              <TextInput
                style={styles.champHeure}
                value={planning.todoHeure}
                onChangeText={(val) => mettreAJourPlanning({ todoHeure: val })}
                placeholder="12:30"
                keyboardType="numbers-and-punctuation"
                maxLength={5}
              />
            </View>
          )}
        </View>

{/* Rappel du pain */}
<View style={styles.carte}>
  <View style={styles.ligneSwitch}>
    <View style={{ flex: 1 }}>
      <Text style={styles.titreCarte}>🥖 Rappel du pain</Text>
      <Text style={styles.description}>
        Un rappel quotidien si le pain est à acheter
      </Text>
    </View>

    <Switch
      value={planning.rappelPainActif}
      onValueChange={(val) =>
        mettreAJourPlanning({
          rappelPainActif: val,
        })
      }
      trackColor={{
        false: Colors.border,
        true: Colors.secondary,
      }}
    />
  </View>

  {planning.rappelPainActif && (
    <View style={styles.ligneHeure}>
      <Text style={styles.labelHeure}>
        Heure du rappel
      </Text>

      <TextInput
        style={styles.champHeure}
        value={planning.rappelPainHeure}
        onChangeText={(val) =>
          mettreAJourPlanning({
            rappelPainHeure: val,
          })
        }
        placeholder="17:00"
        keyboardType="numbers-and-punctuation"
        maxLength={5}
      />
    </View>
  )}
</View>

{/* Géolocalisation */}
<TouchableOpacity
  style={styles.carte}
  onPress={() =>
  navigation.navigate(
    'LieuxGeolocalisationMaison' as never
  )
}
>
  <View style={styles.ligneSwitch}>
    <View style={{ flex: 1 }}>
      <Text style={styles.titreCarte}>📍 Géolocalisation</Text>
      <Text style={styles.description}>
        {planning.geolocalisationActive
          ? `Activée · ${planning.magasinsHabituels.length + planning.boulangeriesHabituelles.length} lieu(x) enregistré(s)`
          : 'Prévient en passant près d’un lieu enregistré'}
      </Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={22} color={Colors.subtitle} />
  </View>
</TouchableOpacity>

        {/* Ménage */}
        <View style={styles.carte}>
          <View style={styles.ligneSwitch}>
            <View style={{ flex: 1 }}>
              <Text style={styles.titreCarte}>🧹 Ménage</Text>
              <Text style={styles.description}>Un rappel les jours que tu choisis</Text>
            </View>
            <Switch
              value={planning.menageActif}
              onValueChange={(val) => mettreAJourPlanning({ menageActif: val })}
              trackColor={{ false: Colors.border, true: Colors.secondary }}
            />
          </View>

          {planning.menageActif && (
            <>
              <View style={styles.ligneHeure}>
                <Text style={styles.labelHeure}>Heure du rappel</Text>
                <TextInput
                  style={styles.champHeure}
                  value={planning.menageHeure}
                  onChangeText={(val) => mettreAJourPlanning({ menageHeure: val })}
                  placeholder="18:30"
                  keyboardType="numbers-and-punctuation"
                  maxLength={5}
                />
              </View>

              <Text style={styles.labelJours}>Jours concernés</Text>
              <View style={styles.ligneJours}>
                {JOURS_AFFICHAGE.map(({ label, valeur }) => {
                  const actif = planning.menageJours.includes(valeur);
                  return (
                    <TouchableOpacity
                      key={valeur}
                      style={[styles.chipJour, actif && styles.chipJourActif]}
                      onPress={() => basculerJourMenage(valeur)}
                    >
                      <Text style={[styles.texteChipJour, actif && styles.texteChipJourActif]}>
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  contenu: { padding: Spacing.lg, paddingBottom: 50 },
  entete: { marginBottom: Spacing.md },
  retour: { alignSelf: 'flex-start', padding: Spacing.xs },
  titre: { fontSize: 26, fontWeight: '700', color: Colors.text, marginTop: Spacing.xs },
  sousTitre: { fontSize: 14, color: Colors.subtitle, marginTop: 4 },
  carte: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  ligneSwitch: { flexDirection: 'row', alignItems: 'center' },
  titreCarte: { fontSize: 17, fontWeight: '600', color: Colors.text },
  description: { fontSize: 13, color: Colors.subtitle, marginTop: 2 },
  ligneHeure: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  labelHeure: { fontSize: 14, color: Colors.text },
  champHeure: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs + 2,
    width: 80,
    textAlign: 'center',
    fontSize: 15,
    color: Colors.text,
  },
  labelJours: { fontSize: 14, color: Colors.text, marginTop: Spacing.md, marginBottom: Spacing.sm },
  ligneJours: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chipJour: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs + 2,
  },
  chipJourActif: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  texteChipJour: { fontSize: 13, color: Colors.text },
  texteChipJourActif: { color: Colors.white, fontWeight: '600' },
});
