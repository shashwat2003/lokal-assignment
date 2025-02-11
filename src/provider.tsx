import { TamaguiProvider } from "tamagui";
import { config } from "./tamagui/config";

export const RootProvider = ({ children }: React.PropsWithChildren) => {
  return <TamaguiProvider config={config}>{children}</TamaguiProvider>;
};
