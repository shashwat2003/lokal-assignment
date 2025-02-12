import { IconProps } from "@tamagui/helpers-icon";
import {
  BookCheck,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  DollarSign,
  Locate,
  Phone,
} from "@tamagui/lucide-icons";
import * as Clipboard from "expo-clipboard";
import { createElement, Fragment, useMemo } from "react";
import {
  Button,
  Card,
  Separator,
  SizableText,
  ThemeName,
  View,
  XStack,
  YStack,
} from "tamagui";
import { useSnapshot } from "valtio";
import { globalStore, toggleBookmark } from "../store/global";
import { getKey } from "../utils";

const footerItems: {
  icon: React.NamedExoticComponent<IconProps>;
  dataKey: string;
  theme: ThemeName;
}[] = [
  {
    icon: Phone,
    dataKey: "whatsapp_no",
    theme: "blue",
  },
  {
    icon: DollarSign,
    dataKey: "primary_details.Salary",
    theme: "yellow",
  },

  {
    icon: Locate,
    dataKey: "primary_details.Place",
    theme: "green",
  },
  {
    icon: Briefcase,
    dataKey: "primary_details.Experience",
    theme: "red",
  },
  {
    icon: BookCheck,
    dataKey: "primary_details.Qualification",
    theme: "blue",
  },
];

export const JobDetail = ({ data }: { data: JobPosting }) => {
  const globalSnap = useSnapshot(globalStore);
  const isBookmarked = useMemo(
    () => !!globalSnap.bookmarks.find((each) => each.id === data.id),
    [globalSnap.bookmarks]
  );

  return (
    <YStack gap={"$3"} paddingVertical={"$3"}>
      <SizableText size={"$9"} fontWeight={"bold"}>
        Job Detail
      </SizableText>
      <Card padding={"$4"} gap={"$3"}>
        <XStack alignItems={"center"}>
          <YStack flex={1}>
            <SizableText size={"$6"} fontWeight={"bold"}>
              {data.job_role}
            </SizableText>
            <SizableText size={"$3"} color={"$color06"}>
              {data.company_name}
            </SizableText>
          </YStack>
        </XStack>
        <XStack alignItems="center" gap={"$3"}>
          <Button theme={"blue"} flex={1}>
            <Button.Text>Apply for Job</Button.Text>
          </Button>
          <View
            onPress={() => toggleBookmark(data)}
            animation={"100ms"}
            pressStyle={{
              scale: 0.8,
            }}
          >
            {createElement(isBookmarked ? BookmarkCheck : Bookmark, {
              color: isBookmarked ? "$blue10" : "$color",
            })}
          </View>
        </XStack>
      </Card>
      <YStack>
        <SizableText size={"$6"} fontWeight={"bold"}>
          About Job
        </SizableText>
        <SizableText size={"$3"}>{data.title}</SizableText>
      </YStack>
      <YStack gap={"$2"}>
        <SizableText size={"$6"} fontWeight={"bold"}>
          Job Tags
        </SizableText>
        <XStack gap={"$3"}>
          {data.job_tags.map((each, indx) => (
            <View
              key={indx}
              backgroundColor={each.bg_color as any}
              padding={"$1"}
              paddingHorizontal={"$2"}
              rounded={"$3"}
            >
              <SizableText size={"$3"} color={each.text_color as any}>
                {each.value}
              </SizableText>
            </View>
          ))}
        </XStack>
      </YStack>
      <Card padding={"$3"} gap={"$3"}>
        {footerItems.map((each, indx) => (
          <Fragment key={each.dataKey}>
            <XStack alignItems="center" gap={"$3"}>
              <View
                theme={each.theme}
                backgroundColor={"$color10"}
                padding={"$2"}
                rounded={"$2"}
              >
                {createElement(each.icon, {
                  size: "$1",
                  color: "$background",
                })}
              </View>
              <SizableText
                size={"$4"}
                fontWeight={"bold"}
                onLongPress={() => {
                  Clipboard.setStringAsync(getKey(data, each.dataKey)).then(
                    () => {
                      console.log("copied");
                    }
                  );
                }}
              >
                {getKey(data, each.dataKey)}
              </SizableText>
            </XStack>
            {indx !== footerItems.length - 1 && <Separator />}
          </Fragment>
        ))}
      </Card>
    </YStack>
  );
};
