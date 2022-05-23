import ProjectScreen from "./src/screens/ProjectScreen/ProjectScreen";
import {React, useEffect} from "react";
import LoginScreen from "./src/screens/LoginScreenNew/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import TestFile from "./src/screens/TestFile/TestFile";
import TestFile2 from "./src/screens/TestFile2/TestFile2";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{ headerShown: false}}
			>

				<Stack.Screen
					name="TestFile"
					component={TestFile}
				/>

				<Stack.Screen
					name="RegisterScreen"
					component={RegisterScreen}
				/>
				<Stack.Screen
					name="LoginScreen"
					component={LoginScreen}
				/>

				<Stack.Screen
					name="ProjectScreen"
					component={ProjectScreen}
				/>

				<Stack.Screen
					name="TestFile2"
					component={TestFile2}
				/>

				<Stack.Screen
					name="TeamcodeScreen"
					component={""}
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
