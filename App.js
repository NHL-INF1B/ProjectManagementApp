import ProjectScreen from "./src/screens/ProjectScreen/ProjectScreen";
import {React, useEffect} from "react";
import LoginScreen from "./src/screens/LoginScreenNew/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowPlanning from "./src/screens/ShowPlanning/ShowPlanning";

const Stack = ShowPlanning();

export default function App() {
	return (
		<ShowPlanning />
	);
}
