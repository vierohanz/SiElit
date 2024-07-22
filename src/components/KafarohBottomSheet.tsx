// KafarohBottomSheet.tsx
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

// Define the ref type to be the BottomSheetModal instance
export interface KafarohBottomSheetRef {
  present: () => void;
  dismiss: () => void;
}

const KafarohBottomSheet = forwardRef<KafarohBottomSheetRef>((props, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    present: () => {
      bottomSheetModalRef.current?.present();
    },
    dismiss: () => {
      bottomSheetModalRef.current?.dismiss();
    },
  }));

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={['25%', '50%']}
      style={styles.bottomSheet}>
      <View style={styles.bottomSheetContent}>
        <Text style={styles.bottomSheetText}>
          This is the Kafaroh Bottom Sheet
        </Text>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  bottomSheet: {
    zIndex: 1000,
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default KafarohBottomSheet;
