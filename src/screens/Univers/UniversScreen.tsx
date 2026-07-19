import React from 'react';
import { PlaceholderScreen } from '../_PlaceholderScreen';
import { colors } from '@/theme/colors';

export function UniversScreen() {
  return (
    <PlaceholderScreen
      titre="Mes Univers"
      sousTitre="Chaque Univers représente un morceau de vie. (à construire : issue #2)"
      couleur={colors.univers}
    />
  );
}
