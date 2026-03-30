import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../utils/colors';
import { Picker } from '@react-native-picker/picker';

const TodoSearchHeader = ({
  search,
  handleSearch,
  filterationOptions,
  handleFilter,
}) => {

  const options = ['Completed', 'Incomplete'];

  return (
    <View style={styles.headerContainer}>

      {/* SEARCH INPUT */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search by task title"
          style={styles.input}
          placeholderTextColor={'rgba(255,255,255,0.6)'}
          value={search}
          onChangeText={handleSearch}
        />

        <MaterialIcons
          name="search"
          size={18}
          color="rgba(255,255,255,0.5)"
          style={styles.icon}
        />
      </View>

      {/* FILTER PICKER */}
      <View style={styles.pickerContainer}>

        <MaterialIcons
          name="filter-list"
          size={18}
          color="rgba(255,255,255,0.6)"
          style={{ marginLeft: 8 }}
        />

        <Picker
          selectedValue={filterationOptions}
          style={styles.picker}
          dropdownIconColor="white"
          onValueChange={(value) => handleFilter(value)}
        >
          <Picker.Item label="All" value="All" />

          {options.map(item => (
            <Picker.Item key={item} label={item} value={item} />
          ))}

        </Picker>

      </View>
    </View>
  );
};

export default TodoSearchHeader;

const styles = StyleSheet.create({

  headerContainer: {
    marginVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  inputContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16,45,83,0.8)',
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    height: 42,
    color: colors.white,
  },

  icon: {
    position: 'absolute',
    right: 10,
  },

  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16,45,83,0.8)',
    borderRadius: 10,
    height: 42,
  },

  picker: {
    flex: 1,
    color: colors.white,
  },

});