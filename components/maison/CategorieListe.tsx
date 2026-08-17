// components/maison/CategorieListe.tsx

import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  MaisonCategorie,
  MaisonItem,
  ProduitCourse,
  TacheMenage,
  CategorieRayon,
  RAYONS_INFO,
} from '../../types/maison';

import { useMaison } from '../../contexts/MaisonContext';

import SelecteurRayon from './SelecteurRayon';

import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';


interface Props {
  categorie: MaisonCategorie;
}


export default function CategorieListe({
  categorie,
}: Props) {

  const {
    listes,
    ajouter,
    basculer,
    basculerSelectionCourse,
    supprimer,
    terminerCourses,
    modifierRayon,
  } = useMaison();


  const [texte, setTexte] =
    useState('');

  const [modeCourses, setModeCourses] =
    useState(false);

  // Rayons actuellement dépliés (menu déroulant)
  const [rayonsOuverts, setRayonsOuverts] =
    useState<Set<CategorieRayon>>(new Set());

  // Produit dont on est en train de corriger le rayon
  const [produitEnEdition, setProduitEnEdition] =
    useState<ProduitCourse | null>(null);

  const basculerRayonOuvert = (rayon: CategorieRayon) => {
    setRayonsOuverts((prev) => {
      const nouveau = new Set(prev);
      if (nouveau.has(rayon)) {
        nouveau.delete(rayon);
      } else {
        nouveau.add(rayon);
      }
      return nouveau;
    });
  };

  const ORDRE_RAYONS = (Object.keys(RAYONS_INFO) as CategorieRayon[]).sort(
    (a, b) => RAYONS_INFO[a].ordre - RAYONS_INFO[b].ordre
  );

  const grouperParRayon = (produits: ProduitCourse[]) => {
    const groupes = ORDRE_RAYONS.map((rayon) => ({
      rayon,
      produits: produits.filter((p) => p.rayon === rayon),
    }));
    return groupes;
  };


  const items =
    listes[categorie];


  // =======================================
  // PRODUITS DE COURSES
  // =======================================

  const produitsCourses =
    categorie === 'courses'
      ? (items as ProduitCourse[])
      : [];

  // =======================================
// TÂCHES DE MÉNAGE
// =======================================

const tachesMenage =
  categorie === 'menage'
    ? (items as TacheMenage[])
    : [];

/*
 * Une tâche n'est affichée que lorsqu'elle
 * est réellement due.
 *
 * Si aucune prochaineOccurrence n'est définie,
 * on la considère comme due immédiatement.
 */

const maintenant = new Date();

const tachesMenageDues =
  tachesMenage.filter((tache) => {

    if (!tache.prochaineOccurrence) {
      return true;
    }

    return (
      new Date(tache.prochaineOccurrence)
        <= maintenant
    );

  });


const tachesQuotidiennes =
  tachesMenageDues.filter(
    (tache) =>
      tache.frequence === 'quotidien'
  );

const tachesHebdomadaires =
  tachesMenageDues.filter(
    (tache) =>
      tache.frequence === 'hebdomadaire'
  );

const tachesSemestrielles =
  tachesMenageDues.filter(
    (tache) =>
      tache.frequence === 'semestriel'
  );

const tachesAnnuelles =
  tachesMenageDues.filter(
    (tache) =>
      tache.frequence === 'annuel'
  );
  // Produits sélectionnés pour la prochaine course
  const produitsSelectionnes =
    useMemo(
      () =>
        produitsCourses.filter(
          (produit) =>
            produit.selectionne
        ),
      [produitsCourses]
    );


  // =======================================
  // AJOUT
  // =======================================

  const handleAjouter = () => {

    if (texte.trim().length === 0) {
      return;
    }


    ajouter(
      categorie,
      texte.trim()
    );


    setTexte('');

  };


  // =======================================
  // AJOUTER UN PRODUIT DE COURSE
  // =======================================

  const handleAjouterCourse = () => {

    if (texte.trim().length === 0) {
      return;
    }


    /*
     * Un produit ajouté manuellement est
     * considéré comme ponctuel.
     *
     * Il faudra le sélectionner ensuite
     * pour l'ajouter aux prochaines courses.
     */

    ajouter(
      'courses',
      texte.trim(),
      'manuel',
      'ponctuel'
    );


    setTexte('');

  };


  // =======================================
  // COMMENCER LES COURSES
  // =======================================

  const commencerCourses = () => {

    if (
      produitsSelectionnes.length === 0
    ) {
      return;
    }


    setModeCourses(true);

  };


  // =======================================
  // TERMINER LES COURSES
  // =======================================

  const finirCourses = () => {

    terminerCourses();

    setModeCourses(false);

  };


  // =======================================
  // RENDU D'UN PRODUIT DE COURSE
  // =======================================

  const renderProduitCourse = ({
    item,
  }: {
    item: ProduitCourse;
  }) => {

    const pris =
      item.achete;


    return (

      <View
        style={[
          styles.ligneItem,
          pris && styles.ligneAchetee,
        ]}
      >

        <TouchableOpacity
          style={styles.caseCoche}
          onPress={() => {

            if (modeCourses) {

              /*
               * En mode courses :
               * "Je l'ai pris dans le caddie".
               */

              basculer(
                'courses',
                item.id
              );

            } else {

              /*
               * En mode préparation :
               * "Je veux acheter ce produit".
               */

              basculerSelectionCourse(
                item.id
              );

            }

          }}
        >

          <MaterialCommunityIcons
            name={
              modeCourses
                ? (
                    item.achete
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                  )
                : (
                    item.selectionne
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                  )
            }
            size={24}
            color={
              (
                modeCourses
                  ? item.achete
                  : item.selectionne
              )
                ? Colors.secondary
                : Colors.subtitle
            }
          />

        </TouchableOpacity>


      <TouchableOpacity
  style={{ flex: 1 }}
  onLongPress={() => {
    if (!modeCourses) {
      setProduitEnEdition(item);
    }
  }}
  delayLongPress={500}
>
  <Text
    style={[
      styles.texteItem,
      pris && styles.texteAchete,
    ]}
  >
    {item.texte}
  </Text>
</TouchableOpacity>


        {!modeCourses && (

          <TouchableOpacity
            onPress={() =>
              supprimer(
                'courses',
                item.id
              )
            }
          >

            <MaterialCommunityIcons
              name="close"
              size={20}
              color={Colors.border}
            />

          </TouchableOpacity>

        )}

      </View>

    );

  };

// =======================================
// RENDU D'UNE TÂCHE DE MÉNAGE
// =======================================

const renderTacheMenage = (tache: TacheMenage) => (

  <View
    key={tache.id}
    style={styles.ligneItem}
  >

    <TouchableOpacity
      style={styles.caseCoche}
      onPress={() =>
        basculer(
          'menage',
          tache.id
        )
      }
    >

      <MaterialCommunityIcons
        name={
          tache.fait
            ? 'checkbox-marked'
            : 'checkbox-blank-outline'
        }
        size={24}
        color={
          tache.fait
            ? Colors.secondary
            : Colors.subtitle
        }
      />

    </TouchableOpacity>


    <Text
      style={[
        styles.texteItem,
        tache.fait &&
          styles.texteFait,
      ]}
    >
      {tache.texte}
    </Text>


    <TouchableOpacity
      onPress={() =>
        supprimer(
          'menage',
          tache.id
        )
      }
    >

      <MaterialCommunityIcons
        name="close"
        size={20}
        color={Colors.border}
      />

    </TouchableOpacity>

  </View>

);

// =======================================
// ÉCRAN MÉNAGE
// =======================================

if (categorie === 'menage') {

  return (

    <View>

      {/* Tous les jours */}

      <Text style={styles.titreMenage}>
        🟢 Tous les jours
      </Text>

      {tachesQuotidiennes.map(
        renderTacheMenage
      )}


      {/* Toutes les semaines */}

      <Text style={styles.titreMenage}>
        🔵 Toutes les semaines
      </Text>

      {tachesHebdomadaires.map(
        renderTacheMenage
      )}


      {/* Tous les 6 mois */}

      <Text style={styles.titreMenage}>
        🟠 Tous les 6 mois
      </Text>

      {tachesSemestrielles.map(
        renderTacheMenage
      )}


      {/* Tous les ans */}

      <Text style={styles.titreMenage}>
        🟣 Tous les ans
      </Text>

      {tachesAnnuelles.map(
        renderTacheMenage
      )}


      {/* Ajouter une tâche */}

      <View style={styles.ajoutConteneur}>

        <TextInput
          style={styles.champTexte}
          placeholder="Ajouter une tâche..."
          placeholderTextColor={
            Colors.subtitle
          }
          value={texte}
          onChangeText={setTexte}
          onSubmitEditing={
            handleAjouter
          }
          returnKeyType="done"
        />

        <TouchableOpacity
          style={
            styles.boutonAjouter
          }
          onPress={
            handleAjouter
          }
        >

          <MaterialCommunityIcons
            name="plus"
            size={22}
            color={Colors.white}
          />

        </TouchableOpacity>

      </View>

    </View>

  );

}

  // =======================================
  // AUTRES CATÉGORIES
  // =======================================

  const renderItem = ({
    item,
  }: {
    item: MaisonItem;
  }) => (

    <View style={styles.ligneItem}>

      <TouchableOpacity
        style={styles.caseCoche}
        onPress={() =>
          basculer(
            categorie,
            item.id
          )
        }
      >

        <MaterialCommunityIcons
          name={
            item.fait
              ? 'checkbox-marked'
              : 'checkbox-blank-outline'
          }
          size={24}
          color={
            item.fait
              ? Colors.secondary
              : Colors.subtitle
          }
        />

      </TouchableOpacity>


      <Text
        style={[
          styles.texteItem,
          item.fait &&
            styles.texteFait,
        ]}
      >
        {item.texte}
      </Text>


      <TouchableOpacity
        onPress={() =>
          supprimer(
            categorie,
            item.id
          )
        }
      >

        <MaterialCommunityIcons
          name="close"
          size={20}
          color={Colors.border}
        />

      </TouchableOpacity>

    </View>

  );


  // =======================================
  // ÉCRAN COURSES
  // =======================================

  if (categorie === 'courses') {

    /*
     * En mode "courses", on ne montre QUE
     * les produits sélectionnés.
     */

    const listeAffichee =
      modeCourses
        ? produitsSelectionnes
        : produitsCourses;


    return (

      <View>

        {/* ================================= */}
        {/* MODE PRÉPARATION */}
        {/* ================================= */}

        {!modeCourses && (

          <>

            <Text style={styles.titreMode}>
              📝 Préparer mes courses
            </Text>

            <Text style={styles.sousTitreMode}>
              Sélectionne ce que tu souhaites
              acheter.
            </Text>


            {produitsCourses.length === 0 && (
  <Text style={styles.vide}>
    Ta liste est vide pour l'instant 🌿
  </Text>
)}

            {grouperParRayon(listeAffichee).map(({rayon, produits }) => {
              const info = RAYONS_INFO[rayon];
              const ouvert = rayonsOuverts.has(rayon);

              return (
                <View key={rayon} style={styles.sectionRayon}>
                  <TouchableOpacity
                    style={styles.enteteRayon}
                    onPress={() => basculerRayonOuvert(rayon)}
                  >
                    <Text style={styles.icone}>{info.icone}</Text>
                    <Text style={styles.titreRayon}>{info.label}</Text>
                    <View style={styles.badgeNombre}>
                      <Text style={styles.texteBadgeNombre}>{produits.length}</Text>
                    </View>
                    <MaterialCommunityIcons
                      name={ouvert ? 'chevron-up' : 'chevron-down'}
                      size={22}
                      color={Colors.subtitle}
                    />
                  </TouchableOpacity>

                  {ouvert &&
                    produits.map((produit) => (
                      <View key={produit.id}>
                        {renderProduitCourse({ item: produit })}
                      </View>
                    ))}
                </View>
              );
            })}


            {/* Ajouter un produit */}

            <View
              style={
                styles.ajoutConteneur
              }
            >

              <TextInput
                style={
                  styles.champTexte
                }
                placeholder="Ajouter un produit..."
                placeholderTextColor={
                  Colors.subtitle
                }
                value={texte}
                onChangeText={
                  setTexte
                }
                onSubmitEditing={
                  handleAjouterCourse
                }
                returnKeyType="done"
              />


              <TouchableOpacity
                style={
                  styles.boutonAjouter
                }
                onPress={
                  handleAjouterCourse
                }
              >

                <MaterialCommunityIcons
                  name="plus"
                  size={22}
                  color={Colors.white}
                />

              </TouchableOpacity>

            </View>


            {/* Commencer les courses */}

            <TouchableOpacity
              style={[
                styles.boutonPrincipal,
                produitsSelectionnes.length ===
                  0 &&
                  styles.boutonDesactive,
              ]}
              onPress={
                commencerCourses
              }
              disabled={
                produitsSelectionnes.length ===
                0
              }
            >

              <MaterialCommunityIcons
                name="cart-arrow-right"
                size={21}
                color={Colors.white}
              />

              <Text
                style={
                  styles.texteBoutonPrincipal
                }
              >
                Commencer mes courses
              </Text>

            </TouchableOpacity>

          </>

        )}


        {/* ================================= */}
        {/* MODE COURSES */}
        {/* ================================= */}

        {modeCourses && (

          <>

            <Text style={styles.titreMode}>
              🛒 Mes courses
            </Text>

            <Text style={styles.sousTitreMode}>
              Coche les produits quand ils
              sont dans ton caddie.
            </Text>


            {grouperParRayon(produitsSelectionnes).length === 0 && (
              <Text style={styles.vide}>
                Tout est pris ! 🎉
              </Text>
            )}

            {grouperParRayon(produitsSelectionnes).map(({ rayon, produits }) => {
              const info = RAYONS_INFO[rayon];
              const ouvert = rayonsOuverts.has(rayon);

              return (
                <View key={rayon} style={styles.sectionRayon}>
                  <TouchableOpacity
                    style={styles.enteteRayon}
                    onPress={() => basculerRayonOuvert(rayon)}
                  >
                    <Text style={styles.icone}>{info.icone}</Text>
                    <Text style={styles.titreRayon}>{info.label}</Text>
                    <View style={styles.badgeNombre}>
                      <Text style={styles.texteBadgeNombre}>{produits.length}</Text>
                    </View>
                    <MaterialCommunityIcons
                      name={ouvert ? 'chevron-up' : 'chevron-down'}
                      size={22}
                      color={Colors.subtitle}
                    />
                  </TouchableOpacity>

                  {ouvert &&
                    produits.map((produit) => (
                      <View key={produit.id}>
                        {renderProduitCourse({ item: produit })}
                      </View>
                    ))}
                </View>
              );
            })}


            <TouchableOpacity
              style={
                styles.boutonPrincipal
              }
              onPress={
                finirCourses
              }
            >

              <MaterialCommunityIcons
                name="check-circle-outline"
                size={21}
                color={Colors.white}
              />

              <Text
                style={
                  styles.texteBoutonPrincipal
                }
              >
                J'ai terminé mes courses
              </Text>

            </TouchableOpacity>


            <TouchableOpacity
              style={
                styles.boutonSecondaire
              }
              onPress={() =>
                setModeCourses(false)
              }
            >

              <Text
                style={
                  styles.texteBoutonSecondaire
                }
              >
                ← Retour à la préparation
              </Text>

            </TouchableOpacity>

          </>

        )}

        <SelecteurRayon
          visible={produitEnEdition !== null}
          rayonActuel={produitEnEdition?.rayon ?? null}
          onChoisir={(nouveauRayon) => {
            if (produitEnEdition) {
              modifierRayon(produitEnEdition.id, nouveauRayon);
            }
            setProduitEnEdition(null);
          }}
          onFermer={() => setProduitEnEdition(null)}
        />

      </View>

    );

  }


  // =======================================
  // AUTRES CATÉGORIES
  // =======================================

  return (

    <View>

      <FlatList
        data={items}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={renderItem}
        ListEmptyComponent={

          <Text style={styles.vide}>
            Rien pour l’instant,
            c’est calme ici 🌿
          </Text>

        }
        scrollEnabled={false}
      />


      <View
        style={
          styles.ajoutConteneur
        }
      >

        <TextInput
          style={styles.champTexte}
          placeholder="Ajouter un élément..."
          placeholderTextColor={
            Colors.subtitle
          }
          value={texte}
          onChangeText={
            setTexte
          }
          onSubmitEditing={
            handleAjouter
          }
          returnKeyType="done"
        />


        <TouchableOpacity
          style={
            styles.boutonAjouter
          }
          onPress={
            handleAjouter
          }
        >

          <MaterialCommunityIcons
            name="plus"
            size={22}
            color={Colors.white}
          />

        </TouchableOpacity>

      </View>

    </View>

  );

}


// =======================================
// STYLES
// =======================================

const styles =
  StyleSheet.create({

    sectionRayon: {
      marginBottom: Spacing.sm,
    },

    enteteRayon: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Spacing.sm + 2,
      gap: Spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
    },

    icone: {
      fontSize: 18,
    },

    titreRayon: {
      flex: 1,
      fontSize: 15,
      fontWeight: '700',
      color: Colors.text,
    },

    badgeNombre: {
      backgroundColor: Colors.background,
      borderRadius: 10,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },

    texteBadgeNombre: {
      fontSize: 12,
      color: Colors.subtitle,
      fontWeight: '600',
    },

    badgeRayon: {
      paddingHorizontal: 4,
    },

    texteBadgeRayon: {
      fontSize: 16,
    },

    titreMode: {
      fontSize: 18,
      fontWeight: '700',
      color: Colors.text,
      marginBottom: 4,
    },

    sousTitreMode: {
      fontSize: 13,
      color: Colors.subtitle,
      marginBottom: Spacing.md,
    },

titreMenage: {
  fontSize: 17,
  fontWeight: '700',
  color: Colors.text,
  marginTop: Spacing.lg,
  marginBottom: Spacing.xs,
},

    ligneItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Spacing.sm,
      gap: Spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
    },

    ligneAchetee: {
      opacity: 0.5,
    },

    caseCoche: {
      padding: 2,
    },

    texteItem: {
      flex: 1,
      fontSize: 15,
      color: Colors.text,
    },

    texteFait: {
      textDecorationLine:
        'line-through',
      color: Colors.subtitle,
    },

    texteAchete: {
      textDecorationLine:
        'line-through',
      color: Colors.subtitle,
    },

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
      backgroundColor:
        Colors.background,
      borderRadius: 12,
      paddingHorizontal:
        Spacing.md,
      paddingVertical:
        Spacing.sm + 2,
      fontSize: 14,
      color: Colors.text,
    },

    boutonAjouter: {
      backgroundColor:
        Colors.secondary,
      borderRadius: 12,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },

    boutonPrincipal: {
      marginTop: Spacing.lg,
      backgroundColor:
        Colors.secondary,
      borderRadius: 14,
      minHeight: 48,
      paddingHorizontal:
        Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.sm,
    },

    boutonDesactive: {
      opacity: 0.4,
    },

    texteBoutonPrincipal: {
      color: Colors.white,
      fontSize: 15,
      fontWeight: '600',
    },

    boutonSecondaire: {
      marginTop: Spacing.sm,
      alignItems: 'center',
      paddingVertical:
        Spacing.sm,
    },

    texteBoutonSecondaire: {
      color: Colors.subtitle,
      fontSize: 14,
    },

  });