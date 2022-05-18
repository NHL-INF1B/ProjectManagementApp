import React from "react";
import ProjectScreen from "./src/screens/ProjectScreen/ProjectScreen";
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import TileTestScreen from "./src/screens/TileTestScreen/TileTestScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

/*
To add you page, import your page, remove the "" from the compontent and
change it to the name you've given the function.

If your page is not on the list, add a <Stack.Screen /> yourself and
follow the same format.
*/

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>

				<Stack.Screen
					name="ProjectScreen"
					component={ProjectScreen}
				/>

				{/* Remove when put in production */}
				<Stack.Screen
					name="TileTestScreen"
					component={TileTestScreen}
				/>

				<Stack.Screen 
					name="LoginScreen"
					component={LoginScreen}
				/>

				<Stack.Screen
					name="PlanningScreen"
					component={""}
				/>

				<Stack.Screen
					name="LogbookScreen"
					component={""}
				/>

				<Stack.Screen
					name="WarningScreen"
					component={""}
				/>

				<Stack.Screen
					name="InviteScreen"
					component={""}
				/>

				<Stack.Screen
					name="MemberScreen"
					component={""}
				/>

				<Stack.Screen
					name="ScoreScreen"
					component={""}
				/>

			</Stack.Navigator>
		</NavigationContainer>
	);
}