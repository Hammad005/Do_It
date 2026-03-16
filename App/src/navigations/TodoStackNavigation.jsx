import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TodosScreen from '../screens/todos/TodosScreen'
import ViewTodo from '../screens/todos/ViewTodo';


const TodoStackNavigation = () => {
    const Stack = createStackNavigator()
  return (
    <Stack.Navigator initialRouteName="TodoMainScreen" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="TodoMainScreen" component={TodosScreen} />
      <Stack.Screen name="ViewTodo" component={ViewTodo} />
    </Stack.Navigator>
  )
}

export default TodoStackNavigation