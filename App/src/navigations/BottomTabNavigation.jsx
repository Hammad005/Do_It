import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabRoutes from './BottomTabRoutes';
import colors from '../utils/colors';
import { FONTS } from '../utils/fonts';
import { useBottomSheet } from '../context/BottomSheetContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const { isBottomSheetOpen } = useBottomSheet();

  const renderIcon = (icon, activeIcon, focused) => (
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
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={({ navigation, route }) => ({
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute', // important
          elevation: 0,
          borderTopWidth: 0,
          bottom: isBottomSheetOpen ? -100 : 0,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.white,
        tabBarHideOnKeyboard: true,
        headerShown: route.name === 'Calendar' ? true : false,
        headerStyle: {
          backgroundColor: colors.bgColor1,
          elevation: 0,
          shadowOpacity: 0,
          marginBottom: 0,
        },
        headerTintColor: colors.white,
        headerTitleStyle: { fontSize: 25, fontFamily: FONTS.MEDIUM },
        headerTitleAlign: 'center',
        headerLeft: () => {
          
            return (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
                activeOpacity={0.85}
              >
                <MaterialIcons
                  name="chevron-left"
                  size={28}
                  color={colors.primary}
                />
              </TouchableOpacity>
            );
          
        },
        tabBarShowLabel: false,
        tabBarButton: props => (
          <TouchableOpacity
            {...props}
            activeOpacity={1} // <-- disables ripple/highlight effect
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
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
            tabBarIcon: ({ focused }) =>
              renderIcon(route.icon, route.activeIcon, focused),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
  icon: {
    width: 33,
    height: 30,
    marginBottom: 5,
  },
  activeIcon: {
    width: 40,
    height: 50,
  },
  activeLine: {
    position: 'absolute',
    bottom: -4,
    width: 15,
    height: 3,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  backButton: {
        backgroundColor: "white",
        borderRadius: 100,
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        left: 20,
        
    }
});
