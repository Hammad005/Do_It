import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/StarterScreens/Splash';
import Services from '../screens/StarterScreens/Services';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import VerifyAccount from '../screens/auth/VerifyAccount';
import HomeMain from '../screens/Home/HomeMain'

const StackNavigation = () => {
    const Stack = createStackNavigator()
  return (
    <Stack.Navigator initialRouteName="HomeMain" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccount} options={{
        animation: "fade"
      }}/>
      <Stack.Screen name="HomeMain" component={HomeMain}/>
    </Stack.Navigator>
  )
}

export default StackNavigation