import { fetchJobs } from "@/src/api";
import { JobCard, JobCardSkeleton } from "@/src/components/job-card";
import { JobDetail } from "@/src/components/job-detail";
import { Page } from "@/src/components/page";
import { BottomSheetFC, useBottomSheet } from "@/src/hooks/useBottomSheet";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { SizableText } from "tamagui";

const SKELETON_HEIGHT = 211;

export default function HomeScreen() {
  const { bottomSheetRef, BottomSheet } = useBottomSheet();
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
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
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

  const renderItem: ListRenderItem<JobPosting> = useCallback(
    ({ item, index }) => {
      return (
        <JobCard
          data={item}
          key={index}
          onPress={() => {
            bottomSheetRef.current?.present(item);
          }}
        />
      );
    },
    []
  );

  return (
    <Page>
      <Page.Header title="Jobs" />
      <BottomSheet>
        {({ data }: BottomSheetFC<JobPosting>) => (
          <BottomSheet.View>
            {data && <JobDetail data={data} />}
          </BottomSheet.View>
        )}
      </BottomSheet>
      <FlashList
        data={transformedData}
        renderItem={renderItem}
        refreshing={false}
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
              {!hasNextPage && !isLoading && (
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
    </Page>
  );
}
