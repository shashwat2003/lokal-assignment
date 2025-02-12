import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { RefObject } from "react";
import { proxy } from "valtio";

export type BottomSheetStore = {
  ref: (RefObject<BottomSheetModal> | null)[];
  snapPoints: (string | number)[][];
  props: Omit<BottomSheetModalProps, "children" | "snapPoints">[];
};
export const NUM_OF_SHEETS = 2;
const initialSnapPoints = ["35%"];
const initialProps = {};

export const bottomSheetStore = proxy<BottomSheetStore>({
  ref: [],
  snapPoints: [...Array(NUM_OF_SHEETS)].map(() => initialSnapPoints),
  props: [...Array(NUM_OF_SHEETS)].map(() => initialProps),
});

export const setSnapPoints = (
  points: BottomSheetStore["snapPoints"][0],
  index: number = 0
) => {
  bottomSheetStore.snapPoints.splice(index, 1, points);
};

export const setModalProps = (
  props: BottomSheetStore["props"][0],
  index: number = 0
) => {
  bottomSheetStore.props.splice(index, 1, props);
};

export const setRef = (ref: BottomSheetStore["ref"][0], index: number = 0) => {
  bottomSheetStore.ref?.splice(index, 1, ref);
};

export const resetSnapPoints = (index: number = 0) => {
  bottomSheetStore.snapPoints.splice(index, 1, initialSnapPoints);
};

export const resetModalProps = (index: number = 0) => {
  bottomSheetStore.props.splice(index, 1, initialProps);
};
