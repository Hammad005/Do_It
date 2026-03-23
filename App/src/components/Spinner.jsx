import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    Easing,
} from "react-native-reanimated";
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Spinner = ({ color = "white", size = 30 }) => {
    const rotation = useSharedValue(0);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, {
                duration: 800,
                easing: Easing.linear, // 🔥 important for smooth loop
            }),
            -1, // infinite
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${rotation.value % 360}deg`, // 🔥 prevents jump glitch
                },
            ],
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={animatedStyle}>
                <EvilIcons
                    name={'spinner-3'}
                    size={size}
                    color={color}
                />
            </Animated.View>
        </View>
    );
};

export default Spinner;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
});