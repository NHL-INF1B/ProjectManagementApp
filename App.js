import ProjectScreen from "./src/screens/ProjectScreen/ProjectScreen";
import {React, useEffect} from "react";
import LoginScreen from "./src/screens/LoginScreenNew/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import HourAddScreen from "./src/screens/HourEditScreen/HourAddScreen";
import HourEditScreen from "./src/screens/HourEditScreen/HourEditScreen";
import WarningScreen from "./src/screens/WarningScreen/WarningScreen";
import WarningaddScreen from "./src/screens/WarningScreen/WarningAddScreen";
import WarningEditScreen from "./src/screens/WarningScreen/WarningEditScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProjectScreen from "./src/screens/ProjectScreen/ProjectScreen";
import LoginScreen from "./src/screens/LoginScreenNew/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import CreateProject from "./src/screens/CreateProject/CreateProject";
import WelcomeScreen from "./src/screens/WelcomeScreen/WelcomeScreen";
import ScheduleEditScreen from "./src/screens/ScheduleEditScreen/ScheduleEditScreen";
import MemberInfo from "./src/screens/MemberInfo/MemberInfo";
import Profile from "./src/screens/Profile/Profile";

const Stack = createNativeStackNavigator();
//Name en component moeten gelijk zijn aan de naam van het scherm.
//Dit moet dan ook de waarde van 'screen' bij elke link naar dit scherm.
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name="HourEditScreen"
					component={HourEditScreen}
				/>
				
				<Stack.Screen
					name="HourAddScreen"
					component={HourAddScreen}
				/>
				

				<Stack.Screen
					name="WarningEditScreen"
					component={WarningEditScreen}
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
					name="RegisterScreen"
					component={RegisterScreen}
				/>

				<Stack.Screen
					name="ProjectScreen"
					component={ProjectScreen}
				/>

			</Stack.Navigator>
		</NavigationContainer>
	);
}
