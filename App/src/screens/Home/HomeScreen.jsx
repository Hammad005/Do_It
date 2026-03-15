import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { todos } from '../../utils/dummyData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS } from '../../utils/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ViewTodo from '../../components/viewTodo/ViewTodo';

const HomeScreen = () => {
  // Sort: incomplete first, completed last
  const sortedTodos = [
    ...todos.filter(item => item.completed === false),
    ...todos.filter(item => item.completed === true),
  ];
    const [selectedTodo, setSelectedTodo] = useState(null);
  
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/user/defaultProfile.png')}
          style={styles.profileImage}
          resizeMode="contain"
          fadeDuration={0}
        />
        <View>
          <Text style={styles.userName}>Hammad Khatri</Text>
          <Text style={styles.email}>test@mail.com</Text>
        </View>
      </View>
    );
  };
  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity style={styles.box} activeOpacity={0.85} onPress={() => setSelectedTodo(item)}>
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

  // Index where completed tasks begin
  const completedStartIndex = todos.filter(item => !item.completed).length;
  const renderSectionHeader = ({ index }) => {
    if (index === 0) {
      return (
        <Text style={[styles.heading, { marginTop: 0 }]}>Incomplete Tasks</Text>
      );
    }
    if (index === completedStartIndex) {
      return <Text style={styles.heading}>Completed Tasks</Text>;
    }
    return null;
  };

  if (selectedTodo) {
    return (
      <ViewTodo todo={selectedTodo} setSelectedTodo={setSelectedTodo} />
    );
  }
  return (
    <LinearGradient
      colors={[colors.bgColor1, colors.bgColor2]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1, marginBottom: 60 }}>
        <Header />
        <FlatList
          data={sortedTodos}
          keyExtractor={item => item.title}
          // ListHeaderComponent={Header}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <>
              {renderSectionHeader({ index })}
              {renderItems({ item })}
            </>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginVertical: 25,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  userName: {
    fontSize: 18,
    fontFamily: FONTS.SEMIBOLD,
    color: colors.white,
    letterSpacing: 1,
  },
  email: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 1,
  },
  heading: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: colors.white,
    letterSpacing: 1,
    marginVertical: 15,
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
});
