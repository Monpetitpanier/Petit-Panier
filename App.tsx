import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { PanierProvider } from "./contexts/PanierContext";
import { AgendaProvider } from "./contexts/AgendaContext";
import { BienEtreProvider } from "./contexts/BienEtreContext";
import { MaisonProvider } from "./contexts/MaisonContext";

import AppNavigation from "./navigation/AppNavigation";


export default function App() {
  return (
    <ActionSheetProvider>

      <AgendaProvider>

        <MaisonProvider>

          <PanierProvider>

            <BienEtreProvider>

              <AppNavigation />

            </BienEtreProvider>

          </PanierProvider>

        </MaisonProvider>

      </AgendaProvider>

    </ActionSheetProvider>
  );
}
