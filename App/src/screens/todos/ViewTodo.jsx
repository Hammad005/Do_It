import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FONTS } from '../../utils/fonts';
import EditTodo from '../../components/editTodo/EditTodo';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateLabel, formatTime12Hour } from '../../utils/getDateTime';
import { deleteTodo, toggleTodo } from '../../../features/todos/todoThunks';
import Spinner from '../../components/Spinner';

const ViewTodo = ({ route }) => {
  const navigation = useNavigation();
  const btnRef = useRef(null);
  const { todo } = route.params;

  
  const { todos, isTodoToggling, isDeletingTodo } = useSelector(
    state => state.todo,
  );
  const dispatch = useDispatch();
  const currentTodo = todos.find(t => t._id === todo._id);

  const handleToggle = () => {
    dispatch(toggleTodo(todo._id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo._id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        navigation.navigate('Todos', { screen: 'TodoMainScreen' });
      }
    });
  };

  if (!currentTodo) {
  return (
    <LinearGradient
      colors={[colors.bgColor1, colors.bgColor2]}
      style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}
    >
      <Spinner />
    </LinearGradient>
  ) // or a loading spinner if you like
}
  return (
    <LinearGradient
      colors={[colors.bgColor1, colors.bgColor2]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* HEADER */}
        <Pressable
          style={styles.header}
          onPress={() =>
            navigation.navigate('Todos', { screen: 'TodoMainScreen' })
          }
        >
          <MaterialIcons
            name={'navigate-before'}
            size={28}
            color={colors.primary}
          />
          <Text style={styles.headerText}>Todo Details</Text>
        </Pressable>

        {/* TITLE */}
        <View style={styles.titleContent}>
          <Text style={styles.todoTitle}>{currentTodo.title}</Text>

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
          <Text style={styles.todoTiming}>{formatDateLabel(currentTodo.date)}</Text>

          <Text style={styles.todoTiming}>|</Text>

          <MaterialIcons
            name={'timer'}
            size={14}
            color={'rgba(255,255,255,0.8)'}
          />
          <Text style={styles.todoTiming}>{formatTime12Hour(currentTodo.time)}</Text>
        </View>

        <View style={styles.line} />

        {/* DESCRIPTION */}
        <Text style={styles.todoDescription}>{currentTodo.description}</Text>

        {/* BUTTONS */}
        <View style={styles.buttonsContainer}>
          <Pressable
            style={isTodoToggling ? styles.buttonDisabled : styles.button}
            onPress={() => handleToggle()}
            disabled={isTodoToggling}
          >
            {isTodoToggling ? (
              <Spinner size={18} color={colors.white} />
            ) : (
              <>
                <MaterialIcons
                  name={currentTodo.completed ? 'undo' : 'done'}
                  size={18}
                  color={currentTodo.completed ? '#E76666' : '#49EA80'}
                />
                <Text style={styles.buttonText}>
                  {currentTodo.completed ? 'Undone' : 'Done'}
                </Text>
              </>
            )}
          </Pressable>

          <Pressable
            style={isDeletingTodo ? styles.buttonDisabled : styles.button}
            onPress={() => handleDelete()}
            disabled={isDeletingTodo}
          >
            {isDeletingTodo ? (
              <Spinner size={18} color={colors.white} />
            ) : (
              <>
                <MaterialIcons name={'delete'} size={18} color={'#E76666'} />
                <Text style={styles.buttonText}>Delete</Text>
              </>
            )}
          </Pressable>
        </View>
      </SafeAreaView>
      <EditTodo todo={currentTodo} btnRef={btnRef} />
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
    fontSize: 24,
    fontWeight: 700,
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
    paddingTop: 2.5,
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
  buttonDisabled: {
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
    opacity: 0.6,
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
    paddingTop: 2.5,
  },
});
