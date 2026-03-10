import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const Settings = () => {
    const navigation = useNavigation();
    return (
        <LinearGradient
            colors={[colors.bgColor1, colors.bgColor2]}
            style={styles.container}
        >
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
                activeOpacity={0.85}
            >
                <MaterialIcons name="chevron-left" size={28} color={colors.primary} />
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: "white",
        borderRadius: 100,
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        zIndex: 1,
        left: 20,
        top: 65
    }
})