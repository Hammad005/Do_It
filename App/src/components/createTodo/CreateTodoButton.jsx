import { Pressable, StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../utils/colors'
import { FONTS } from '../../utils/fonts'
import { useBottomSheet } from '../../context/BottomSheetContext'
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming 
} from 'react-native-reanimated'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const CreateTodoButton = ({ btnRef }) => {
  const { isBottomSheetOpen } = useBottomSheet()
  const opacity = useSharedValue(1)

  useEffect(() => {
    opacity.value = withTiming(isBottomSheetOpen ? 0 : 1, { duration: 250 })
  }, [isBottomSheetOpen])

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return (
    <AnimatedPressable
      onPress={() => btnRef.current?.expand()}
      pointerEvents={isBottomSheetOpen ? "none" : "auto"}
      style={[styles.btn, animatedStyle]}
    >
      <Text style={styles.btnText}>+</Text>
    </AnimatedPressable>
  )
}

export default CreateTodoButton

const styles = StyleSheet.create({
    btn:{
        position: "absolute",
        bottom: 125,
        right: 20,
        backgroundColor: colors.primary,
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1
    },
    btnText: {
        color: colors.white,
        fontSize: 35,
        lineHeight: 35,
        fontFamily: FONTS.BOLD
    }
})