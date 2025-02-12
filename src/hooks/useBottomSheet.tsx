import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import { withStaticProperties } from "tamagui";
import {
  StyledBottomSheet,
  StyledBottomSheetProps,
  StyledBottomSheetScrollView,
  StyledBottomSheetView,
} from "../components/bottom-sheet";

export type BottomSheetFC<T> = {
  data?: T;
};

const createBottomSheetComponent = (
  ref: React.RefObject<BottomSheetModal>,
  props?: Omit<StyledBottomSheetProps, "children">
) => {
  const BottomSheetComponentFrame = StyledBottomSheet.styleable((rest, _) => {
    return <StyledBottomSheet ref={ref} {...props} {...rest} />;
  });

  return withStaticProperties(BottomSheetComponentFrame, {
    View: StyledBottomSheetView,
    ScrollView: StyledBottomSheetScrollView,
  });
};

export const useBottomSheet = (
  props?: Omit<StyledBottomSheetProps, "children">
) => {
  const ref = useRef<BottomSheetModal>(null);

  const BottomSheet = useMemo(
    () => createBottomSheetComponent(ref, props),
    [ref, props]
  );

  return {
    bottomSheetRef: ref,
    BottomSheet,
  };
};
