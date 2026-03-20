import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';
import { ICON } from '../../utils/icons';
import { FONTS } from '../../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { me } from '../../../features/auth/authThunks';

const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(me()).then(() => {
        navigation.navigate('Services');
      });
    }, 3000);
  }, [navigation]);

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
      <Text style={styles.title}>Do It</Text>

      <Text style={styles.smallText}>v 1.0.0</Text>
    </LinearGradient>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 46,
    color: colors.white,
    fontFamily: FONTS.LOGO_FONT,
    textTransform: 'uppercase',
    marginTop: 23,
  },
  smallText: {
    fontSize: 20,
    color: colors.white,
    fontFamily: FONTS.REGULAR,
    marginTop: 228,
  },
});
