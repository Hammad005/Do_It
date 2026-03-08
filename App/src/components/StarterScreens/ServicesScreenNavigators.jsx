import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../utils/colors'
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming 
} from 'react-native-reanimated'

const Dot = ({ active }) => {
  const width = useSharedValue(18)

  useEffect(() => {
    width.value = withTiming(active ? 33 : 18, { duration: 250 })
  }, [active])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value
    }
  })

  return <Animated.View style={[styles.dot, animatedStyle]} />
}

const ServicesScreenNavigators = ({ data, currentIndex }) => {
  return (
    <View style={styles.container}>
      {data?.map((_, i) => (
        <Dot key={i} active={currentIndex === i} />
      ))}
    </View>
  )
}

export default ServicesScreenNavigators

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10
  },
  dot: {
    backgroundColor: colors.white,
    height: 7,
    borderRadius: 10
  }
})