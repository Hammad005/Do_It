import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from "./src/navigations/StackNavigation";
import { BottomSheetProvider } from './src/context/BottomSheetContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <BottomSheetProvider>
      <NavigationContainer>
        <StackNavigation/>
      </NavigationContainer>
      </BottomSheetProvider>
    </GestureHandlerRootView>
  )
}

export default App
