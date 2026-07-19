import React from 'react';
import { PlaceholderScreen } from '../_PlaceholderScreen';
import { colors } from '@/theme/colors';

export function CoinDouilletScreen() {
  return (
    <PlaceholderScreen
      titre="Coin Douillet"
      sousTitre="Un refuge, pas un outil de productivité. (à construire : issue #4)"
      couleur={colors.coinDouillet}
    />
  );
}
