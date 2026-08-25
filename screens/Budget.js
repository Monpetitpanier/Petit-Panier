import React, { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useBudget } from "../contexts/BudgetContext";

import {
  calculerResteDisponible,
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

    soldeActuel,
    setSoldeActuel,

    epargne,
    setEpargne,
  } = useBudget();

  const [modeEditionRevenu, setModeEditionRevenu] = useState(false);
  const [revenuSaisi, setRevenuSaisi] = useState(String(revenuMensuel || ""));

  const totalFixes = totaliserMontants(chargesFixes);
  const totalVariables = totaliserMontants(chargesVariables);
  const totalMensualites = totaliserMensualites(prets);

  const [modeEditionSolde, setModeEditionSolde] =
  useState(false);

const [soldeSaisi, setSoldeSaisi] =
  useState(String(soldeActuel || ""));


const [modeEditionEpargne, setModeEditionEpargne] =
  useState(false);

const [epargneSaisie, setEpargneSaisie] =
  useState(String(epargne || ""));

  const [modeMouvementEpargne, setModeMouvementEpargne] =
  useState(false);

const [montantMouvement, setMontantMouvement] =
  useState("");

const [typeMouvement, setTypeMouvement] =
  useState(null);

  const resteDisponible = calculerResteDisponible({
    revenuMensuel,
    chargesFixes,
    chargesVariables,
    prets,
  });

  const resteARembourser = totaliserResteARembourser(prets);
  const pretsActifs = prets.filter((pret) => pret.actif);

  function validerRevenu() {
    const valeur = parseFloat(revenuSaisi.replace(",", ".")) || 0;
    setRevenuMensuel(valeur);
    setModeEditionRevenu(false);
  }

  function validerSolde() {

  const valeur =
    parseFloat(
      soldeSaisi.replace(",", ".")
    ) || 0;

  setSoldeActuel(valeur);

  setModeEditionSolde(false);

}


function validerEpargne() {

  const valeur =
    parseFloat(
      epargneSaisie.replace(",", ".")
    ) || 0;

  setEpargne(valeur);

  setModeEditionEpargne(false);

}

function ouvrirMouvementEpargne(type) {
  setTypeMouvement(type);
  setMontantMouvement("");
  setModeMouvementEpargne(true);
}

function validerMouvementEpargne() {
  const montant =
    parseFloat(
      montantMouvement.replace(",", ".")
    ) || 0;

  if (montant <= 0) {
    return;
  }

  if (typeMouvement === "alimenter") {
    setEpargne(epargne + montant);
  }

  if (typeMouvement === "utiliser") {
    setEpargne(
      Math.max(0, epargne - montant)
    );
  }

  setMontantMouvement("");
  setTypeMouvement(null);
  setModeMouvementEpargne(false);
}
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <Text style={styles.titre}>Budget</Text>

        <Text style={styles.sousTitre}>
          Suivre ses revenus, ses charges et ce qu'il reste à vivre.
        </Text>

        {/* ============================= */}
        {/* RESTE DISPONIBLE */}
        {/* ============================= */}

        <View style={styles.carteResume}>
          <Text style={styles.labelResume}>Reste disponible ce mois-ci</Text>

          <Text
            style={[
              styles.valeurResume,
              resteDisponible < 0 && styles.valeurResumeNegative,
            ]}
          >
            {formaterMontant(resteDisponible)}
          </Text>

          {modeEditionRevenu ? (
            <View style={styles.ligneEditionRevenu}>
              <TextInput
                style={styles.champRevenu}
                keyboardType="numbers-and-punctuation"
                value={revenuSaisi}
                onChangeText={setRevenuSaisi}
                placeholder="Revenus mensuels"
                placeholderTextColor={Colors.subtitle}
                autoFocus
              />

              <TouchableOpacity
                style={styles.boutonValiderRevenu}
                onPress={validerRevenu}
              >
                <MaterialCommunityIcons
                  name="check"
                  size={20}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.ligneRevenu}
              onPress={() => {
                setRevenuSaisi(String(revenuMensuel || ""));
                setModeEditionRevenu(true);
              }}
            >
              <Text style={styles.texteRevenu}>
                Revenus : {formaterMontant(revenuMensuel)}
              </Text>

              <MaterialCommunityIcons
                name="pencil-outline"
                size={16}
                color={Colors.subtitle}
              />
            </TouchableOpacity>
          )}
        </View>

{/* ============================= */}
{/* SITUATION FINANCIÈRE */}
{/* ============================= */}

<View style={styles.carteSituation}>

  <Text style={styles.titreSituation}>
    Ma situation actuelle
  </Text>


  {/* SOLDE ACTUEL */}

  <View style={styles.ligneSituation}>

    <View style={styles.iconeSituation}>
      <MaterialCommunityIcons
        name="credit-card-outline"
        size={22}
        color={Colors.text}
      />
    </View>

    <View style={styles.contenuSituation}>

      <Text style={styles.labelSituation}>
        Solde actuel
      </Text>

      {modeEditionSolde ? (

        <View style={styles.ligneEditionSituation}>

          <TextInput
            style={styles.champSituation}
            keyboardType="numbers-and-punctuation"
            value={soldeSaisi}
            onChangeText={setSoldeSaisi}
            placeholder="Ex : -200"
            placeholderTextColor={Colors.subtitle}
            autoFocus
          />

          <TouchableOpacity
            style={styles.boutonValiderSituation}
            onPress={validerSolde}
          >
            <MaterialCommunityIcons
              name="check"
              size={18}
              color={Colors.white}
            />
          </TouchableOpacity>

        </View>

      ) : (

        <TouchableOpacity
          style={styles.ligneValeurSituation}
          onPress={() => {
            setSoldeSaisi(
              String(soldeActuel)
            );

            setModeEditionSolde(true);
          }}
        >

          <Text
            style={[
              styles.valeurSituation,
              soldeActuel < 0 &&
                styles.valeurSituationNegative,
            ]}
          >
            {formaterMontant(soldeActuel)}
          </Text>

          <MaterialCommunityIcons
            name="pencil-outline"
            size={16}
            color={Colors.subtitle}
          />

        </TouchableOpacity>

      )}

    </View>

  </View>


  {/* SÉPARATEUR */}

  <View style={styles.separateurSituation} />


  {/* ÉPARGNE */}

<View style={styles.ligneSituation}>

  <View style={styles.iconeSituation}>
    <MaterialCommunityIcons
      name="bank-outline"
      size={22}
      color={Colors.text}
    />
  </View>

  <View style={styles.contenuSituation}>

    <Text style={styles.labelSituation}>
      Épargne
    </Text>

    {/* MODIFICATION DIRECTE DU MONTANT */}

    {modeEditionEpargne ? (

      <View style={styles.ligneEditionSituation}>

        <TextInput
          style={styles.champSituation}
          keyboardType="decimal-pad"
          value={epargneSaisie}
          onChangeText={setEpargneSaisie}
          placeholder="Montant de votre épargne"
          placeholderTextColor={Colors.subtitle}
          autoFocus
        />

        <TouchableOpacity
          style={styles.boutonValiderSituation}
          onPress={validerEpargne}
        >
          <MaterialCommunityIcons
            name="check"
            size={18}
            color={Colors.white}
          />
        </TouchableOpacity>

      </View>

    ) : (

      <TouchableOpacity
        style={styles.ligneValeurSituation}
        onPress={() => {
          setEpargneSaisie(
            String(epargne)
          );

          setModeEditionEpargne(true);
        }}
      >

        <Text style={styles.valeurSituation}>
          {formaterMontant(epargne)}
        </Text>

        <MaterialCommunityIcons
          name="pencil-outline"
          size={16}
          color={Colors.subtitle}
        />

      </TouchableOpacity>

    )}

    {/* ALIMENTER / UTILISER */}

    {modeMouvementEpargne ? (

      <View style={styles.zoneMouvementEpargne}>

        <TextInput
          style={styles.champMouvementEpargne}
          keyboardType="decimal-pad"
          value={montantMouvement}
          onChangeText={setMontantMouvement}
          placeholder={
            typeMouvement === "alimenter"
              ? "Montant à ajouter"
              : "Montant à utiliser"
          }
          placeholderTextColor={Colors.subtitle}
          autoFocus
        />

        <TouchableOpacity
          style={styles.boutonValiderSituation}
          onPress={validerMouvementEpargne}
        >
          <MaterialCommunityIcons
            name="check"
            size={18}
            color={Colors.white}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boutonAnnulerEpargne}
          onPress={() => {
            setMontantMouvement("");
            setTypeMouvement(null);
            setModeMouvementEpargne(false);
          }}
        >
          <MaterialCommunityIcons
            name="close"
            size={18}
            color={Colors.subtitle}
          />
        </TouchableOpacity>

      </View>

    ) : (

      <View style={styles.actionsEpargne}>

        <TouchableOpacity
          style={styles.boutonAlimenter}
          onPress={() =>
            ouvrirMouvementEpargne("alimenter")
          }
        >
          <MaterialCommunityIcons
            name="plus"
            size={17}
            color={Colors.text}
          />

          <Text style={styles.texteActionEpargne}>
            Alimenter
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.boutonUtiliser}
          onPress={() =>
            ouvrirMouvementEpargne("utiliser")
          }
        >
          <MaterialCommunityIcons
            name="minus"
            size={17}
            color={Colors.text}
          />

          <Text style={styles.texteActionEpargne}>
            Utiliser
          </Text>
        </TouchableOpacity>

      </View>

    )}

  </View>

</View>

</View>

        {/* ============================= */}
        {/* RESTE À REMBOURSER (crédits) */}
        {/* ============================= */}

        {pretsActifs.length > 0 && (
          <View style={styles.carteResteCredit}>
            <MaterialCommunityIcons
              name="bank-outline"
              size={26}
              color={Colors.text}
            />

            <View style={styles.texteResteCredit}>
              <Text style={styles.labelResteCredit}>
                Reste à rembourser sur vos crédits
              </Text>

              <Text style={styles.valeurResteCredit}>
                {formaterMontant(resteARembourser)}
              </Text>
            </View>
          </View>
        )}

        {/* ============================= */}
        {/* CHARGES FIXES */}
        {/* ============================= */}

        <TouchableOpacity
          style={styles.carte}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("ChargesFixes")}
        >
          <View style={styles.icone}>
            <Text style={styles.emoji}>🏠</Text>
          </View>

          <View style={styles.texteCarte}>
            <Text style={styles.titreCarte}>Charges fixes</Text>

            <Text style={styles.description}>
              {chargesFixes.length === 0
                ? "Aucune charge fixe enregistrée."
                : `${chargesFixes.length} charge${
                    chargesFixes.length > 1 ? "s" : ""
                  } · ${formaterMontant(totalFixes)} / mois`}
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={Colors.subtitle}
          />
        </TouchableOpacity>

        {/* ============================= */}
        {/* CHARGES VARIABLES */}
        {/* ============================= */}

        <TouchableOpacity
          style={styles.carte}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("ChargesVariables")}
        >
          <View style={styles.icone}>
            <Text style={styles.emoji}>🛒</Text>
          </View>

          <View style={styles.texteCarte}>
            <Text style={styles.titreCarte}>Charges variables</Text>

            <Text style={styles.description}>
              {chargesVariables.length === 0
                ? "Aucune charge variable enregistrée."
                : `${chargesVariables.length} charge${
                    chargesVariables.length > 1 ? "s" : ""
                  } · ${formaterMontant(totalVariables)} / mois`}
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={Colors.subtitle}
          />
        </TouchableOpacity>

        {/* ============================= */}
        {/* PRÊTS & CRÉDITS */}
        {/* ============================= */}

        <TouchableOpacity
          style={styles.carte}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("PretsCredits")}
        >
          <View style={styles.icone}>
            <Text style={styles.emoji}>💳</Text>
          </View>

          <View style={styles.texteCarte}>
            <Text style={styles.titreCarte}>Prêts & crédits</Text>

            <Text style={styles.description}>
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
            color={Colors.subtitle}
          />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  titre: {
    marginTop: Spacing.md,
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
  },

  sousTitre: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
    fontSize: 16,
    lineHeight: 23,
    color: Colors.subtitle,
  },

  carteResume: {
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow.card,
  },

  labelResume: {
    fontSize: 14,
    color: Colors.subtitle,
  },

  valeurResume: {
    marginTop: Spacing.xs,
    fontSize: 32,
    fontWeight: "700",
    color: Colors.secondary,
  },

  valeurResumeNegative: {
    color: Colors.danger,
  },

  ligneRevenu: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.md,
  },

  texteRevenu: {
    fontSize: 14,
    color: Colors.subtitle,
    marginRight: Spacing.xs,
  },

  ligneEditionRevenu: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.md,
  },

  champRevenu: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: Radius.small,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 15,
    color: Colors.text,
    marginRight: Spacing.sm,
  },

  boutonValiderRevenu: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },

  carteResteCredit: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  texteResteCredit: {
    marginLeft: Spacing.md,
  },

  labelResteCredit: {
    fontSize: 13,
    color: Colors.subtitle,
  },

  valeurResteCredit: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  carte: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow.card,
  },

  icone: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
    backgroundColor: Colors.background,
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
    color: Colors.text,
  },

  description: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.subtitle,
  },

  /* =================================== */
  /* SITUATION FINANCIÈRE */
  /* =================================== */

  carteSituation: {
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,

    ...Shadow.card,
  },

  titreSituation: {
    marginBottom: Spacing.md,

    fontSize: 16,
    fontWeight: "700",

    color: Colors.text,
  },

  ligneSituation: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconeSituation: {
    width: 42,
    height: 42,

    borderRadius: 21,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: Colors.background,

    marginRight: Spacing.md,
  },

  contenuSituation: {
    flex: 1,
  },

  labelSituation: {
    fontSize: 13,

    color: Colors.subtitle,
  },

  ligneValeurSituation: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 3,
  },

  valeurSituation: {
    marginRight: Spacing.xs,

    fontSize: 20,
    fontWeight: "700",

    color: Colors.text,
  },

  valeurSituationNegative: {
    color: Colors.danger,
  },

  separateurSituation: {
    height: 1,

    marginVertical: Spacing.md,

    backgroundColor: Colors.border,
  },

  ligneEditionSituation: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: Spacing.xs,
  },

  champSituation: {
    flex: 1,

    backgroundColor: Colors.background,

    borderRadius: Radius.small,

    paddingHorizontal: Spacing.sm,
    paddingVertical: 7,

    fontSize: 15,

    color: Colors.text,

    marginRight: Spacing.sm,
  },

  boutonValiderSituation: {
    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: Colors.secondary,

    alignItems: "center",
    justifyContent: "center",
  },

  actionsEpargne: {
  flexDirection: "row",
  marginTop: Spacing.sm,
},

boutonAlimenter: {
  flexDirection: "row",
  alignItems: "center",

  paddingHorizontal: Spacing.sm,
  paddingVertical: 7,

  borderRadius: Radius.small,

  backgroundColor: Colors.background,

  marginRight: Spacing.sm,
},

boutonUtiliser: {
  flexDirection: "row",
  alignItems: "center",

  paddingHorizontal: Spacing.sm,
  paddingVertical: 7,

  borderRadius: Radius.small,

  backgroundColor: Colors.background,
},

texteActionEpargne: {
  marginLeft: 4,

  fontSize: 13,
  fontWeight: "600",

  color: Colors.text,
},

zoneMouvementEpargne: {
  flexDirection: "row",
  alignItems: "center",

  marginTop: Spacing.sm,
},

champMouvementEpargne: {
  flex: 1,

  backgroundColor: Colors.background,

  borderRadius: Radius.small,

  paddingHorizontal: Spacing.sm,
  paddingVertical: 7,

  fontSize: 15,

  color: Colors.text,

  marginRight: Spacing.sm,
},

boutonAnnulerEpargne: {
  width: 34,
  height: 34,

  alignItems: "center",
  justifyContent: "center",

  marginLeft: Spacing.xs,
},

});
