import {
  Pressable,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import colors from '../../utils/colors';
import { useBottomSheet } from '../../context/BottomSheetContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import { BlurView } from '@react-native-community/blur';
import { FONTS } from '../../utils/fonts';


const EditTodo = ({ btnRef, todo }) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const { setIsBottomSheetOpen } = useBottomSheet();

  const [data, setData] = useState({
    todoTilte: todo.title || '',
    todoDescription: todo.description || '',
    todoDate: todo.date || null,
    todoTime: todo.time || null,
  });

  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const BlurBackdrop = props => {
    return (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light"
          blurAmount={50}
          blurRadius={10}
          overlayColor="#D9D9D9"
          reducedTransparencyFallbackColor="white"
        />
      </BottomSheetBackdrop>
    );
  };

  return (
    <BottomSheet
      ref={btnRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      enableBlurKeyboardOnGesture={true}
      handleIndicatorStyle={styles.handleIndicator}
      backdropComponent={BlurBackdrop}
      onChange={index => {
        if (index === -1) {
          setIsBottomSheetOpen(false);
        } else {
          setIsBottomSheetOpen(true);
        }
      }}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={styles.contentContainer}>
            {/* TITLE INPUT */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="checklist" size={18} color="#FFFFFF" />
              <BottomSheetTextInput
                placeholder="Task title"
                placeholderTextColor={'rgba(255,255,255,0.8)'}
                style={styles.input}
                value={data.todoTilte}
                onChangeText={text => setData({ ...data, todoTilte: text })}
              />
            </View>

            {/* DESCRIPTION */}
            <View style={styles.textareaContainer}>
              <MaterialIcons
                name="description"
                size={18}
                color="#FFFFFF"
                style={styles.icon}
              />
              <BottomSheetTextInput
                placeholder="Task description"
                multiline
                placeholderTextColor={'rgba(255,255,255,0.8)'}
                style={styles.textarea}
                value={data.todoDescription}
                onChangeText={text =>
                  setData({ ...data, todoDescription: text })
                }
              />
            </View>

            {/* DATE + TIME */}
            <View style={styles.inputGroup}>
              <Pressable
                style={styles.inputContainer}
                onPress={() => setOpenDate(true)}
              >
                <MaterialIcons
                  name="calendar-month"
                  size={18}
                  color="#FFFFFF"
                />
                <Text style={[styles.dateText, { color: data.todoDate ? '#FFFFFF' : 'rgba(255,255,255,0.8)' }]}>
                  {data.todoDate
                    // ? data.todoDate.toLocaleDateString()
                    ? data.todoDate
                    : 'Select Date'}
                </Text>
              </Pressable>

              <Pressable
                style={styles.inputContainer}
                onPress={() => setOpenTime(true)}
              >
                <MaterialIcons name="timer" size={18} color="#FFFFFF" />
                <Text style={[styles.dateText, { color: data.todoTime ? '#FFFFFF' : 'rgba(255,255,255,0.8)' }]}>
                  {data.todoTime
                    // ? data.todoTime.toLocaleTimeString()
                    ? data.todoTime
                    : 'Select Time'}
                </Text>
              </Pressable>

              <DatePicker
                modal
                mode="date"
                open={openDate}
                date={new Date()}
                onConfirm={date => {
                  setData({ ...data, todoDate: date });
                  setOpenDate(false);
                }}
                onCancel={() => setOpenDate(false)}
              />

              <DatePicker
                modal
                mode="time"
                open={openTime}
                date={new Date()}
                onConfirm={date => {
                  setData({ ...data, todoTime: date });
                  setOpenTime(false);
                }}
                onCancel={() => setOpenTime(false)}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Pressable style={styles.cancelButton} onPress={() => btnRef.current?.close()}>
                <Text style={[styles.buttonText, { color: colors.bgColor2 }]}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Update</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default EditTodo;

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
    borderRadius: 5,
    paddingHorizontal: 16,
    height: 42,
    gap: 10,
    flex: 1,
  },
  input: {
    flex: 1,
    height: 42,
    color: colors.white,
    fontFamily: FONTS.REGULAR,
    fontSize: 16
  },
  textareaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.bgColor2,
    borderRadius: 5,
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
    fontFamily: FONTS.REGULAR,
    fontSize: 16
  },
  inputGroup: {
    marginTop: 22,
    flexDirection: 'row',
    gap: 19,
  },
  dateText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: FONTS.REGULAR
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap:19
  },
  cancelButton: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  button: {
    borderRadius: 10,
    backgroundColor: colors.primary,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: colors.white
  }
});
