// components/maison/RecapSortieModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMaison, CATEGORIES_RECAP_SORTIE } from '../../contexts/MaisonContext';
import { CATEGORIES_INFO } from '../../types/maison';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

export default function RecapSortieModal() {
  const { listes, basculer, recapVisible, fermerRecap } = useMaison();

  // Items en attente, uniquement pour les catégories concernées par une sortie
  const groupes = CATEGORIES_RECAP_SORTIE.map((categorie) => ({
    categorie,
    info: CATEGORIES_INFO[categorie],
    items: listes[categorie].filter((item) => !item.fait),
  }));

  const totalEnAttente = groupes.reduce((somme, g) => somme + g.items.length, 0);

  return (
    <Modal
      visible={recapVisible}
      animationType="slide"
      transparent
      onRequestClose={fermerRecap}
    >
      <View style={styles.fond}>
        <View style={styles.feuille}>
          <View style={styles.entete}>
            <Text style={styles.titre}>Avant de sortir 🚪</Text>
            <TouchableOpacity onPress={fermerRecap}>
              <MaterialCommunityIcons name="close" size={26} color={Colors.text} />
            </TouchableOpacity>
          </View>

          {totalEnAttente === 0 ? (
            <Text style={styles.vide}>
              Rien en attente, tu peux sortir tranquille 🌿
            </Text>
          ) : (
            <ScrollView style={styles.liste}>
              {groupes
                .filter((g) => g.items.length > 0)
                .map((groupe) => (
                  <View key={groupe.categorie} style={styles.groupe}>
                    <Text style={styles.titreGroupe}>
                      {groupe.info.icone} {groupe.info.label}
                    </Text>

                    {groupe.items.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.ligneItem}
                        onPress={() => basculer(groupe.categorie, item.id)}
                      >
                        <MaterialCommunityIcons
                          name="checkbox-blank-outline"
                          size={22}
                          color={Colors.subtitle}
                        />
                        <Text style={styles.texteItem}>{item.texte}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
            </ScrollView>
          )}

          <TouchableOpacity style={styles.boutonFermer} onPress={fermerRecap}>
            <Text style={styles.texteBouton}>C'est noté</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fond: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  feuille: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.lg,
    maxHeight: '75%',
  },
  entete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  titre: { fontSize: 20, fontWeight: '700', color: Colors.text },
  vide: {
    fontSize: 15,
    color: Colors.subtitle,
    textAlign: 'center',
    paddingVertical: Spacing.xl,
  },
  liste: { marginBottom: Spacing.md },
  groupe: { marginBottom: Spacing.md },
  titreGroupe: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  ligneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs + 2,
    paddingLeft: Spacing.sm,
  },
  texteItem: { fontSize: 15, color: Colors.text, flex: 1 },
  boutonFermer: {
    backgroundColor: Colors.secondary,
    borderRadius: 14,
    paddingVertical: Spacing.sm + 4,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  texteBouton: { color: Colors.white, fontSize: 16, fontWeight: '600' },
});
