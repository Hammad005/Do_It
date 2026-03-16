import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';
import { Calendar } from 'react-native-calendars';
import { todos } from '../../utils/dummyData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FONTS } from '../../utils/fonts';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const CalendarMainScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().split('T')[0],
  );

  const markedDates = useMemo(() => {
    const marks = {};

    todos.forEach(todo => {
      marks[todo.date] = {
        customStyles: {
          container: {
            backgroundColor: colors.secondary,
            borderRadius: 6,
          },
          text: {
            color: colors.white,
            fontWeight: '600',
          },
        },
      };
    });

    if (selected) {
      marks[selected] = {
        customStyles: {
          container: {
            backgroundColor: colors.primary,
            borderRadius: 6,
          },
          text: {
            color: colors.white,
            fontWeight: '700',
          },
        },
      };
    }

    return marks;
  }, [selected]);

  const sortedTodos = useMemo(() => {
    return todos.filter(item => item.date === selected);
  }, [selected]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSelected('');
      };
    }, []),
  );

  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.box}
        activeOpacity={0.85}
        onPress={() => {
          navigation.navigate('Todos', {
            screen: 'ViewTodo',
            params: { todo: item },
          });
        }}
      >
        <View style={styles.boxContent}>
          {item.completed && (
            <Image
              source={require('../../assets/todo/todo-completed.png')}
              style={{
                width: 25,
                height: 25,
              }}
              resizeMode="contain"
              fadeDuration={0}
            />
          )}
          <View>
            <Text style={styles.boxTitle}>{item.title}</Text>
            <Text style={styles.boxDate}>
              {item.date} | {item.time}
            </Text>
          </View>
        </View>
        <MaterialIcons
          name={'navigate-next'}
          size={28}
          color={colors.primary}
        />
      </TouchableOpacity>
    );
  };

  const Header = () => {
    return (
      <LinearGradient
        colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.calendarContainer}
      >
        <Calendar
          current={currentMonth}
          markingType="custom"
          markedDates={markedDates}
          enableSwipeMonths={false}
          renderHeader={date => (
            <Text
              style={{ color: colors.white, fontSize: 18, fontWeight: '700' }}
            >
              {date.toString('MMMM')}
            </Text>
          )}
          renderArrow={direction => (
            <View style={{ marginHorizontal: 50 }}>
              <MaterialIcons
                name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
                size={30}
                color={'#63D9F3'}
              />
            </View>
          )}
          onDayPress={day => {
            setSelected(day.dateString);
            setCurrentMonth(day.dateString);
          }}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: colors.white,
            todayTextColor: '#7bff9c',
            dayTextColor: colors.white,
            textDisabledColor: '#8D8D8D',
            monthTextColor: colors.white,
          }}
        />
      </LinearGradient>
    );
  };
  return (
    <LinearGradient
      colors={[colors.bgColor1, colors.bgColor2]}
      style={styles.container}
    >
      <View style={{ marginBottom: 80 }}>
        {/* <Header /> */}
        <FlatList
          data={sortedTodos}
          keyExtractor={item => item.title}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Header />}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
          }}
          ListEmptyComponent={
            <Text style={styles.noTaskText}>No Todo Found</Text>
          }
          renderItem={({ item, index }) => <>{renderItems({ item })}</>}
        />
      </View>
    </LinearGradient>
  );
};

export default CalendarMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  calendarContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    marginVertical: 15,
    paddingHorizontal: 25,
    paddingVertical: 12,
  },
  boxContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  boxTitle: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    letterSpacing: 1,
  },
  boxDate: {
    fontSize: 12,
    fontFamily: FONTS.REGULAR,
    letterSpacing: 1,
    color: 'rgba(0, 0, 0, 0.9)',
  },
  noTaskText: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: colors.white,
    letterSpacing: 1,
    textAlign: 'center',
  },
});
