import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectScreen from './src/screens/ProjectScreen/ProjectScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen';
//import CreateProject from './src/screens/CreateProject/CreateProject';

const Stack = createNativeStackNavigator();
//Name en component moeten gelijk zijn aan de naam van het scherm. 
//Dit moet dan ook de waarde van 'screen' bij elke link naar dit scherm.
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name = "HourEditScreen"
          component={HourEditScreen}
        />
        <Stack.Screen 
          name = "LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name = "ProfileScreen"
          component={ProfileScreen}
        />
        <Stack.Screen
          name = "RegisterScreen"
          component={RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
