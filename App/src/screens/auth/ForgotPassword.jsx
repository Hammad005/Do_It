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
import { sendForgotPasswordCode } from '../../../features/auth/authThunks';

const ForgotPassword = () => {
  
  const [email, setEmail] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const { isforgatting, message } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  


  const handleVerify = async () => {
    const formData = {
      email: email,
    };

    const res = await dispatch(sendForgotPasswordCode(formData));
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
            navigate="ForgotPasswordCodeVerification"
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
              <Text style={styles.mainTitle}>Forgot Password</Text>

              {/* Box */}
              <LinearGradient
                colors={[colors.boxColor2, colors.boxColor3]}
                style={styles.box}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.titleLogo}>Do It</Text>
                <Text style={styles.smallText}>
                  Enter your email to receive a verification code to reset your password 
                </Text>

                {/* Code Input */}
                <View style={styles.inputContainer}>
                  <TextInput
                    keyboardType="email-address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Email"
                    placeholderTextColor={colors.authInputPlaceholder}
                    style={styles.input}
                  />
                </View>

                <TouchableOpacity
                  style={isforgatting ? styles.disabledBtn : styles.btn}
                  onPress={handleVerify}
                  activeOpacity={0.85}
                  disabled={isforgatting}
                >
                  {isforgatting ? (
                    <Spinner/>
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

export default ForgotPassword;

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
    marginTop: 55,
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
    textAlign: 'center',
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
