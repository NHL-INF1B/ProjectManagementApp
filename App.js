import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectScreen from './src/screens/ProjectScreen/ProjectScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import LogoutScreen from './src/screens/LogoutScreen/LogoutScreen';
//import ProjectAanmaken from './src/screens/ProjectAanmaken/ProjectAanmaken';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name = "ProjectScreen"
          component={ProjectScreen}
        />
        <Stack.Screen 
          name = "LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name = "ProfileScreen"
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
