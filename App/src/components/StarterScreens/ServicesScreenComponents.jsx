import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import colors from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const ServicesScreenComponents = ({ data, currentIndex }) => {

  const translateX = useSharedValue(width);

  useEffect(() => {
    translateX.value = width;

    translateX.value = withTiming(0, {
      duration: 350,
    });
  }, [currentIndex]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image
        source={data[currentIndex].icon}
        alt={data[currentIndex].text}
        style={{
          width: data[currentIndex].width,
          height: data[currentIndex].height,
        }}
        resizeMode="contain"
        fadeDuration={0}
      />

      <Text style={styles.smallText}>
        {data[currentIndex].text}
      </Text>
    </Animated.View>
  );
};

export default ServicesScreenComponents;

const styles = StyleSheet.create({
  container: {
    height: '70%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  smallText: {
    fontSize: 20,
    color: colors.white,
    fontFamily: FONTS.REGULAR,
    textAlign: 'center',
    marginTop: 50,
    paddingHorizontal: 60,
  },
});