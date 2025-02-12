import { JobCard } from "@/src/components/JobCard";
import { Page } from "@/src/components/Page";
import { globalStore } from "@/src/store/global";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { useSnapshot } from "valtio";

const renderItem: ListRenderItem<JobPosting> = ({ item, index }) => {
  return <JobCard data={item} key={index} />;
};

export default function Bookmarks() {
  const globalSnap = useSnapshot(globalStore);
  return (
    <Page>
      <Page.Header title="Bookmarks" />
      <FlashList
        data={globalSnap.bookmarks as JobPosting[]}
        renderItem={renderItem}
        refreshing={false}
        estimatedItemSize={211}
      />
    </Page>
  );
}
