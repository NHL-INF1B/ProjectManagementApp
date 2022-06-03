import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Image, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProjectScreen from "./src/screens/ProjectScreen/ProjectScreen";
import LoginScreen from "./src/screens/LoginScreenNew/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import CreateProject from "./src/screens/CreateProject/CreateProject";
import HourEditScreen from "./src/screens/HourEditScreen/HourEditScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen/WelcomeScreen";
import ScheduleEditScreen from "./src/screens/ScheduleEditScreen/ScheduleEditScreen";
import MemberInfo from "./src/screens/MemberInfo/MemberInfo";
import ShowProjects from "./src/screens/ShowProjects/ShowProjects";
import WarningScreen from "./src/screens/WarningScreen/WarningScreen";
import Profile from "./src/screens/Profile/Profile";
import InviteMembers from "./src/screens/InviteMembers/InviteMembers";
import ChangePassword from "./src/screens/ChangePassword/ChangePassword";


const Stack = createNativeStackNavigator();
//Name en component moeten gelijk zijn aan de naam van het scherm.
//Dit moet dan ook de waarde van 'screen' bij elke link naar dit scherm.
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
					name="ChangePassword"
					component={ChangePassword}
				/>

				<Stack.Screen
        		  name='WelcomeScreen'
	        	  component={WelcomeScreen}
    	    	/>
				
				<Stack.Screen
					name="ShowProjects"
					component={ShowProjects}
				/>

				<Stack.Screen
					name="ProjectScreen"
					component={ProjectScreen}
				/>

				<Stack.Screen
					name="ProfileScreen"
					component={Profile}
				/>

				<Stack.Screen
					name="ScheduleEditScreen"
					component={ScheduleEditScreen}
				/>

				<Stack.Screen
					name="CreateProject"
					component={CreateProject}
				/>

				<Stack.Screen
					name="WarningScreen"
					component={WarningScreen}
				/>

				<Stack.Screen
          			name="InviteMembers"
         		 	component={InviteMembers}
        		/>

        		<Stack.Screen
          			name="MemberInfo"
         		 	component={MemberInfo}
        		/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
