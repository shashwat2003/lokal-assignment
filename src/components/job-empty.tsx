import { AlertCircle } from "@tamagui/lucide-icons";
import { Card, SizableText, View } from "tamagui";

export const JobEmpty = ({
  title,
  subTitle,
}: {
  title?: string;
  subTitle?: string;
}) => {
  return (
    <Card
      theme={"blue"}
      height={600}
      alignItems="center"
      justifyContent="center"
      borderColor={"$borderColor"}
      borderStyle="dashed"
      borderWidth={2}
      rounded={"$3"}
      gap={"$4"}
    >
      <SizableText size={"$9"} color={"$color11"} fontWeight={"bold"}>
        {title ?? "OOPS!"}
      </SizableText>
      <View
        padding={"$1"}
        borderColor={"$borderColor"}
        borderWidth={1.5}
        rounded={1000}
        borderStyle="dashed"
      >
        <AlertCircle size={"$6"} color={"$color11"} />
      </View>
      <SizableText size={"$6"} color={"$color11"} fontWeight={"bold"}>
        {subTitle ?? "JOBS NOT FOUND!"}
      </SizableText>
    </Card>
  );
};
