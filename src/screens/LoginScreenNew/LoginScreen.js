import { React, useEffect, useState } from "react";
import Styles from "./Styles";
import { ScrollView, View, Text, SafeAreaView, Button, Image, TouchableOpacity, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
	const navigatie = useNavigation();

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
	const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const { control, handleSubmit, formState: { errors }, getValues } = useForm({
		defaultValues: {
		  email: '',
		  password: '',
		}
	  });

	const onSubmit = (data) => {
		sendDataToAPI(data.email, data.password);
	};

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
					alert('Deze inloggegevens kloppen niet');
					setErrorText("email_incorrect");
					console.log("email_incorrect");
					break;

				case "user_not_exists":
					alert('Deze gebruiker bestaat niet.');
					setErrorText("user_not_exists");
					console.log("user_not_exists");
					break;

				case "password_incorrect":
					alert('Deze inloggegevens kloppen niet');
					setErrorText("password_incorrect");
					console.log("password_incorrect");
					break;

				case "login_incorrect":
					alert('Deze inloggegevens kloppen niet.')
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
			<ScrollView>
			<View>
        		<Image
         			style={Styles.logo}
          			source={require("../../assets/images/logo.png")}
        		/>
      		</View>

			  <Text style={Styles.titel}>Inloggen</Text>

			<View>
				<Controller
					name="email"
					control={control}
					rules={{
						required: { value: true, message: 'Email is verplicht' },
						pattern: {
						value: EMAIL_REGEX,
						message: 'Email is niet correct'
						},
					}}
					render={({ field: { onChange, value } }) => (
						<CustomTextInput 
							placeholder="Emailadres" 
							placeholderTextColor="#707070" 
							onChangeText={(text) => onChange(text)} 
							value={value} 
							errorText={errors?.email?.message} 
							titleText="email"
						/>
					)}
					/>
				</View>

				<View>
				<Controller
                  name="password"
                  control={control}
				  rules={{
					  required: { value: true, message: 'Wachtwoord is verplicht.'},
				  }}
                  render={({ field: { onChange, value } }) => (
                    <CustomTextInput 
                      placeholder="Wachtwoord" 
                      placeholderTextColor="#707070" 
                      onChangeText={(text) => onChange(text)} 
                      value={value} 
                      errorText={errors?.password?.message} 
                      secureTextEntry={true}
                      titleText="wachtwoord"
                    />
                  )}
                />
				</View>
				<View style={Styles.head}>
					<Text>{errorText}</Text>
				</View>

				<View>
					<Pressable onPress={handleSubmit(onSubmit)}>
						<Text style={Styles.button}>Log in</Text>
					</Pressable>
				</View>

				<View>
					<Pressable onPress={() => navigatie.navigate("RegisterScreen")}>
						<Text style={Styles.registreren}>Registreren</Text>
					</Pressable>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default LoginScreen;
