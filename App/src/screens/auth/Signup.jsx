import {
  Alert,
  Image,
  KeyboardAvoidingView,
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
import { ICON } from '../../utils/icons';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS } from '../../utils/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../components/modal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../features/auth/authThunks';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const Signup = () => {
  const [authData, setAuthData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { isSigningUp, message } = useSelector(state => state.auth);

  const spinnerValue = useSharedValue(0);

  useEffect(() => {
    if (isSigningUp) {
      spinnerValue.value = withRepeat(
        withTiming(1, { duration: 800 }), // fast & smooth
        -1,
        false,
      );
    } else {
      spinnerValue.value = 0; // reset when done
    }
  }, [isSigningUp]);
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${spinnerValue.value * 360}deg`,
        },
      ],
    };
  });

  const handleSignup = async () => {
    const formData = {
      fullName: authData.fullName,
      email: authData.email,
      password: authData.password,
    };
    const res = await dispatch(register(formData));
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
        navigate="VerifyAccount"
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
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            style={{ flex: 1 }}
          >
            <View style={styles.container}>
              <Image
                source={ICON.LOGO}
                style={styles.logo}
                resizeMode="contain"
                fadeDuration={0}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>Welcome Back to</Text>
                <Text style={styles.titleLogo}>Do It</Text>
              </View>
              <Text style={styles.smallText}>
                create an account and Join us now!
              </Text>

              {/* Name Input */}
              <View style={styles.inputContainer}>
                <MaterialIcons name={'person'} size={30} />
                <TextInput
                  value={authData.fullName}
                  onChangeText={text =>
                    setAuthData({ ...authData, fullName: text })
                  }
                  placeholder="Full Name"
                  placeholderTextColor={colors.authInputPlaceholder}
                  style={styles.input}
                />
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <MaterialIcons name={'mail'} size={30} />
                <TextInput
                  keyboardType="email-address"
                  value={authData.email}
                  onChangeText={text =>
                    setAuthData({ ...authData, email: text })
                  }
                  placeholder="Email"
                  placeholderTextColor={colors.authInputPlaceholder}
                  style={styles.input}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <MaterialIcons name={'lock'} size={30} />
                <TextInput
                  secureTextEntry={!showPassword}
                  value={authData.password}
                  onChangeText={text =>
                    setAuthData({ ...authData, password: text })
                  }
                  placeholder="Password"
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
                style={isSigningUp ? styles.disabledBtn : styles.btn}
                onPress={() => handleSignup()}
                activeOpacity={0.85}
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <Animated.View style={stylez}>
                    <EvilIcons
                      name={'spinner-3'}
                      size={30}
                      color={colors.white}
                    />
                  </Animated.View>
                ) : (
                  <Text style={styles.btnText}>Sign Up</Text>
                )}
              </TouchableOpacity>

              <View style={styles.textInLineContainer}>
                <Text style={styles.text}>Already have an account?</Text>
                <Text style={styles.linkText} onPress={() => navigate.goBack()}>
                  sign in
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
};

export default Signup;

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
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 83,
    height: 83,
    alignSelf: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 25,
    marginBottom: -4,
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
    color: colors.white,
    fontFamily: FONTS.MEDIUM,
  },
  titleLogo: {
    fontSize: 25,
    color: colors.white,
    fontFamily: FONTS.LOGO_FONT,
    textTransform: 'uppercase',
    marginTop: -3,
  },
  smallText: {
    fontSize: 18,
    color: colors.white,
    fontFamily: FONTS.REGULAR,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    marginTop: 41,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 42,
    fontFamily: FONTS.REGULAR,
    fontSize: 18,
    paddingTop: 0,
    paddingBottom: 0,
    color: '#000',
  },
  disabledBtn: {
    backgroundColor: colors.primary,
    opacity: 0.5,
    borderRadius: 10,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 47,
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 47,
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
    marginTop: 25,
    gap: 5,
  },
  text: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 14,
    color: colors.white,
    letterSpacing: 1,
  },
  linkText: {
    fontSize: 14,
    color: colors.primary,
    textDecorationLine: 'underline',
    fontFamily: FONTS.MEDIUM,
    letterSpacing: 2,
  },
});
