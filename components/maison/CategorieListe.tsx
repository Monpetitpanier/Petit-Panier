// components/maison/CategorieListe.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaisonCategorie, MaisonItem } from '../../types/maison';
import { useMaison } from '../../contexts/MaisonContext';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

interface Props {
  categorie: MaisonCategorie;
}

export default function CategorieListe({ categorie }: Props) {
  const { listes, ajouter, basculer, supprimer } = useMaison();
  const [texte, setTexte] = useState('');
  const items = listes[categorie];

  const handleAjouter = () => {
    if (texte.trim().length === 0) return;
    ajouter(categorie, texte.trim());
    setTexte('');
  };

  const renderItem = ({ item }: { item: MaisonItem }) => (
    <View style={styles.ligneItem}>
      <TouchableOpacity
        style={styles.caseCoche}
        onPress={() => basculer(categorie, item.id)}
      >
        <MaterialCommunityIcons
          name={item.fait ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={24}
          color={item.fait ? Colors.secondary : Colors.subtitle}
        />
      </TouchableOpacity>
      <Text style={[styles.texteItem, item.fait && styles.texteFait]}>
        {item.texte}
      </Text>
      <TouchableOpacity onPress={() => supprimer(categorie, item.id)}>
        <MaterialCommunityIcons name="close" size={20} color={Colors.border} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.vide}>Rien pour l’instant, c’est calme ici 🌿</Text>
        }
        scrollEnabled={false}
      />

      <View style={styles.ajoutConteneur}>
        <TextInput
          style={styles.champTexte}
          placeholder="Ajouter un élément..."
          placeholderTextColor={Colors.subtitle}
          value={texte}
          onChangeText={setTexte}
          onSubmitEditing={handleAjouter}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.boutonAjouter} onPress={handleAjouter}>
          <MaterialCommunityIcons name="plus" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ligneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  caseCoche: { padding: 2 },
  texteItem: { flex: 1, fontSize: 15, color: Colors.text },
  texteFait: { textDecorationLine: 'line-through', color: Colors.subtitle },
  vide: {
    fontSize: 14,
    color: Colors.subtitle,
    fontStyle: 'italic',
    paddingVertical: Spacing.md,
    textAlign: 'center',
  },
  ajoutConteneur: {
    flexDirection: 'row',
    marginTop: Spacing.md,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  champTexte: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    fontSize: 14,
    color: Colors.text,
  },
  boutonAjouter: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
