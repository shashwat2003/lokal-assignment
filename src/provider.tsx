import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider, Theme } from "tamagui";
import { useSnapshot } from "valtio";
import { globalStore } from "./store/global";
import { config } from "./tamagui/config";

const queryClient = new QueryClient();

export const RootProvider = ({ children }: React.PropsWithChildren) => {
  const globalSnap = useSnapshot(globalStore);

  return (
    <GestureHandlerRootView>
      <TamaguiProvider config={config}>
        <Theme name={globalSnap.theme}>
          <ThemeProvider
            value={globalSnap.theme === "light" ? DefaultTheme : DarkTheme}
          >
            <QueryClientProvider client={queryClient}>
              <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </Theme>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
};
