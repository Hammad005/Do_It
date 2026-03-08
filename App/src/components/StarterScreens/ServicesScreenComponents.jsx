import { Image, StyleSheet, Text, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../utils/colors';
import { FONTS } from '../../utils/fonts';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ServicesScreenComponents = ({ data, currentIndex, setCurrentIndex }) => {
  const translateX = useSharedValue(0);
  const [renderIndex, setRenderIndex] = useState(currentIndex);
  const navigate = useNavigation();

  const nextSlide = () => {
    if (currentIndex === 3) return navigate.replace('Login');
    if (currentIndex < data.length - 1) {
      setRenderIndex(prev => prev + 1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (renderIndex === currentIndex) return;
    const updateRenderIndex = () => setRenderIndex(currentIndex);

    translateX.value = withTiming(-width, { duration: 300 }, finished => {
      if (finished) {
        runOnJS(updateRenderIndex)(); // ← swap this in
        translateX.value = width;
        translateX.value = withTiming(0, { duration: 300 });
      }
    });
  }, [currentIndex]);


  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(event => {
      if (event.translationX < -100) {
        // animate slide out
        translateX.value = withTiming(-width, { duration: 300 }, finished => {
          if (finished) {
            scheduleOnRN(nextSlide);
            translateX.value = width; // prepare next slide from right
            translateX.value = withTiming(0, { duration: 300 });
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Image
          source={data[renderIndex].icon}
          alt={data[renderIndex].text}
          style={{
            width: 251,
            height: 221,
          }}
          resizeMode="contain"
          fadeDuration={0}
        />

        <Text style={styles.smallText}>{data[renderIndex].text}</Text>
      </Animated.View>
    </GestureDetector>
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
