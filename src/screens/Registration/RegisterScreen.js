"use strict";

import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { useValidation } from "react-native-form-validator";
import styles from "./Styles";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-modern-datepicker";

const Registration = () => {
  //the things where the info goess in.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const [isShowingDatePicker, setShowingDatePicker] = useState(false);

  //step 1 to validate things
  const { validate, isFieldInError, getErrorsInField, isFormValid } =
    useValidation({
      state: { name, email, date, newPassword, confirmPassword },
    });

  //send the data to the api if there are no errors.
  const sendToAPI = (name, email, date, password, confirmPassword) => {
    const newDate = date.replace(/\//g, "-");
    try {
      fetch(
        "http://localhost/PMA/PmaAPI/handlers/registration//registrationHandler.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            dateOfBirth: newDate,
            password: password,
            confirmPassword: confirmPassword,
          }),
        }
      )
        .then((response) => response.json())
        .then((response) => {
          feedback(response);
        });
    } catch (error) {
      alert(error);
    }
  };

  //set the requirements for the textinput.
  const onPressButton = () => {
    validate({
      name: { required: true, maxLength: 50 },
      email: { email: true, required: true, maxLength: 50 },
      date: { date: "YYYY-MM-DD", required: true },
      newPassword: { required: true, isPassword: true },
      confirmPassword: { equalPassword: newPassword, required: true },
    }),
      checkValidation();
  };

  //check if there are no more errors
  const checkValidation = () => {
    if (isFormValid() == true) {
      sendToAPI(name, email, date, newPassword, confirmPassword);
    }
  };

  const feedback = (response) => {
    switch (response[0]) {
      case "name_incorrect":
        alert("De naam is verkeerd.");
        console.log("De naam is verkeerd.");
        break;
      case "email_incorrect":
        alert("Het emailadres is verkeerd.");
        console.log("Het emailadres is verkeerd.");
        break;
      case "dateOfBirth_incorrect":
        alert("De geboortedatum is verkeerd.");
        console.log("De geboortedatum is verkeerd.");
        break;
      case "password_incorrect":
        alert("Het eerste wachtwoord is verkeerd.");
        console.log("Het eerste wachtwoord is verkeerd.");
        break;
      case "confirmPassword_incorrect":
        alert("Het tweede wachtwoord is verkeerd.");
        console.log("Het tweede wachtwoord is verkeerd.");
        break;
      case "samePassword_incorrect":
        alert("De wachtwoorden zijn niet hetzelfde.");
        console.log("De wachtwoorden zijn niet hetzelfde.");
        break;
      case "email_in_use":
        alert("Dit emailadres is al in gebruik.");
        console.log("Dit emailadres is al in gebruik.");
        break;
      default:
        alert("Je account is aangemaakt, log nu in met je gegevens.");
        console.log("Je account is aangemaakt, log nu in met je gegevens.");
    }
  };

  //the screen
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
      </View>
      <Text style={styles.titel}>REGISTREREN</Text>
      <View style={styles.div}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Naam"
        />
        {isFieldInError("name") &&
          getErrorsInField("name").map((errorMessage) => (
            <Text style={styles.text}>{errorMessage}</Text>
          ))}
      </View>
      <View style={styles.div}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        {isFieldInError("email") &&
          getErrorsInField("email").map((errorMessage) => (
            <Text style={styles.text}>{errorMessage}</Text>
          ))}
      </View>
      <View style={styles.div}>
        {isShowingDatePicker ? (
          <DatePicker mode="calendar" value={date} onSelectedChange={setDate} />
        ) : (
          <Pressable onPress={() => setShowingDatePicker(true)}>
            <Text>Kies je geboortedatum</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.div}>
        <TextInput style={styles.input} value={date} placeholder="Datum" />
        {isFieldInError("date") &&
          getErrorsInField("date").map((errorMessage) => (
            <Text style={styles.text}>{errorMessage}</Text>
          ))}
      </View>
      <View style={styles.div}>
        <TextInput
          style={styles.input}
          onChangeText={setNewPassword}
          value={newPassword}
          secureTextEntry={true}
          placeholder="Wachtwoord"
        />
        {isFieldInError("newPassword") &&
          getErrorsInField("newPassword").map((errorMessage) => (
            <Text style={styles.text}>{errorMessage}</Text>
          ))}
      </View>
      <View style={styles.div}>
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry={true}
          placeholder="Confirm wachtwoord"
        />
        {isFieldInError("confirmPassword") &&
          getErrorsInField("confirmPassword").map((errorMessage) => (
            <Text style={styles.text}>{errorMessage}</Text>
          ))}
      </View>
      <Pressable onPress={checkValidation}>
        <Text style={styles.button}>REGISTREREN</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.inloggen}>INLOGGEN</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Registration;
