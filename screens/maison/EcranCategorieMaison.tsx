// screens/maison/EcranCategorieMaison.tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CategorieListe from '../../components/maison/CategorieListe';
import { MaisonCategorie, CATEGORIES_INFO } from '../../types/maison';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

export default function EcranCategorieMaison() {
  const navigation = useNavigation();
  const route = useRoute();
  // La catégorie est passée en initialParams depuis MaisonNavigator.js
  const categorie = (route.params as { categorie: MaisonCategorie })?.categorie;
  const info = CATEGORIES_INFO[categorie];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contenu}>
        <View style={styles.entete}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.retour}>
            <MaterialCommunityIcons name="chevron-left" size={28} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.icone}>{info.icone}</Text>
          <Text style={styles.titre}>{info.label}</Text>
          <Text style={styles.sousTitre}>{info.sousTitre}</Text>
        </View>

        <View style={styles.carte}>
          <CategorieListe categorie={categorie} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  contenu: { padding: Spacing.lg, paddingBottom: 50 },
  entete: { alignItems: 'center', marginBottom: Spacing.md },
  retour: { alignSelf: 'flex-start', padding: Spacing.xs },
  icone: { fontSize: 40, marginTop: Spacing.xs },
  titre: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  sousTitre: {
    fontSize: 15,
    color: Colors.subtitle,
    marginTop: 4,
    textAlign: 'center',
  },
  carte: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: Spacing.lg,
    marginTop: Spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
