import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme/colors';

interface Props {
  titre: string;
  sousTitre: string;
  couleur: string;
}

// Écran temporaire commun aux modules pas encore développés en détail.
// Chaque module (Univers, Carnet de Santé, Coin Douillet, Mon Chemin,
// La Bourse) remplacera ceci par son propre écran au fur et à mesure.
export function PlaceholderScreen({ titre, sousTitre, couleur }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.pastille, { backgroundColor: couleur }]} />
      <Text style={typography.title}>{titre}</Text>
      <Text style={styles.sousTitre}>{sousTitre}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.sm,
  },
  pastille: { width: 56, height: 56, borderRadius: 28, marginBottom: spacing.sm },
  sousTitre: { ...typography.body, textAlign: 'center' },
});
