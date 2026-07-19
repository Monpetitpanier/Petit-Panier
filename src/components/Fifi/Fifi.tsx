import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors } from '@/theme/colors';

export type FifiMood = 'reposee' | 'attentive' | 'petitBouddha';

interface FifiProps {
  mood?: FifiMood;
  message?: string;
  size?: number;
}

// Fifi n'est pas un personnage de dessin animé — les mouvements restent
// lents et naturels. Ceci est la première brique : une respiration douce
// et continue. Les animations spécifiques (issue #8) viendront s'y greffer
// (étirement, clignement des yeux, sortie du panier...).
export function Fifi({ mood = 'reposee', message, size = 140 }: FifiProps) {
  const breathe = useSharedValue(0);

  useEffect(() => {
    breathe.value = withRepeat(
      withTiming(1, { duration: 2400, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + breathe.value * 0.03 }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.body,
          { width: size, height: size, borderRadius: size / 2 },
          animatedStyle,
        ]}
      >
        {/* Placeholder visuel — à remplacer par l'illustration/Lottie de Fifi */}
        <Text style={styles.emoji}>🐱</Text>
      </Animated.View>
      {message ? <Text style={styles.speech}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    backgroundColor: colors.panier,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 56,
  },
  speech: {
    marginTop: 16,
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.textPrimary,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
