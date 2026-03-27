import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';
import { BottomSheetProvider } from './src/context/BottomSheetContext';
import { Provider } from 'react-redux';
import Store from './store';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={Store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetProvider>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </BottomSheetProvider>
      </GestureHandlerRootView>
      <Toast  />
    </Provider>
  );
};

export default App;
