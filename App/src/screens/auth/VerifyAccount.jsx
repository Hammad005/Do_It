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
import React, { useEffect, useRef, useState } from 'react';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS } from '../../utils/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { resendOTP, verifyAccount } from '../../../features/auth/authThunks';
import Spinner from '../../components/Spinner';

const VerifyAccount = ({ route, navigation }) => {
  const paramEmail = route?.params?.userEmail;

  const [data, setAuthData] = useState({
    code: '',
  });
  const [canResend, setCanResend] = useState(false);
  const [count, setCount] = useState(60);
  const dispatch = useDispatch();
  const { isVerifying, isResending, userEmail: storeEmail  } = useSelector(
    state => state.auth,
  );

  const emailToUse = storeEmail || paramEmail;


  const handleVerify = async () => {
    const formData = {
      email: emailToUse,
      otp: data.code,
    };

    dispatch(verifyAccount(formData));

  };

  const handleResend = async () => {
    // dispatch your resend OTP thunk here
    const res = await dispatch(resendOTP({email: emailToUse}));
    if (res.meta.requestStatus === 'fulfilled') {
      // reset timer
      setCount(60);
      setCanResend(false);
    }
  };
  useEffect(() => {
    let interval;

    if (!canResend) {
      interval = setInterval(() => {
        setCount(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [canResend]);
  return (
    <>
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
              <Text style={styles.mainTitle}>Verify account</Text>

              {/* Box */}
              <LinearGradient
                colors={[colors.boxColor2, colors.boxColor3]}
                style={styles.box}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.logoContainer}>
                  <Text style={styles.titleLogo}>Do It</Text>
                </View>
                <Text style={styles.smallText}>
                  By verifying your account, you data will be secured and be
                  default you are accepting our terms and policies
                </Text>

                {/* Code Input */}
                <View style={styles.inputContainer}>
                  <TextInput
                    keyboardType="decimal-pad"
                    value={data.code}
                    onChangeText={text => setAuthData({ ...data, code: text })}
                    placeholder="Verification code"
                    placeholderTextColor={colors.authInputPlaceholder}
                    style={styles.input}
                  />
                </View>

                <TouchableOpacity
                  style={isVerifying ? styles.disabledBtn : styles.btn}
                  onPress={handleVerify}
                  activeOpacity={0.85}
                >
                  {isVerifying ? (
                    <Spinner/>
                  ) : (
                    <Text style={styles.btnText}>Verify</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.resend}>
                  <Text style={styles.resendText}>Didn't receive code? </Text>
                  {!canResend ? (
                    <>
                      <Text style={styles.countDown}>{count}s</Text>
                    </>
                  ) : isResending ? (
                    <Spinner color={colors.primary}/>
                  ) : (
                    <>
                      <Pressable onPress={handleResend}>
                        <Text style={styles.link}>Resend</Text>
                      </Pressable>
                    </>
                  )}
                </View>
              </LinearGradient>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
};

export default VerifyAccount;

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
  logoContainer: {
    height: 63,
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
    marginTop: 50,
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
  textInLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 19,
    gap: 5,
  },
  resend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 19,
    gap: 5,
  },
  resendText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: FONTS.MEDIUM,
  },
  link: {
    fontSize: 16,
    color: colors.primary,
    textDecorationLine: 'underline',
    fontFamily: FONTS.MEDIUM,
  },
  countDown: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: FONTS.MEDIUM,
  },
});
