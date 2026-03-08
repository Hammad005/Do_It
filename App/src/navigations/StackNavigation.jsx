import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/StarterScreens/Splash';
import Services from '../screens/StarterScreens/Services';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';

const StackNavigation = () => {
    const Stack = createStackNavigator()
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  )
}

export default StackNavigation