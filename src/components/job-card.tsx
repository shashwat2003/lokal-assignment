import { IconProps } from "@tamagui/helpers-icon";
import {
  Bookmark,
  BookmarkCheck,
  Briefcase,
  DollarSign,
  Locate,
  Phone,
} from "@tamagui/lucide-icons";
import { createElement, useMemo } from "react";
import { Card, Separator, SizableText, View, XStack, YStack } from "tamagui";
import { useSnapshot } from "valtio";
import { globalStore, toggleBookmark } from "../store/global";
import { Skeleton } from "./skeleton";

const getKey = (data: any, key: string) => {
  if (key.includes(".")) {
    const keys = key.split(".");
    return getKey(data[keys[0]], keys.slice(1).join("."));
  }
  return data?.[key];
};

const footerItems: {
  icon: React.NamedExoticComponent<IconProps>;
  dataKey: string;
}[][] = [
  [
    {
      icon: Phone,
      dataKey: "whatsapp_no",
    },
    {
      icon: DollarSign,
      dataKey: "primary_details.Salary",
    },
  ],
  [
    // {
    //   icon: Clock,
    //   dataKey: "job_hours",
    // },
    {
      icon: Locate,
      dataKey: "primary_details.Place",
    },
    {
      icon: Briefcase,
      dataKey: "primary_details.Experience",
    },
  ],
];

export const JobCard = ({ data }: { data: JobPosting }) => {
  const globalSnap = useSnapshot(globalStore);
  const isBookmarked = useMemo(
    () => !!globalSnap.bookmarks.find((each) => each.id === data.id),
    [globalSnap.bookmarks]
  );

  return (
    <Card padding={"$4"} marginBottom={"$4"}>
      <XStack alignItems={"center"}>
        <YStack flex={1}>
          <SizableText size={"$6"} fontWeight={"bold"}>
            {data.job_role}
          </SizableText>
          <SizableText size={"$3"} color={"$color06"}>
            {data.company_name}
          </SizableText>
        </YStack>
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
      <SizableText size={"$4"} ellipsizeMode="tail" numberOfLines={2}>
        {data.title}
      </SizableText>
      <Separator marginVertical={"$4"} />
      <YStack gap={"$3"}>
        {footerItems.map((row, indx) => {
          return (
            <XStack gap={"$2"} key={indx}>
              {row.map((each) => (
                <XStack
                  alignItems="center"
                  gap={"$2"}
                  key={each.dataKey}
                  flex={1}
                >
                  {createElement(each.icon, {
                    size: "$1",
                    color: "$color06",
                  })}
                  <SizableText
                    flex={1}
                    size={"$3"}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    fontWeight={"bold"}
                  >
                    {getKey(data, each.dataKey)}
                  </SizableText>
                </XStack>
              ))}
            </XStack>
          );
        })}
      </YStack>
    </Card>
  );
};

export const JobCardSkeleton = ({
  height,
  count,
}: {
  height: number;
  count: number;
}) => {
  return (
    <View gap={"$4"}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton height={height} width={"100%"} key={i} />
      ))}
    </View>
  );
};
