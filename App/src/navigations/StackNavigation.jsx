import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

// Screens
import Splash from '../screens/StarterScreens/Splash';
import Services from '../screens/StarterScreens/Services';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import VerifyAccount from '../screens/auth/VerifyAccount';
import HomeMain from '../screens/Home/HomeMain';

const Stack = createStackNavigator();


// 🔐 Auth Stack
const AuthNavigator = ({initialRouteName}) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen
        name="VerifyAccount"
        component={VerifyAccount}
        options={{ animation: 'fade' }}
      />
    </Stack.Navigator>
  );
};


// 🏠 App Stack
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeMain} />
    </Stack.Navigator>
  );
};


// 🚀 Root Navigation (MAIN LOGIC)
const StackNavigation = () => {
  const { user, isCheckingAuth, redirectToLogin } = useSelector((state) => state.auth);

  // ✅ Splash while loading (token check / async storage etc.)
  if (isCheckingAuth) {
    return <Splash />;
  }

   // Decide initial screen for Auth stack
  const authInitialRoute = redirectToLogin ? "Login" : "Services";

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {!user ? (
        // ❌ Not logged in
         <Stack.Screen
          name="Auth"
          options={{ headerShown: false }}
        >
          {() => <AuthNavigator initialRouteName={authInitialRoute} />}
        </Stack.Screen>
      
      ) : !user.isVerified ? (
        // ⚠️ Logged in but not verified
        <Stack.Screen
          name="VerifyAccount"
          component={VerifyAccount}
          options={{ animation: 'fade' }}
        />
      
      ) : (
        // ✅ Fully authenticated
        <Stack.Screen name="App" component={AppNavigator} />
      )}

    </Stack.Navigator>
  );
};

export default StackNavigation;