import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../utils/colors'
import { FONTS } from '../../utils/fonts'

const CreateTodoButton = () => {
  return (
    <View style={styles.btn}>
      <Text style={styles.btnText}>+</Text>
    </View>
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