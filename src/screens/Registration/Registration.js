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
import { Assets } from "react-navigation-stack";
import styles from "./Styles";
const Registration = () => {
  //the things where the info goess in.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //step 1 to validate things
  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: { name, email, date, newPassword, confirmPassword },
  });

  //send the data to the api if there are no errors.
  const sendToAPI = (name, email, date, password) => {
    try {
      fetch(
        "http://localhost/project4/ProjectManagementApp/src/screens/Registration/handler.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            dateOfBirth: date,
            password: password,
          }),
        }
      )
        .then((response) => response.json())
        .then((response) => console.log(response));
    } catch (error) {
      alert(error);
    }
  };

  //set the requirements for the textinput.
  const _onPressButton = () => {
    validate({
      name: { required: true },
      email: { email: true, required: true },
      date: { date: "DD-MM-YYYY", required: true },
      newPassword: { required: true, isPassword: true },
      confirmPassword: { equalPassword: newPassword, required: true },
    }),
      _checkValidation();
  };

  //check if there are no more errors
  const _checkValidation = () => {
    if (isFormValid() == true) {
      console.log("woohooo er zijn geen errors");
      sendToAPI(name, email, date, confirmPassword);
    } else if (isFormValid() == false) {
      console.log("er zijn nog goede errors");
    } else {
      console.log("ik heb echt geen idee waarom dit is");
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
        <TextInput
          style={styles.input}
          onChangeText={setDate}
          value={date}
          placeholder="Datum"
        />
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

      <Pressable onPress={_onPressButton}>
        <Text style={styles.button}>REGISTREREN</Text>
      </Pressable>

      <Pressable onPress>
        <Text style={styles.inloggen}>INLOGGEN</Text>
      </Pressable>

      <Text></Text>
    </ScrollView>
  );
};

export default Registration;
