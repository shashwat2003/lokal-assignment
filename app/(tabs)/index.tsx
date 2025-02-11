import { fetchJobs } from "@/src/api";
import { JobCard, JobCardSkeleton } from "@/src/components/JobCard";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SizableText, View } from "tamagui";

const renderItem: ListRenderItem<JobPosting> = ({ item, index }) => {
  return <JobCard data={item} key={index} />;
};

const SKELETON_HEIGHT = 211;

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
  const transformedData = useMemo(
    () =>
      data?.pages
        .flatMap((each) => each)
        .filter((each) => each.type === 1009) ?? [],
    [data?.pages]
  );

  return (
    <View
      flex={1}
      backgroundColor={"$background"}
      paddingTop={top}
      paddingHorizontal={"$3"}
    >
      <SizableText size={"$10"} fontWeight={"bold"}>
        Jobs
      </SizableText>
      <FlashList
        data={transformedData}
        renderItem={renderItem}
        onEndReached={() => {
          fetchNextPage();
        }}
        onRefresh={() => {
          refetch();
        }}
        ListHeaderComponent={() => {
          return (
            <>
              {isLoading && (
                <JobCardSkeleton height={SKELETON_HEIGHT} count={2} />
              )}
            </>
          );
        }}
        ListFooterComponent={() => {
          return (
            <>
              {isFetchingNextPage && (
                <JobCardSkeleton height={SKELETON_HEIGHT} count={1} />
              )}
              {!hasNextPage && (
                <SizableText textAlign="center" color={"$color04"}>
                  No more jobs :-(
                </SizableText>
              )}
            </>
          );
        }}
        onEndReachedThreshold={0.1}
        estimatedItemSize={SKELETON_HEIGHT}
      />
    </View>
  );
}
