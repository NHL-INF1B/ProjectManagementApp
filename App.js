import React from "react";
import ProjectScreen from "./src/screens/ProjectScreen/ProjectScreen";
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import TileTestScreen from "./src/screens/TileTestScreen/TileTestScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="ProjectScreen"
					component={ProjectScreen}
					options={{
						headerShown: false,
					}}
				/>

				<Stack.Screen
					name="TileTestScreen"
					component={TileTestScreen}
					options={{
						headerShown: true,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}