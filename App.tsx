import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { PanierProvider } from "./contexts/PanierContext";
import { AgendaProvider } from "./contexts/AgendaContext";
import { BienEtreProvider } from "./contexts/BienEtreContext";
import { MaisonProvider } from "./contexts/MaisonContext";
import { PreferencesProvider } from "./contexts/PreferencesContext";

import AppNavigation from "./navigation/AppNavigation";
import RecapSortieModal from "./components/maison/RecapSortieModal";

export default function App() {
  return (
    <ActionSheetProvider>
      <PreferencesProvider>
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
      </PreferencesProvider>
    </ActionSheetProvider>
  );
}