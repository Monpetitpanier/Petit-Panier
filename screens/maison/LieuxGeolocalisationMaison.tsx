// screens/maison/LieuxGeolocalisationMaison.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMaison } from '../../contexts/MaisonContext';
import { LieuMaison } from '../../utils/planningMaison';
import { geocoderAdresse } from '../../navigation/geofencingMaison';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

type TypeLieu = 'magasinsHabituels' | 'boulangeriesHabituelles';

export default function LieuxGeolocalisationMaison() {
  const navigation = useNavigation();
  const { planning, mettreAJourPlanning } = useMaison();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contenu}>
        <View style={styles.entete}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.retour}>
            <MaterialCommunityIcons name="chevron-left" size={28} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.titre}>Lieux favoris</Text>
          <Text style={styles.sousTitre}>
            Fifi te prévient en passant à proximité, uniquement s'il y a quelque chose en attente.
          </Text>
        </View>

        <View style={styles.carteActivation}>
          <Text style={styles.titreCarte}>Activer la géolocalisation</Text>
          <Switch
            value={planning.geolocalisationActive}
            onValueChange={(val) => mettreAJourPlanning({ geolocalisationActive: val })}
            trackColor={{ false: Colors.border, true: Colors.secondary }}
          />
        </View>

        <SectionLieux
          titre="🛒 Magasins habituels"
          description="Prévient pour les courses et produits à racheter"
          type="magasinsHabituels"
          lieux={planning.magasinsHabituels}
          mettreAJourPlanning={mettreAJourPlanning}
        />

        <SectionLieux
          titre="🥖 Boulangeries habituelles"
          description="Prévient spécifiquement si du pain est en attente"
          type="boulangeriesHabituelles"
          lieux={planning.boulangeriesHabituelles}
          mettreAJourPlanning={mettreAJourPlanning}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionLieux({
  titre,
  description,
  type,
  lieux,
  mettreAJourPlanning,
}: {
  titre: string;
  description: string;
  type: TypeLieu;
  lieux: LieuMaison[];
  mettreAJourPlanning: (n: any) => Promise<void>;
}) {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [enCours, setEnCours] = useState(false);

  const ajouter = async () => {
    if (!nom.trim() || !adresse.trim()) {
      Alert.alert('Nom et adresse requis');
      return;
    }

    setEnCours(true);
    const coords = await geocoderAdresse(adresse.trim());
    setEnCours(false);

    if (!coords) {
      Alert.alert(
        'Adresse introuvable',
        "Essaie une adresse plus précise (numéro, rue, ville)."
      );
      return;
    }

    const nouveauLieu: LieuMaison = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      nom: nom.trim(),
      adresse: adresse.trim(),
      latitude: coords.latitude,
      longitude: coords.longitude,
    };

    mettreAJourPlanning({ [type]: [...lieux, nouveauLieu] });
    setNom('');
    setAdresse('');
  };

  const supprimer = (id: string) => {
    mettreAJourPlanning({ [type]: lieux.filter((l) => l.id !== id) });
  };

  return (
    <View style={styles.carte}>
      <Text style={styles.titreCarte}>{titre}</Text>
      <Text style={styles.description}>{description}</Text>

      {lieux.map((lieu) => (
        <View key={lieu.id} style={styles.ligneLieu}>
          <MaterialCommunityIcons name="map-marker" size={18} color={Colors.secondary} />
          <Text style={styles.texteLieu}>{lieu.nom}</Text>
          <TouchableOpacity onPress={() => supprimer(lieu.id)}>
            <MaterialCommunityIcons name="close" size={18} color={Colors.border} />
          </TouchableOpacity>
        </View>
      ))}

      <TextInput
        style={styles.champTexte}
        placeholder="Nom (ex: Boulangerie du coin)"
        placeholderTextColor={Colors.subtitle}
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.champTexte}
        placeholder="Adresse complète"
        placeholderTextColor={Colors.subtitle}
        value={adresse}
        onChangeText={setAdresse}
      />

      <TouchableOpacity style={styles.boutonAjouter} onPress={ajouter} disabled={enCours}>
        {enCours ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text style={styles.texteBouton}>Ajouter ce lieu</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  contenu: { padding: Spacing.lg, paddingBottom: 50 },
  entete: { marginBottom: Spacing.md },
  retour: { alignSelf: 'flex-start', padding: Spacing.xs },
  titre: { fontSize: 26, fontWeight: '700', color: Colors.text, marginTop: Spacing.xs },
  sousTitre: { fontSize: 14, color: Colors.subtitle, marginTop: 4 },
  carteActivation: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: Spacing.md,
    marginTop: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carte: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  titreCarte: { fontSize: 17, fontWeight: '600', color: Colors.text },
  description: { fontSize: 13, color: Colors.subtitle, marginTop: 2, marginBottom: Spacing.sm },
  ligneLieu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  texteLieu: { flex: 1, fontSize: 14, color: Colors.text },
  champTexte: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs + 4,
    fontSize: 14,
    color: Colors.text,
    marginTop: Spacing.sm,
  },
  boutonAjouter: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingVertical: Spacing.sm + 2,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  texteBouton: { color: Colors.white, fontSize: 15, fontWeight: '600' },
});
