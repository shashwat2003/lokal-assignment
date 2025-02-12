import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ComponentProps } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styled } from "tamagui";

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
);

export const StyledBottomSheetView = styled(BottomSheetView);
export const StyledBottomSheetScrollView = styled(BottomSheetScrollView);

const StyledBottomSheetFrame = styled(
  BottomSheetModal,
  {
    variants: {
      unstyled: {
        false: {
          paddingHorizontal: "$3",
          marginHorizontal: "$3",
          backgroundStyle: {
            backgroundColor: "$background",
          },
          handleIndicatorStyle: {
            backgroundColor: "$color10",
          },
          detached: true,
        },
      },
    } as const,

    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1",
    },
  },
  {
    accept: {
      backgroundStyle: "style",
      handleIndicatorStyle: "style",
    } as const,
  }
);

export const StyledBottomSheet = StyledBottomSheetFrame.styleable(
  (props, ref) => {
    const { bottom } = useSafeAreaInsets();

    return (
      <StyledBottomSheetFrame
        ref={ref}
        backdropComponent={renderBackdrop}
        bottomInset={bottom}
        {...props}
      />
    );
  }
);

export type StyledBottomSheetProps = ComponentProps<typeof StyledBottomSheet>;
