import React from 'react';
import Styles from './Styles';
import { View, Text, SafeAreaView } from 'react-native';

function LoginScreen() {
	const sendDataToAPI = (name, email, dateOfBirth, password, confirmPassword) => {
        try {
            fetch("http://localhost/pma/PmaAPI/handlers/registration/registrationHandler.php", {
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

    /**
     * Function to catch feedback of request to API
     * @param response JSON object of response
     */
    const catchFeedback = (response) => {
        
        // console.log(response);
        // console.log(response.length);

        for (let index = 0; index < response.length; index++) {
            switch (response[index]) {
                case 'name_incorrect':
                    //do something
                    console.log('name_incorrect');
                    break;

                case 'email_incorrect':
                    //do something
                    console.log('email_incorrect');
                    break;

                case 'dateOfBirth_incorrect':
                    //do something
                    console.log('dateOfBirth_incorrect');
                    break;

                case 'password_incorrect':
                    //do something
                    console.log('password_incorrect');
                    break;

                case 'confirmPassword_incorrect':
                    //do something
                    console.log('confirmPassword_incorrect');
                    break;

                case 'samePassword_incorrect':
                    //do something
                    console.log('samePassword_incorrect');
                    break;

                case 'email_in_use':
                    //do something
                    console.log('email_in_use');
                    break;
                
                default:
                    //Succes
                    console.log(response[0].id);
                    console.log(response[0].name);
                    console.log(response[0].email);
                    console.log(response[0].dateOfBirth);
                    break;
            }
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