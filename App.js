import {React} from "react";
import LoginScreen from "./src/screens/LoginScreenNew/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProject from './src/screens/EditProject/EditProject';

// const Stack = createNativeStackNavigator();

// export default function App() {
// 	return (
// 		<NavigationContainer>
// 			<Stack.Navigator screenOptions={{headerShown:false}}>
// 				<Stack.Screen name="LoginScreen" component={LoginScreen} />
// 				<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
//       		</Stack.Navigator>
// 	  	</NavigationContainer>)}
// import HourEditScreen from "../ProjectManagementApp/src/screens/HourEditScreen/HourEditScreen";
// import CreateProject from "./src/screens/CreateProject/CreateProject";
// import EditProject from "./src/screens/EditProject/EditProject";
// import { View } from "react-native";

export default function App() {
	return (
		<EditProject />
	);
	}