import { JobCard } from "@/src/components/job-card";
import { JobDetail } from "@/src/components/job-detail";
import { Page } from "@/src/components/page";
import { BottomSheetFC, useBottomSheet } from "@/src/hooks/useBottomSheet";
import { globalStore } from "@/src/store/global";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useCallback } from "react";
import { useSnapshot } from "valtio";

export default function Bookmarks() {
  const globalSnap = useSnapshot(globalStore);
  const { bottomSheetRef, BottomSheet } = useBottomSheet();

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
      <Page.Header title="Bookmarks" />
      <BottomSheet>
        {({ data }: BottomSheetFC<JobPosting>) => (
          <BottomSheet.View>
            {data && <JobDetail data={data} />}
          </BottomSheet.View>
        )}
      </BottomSheet>
      <FlashList
        data={globalSnap.bookmarks as JobPosting[]}
        renderItem={renderItem}
        refreshing={false}
        estimatedItemSize={211}
      />
    </Page>
  );
}
