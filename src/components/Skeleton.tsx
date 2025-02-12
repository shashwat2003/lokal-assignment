import { MotiSkeletonProps } from "moti/build/skeleton/types";
import { Skeleton as OgSkeleton } from "moti/skeleton";
import { useSnapshot } from "valtio";
import { globalStore } from "../store/global";

export const Skeleton = (props: Omit<MotiSkeletonProps, "Gradient">) => {
  const globalSnap = useSnapshot(globalStore);
  return (
    <OgSkeleton
      colorMode={globalSnap.theme === "dark" ? "dark" : "light"}
      {...props}
    />
  );
};
