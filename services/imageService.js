import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export async function prendrePhoto() {
  const permission =
    await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      "Autorisation refusée",
      "Petit Panier a besoin d'accéder à l'appareil photo."
    );
    return null;
  }

  const resultat = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.8,
  });

  if (resultat.canceled) {
    return null;
  }

  return {
    type: "image",
    uri: resultat.assets[0].uri,
    nom: "Photo",
  };
}

export async function choisirDansGalerie() {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      "Autorisation refusée",
      "Petit Panier a besoin d'accéder à votre galerie."
    );
    return null;
  }

  const resultat = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.8,
  });

  if (resultat.canceled) {
    return null;
  }

  return {
    type: "image",
    uri: resultat.assets[0].uri,
    nom: "Photo",
  };
}