import  { React, useState } from "react";
import Styles from "./Styles";
import { View, Text, SafeAreaView } from "react-native";
import { Button } from "react-native-web";

function LoginScreenNew() {
    const [errorText, setErrorText] = useState(""); 

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
                case 'email_incorrect':
                    setErrorText("email_incorrect");
                    console.log('email_incorrect');
                    break;

                case 'user_not_exists':
                    setErrorText("user_not_exists");
                    console.log('user_not_exists');
                    break;

                case 'password_incorrect':
                    setErrorText("password_incorrect");
                    console.log('password_incorrect');
                    break;

                case 'login_incorrect':
                    setErrorText("login_incorrect");
                    console.log('login_incorrect');
                    break;
                
                default:
                    //Succes
                    console.log(response[0].id);
                    console.log(response[0].name);
                    console.log(response[0].email);
                    console.log(response[0].dateOfBirth);

                    //Do something with logging in...
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
                <Button title="druk hier" onPress={() => sendDataToAPI("stefan@email.com", "!Welkom10")} />
			</View>
		</SafeAreaView>
	);
}

export default LoginScreenNew;
