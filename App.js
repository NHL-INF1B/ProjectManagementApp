// import ProjectScreen from "./src/screens/ProjectScreen/ProjectScreen";
import {React, useEffect} from "react";
// import LoginScreen from "./src/screens/LoginScreenNew/LoginScreen";
// import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScheduleEditScreen from "./src/screens/ScheduleEditScreen/ScheduleEditScreen";
import Planning from "./src/screens/Planning/Planning";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
					name="Planning"
					component={Planning}
				/>

			</Stack.Navigator>
		</NavigationContainer>
	);
}