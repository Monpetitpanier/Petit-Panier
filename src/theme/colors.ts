// Palette douce et chaleureuse — inspirée d'un carnet personnel,
// jamais un simple dossier informatique.

export const colors = {
  // Fond principal : crème chaud, jamais du blanc froid
  background: '#FBF6EF',
  backgroundSoft: '#F3ECE0',

  // Le panier / Fifi
  panier: '#D8B98C',
  panierDark: '#B8956A',

  // Texte
  textPrimary: '#3A3229',
  textSecondary: '#8A7F6E',

  // Accents par module (utilisés pour les Univers, badges, icônes)
  univers: '#7FA98E', // vert doux
  sante: '#E8A0A0', // rose doux
  coinDouillet: '#B7A6D6', // lavande
  monChemin: '#E3B77D', // ambre doux
  bourse: '#8FB4C7', // bleu doux

  // États
  success: '#8FB89A',
  warning: '#E8C07D',
  border: '#E5DCC9',

  white: '#FFFFFF',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const typography = {
  title: { fontSize: 24, fontWeight: '600' as const, color: colors.textPrimary },
  subtitle: { fontSize: 17, fontWeight: '500' as const, color: colors.textPrimary },
  body: { fontSize: 15, fontWeight: '400' as const, color: colors.textSecondary },
  fifiSpeech: { fontSize: 16, fontWeight: '400' as const, color: colors.textPrimary, fontStyle: 'italic' as const },
};
