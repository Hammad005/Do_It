import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS } from '../../utils/fonts';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CustomModal from '../../components/modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { verifyAccount } from '../../../features/auth/authThunks';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const VerifyAccount = () => {
  const [data, setAuthData] = useState({
    code: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { userEmail, isVerifying } = useSelector(state => state.auth);

  const spinnerValue = useSharedValue(0);

  useEffect(() => {
    if (isVerifying) {
      spinnerValue.value = withRepeat(
        withTiming(1, { duration: 800 }), // fast & smooth
        -1,
        false,
      );
    } else {
      spinnerValue.value = 0; // reset when done
    }
  }, [isVerifying]);
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${spinnerValue.value * 360}deg`,
        },
      ],
    };
  });

  const handleVerify = async () => {
    const formData = {
      email: userEmail,
      otp: data.code,
    };

    const res = await dispatch(verifyAccount(formData));
    if (res.meta.requestStatus === 'fulfilled') {
      setModalVisible(true);
    }
  };
  return (
    <>
      <CustomModal
        visible={modalVisible}
        title={`${userEmail} is verified`}
        navigate={'HomeMain'}
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
                    <Animated.View style={stylez}>
                      <EvilIcons
                        name={'spinner-3'}
                        size={30}
                        color={colors.white}
                      />
                    </Animated.View>
                  ) : (
                    <Text style={styles.btnText}>Verify</Text>
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
});
