import { useEffect } from "react";

import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { PanierProvider } from "./contexts/PanierContext";
import { AgendaProvider } from "./contexts/AgendaContext";
import { BienEtreProvider } from "./contexts/BienEtreContext";
import { MaisonProvider } from "./contexts/MaisonContext";

import AppNavigation from "./navigation/AppNavigation";
import RecapSortieModal from "./components/maison/RecapSortieModal";


export default function App() {


  return (
    <ActionSheetProvider>

      <AgendaProvider>

        <MaisonProvider>

          <PanierProvider>

            <BienEtreProvider>

              <AppNavigation />
              <RecapSortieModal />

            </BienEtreProvider>

          </PanierProvider>

        </MaisonProvider>

      </AgendaProvider>

    </ActionSheetProvider>
  );
}