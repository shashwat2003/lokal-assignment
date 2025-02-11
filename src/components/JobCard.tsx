import { IconProps } from "@tamagui/helpers-icon";
import { Bookmark, Briefcase, Clock, Locate } from "@tamagui/lucide-icons";
import { Skeleton } from "moti/skeleton";
import { createElement } from "react";
import { Card, Separator, SizableText, View, XStack, YStack } from "tamagui";

const MAX_TRIM_LENGTH = 110;

const getTrimmedText = (text?: string) => {
  return (text?.length ?? 0) > MAX_TRIM_LENGTH
    ? text?.substring(0, MAX_TRIM_LENGTH) + "..."
    : text;
};

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
}[] = [
  {
    icon: Clock,
    dataKey: "job_hours",
  },
  {
    icon: Locate,
    dataKey: "primary_details.Place",
  },
  {
    icon: Briefcase,
    dataKey: "primary_details.Experience",
  },
];

export const JobCard = ({ data }: { data: JobPosting }) => {
  return (
    <Card padding={"$4"} marginBottom={"$4"}>
      <XStack alignItems={"center"}>
        <YStack flex={1}>
          <SizableText size={"$6"} fontWeight={"bold"}>
            {data.job_role}
          </SizableText>
          <SizableText size={"$3"}>{data.company_name}</SizableText>
        </YStack>
        <Bookmark />
      </XStack>
      <SizableText size={"$3"}>{getTrimmedText(data.title)}</SizableText>
      <Separator marginVertical={"$4"} />
      <XStack>
        {footerItems.map((each) => (
          <XStack alignItems="center" gap={"$2"} key={each.dataKey} flex={1}>
            {createElement(each.icon, { size: "$1" })}
            <SizableText size={"$3"}>{getKey(data, each.dataKey)}</SizableText>
          </XStack>
        ))}
      </XStack>
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
        <Skeleton colorMode={"light"} height={height} width={"100%"} key={i} />
      ))}
    </View>
  );
};
