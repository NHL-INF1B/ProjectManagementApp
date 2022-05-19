import {React} from "react";
import LoginScreen from "./src/screens/LoginScreenNew/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import TestFile from "./src/screens/TestFile/TestFile";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: "#009BAA",
					},
					headerShadowVisible: false,
				}}
			>
				<Stack.Screen
					name="TestFile"
					component={TestFile}
				/>
				<Stack.Screen 
					name="LoginScreen"
					component={LoginScreen}
				/>
				<Stack.Screen
					name="RegisterScreen"
					component={RegisterScreen}
				/>
      		</Stack.Navigator>
	  	</NavigationContainer>
	);
}