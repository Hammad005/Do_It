import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../utils/colors'

const Splash = () => {
  return (
    <LinearGradient colors={[colors.bgColor1, colors.bgColor2]} style={styles.container}>
      <Text style={{color:"white"}}>Splash</Text>
    </LinearGradient>
  )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})