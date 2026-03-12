import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import colors from '../../utils/colors';
import { useBottomSheet } from '../../context/BottomSheetContext';

const CreateTodoBottomSheet = ({btnRef}) => {
    const snapPoints = useMemo(() => ["25%", "50%"], []);
    const {setIsBottomSheetOpen} = useBottomSheet();
  return (
    
     <BottomSheet
        ref={btnRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose
        handleIndicatorStyle={styles.handleIndicator}
        onChange={(index) => {
          if (index === -1) {
            setIsBottomSheetOpen(false);
        }else {
            setIsBottomSheetOpen(true);
        }
        }}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    
  )
}

export default CreateTodoBottomSheet

const styles = StyleSheet.create({
  handleIndicator: {
    backgroundColor: colors.primary,
    width: 40,
    height: 5,
    borderRadius: 50,
    marginTop: 8,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    zIndex: 10
  },
})