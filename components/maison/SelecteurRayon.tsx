// components/maison/SelecteurRayon.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CategorieRayon, RAYONS_INFO } from '../../types/maison';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

interface Props {
  visible: boolean;
  rayonActuel: CategorieRayon | null;
  onChoisir: (rayon: CategorieRayon) => void;
  onFermer: () => void;
}

const ORDRE_RAYONS = (Object.keys(RAYONS_INFO) as CategorieRayon[]).sort(
  (a, b) => RAYONS_INFO[a].ordre - RAYONS_INFO[b].ordre
);

export default function SelecteurRayon({ visible, rayonActuel, onChoisir, onFermer }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onFermer}>
      <TouchableOpacity style={styles.fond} activeOpacity={1} onPress={onFermer}>
        <View style={styles.feuille}>
          <Text style={styles.titre}>Choisir un rayon</Text>
          {ORDRE_RAYONS.map((rayon) => {
            const info = RAYONS_INFO[rayon];
            const actif = rayon === rayonActuel;
            return (
              <TouchableOpacity
                key={rayon}
                style={[styles.ligne, actif && styles.ligneActive]}
                onPress={() => onChoisir(rayon)}
              >
                <Text style={[styles.texte, actif && styles.texteActif]}>{info.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fond: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: Spacing.lg },
  feuille: { backgroundColor: Colors.card, borderRadius: 18, padding: Spacing.md },
  titre: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm },
  ligne: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    gap: Spacing.sm,
    borderRadius: 10,
  },
  ligneActive: { backgroundColor: Colors.background },
  texte: { fontSize: 15, color: Colors.text },
  texteActif: { fontWeight: '700' },
});
