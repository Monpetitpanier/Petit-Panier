import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fifi } from '@/components/Fifi/Fifi';
import { colors, spacing, typography } from '@/theme/colors';
import { onboarding } from '@/storage/storage';

const MESSAGE_ACCUEIL =
  "Coucou... Je suis Fifi.\n\nBienvenue dans mon Petit Panier, qui deviendra bientôt le tien.\n\nDépose-y tout ce qui pèse sur ton cœur ou encombre ton esprit. Je veille dessus pendant que tu reprends ton souffle.\n\nAllez... entre. Tu es ici chez toi.";

interface Props {
  onTermine: () => void;
}

// Issue #1 : première apparition de Fifi. L'enchaînement complet
// (entrée à l'écran, saut dans le panier, deux tours, s'assoit, regarde,
// cligne des yeux, queue qui bouge) sera porté par des animations
// react-native-reanimated déclenchées en séquence à partir de ce composant.
// Peut être rejouée depuis les paramètres via onboarding.reinitialiser().
export function OnboardingScreen({ onTermine }: Props) {
  const handleEntrer = async () => {
    await onboarding.marquerVu();
    onTermine();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Fifi mood="attentive" />
        <Text style={styles.message}>{MESSAGE_ACCUEIL}</Text>
      </View>
      <TouchableOpacity style={styles.bouton} onPress={handleEntrer}>
        <Text style={styles.boutonTexte}>Entrer dans mon Petit Panier</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  message: {
    ...typography.fifiSpeech,
    marginTop: spacing.lg,
    lineHeight: 24,
  },
  bouton: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.panierDark,
    borderRadius: 999,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  boutonTexte: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
