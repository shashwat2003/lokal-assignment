import { Appearance, ColorSchemeName } from "react-native";
import { subscribe } from "valtio";
import proxyWithPersist, { PersistStrategy } from "valtio-persist";
import { asyncStorageEngine } from "./engine";

type GlobalStore = {
  theme: ColorSchemeName;
  bookmarks: JobPosting[];
};

export const globalStore = proxyWithPersist<GlobalStore>({
  name: "_GLOBAL_STORE",
  initialState: {
    theme: Appearance.getColorScheme(),
    bookmarks: [],
  },
  persistStrategies: PersistStrategy.SingleFile,
  version: 0,
  migrations: {},
  getStorage: () => asyncStorageEngine,
});

subscribe(globalStore, () => {
  const currentScheme = Appearance.getColorScheme();
  if (currentScheme !== globalStore.theme)
    Appearance.setColorScheme(globalStore.theme);
});

export const setTheme = (theme: ColorSchemeName) => {
  globalStore.theme = theme;
};

export const toggleTheme = () => {
  const newTheme = globalStore.theme === "light" ? "dark" : "light";
  setTheme(newTheme);
};

export const toggleBookmark = (job: JobPosting) => {
  const index = globalStore.bookmarks.findIndex((each) => each.id === job.id);
  if (index >= 0) {
    globalStore.bookmarks.splice(index, 1);
  } else {
    globalStore.bookmarks.push(job);
  }
};
