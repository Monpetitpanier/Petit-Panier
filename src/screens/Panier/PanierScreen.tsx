import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { colors, radius, spacing, typography } from '@/theme/colors';
import { Fifi } from '@/components/Fifi/Fifi';
import { notesStore } from '@/storage/stores';
import type { Note } from '@/types';

// Issue #7 : "Mon Panier" — dépôt instantané, sans champ obligatoire.
// La reconnaissance automatique de Fifi (rendez-vous / dépense / émotion /
// Univers / tâche...) est volontairement laissée en dehors de ce composant :
// elle vivra dans un module d'analyse dédié (ex: src/fifi/classify.ts) pour
// rester testable et remplaçable indépendamment de l'UI.
export function PanierScreen() {
  const [texte, setTexte] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  const charger = useCallback(async () => {
    const toutes = await notesStore.getAll();
    setNotes(toutes.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)));
  }, []);

  useEffect(() => {
    charger();
  }, [charger]);

  const deposer = async () => {
    const contenu = texte.trim();
    if (!contenu) return;

    const nouvelle: Note = {
      id: uuidv4(),
      contenu,
      kind: 'idee', // classification automatique à brancher ici
      createdAt: new Date().toISOString(),
      classee: false,
    };

    await notesStore.add(nouvelle);
    setTexte('');
    charger();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Fifi size={64} />
        <Text style={typography.title}>Mon Panier</Text>
        <Text style={typography.body}>Dépose ce qui te passe par la tête.</Text>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.liste}
        ListEmptyComponent={
          <Text style={styles.vide}>Ton panier est vide pour l'instant. Tout va bien.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.carteNote}>
            <Text style={styles.texteNote}>{item.contenu}</Text>
          </View>
        )}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.zoneSaisie}>
          <TextInput
            style={styles.input}
            placeholder="Écris librement..."
            placeholderTextColor={colors.textSecondary}
            value={texte}
            onChangeText={setTexte}
            multiline
          />
          <TouchableOpacity style={styles.boutonDeposer} onPress={deposer}>
            <Text style={styles.boutonDeposerTexte}>Déposer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  liste: { paddingHorizontal: spacing.md, paddingBottom: spacing.md, gap: spacing.sm },
  vide: {
    ...typography.body,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  carteNote: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  texteNote: { ...typography.subtitle, fontWeight: '400' },
  zoneSaisie: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.backgroundSoft,
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 100,
    color: colors.textPrimary,
  },
  boutonDeposer: {
    backgroundColor: colors.panierDark,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  boutonDeposerTexte: { color: colors.white, fontWeight: '600' },
});
