import React from "react";
import ProjectScreen from "./src/screens/ProjectScreen/ProjectScreen";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
	return (
		<NavigationContainer>
			<ProjectScreen />
		</NavigationContainer>
	);
}