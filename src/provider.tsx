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
    <TamaguiProvider config={config}>
      <Theme name={globalSnap.theme}>
        <ThemeProvider
          value={globalSnap.theme === "light" ? DefaultTheme : DarkTheme}
        >
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView>{children}</GestureHandlerRootView>
          </QueryClientProvider>
        </ThemeProvider>
      </Theme>
    </TamaguiProvider>
  );
};
