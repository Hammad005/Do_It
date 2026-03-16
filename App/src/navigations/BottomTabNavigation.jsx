import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import BottomTabRoutes from "./BottomTabRoutes"
import colors from '../utils/colors';
import { FONTS } from '../utils/fonts';
import { useBottomSheet } from '../context/BottomSheetContext';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const { isBottomSheetOpen } = useBottomSheet();

  const renderIcon = (icon, activeIcon,  focused) => (
    <>
      
        <Image
        source={focused ? activeIcon : icon}
        style={focused ? styles.activeIcon : styles.icon}
        resizeMode="contain"
        fadeDuration={0}
        />
      {focused && <View style={styles.activeLine} />}
    </>
  );

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute', // important
          elevation: 0,
          borderTopWidth: 0,
          display: route.name === "Settings" ? "none" : "flex",
          bottom: isBottomSheetOpen ? -100 : 0
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.white,
        tabBarHideOnKeyboard: true,
        headerShown: route.name === "Settings" || route.name === "Calendar" ? true : false,
        headerTransparent: true,
        headerTintColor: colors.white,
        headerTitleStyle: { fontSize: 25, fontFamily: FONTS.MEDIUM },
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            activeOpacity={1} // <-- disables ripple/highlight effect
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          />
        ),
      })}
      
    >
      {BottomTabRoutes.map((route, index) => (
        <Tab.Screen
          key={index}
          name={route.name}
          component={route.component}
          options={{
            tabBarIcon: ({ focused }) => renderIcon(route.icon, route.activeIcon, focused),
            animation: route.name === "Settings" ? "shift" : "none",
          }}
        />
      ))}
    </Tab.Navigator>
  )
}

export default BottomTabNavigation

const styles = StyleSheet.create({
  icon: {
    width: 33,
    height: 30,
    marginBottom: 5
  },
  activeIcon: {
    width: 40,
    height: 50,
    
  },
  activeLine: {
    position: "absolute",
    bottom: -4,
    width: 15,
    height: 3,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  
});