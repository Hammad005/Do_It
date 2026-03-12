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
import React, { useRef, useState } from 'react';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { todos } from '../../utils/dummyData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS } from '../../utils/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TodoSearchHeader from '../../components/todos/TodoSearchHeader';
import {getDateTime} from '../../utils/getDateTime'
import CreateTodoButton from '../../components/createTodo/CreateTodoButton'
import CreateTodoBottomSheet from '../../components/createTodo/CreateTodoBottomSheet'

const TodosScreen = () => {
  const [filteredTodo, setFilteredTodo] = useState(todos);
  const [search, setSearch] = useState('');
  const [filterationOptions, setFilterationOptions] = useState('All');
  const btnRef = useRef(null);

  const applyFilters = (searchText, filterOption) => {
    let data = [...todos];

    // search filter
    if (searchText) {
      data = data.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // status filter
    if (filterOption === 'Completed') {
      data = data.filter(item => item.completed === true);
    }

    if (filterOption === 'Incomplete') {
      data = data.filter(item => item.completed === false);
    }

    // sorting
if (filterOption === 'Ascending') {
  data.sort((a, b) => getDateTime(a) - getDateTime(b));
}

if (filterOption === 'Descending') {
  data.sort((a, b) => getDateTime(b) - getDateTime(a));
}

    setFilteredTodo(data);
  };

  const handleSearch = text => {
    setSearch(text);
    applyFilters(text, filterationOptions);
  };

  const handleFilter = option => {
    setFilterationOptions(option);
    applyFilters(search, option);
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
      return <Text style={[styles.heading, { marginTop: 0 }]}>Tasks List</Text>;
    }
    return null;
  };

  return (
    <LinearGradient
      colors={[colors.bgColor1, colors.bgColor2]}
      style={styles.container}
    >
      <CreateTodoButton btnRef={btnRef}/>
      
      <SafeAreaView style={{ flex: 1, marginBottom: 60 }}>
        <TodoSearchHeader
          search={search}
          handleSearch={handleSearch}
          filterationOptions={filterationOptions}
          handleFilter={handleFilter}
        />

        <FlatList
          data={filteredTodo}
          keyExtractor={item => item.title}
          // ListHeaderComponent={<TodoSearchHeader search={search} handleSearch={handleSearch}/>}
          ListEmptyComponent={
            <Text style={styles.noTaskText}>No Task Found</Text>
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <>
              {renderSectionHeader({ index })}
              {renderItems({ item })}
            </>
          )}
        />
      <CreateTodoBottomSheet btnRef={btnRef}/>
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
  noTaskText: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: colors.white,
    letterSpacing: 1,
    textAlign: 'center',
  },
});
