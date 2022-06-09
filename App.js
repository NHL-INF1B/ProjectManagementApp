import {React, useEffect} from "react";
import HourAddScreen from "./src/screens/HourEditScreen/HourAddScreen";
import HourEditScreen from "./src/screens/HourEditScreen/HourEditScreen";
import WarningScreen from "./src/screens/WarningScreen/WarningScreen";
import WarningaddScreen from "./src/screens/WarningScreen/WarningAddScreen";
import WarningEditScreen from "./src/screens/WarningScreen/WarningEditScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateProject from "./src/screens/CreateProject/CreateProject";
import WelcomeScreen from "./src/screens/WelcomeScreen/WelcomeScreen";
import ScheduleEditScreen from "./src/screens/ScheduleEditScreen/ScheduleEditScreen";
import MemberInfo from "./src/screens/MemberInfo/MemberInfo";
import ShowProjects from "./src/screens/ShowProjects/ShowProjects";
import LogbookScreen from "./src/screens/LogbookScreen/LogbookScreen";
import InviteMembers from "./src/screens/InviteMembers/InviteMembers";
import ChangePassword from "./src/screens/ChangePassword/ChangePassword";
import SelectLogbookUser from "./src/screens/LogbookScreen/SelectLogbookUser";
import Profile from "./src/screens/Profile/Profile";
import PlanningOverzichtDev from "./src/screens/planningOverzichtDev/planningOverzichtDev";
import LoginScreen from "./src/screens/LoginScreenNew/LoginScreen";
import ProjectScreen from "./src/screens/ProjectScreen/ProjectScreen";
import Scorebord from "./src/screens/Scorebord/Scorebord";

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
					name="Scorebord"
					component={Scorebord}
				/>


				<Stack.Screen 
					name="ChangePassword"
					component={ChangePassword}
				/>

				<Stack.Screen
        		  name='WelcomeScreen'
	        	  component={WelcomeScreen}	
				  options={{
					gestureEnabled: false,
				  }}
				  			  
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

				<Stack.Screen
					name="LogbookScreen"
					component={LogbookScreen}
				/>

				<Stack.Screen
					name="SelectLogbookUser"
					component={SelectLogbookUser}
				/>

				
				<Stack.Screen
				name="PlanningOverzichtDev"
				component={PlanningOverzichtDev}
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
					name="WarningaddScreen"
					component={WarningaddScreen}
				/>	
					
				<Stack.Screen
					name="HourEditScreen"
					component={HourEditScreen}
				/>							
			</Stack.Navigator>
		</NavigationContainer>
	);
}
