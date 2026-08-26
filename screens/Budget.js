import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useBudget } from "../contexts/BudgetContext";

import {
  totaliserMontants,
  totaliserMensualites,
  totaliserResteARembourser,
  formaterMontant,
} from "../utils/budgetUtils";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";


export default function Budget() {

  const navigation = useNavigation();

  const {
    chargesFixes,
    chargesVariables,
    prets,

    revenuMensuel,
    setRevenuMensuel,

    resteDisponible,
    modifierResteDisponible,

    epargne,
    utiliserEpargne,
    alimenterEpargne,

    jourDePaie,
    setJourDePaie,

  } = useBudget();


  // =======================================
  // ÉTATS
  // =======================================

  const [
    modeEditionReste,
    setModeEditionReste,
  ] = useState(false);

  const [
    resteSaisi,
    setResteSaisi,
  ] = useState("");


  const [
    modeEditionRevenu,
    setModeEditionRevenu,
  ] = useState(false);

  const [
    revenuSaisi,
    setRevenuSaisi,
  ] = useState(
    String(revenuMensuel || "")
  );


  const [
    modeEditionJourPaie,
    setModeEditionJourPaie,
  ] = useState(false);

  const [
    jourDePaieSaisi,
    setJourDePaieSaisi,
  ] = useState(
    jourDePaie
      ? String(jourDePaie)
      : ""
  );


  const [
    modeMouvementEpargne,
    setModeMouvementEpargne,
  ] = useState(false);

  const [
    montantMouvement,
    setMontantMouvement,
  ] = useState("");

  const [
    typeMouvement,
    setTypeMouvement,
  ] = useState(null);


  // =======================================
  // CALCULS
  // =======================================

  const totalFixes =
    totaliserMontants(
      chargesFixes
    );

  const totalVariables =
    totaliserMontants(
      chargesVariables
    );

  const totalMensualites =
    totaliserMensualites(
      prets
    );

  const resteARembourser =
    totaliserResteARembourser(
      prets
    );

  const pretsActifs =
    prets.filter(
      (pret) => pret.actif
    );


  // =======================================
  // SYNCHRONISATION DES CHAMPS
  // =======================================

  useEffect(() => {

    if (!modeEditionRevenu) {

      setRevenuSaisi(
        String(
          revenuMensuel || ""
        )
      );

    }

  }, [
    revenuMensuel,
    modeEditionRevenu,
  ]);


  useEffect(() => {

    if (!modeEditionJourPaie) {

      setJourDePaieSaisi(
        jourDePaie
          ? String(jourDePaie)
          : ""
      );

    }

  }, [
    jourDePaie,
    modeEditionJourPaie,
  ]);


  // =======================================
  // RESTE DISPONIBLE
  // =======================================

  function ouvrirEditionReste() {

    setResteSaisi(
      String(
        resteDisponible
      )
    );

    setModeEditionReste(
      true
    );

  }


  function validerResteDisponible() {

    const valeur =
      parseFloat(
        resteSaisi.replace(",", ".")
      );

    if (!Number.isFinite(valeur)) {
      return;
    }

    modifierResteDisponible(
      valeur
    );

    setModeEditionReste(
      false
    );

  }


  // =======================================
  // REVENU MENSUEL
  // =======================================

  function ouvrirEditionRevenu() {

    setRevenuSaisi(
      String(
        revenuMensuel || ""
      )
    );

    setModeEditionRevenu(
      true
    );

  }


  function validerRevenu() {

    const valeur =
      parseFloat(
        revenuSaisi.replace(",", ".")
      ) || 0;

    setRevenuMensuel(
      valeur
    );

    setModeEditionRevenu(
      false
    );

  }


  // =======================================
  // JOUR DE PAIE
  // =======================================

  function ouvrirEditionJourPaie() {

    setJourDePaieSaisi(
      jourDePaie
        ? String(jourDePaie)
        : ""
    );

    setModeEditionJourPaie(
      true
    );

  }


  function validerJourDePaie() {

    const valeur =
      parseInt(
        jourDePaieSaisi,
        10
      );

    if (
      !Number.isInteger(valeur) ||
      valeur < 1 ||
      valeur > 31
    ) {
      return;
    }

    setJourDePaie(
      valeur
    );

    setModeEditionJourPaie(
      false
    );

  }


  // =======================================
  // MOUVEMENTS D'ÉPARGNE
  // =======================================

  function ouvrirMouvementEpargne(
    type
  ) {

    setTypeMouvement(
      type
    );

    setMontantMouvement(
      ""
    );

    setModeMouvementEpargne(
      true
    );

  }


  function fermerMouvementEpargne() {

    setMontantMouvement(
      ""
    );

    setTypeMouvement(
      null
    );

    setModeMouvementEpargne(
      false
    );

  }


  function validerMouvementEpargne() {

    const montant =
      parseFloat(
        montantMouvement.replace(",", ".")
      ) || 0;


    if (montant <= 0) {
      return;
    }


    if (
      typeMouvement === "alimenter"
    ) {

      alimenterEpargne(
        montant
      );

    }


    if (
      typeMouvement === "utiliser"
    ) {

      utiliserEpargne(
        montant
      );

    }


    fermerMouvementEpargne();

  }


  return (

    <SafeAreaView
      style={
        styles.container
      }
    >

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
      >


        {/* ================================= */}
        {/* TITRE */}
        {/* ================================= */}

        <View
          style={
            styles.enteteTitre
          }
        >

          <Image
            source={require(
              "../assets/illustrations/budget/bouton_budget.png"
            )}
            style={
              styles.illustration
            }
            resizeMode="contain"
          />

          <Text
            style={
              styles.titre
            }
          >
            Budget
          </Text>

        </View>


        <Text
          style={
            styles.sousTitre
          }
        >
          Suivre ses revenus, ses charges et ce qu'il reste à vivre.
        </Text>


        {/* ================================= */}
        {/* RESTE DISPONIBLE */}
        {/* ================================= */}

        <View
          style={
            styles.carteResume
          }
        >

          <Text
            style={
              styles.labelResume
            }
          >
            Reste disponible
          </Text>


          {modeEditionReste ? (

            <View
              style={
                styles.ligneEditionReste
              }
            >

              <TextInput
                style={
                  styles.champReste
                }
                keyboardType="numbers-and-punctuation"
                value={
                  resteSaisi
                }
                onChangeText={
                  setResteSaisi
                }
                placeholder="Ex : -195,41"
                placeholderTextColor={
                  Colors.subtitle
                }
                autoFocus
              />


              <TouchableOpacity
                style={
                  styles.boutonValiderReste
                }
                onPress={
                  validerResteDisponible
                }
              >

                <MaterialCommunityIcons
                  name="check"
                  size={20}
                  color={
                    Colors.white
                  }
                />

              </TouchableOpacity>

            </View>

          ) : (

            <TouchableOpacity
              style={
                styles.ligneValeurReste
              }
              onPress={
                ouvrirEditionReste
              }
              activeOpacity={
                0.8
              }
            >

              <Text
                style={[
                  styles.valeurResume,

                  resteDisponible < 0 &&
                    styles.valeurResumeNegative,
                ]}
              >
                {formaterMontant(
                  resteDisponible
                )}
              </Text>


              <MaterialCommunityIcons
                name="pencil-outline"
                size={18}
                color={
                  Colors.subtitle
                }
              />

            </TouchableOpacity>

          )}


          <Text
            style={
              styles.aideReste
            }
          >
            Montant réellement disponible pour vos dépenses variables.
          </Text>

        </View>


        {/* ================================= */}
        {/* REVENU MENSUEL */}
        {/* ================================= */}

        <View
          style={
            styles.carteResume
          }
        >

          <Text
            style={
              styles.labelResume
            }
          >
            Revenu mensuel
          </Text>


          {modeEditionRevenu ? (

            <View
              style={
                styles.ligneEditionReste
              }
            >

              <TextInput
                style={
                  styles.champReste
                }
                keyboardType="decimal-pad"
                value={
                  revenuSaisi
                }
                onChangeText={
                  setRevenuSaisi
                }
                placeholder="Revenu mensuel"
                placeholderTextColor={
                  Colors.subtitle
                }
                autoFocus
              />


              <TouchableOpacity
                style={
                  styles.boutonValiderReste
                }
                onPress={
                  validerRevenu
                }
              >

                <MaterialCommunityIcons
                  name="check"
                  size={20}
                  color={
                    Colors.white
                  }
                />

              </TouchableOpacity>

            </View>

          ) : (

            <TouchableOpacity
              style={
                styles.ligneValeurReste
              }
              onPress={
                ouvrirEditionRevenu
              }
              activeOpacity={
                0.8
              }
            >

              <Text
                style={
                  styles.valeurSecondaire
                }
              >
                {formaterMontant(
                  revenuMensuel
                )}
              </Text>


              <MaterialCommunityIcons
                name="pencil-outline"
                size={16}
                color={
                  Colors.subtitle
                }
              />

            </TouchableOpacity>

          )}

        </View>


        {/* ================================= */}
        {/* JOUR DE PAIE */}
        {/* ================================= */}

        <View
          style={
            styles.carteResume
          }
        >

          <Text
            style={
              styles.labelResume
            }
          >
            Jour de paie
          </Text>


          {modeEditionJourPaie ? (

            <View
              style={
                styles.ligneEditionReste
              }
            >

              <TextInput
                style={
                  styles.champReste
                }
                keyboardType="number-pad"
                value={
                  jourDePaieSaisi
                }
                onChangeText={
                  setJourDePaieSaisi
                }
                placeholder="Ex : 28"
                placeholderTextColor={
                  Colors.subtitle
                }
                maxLength={2}
                autoFocus
              />


              <TouchableOpacity
                style={
                  styles.boutonValiderReste
                }
                onPress={
                  validerJourDePaie
                }
              >

                <MaterialCommunityIcons
                  name="check"
                  size={20}
                  color={
                    Colors.white
                  }
                />

              </TouchableOpacity>

            </View>

          ) : (

            <TouchableOpacity
              style={
                styles.ligneValeurReste
              }
              onPress={
                ouvrirEditionJourPaie
              }
              activeOpacity={
                0.8
              }
            >

              <Text
                style={
                  styles.valeurSecondaire
                }
              >

                {jourDePaie
                  ? `Le ${jourDePaie} de chaque mois`
                  : "À renseigner"}

              </Text>


              <MaterialCommunityIcons
                name="pencil-outline"
                size={16}
                color={
                  Colors.subtitle
                }
              />

            </TouchableOpacity>

          )}


          <Text
            style={
              styles.aideReste
            }
          >
            Ce jour servira de point de départ à votre cycle budgétaire.
          </Text>

        </View>


        {/* ================================= */}
        {/* ÉPARGNE */}
        {/* ================================= */}

        <View
          style={
            styles.carteSituation
          }
        >

          <Text
            style={
              styles.titreSituation
            }
          >
            Épargne
          </Text>


          <View
            style={
              styles.ligneSituation
            }
          >

            <View
              style={
                styles.iconeSituation
              }
            >

              <MaterialCommunityIcons
                name="bank-outline"
                size={22}
                color={
                  Colors.text
                }
              />

            </View>


            <View
              style={
                styles.contenuSituation
              }
            >

              <Text
                style={
                  styles.labelSituation
                }
              >
                Épargne actuelle
              </Text>


              <Text
                style={
                  styles.valeurSituation
                }
              >
                {formaterMontant(
                  epargne
                )}
              </Text>


              {modeMouvementEpargne ? (

                <View
                  style={
                    styles.zoneMouvementEpargne
                  }
                >

                  <TextInput
                    style={
                      styles.champMouvementEpargne
                    }
                    keyboardType="decimal-pad"
                    value={
                      montantMouvement
                    }
                    onChangeText={
                      setMontantMouvement
                    }
                    placeholder={
                      typeMouvement ===
                      "alimenter"
                        ? "Montant à ajouter"
                        : "Montant à utiliser"
                    }
                    placeholderTextColor={
                      Colors.subtitle
                    }
                    autoFocus
                  />


                  <TouchableOpacity
                    style={
                      styles.boutonValiderSituation
                    }
                    onPress={
                      validerMouvementEpargne
                    }
                  >

                    <MaterialCommunityIcons
                      name="check"
                      size={18}
                      color={
                        Colors.white
                      }
                    />

                  </TouchableOpacity>


                  <TouchableOpacity
                    style={
                      styles.boutonAnnulerEpargne
                    }
                    onPress={
                      fermerMouvementEpargne
                    }
                  >

                    <MaterialCommunityIcons
                      name="close"
                      size={18}
                      color={
                        Colors.subtitle
                      }
                    />

                  </TouchableOpacity>

                </View>

              ) : (

                <View
                  style={
                    styles.actionsEpargne
                  }
                >

                  <TouchableOpacity
                    style={
                      styles.boutonAlimenter
                    }
                    onPress={() =>
                      ouvrirMouvementEpargne(
                        "alimenter"
                      )
                    }
                  >

                    <MaterialCommunityIcons
                      name="plus"
                      size={17}
                      color={
                        Colors.text
                      }
                    />

                    <Text
                      style={
                        styles.texteActionEpargne
                      }
                    >
                      Alimenter
                    </Text>

                  </TouchableOpacity>


                  <TouchableOpacity
                    style={
                      styles.boutonUtiliser
                    }
                    onPress={() =>
                      ouvrirMouvementEpargne(
                        "utiliser"
                      )
                    }
                  >

                    <MaterialCommunityIcons
                      name="minus"
                      size={17}
                      color={
                        Colors.text
                      }
                    />

                    <Text
                      style={
                        styles.texteActionEpargne
                      }
                    >
                      Utiliser
                    </Text>

                  </TouchableOpacity>

                </View>

              )}

            </View>

          </View>

        </View>


        {/* ================================= */}
        {/* CRÉDITS */}
        {/* ================================= */}

        {pretsActifs.length > 0 && (

          <View
            style={
              styles.carteResteCredit
            }
          >

            <MaterialCommunityIcons
              name="bank-outline"
              size={26}
              color={
                Colors.text
              }
            />


            <View
              style={
                styles.texteResteCredit
              }
            >

              <Text
                style={
                  styles.labelResteCredit
                }
              >
                Reste à rembourser sur vos crédits
              </Text>


              <Text
                style={
                  styles.valeurResteCredit
                }
              >
                {formaterMontant(
                  resteARembourser
                )}
              </Text>

            </View>

          </View>

        )}


        {/* ================================= */}
        {/* CHARGES FIXES */}
        {/* ================================= */}

        <TouchableOpacity
          style={
            styles.carte
          }
          activeOpacity={
            0.8
          }
          onPress={() =>
            navigation.navigate(
              "ChargesFixes"
            )
          }
        >

          <View
            style={
              styles.icone
            }
          >

            <Text
              style={
                styles.emoji
              }
            >
              🏠
            </Text>

          </View>


          <View
            style={
              styles.texteCarte
            }
          >

            <Text
              style={
                styles.titreCarte
              }
            >
              Charges fixes
            </Text>


            <Text
              style={
                styles.description
              }
            >

              {chargesFixes.length === 0
                ? "Aucune charge fixe enregistrée."
                : `${chargesFixes.length} charge${
                    chargesFixes.length > 1
                      ? "s"
                      : ""
                  } · ${formaterMontant(
                    totalFixes
                  )} / mois`}

            </Text>

          </View>


          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={
              Colors.subtitle
            }
          />

        </TouchableOpacity>


        {/* ================================= */}
        {/* CHARGES VARIABLES */}
        {/* ================================= */}

        <TouchableOpacity
          style={
            styles.carte
          }
          activeOpacity={
            0.8
          }
          onPress={() =>
            navigation.navigate(
              "ChargesVariables"
            )
          }
        >

          <View
            style={
              styles.icone
            }
          >

            <Text
              style={
                styles.emoji
              }
            >
              🛒
            </Text>

          </View>


          <View
            style={
              styles.texteCarte
            }
          >

            <Text
              style={
                styles.titreCarte
              }
            >
              Charges variables
            </Text>


            <Text
              style={
                styles.description
              }
            >

              {chargesVariables.length === 0
                ? "Aucune charge variable enregistrée."
                : `${chargesVariables.length} charge${
                    chargesVariables.length > 1
                      ? "s"
                      : ""
                  } · ${formaterMontant(
                    totalVariables
                  )} / mois`}

            </Text>

          </View>


          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={
              Colors.subtitle
            }
          />

        </TouchableOpacity>


        {/* ================================= */}
        {/* PRÊTS & CRÉDITS */}
        {/* ================================= */}

        <TouchableOpacity
          style={
            styles.carte
          }
          activeOpacity={
            0.8
          }
          onPress={() =>
            navigation.navigate(
              "PretsCredits"
            )
          }
        >

          <View
            style={
              styles.icone
            }
          >

            <Text
              style={
                styles.emoji
              }
            >
              💳
            </Text>

          </View>


          <View
            style={
              styles.texteCarte
            }
          >

            <Text
              style={
                styles.titreCarte
              }
            >
              Prêts & crédits
            </Text>


            <Text
              style={
                styles.description
              }
            >

              {pretsActifs.length === 0
                ? "Aucun prêt en cours."
                : `${pretsActifs.length} en cours · ${formaterMontant(
                    totalMensualites
                  )} / mois`}

            </Text>

          </View>


          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={
              Colors.subtitle
            }
          />

        </TouchableOpacity>


      </ScrollView>

    </SafeAreaView>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },


  content: {
    padding:
      Spacing.lg,

    paddingBottom:
      Spacing.xl,
  },


  // ===================================
  // TITRE
  // ===================================

  enteteTitre: {
    flexDirection:
      "row",

    alignItems:
      "center",

    justifyContent:
      "center",

    marginTop:
      Spacing.xs,
  },


  illustration: {
    width: 70,
    height: 70,

    marginRight:
      Spacing.sm,
  },


  titre: {
    fontSize: 30,
    fontWeight: "700",

    color:
      Colors.text,
  },


  sousTitre: {
    marginTop:
      Spacing.xs,

    marginBottom:
      Spacing.xl,

    fontSize: 16,
    lineHeight: 23,

    color:
      Colors.subtitle,
  },


  // ===================================
  // RESTE DISPONIBLE
  // ===================================

  carteResume: {
    backgroundColor:
      Colors.card,

    borderRadius:
      Radius.large,

    padding:
      Spacing.lg,

    marginBottom:
      Spacing.md,

    ...Shadow.card,
  },


  labelResume: {
    fontSize: 14,

    color:
      Colors.subtitle,
  },


  ligneValeurReste: {
    flexDirection:
      "row",

    alignItems:
      "center",

    marginTop:
      Spacing.xs,
  },


  valeurResume: {
    marginRight:
      Spacing.sm,

    fontSize: 32,

    fontWeight: "700",

    color:
      Colors.secondary,
  },


  valeurResumeNegative: {
    color:
      Colors.danger,
  },


  valeurSecondaire: {
    marginRight:
      Spacing.sm,

    fontSize: 22,

    fontWeight: "700",

    color:
      Colors.text,
  },


  ligneEditionReste: {
    flexDirection:
      "row",

    alignItems:
      "center",

    marginTop:
      Spacing.xs,
  },


  champReste: {
    flex: 1,

    backgroundColor:
      Colors.background,

    borderRadius:
      Radius.small,

    paddingHorizontal:
      Spacing.md,

    paddingVertical:
      Spacing.sm,

    fontSize: 16,

    color:
      Colors.text,

    marginRight:
      Spacing.sm,
  },


  boutonValiderReste: {
    width: 36,
    height: 36,

    borderRadius: 18,

    backgroundColor:
      Colors.secondary,

    alignItems:
      "center",

    justifyContent:
      "center",
  },


  aideReste: {
    marginTop:
      Spacing.sm,

    fontSize: 13,

    lineHeight: 19,

    color:
      Colors.subtitle,
  },


  // ===================================
  // ÉPARGNE
  // ===================================

  carteSituation: {
    backgroundColor:
      Colors.card,

    borderRadius:
      Radius.large,

    padding:
      Spacing.lg,

    marginBottom:
      Spacing.lg,

    ...Shadow.card,
  },


  titreSituation: {
    marginBottom:
      Spacing.md,

    fontSize: 16,

    fontWeight: "700",

    color:
      Colors.text,
  },


  ligneSituation: {
    flexDirection:
      "row",

    alignItems:
      "center",
  },


  iconeSituation: {
    width: 42,
    height: 42,

    borderRadius: 21,

    alignItems:
      "center",

    justifyContent:
      "center",

    backgroundColor:
      Colors.background,

    marginRight:
      Spacing.md,
  },


  contenuSituation: {
    flex: 1,
  },


  labelSituation: {
    fontSize: 13,

    color:
      Colors.subtitle,
  },


  valeurSituation: {
    marginTop:
      Spacing.xs,

    fontSize: 20,

    fontWeight: "700",

    color:
      Colors.text,
  },


  actionsEpargne: {
    flexDirection:
      "row",

    marginTop:
      Spacing.sm,
  },


  boutonAlimenter: {
    flexDirection:
      "row",

    alignItems:
      "center",

    paddingHorizontal:
      Spacing.sm,

    paddingVertical: 7,

    borderRadius:
      Radius.small,

    backgroundColor:
      Colors.background,

    marginRight:
      Spacing.sm,
  },


  boutonUtiliser: {
    flexDirection:
      "row",

    alignItems:
      "center",

    paddingHorizontal:
      Spacing.sm,

    paddingVertical: 7,

    borderRadius:
      Radius.small,

    backgroundColor:
      Colors.background,
  },


  texteActionEpargne: {
    marginLeft: 4,

    fontSize: 13,

    fontWeight: "600",

    color:
      Colors.text,
  },


  zoneMouvementEpargne: {
    flexDirection:
      "row",

    alignItems:
      "center",

    marginTop:
      Spacing.sm,
  },


  champMouvementEpargne: {
    flex: 1,

    backgroundColor:
      Colors.background,

    borderRadius:
      Radius.small,

    paddingHorizontal:
      Spacing.sm,

    paddingVertical: 7,

    fontSize: 15,

    color:
      Colors.text,

    marginRight:
      Spacing.sm,
  },


  boutonValiderSituation: {
    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor:
      Colors.secondary,

    alignItems:
      "center",

    justifyContent:
      "center",
  },


  boutonAnnulerEpargne: {
    width: 34,
    height: 34,

    alignItems:
      "center",

    justifyContent:
      "center",

    marginLeft:
      Spacing.xs,
  },


  // ===================================
  // CRÉDITS
  // ===================================

  carteResteCredit: {
    flexDirection:
      "row",

    alignItems:
      "center",

    backgroundColor:
      Colors.card,

    borderRadius:
      Radius.large,

    padding:
      Spacing.lg,

    marginBottom:
      Spacing.lg,

    borderWidth: 1,

    borderColor:
      Colors.border,
  },


  texteResteCredit: {
    marginLeft:
      Spacing.md,
  },


  labelResteCredit: {
    fontSize: 13,

    color:
      Colors.subtitle,
  },


  valeurResteCredit: {
    marginTop: 2,

    fontSize: 20,

    fontWeight: "700",

    color:
      Colors.text,
  },


  // ===================================
  // CARTES
  // ===================================

  carte: {
    flexDirection:
      "row",

    alignItems:
      "center",

    backgroundColor:
      Colors.card,

    borderRadius:
      Radius.large,

    padding:
      Spacing.lg,

    marginBottom:
      Spacing.md,

    ...Shadow.card,
  },


  icone: {
    width: 58,
    height: 58,

    borderRadius: 29,

    alignItems:
      "center",

    justifyContent:
      "center",

    marginRight:
      Spacing.md,

    backgroundColor:
      Colors.background,
  },


  emoji: {
    fontSize: 28,
  },


  texteCarte: {
    flex: 1,
  },


  titreCarte: {
    fontSize: 18,

    fontWeight: "700",

    color:
      Colors.text,
  },


  description: {
    marginTop: 4,

    fontSize: 14,

    lineHeight: 20,

    color:
      Colors.subtitle,
  },

});
