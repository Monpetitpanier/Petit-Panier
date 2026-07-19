import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { PanierProvider } from "./contexts/PanierContext";
import { AgendaProvider } from "./contexts/AgendaContext";
import { BienEtreProvider } from "./contexts/BienEtreContext";

import AppNavigation from "./navigation/AppNavigation";

export default function App() {
  return (
    <ActionSheetProvider>
      <PanierProvider>
        <AgendaProvider>
          <BienEtreProvider>
            <AppNavigation />
          </BienEtreProvider>
        </AgendaProvider>
      </PanierProvider>
    </ActionSheetProvider>
  );
}