import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';
import { ICON } from '../../utils/icons';
import { FONTS } from '../../utils/fonts';
import ServicesScreenComponents from "../../components/StarterScreens/ServicesScreenComponents"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Services = () => {
  const [servicesScreens, setServicesScreens] = useState([
    {
      icon: ICON.CHECKLIST,
      text: "Plan your tasks to do, that way you’ll stay organized and you won’t skip any",
      active: true
    },
    {
      icon: ICON.CALENDAR,
      text: "Make a full schedule for the whole week and stay organized and productive all days",
      active: false
    },
    {
      icon: ICON.USERS,
      text: "create a team task, invite people and manage your work together",
      active: false
    },
    {
      icon: ICON.SECURE,
      text: "Your informations are secure with us",
      active: false
    },
  ])
  return (
    <LinearGradient
      colors={[colors.bgColor1, colors.bgColor2]}
      style={styles.container}
    >
        <ServicesScreenComponents data={servicesScreens.filter(item => item.active === true)}/>

        <View>
          <Text>....</Text>
          <Pressable style={styles.button} onPress={() => {}}>
            <MaterialIcons name={"navigate-next"}/>
          </Pressable>
        </View>
    </LinearGradient>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "white",
    borderRadius: "100%"
  }
});
