import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../../utils/colors';
import { ICON } from '../../utils/icons';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS } from '../../utils/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigation();

  const handleLogin = () => {
    const formData = new FormData();
    formData.append('email', authData.email);
    formData.append('password', authData.password);

    Alert.alert('Login');
  }
  return (
    <LinearGradient
      colors={[colors.bgColor1, colors.bgColor2]}
      style={styles.container}
    >
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
      <Text style={styles.smallText}>Have an other productive day !</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <MaterialIcons name={'mail'} size={30} />
        <TextInput
          keyboardType="email-address"
          value={authData.email}
          onChangeText={text => setAuthData({ ...authData, email: text })}
          placeholder="Email"
          placeholderTextColor={colors.authInputPlaceholder}
          style={styles.input}
        />
      </View>

      {/* Password Input */}
      <View style={[styles.inputContainer, { marginTop: 56 }]}>
        <MaterialIcons name={'lock'} size={30} />
        <TextInput
          secureTextEntry={showPassword === true ? false : true}
          value={authData.password}
          onChangeText={text => setAuthData({ ...authData, password: text })}
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

      <Text style={styles.forgotPassword}>
        forget password?
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={handleLogin}
        activeOpacity={0.85}
      >
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.textInLineContainer}>
        <Text style={styles.text}>Don’t have an account?</Text>
        <Text style={styles.linkText} onPress={() => navigate.navigate('Signup')}>
          sign up
        </Text>
      </View>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
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
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    marginTop: 48,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 42,
    fontFamily: FONTS.REGULAR,
    fontSize: 18,
    paddingTop: 0,
    paddingBottom: 0,
  },
  forgotPassword: {
    marginTop: 24,
    fontSize: 14,
    color: 'rgba(225, 225, 225, 0.80)',
    textDecorationLine: 'underline',
    textAlign: 'right',
    fontFamily: FONTS.MEDIUM,
    letterSpacing: 1,
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
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
