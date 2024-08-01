// BottomSheetAvatar.tsx
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import AvatarPicker from './avatarpicaker'; // Pastikan path-nya benar
import Toast from 'react-native-toast-message';

interface BottomSheetAvatarProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  handleSelectAvatar: (avatar: string) => void;
}

const BottomSheetAvatar: React.FC<BottomSheetAvatarProps> = ({
  bottomSheetModalRef,
  handleSelectAvatar,
}) => {
  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Sukses!',
      text2: 'Foto profil berhasil diganti.',
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const handleAvatarChange = (avatar: string) => {
    handleSelectAvatar(avatar);
    showSuccessToast();
  };

  return (
    <View style={{flex: 1}}>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={['25%', '50%', '70%']}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.7}
            appearsOnIndex={1}
            disappearsOnIndex={-1}
          />
        )}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollView}>
          <AvatarPicker onSelectAvatar={handleAvatarChange} />
        </ScrollView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 100,
  },
});

export default BottomSheetAvatar;
