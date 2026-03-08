import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';
import { ICON } from '../../utils/icons';
import ServicesScreenNavigators from "../../components/StarterScreens/ServicesScreenNavigators"
import ServicesScreenComponents from "../../components/StarterScreens/ServicesScreenComponents"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const servicesScreens = [
    {
      icon: ICON.CHECKLIST,
      height: 221,
      width: 251,
      text: "Plan your tasks to do, that way you’ll stay organized and you won’t skip any",
      active: true
    },
    {
      icon: ICON.CALENDAR,
      height: 281,
      width: 279,
      text: "Make a full schedule for the whole week and stay organized and productive all days",
      active: false
    },
    {
      icon: ICON.USERS,
      height: 211,
      width: 240,
      text: "create a team task, invite people and manage your work together",
      active: false
    },
    {
      icon: ICON.SECURE,
      height: 229,
      width: 175,
      text: "Your informations are secure with us",
      active: false
    },
  ];
  const navigate = useNavigation();

  const handleNext = () => {
    if (currentIndex === 3) return navigate.replace('Login') 
    setCurrentIndex(prev => prev + 1)
  };
  return (
    <LinearGradient
      colors={[colors.bgColor1, colors.bgColor2]}
      style={styles.container}
    >
        <ServicesScreenComponents data={servicesScreens} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} handleNext={handleNext}/>

        <View style={styles.navigators}>

          <View style={{flexDirection: "row", alignItems: "center"}}>
          <ServicesScreenNavigators data={servicesScreens} currentIndex={currentIndex}/>

          <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.85}>
            <MaterialIcons name={currentIndex === 3 ? "check" : "navigate-next"} size={50}/>
          </TouchableOpacity>
          </View>
          
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
  navigators: {
    paddingTop: 60,
    height: "30%",
    width: "100%"
  },
  button: {
    backgroundColor: "white",
    borderRadius: 100,
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    right: 20,
    boxShadow: "0px 4px 15px 2px rgba(255, 255, 255, 25)"
  }
});
