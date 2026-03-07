import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'
import { FONTS } from '../../utils/fonts'

const ServicesScreenComponents = ({data}) => {
  return (
    <>
      <Image source={data.icon} style={styles.img} />
      <Text style={styles.smallText}>{data.text}</Text>
    </>
  )
}

export default ServicesScreenComponents

const styles = StyleSheet.create({
    img: {
    width: 251,
    height: 221,
  },
  smallText:{
    fontSize: 20,
    color: colors.white,
    fontFamily: FONTS.REGULAR,
    textAlign: 'center',
    marginTop: 103,
    paddingHorizontal: 60
  }
})