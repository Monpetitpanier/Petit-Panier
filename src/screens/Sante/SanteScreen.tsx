import React from 'react';
import { PlaceholderScreen } from '../_PlaceholderScreen';
import { colors } from '@/theme/colors';

export function SanteScreen() {
  return (
    <PlaceholderScreen
      titre="Carnet de Santé"
      sousTitre="Un espace rassurant pour toi et tes proches. (à construire : issue #3)"
      couleur={colors.sante}
    />
  );
}
