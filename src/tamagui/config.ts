import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

export const config = createTamagui({
  ...defaultConfig,
  settings: {
    ...defaultConfig.settings,
    onlyAllowShorthands: false,
  },
});

type Conf = typeof config;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}
