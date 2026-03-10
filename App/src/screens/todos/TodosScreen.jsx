import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { todos } from '../../utils/dummyData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS } from '../../utils/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TodosScreen = () => {

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.inputContainer}>
          <TextInput 
          placeholder='Search by task title'
          style={styles.input}
          />
          <MaterialIcons
          name={'search'}
          size={17}
          color={'rgba(255, 255, 255, 0.5)'}
        />
        </View>
      </View>
    );
  };

  const renderItems = ({ item }) => {
    return (
      <TouchableOpacity style={styles.box} activeOpacity={0.85}>
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
  const renderSectionHeader = ({ index }) => {
    if (index === 0) {
      return (
        <Text style={[styles.heading, { marginTop: 0 }]}>Tasks List</Text>
      );
    }
    return null;
  };

  return (
    <LinearGradient
      colors={[colors.bgColor1, colors.bgColor2]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1, marginBottom: 60 }}>
        <Header />
        <FlatList
          data={todos}
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

export default TodosScreen;

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
  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "rgba(16, 45, 83, 0.8)",
    borderRadius: 10,
    paddingHorizontal: 10
  },
  input: {
    flexGrow:1,
    height: 42,
    borderRadius:10,
    backgroundColor: "rgba(16, 45, 83, 0.8)",
    padding: 10,
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
