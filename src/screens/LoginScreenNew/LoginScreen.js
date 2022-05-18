import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { View, Text, SafeAreaView, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {

	useEffect(() => {
        // removeValue(); //If you want to remove the stored data for testing
		const data = getData();
        data.then((data) => {
            if (data != null) {
                console.log(data);
                navigation.navigate('RegisterScreen'); //Needs to go to welcomescreen
            }
        });
	}, []);

	const [errorText, setErrorText] = useState("");

	const getData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("@user_data");
			if (jsonValue !== null) {
				return JSON.parse(jsonValue);
			}
		} catch (e) {
			alert(e);
		}
	};

    const storeData = async (value) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem("@user_data", jsonValue);
		} catch (e) {
			alert(e);
		}
	};

    const removeValue = async () => {
        try {
          await AsyncStorage.removeItem('@user_data')
        } catch(e) {
          alert(e);
        }
      
        console.log('Done.')
    };

	const sendDataToAPI = (email, password) => {
		try {
			fetch("http://localhost/pma/PmaAPI/handlers/login/loginHandler.php", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			})
				// .then((response) => response.text())
				.then((response) => response.json())
				.then((response) => {
					// console.log(response);
					catchFeedback(response);
				});
		} catch (error) {
			alert(error);
		}
	};

	const catchFeedback = (response) => {
		console.log(response);

		// console.log(response);
		// console.log(response.length);

		for (let index = 0; index < response.length; index++) {
			switch (response[index]) {
				case "email_incorrect":
					setErrorText("email_incorrect");
					console.log("email_incorrect");
					break;

				case "user_not_exists":
					setErrorText("user_not_exists");
					console.log("user_not_exists");
					break;

				case "password_incorrect":
					setErrorText("password_incorrect");
					console.log("password_incorrect");
					break;

				case "login_incorrect":
					setErrorText("login_incorrect");
					console.log("login_incorrect");
					break;

				default:
					//Succes
					console.log(response[0].id);
					console.log(response[0].name);
					console.log(response[0].email);
					console.log(response[0].dateOfBirth);

					storeData(response[0]);
					navigation.navigate('RegisterScreen'); //Needs to go to welcomescreen
					break;
			}
		}
	};

	return (
		<SafeAreaView style={Styles.SafeAreaView}>
			<View style={Styles.head}>
				<Text>{errorText}</Text>
			</View>

			<View style={Styles.login}>
				<Text>Hier alles voor login</Text>
				<Button
					title="log in"
					onPress={() => sendDataToAPI("stefan@email.com", "!Welkom10")}
				/>
				<Button title="haal op" />
			</View>
		</SafeAreaView>
	);
}

export default LoginScreen;
