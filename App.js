import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectScreen from './src/screens/ProjectScreen/ProjectScreen';
import LoginScreen from './src/screens/LoginScreenNew/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen';
import CreateProject from './src/screens/CreateProject/CreateProject';
import HourEditScreen from './src/screens/HourEditScreen/HourEditScreen';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';
import ScheduleEditScreen from './src/screens/ScheduleEditScreen/ScheduleEditScreen';
import ShowProjects from "./src/screens/ShowProjects/ShowProjects";

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
					name="ProjectScreen"
					component={ProjectScreen}
				/>

				<Stack.Screen
					name="ScheduleEditScreen"
					component={ScheduleEditScreen}
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
