import React from "react";
import ProjectScreen from "./src/screens/ProjectScreen/ProjectScreen";
import {React, useEffect} from "react";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import LoginScreenNew from "./src/screens/LoginScreenNew/LoginScreenNew";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>

				<Stack.Screen
					name="LoginScreen"
					component={LoginScreen}
				/>

				<Stack.Screen
					name="ProjectScreen"
					component={ProjectScreen}
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

				<Stack.Screen
					name="LoginScreenNew"
					component={LoginScreenNew}
				/>

				<Stack.Screen
					name="RegisterScreen"
					component={RegisterScreen}
				/>

			</Stack.Navigator>
		</NavigationContainer>
	);
}