import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'
import LinearGradient from 'react-native-linear-gradient'

const HomeScreen = () => {
  return (
    <LinearGradient
      colors={[colors.bgColor1, colors.bgColor2]}
      style={styles.container}
    >
      <View>
      <Text>HomeScreen</Text>
      </View>
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})