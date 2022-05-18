import {React, useEffect} from "react";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import LoginScreenNew from "./src/screens/LoginScreenNew/LoginScreenNew";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown:false}}>
				<Stack.Screen name="LoginScreenNew" component={LoginScreenNew} />
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
      		</Stack.Navigator>
	  	</NavigationContainer>
	);
}