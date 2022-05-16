import React from "react";
import Styles from "./Styles";
import { View, Text, SafeAreaView } from "react-native";
import { Button } from "react-native-web";

function LoginScreen() {
    let test;
    
	const sendDataToAPI = (name, email, dateOfBirth, password, confirmPassword) => {
        try {
            fetch("http://localhost/PmaAPI/handlers/registration/registrationHandler.php", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    dateOfBirth: dateOfBirth,
                    password: password,
                    confirmPassword: confirmPassword,
                }),
            })
            .then((response) => response.text()) //or json - Puts response to text
            .then((response) => {
                catchFeedback(response);
                console.log("feedback => " + response);
            });
        } catch (error) {
            alert(error);
        }
	};

    const catchFeedback = (test) => {
        switch (test) {
            case "invalid_name":
                //do something
                console.log('het werkt!');
                break;

            default:
                break;
        }
    };

	return (
		<SafeAreaView style={Styles.SafeAreaView}>
			<View style={Styles.head}>
				<Text>logo</Text>
			</View>

			<View style={Styles.login}>
				<Text>Hier alles voor login</Text>
                <Button title="druk hier" onPress={() => sendDataToAPI("Stefan", "stefan@email.com", "2001-12-26", "welkom10", "welkom10")} />
			</View>
		</SafeAreaView>
	);
}

export default LoginScreen;
