import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import colors from '../../utils/colors';
import { useBottomSheet } from '../../context/BottomSheetContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';

const CreateTodoBottomSheet = ({ btnRef }) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const { setIsBottomSheetOpen } = useBottomSheet();

  const [data, setData] = useState({
    todoTilte: '',
    todoDescription: '',
    todoDate: new Date(),
    todoTime: new Date(),
  });

  const [open, setOpen] = useState(false);

  return (
    <BottomSheet
      ref={btnRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
      handleIndicatorStyle={styles.handleIndicator}
      onChange={index => {
        if (index === -1) {
          setIsBottomSheetOpen(false);
        } else {
          setIsBottomSheetOpen(true);
        }
      }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <MaterialIcons name="checklist" size={18} color="#FFFFFF" />
          <TextInput
            placeholder="Task title"
            placeholderTextColor={'rgba(255,255,255,0.9)'}
            style={styles.input}
            value={data.todoTilte}
            onChangeText={text => setData({ ...data, todoTilte: text })}
          />
        </View>

        <View style={styles.textareaContainer}>
          <MaterialIcons
            name="description"
            size={18}
            color="#FFFFFF"
            style={styles.icon}
          />
          <TextInput
            placeholder="Task description"
            multiline
            placeholderTextColor={'rgba(255,255,255,0.9)'}
            style={styles.textarea}
            value={data.todoDescription}
            onChangeText={text =>
              setData({ ...data, todoDescription: text })
            }
          />
        </View>

        <View style={styles.inputGroup}>
          {/* FIX: Pressable now calls setOpen(true) to open the modal */}
          <Pressable style={styles.inputContainer} onPress={() => setOpen(true)}>
            {/* FIX: Correct icon for date (was 'timer') */}
            <MaterialIcons name="calendar-month" size={18} color="#FFFFFF" />
            {/* FIX: Display the selected date as text */}
            <Text style={styles.dateText}>
              {data.todoDate.toLocaleDateString()}
            </Text>
          </Pressable>
          <Pressable style={styles.inputContainer} onPress={() => setOpen(true)}>
            {/* FIX: Correct icon for date (was 'timer') */}
            <MaterialIcons name="timer" size={18} color="#FFFFFF" />
            {/* FIX: Display the selected date as text */}
            <Text style={styles.dateText}>
              {data.todoTime.toLocaleTimeString()}
            </Text>
          </Pressable>

          {/* FIX: DatePicker moved outside Pressable — it's a modal, not a child */}
          <DatePicker
            modal
            mode="datetime"
            open={open}
            date={data.todoDate}
            onConfirm={date => {
              setData({ ...data, todoDate: date, todoTime: date });
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default CreateTodoBottomSheet;

const styles = StyleSheet.create({
  handleIndicator: {
    backgroundColor: colors.primary,
    width: 40,
    height: 5,
    borderRadius: 50,
    marginTop: 8,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgColor2,
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 42,
    gap: 10,
    flex:1
  },
  input: {
    flex: 1,
    height: 42,
    color: colors.white,
  },
  textareaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.bgColor2,
    borderRadius: 10,
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 34,
    height: 159,
  },
  icon: {
    marginTop: 10,
  },
  textarea: {
    flex: 1,
    height: '100%',
    color: colors.white,
    textAlignVertical: 'top',
  },
  inputGroup: {
    marginTop: 22,
    flexDirection: 'row',
    gap: 10,
    
  },
  dateText: {
    color: colors.white,
    fontSize: 14,
    
  },
});