import { React, useState } from "react";
import Styles from "./Styles";
import { View, Text, ScrollView, TextInput, Pressable, Image, SafeAreaView } from "react-native";
import { useValidation } from "react-native-form-validator";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { validate, isFieldInError, getErrorsInField, isFormValid } =
    useValidation({
      state: { name, email, date, newPassword, confirmPassword },
    });

    /**
     * 
     */
    const onPressButton = () => {
        validate({
          name: { required: true, maxLength: 50 },
          email: { email: true, required: true, maxLength: 50 },
          date: { date: "YYYY-MM-DD", required: true },
          newPassword: { required: true, isPassword: true },
          confirmPassword: { equalPassword: newPassword, required: true },
        }),

        checkValidation();
          // () => {
          //   if (isFormValid() == true) {
          //       sendDataToAPI(name, email, date, newPassword, confirmPassword);
          //   }
          // };
    };

    const checkValidation = () => {
        if (isFormValid() == true) {
            sendDataToAPI(name, email, date, newPassword, confirmPassword);
        }
    };

    /**
     * 
     * @param {*} name
     * @param {*} email
     * @param {*} dateOfBirth
     * @param {*} password
     * @param {*} confirmPassword
     */
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
     * Catch feedback of request from API
     * @param {*} response 
     */
     const catchFeedback = (response) => {
        // console.log(response);
    
        switch (response[0]) {
          case "name_incorrect":
            alert("De naam is verkeerd.");
            break;
          case "email_incorrect":
            alert("Het emailadres is verkeerd.");
            break;
          case "dateOfBirth_incorrect":
            alert("De geboortedatum is verkeerd.");
            break;
          case "password_incorrect":
            alert("Het eerste wachtwoord is verkeerd.");
            break;
          case "confirmPassword_incorrect":
            alert("Het tweede wachtwoord is verkeerd.");
            break;
          case "samePassword_incorrect":
            alert("De wachtwoorden zijn niet hetzelfde.");
            break;
          case "email_in_use":
            alert("Dit emailadres is al in gebruik.");
            break;
          default:
            alert("Je account is aangemaakt, log nu in met je gegevens.");
            navigation.navigate('LoginScreen');
        }
      };

    return (
        <SafeAreaView style={Styles.container}>
          <View>
            <Image
              style={Styles.logo}
              source={require("../../assets/images/logo.png")}
            />
          </View>
    
          <Text style={Styles.titel}>REGISTREREN</Text>
    
          <View style={Styles.div}>
            <TextInput
              style={Styles.input}
              onChangeText={setName}
              value={name}
              placeholder="Naam"
            />
            {isFieldInError("name") &&
              getErrorsInField("name").map((errorMessage) => (
                <Text style={Styles.text}>{errorMessage}</Text>
              ))}
          </View>
    
          <View style={Styles.div}>
            <TextInput
              style={Styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
            />
            {isFieldInError("email") &&
              getErrorsInField("email").map((errorMessage) => (
                <Text style={Styles.text}>{errorMessage}</Text>
              ))}
          </View>
    
          <View style={Styles.div}>
            <TextInput
              style={Styles.input}
              onChangeText={setDate}
              value={date}
              placeholder="Datum"
            />
            {isFieldInError("date") &&
              getErrorsInField("date").map((errorMessage) => (
                <Text style={Styles.text}>{errorMessage}</Text>
              ))}
          </View>
    
          <View style={Styles.div}>
            <TextInput
              style={Styles.input}
              onChangeText={setNewPassword}
              value={newPassword}
              secureTextEntry={true}
              placeholder="Wachtwoord"
            />
            {isFieldInError("newPassword") &&
              getErrorsInField("newPassword").map((errorMessage) => (
                <Text style={Styles.text}>{errorMessage}</Text>
              ))}
          </View>
    
          <View style={Styles.div}>
            <TextInput
              style={Styles.input}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry={true}
              placeholder="Confirm wachtwoord"
            />
            {isFieldInError("confirmPassword") &&
              getErrorsInField("confirmPassword").map((errorMessage) => (
                <Text style={Styles.text}>{errorMessage}</Text>
              ))}
          </View>
    
          <Pressable onPress={onPressButton}>
            <Text style={Styles.button}>REGISTREREN</Text>
          </Pressable>
    
          <Pressable onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={Styles.inloggen}>INLOGGEN</Text>
          </Pressable>
        </SafeAreaView>
      );
};

export default RegisterScreen;
