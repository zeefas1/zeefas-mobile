import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

export type SheetRef = {
  show: () => void;
  hide: () => void;
};

type SheetProps = {
  children: React.ReactNode;
  snapPoint: number; // Percentage of screen height
  bg?: string;
};

const CustomBottomSheet = forwardRef<SheetRef, SheetProps>(
  ({ children, snapPoint, bg = "white" }, ref) => {
    const sheetRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      show: () => sheetRef.current?.present(),
      hide: () => sheetRef.current?.dismiss(),
    }));

    const snapPoints = useMemo(() => [`${snapPoint}%`], [snapPoint]);

    const renderBackdrop = useCallback(
      (
        props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
      ) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          onPress={() => sheetRef.current?.dismiss()}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={sheetRef}
        index={1}
        snapPoints={snapPoints}
        topInset={30}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        enableDismissOnClose={true}
        handleStyle={{
          backgroundColor: bg,
          borderTopLeftRadius: 13,
          borderTopRightRadius: 13,
        }}
        handleIndicatorStyle={{ backgroundColor: "grey" }}
        style={{ backgroundColor: "#FFFFFF", borderRadius: 13 }}
      >
        <BottomSheetView style={{ flex: 1, height: "100%" }}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

CustomBottomSheet.displayName = "CustomBottomSheet";

export default CustomBottomSheet;
