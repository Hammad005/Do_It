import { Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FONTS } from '../../utils/fonts';
import EditTodo from '../../components/editTodo/EditToto';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const ViewTodo = ({ todo, setSelectedTodo }) => {
  const btnRef = useRef(null);

  const translateX = useSharedValue(width);

  useEffect(() => {
    translateX.value = withTiming(0, {
      duration: 350,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const handleBack = () => {
    translateX.value = withTiming(
      width,
      {
        duration: 300,
        easing: Easing.in(Easing.cubic),
      },
      () => {
        runOnJS(setSelectedTodo)(null);
      },
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <LinearGradient
      colors={[colors.bgColor1, colors.bgColor2]}
      style={styles.container}
    >
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* HEADER */}
          <Pressable style={styles.header} onPress={handleBack}>
            <MaterialIcons
              name={'navigate-before'}
              size={28}
              color={colors.primary}
            />
            <Text style={styles.headerText}>Todo Details</Text>
          </Pressable>

          {/* TITLE */}
          <View style={styles.titleContent}>
            <Text style={styles.todoTitle}>{todo.title}</Text>

            <Pressable onPress={() => btnRef.current?.expand()}>
              <MaterialIcons
                name={'edit-note'}
                size={30}
                color={colors.primary}
              />
            </Pressable>
          </View>

          {/* DATE + TIME */}
          <View style={styles.timingContent}>
            <MaterialIcons
              name={'calendar-month'}
              size={14}
              color={'rgba(255,255,255,0.8)'}
            />
            <Text style={styles.todoTiming}>{todo.date}</Text>

            <Text style={styles.todoTiming}>|</Text>

            <MaterialIcons
              name={'timer'}
              size={14}
              color={'rgba(255,255,255,0.8)'}
            />
            <Text style={styles.todoTiming}>{todo.time}</Text>
          </View>

          <View style={styles.line} />

          {/* DESCRIPTION */}
          <Text style={styles.todoDescription}>{todo.description}</Text>

          {/* BUTTONS */}
          <View style={styles.buttonsContainer}>
            <Pressable style={styles.button}>
              <MaterialIcons name={'done'} size={18} color={'#49EA80'} />
              <Text style={styles.buttonText}>Done</Text>
            </Pressable>

            <Pressable style={styles.button}>
              <MaterialIcons name={'delete'} size={18} color={'#E76666'} />
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Animated.View>
      <EditTodo todo={todo} btnRef={btnRef} />
    </LinearGradient>
  );
};

export default ViewTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 20,
  },
  headerText: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: colors.white,
  },
  titleContent: {
    marginTop: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  todoTitle: {
    fontSize: 18,
    fontFamily: FONTS.MEDIUM,
    color: colors.white,
  },
  timingContent: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  todoTiming: {
    fontSize: 14,
    fontFamily: FONTS.REGULAR,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  line: {
    marginTop: 26,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  todoDescription: {
    marginTop: 25,
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: colors.white,
  },
  buttonsContainer: {
    marginTop: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 35,
  },
  button: {
    height: 42,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgColor2,
    shadowColor: 'rgba(255, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    boxShadow: '0px 0px 10px 1px rgba(255, 255, 255, 0.25)',
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: colors.white,
  },
});
