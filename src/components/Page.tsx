import { Moon, Sun } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  SizableText,
  Switch,
  View,
  withStaticProperties,
  XStack,
} from "tamagui";
import { useSnapshot } from "valtio";
import { globalStore, toggleTheme } from "../store/global";

const PageFrame = View.styleable((props, ref) => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      ref={ref}
      flex={1}
      backgroundColor={"$background"}
      paddingTop={top}
      paddingHorizontal={"$3"}
      {...props}
    />
  );
});

type PageHeaderProps = {
  title: string;
};

const PageHeader = XStack.styleable<PageHeaderProps>((props, ref) => {
  const { title, children: _, ...rest } = props;
  const globalSnap = useSnapshot(globalStore);

  return (
    <XStack ref={ref} alignItems="center" paddingBottom={"$3"} {...rest}>
      <SizableText flex={1} size={"$10"} fontWeight={"bold"}>
        {title}
      </SizableText>
      <Switch
        onCheckedChange={() => {
          toggleTheme();
        }}
        checked={globalSnap.theme === "dark"}
      >
        <Switch.Thumb
          animation="quicker"
          alignItems="center"
          justify={"center"}
          size={"$5"}
          marginTop={"$-1"}
        >
          {globalSnap.theme === "light" ? (
            <Sun size={"$1"} />
          ) : (
            <Moon size={"$1"} />
          )}
        </Switch.Thumb>
      </Switch>
    </XStack>
  );
});

export const Page = withStaticProperties(PageFrame, {
  Header: PageHeader,
});
