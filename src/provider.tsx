import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TamaguiProvider } from "tamagui";
import { config } from "./tamagui/config";

const queryClient = new QueryClient();

export const RootProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <TamaguiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TamaguiProvider>
  );
};
