import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ICON } from '../../utils/icons';
import { FONTS } from '../../utils/fonts';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const CustomModal = ({ visible, title, message, navigate, onClose }) => {
    const redirect = useNavigation();
    useEffect(() => {
        if (!visible) return;

        const timer = setTimeout(() => {
            onClose();
            if (navigate) redirect.replace(navigate || 'Login');
        }, 3000);

        return () => clearTimeout(timer);
    }, [visible, onClose]);

    if (!visible) return null;

    return (
        <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            style={styles.overlay}
        >
            <Animated.View style={styles.alertBox}>
                <Image
                    source={ICON.SUCCESS}
                    style={styles.logo}
                    resizeMode="contain"
                    fadeDuration={0}
                />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.69)',
        zIndex: 999,
    },
    alertBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        width: '80%',
        height: 227,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 17,
    },
    title: {
        fontSize: 16,
        fontFamily: FONTS.BOLD,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: FONTS.REGULAR,
    },
});

export default CustomModal;
