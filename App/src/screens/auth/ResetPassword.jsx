import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS } from '../../utils/fonts';
import CustomModal from '../../components/modal/CustomModal';
import Spinner from '../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { resetUserPassword } from '../../../features/auth/authThunks';


const ResetPassword = ({ route, navigation }) => {
  const email = route.params.userEmail;
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { isPasswordReset, message } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleVerify = async () => {
    const formData = {
      email: email,
      newPassword: newPassword,
    };

    const res = await dispatch(resetUserPassword(formData));
    if (res.meta.requestStatus === 'fulfilled') {
    setModalVisible(true);
    }
  };

  return (
    <>
      <CustomModal
        visible={modalVisible}
        title="Success"
        message={message}
        navigate="Login"
        email={email}
        onClose={() => setModalVisible(false)}
      />
      <LinearGradient
        colors={[colors.bgColor1, colors.bgColor2]}
        style={styles.mainContainer}
      >
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={false}
            style={{ flex: 1 }}
          >
            <View style={styles.container}>
              <Text style={styles.mainTitle}>Reset Password</Text>

              {/* Box */}
              <LinearGradient
                colors={[colors.boxColor2, colors.boxColor3]}
                style={styles.box}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.titleLogo}>Do It</Text>
                <Text style={styles.smallText}>
                  Enter your your new password to reset
                </Text>

                {/* Code Input */}
                {/* Password Input */}
                <View style={[styles.inputContainer]}>
                  <TextInput
                    secureTextEntry={!showPassword}
                    value={newPassword}
                    onChangeText={text =>
                      setNewPassword(text)
                    }
                    placeholder="New Password"
                    placeholderTextColor={colors.authInputPlaceholder}
                    style={styles.input}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <MaterialIcons
                      name={showPassword ? 'visibility' : 'visibility-off'}
                      size={30}
                    />
                  </Pressable>
                </View>

                <TouchableOpacity
                  style={isPasswordReset ? styles.disabledBtn : styles.btn}
                  onPress={handleVerify}
                  activeOpacity={0.85}
                  disabled={isPasswordReset}
                >
                  {isPasswordReset ? (
                    <Spinner />
                  ) : (
                    <Text style={styles.btnText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  mainTitle: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.white,
    fontFamily: FONTS.MEDIUM,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 468,
    borderRadius: 10,
    marginTop: 48,
    padding: 42,
  },
  titleLogo: {
    fontSize: 36,
    color: colors.white,
    fontFamily: FONTS.LOGO_FONT,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: FONTS.MEDIUM,
    textAlign: 'center',
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    marginTop: 48,
    paddingHorizontal: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 42,
    fontFamily: FONTS.REGULAR,
    fontSize: 18,
    paddingTop: 0,
    paddingBottom: 0,
    color: '#000',
    textAlign: 'start',
  },
  disabledBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    opacity: 0.5,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 23,
    width: '100%',
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 23,
    width: '100%',
  },
  btnText: {
    color: colors.white,
    fontFamily: FONTS.MEDIUM,
    fontSize: 18,
    letterSpacing: 1,
  },
});
