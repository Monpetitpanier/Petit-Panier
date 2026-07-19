import React from 'react';
import { PlaceholderScreen } from '../_PlaceholderScreen';
import { colors } from '@/theme/colors';

export function MonCheminScreen() {
  return (
    <PlaceholderScreen
      titre="Mon Chemin"
      sousTitre="Avancer un pas après l'autre, sans se sentir débordé. (à construire : issue #5)"
      couleur={colors.monChemin}
    />
  );
}
