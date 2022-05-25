import ProjectScreen from "./src/screens/ProjectScreen/ProjectScreen";
import {React, useEffect} from "react";
import LoginScreen from "./src/screens/LoginScreenNew/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScheduleEditScreen from "./src/screens/ScheduleEditScreen/ScheduleEditScreen";

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
					name="RegisterScreen"
					component={RegisterScreen}
				/>

				<Stack.Screen
					name="ProjectScreen"
					component={ProjectScreen}
				/>

				<Stack.Screen
					name="ScheduleEditScreen"
					component={ScheduleEditScreen}
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
